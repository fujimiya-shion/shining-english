'use client'

import { CourseLearningPlayerAuthenticatedView } from '@/app/courses/components/course-learning-player-authenticated-view.client'
import { CourseLearningPlayerGuestView } from '@/app/courses/components/course-learning-player-guest-view.client'
import { SerializedCourse } from '@/data/models/course.model'
import { AppStatus } from '@/shared/enums/app-status'
import { useAuthStore } from '@/shared/stores/auth.store'
import { CourseLearningPlayerLoadingState } from './course-learning-player-sections'

export function CourseLearningPlayerClient({ course }: { course: SerializedCourse }) {
  const authStatus = useAuthStore((state) => state.status)
  const authenticated = useAuthStore((state) => state.authenticated)

  if (authStatus === AppStatus.initial || authStatus === AppStatus.loading) {
    return <CourseLearningPlayerLoadingState message="Đang đồng bộ trạng thái tài khoản..." />
  }

  if (!authenticated) {
    return <CourseLearningPlayerGuestView course={course} authenticated={authenticated} />
  }

  return <CourseLearningPlayerAuthenticatedView course={course} authenticated={authenticated} />
}
