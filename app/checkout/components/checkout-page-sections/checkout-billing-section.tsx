'use client'

import { CreditCard, Landmark, Star } from 'lucide-react'
import { useStarStore } from '@/shared/stores/star.store'
import { AppButton } from '@/shared/components/ui/app-button'
import { Card } from '@/shared/components/ui/card'
import { Input } from '@/shared/components/ui/input'
import { AppStatus } from '@/shared/enums/app-status'

export function CheckoutBillingSection({
  actionStatus,
  email,
  errorMessage,
  fieldErrors,
  fullName,
  mode,
  onEmailChange,
  onFullNameChange,
  onPhoneChange,
  onSubmit,
  paymentMethod,
  phone,
  setPaymentMethod,
  starPrice,
  submitDisabled,
}: {
  actionStatus: AppStatus
  email: string
  errorMessage: string | null
  fieldErrors: Record<string, string | undefined>
  fullName: string
  mode: 'cart' | 'buy_now'
  onEmailChange: (value: string) => void
  onFullNameChange: (value: string) => void
  onPhoneChange: (value: string) => void
  onSubmit: () => void
  paymentMethod: 'payos' | 'cod' | 'star'
  phone: string
  setPaymentMethod: (value: 'payos' | 'cod' | 'star') => void
  starPrice?: number
  submitDisabled: boolean
}) {
  const starBalance = useStarStore((state) => state.balance)
  const isBuyNow = mode === 'buy_now'
  const hasEnoughStars = typeof starBalance === 'number' && typeof starPrice === 'number' && starBalance >= starPrice
  return (
    <Card className="space-y-6 border-border/70 bg-white/95 p-6">
      <div>
        <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Checkout</p>
        <h1 className="mt-2 text-3xl font-semibold text-[color:var(--brand-900)]">Thông tin thanh toán</h1>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className="mb-2 block text-sm font-medium">Họ và tên</label>
          <Input value={fullName} onChange={(event) => onFullNameChange(event.target.value)} placeholder="Nguyễn Văn A" />
          {fieldErrors.fullName && <p className="mt-1 text-xs text-red-500">{fieldErrors.fullName}</p>}
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium">Email</label>
          <Input value={email} onChange={(event) => onEmailChange(event.target.value)} placeholder="you@email.com" />
          {fieldErrors.email && <p className="mt-1 text-xs text-red-500">{fieldErrors.email}</p>}
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium">Số điện thoại</label>
          <Input value={phone} onChange={(event) => onPhoneChange(event.target.value)} placeholder="09xx xxx xxx" />
          {fieldErrors.phone && <p className="mt-1 text-xs text-red-500">{fieldErrors.phone}</p>}
        </div>
      </div>

      <div className="space-y-3">
        <p className="text-sm font-medium">Phương thức thanh toán</p>
        <div className="grid gap-3">
          <button
            type="button"
            className={`flex items-center gap-3 rounded-2xl border px-4 py-4 text-left transition-colors ${
              paymentMethod === 'payos'
                ? 'border-primary/50 bg-primary/5 text-[color:var(--brand-900)]'
                : 'border-border/70 bg-background'
            }`}
            onClick={() => setPaymentMethod('payos')}
          >
            <CreditCard className="h-5 w-5 shrink-0" />
            <div>
              <p className="font-semibold">Chuyển khoản / Thẻ tín dụng</p>
              <p className="mt-0.5 text-sm text-muted-foreground">Thanh toán trực tuyến bằng thẻ tín dụng hoặc chuyển khoản ngân hàng.</p>
            </div>
          </button>
          <button
            type="button"
            className={`flex items-center gap-3 rounded-2xl border px-4 py-4 text-left transition-colors ${
              paymentMethod === 'cod'
                ? 'border-primary/50 bg-primary/5 text-[color:var(--brand-900)]'
                : 'border-border/70 bg-background'
            }`}
            onClick={() => setPaymentMethod('cod')}
          >
            <Landmark className="h-5 w-5 shrink-0" />
            <div>
              <p className="font-semibold">Thanh toán thủ công</p>
              <p className="mt-0.5 text-sm text-muted-foreground">Xác nhận đơn hàng và thanh toán sau qua ngân hàng.</p>
            </div>
          </button>
          {isBuyNow ? (
            <button
              type="button"
              className={`flex items-center gap-3 rounded-2xl border px-4 py-4 text-left transition-colors ${
                paymentMethod === 'star'
                  ? 'border-primary/50 bg-primary/5 text-[color:var(--brand-900)]'
                  : 'border-border/70 bg-background'
              }`}
              onClick={() => setPaymentMethod('star')}
            >
              <Star className="h-5 w-5 shrink-0" />
              <div className="min-w-0">
                <p className="font-semibold">Thanh toán bằng sao</p>
                {typeof starPrice === 'number' ? (
                  <p className="mt-0.5 text-sm font-medium text-amber-600">
                    Cần trả: {starPrice} sao
                  </p>
                ) : null}
                <p className="truncate text-xs text-muted-foreground">
                  {typeof starBalance === 'number'
                    ? `Số dư hiện có: ${starBalance} sao`
                    : 'Đang tải số dư...'}
                </p>
              </div>
            </button>
          ) : null}
        </div>
      </div>

      {errorMessage ? (
        <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
          {errorMessage}
        </div>
      ) : null}

      <AppButton
        className="h-11 w-full rounded-full text-base font-semibold"
        disabled={submitDisabled || (paymentMethod === 'star' && !hasEnoughStars)}
        onClick={onSubmit}
      >
        {actionStatus === AppStatus.loading
          ? 'Đang xử lý...'
          : paymentMethod === 'star'
            ? 'Mở khóa bằng sao'
            : 'Xác nhận thanh toán'}
      </AppButton>
    </Card>
  )
}
