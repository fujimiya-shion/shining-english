'use client'

import { AppButton } from '@/shared/components/ui/app-button'
import { Input } from '@/shared/components/ui/input'
import { Search } from 'lucide-react'

type CoursesPageHeroSectionProps = {
  searchKeyword: string
  onChangeSearchKeyword: (value: string) => void
  onSubmitSearch: () => void | Promise<void>
}

export function CoursesPageHeroSection({
  searchKeyword,
  onChangeSearchKeyword,
  onSubmitSearch,
}: CoursesPageHeroSectionProps) {
  return (
    <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Khoá học</p>
        <h1 className="mt-3 text-4xl font-semibold text-[color:var(--brand-900)]">Chọn khoá học phù hợp</h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          Lộ trình được thiết kế theo mục tiêu cụ thể - từ giao tiếp cơ bản đến luyện thi chuyên sâu.
        </p>
      </div>
      <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
        <Input
          value={searchKeyword}
          onChange={(event) => onChangeSearchKeyword(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              event.preventDefault()
              void onSubmitSearch()
            }
          }}
          placeholder="Tìm khóa học..."
          className="h-10 w-full sm:w-72"
        />
        <AppButton size="icon" className="h-10 w-10 rounded-full" onClick={() => void onSubmitSearch()}>
          <Search className="h-4 w-4 text-white" />
          <span className="sr-only">Tìm kiếm</span>
        </AppButton>
      </div>
    </div>
  )
}
