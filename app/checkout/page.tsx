'use client'

import { Checkout } from '@/components/checkout'
import { useState } from 'react'

export default function CheckoutPage() {
  const [cartItems] = useState([
    {
      id: 1,
      title: 'Advanced React Patterns',
      price: 79.99,
      image: 'https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=400&h=300&fit=crop',
    },
    {
      id: 2,
      title: 'UI/UX Design Masterclass',
      price: 89.99,
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop',
    },
  ])

  return (
    <main className="min-h-screen bg-background">
      <Checkout items={cartItems} />
    </main>
  )
}
