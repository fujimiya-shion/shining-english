'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { AppButton } from '@/shared/components/ui/app-button'
import { Button } from '@/shared/components/ui/button'
import { AppConfirmModal } from '@/shared/components/ui/app-confirm-modal'
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card'
import { AppStatus } from '@/shared/enums/app-status'
import { ORDER_STATUS_LABEL, ORDER_STATUS_COLOR, formatOrderCode, formatPaymentMethod } from '@/shared/constants/order-constants'
import { formatPrice } from '@/shared/utils/currency-utils'
import { useOrderStore } from '../stores/order.store'
import { CourseThumbnail } from '@/shared/components/ui/course-thumbnail'
import { ArrowLeft, Loader2, AlertCircle } from 'lucide-react'

function formatDate(date?: Date | string | null): string {
  if (!date) return '---'
  const d = typeof date === 'string' ? new Date(date) : date
  if (!(d instanceof Date) || isNaN(d.getTime())) return '---'
  return d.toLocaleDateString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function OrderDetailClient() {
  const params = useParams()
  const orderId = Number(params.id)

  const detailStatus = useOrderStore((s) => s.detailStatus)
  const order = useOrderStore((s) => s.selectedOrder)
  const detailErrorMessage = useOrderStore((s) => s.detailErrorMessage)
  const actionStatus = useOrderStore((s) => s.actionStatus)
  const repayResult = useOrderStore((s) => s.repayResult)
  const actionErrorMessage = useOrderStore((s) => s.actionErrorMessage)
  const fetchOrderDetail = useOrderStore((s) => s.fetchOrderDetail)
  const cancelOrder = useOrderStore((s) => s.cancelOrder)
  const repayOrder = useOrderStore((s) => s.repayOrder)
  const clearAction = useOrderStore((s) => s.clearAction)

  const [showCancelConfirm, setShowCancelConfirm] = useState(false)

  useEffect(() => {
    if (orderId > 0) {
      void fetchOrderDetail(orderId)
    }
  }, [fetchOrderDetail, orderId])

  useEffect(() => {
    if (actionStatus === AppStatus.success && repayResult?.paymentAction?.url) {
      window.location.href = repayResult.paymentAction.url
    }
  }, [actionStatus, repayResult])

  const handleRepay = () => {
    clearAction()
    void repayOrder(orderId)
  }

  const handleCancel = async () => {
    const ok = await cancelOrder(orderId)
    setShowCancelConfirm(false)
    if (ok) {
      void fetchOrderDetail(orderId)
    }
  }

  const status = order?.status ?? 'pending'
  const isPending = status === 'pending'
  const isPaid = status === 'paid'

  if (detailStatus === AppStatus.loading || detailStatus === AppStatus.initial) {
    return (
      <div className="flex items-center justify-center py-20 text-muted-foreground">
        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
        Đang tải thông tin đơn hàng...
      </div>
    )
  }

  if (detailStatus === AppStatus.error || !order) {
    return (
      <Card className="border-border/70 bg-white/95 shadow-[0_24px_70px_-50px_rgba(15,43,82,0.35)]">
        <CardContent className="flex flex-col items-center gap-4 py-12 text-center">
          <AlertCircle className="h-10 w-10 text-red-400" />
          <p className="text-muted-foreground">{detailErrorMessage ?? 'Không tìm thấy đơn hàng.'}</p>
          <div className="flex gap-3">
            <Button variant="outline" className="h-11 rounded-full" onClick={() => void fetchOrderDetail(orderId)}>
              Thử lại
            </Button>
            <Button asChild variant="outline" className="h-11 rounded-full">
              <Link href="/orders">Quay lại</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <>
      <div className="mb-4">
        <Button asChild variant="ghost" className="h-10 gap-2 rounded-full text-sm">
          <Link href="/orders">
            <ArrowLeft className="h-4 w-4" />
            Quay lại danh sách
          </Link>
        </Button>
      </div>

      <Card className="border-border/70 bg-white/95 shadow-[0_24px_70px_-50px_rgba(15,43,82,0.35)]">
        <CardHeader className="space-y-2">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <CardTitle className="text-2xl">{formatOrderCode(order.id)}</CardTitle>
            <span className={`inline-block rounded-full border px-3 py-1 text-sm font-medium ${ORDER_STATUS_COLOR[status] ?? ''}`}>
              {ORDER_STATUS_LABEL[status] ?? status}
            </span>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 rounded-2xl border border-border/70 bg-[color:var(--sky-70)] p-4 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Ngày đặt</span>
              <span className="font-medium">{formatDate(order.placedAt)}</span>
            </div>
            {order.paidAt ? (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Ngày thanh toán</span>
                <span className="font-medium">{formatDate(order.paidAt)}</span>
              </div>
            ) : null}
            <div className="flex justify-between">
              <span className="text-muted-foreground">Phương thức thanh toán</span>
              <span className="font-medium">{formatPaymentMethod(order.paymentMethod)}</span>
            </div>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold text-muted-foreground">Sản phẩm</h3>
            <div className="space-y-2">
              {order.items?.map((item) => (
                <div key={item.id} className="flex items-center justify-between rounded-xl border border-border/70 px-4 py-3">
                  <div className="flex items-center gap-3">
                    <CourseThumbnail
                      thumbnail={item.course?.thumbnail}
                      alt={item.course?.name ?? 'Khóa học'}
                      size="sm"
                      className="shrink-0"
                    />
                    <div>
                      <p className="text-sm font-medium">{item.course?.name ?? 'Khóa học'}</p>
                      <p className="text-xs text-muted-foreground">x{item.quantity}</p>
                    </div>
                  </div>
                  <p className="text-sm font-medium">{formatPrice(item.price)}</p>
                </div>
              )) ?? null}
            </div>
          </div>

          <div className="flex justify-between border-t border-border/70 pt-4">
            <span className="text-base font-semibold">Tổng cộng</span>
            <span className="text-base font-semibold text-[color:var(--brand-900)]">
              {formatPrice(order.totalAmount)}
            </span>
          </div>

          {actionStatus === AppStatus.error ? (
            <p className="text-center text-xs text-red-500">{actionErrorMessage}</p>
          ) : null}

          <div className="flex flex-wrap gap-3">
            {isPending ? (
              <>
                <AppButton
                  className="h-11 rounded-full"
                  disabled={actionStatus === AppStatus.loading}
                  onClick={handleRepay}
                >
                  {actionStatus === AppStatus.loading ? (
                    <Loader2 className="mr-1 h-4 w-4 animate-spin" />
                  ) : null}
                  Thanh toán lại
                </AppButton>
                <Button
                  variant="outline"
                  className="h-11 rounded-full"
                  disabled={actionStatus === AppStatus.loading}
                  onClick={() => setShowCancelConfirm(true)}
                >
                  Hủy đơn
                </Button>
              </>
            ) : null}
            {isPaid ? (
              <AppButton asChild className="h-11 rounded-full">
                <Link href="/dashboard">Vào khóa học</Link>
              </AppButton>
            ) : null}
            <Button asChild variant="outline" className="h-11 rounded-full">
              <Link href="/orders">Quay lại</Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      <AppConfirmModal
        open={showCancelConfirm}
        title="Hủy đơn hàng"
        description="Bạn có chắc chắn muốn hủy đơn hàng này? Hành động này không thể hoàn tác."
        confirmText="Hủy đơn"
        cancelText="Quay lại"
        onConfirm={handleCancel}
        onCancal={() => setShowCancelConfirm(false)}
      />
    </>
  )
}
