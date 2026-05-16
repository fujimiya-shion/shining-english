'use client'

import { ICourseRepository } from '@/data/repositories/remote/course/course.repository.interface'
import { AppStatus } from '@/shared/enums/app-status'
import { resolveClient } from '@/shared/ioc/client-container'
import { IOC_TOKENS } from '@/shared/ioc/tokens'
import { resolveApiErrorMessage } from '@/shared/utils/api-error-message'
import { create } from 'zustand'

type CourseFeedbackStoreProps = {
  reviewActionStatus: AppStatus
  commentActionStatus: AppStatus
  reviewRating: number
  reviewContent: string
  commentContent: string
  reviewMessage: string | null
  commentMessage: string | null
  reviewErrorMessage: string | null
  commentErrorMessage: string | null
}

type CourseFeedbackStoreState = CourseFeedbackStoreProps & {
  setReviewRating: (rating: number) => void
  setReviewContent: (content: string) => void
  setCommentContent: (content: string) => void
  submitReview: (courseId: number) => Promise<boolean>
  submitComment: (lessonId: number) => Promise<boolean>
  clearFeedback: () => void
  reset: () => void
}

const initState: CourseFeedbackStoreProps = {
  reviewActionStatus: AppStatus.initial,
  commentActionStatus: AppStatus.initial,
  reviewRating: 5,
  reviewContent: '',
  commentContent: '',
  reviewMessage: null,
  commentMessage: null,
  reviewErrorMessage: null,
  commentErrorMessage: null,
}

function resolveCourseRepository(): ICourseRepository {
  return resolveClient<ICourseRepository>(IOC_TOKENS.COURSE_REPOSITORY)
}

export const useCourseFeedbackStore = create<CourseFeedbackStoreState>((set, get) => ({
  ...initState,

  setReviewRating: (rating) => {
    const normalized = Math.min(5, Math.max(1, Math.round(rating)))
    set({ reviewRating: normalized })
  },

  setReviewContent: (content) => set({ reviewContent: content }),
  setCommentContent: (content) => set({ commentContent: content }),

  submitReview: async (courseId) => {
    const state = get()
    const content = state.reviewContent.trim()

    if (!courseId || !content) {
      return false
    }

    set({
      reviewActionStatus: AppStatus.loading,
      reviewMessage: null,
      reviewErrorMessage: null,
    })

    const result = await resolveCourseRepository().createReview(courseId, {
      rating: state.reviewRating,
      content,
    })

    if (!result.response) {
      set({
        reviewActionStatus: AppStatus.error,
        reviewMessage: null,
        reviewErrorMessage: resolveApiErrorMessage(result.exception),
      })
      return false
    }

    set({
      reviewActionStatus: AppStatus.success,
      reviewMessage: 'Đã gửi đánh giá.',
      reviewErrorMessage: null,
      reviewContent: '',
    })
    return true
  },

  submitComment: async (lessonId) => {
    const state = get()
    const content = state.commentContent.trim()

    if (!lessonId || !content) {
      return false
    }

    set({
      commentActionStatus: AppStatus.loading,
      commentMessage: null,
      commentErrorMessage: null,
    })

    const result = await resolveCourseRepository().createComment(lessonId, { content })

    if (!result.response) {
      set({
        commentActionStatus: AppStatus.error,
        commentMessage: null,
        commentErrorMessage: resolveApiErrorMessage(result.exception),
      })
      return false
    }

    set({
      commentActionStatus: AppStatus.success,
      commentMessage: 'Đã gửi bình luận.',
      commentErrorMessage: null,
      commentContent: '',
    })
    return true
  },

  clearFeedback: () =>
    set({
      reviewMessage: null,
      commentMessage: null,
      reviewErrorMessage: null,
      commentErrorMessage: null,
    }),

  reset: () => set({ ...initState }),
}))
