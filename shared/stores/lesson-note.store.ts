'use client'

import { LessonNote } from '@/data/models/lesson-note.model'
import { ILessonNoteRepository } from '@/data/repositories/remote/lesson-note/lesson-note.repository.interface'
import { AppStatus } from '@/shared/enums/app-status'
import { resolveClient } from '@/shared/ioc/client-container'
import { IOC_TOKENS } from '@/shared/ioc/tokens'
import { resolveApiErrorMessage } from '@/shared/utils/api-error-message'
import { create } from 'zustand'

type LessonNoteStoreProps = {
  listStatus: AppStatus
  lessonStatus: AppStatus
  actionStatus: AppStatus
  notes: LessonNote[]
  lessonNotes: LessonNote[]
  currentLessonId: number | null
  message: string | null
  errorMessage: string | null
}

type LessonNoteStoreState = LessonNoteStoreProps & {
  fetchNotes: () => Promise<boolean>
  fetchLessonNotes: (lessonId: number) => Promise<boolean>
  createNote: (lessonId: number, content: string) => Promise<boolean>
  deleteNote: (noteId: number) => Promise<boolean>
  clearFeedback: () => void
  reset: () => void
}

const initState: LessonNoteStoreProps = {
  listStatus: AppStatus.initial,
  lessonStatus: AppStatus.initial,
  actionStatus: AppStatus.initial,
  notes: [],
  lessonNotes: [],
  currentLessonId: null,
  message: null,
  errorMessage: null,
}

function resolveLessonNoteRepository(): ILessonNoteRepository {
  return resolveClient<ILessonNoteRepository>(IOC_TOKENS.LESSON_NOTE_REPOSITORY)
}

function prependUnique(notes: LessonNote[], note: LessonNote): LessonNote[] {
  return [note, ...notes.filter((item) => item.id !== note.id)]
}

function normalizeList(
  response?: {
    data?: LessonNote[]
  },
): LessonNote[] {
  return response?.data ?? []
}

export const useLessonNoteStore = create<LessonNoteStoreState>((set, get) => ({
  ...initState,

  fetchNotes: async () => {
    set({
      listStatus: AppStatus.loading,
      errorMessage: null,
    })

    const result = await resolveLessonNoteRepository().getAll()

    if (!result.response) {
      set({
        listStatus: AppStatus.error,
        errorMessage: resolveApiErrorMessage(result.exception),
      })
      return false
    }

    set({
      listStatus: AppStatus.done,
      notes: normalizeList(result.response),
      errorMessage: null,
    })

    return true
  },

  fetchLessonNotes: async (lessonId) => {
    set({
      lessonStatus: AppStatus.loading,
      currentLessonId: lessonId,
      errorMessage: null,
    })

    const result = await resolveLessonNoteRepository().getByLesson(lessonId)

    if (!result.response) {
      set({
        lessonStatus: AppStatus.error,
        lessonNotes: [],
        currentLessonId: lessonId,
        errorMessage: resolveApiErrorMessage(result.exception),
      })
      return false
    }

    set({
      lessonStatus: AppStatus.done,
      lessonNotes: normalizeList(result.response),
      currentLessonId: lessonId,
      errorMessage: null,
    })

    return true
  },

  createNote: async (lessonId, content) => {
    set({
      actionStatus: AppStatus.loading,
      message: null,
      errorMessage: null,
    })

    const result = await resolveLessonNoteRepository().create(lessonId, content)

    if (!result.response) {
      set({
        actionStatus: AppStatus.error,
        message: null,
        errorMessage: resolveApiErrorMessage(result.exception),
      })
      return false
    }

    const note = result.response.data
    const currentState = get()

    set({
      actionStatus: AppStatus.success,
      notes: prependUnique(currentState.notes, note),
      lessonNotes:
        currentState.currentLessonId === lessonId
          ? prependUnique(currentState.lessonNotes, note)
          : currentState.lessonNotes,
      message: 'Đã lưu ghi chú.',
      errorMessage: null,
    })

    return true
  },

  deleteNote: async (noteId) => {
    set({
      actionStatus: AppStatus.loading,
      message: null,
      errorMessage: null,
    })

    const result = await resolveLessonNoteRepository().deleteNote(noteId)

    if (!result.response) {
      set({
        actionStatus: AppStatus.error,
        message: null,
        errorMessage: resolveApiErrorMessage(result.exception),
      })
      return false
    }

    const currentState = get()

    set({
      actionStatus: AppStatus.success,
      notes: currentState.notes.filter((note) => note.id !== noteId),
      lessonNotes: currentState.lessonNotes.filter((note) => note.id !== noteId),
      message: 'Đã xóa ghi chú.',
      errorMessage: null,
    })

    return true
  },

  clearFeedback: () =>
    set({
      message: null,
      errorMessage: null,
    }),

  reset: () => set({ ...initState }),
}))
