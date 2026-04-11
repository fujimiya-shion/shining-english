'use client'

import { CourseListItemData } from '@/shared/components/ui/course/course-list-item'

export type CourseLearningPlayerModule = {
  id: number
  title: string
  lessons: CourseListItemData[]
}

export type CourseLearningPlayerComment = {
  id: number | string
  name: string
  content: string
  time: string
}

export type CourseLearningPlayerNote = {
  id: number | string
  content: string
  time: string
  lessonName: string
  courseName?: string
}

export type CourseLearningPlayerReview = {
  id: number | string
  name: string
  rating: number
  content: string
  time: string
}

export type CourseLearningPlayerLessonSummary = CourseListItemData

export type CourseLearningPlayerLessonDetail = {
  description?: string
}

export type CourseLearningPlayerMeta = {
  title: string
  subtitle: string
  instructor: string
  level: string
  rating: number
  reviewCount: number
  totalLessons: number
  totalHours: number
}
