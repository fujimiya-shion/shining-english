'use client'

import Link from 'next/link'
import { AppButton } from '@/shared/components/ui/app-button'
import { Button } from '@/shared/components/ui/button'

export function CheckoutEmptyState() {
  return (
    <div className="mx-auto max-w-3xl rounded-3xl border border-border/70 bg-white/95 p-10 text-center shadow-[0_24px_70px_-50px_rgba(15,43,82,0.35)]">
      <h1 className="text-3xl font-semibold text-[color:var(--brand-900)]">Chưa có gì để thanh toán</h1>
      <p className="mt-3 text-muted-foreground">
        Giỏ hàng của bạn đang trống và không có khóa học mua ngay nào được truyền sang checkout.
      </p>
      <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
        <AppButton asChild className="h-11 rounded-full px-8">
          <Link href="/courses">Khám phá khóa học</Link>
        </AppButton>
        <Button asChild variant="outline" className="h-11 rounded-full bg-transparent px-8">
          <Link href="/cart">Quay lại giỏ hàng</Link>
        </Button>
      </div>
    </div>
  )
}
