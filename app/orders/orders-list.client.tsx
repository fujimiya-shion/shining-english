'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { AppButton } from '@/shared/components/ui/app-button'
import { Button } from '@/shared/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/components/ui/card'
import { AppConfirmModal } from '@/shared/components/ui/app-confirm-modal'
import { AppStatus } from '@/shared/enums/app-status'
import { ORDER_STATUS_LABEL, ORDER_STATUS_COLOR, formatOrderCode } from '@/shared/constants/order-constants'
import { formatPrice } from '@/shared/utils/currency-utils'
import { useOrderStore } from './stores/order.store'
import { CourseThumbnail } from '@/shared/components/ui/course-thumbnail'
import { ChevronLeft, ChevronRight, Loader2, AlertCircle, PackageOpen } from 'lucide-react'

function OrderSkeleton() {
  return (
    <div className="space-y-3">
      {[1, 2, 3].map((i) => (
        <div key={i} className="flex animate-pulse flex-wrap items-center justify-between gap-3 rounded-2xl border border-border/70 bg-[color:var(--sky-70)] px-4 py-3">
          <div className="space-y-2">
            <div className="h-4 w-20 rounded bg-gray-200" />
            <div className="h-3 w-32 rounded bg-gray-100" />
          </div>
          <div className="space-y-2 text-right">
            <div className="h-4 w-24 rounded bg-gray-200" />
            <div className="h-3 w-16 rounded bg-gray-100" />
          </div>
        </div>
      ))}
    </div>
  )
}

function formatDate(date?: Date | string | null): string {
  if (!date) return ''
  const d = typeof date === 'string' ? new Date(date) : date
  if (!(d instanceof Date) || isNaN(d.getTime())) return ''
  return d.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' })
}

function getCourseNames(order: { items?: Array<{ course?: { name?: string } | null }> }): string {
  const names = order.items?.map((i) => i.course?.name).filter(Boolean) ?? []
  return names.length > 0 ? names.join(', ') : 'Khóa học'
}

function getFirstThumbnail(order: { items?: Array<{ course?: { thumbnail?: string | null } | null }> }): string | null | undefined {
  return order.items?.find((i) => i.course?.thumbnail)?.course?.thumbnail
}

