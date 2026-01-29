'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
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
  const [cardNumber, setCardNumber] = useState('')
  const [expiryDate, setExpiryDate] = useState('')
  const [cvv, setCvv] = useState('')
  const [processing, setProcessing] = useState(false)

  const coupons: { [key: string]: number } = {
    'SAVE20': 20,
    'SAVE30': 30,
    'WELCOME10': 10,
  }

  const subtotal = items.reduce((sum, item) => sum + item.price, 0)
  const discountAmount = (subtotal * discount) / 100
  const tax = (subtotal - discountAmount) * 0.08
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
          <h2 className="text-xl font-bold mb-6">Order Summary</h2>
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
              <p className="mt-4 text-muted-foreground">Your cart is empty</p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item, index) => (
                <div
                  key={`${item.id}-${index}`}
                  className="flex gap-4 p-4 border border-border rounded-lg hover:bg-muted/30 transition-colors"
                >
                  <div className="h-20 w-20 flex-shrink-0 rounded-lg bg-muted overflow-hidden">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold line-clamp-2">{item.title}</h3>
                    <p className="text-primary font-bold mt-2">${item.price.toFixed(2)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Qty: 1</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>

        {/* Coupon Code */}
        <Card className="p-6">
          <h2 className="text-lg font-bold mb-4">Promo Code</h2>
          {appliedCoupon ? (
            <div className="flex items-center justify-between p-4 bg-accent/10 border border-accent/30 rounded-lg">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Applied coupon</p>
                <p className="text-lg font-bold text-accent">{appliedCoupon}</p>
              </div>
              <Button variant="ghost" size="sm" onClick={handleRemoveCoupon}>
                Remove
              </Button>
            </div>
          ) : (
            <div className="flex gap-2">
              <Input
                placeholder="Enter promo code"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                className="flex-1"
              />
              <Button onClick={handleApplyCoupon}>Apply</Button>
            </div>
          )}
          <p className="text-xs text-muted-foreground mt-3">
            Try codes: SAVE20, SAVE30, WELCOME10
          </p>
        </Card>

        {/* Billing Information */}
        <Card className="p-6">
          <h2 className="text-lg font-bold mb-6">Billing Information</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Full Name</label>
              <Input
                placeholder="John Doe"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <Input
                type="email"
                placeholder="john@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
        </Card>

        {/* Payment Information */}
        <Card className="p-6">
          <h2 className="text-lg font-bold mb-6">Payment Details</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Card Number</label>
              <Input
                placeholder="1234 5678 9012 3456"
                value={cardNumber}
                onChange={(e) =>
                  setCardNumber(e.target.value.replace(/\s/g, '').slice(0, 16))
                }
                maxLength={19}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Expiry Date</label>
                <Input
                  placeholder="MM/YY"
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(e.target.value)}
                  maxLength={5}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">CVV</label>
                <Input
                  placeholder="123"
                  type="password"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value.slice(0, 3))}
                  maxLength={3}
                />
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Order Summary Sidebar */}
      <div>
        <Card className="p-6 sticky top-4">
          <h2 className="text-lg font-bold mb-6">Order Total</h2>
          <div className="space-y-4">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="font-medium">${subtotal.toFixed(2)}</span>
            </div>

            {discount > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Discount ({discount}%)</span>
                <span className="font-medium text-accent">
                  -${discountAmount.toFixed(2)}
                </span>
              </div>
            )}

            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Tax (8%)</span>
              <span className="font-medium">${tax.toFixed(2)}</span>
            </div>

            <div className="border-t border-border pt-4 flex justify-between">
              <span className="font-bold">Total</span>
              <span className="text-2xl font-bold text-primary">${total.toFixed(2)}</span>
            </div>
          </div>

          <Button
            className="w-full mt-6"
            size="lg"
            onClick={handleCheckout}
            disabled={items.length === 0 || !email || !fullName || !cardNumber || processing}
          >
            {processing ? 'Processing...' : 'Complete Purchase'}
          </Button>

          <p className="text-xs text-muted-foreground text-center mt-4">
            Your payment is secure and encrypted
          </p>

          <div className="mt-6 space-y-2 border-t border-border pt-6">
            <p className="text-xs font-semibold text-muted-foreground uppercase">
              Payment Methods
            </p>
            <div className="flex gap-2">
              {['visa', 'mastercard', 'amex'].map((method) => (
                <div
                  key={method}
                  className="flex-1 h-8 rounded-lg border border-border bg-muted flex items-center justify-center text-xs font-medium text-muted-foreground"
                >
                  {method.toUpperCase()}
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
