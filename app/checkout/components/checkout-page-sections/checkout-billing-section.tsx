'use client'

import { AppButton } from '@/shared/components/ui/app-button'
import { Card } from '@/shared/components/ui/card'
import { Input } from '@/shared/components/ui/input'
import { AppStatus } from '@/shared/enums/app-status'

export function CheckoutBillingSection({
  actionStatus,
  email,
  errorMessage,
  fullName,
  onEmailChange,
  onFullNameChange,
  onPhoneChange,
  onSubmit,
  paymentMethod,
  phone,
  setPaymentMethod,
  submitDisabled,
}: {
  actionStatus: AppStatus
  email: string
  errorMessage: string | null
  fullName: string
  onEmailChange: (value: string) => void
  onFullNameChange: (value: string) => void
  onPhoneChange: (value: string) => void
  onSubmit: () => void
  paymentMethod: 'payos' | 'cod'
  phone: string
  setPaymentMethod: (value: 'payos' | 'cod') => void
  submitDisabled: boolean
}) {
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
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium">Email</label>
          <Input value={email} onChange={(event) => onEmailChange(event.target.value)} placeholder="you@email.com" />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium">Số điện thoại</label>
          <Input value={phone} onChange={(event) => onPhoneChange(event.target.value)} placeholder="09xx xxx xxx" />
        </div>
      </div>

      <div className="space-y-3">
        <p className="text-sm font-medium">Phương thức thanh toán</p>
        <div className="grid gap-3 sm:grid-cols-2">
          <button
            type="button"
            className={`rounded-2xl border px-4 py-4 text-left transition-colors ${
              paymentMethod === 'payos'
                ? 'border-primary/50 bg-primary/5 text-[color:var(--brand-900)]'
                : 'border-border/70 bg-background'
            }`}
            onClick={() => setPaymentMethod('payos')}
          >
            <p className="font-semibold">PayOS</p>
            <p className="mt-1 text-sm text-muted-foreground">Thanh toán online theo flow hiện tại của backend.</p>
          </button>
          <button
            type="button"
            className={`rounded-2xl border px-4 py-4 text-left transition-colors ${
              paymentMethod === 'cod'
                ? 'border-primary/50 bg-primary/5 text-[color:var(--brand-900)]'
                : 'border-border/70 bg-background'
            }`}
            onClick={() => setPaymentMethod('cod')}
          >
            <p className="font-semibold">COD</p>
            <p className="mt-1 text-sm text-muted-foreground">Tạo đơn hàng trực tiếp theo API đang có.</p>
          </button>
        </div>
      </div>

      {errorMessage ? (
        <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
          {errorMessage}
        </div>
      ) : null}

      <AppButton
        className="h-11 w-full rounded-full text-base font-semibold"
        disabled={submitDisabled}
        onClick={onSubmit}
      >
        {actionStatus === AppStatus.loading ? 'Đang tạo đơn hàng...' : 'Xác nhận thanh toán'}
      </AppButton>
    </Card>
  )
}
