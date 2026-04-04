'use client'

import { Star } from 'lucide-react'

export function CourseLearningPlayerRatingStars({ rating }: { rating: number }) {
  return Array.from({ length: 5 }).map((_, index) => (
    <Star
      key={index}
      className={`h-4 w-4 ${
        index < Math.round(rating) ? 'fill-accent text-accent' : 'text-muted-foreground/40'
      }`}
    />
  ))
}
