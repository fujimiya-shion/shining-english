'use client'

import Link from 'next/link'
import { AppButton } from '@/shared/components/ui/app-button'
import { Button } from '@/shared/components/ui/button'
import { Card } from '@/shared/components/ui/card'
import { formatPrice } from '@/shared/utils/currency-utils'

export function CartSummaryCard({
  actionLoading,
  itemsCount,
  onClear,
  onRemoveSelected,
  selectedCount,
  subtotal,
}: {
  actionLoading: boolean
  itemsCount: number
  onClear: () => void
  onRemoveSelected: () => void
  selectedCount: number
  subtotal: number
}) {
  return (
    <Card className="sticky top-24 space-y-6 border-border/70 bg-white/95 p-6">
      <div>
        <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Thanh toán</p>
        <h2 className="mt-2 text-2xl font-semibold text-[color:var(--brand-900)]">Tổng đơn hàng</h2>
      </div>

      <div className="space-y-3 text-sm">
        <div className="flex items-center justify-between text-muted-foreground">
          <span>Số khóa học</span>
          <span>{itemsCount}</span>
        </div>
        <div className="flex items-center justify-between text-muted-foreground">
          <span>Đã chọn</span>
          <span>{selectedCount}</span>
        </div>
        <div className="flex items-center justify-between text-muted-foreground">
          <span>Tạm tính</span>
          <span>{formatPrice(subtotal)}</span>
        </div>
        <div className="flex items-center justify-between border-t border-border pt-3 text-base font-semibold text-[color:var(--brand-900)]">
          <span>Tổng cộng</span>
          <span>{formatPrice(subtotal)}</span>
        </div>
      </div>

      <div className="space-y-3">
        <AppButton asChild className="h-11 w-full rounded-full text-base font-semibold">
          <Link href="/checkout">Tiến hành checkout</Link>
        </AppButton>
        <Button
          variant="outline"
          className="h-11 w-full rounded-full bg-transparent"
          disabled={actionLoading || selectedCount === 0}
          onClick={onRemoveSelected}
        >
          {actionLoading ? 'Đang xóa...' : `Xóa mục đã chọn (${selectedCount})`}
        </Button>
        <Button
          variant="outline"
          className="h-11 w-full rounded-full bg-transparent"
          disabled={actionLoading}
          onClick={onClear}
        >
          {actionLoading ? 'Đang làm trống...' : 'Xóa toàn bộ giỏ hàng'}
        </Button>
      </div>
    </Card>
  )
}
