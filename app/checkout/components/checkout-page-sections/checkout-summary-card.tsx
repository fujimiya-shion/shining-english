'use client'

import Image from 'next/image'
import { Card } from '@/shared/components/ui/card'
import { AppUtils } from '@/shared/utils/app-utils'
import { formatPrice } from '@/shared/utils/currency-utils'

export type CheckoutDisplayItem = {
  id: number | string
  title: string
  image?: string
  price: number
  quantity: number
}

export function CheckoutSummaryCard({
  items,
  mode,
}: {
  items: CheckoutDisplayItem[]
  mode: 'cart' | 'buy_now'
}) {
  const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0)

  return (
    <Card className="sticky top-24 space-y-6 border-border/70 bg-white/95 p-6">
      <div>
        <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
          {mode === 'buy_now' ? 'Mua ngay' : 'Giỏ hàng'}
        </p>
        <h2 className="mt-2 text-2xl font-semibold text-[color:var(--brand-900)]">Tóm tắt đơn hàng</h2>
      </div>

      <div className="space-y-4">
        {items.map((item) => {
          const imageUrl = AppUtils.getStorageUrl(item.image)

          return (
            <div key={item.id} className="flex gap-3 rounded-2xl border border-border/70 bg-background/80 p-3">
              <div className="h-16 w-16 overflow-hidden rounded-xl bg-muted">
                {imageUrl ? (
                  <Image
                    src={imageUrl}
                    alt={item.title}
                    width={64}
                    height={64}
                    className="h-full w-full object-cover"
                  />
                ) : null}
              </div>
              <div className="min-w-0 flex-1">
                <p className="line-clamp-2 font-medium text-[color:var(--brand-900)]">{item.title}</p>
                <p className="mt-1 text-sm text-muted-foreground">Số lượng: {item.quantity}</p>
              </div>
              <p className="font-semibold text-primary">{formatPrice(item.price)}</p>
            </div>
          )
        })}
      </div>

      <div className="space-y-3 border-t border-border pt-4 text-sm">
        <div className="flex items-center justify-between text-muted-foreground">
          <span>Tạm tính</span>
          <span>{formatPrice(subtotal)}</span>
        </div>
        <div className="flex items-center justify-between text-muted-foreground">
          <span>Phí phát sinh</span>
          <span>{formatPrice(0)}</span>
        </div>
        <div className="flex items-center justify-between text-base font-semibold text-[color:var(--brand-900)]">
          <span>Tổng cộng</span>
          <span>{formatPrice(subtotal)}</span>
        </div>
      </div>
    </Card>
  )
}
