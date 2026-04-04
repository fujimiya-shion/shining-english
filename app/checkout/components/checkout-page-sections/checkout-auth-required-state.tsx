'use client'

import Link from 'next/link'
import { AppButton } from '@/shared/components/ui/app-button'
import { Button } from '@/shared/components/ui/button'

export function CheckoutAuthRequiredState({ returnTo }: { returnTo: string }) {
  return (
    <div className="mx-auto max-w-3xl rounded-3xl border border-border/70 bg-white/95 p-10 text-center shadow-[0_24px_70px_-50px_rgba(15,43,82,0.35)]">
      <h1 className="text-3xl font-semibold text-[color:var(--brand-900)]">Đăng nhập để checkout</h1>
      <p className="mt-3 text-muted-foreground">
        Bạn cần đăng nhập để tạo đơn hàng và mở khóa học sau khi thanh toán.
      </p>
      <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
        <AppButton asChild className="h-11 rounded-full px-8">
          <Link href={`/login?returnTo=${encodeURIComponent(returnTo)}`}>Đăng nhập</Link>
        </AppButton>
        <Button asChild variant="outline" className="h-11 rounded-full bg-transparent px-8">
          <Link href={`/register?returnTo=${encodeURIComponent(returnTo)}`}>Tạo tài khoản</Link>
        </Button>
      </div>
    </div>
  )
}
