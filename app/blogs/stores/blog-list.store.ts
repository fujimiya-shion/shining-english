'use client'

import { Blog, BlogTagModel } from '@/data/models/blog.model'
import { IBlogRepository } from '@/data/repositories/remote/blog/blog.repository.interface'
import { AppStatus } from '@/shared/enums/app-status'
import { resolveClient } from '@/shared/ioc/client-container'
import { IOC_TOKENS } from '@/shared/ioc/tokens'
import { useStarStore } from '@/shared/stores/star.store'
import { resolveApiErrorMessage } from '@/shared/utils/api-error-message'
import { create } from 'zustand'

type BlogListStoreProps = {
  status: AppStatus
  blogs: Blog[]
  topics: BlogTagModel[]
  starBalance: number | null
  query: string
  errorMessage: string | null
}

type BlogListStoreState = BlogListStoreProps & {
  initial: () => Promise<boolean>
  setQuery: (value: string) => void
  reset: () => void
}

const initState: BlogListStoreProps = {
  status: AppStatus.initial,
  blogs: [],
  topics: [],
  starBalance: null,
  query: '',
  errorMessage: null,
}

function resolveBlogRepository(): IBlogRepository {
  return resolveClient<IBlogRepository>(IOC_TOKENS.BLOG_REPOSITORY)
}

export const useBlogListStore = create<BlogListStoreState>((set, get) => ({
  ...initState,

  initial: async () => {
    if (get().status === AppStatus.loading) {
      return false
    }

    set({
      status: AppStatus.loading,
      errorMessage: null,
    })

    const result = await resolveBlogRepository().getAll()

    if (!result.response) {
      set({
        status: AppStatus.error,
        errorMessage: resolveApiErrorMessage(result.exception),
      })
      return false
    }

    set({
      status: AppStatus.done,
      blogs: result.response.data.items,
      topics: result.response.data.topics,
      starBalance:
        typeof result.response.data.starBalance === 'number'
          ? result.response.data.starBalance
          : null,
      errorMessage: null,
    })

    useStarStore.getState().syncBalance(result.response.data.starBalance)
    return true
  },

  setQuery: (value) => set({ query: value }),

  reset: () => set({ ...initState }),
}))