export function OrdersListClient() {
  const listStatus = useOrderStore((s) => s.listStatus)
  const orders = useOrderStore((s) => s.orders)
  const pagination = useOrderStore((s) => s.pagination)
  const listErrorMessage = useOrderStore((s) => s.listErrorMessage)
  const actionStatus = useOrderStore((s) => s.actionStatus)
  const repayResult = useOrderStore((s) => s.repayResult)
  const actionErrorMessage = useOrderStore((s) => s.actionErrorMessage)
  const fetchOrders = useOrderStore((s) => s.fetchOrders)
  const cancelOrder = useOrderStore((s) => s.cancelOrder)
  const repayOrder = useOrderStore((s) => s.repayOrder)
  const clearAction = useOrderStore((s) => s.clearAction)

  const [currentPage, setCurrentPage] = useState(1)
  const [cancelTargetId, setCancelTargetId] = useState<number | null>(null)

  useEffect(() => {
    void fetchOrders(currentPage)
  }, [fetchOrders, currentPage])

  useEffect(() => {
    if (actionStatus === AppStatus.success && repayResult?.paymentAction?.url) {
      window.location.href = repayResult.paymentAction.url
    }
  }, [actionStatus, repayResult])

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handleCancel = async () => {
    if (cancelTargetId === null) return
    const ok = await cancelOrder(cancelTargetId)
    setCancelTargetId(null)
    if (ok) {
      void fetchOrders(currentPage)
    }
  }

  const handleRepay = (orderId: number) => {
    clearAction()
    void repayOrder(orderId)
  }

  return (
    <>
      <Card className="border-border/70 bg-white/95 shadow-[0_24px_70px_-50px_rgba(15,43,82,0.35)]">
        <CardHeader className="space-y-2">
          <CardTitle className="text-3xl">Lịch sử đơn hàng</CardTitle>
          <CardDescription>
            Theo dõi các đơn hàng bạn đã thanh toán tại Shining English.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {listStatus === AppStatus.loading || listStatus === AppStatus.initial ? (
            <OrderSkeleton />
          ) : listStatus === AppStatus.error ? (
            <div className="flex flex-col items-center gap-4 py-8 text-center">
              <AlertCircle className="h-10 w-10 text-red-400" />
              <p className="text-sm text-muted-foreground">{listErrorMessage ?? 'Không thể tải danh sách đơn hàng.'}</p>
              <Button variant="outline" className="h-10 rounded-full" onClick={() => void fetchOrders(currentPage)}>
                Thử lại
              </Button>
            </div>
          ) : orders.length === 0 ? (
            <div className="flex flex-col items-center gap-4 py-8 text-center">
              <PackageOpen className="h-12 w-12 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">Bạn chưa có đơn hàng nào.</p>
              <AppButton asChild className="h-11 rounded-full">
                <Link href="/courses">Khám phá khóa học</Link>
              </AppButton>
            </div>
          ) : (
            <>
              <div className="grid gap-3">
                {orders.map((order) => {
                  const status = order.status ?? 'pending'
                  const isPending = status === 'pending'

                  return (
                    <div
                      key={order.id}
                      className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border/70 bg-[color:var(--sky-70)] px-4 py-3"
                    >
                      <div className="flex min-w-0 flex-1 items-center gap-3">
                        <CourseThumbnail
                          thumbnail={getFirstThumbnail(order)}
                          alt={getCourseNames(order)}
                          size="sm"
                          className="shrink-0"
                        />
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-[color:var(--brand-900)]">
                            {formatOrderCode(order.id)}
                          </p>
                          <p className="truncate text-xs text-muted-foreground">
                            {getCourseNames(order)}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {formatDate(order.placedAt)}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold">{formatPrice(order.totalAmount)}</p>
                        <span className={`inline-block rounded-full border px-2.5 py-0.5 text-xs font-medium ${ORDER_STATUS_COLOR[status] ?? ''}`}>
                          {ORDER_STATUS_LABEL[status] ?? status}
                        </span>
                      </div>
                      <div className="flex w-full gap-2 sm:w-auto sm:flex-nowrap">
                        {isPending ? (
                          <>
                            <Button
                              size="sm"
                              variant="default"
                              className="h-9 rounded-full text-xs"
                              disabled={actionStatus === AppStatus.loading}
                              onClick={() => handleRepay(Number(order.id))}
                            >
                              {actionStatus === AppStatus.loading ? (
                                <Loader2 className="h-3 w-3 animate-spin" />
                              ) : null}
                              Thanh toán lại
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-9 rounded-full text-xs"
                              disabled={actionStatus === AppStatus.loading}
                              onClick={() => setCancelTargetId(Number(order.id))}
                            >
                              Hủy đơn
                            </Button>
                          </>
                        ) : (
                          <Button asChild size="sm" variant="outline" className="h-9 rounded-full text-xs">
                            <Link href={`/orders/${order.id}`}>Chi tiết</Link>
                          </Button>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>

              {pagination && pagination.pageCount > 1 ? (
                <div className="flex items-center justify-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-9 w-9 rounded-full p-0"
                    disabled={pagination.page <= 1}
                    onClick={() => handlePageChange(pagination.page - 1)}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <span className="text-sm text-muted-foreground">
                    {pagination.page} / {pagination.pageCount}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-9 w-9 rounded-full p-0"
                    disabled={pagination.page >= pagination.pageCount}
                    onClick={() => handlePageChange(pagination.page + 1)}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              ) : null}

              {actionStatus === AppStatus.error ? (
                <p className="text-center text-xs text-red-500">{actionErrorMessage}</p>
              ) : null}
            </>
          )}

          <div className="flex flex-wrap gap-3">
            <AppButton asChild className="h-11 rounded-full">
              <Link href="/courses">Khám phá khóa học mới</Link>
            </AppButton>
            <Button asChild variant="outline" className="h-11 rounded-full">
              <Link href="/dashboard">Quay về dashboard</Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      <AppConfirmModal
        open={cancelTargetId !== null}
        title="Hủy đơn hàng"
        description="Bạn có chắc chắn muốn hủy đơn hàng này? Hành động này không thể hoàn tác."
        confirmText="Hủy đơn"
        cancelText="Quay lại"
        onConfirm={handleCancel}
        onCancal={() => setCancelTargetId(null)}
      />
    </>
  )
}
