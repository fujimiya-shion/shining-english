'use client'

import { Order } from '@/data/models/order.model'
import { IOrderRepository } from '@/data/repositories/remote/order/order.repository.interface'
import { AppStatus } from '@/shared/enums/app-status'
import { resolveClient } from '@/shared/ioc/client-container'
import { IOC_TOKENS } from '@/shared/ioc/tokens'
import { useCartStore } from '@/shared/stores/cart.store'
import { resolveApiErrorMessage } from '@/shared/utils/api-error-message'
import { create } from 'zustand'

export type CheckoutMode = 'cart' | 'buy_now'
export type CheckoutPaymentMethod = 'payos' | 'cod'

export type CheckoutBuyNowCourse = {
  id: number
  title: string
  price: number
  image?: string
}

export interface CheckoutStoreProps {
  status: AppStatus
  actionStatus: AppStatus
  mode: CheckoutMode
  paymentMethod: CheckoutPaymentMethod
  fullName: string
  email: string
  phone: string
  buyNowCourse: CheckoutBuyNowCourse | null
  order: Order | null
  errorMessage: string | null
}

export interface CheckoutStoreState extends CheckoutStoreProps {
  initialize: (payload: {
    mode?: string | null
    fullName?: string | null
    email?: string | null
    phone?: string | null
    buyNowCourse?: CheckoutBuyNowCourse | null
  }) => void
  setFullName: (value: string) => void
  setEmail: (value: string) => void
  setPhone: (value: string) => void
  setPaymentMethod: (value: CheckoutPaymentMethod) => void
  submitOrder: () => Promise<boolean>
  reset: () => void
}

const initState: CheckoutStoreProps = {
  status: AppStatus.initial,
  actionStatus: AppStatus.initial,
  mode: 'cart',
  paymentMethod: 'payos',
  fullName: '',
  email: '',
  phone: '',
  buyNowCourse: null,
  order: null,
  errorMessage: null,
}

function resolveOrderRepository(): IOrderRepository {
  return resolveClient<IOrderRepository>(IOC_TOKENS.ORDER_REPOSITORY)
}

export const useCheckoutStore = create<CheckoutStoreState>((set, get) => ({
  ...initState,

  initialize: ({ mode, fullName, email, phone, buyNowCourse }) =>
    set({
      status: AppStatus.done,
      mode: mode === 'buy_now' ? 'buy_now' : 'cart',
      fullName: fullName?.trim() ?? '',
      email: email?.trim() ?? '',
      phone: phone?.trim() ?? '',
      buyNowCourse: buyNowCourse ?? null,
      order: null,
      errorMessage: null,
      actionStatus: AppStatus.initial,
    }),

  setFullName: (value) => set({ fullName: value }),
  setEmail: (value) => set({ email: value }),
  setPhone: (value) => set({ phone: value }),
  setPaymentMethod: (value) => set({ paymentMethod: value }),

  submitOrder: async () => {
    const state = get()

    set({
      actionStatus: AppStatus.loading,
      errorMessage: null,
    })

    const result =
      state.mode === 'buy_now' && state.buyNowCourse
        ? await resolveOrderRepository().createBuyNow(state.buyNowCourse.id, 1, state.paymentMethod)
        : await resolveOrderRepository().createFromCart(state.paymentMethod)

    if (!result.response) {
      set({
        actionStatus: AppStatus.error,
        errorMessage: resolveApiErrorMessage(result.exception),
      })
      return false
    }

    set({
      actionStatus: AppStatus.success,
      order: result.response.data,
      errorMessage: null,
    })

    if (state.mode === 'cart') {
      useCartStore.getState().syncFromItems([])
    } else {
      void useCartStore.getState().fetchCount()
    }

    return true
  },

  reset: () => set({ ...initState }),
}))
