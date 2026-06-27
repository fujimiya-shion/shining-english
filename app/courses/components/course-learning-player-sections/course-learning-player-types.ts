'use client'

import { CourseListItemData } from '@/shared/components/ui/course/course-list-item'

export type CourseLearningPlayerModule = {
  id: number
  title: string
  lessons: CourseListItemData[]
}

export type CourseLearningPlayerLessonResource = {
  id: string
  name: string
  url: string
}

export type CourseLearningPlayerLessonDetail = {
  description?: string
  resources: CourseLearningPlayerLessonResource[]
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
