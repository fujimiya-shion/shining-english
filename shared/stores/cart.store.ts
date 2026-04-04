'use client'

import { CartItem } from '@/data/models/cart-item.model'
import { ICartRepository } from '@/data/repositories/remote/cart/cart.repository.interface'
import { AppStatus } from '@/shared/enums/app-status'
import { resolveClient } from '@/shared/ioc/client-container'
import { IOC_TOKENS } from '@/shared/ioc/tokens'
import { resolveApiErrorMessage } from '@/shared/utils/api-error-message'
import { create } from 'zustand'

export interface CartStoreProps {
  status: AppStatus
  countStatus: AppStatus
  actionStatus: AppStatus
  items: CartItem[]
  itemsCount: number
  quantityCount: number
  errorMessage: string | null
}

export interface CartStoreState extends CartStoreProps {
  fetchItems: () => Promise<boolean>
  fetchCount: () => Promise<boolean>
  refresh: () => Promise<boolean>
  removeCourse: (courseId: number) => Promise<boolean>
  clearCart: () => Promise<boolean>
  syncFromItems: (items: CartItem[]) => void
  reset: () => void
}

const initState: CartStoreProps = {
  status: AppStatus.initial,
  countStatus: AppStatus.initial,
  actionStatus: AppStatus.initial,
  items: [],
  itemsCount: 0,
  quantityCount: 0,
  errorMessage: null,
}

function resolveCartRepository(): ICartRepository {
  return resolveClient<ICartRepository>(IOC_TOKENS.CART_REPOSITORY)
}

function buildCounts(items: CartItem[]) {
  return {
    itemsCount: items.length,
    quantityCount: items.reduce((total, item) => total + Math.max(1, item.quantity ?? 1), 0),
  }
}

export const useCartStore = create<CartStoreState>((set, get) => ({
  ...initState,

  fetchItems: async () => {
    set({
      status: AppStatus.loading,
      errorMessage: null,
    })

    const result = await resolveCartRepository().getItems()

    if (!result.response) {
      set({
        status: AppStatus.error,
        items: [],
        itemsCount: 0,
        quantityCount: 0,
        errorMessage: resolveApiErrorMessage(result.exception),
      })
      return false
    }

    const items = result.response.data
    set({
      status: AppStatus.done,
      items,
      ...buildCounts(items),
      errorMessage: null,
    })
    return true
  },

  fetchCount: async () => {
    set({
      countStatus: AppStatus.loading,
      errorMessage: null,
    })

    const result = await resolveCartRepository().getCount()

    if (!result.response) {
      set({
        countStatus: AppStatus.error,
        itemsCount: 0,
        quantityCount: 0,
        errorMessage: resolveApiErrorMessage(result.exception),
      })
      return false
    }

    set({
      countStatus: AppStatus.done,
      itemsCount: result.response.data.items,
      quantityCount: result.response.data.quantity,
      errorMessage: null,
    })
    return true
  },

  refresh: async () => {
    const success = await get().fetchItems()

    if (!success) {
      return false
    }

    set({
      countStatus: AppStatus.done,
    })
    return true
  },

  removeCourse: async (courseId) => {
    set({
      actionStatus: AppStatus.loading,
      errorMessage: null,
    })

    const result = await resolveCartRepository().removeCourse(courseId)

    if (!result.response) {
      set({
        actionStatus: AppStatus.error,
        errorMessage: resolveApiErrorMessage(result.exception),
      })
      return false
    }

    const nextItems = get().items.filter(
      (item) => Number(item.courseId ?? item.course?.id ?? 0) !== courseId,
    )

    set({
      actionStatus: AppStatus.success,
      items: nextItems,
      ...buildCounts(nextItems),
      errorMessage: null,
    })
    return true
  },

  clearCart: async () => {
    set({
      actionStatus: AppStatus.loading,
      errorMessage: null,
    })

    const result = await resolveCartRepository().clear()

    if (!result.response) {
      set({
        actionStatus: AppStatus.error,
        errorMessage: resolveApiErrorMessage(result.exception),
      })
      return false
    }

    set({
      actionStatus: AppStatus.success,
      status: AppStatus.done,
      countStatus: AppStatus.done,
      items: [],
      itemsCount: 0,
      quantityCount: 0,
      errorMessage: null,
    })
    return true
  },

  syncFromItems: (items) =>
    set({
      items,
      ...buildCounts(items),
      status: AppStatus.done,
      countStatus: AppStatus.done,
    }),

  reset: () => set({ ...initState }),
}))
