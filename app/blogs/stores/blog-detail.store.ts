'use client'

import { Blog } from '@/data/models/blog.model'
import { IBlogRepository } from '@/data/repositories/remote/blog/blog.repository.interface'
import { AppStatus } from '@/shared/enums/app-status'
import { resolveClient } from '@/shared/ioc/client-container'
import { IOC_TOKENS } from '@/shared/ioc/tokens'
import { resolveApiErrorMessage } from '@/shared/utils/api-error-message'
import { create } from 'zustand'

type BlogDetailStoreProps = {
  status: AppStatus
  blog: Blog | null
  errorMessage: string | null
}

type BlogDetailStoreState = BlogDetailStoreProps & {
  fetchBySlug: (slug: string) => Promise<boolean>
  reset: () => void
}

const initState: BlogDetailStoreProps = {
  status: AppStatus.initial,
  blog: null,
  errorMessage: null,
}

function resolveBlogRepository(): IBlogRepository {
  return resolveClient<IBlogRepository>(IOC_TOKENS.BLOG_REPOSITORY)
}

export const useBlogDetailStore = create<BlogDetailStoreState>((set) => ({
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
      errorMessage: null,
    })

    return true
  },

  reset: () => set({ ...initState }),
}))
