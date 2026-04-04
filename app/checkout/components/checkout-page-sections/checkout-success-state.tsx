'use client'

import Link from 'next/link'
import { Order } from '@/data/models/order.model'
import { AppButton } from '@/shared/components/ui/app-button'
import { Button } from '@/shared/components/ui/button'
import { formatPrice } from '@/shared/utils/currency-utils'

export function CheckoutSuccessState({ order }: { order: Order }) {
  const firstCourse = order.items?.[0]?.course

  return (
    <div className="mx-auto max-w-3xl rounded-3xl border border-emerald-200 bg-white/95 p-10 text-center shadow-[0_24px_70px_-50px_rgba(15,43,82,0.35)]">
      <p className="text-xs uppercase tracking-[0.25em] text-emerald-600">Đơn hàng thành công</p>
      <h1 className="mt-3 text-3xl font-semibold text-[color:var(--brand-900)]">Đã tạo đơn hàng thành công</h1>
      <p className="mt-3 text-muted-foreground">
        Hệ thống đã ghi nhận đơn hàng #{order.id}. Tổng giá trị đơn là {formatPrice(order.totalAmount)}.
      </p>
      <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
        <AppButton asChild className="h-11 rounded-full px-8">
          <Link href={firstCourse?.slug ? `/courses/${firstCourse.slug}` : '/courses'}>Vào khóa học</Link>
        </AppButton>
        <Button asChild variant="outline" className="h-11 rounded-full bg-transparent px-8">
          <Link href="/courses">Tiếp tục xem khóa học</Link>
        </Button>
      </div>
    </div>
  )
}
