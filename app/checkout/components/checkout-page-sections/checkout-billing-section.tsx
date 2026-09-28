'use client'

import { CreditCard } from 'lucide-react'
import { AppButton } from '@/shared/components/ui/app-button'
import { Card } from '@/shared/components/ui/card'
import { Input } from '@/shared/components/ui/input'
import { AppStatus } from '@/shared/enums/app-status'
import { PaymentMethodSelectButton } from '../buttons/payment-method-select-button'
import { SerializedGateway } from '@/data/models/gateway.model'

export function CheckoutBillingSection({
  actionStatus,
  email,
  errorMessage,
  fieldErrors,
  fullName,
  onEmailChange,
  onFullNameChange,
  onPhoneChange,
  onSubmit,
  gatewayId,
  phone,
  setGatewayId,
  submitDisabled,
  gateways,
}: {
  actionStatus: AppStatus
  email: string
  errorMessage: string | null
  fieldErrors: Record<string, string | undefined>
  fullName: string
  onEmailChange: (value: string) => void
  onFullNameChange: (value: string) => void
  onPhoneChange: (value: string) => void
  onSubmit: () => void
  gatewayId?: number | string
  phone: string
  setGatewayId: (value?: string | number) => void
  submitDisabled: boolean
  gateways: SerializedGateway[]
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
          {gateways && gateways.length > 0 ? gateways.map(gateway => (
            <PaymentMethodSelectButton
              key={gateway.id}
              icon={<CreditCard className="h-5 w-5 shrink-0" />}
              title={gateway.name}
              description='Thanh toán trực tuyến bằng thẻ tín dụng hoặc chuyển khoản ngân hàng.'
              isActive={gatewayId === gateway.id}
              onClick={() => setGatewayId(gateway.id)}
            />
          )) : <div className='p-4 bg-amber-100 rounded-2xl'><p className='text-amber-600'>Nền tảng hiện tại đang chưa hỗ trợ phương thức thanh toán nào</p></div>}
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
        {actionStatus === AppStatus.loading
          ? 'Đang xử lý...'
          : 'Xác nhận thanh toán'}
      </AppButton>
    </Card>
  )
}
