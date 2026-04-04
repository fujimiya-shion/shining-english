'use client'

import Link from 'next/link'
import { AppButton } from '@/shared/components/ui/app-button'
import { Button } from '@/shared/components/ui/button'
import { ShoppingCart } from 'lucide-react'

export function CartEmptyState() {
  return (
    <div className="rounded-3xl border border-border/70 bg-white/90 p-10 text-center shadow-[0_24px_70px_-50px_rgba(15,43,82,0.35)]">
      <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-[color:var(--surface-ghost)] text-[color:var(--brand-900)]">
        <ShoppingCart className="h-11 w-11" aria-hidden="true" />
      </div>
      <h1 className="mt-6 text-3xl font-semibold text-[color:var(--brand-900)]">Giỏ hàng trống</h1>
      <p className="mt-3 text-muted-foreground">
        Bạn chưa thêm khóa học nào vào giỏ. Chọn một khóa học phù hợp rồi quay lại checkout.
      </p>
      <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
        <AppButton asChild className="h-11 rounded-full px-8">
          <Link href="/courses">Khám phá khóa học</Link>
        </AppButton>
        <Button asChild variant="outline" className="h-11 rounded-full bg-transparent px-8">
          <Link href="/">Về trang chủ</Link>
        </Button>
      </div>
    </div>
  )
}
