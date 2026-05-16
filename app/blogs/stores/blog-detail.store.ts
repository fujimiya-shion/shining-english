'use client'

import { Blog } from '@/data/models/blog.model'
import { IBlogRepository } from '@/data/repositories/remote/blog/blog.repository.interface'
import { AppStatus } from '@/shared/enums/app-status'
import { resolveClient } from '@/shared/ioc/client-container'
import { IOC_TOKENS } from '@/shared/ioc/tokens'
import { useStarStore } from '@/shared/stores/star.store'
import { resolveApiErrorMessage } from '@/shared/utils/api-error-message'
import { create } from 'zustand'

type BlogDetailStoreProps = {
  status: AppStatus
  actionStatus: AppStatus
  blog: Blog | null
  starBalance: number | null
  message: string | null
  errorMessage: string | null
}

type BlogDetailStoreState = BlogDetailStoreProps & {
  fetchBySlug: (slug: string) => Promise<boolean>
  unlock: () => Promise<boolean>
  clearFeedback: () => void
  reset: () => void
}

const initState: BlogDetailStoreProps = {
  status: AppStatus.initial,
  actionStatus: AppStatus.initial,
  blog: null,
  starBalance: null,
  message: null,
  errorMessage: null,
}

function resolveBlogRepository(): IBlogRepository {
  return resolveClient<IBlogRepository>(IOC_TOKENS.BLOG_REPOSITORY)
}

export const useBlogDetailStore = create<BlogDetailStoreState>((set, get) => ({
  ...initState,

  fetchBySlug: async (slug) => {
    set({
      status: AppStatus.loading,
      errorMessage: null,
    })

    const result = await resolveBlogRepository().getBySlug(slug)

    if (!result.response) {
      set({
        status: AppStatus.error,
        blog: null,
        errorMessage: resolveApiErrorMessage(result.exception),
      })
      return false
    }

    set({
      status: AppStatus.done,
      blog: result.response.data.blog,
      starBalance:
        typeof result.response.data.starBalance === 'number'
          ? result.response.data.starBalance
          : null,
      errorMessage: null,
    })

    useStarStore.getState().syncBalance(result.response.data.starBalance)
    return true
  },

  unlock: async () => {
    const state = get()
    if (!state.blog?.id || typeof state.blog.id !== 'number') {
      return false
    }

    set({
      actionStatus: AppStatus.loading,
      message: null,
      errorMessage: null,
    })

    const result = await resolveBlogRepository().unlock(state.blog.id)

    if (!result.response) {
      set({
        actionStatus: AppStatus.error,
        errorMessage: resolveApiErrorMessage(result.exception),
      })
      return false
    }

    set({
      actionStatus: AppStatus.success,
      blog: result.response.data.blog,
      starBalance:
        typeof result.response.data.starBalance === 'number'
          ? result.response.data.starBalance
          : null,
      message: 'Mở bài viết thành công.',
      errorMessage: null,
    })

    useStarStore.getState().syncBalance(result.response.data.starBalance)
    return true
  },

  clearFeedback: () =>
    set({
      message: null,
      errorMessage: null,
    }),

  reset: () => set({ ...initState }),
}))
