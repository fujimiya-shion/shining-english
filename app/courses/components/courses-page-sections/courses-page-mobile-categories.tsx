'use client'

import { Button } from '@/shared/components/ui/button'

export function CoursesPageMobileCategories({
  categories,
}: {
  categories: Array<{ id?: number | string; name?: string }>
}) {
  return (
    <div className="mt-8 flex flex-wrap gap-2 lg:hidden">
      {categories.map((category, index) => (
        <Button key={category.id ?? index} variant="outline" size="sm" className="rounded-full">
          {category.name ?? ''}
        </Button>
      ))}
    </div>
  )
}
