'use client'

import { SerializedCourse } from '@/data/models/course.model'
import { CourseListItemData } from '@/shared/components/ui/course/course-list-item'
import { formatRelativeTime } from '@/shared/utils/date-time-utils'
import { stripHtml } from '@/shared/utils/string-utils'
import { resolveProxyVideoUrl } from '@/shared/utils/video-utils'
import { useEffect, useMemo, useState } from 'react'

type CourseLearningPlayerModule = {
  id: number
  title: string
  lessons: CourseListItemData[]
}

function resolveLessonVideoUrl(lessonId?: number | string, value?: string): string {
  return resolveProxyVideoUrl('lessons', lessonId, value)
}

export function useCourseLearningPlayerState({
  course,
  enrolled,
}: {
  course: SerializedCourse
  enrolled: boolean
}) {
  const lessonSources = useMemo(
    () =>
      (course.lessons ?? []).map((lesson, index) => ({
        id: Number(lesson.id ?? index + 1),
        title: lesson.name ?? `Bài học ${index + 1}`,
        group: lesson.groupName?.trim() || 'Danh sách bài học',
        description: lesson.description ? stripHtml(lesson.description) : '',
        videoUrl: resolveLessonVideoUrl(lesson.id, lesson.videoUrl),
        duration: lesson.durationMinutes,
        comments: lesson.comments ?? [],
      })),
    [course.lessons]
  )

  const initialLessonId = useMemo(() => {
    return lessonSources.find((lesson) => lesson.videoUrl)?.id ?? lessonSources[0]?.id ?? 0
  }, [lessonSources])

  const [currentLesson, setCurrentLesson] = useState(initialLessonId)
  const [completedLessonIds, setCompletedLessonIds] = useState<number[]>([])
  const [unavailableVideoIds, setUnavailableVideoIds] = useState<number[]>([])
  const [noteDrafts, setNoteDrafts] = useState<Record<number, string>>({})
  const normalizedDescription = course.description ? stripHtml(course.description) : ''

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

  const modules = useMemo<CourseLearningPlayerModule[]>(() => {
    const grouped = new Map<string, CourseListItemData[]>()
    const isLocked = !enrolled

    for (const lesson of lessonSources) {
      if (!grouped.has(lesson.group)) {
        grouped.set(lesson.group, [])
      }

      grouped.get(lesson.group)?.push({
        id: lesson.id,
        title: lesson.title,
        duration: lesson.duration,
        completed: completedLessonIds.includes(lesson.id),
        locked: isLocked,
        statusLabel: enrolled ? undefined : 'Bị khóa',
      })
    }

    return Array.from(grouped.entries()).map(([title, lessons], index) => ({
      id: index + 1,
      title,
      lessons,
    }))
  }, [completedLessonIds, enrolled, lessonSources])

  const allLessons = modules.flatMap((module) => module.lessons)
  const lessonIds = allLessons.map((lesson) => lesson.id)
  const currentLessonIndex = lessonIds.findIndex((id) => id === currentLesson)
  const currentLessonData = allLessons.find((lesson) => lesson.id === currentLesson)
  const currentLessonDetail = currentLesson ? lessonMap.get(currentLesson) : undefined
  const currentLessonVideoUrl = currentLessonDetail?.videoUrl ?? ''
  const shouldShowVideo = enrolled && Boolean(
    currentLessonVideoUrl && !unavailableVideoIds.includes(currentLesson)
  )

  const totalDurationMinutes = lessonSources.reduce((total, lesson) => total + (lesson.duration ?? 0), 0)

  const courseMeta = {
    title: course.name ?? 'Khóa học tiếng Anh',
    subtitle: normalizedDescription || 'Lộ trình ngắn gọn, dễ hiểu, phù hợp tự học',
    instructor: 'Shining English',
    level: course.level?.name ?? 'Tiếng Anh tổng quát',
    rating: course.rating ?? 0,
    reviewCount: course.reviews?.length ?? 0,
    totalLessons: lessonSources.length,
    totalHours: Number((totalDurationMinutes / 60).toFixed(1)),
  }

  const progressPercentage = allLessons.length
    ? (allLessons.filter((lesson) => lesson.completed).length / allLessons.length) * 100
    : 0

  const reviews = useMemo(
    () =>
      (course.reviews ?? []).map((review, index) => ({
        id: review.id ?? `review-${index}`,
        name: review.user?.name?.trim() || 'Học viên',
        rating: review.rating ?? 0,
        content: review.content?.trim() || 'Đánh giá đang được cập nhật.',
        time: formatRelativeTime(review.createdAt),
      })),
    [course.reviews]
  )

  const comments = useMemo(
    () =>
      (currentLessonDetail?.comments ?? []).map((comment, index) => ({
        id: comment.id ?? `comment-${index}`,
        name: comment.user?.name?.trim() || 'Học viên',
        content: comment.content?.trim() || 'Bình luận đang được cập nhật.',
        time: formatRelativeTime(comment.createdAt),
      })),
    [currentLessonDetail?.comments]
  )

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
    courseMeta,
    currentLesson,
    currentLessonData,
    currentLessonDetail,
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
