'use client'

import { durationFilters, formatPricePlaceholder } from '@/app/courses/utils/course-page-utils'
import { AppCheckBox } from '@/shared/components/ui/app-checkbox'
import { Button } from '@/shared/components/ui/button'
import { Card, CardContent } from '@/shared/components/ui/card'
import { Input } from '@/shared/components/ui/input'

type Category = { id?: number; name?: string }
type Level = { value?: number; label?: string; count?: number }

export function CoursesPageFiltersSidebar({
  categories,
  levels,
  filterPriceMin,
  filterPriceMax,
  hasAnyFilters,
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
  applyPriceFilters,
  setPriceMinFromSlider,
  setPriceMaxFromSlider,
}: {
  categories: Category[]
  levels: Level[]
  filterPriceMin?: number | null
  filterPriceMax?: number | null
  hasAnyFilters: boolean
  priceMaxInput: string
  priceMinInput: string
  resetFilters: () => Promise<void>
  selectedCategoryId?: number
  selectedFilters: string[]
  selectedLevelIds: number[]
  sliderLeftPercent: number
  sliderMaxValue: number
  sliderMinValue: number
  sliderWidthPercent: number
  toggleCategory: (categoryId?: number) => Promise<void>
  toggleLevel: (levelValue?: number) => Promise<void>
  updatePriceMaxInput: (value: string) => void
  updatePriceMinInput: (value: string) => void
  applyPriceFilters: () => Promise<void>
  setPriceMinFromSlider: (value: number) => void
  setPriceMaxFromSlider: (value: number) => void
}) {
  return (
    <aside className="hidden lg:block">
      <div className="sticky top-24 space-y-6">
        <Card className="border-border/70 bg-white/90">
          <CardContent className="space-y-6 px-5 py-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-[color:var(--brand-900)]">Bộ lọc</p>
                <p className="text-xs text-muted-foreground">Chọn để thu gọn kết quả</p>
              </div>
              <Button variant="ghost" size="sm" className="text-xs" onClick={() => void resetFilters()}>
                Xoá lọc
              </Button>
            </div>

            {hasAnyFilters ? (
              <div className="rounded-2xl border border-border/70 bg-[color:var(--sky-60)] p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                  Đang chọn
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {selectedFilters.map((item) => (
                    <span
                      key={item}
                      className="rounded-full bg-white px-3 py-1 text-xs font-medium text-[color:var(--brand-900)] shadow-sm"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ) : null}

            <div className="rounded-2xl border border-border/70 bg-white p-4">
              <p className="text-sm font-semibold">Trình độ</p>
              <div className="mt-3 space-y-2">
                {levels.map((levelItem, index) => (
                  <label
                    key={levelItem.label ?? index}
                    className="flex items-center justify-between text-sm text-muted-foreground"
                  >
                    <span className="flex items-center gap-2">
                      <AppCheckBox
                        checked={levelItem.value !== undefined && selectedLevelIds.includes(levelItem.value)}
                        onCheckedChange={() => void toggleLevel(levelItem.value)}
                      />
                      {levelItem.label ?? ''}
                    </span>
                    <span className="text-xs text-muted-foreground/70">{levelItem.count ?? 0}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-border/70 bg-white p-4">
              <p className="text-sm font-semibold">Chủ đề</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {categories.map((category, index) => (
                  <button
                    key={category.id ?? index}
                    type="button"
                    onClick={() => void toggleCategory(category.id)}
                    className={`rounded-full border px-3 py-1 text-xs transition-colors ${
                      selectedCategoryId === category.id
                        ? 'border-primary/60 bg-primary/5 text-primary'
                        : 'border-border/80 bg-white text-muted-foreground hover:border-primary/60 hover:text-primary'
                    }`}
                  >
                    {category.name ?? ''}
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-border/70 bg-white p-4">
              <p className="text-sm font-semibold">Thời lượng</p>
              <div className="mt-3 space-y-2">
                {durationFilters.map((item) => (
                  <label key={item} className="flex items-center justify-between text-sm text-muted-foreground">
                    <span className="flex items-center gap-2">
                      <AppCheckBox />
                      {item}
                    </span>
                    <span className="text-xs text-muted-foreground/70">6</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-border/70 bg-white p-4">
              <p className="text-sm font-semibold">Mức giá</p>
              <div className="mt-3 grid grid-cols-2 gap-3">
                <Input
                  placeholder={formatPricePlaceholder(filterPriceMin, 'Từ giá thấp')}
                  value={priceMinInput}
                  onChange={(event) => updatePriceMinInput(event.target.value)}
                  onBlur={() => void applyPriceFilters()}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                      void applyPriceFilters()
                    }
                  }}
                  className="h-9 text-xs"
                />
                <Input
                  placeholder={formatPricePlaceholder(filterPriceMax, 'Đến giá cao')}
                  value={priceMaxInput}
                  onChange={(event) => updatePriceMaxInput(event.target.value)}
                  onBlur={() => void applyPriceFilters()}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                      void applyPriceFilters()
                    }
                  }}
                  className="h-9 text-xs"
                />
              </div>
              <div className="relative mt-3 h-6">
                <div className="absolute left-0 right-0 top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-muted" />
                <div
                  className="absolute top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-primary/70"
                  style={{ left: `${sliderLeftPercent}%`, width: `${sliderWidthPercent}%` }}
                />
                <input
                  type="range"
                  min={filterPriceMin ?? 0}
                  max={filterPriceMax ?? 0}
                  value={sliderMinValue}
                  onChange={(event) => setPriceMinFromSlider(Number.parseInt(event.target.value, 10))}
                  onMouseUp={() => void applyPriceFilters()}
                  onTouchEnd={() => void applyPriceFilters()}
                  className="pointer-events-none absolute left-0 top-0 h-6 w-full appearance-none bg-transparent [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border [&::-webkit-slider-thumb]:border-primary/70 [&::-webkit-slider-thumb]:bg-white"
                />
                <input
                  type="range"
                  min={filterPriceMin ?? 0}
                  max={filterPriceMax ?? 0}
                  value={sliderMaxValue}
                  onChange={(event) => setPriceMaxFromSlider(Number.parseInt(event.target.value, 10))}
                  onMouseUp={() => void applyPriceFilters()}
                  onTouchEnd={() => void applyPriceFilters()}
                  className="pointer-events-none absolute left-0 top-0 h-6 w-full appearance-none bg-transparent [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border [&::-webkit-slider-thumb]:border-primary/70 [&::-webkit-slider-thumb]:bg-white"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </aside>
  )
}
