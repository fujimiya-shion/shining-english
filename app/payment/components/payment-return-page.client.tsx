'use client'

import Link from 'next/link'
import { Suspense, useEffect, useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import { AppButton } from '@/shared/components/ui/app-button'
import { Button } from '@/shared/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/components/ui/card'
import { AppStatus } from '@/shared/enums/app-status'
import { useAuthStore } from '@/shared/stores/auth.store'
import { formatPrice } from '@/shared/utils/currency-utils'
import { usePaymentReturnStore } from '../stores/payment-return.store'

function parseOrderId(value: string | null): number | null {
  const parsed = Number(value ?? 0)

  return Number.isFinite(parsed) && parsed > 0 ? parsed : null
}

function PaymentReturnPageContent({ outcome }: { outcome: 'success' | 'fail' }) {
  const searchParams = useSearchParams()
  const authStatus = useAuthStore((state) => state.status)
  const authenticated = useAuthStore((state) => state.authenticated)
  const fetchMe = useAuthStore((state) => state.fetchMe)

  const status = usePaymentReturnStore((state) => state.status)
  const order = usePaymentReturnStore((state) => state.order)
  const errorMessage = usePaymentReturnStore((state) => state.errorMessage)
  const initialize = usePaymentReturnStore((state) => state.initialize)
  const fetchOrder = usePaymentReturnStore((state) => state.fetchOrder)
  const reset = usePaymentReturnStore((state) => state.reset)

  const orderId = useMemo(() => parseOrderId(searchParams.get('orderCode')), [searchParams])

  useEffect(() => {
    if (authStatus === AppStatus.initial) {
      void fetchMe()
    }
  }, [authStatus, fetchMe])

  useEffect(() => {
    initialize(outcome)

    return () => {
      reset()
    }
  }, [initialize, outcome, reset])

  useEffect(() => {
    if (!authenticated || orderId === null) {
      return
    }

    void fetchOrder(orderId)
  }, [authenticated, fetchOrder, orderId])

  if (authStatus === AppStatus.initial || authStatus === AppStatus.loading) {
    return (
      <main className="min-h-full bg-[radial-gradient(1200px_circle_at_top_left,var(--sky-110)_0%,var(--sky-60)_50%,var(--white)_100%)] px-4 py-12">
        <div className="mx-auto w-full max-w-3xl text-center text-muted-foreground">Đang kiểm tra phiên đăng nhập...</div>
      </main>
    )
  }

  if (!authenticated) {
    return (
      <main className="min-h-full bg-[radial-gradient(1200px_circle_at_top_left,var(--sky-110)_0%,var(--sky-60)_50%,var(--white)_100%)] px-4 py-12">
        <div className="mx-auto w-full max-w-3xl">
          <Card className="border-border/70 bg-white/95 text-center shadow-[0_24px_70px_-50px_rgba(15,43,82,0.35)]">
            <CardHeader className="space-y-2">
              <CardTitle className="text-3xl">Cần đăng nhập để kiểm tra thanh toán</CardTitle>
              <CardDescription>
                Hệ thống cần xác nhận đúng tài khoản trước khi tải trạng thái đơn hàng từ cổng thanh toán.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center gap-3">
              <AppButton asChild className="h-11 rounded-full">
                <Link href="/login">Đăng nhập</Link>
              </AppButton>
              <Button asChild variant="outline" className="h-11 rounded-full bg-transparent">
                <Link href="/">Về trang chủ</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    )
  }

  if (orderId === null) {
    return (
      <main className="min-h-full bg-[radial-gradient(1200px_circle_at_top_left,var(--sky-110)_0%,var(--sky-60)_50%,var(--white)_100%)] px-4 py-12">
        <div className="mx-auto w-full max-w-3xl">
          <Card className="border-border/70 bg-white/95 text-center shadow-[0_24px_70px_-50px_rgba(15,43,82,0.35)]">
            <CardHeader className="space-y-2">
              <CardTitle className="text-3xl">Không tìm thấy mã đơn hàng</CardTitle>
              <CardDescription>Không thể xác nhận trạng thái thanh toán vì thiếu thông tin đơn hàng.</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center gap-3">
              <Button asChild variant="outline" className="h-11 rounded-full bg-transparent">
                <Link href="/checkout">Quay lại checkout</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    )
  }

  if (status === AppStatus.loading || status === AppStatus.initial) {
    return (
      <main className="min-h-full bg-[radial-gradient(1200px_circle_at_top_left,var(--sky-110)_0%,var(--sky-60)_50%,var(--white)_100%)] px-4 py-12">
        <div className="mx-auto w-full max-w-3xl text-center text-muted-foreground">Đang đồng bộ trạng thái thanh toán...</div>
      </main>
    )
  }

  if (status === AppStatus.error || !order) {
    return (
      <main className="min-h-full bg-[radial-gradient(1200px_circle_at_top_left,var(--sky-110)_0%,var(--sky-60)_50%,var(--white)_100%)] px-4 py-12">
        <div className="mx-auto w-full max-w-3xl">
          <Card className="border-border/70 bg-white/95 text-center shadow-[0_24px_70px_-50px_rgba(15,43,82,0.35)]">
            <CardHeader className="space-y-2">
              <CardTitle className="text-3xl">Không tải được trạng thái thanh toán</CardTitle>
              <CardDescription>{errorMessage ?? 'Vui lòng thử lại sau hoặc liên hệ hỗ trợ.'}</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center gap-3">
              <AppButton asChild className="h-11 rounded-full">
                <Link href="/orders">Xem đơn hàng</Link>
              </AppButton>
            </CardContent>
          </Card>
        </div>
      </main>
    )
  }

  const isPaid = order.status === 'paid'
  const isCancelled = order.status === 'cancelled'
  const title = isPaid
    ? 'Thanh toán thành công'
    : isCancelled
      ? 'Thanh toán đã bị hủy'
      : outcome === 'success'
        ? 'Đang chờ PayOS xác nhận'
        : 'Thanh toán chưa hoàn tất'

  const description = isPaid
    ? `Đơn hàng #${order.id} đã thanh toán thành công với tổng giá trị ${formatPrice(order.totalAmount)}.`
    : isCancelled
      ? `Đơn hàng #${order.id} hiện đã bị hủy. Bạn có thể quay lại checkout để tạo giao dịch mới.`
      : `Đơn hàng #${order.id} đã được tạo nhưng hệ thống vẫn đang chờ trạng thái cuối từ PayOS.`

  return (
    <main className="min-h-full bg-[radial-gradient(1200px_circle_at_top_left,var(--sky-110)_0%,var(--sky-60)_50%,var(--white)_100%)] px-4 py-12">
      <div className="mx-auto w-full max-w-3xl">
        <Card className="border-border/70 bg-white/95 text-center shadow-[0_24px_70px_-50px_rgba(15,43,82,0.35)]">
          <CardHeader className="space-y-2">
            <CardTitle className="text-3xl">{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="rounded-2xl border border-border/70 bg-[color:var(--sky-70)] p-4 text-sm text-muted-foreground">
              Trạng thái hiện tại: <span className="font-medium text-[color:var(--brand-900)]">{order.status ?? 'pending'}</span>
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              <AppButton asChild className="h-11 rounded-full">
                <Link href={isPaid ? '/dashboard' : '/checkout'}>{isPaid ? 'Vào dashboard' : 'Quay lại checkout'}</Link>
              </AppButton>
              <Button asChild variant="outline" className="h-11 rounded-full bg-transparent">
                <Link href="/orders">Xem đơn hàng</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}

export function PaymentReturnPageClient({ outcome }: { outcome: 'success' | 'fail' }) {
  return (
    <Suspense
      fallback={
        <main className="min-h-full bg-[radial-gradient(1200px_circle_at_top_left,var(--sky-110)_0%,var(--sky-60)_50%,var(--white)_100%)] px-4 py-12">
          <div className="mx-auto w-full max-w-3xl text-center text-muted-foreground">Đang tải trạng thái thanh toán...</div>
        </main>
      }
    >
      <PaymentReturnPageContent outcome={outcome} />
    </Suspense>
  )
}
