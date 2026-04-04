'use client'

import { Checkout } from '@/shared/components/ui/checkout'
import { useMemo } from 'react'
import { useSearchParams } from 'next/navigation'

export default function CheckoutPage() {
  const searchParams = useSearchParams()
  const cartItems = useMemo(() => {
    const courseId = searchParams.get('courseId')
    const title = searchParams.get('title')
    const price = Number(searchParams.get('price') ?? 0)
    const image = searchParams.get('image')

    if (!courseId || !title) {
      return [
        {
          id: 1,
          title: 'Tiếng Anh Giao Tiếp Nâng Cao',
          price: 890000,
          image: 'https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=400&h=300&fit=crop',
        },
      ]
    }

    return [
      {
        id: Number(courseId),
        title,
        price,
        image: image || 'https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=400&h=300&fit=crop',
      },
    ]
  }, [searchParams])

  return (
    <main className="min-h-screen bg-background">
      <Checkout items={cartItems} />
    </main>
  )
}
