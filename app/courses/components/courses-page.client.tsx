'use client'

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

export function CoursesPageClient() {
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
    levels,
    visiblePages,
  } = useCoursesPage()

  return (
    <main className="min-h-full bg-[radial-gradient(1200px_circle_at_top_left,var(--sky-90)_0%,var(--sky-50)_52%,var(--white)_100%)] py-10">
      <Toaster position="top-right" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <CoursesPageHeroSection />
        <CoursesPageMobileCategories categories={categories} />

        <div className="mt-10 grid gap-8 lg:grid-cols-[280px_1fr]">
          <CoursesPageFiltersSidebar
            categories={categories}
            levels={levels}
            filterPriceMin={filterProps?.price?.min}
            filterPriceMax={filterProps?.price?.max}
            hasAnyFilters={hasAnyFilters}
            priceMaxInput={priceMaxInput}
            priceMinInput={priceMinInput}
            resetFilters={resetFilters}
            selectedCategoryId={selectedCategoryId}
            selectedFilters={selectedFilters}
            selectedLevelIds={selectedLevelIds}
            sliderLeftPercent={sliderLeftPercent}
            sliderMaxValue={sliderMaxValue}
            sliderMinValue={sliderMinValue}
            sliderWidthPercent={sliderWidthPercent}
            toggleCategory={toggleCategory}
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
    </main>
  )
}
