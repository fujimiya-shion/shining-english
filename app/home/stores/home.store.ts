'use client'

import { HomePageModel } from '@/data/models/home.model'
import { ICartRepository } from '@/data/repositories/remote/cart/cart.repository.interface'
import { IHomeRepository } from '@/data/repositories/remote/home/home.repository.interface'
import { AppStatus } from '@/shared/enums/app-status'
import { resolveClient } from '@/shared/ioc/client-container'
import { IOC_TOKENS } from '@/shared/ioc/tokens'
import { useCartStore } from '@/shared/stores/cart.store'
import { resolveApiErrorMessage } from '@/shared/utils/api-error-message'
import { create } from 'zustand'

type HomeStoreProps = {
  status: AppStatus
  actionStatus: AppStatus
  homePage: HomePageModel | null
  errorMessage: string | null
  actionMessage: string | null
}

type HomeStoreState = HomeStoreProps & {
  initial: () => Promise<boolean>
  fetchHomeData: () => Promise<boolean>
  addCourseToCart: (courseId: number) => Promise<boolean>
  clearActionFeedback: () => void
  reset: () => void
}

const initState: HomeStoreProps = {
  status: AppStatus.initial,
  actionStatus: AppStatus.initial,
  homePage: null,
  errorMessage: null,
  actionMessage: null,
}

function resolveHomeRepository(): IHomeRepository {
  return resolveClient<IHomeRepository>(IOC_TOKENS.HOME_REPOSITORY)
}

function resolveCartRepository(): ICartRepository {
  return resolveClient<ICartRepository>(IOC_TOKENS.CART_REPOSITORY)
}

export const useHomeStore = create<HomeStoreState>((set, get) => ({
  ...initState,

  initial: async () => {
    if (get().status !== AppStatus.initial) {
      return get().status === AppStatus.done
    }

    return get().fetchHomeData()
  },

  fetchHomeData: async () => {
    if (get().status === AppStatus.loading) {
      return false
    }

    set({
      status: AppStatus.loading,
      errorMessage: null,
    })

    const result = await resolveHomeRepository().getPageData()

    if (!result.response) {
      set({
        status: AppStatus.error,
        errorMessage: resolveApiErrorMessage(result.exception),
      })
      return false
    }

    set({
      status: AppStatus.done,
      homePage: result.response.data,
      errorMessage: null,
    })
    return true
  },

  addCourseToCart: async (courseId) => {
    if (get().actionStatus === AppStatus.loading) {
      return false
    }

    set({
      actionStatus: AppStatus.loading,
      actionMessage: null,
      errorMessage: null,
    })

    const result = await resolveCartRepository().addCourse(courseId)

    if (!result.response) {
      set({
        actionStatus: AppStatus.error,
        actionMessage: resolveApiErrorMessage(result.exception),
      })
      return false
    }

    set({
      actionStatus: AppStatus.success,
      actionMessage: 'Đã thêm khóa học vào giỏ hàng.',
    })
    void useCartStore.getState().fetchCount()
    return true
  },

  clearActionFeedback: () =>
    set({
      actionStatus: AppStatus.initial,
      actionMessage: null,
    }),

  reset: () => set({ ...initState }),
}))
