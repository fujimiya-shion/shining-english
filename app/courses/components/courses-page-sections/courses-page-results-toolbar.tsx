'use client'

import { Button } from '@/shared/components/ui/button'

export function CoursesPageResultsToolbar({
  coursesCount,
  hasAnyFilters,
}: {
  coursesCount: number
  hasAnyFilters: boolean
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border/70 bg-white/90 px-4 py-3 text-sm text-muted-foreground">
      <span>
        Hiển thị {coursesCount} khoá học {hasAnyFilters ? '(đã lọc)' : ''}
      </span>
      <div className="flex items-center gap-2">
        <span>Sắp xếp:</span>
        <Button variant="outline" size="sm" className="rounded-full">
          Mới nhất
        </Button>
        <Button variant="ghost" size="sm" className="rounded-full">
          Phổ biến
        </Button>
      </div>
    </div>
  )
}
