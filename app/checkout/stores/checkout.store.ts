'use client'

import { CheckoutOrderResponse } from '@/data/models/order-checkout-response.model'
import { Order } from '@/data/models/order.model'
import { ICourseRepository } from '@/data/repositories/remote/course/course.repository.interface'
import { IOrderRepository } from '@/data/repositories/remote/order/order.repository.interface'
import { IStarRepository } from '@/data/repositories/remote/star/star.repository.interface'
import { AppStatus } from '@/shared/enums/app-status'
import { resolveClient } from '@/shared/ioc/client-container'
import { IOC_TOKENS } from '@/shared/ioc/tokens'
import { useCartStore } from '@/shared/stores/cart.store'
import { useStarStore } from '@/shared/stores/star.store'
import { resolveApiErrorMessage } from '@/shared/utils/api-error-message'
import { create } from 'zustand'

export type CheckoutMode = 'cart' | 'buy_now'
export type CheckoutPaymentMethod = 'payos' | 'cod' | 'star'

export type CheckoutBuyNowCourse = {
  id: number
  title?: string
  price?: number
  thumbnail?: string
  slug?: string
  allowStarPayment?: boolean
  starPrice?: number
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
  checkout: CheckoutOrderResponse | null
  order: Order | null
  paymentRedirectUrl: string | null
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
  fetchBuyNowCourse: (courseId: number) => Promise<void>
  submitOrder: () => Promise<boolean>
  clearPaymentRedirect: () => void
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
  checkout: null,
  order: null,
  paymentRedirectUrl: null,
  errorMessage: null,
}

function resolveOrderRepository(): IOrderRepository {
  return resolveClient<IOrderRepository>(IOC_TOKENS.ORDER_REPOSITORY)
}

function resolveStarRepository(): IStarRepository {
  return resolveClient<IStarRepository>(IOC_TOKENS.STAR_REPOSITORY)
}

function resolveCourseRepository(): ICourseRepository {
  return resolveClient<ICourseRepository>(IOC_TOKENS.COURSE_REPOSITORY)
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
      checkout: null,
      order: null,
      paymentRedirectUrl: null,
      errorMessage: null,
      actionStatus: AppStatus.initial,
    }),

  setFullName: (value) => set({ fullName: value }),
  setEmail: (value) => set({ email: value }),
  setPhone: (value) => set({ phone: value }),
  setPaymentMethod: (value) => set({ paymentMethod: value }),

  fetchBuyNowCourse: async (courseId) => {
    const result = await resolveCourseRepository().getById(courseId)

    if (!result.response) {
      return
    }

    const course = result.response.data
    set({
      buyNowCourse: {
        id: course.id as number,
        title: course.name ?? 'Khóa học tiếng Anh',
        price: course.price ?? 0,
        thumbnail: course.thumbnail,
        slug: course.slug,
        allowStarPayment: course.allowStarPayment,
        starPrice: course.starPrice,
      },
    })
  },

  submitOrder: async () => {
    const state = get()

    set({
      actionStatus: AppStatus.loading,
      errorMessage: null,
    })

    if (state.paymentMethod === 'star' && state.mode === 'buy_now' && state.buyNowCourse) {
      const result = await resolveStarRepository().payForCourse(state.buyNowCourse.id)

      if (!result.response) {
        set({
          actionStatus: AppStatus.error,
          errorMessage: resolveApiErrorMessage(result.exception),
        })
        return false
      }

      useStarStore.getState().syncBalance(result.response.data.star_balance)

      set({
        actionStatus: AppStatus.success,
        paymentRedirectUrl: null,
        errorMessage: null,
      })

      void useCartStore.getState().fetchCount()
      return true
    }

    const pm = state.paymentMethod as 'payos' | 'cod'
    const result =
      state.mode === 'buy_now' && state.buyNowCourse
        ? await resolveOrderRepository().createBuyNow(state.buyNowCourse.id, 1, pm, {
            buyerName: state.fullName.trim(),
            buyerEmail: state.email.trim(),
            buyerPhone: state.phone.trim(),
          })
        : await resolveOrderRepository().createFromCart(pm, {
            buyerName: state.fullName.trim(),
            buyerEmail: state.email.trim(),
            buyerPhone: state.phone.trim(),
          })

    if (!result.response) {
      set({
        actionStatus: AppStatus.error,
        errorMessage: resolveApiErrorMessage(result.exception),
      })
      return false
    }

    const checkout = result.response.data
    const order = checkout.order ?? null
    const paymentRedirectUrl = checkout.paymentAction?.type === 'redirect' ? (checkout.paymentAction.url ?? null) : null

    set({
      actionStatus: AppStatus.success,
      checkout,
      order,
      paymentRedirectUrl,
      errorMessage: null,
    })

    if (state.mode === 'cart') {
      useCartStore.getState().syncFromItems([])
    } else {
      void useCartStore.getState().fetchCount()
    }

    return true
  },

  clearPaymentRedirect: () => set({ paymentRedirectUrl: null }),

  reset: () => set({ ...initState }),
}))
