'use client'

import { Checkout } from '@/shared/components/ui/checkout'
import { useState } from 'react'

export default function CheckoutPage() {
  const [cartItems] = useState([
    {
      id: 1,
      title: 'Tiếng Anh Giao Tiếp Nâng Cao',
      price: 890000,
      image: 'https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=400&h=300&fit=crop',
    },
    {
      id: 2,
      title: 'Nắm Vững Ngữ Pháp Tiếng Anh',
      price: 790000,
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop',
    },
  ])

  return (
    <main className="min-h-screen bg-background">
      <Checkout items={cartItems} />
    </main>
  )
}
