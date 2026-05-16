'use client'

import { useEffect, useState } from 'react'
import {
  CoursesPageFiltersSidebar,
  CoursesPageGrid,
  CoursesPageHeroSection,
  CoursesPageMobileCategories,
  CoursesPagePagination,
  CoursesPageResultsToolbar,
} from '@/app/courses/components/courses-page-sections'
import { useCoursesPage } from '@/app/courses/hooks/use-courses-page'
import { Toaster } from 'react-hot-toast'
import { AppButton } from '@/shared/components/ui/app-button'
import { SlidersHorizontal, X } from 'lucide-react'

export function CoursesPageClient() {
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false)

  const {
    categories,
    courses,
    filterProps,
    handlePageChange,
    hasAnyFilters,
    page,
    pageCount,
    priceMaxInput,
    priceMinInput,
    searchKeyword,
    resetFilters,
    selectedCategoryId,
    selectedFilters,
    selectedLevelIds,
    sliderLeftPercent,
    sliderMaxValue,
    sliderMinValue,
    sliderWidthPercent,
    toggleCategory,
    toggleLevel,
    updatePriceMaxInput,
    updatePriceMinInput,
    applyFilters,
    setPriceMinFromSlider,
    setPriceMaxFromSlider,
    setSearchKeyword,
    levels,
    durationOptions,
    visiblePages,
    selectedDurationKeys,
    toggleDuration,
  } = useCoursesPage()

  useEffect(() => {
    if (!isMobileFiltersOpen) {
      return
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [isMobileFiltersOpen])

  return (
    <main className="min-h-full bg-[radial-gradient(1200px_circle_at_top_left,var(--sky-90)_0%,var(--sky-50)_52%,var(--white)_100%)] py-6 sm:py-10">
      <Toaster position="top-right" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <CoursesPageHeroSection
          searchKeyword={searchKeyword}
          onChangeSearchKeyword={setSearchKeyword}
          onSubmitSearch={() => applyFilters({ query: searchKeyword, page: 1 })}
        />
        <CoursesPageMobileCategories categories={categories} />
        <div className="mt-6 flex items-center justify-between gap-3 rounded-2xl border border-border/70 bg-white/90 px-4 py-3 lg:hidden">
          <div className="min-w-0">
            <p className="text-sm font-semibold text-[color:var(--brand-900)]">Khám phá khóa học</p>
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
          <CoursesPageFiltersSidebar
            categories={categories}
            levels={levels}
            durationOptions={durationOptions}
            filterPriceMin={filterProps?.price?.min}
            filterPriceMax={filterProps?.price?.max}
            hasAnyFilters={hasAnyFilters}
            priceMaxInput={priceMaxInput}
            priceMinInput={priceMinInput}
            resetFilters={resetFilters}
            selectedCategoryId={selectedCategoryId}
            selectedDurationKeys={selectedDurationKeys}
            selectedFilters={selectedFilters}
            selectedLevelIds={selectedLevelIds}
            sliderLeftPercent={sliderLeftPercent}
            sliderMaxValue={sliderMaxValue}
            sliderMinValue={sliderMinValue}
            sliderWidthPercent={sliderWidthPercent}
            toggleCategory={toggleCategory}
            toggleDuration={toggleDuration}
            toggleLevel={toggleLevel}
            updatePriceMaxInput={updatePriceMaxInput}
            updatePriceMinInput={updatePriceMinInput}
            applyPriceFilters={() => applyFilters({ page: 1 })}
            setPriceMinFromSlider={setPriceMinFromSlider}
            setPriceMaxFromSlider={setPriceMaxFromSlider}
          />

          <section className="space-y-6">
            <CoursesPageResultsToolbar coursesCount={courses.length} hasAnyFilters={hasAnyFilters} />
            <CoursesPageGrid courses={courses} />
            <CoursesPagePagination
              page={page}
              pageCount={pageCount}
              visiblePages={visiblePages}
              onChangePage={handlePageChange}
            />
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
              <p className="text-sm font-semibold text-[color:var(--brand-900)]">Tinh chỉnh kết quả</p>
              <p className="text-xs text-muted-foreground">Lọc theo trình độ, giá và thời lượng</p>
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
          <CoursesPageFiltersSidebar
            mode="mobile"
            onClose={() => setIsMobileFiltersOpen(false)}
            categories={categories}
            levels={levels}
            durationOptions={durationOptions}
            filterPriceMin={filterProps?.price?.min}
            filterPriceMax={filterProps?.price?.max}
            hasAnyFilters={hasAnyFilters}
            priceMaxInput={priceMaxInput}
            priceMinInput={priceMinInput}
            resetFilters={resetFilters}
            selectedCategoryId={selectedCategoryId}
            selectedDurationKeys={selectedDurationKeys}
            selectedFilters={selectedFilters}
            selectedLevelIds={selectedLevelIds}
            sliderLeftPercent={sliderLeftPercent}
            sliderMaxValue={sliderMaxValue}
            sliderMinValue={sliderMinValue}
            sliderWidthPercent={sliderWidthPercent}
            toggleCategory={toggleCategory}
            toggleDuration={toggleDuration}
            toggleLevel={toggleLevel}
            updatePriceMaxInput={updatePriceMaxInput}
            updatePriceMinInput={updatePriceMinInput}
            applyPriceFilters={() => applyFilters({ page: 1 })}
            setPriceMinFromSlider={setPriceMinFromSlider}
            setPriceMaxFromSlider={setPriceMaxFromSlider}
          />
        </div>
      </div>
    </main>
  )
}
