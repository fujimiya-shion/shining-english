'use client'

import { SerializedCourse } from '@/data/models/course.model'
import { CourseListItemData } from '@/shared/components/ui/course/course-list-item'
import { stripHtml } from '@/shared/utils/string-utils'
import { resolveProxyLessonDocumentUrl, resolveProxyVideoUrl } from '@/shared/utils/video-utils'
import { useEffect, useMemo, useState } from 'react'

function resolveLessonVideoUrl(lessonId?: number | string, value?: string): string {
  return resolveProxyVideoUrl('lessons', lessonId, value)
}

export function useCourseLearningPlayerState({
  course,
  enrolled,
  progressCurrentLessonId,
  progressCompletedLessonIds,
}: {
  course: SerializedCourse
  enrolled: boolean
  progressCurrentLessonId?: number | null
  progressCompletedLessonIds?: number[]
}) {
  const lessonSources = useMemo(
    () =>
      (course.lessons ?? []).map((lesson, index) => ({
        id: Number(lesson.id ?? index + 1),
        title: lesson.name ?? `Bài học ${index + 1}`,
        group: lesson.groupName?.trim() || 'Danh sách bài học',
        description: lesson.description ? stripHtml(lesson.description) : '',
        hasQuiz: Boolean(lesson.hasQuiz),
        isPreviewFree: Boolean(lesson.isPreviewFree),
        videoUrl: resolveLessonVideoUrl(lesson.id, lesson.videoUrl),
        duration: lesson.durationMinutes,
        comments: lesson.comments ?? [],
        resources: (lesson.documents ?? []).map((documentPath, documentIndex) => ({
          id: `${lesson.id ?? index + 1}-${documentIndex}`,
          name:
            lesson.documentNames?.[documentPath]?.trim()
            || documentPath.split('/').pop()
            || `Tai lieu ${documentIndex + 1}`,
          url: resolveProxyLessonDocumentUrl(
            lesson.id,
            documentIndex,
            documentPath,
          ),
        })),
      })),
    [course.lessons]
  )

  const initialLessonId = useMemo(() => {
    const unlockedWithVideo = lessonSources.find((lesson) => (enrolled || lesson.isPreviewFree) && lesson.videoUrl)
    if (unlockedWithVideo) {
      return unlockedWithVideo.id
    }

    const firstUnlocked = lessonSources.find((lesson) => enrolled || lesson.isPreviewFree)
    if (firstUnlocked) {
      return firstUnlocked.id
    }

    return lessonSources.find((lesson) => lesson.videoUrl)?.id ?? lessonSources[0]?.id ?? 0
  }, [enrolled, lessonSources])

  const [currentLesson, setCurrentLesson] = useState(progressCurrentLessonId ?? initialLessonId)
  const [completedLessonIds, setCompletedLessonIds] = useState<number[]>(progressCompletedLessonIds ?? [])
  const [unavailableVideoIds, setUnavailableVideoIds] = useState<number[]>([])
  const [noteDrafts, setNoteDrafts] = useState<Record<number, string>>({})
  const lessonMap = useMemo(() => {
    const map = new Map<number, (typeof lessonSources)[number]>()
    for (const lesson of lessonSources) {
      map.set(lesson.id, lesson)
    }

    return map
  }, [lessonSources])

  useEffect(() => {
    if (lessonSources.length === 0) {
      if (currentLesson !== 0) {
        setCurrentLesson(0)
      }
      return
    }

    if (!lessonMap.has(currentLesson)) {
      setCurrentLesson(initialLessonId)
    }
  }, [currentLesson, initialLessonId, lessonMap, lessonSources.length])

  useEffect(() => {
    if (!enrolled) {
      return
    }

    if (typeof progressCurrentLessonId === 'number' && lessonMap.has(progressCurrentLessonId)) {
      setCurrentLesson(progressCurrentLessonId)
    }
  }, [enrolled, lessonMap, progressCurrentLessonId])

  useEffect(() => {
    if (!enrolled || !Array.isArray(progressCompletedLessonIds)) {
      return
    }

    const lessonSet = new Set(lessonSources.map((lesson) => lesson.id))
    const normalized = progressCompletedLessonIds.filter((lessonId) => lessonSet.has(lessonId))
    setCompletedLessonIds(normalized)
  }, [enrolled, lessonSources, progressCompletedLessonIds])

  const isLessonUnlocked = useMemo(() => {
    const unlocked = new Set<number>()

    for (const lesson of lessonSources) {
      if (enrolled || lesson.isPreviewFree) {
        unlocked.add(lesson.id)
      }
    }

    return unlocked
  }, [enrolled, lessonSources])

  const modules = useMemo(() => {
    const grouped = new Map<string, CourseListItemData[]>()

    for (const lesson of lessonSources) {
      const locked = !isLessonUnlocked.has(lesson.id)
      if (!grouped.has(lesson.group)) {
        grouped.set(lesson.group, [])
      }

      grouped.get(lesson.group)?.push({
        id: lesson.id,
        title: lesson.title,
        duration: lesson.duration,
        completed: completedLessonIds.includes(lesson.id),
        locked,
        statusLabel: locked ? 'Bị khóa' : undefined,
      })
    }

    return Array.from(grouped.entries()).map(([title, lessons], index) => ({
      id: index + 1,
      title,
      lessons,
    }))
  }, [completedLessonIds, isLessonUnlocked, lessonSources])

  const allLessons = modules.flatMap((module) => module.lessons)
  const lessonIds = allLessons.map((lesson) => lesson.id)
  const currentLessonIndex = lessonIds.findIndex((id) => id === currentLesson)
  const currentLessonData = allLessons.find((lesson) => lesson.id === currentLesson)
  const currentLessonDetail = currentLesson ? lessonMap.get(currentLesson) : undefined
  const currentLessonHasQuiz = Boolean(currentLessonDetail?.hasQuiz)
  const currentLessonVideoUrl = currentLessonDetail?.videoUrl ?? ''
  const shouldShowVideo = isLessonUnlocked.has(currentLesson) && Boolean(
    currentLessonVideoUrl && !unavailableVideoIds.includes(currentLesson)
  )

  const progressPercentage = allLessons.length
    ? (allLessons.filter((lesson) => lesson.completed).length / allLessons.length) * 100
    : 0

  const reviews = course.reviews ?? []

  const comments = currentLessonDetail?.comments ?? []

  const notes = currentLesson > 0 ? (noteDrafts[currentLesson] ?? '') : ''

  const setNotes = (value: string) => {
    if (currentLesson <= 0) {
      return
    }

    setNoteDrafts((prev) => ({
      ...prev,
      [currentLesson]: value,
    }))
  }

  const clearCurrentLessonNoteDraft = () => {
    if (currentLesson <= 0) {
      return
    }

    setNoteDrafts((prev) => ({
      ...prev,
      [currentLesson]: '',
    }))
  }

  const handleCompleteLesson = () => {
    if (currentLesson > 0 && !completedLessonIds.includes(currentLesson)) {
      setCompletedLessonIds((prev) => [...prev, currentLesson])
    }

    const nextLesson = allLessons.slice(currentLessonIndex + 1).find((lesson) => !lesson.locked)
    if (nextLesson) {
      setCurrentLesson(nextLesson.id)
    }
  }

  const handleVideoError = () => {
    setUnavailableVideoIds((prev) => (prev.includes(currentLesson) ? prev : [...prev, currentLesson]))
  }

  return {
    comments,
    currentLesson,
    currentLessonData,
    currentLessonDetail,
    currentLessonHasQuiz,
    currentLessonIndex,
    currentLessonVideoUrl,
    handleCompleteLesson,
    handleVideoError,
    lessonIds,
    modules,
    notes,
    progressPercentage,
    reviews,
    setCurrentLesson,
    setNotes,
    clearCurrentLessonNoteDraft,
    shouldShowVideo,
  }
}
