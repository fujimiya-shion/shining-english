'use client'

import { Button } from '@/shared/components/ui/button'
import { AppButton } from '@/shared/components/ui/app-button'
import { Card } from '@/shared/components/ui/card'
import { Input } from '@/shared/components/ui/input'
import Image from 'next/image'
import { useState } from 'react'

interface CartItem {
  id: number
  title: string
  price: number
  image: string
}

interface CheckoutProps {
  items: CartItem[]
  onCheckout?: (items: CartItem[], total: number) => void
}

export function Checkout({ items, onCheckout }: CheckoutProps) {
  const [couponCode, setCouponCode] = useState('')
  const [discount, setDiscount] = useState(0)
  const [appliedCoupon, setAppliedCoupon] = useState('')
  const [email, setEmail] = useState('')
  const [fullName, setFullName] = useState('')
  const [processing, setProcessing] = useState(false)
  const [phone, setPhone] = useState('')

  const coupons: { [key: string]: number } = {
    'SAVE20': 20,
    'SAVE30': 30,
    'WELCOME10': 10,
  }

  const subtotal = items.reduce((sum, item) => sum + item.price, 0)
  const discountAmount = (subtotal * discount) / 100
  const tax = 0
  const total = subtotal - discountAmount + tax

  const handleApplyCoupon = () => {
    if (coupons[couponCode.toUpperCase()]) {
      setDiscount(coupons[couponCode.toUpperCase()])
      setAppliedCoupon(couponCode.toUpperCase())
      setCouponCode('')
    }
  }

  const handleRemoveCoupon = () => {
    setDiscount(0)
    setAppliedCoupon('')
  }

  const handleCheckout = async () => {
    setProcessing(true)
    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setProcessing(false)

    if (onCheckout) {
      onCheckout(items, total)
    }
  }

  return (
    <div className="grid gap-8 lg:grid-cols-3 max-w-7xl mx-auto py-8">
      {/* Cart Items & Payment Form */}
      <div className="lg:col-span-2 space-y-8">
        {/* Cart Items */}
        <Card className="p-6">
          <h2 className="text-xl font-bold mb-6">Tóm tắt đơn hàng</h2>
          {items.length === 0 ? (
            <div className="text-center py-12">
              <svg
                className="mx-auto h-12 w-12 text-muted-foreground"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
              <p className="mt-4 text-muted-foreground">Giỏ hàng của bạn đang trống</p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item, index) => (
                <div
                  key={`${item.id}-${index}`}
                  className="flex gap-4 p-4 border border-border rounded-lg hover:bg-muted/30 transition-colors"
                >
                  <div className="h-20 w-20 flex-shrink-0 rounded-lg bg-muted overflow-hidden">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.title}
                      width={80}
                      height={80}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold line-clamp-2">{item.title}</h3>
                    <p className="text-primary font-bold mt-2">
                      {item.price.toLocaleString('vi-VN')}đ
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Số lượng: 1</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>

        {/* Coupon Code */}
        <Card className="p-6">
          <h2 className="text-lg font-bold mb-4">Mã giảm giá</h2>
          {appliedCoupon ? (
            <div className="flex items-center justify-between p-4 bg-accent/10 border border-accent/30 rounded-lg">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Mã đã áp dụng</p>
                <p className="text-lg font-bold text-accent">{appliedCoupon}</p>
              </div>
              <Button variant="ghost" size="sm" onClick={handleRemoveCoupon}>
                Gỡ mã
              </Button>
            </div>
          ) : (
            <div className="flex gap-2">
              <Input
                placeholder="Nhập mã giảm giá"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                className="flex-1"
              />
              <AppButton onClick={handleApplyCoupon}>Áp dụng</AppButton>
            </div>
          )}
          <p className="text-xs text-muted-foreground mt-3">
            Gợi ý mã: SAVE20, SAVE30, WELCOME10
          </p>
        </Card>

        {/* Billing Information */}
        <Card className="p-6">
          <h2 className="text-lg font-bold mb-6">Thông tin thanh toán</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Họ và tên</label>
              <Input
                placeholder="Nguyễn Minh Anh"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <Input
                type="email"
                placeholder="you@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Số điện thoại</label>
              <Input
                placeholder="09xx xxx xxx"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          </div>
        </Card>

        {/* Payment Information */}
        <Card className="p-6">
          <h2 className="text-lg font-bold mb-6">Phương thức thanh toán</h2>
          <div className="rounded-xl border border-border bg-[color:var(--sky-70)] p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-[color:var(--brand-900)]">PayOS</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Thanh toán qua chuyển khoản ngân hàng/QR theo chuẩn PayOS.
                </p>
              </div>
              <Image
                src="https://payos.vn/wp-content/uploads/2025/06/Casso-payOSLogo-1.svg"
                alt="PayOS"
                width={90}
                height={36}
                className="h-8 w-auto"
              />
            </div>
          </div>
        </Card>
      </div>

      {/* Order Summary Sidebar */}
      <div>
        <Card className="p-6 sticky top-4">
          <h2 className="text-lg font-bold mb-6">Tổng thanh toán</h2>
          <div className="space-y-4">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Tạm tính</span>
              <span className="font-medium">{subtotal.toLocaleString('vi-VN')}đ</span>
            </div>

            {discount > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Giảm giá ({discount}%)</span>
                <span className="font-medium text-accent">
                  -{discountAmount.toLocaleString('vi-VN')}đ
                </span>
              </div>
            )}

            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Thuế</span>
              <span className="font-medium">{tax.toLocaleString('vi-VN')}đ</span>
            </div>

            <div className="border-t border-border pt-4 flex justify-between">
              <span className="font-bold">Tổng cộng</span>
              <span className="text-2xl font-bold text-primary">
                {total.toLocaleString('vi-VN')}đ
              </span>
            </div>
          </div>

          <AppButton
            className="w-full mt-6"
            size="lg"
            onClick={handleCheckout}
            disabled={items.length === 0 || !email || !fullName || !phone || processing}
          >
            {processing ? 'Đang tạo thanh toán...' : 'Tạo liên kết PayOS'}
          </AppButton>

          <p className="text-xs text-muted-foreground text-center mt-4">
            Thanh toán được bảo mật qua PayOS
          </p>

          <div className="mt-6 space-y-2 border-t border-border pt-6">
            <p className="text-xs font-semibold text-muted-foreground uppercase">
              Phương thức
            </p>
            <div className="flex items-center justify-between rounded-lg border border-border bg-muted px-3 py-2">
              <span className="text-xs font-medium text-muted-foreground">PayOS</span>
              <Image
                src="https://payos.vn/wp-content/uploads/2025/06/Casso-payOSLogo-1.svg"
                alt="PayOS"
                width={70}
                height={28}
                className="h-6 w-auto"
              />
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
