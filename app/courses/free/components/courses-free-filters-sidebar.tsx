'use client'

import { AppCheckBox } from '@/shared/components/ui/app-checkbox'
import { Button } from '@/shared/components/ui/button'
import { Card, CardContent } from '@/shared/components/ui/card'
import { SlidersHorizontal } from 'lucide-react'

type Category = { id?: number; name?: string }
type Level = { value?: number; label?: string; count?: number }
type DurationOption = { minHours?: number | null; maxHours?: number | null; label?: string; count?: number }

export function CoursesFreeFiltersSidebar({
  categories,
  levels,
  durationOptions,
  hasAnyFilters,
  resetFilters,
  selectedCategoryId,
  selectedDurationKeys,
  selectedFilters,
  selectedLevelIds,
  toggleCategory,
  toggleDuration,
  toggleLevel,
  mode = 'desktop',
  onClose,
}: {
  categories: Category[]
  levels: Level[]
  durationOptions: DurationOption[]
  hasAnyFilters: boolean
  resetFilters: () => Promise<void>
  selectedCategoryId?: number
  selectedDurationKeys: string[]
  selectedFilters: string[]
  selectedLevelIds: number[]
  toggleCategory: (categoryId?: number) => Promise<void>
  toggleDuration: (minHours?: number | null, maxHours?: number | null) => Promise<void>
  toggleLevel: (levelValue?: number) => Promise<void>
  mode?: 'desktop' | 'mobile'
  onClose?: () => void
}) {
  const isMobile = mode === 'mobile'

  return (
    <aside className={isMobile ? 'block h-full' : 'hidden lg:block'}>
      <div className={isMobile ? 'h-full' : 'sticky top-24 space-y-6'}>
        <Card className={`border-border/70 bg-white/90 ${isMobile ? 'h-full rounded-none border-0 shadow-none' : ''}`}>
          <CardContent
            className={`space-y-6 px-5 py-6 pr-3 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden ${
              isMobile ? 'h-full overflow-y-auto' : 'max-h-[calc(100vh-7.5rem)] overflow-y-auto'
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="inline-flex items-center gap-2 text-sm font-semibold text-[color:var(--brand-900)]">
                  <SlidersHorizontal className="h-4 w-4" />
                  Bộ lọc
                </p>
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
          </CardContent>
        </Card>
      </div>
    </aside>
  )
}
