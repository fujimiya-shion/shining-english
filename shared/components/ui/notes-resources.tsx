'use client'

import { Card } from '@/shared/components/ui/card'
import { useLessonNoteStore } from '@/shared/stores/lesson-note.store'
import { AppStatus } from '@/shared/enums/app-status'
import { formatRelativeTime } from '@/shared/utils/date-time-utils'
import { useEffect } from 'react'

export function NotesResources() {
  const status = useLessonNoteStore((state) => state.listStatus)
  const actionStatus = useLessonNoteStore((state) => state.actionStatus)
  const notes = useLessonNoteStore((state) => state.notes)
  const message = useLessonNoteStore((state) => state.message)
  const errorMessage = useLessonNoteStore((state) => state.errorMessage)
  const fetchNotes = useLessonNoteStore((state) => state.fetchNotes)
  const deleteNote = useLessonNoteStore((state) => state.deleteNote)
  const clearFeedback = useLessonNoteStore((state) => state.clearFeedback)

  useEffect(() => {
    void fetchNotes()
  }, [fetchNotes])

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <Card className="p-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Ghi chú của bạn</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Tất cả ghi chú đã lưu trong quá trình học đều được gắn với bài học tương ứng.
            </p>
          </div>
          <p className="rounded-full border border-border/60 px-3 py-1 text-xs text-muted-foreground">
            {notes.length} ghi chú
          </p>
        </div>

        {message ? (
          <div className="mt-6 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
            {message}
          </div>
        ) : null}

        {errorMessage ? (
          <div className="mt-6 rounded-lg border border-destructive/20 bg-destructive/5 px-4 py-3 text-sm text-destructive">
            {errorMessage}
          </div>
        ) : null}

        <div className="mt-6 space-y-4">
          {status === AppStatus.loading ? (
            <div className="rounded-lg border border-border/60 bg-muted/30 p-4 text-sm text-muted-foreground">
              Đang tải danh sách ghi chú...
            </div>
          ) : null}

          {status !== AppStatus.loading && notes.length === 0 ? (
            <div className="rounded-lg border border-dashed border-border/60 bg-muted/20 p-6 text-center text-sm text-muted-foreground">
              Bạn chưa có ghi chú nào. Hãy vào bài học và lưu ghi chú trong lúc học.
            </div>
          ) : null}

          {notes.map((note) => {
            const lessonName = note.lesson?.name?.trim() || 'Bài học không xác định'
            const courseName = note.lesson?.course?.name?.trim()

            return (
              <Card key={note.id} className="border border-border/70 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold text-foreground">{lessonName}</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {courseName ? `${courseName} • ` : ''}
                      {formatRelativeTime(
                        note.createdAt instanceof Date ? note.createdAt.toISOString() : note.createdAt,
                      )}
                    </p>
                  </div>
                  <button
                    type="button"
                    className="text-sm text-muted-foreground transition-colors hover:text-destructive"
                    disabled={actionStatus === AppStatus.loading}
                    onClick={() => {
                      clearFeedback()
                      void deleteNote(Number(note.id))
                    }}
                  >
                    Xóa
                  </button>
                </div>

                <p className="mt-4 whitespace-pre-line text-sm leading-6 text-muted-foreground">
                  {note.content?.trim() || 'Ghi chú đang được cập nhật.'}
                </p>
              </Card>
            )
          })}
        </div>
      </Card>
    </div>
  )
}
