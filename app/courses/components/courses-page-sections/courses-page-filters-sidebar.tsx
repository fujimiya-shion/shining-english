'use client'

import * as SliderPrimitive from '@radix-ui/react-slider'
import { formatPricePlaceholder } from '@/app/courses/utils/course-page-utils'
import { AppCheckBox } from '@/shared/components/ui/app-checkbox'
import { Button } from '@/shared/components/ui/button'
import { Card, CardContent } from '@/shared/components/ui/card'
import { Input } from '@/shared/components/ui/input'

type Category = { id?: number; name?: string }
type Level = { value?: number; label?: string; count?: number }
type DurationOption = { minHours?: number | null; maxHours?: number | null; label?: string; count?: number }

export function CoursesPageFiltersSidebar({
  categories,
  levels,
  durationOptions,
  filterPriceMin,
  filterPriceMax,
  hasAnyFilters,
  priceMaxInput,
  priceMinInput,
  resetFilters,
  selectedCategoryId,
  selectedDurationKeys,
  selectedFilters,
  selectedLevelIds,
  sliderLeftPercent,
  sliderMaxValue,
  sliderMinValue,
  sliderWidthPercent,
  toggleCategory,
  toggleDuration,
  toggleLevel,
  updatePriceMaxInput,
  updatePriceMinInput,
  applyPriceFilters,
  setPriceMinFromSlider,
  setPriceMaxFromSlider,
}: {
  categories: Category[]
  levels: Level[]
  durationOptions: DurationOption[]
  filterPriceMin?: number | null
  filterPriceMax?: number | null
  hasAnyFilters: boolean
  priceMaxInput: string
  priceMinInput: string
  resetFilters: () => Promise<void>
  selectedCategoryId?: number
  selectedDurationKeys: string[]
  selectedFilters: string[]
  selectedLevelIds: number[]
  sliderLeftPercent: number
  sliderMaxValue: number
  sliderMinValue: number
  sliderWidthPercent: number
  toggleCategory: (categoryId?: number) => Promise<void>
  toggleDuration: (minHours?: number | null, maxHours?: number | null) => Promise<void>
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
          <CardContent className="max-h-[calc(100vh-7.5rem)] space-y-6 overflow-y-auto px-5 py-6 pr-3 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
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
                {durationOptions.map((item, index) => {
                  const key = `${item.minHours ?? 'n'}-${item.maxHours ?? 'n'}`
                  const checked = selectedDurationKeys.includes(key)

                  return (
                    <label key={`${key}-${index}`} className="flex items-center justify-between text-sm text-muted-foreground">
                      <span className="flex items-center gap-2">
                        <AppCheckBox
                          checked={checked}
                          onCheckedChange={() => void toggleDuration(item.minHours, item.maxHours)}
                        />
                        {item.label ?? ''}
                      </span>
                      <span className="text-xs text-muted-foreground/70">{item.count ?? 0}</span>
                    </label>
                  )
                })}
                {durationOptions.length === 0 ? (
                  <label className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>Chưa có dữ liệu thời lượng</span>
                  </label>
                ) : null}
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
                <SliderPrimitive.Root
                  min={filterPriceMin ?? 0}
                  max={filterPriceMax ?? 0}
                  step={25000}
                  value={[sliderMinValue, sliderMaxValue]}
                  onValueChange={(value) => {
                    const [nextMin, nextMax] = value
                    if (typeof nextMin === 'number') {
                      setPriceMinFromSlider(nextMin)
                    }
                    if (typeof nextMax === 'number') {
                      setPriceMaxFromSlider(nextMax)
                    }
                  }}
                  onValueCommit={() => void applyPriceFilters()}
                  className="relative flex h-6 w-full touch-none select-none items-center"
                >
                  <SliderPrimitive.Track className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-muted">
                    <SliderPrimitive.Range className="absolute h-full bg-primary/70" />
                  </SliderPrimitive.Track>
                  <SliderPrimitive.Thumb className="block h-4 w-4 rounded-full border border-primary/70 bg-white shadow-sm ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 disabled:pointer-events-none disabled:opacity-50" />
                  <SliderPrimitive.Thumb className="block h-4 w-4 rounded-full border border-primary/70 bg-white shadow-sm ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 disabled:pointer-events-none disabled:opacity-50" />
                </SliderPrimitive.Root>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </aside>
  )
}
