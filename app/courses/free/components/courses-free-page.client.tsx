'use client'

import { useEffect, useState } from 'react'
import { useCoursesFreePage } from '@/app/courses/free/hooks/use-courses-free-page'
import { CourseFiltersSidebar } from '@/shared/components/ui/course/course-filters-sidebar'
import {
  CoursesPageGrid,
  CoursesPagePagination,
  CoursesPageResultsToolbar,
  CoursesPageMobileCategories,
} from '@/app/courses/components/courses-page-sections'
import { Toaster } from 'react-hot-toast'
import { AppButton } from '@/shared/components/ui/app-button'
import { AppStatus } from '@/shared/enums/app-status'
import Link from 'next/link'
import { BookOpen, SlidersHorizontal, Sparkles, X } from 'lucide-react'

export function CoursesFreePageClient() {
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false)

  const {
    categories,
    courses,
    durationOptions,
    handlePageChange,
    hasAnyFilters,
    levels,
    page,
    pageCount,
    resetFilters,
    selectedCategoryId,
    selectedDurationKeys,
    selectedFilters,
    selectedLevelIds,
    status,
    toggleCategory,
    toggleDuration,
    toggleLevel,
    visiblePages,
  } = useCoursesFreePage()

  useEffect(() => {
    if (!isMobileFiltersOpen) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [isMobileFiltersOpen])

  return (
    <main className="min-h-full bg-[radial-gradient(1200px_circle_at_top_left,var(--sky-90)_0%,var(--sky-50)_52%,var(--white)_100%)]">
      <Toaster position="top-right" />
      <div className="mx-auto max-w-7xl px-4 py-6 sm:py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-muted-foreground">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              Miễn phí
            </p>
            <h1 className="mt-2 text-3xl font-semibold text-[color:var(--brand-900)] sm:mt-3 sm:text-4xl">
              Khóa học miễn phí
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-muted-foreground sm:text-base">
              Các khóa học tiếng Anh hoàn toàn miễn phí, không giới hạn thời gian truy cập.
            </p>
          </div>
          <AppButton asChild variant="outline" className="rounded-full shrink-0">
            <Link href="/courses">
              <BookOpen className="h-4 w-4" />
              Xem tất cả khóa học
            </Link>
          </AppButton>
        </div>

        <CoursesPageMobileCategories categories={categories} />

        <div className="mt-6 flex items-center justify-between gap-3 rounded-2xl border border-border/70 bg-white/90 px-4 py-3 lg:hidden">
          <div className="min-w-0">
            <p className="text-sm font-semibold text-[color:var(--brand-900)]">Khóa học miễn phí</p>
            <p className="text-xs text-muted-foreground">
              {courses.length} kết quả {hasAnyFilters ? '• đang lọc' : ''}
            </p>
          </div>
          <AppButton
            type="button"
            variant="outline"
            className="shrink-0 rounded-full"
            onClick={() => setIsMobileFiltersOpen(true)}
          >
            <SlidersHorizontal className="h-4 w-4" />
            Bộ lọc
          </AppButton>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[280px_1fr]">
          <CourseFiltersSidebar
            categories={categories}
            levels={levels}
            durationOptions={durationOptions}
            hasAnyFilters={hasAnyFilters}
            resetFilters={resetFilters}
            selectedCategoryId={selectedCategoryId}
            selectedDurationKeys={selectedDurationKeys}
            selectedFilters={selectedFilters}
            selectedLevelIds={selectedLevelIds}
            toggleCategory={toggleCategory}
            toggleDuration={toggleDuration}
            toggleLevel={toggleLevel}
            showPriceFilter={false}
          />

          <section className="space-y-6">
            {status === AppStatus.loading && (
              <div className="grid grid-cols-2 gap-4 md:grid-cols-3 sm:gap-6 xl:grid-cols-3">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="h-72 animate-pulse rounded-2xl bg-[color:var(--brand-900)]/8" />
                ))}
              </div>
            )}

            {status === AppStatus.done && courses.length === 0 && (
              <div className="py-24 text-center">
                <div className="mx-auto max-w-md rounded-2xl border border-border/70 bg-white/80 p-8 shadow-sm">
                  <h3 className="text-lg font-semibold text-[color:var(--brand-900)]">
                    Không tìm thấy khóa học
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Thử thay đổi bộ lọc hoặc quay lại sau.
                  </p>
                  <AppButton className="mt-6 rounded-full" onClick={() => void resetFilters()}>
                    Xoá bộ lọc
                  </AppButton>
                </div>
              </div>
            )}

            {status === AppStatus.done && courses.length > 0 && (
              <>
                <CoursesPageResultsToolbar coursesCount={courses.length} hasAnyFilters={hasAnyFilters} />
                <CoursesPageGrid courses={courses} />
                <CoursesPagePagination
                  page={page}
                  pageCount={pageCount}
                  visiblePages={visiblePages}
                  onChangePage={handlePageChange}
                />
              </>
            )}

            {status === AppStatus.error && (
              <div className="py-24 text-center">
                <div className="mx-auto max-w-md rounded-2xl border border-border/70 bg-white/80 p-8 shadow-sm">
                  <h3 className="text-lg font-semibold text-[color:var(--brand-900)]">
                    Không thể tải khóa học
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Đã có lỗi xảy ra. Vui lòng thử lại sau.
                  </p>
                </div>
              </div>
            )}
          </section>
        </div>
      </div>

      <div
        className={`fixed inset-0 z-[70] lg:hidden ${isMobileFiltersOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
        aria-hidden={!isMobileFiltersOpen}
      >
        <button
          type="button"
          className={`absolute inset-0 bg-slate-950/45 backdrop-blur-sm transition-opacity duration-300 ${
            isMobileFiltersOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setIsMobileFiltersOpen(false)}
        />
        <div
          className={`absolute inset-y-0 right-0 w-full max-w-sm bg-white shadow-2xl transition-transform duration-300 ease-out ${
            isMobileFiltersOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex items-center justify-between border-b border-border/70 px-5 py-4">
            <div>
              <p className="text-sm font-semibold text-[color:var(--brand-900)]">Bộ lọc</p>
              <p className="text-xs text-muted-foreground">Lọc theo trình độ, chủ đề và thời lượng</p>
            </div>
            <AppButton
              type="button"
              variant="outline"
              size="icon"
              className="h-9 w-9 rounded-full"
              onClick={() => setIsMobileFiltersOpen(false)}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Đóng bộ lọc</span>
            </AppButton>
          </div>
          <CourseFiltersSidebar
            mode="mobile"
            categories={categories}
            levels={levels}
            durationOptions={durationOptions}
            hasAnyFilters={hasAnyFilters}
            resetFilters={resetFilters}
            selectedCategoryId={selectedCategoryId}
            selectedDurationKeys={selectedDurationKeys}
            selectedFilters={selectedFilters}
            selectedLevelIds={selectedLevelIds}
            toggleCategory={toggleCategory}
            toggleDuration={toggleDuration}
            toggleLevel={toggleLevel}
            showPriceFilter={false}
          />
        </div>
      </div>
    </main>
  )
}
