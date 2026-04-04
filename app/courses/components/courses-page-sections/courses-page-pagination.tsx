'use client'

import { AppButton } from '@/shared/components/ui/app-button'
import { Button } from '@/shared/components/ui/button'

export function CoursesPagePagination({
  page,
  pageCount,
  visiblePages,
  onChangePage,
}: {
  page: number
  pageCount: number
  visiblePages: number[]
  onChangePage: (page: number) => Promise<void>
}) {
  return (
    <div className="flex flex-col items-center justify-between gap-3 rounded-2xl border border-border/70 bg-white/90 px-4 py-4 text-sm text-muted-foreground sm:flex-row">
      <span>
        Trang {page} / {pageCount}
      </span>
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" onClick={() => void onChangePage(page - 1)} disabled={page <= 1}>
          Trước
        </Button>
        {visiblePages.map((pageNumber) =>
          pageNumber === page ? (
            <AppButton key={pageNumber} size="sm">
              {pageNumber}
            </AppButton>
          ) : (
            <Button key={pageNumber} variant="outline" size="sm" onClick={() => void onChangePage(pageNumber)}>
              {pageNumber}
            </Button>
          )
        )}
        <Button
          variant="outline"
          size="sm"
          onClick={() => void onChangePage(page + 1)}
          disabled={page >= pageCount}
        >
          Sau
        </Button>
      </div>
    </div>
  )
}
