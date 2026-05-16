'use client'

import { IBlogRepository } from '@/data/repositories/remote/blog/blog.repository.interface'
import { AppStatus } from '@/shared/enums/app-status'
import { resolveClient } from '@/shared/ioc/client-container'
import { IOC_TOKENS } from '@/shared/ioc/tokens'
import { resolveApiErrorMessage } from '@/shared/utils/api-error-message'
import { create } from 'zustand'

type StarStoreProps = {
  status: AppStatus
  balance: number | null
  errorMessage: string | null
}

type StarStoreState = StarStoreProps & {
  initial: () => Promise<boolean>
  fetchBalance: () => Promise<boolean>
  syncBalance: (balance: number | null | undefined) => void
  reset: () => void
}

const initState: StarStoreProps = {
  status: AppStatus.initial,
  balance: null,
  errorMessage: null,
}

function resolveBlogRepository(): IBlogRepository {
  return resolveClient<IBlogRepository>(IOC_TOKENS.BLOG_REPOSITORY)
}

export const useStarStore = create<StarStoreState>((set, get) => ({
  ...initState,

  initial: async () => {
    if (get().status === AppStatus.loading) {
      return false
    }

    if (get().status === AppStatus.done) {
      return true
    }

    return get().fetchBalance()
  },

  fetchBalance: async () => {
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
      balance:
        typeof result.response.data.starBalance === 'number'
          ? result.response.data.starBalance
          : null,
      errorMessage: null,
    })
    return true
  },

  syncBalance: (balance) =>
    set({
      status: AppStatus.done,
      balance: typeof balance === 'number' ? balance : null,
      errorMessage: null,
    }),

  reset: () => set({ ...initState }),
}))
