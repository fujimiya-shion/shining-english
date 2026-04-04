'use client'

import { useEffect, useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import { AppStatus } from '@/shared/enums/app-status'
import { useAuthStore } from '@/shared/stores/auth.store'
import { useCartStore } from '@/shared/stores/cart.store'
import { normalizeReturnTo } from '@/shared/utils/return-to-utils'
import { useCheckoutStore } from '../stores/checkout.store'
import {
  CheckoutAuthRequiredState,
  CheckoutBillingSection,
  CheckoutEmptyState,
  CheckoutSuccessState,
  CheckoutSummaryCard,
  type CheckoutDisplayItem,
} from './checkout-page-sections'

function parseBuyNowCourse(searchParams: URLSearchParams) {
  const courseId = Number(searchParams.get('courseId') ?? 0)
  const title = searchParams.get('title')?.trim() ?? ''

  if (!courseId || !title) {
    return null
  }

  return {
    id: courseId,
    title,
    price: Number(searchParams.get('price') ?? 0),
    image: searchParams.get('image') ?? '',
  }
}

export function CheckoutPageClient() {
  const searchParams = useSearchParams()
  const authStatus = useAuthStore((state) => state.status)
  const authenticated = useAuthStore((state) => state.authenticated)
  const currentUser = useAuthStore((state) => state.currentUser)

  const cartStatus = useCartStore((state) => state.status)
  const cartItems = useCartStore((state) => state.items)
  const refreshCart = useCartStore((state) => state.refresh)

  const mode = useCheckoutStore((state) => state.mode)
  const actionStatus = useCheckoutStore((state) => state.actionStatus)
  const paymentMethod = useCheckoutStore((state) => state.paymentMethod)
  const fullName = useCheckoutStore((state) => state.fullName)
  const email = useCheckoutStore((state) => state.email)
  const phone = useCheckoutStore((state) => state.phone)
  const order = useCheckoutStore((state) => state.order)
  const buyNowCourse = useCheckoutStore((state) => state.buyNowCourse)
  const errorMessage = useCheckoutStore((state) => state.errorMessage)
  const initialize = useCheckoutStore((state) => state.initialize)
  const setPaymentMethod = useCheckoutStore((state) => state.setPaymentMethod)
  const setFullName = useCheckoutStore((state) => state.setFullName)
  const setEmail = useCheckoutStore((state) => state.setEmail)
  const setPhone = useCheckoutStore((state) => state.setPhone)
  const submitOrder = useCheckoutStore((state) => state.submitOrder)
  const resetCheckout = useCheckoutStore((state) => state.reset)

  const buyNowPayload = useMemo(() => parseBuyNowCourse(searchParams), [searchParams])
  const returnTo = useMemo(
    () => normalizeReturnTo(`/checkout?${searchParams.toString()}`.replace(/\?$/, ''), '/checkout'),
    [searchParams],
  )

  useEffect(() => {
    initialize({
      mode: searchParams.get('mode'),
      fullName: currentUser?.name,
      email: currentUser?.email,
      phone: currentUser?.phone,
      buyNowCourse: buyNowPayload,
    })

    return () => {
      resetCheckout()
    }
  }, [buyNowPayload, currentUser?.email, currentUser?.name, currentUser?.phone, initialize, resetCheckout, searchParams])

  useEffect(() => {
    if (!authenticated || mode !== 'cart') {
      return
    }

    if (cartStatus === AppStatus.initial) {
      void refreshCart()
    }
  }, [authenticated, cartStatus, mode, refreshCart])

  const displayItems = useMemo<CheckoutDisplayItem[]>(() => {
    if (order?.items?.length) {
      return order.items.map((item) => ({
        id: item.id,
        title: item.course?.name ?? 'Khóa học',
        image: item.course?.thumbnail,
        price: item.price,
        quantity: item.quantity,
      }))
    }

    if (mode === 'buy_now' && buyNowCourse) {
      return [
        {
          id: buyNowCourse.id,
          title: buyNowCourse.title,
          image: buyNowCourse.image,
          price: buyNowCourse.price,
          quantity: 1,
        },
      ]
    }

    return cartItems.map((item) => ({
      id: item.id,
      title: item.course?.name ?? 'Khóa học',
      image: item.course?.thumbnail,
      price: item.course?.price ?? 0,
      quantity: Math.max(1, item.quantity ?? 1),
    }))
  }, [buyNowCourse, cartItems, mode, order])

  if (authStatus === AppStatus.initial || authStatus === AppStatus.loading) {
    return (
      <main className="min-h-full bg-[radial-gradient(1200px_circle_at_top_left,var(--sky-90)_0%,var(--sky-50)_52%,var(--white)_100%)] py-10">
        <div className="mx-auto max-w-7xl px-4 text-center text-muted-foreground sm:px-6 lg:px-8">
          Đang kiểm tra phiên đăng nhập...
        </div>
      </main>
    )
  }

  if (!authenticated) {
    return (
      <main className="min-h-full bg-[radial-gradient(1200px_circle_at_top_left,var(--sky-90)_0%,var(--sky-50)_52%,var(--white)_100%)] py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <CheckoutAuthRequiredState returnTo={returnTo} />
        </div>
      </main>
    )
  }

  if (mode === 'cart' && (cartStatus === AppStatus.initial || cartStatus === AppStatus.loading) && !order) {
    return (
      <main className="min-h-full bg-[radial-gradient(1200px_circle_at_top_left,var(--sky-90)_0%,var(--sky-50)_52%,var(--white)_100%)] py-10">
        <div className="mx-auto max-w-7xl px-4 text-center text-muted-foreground sm:px-6 lg:px-8">
          Đang tải dữ liệu checkout...
        </div>
      </main>
    )
  }

  if (order) {
    return (
      <main className="min-h-full bg-[radial-gradient(1200px_circle_at_top_left,var(--sky-90)_0%,var(--sky-50)_52%,var(--white)_100%)] py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <CheckoutSuccessState order={order} />
        </div>
      </main>
    )
  }

  if (displayItems.length === 0) {
    return (
      <main className="min-h-full bg-[radial-gradient(1200px_circle_at_top_left,var(--sky-90)_0%,var(--sky-50)_52%,var(--white)_100%)] py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <CheckoutEmptyState />
        </div>
      </main>
    )
  }

  const submitDisabled =
    actionStatus === AppStatus.loading ||
    !fullName.trim() ||
    !email.trim() ||
    !phone.trim() ||
    displayItems.length === 0

  return (
    <main className="min-h-full bg-[radial-gradient(1200px_circle_at_top_left,var(--sky-90)_0%,var(--sky-50)_52%,var(--white)_100%)] py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
          <CheckoutBillingSection
            actionStatus={actionStatus}
            email={email}
            errorMessage={errorMessage}
            fullName={fullName}
            onEmailChange={setEmail}
            onFullNameChange={setFullName}
            onPhoneChange={setPhone}
            onSubmit={() => {
              void submitOrder()
            }}
            paymentMethod={paymentMethod}
            phone={phone}
            setPaymentMethod={setPaymentMethod}
            submitDisabled={submitDisabled}
          />
          <CheckoutSummaryCard items={displayItems} mode={mode} />
        </div>
      </div>
    </main>
  )
}
