'use client'

import Image from 'next/image'
import { CartItem } from '@/data/models/cart-item.model'
import { AppCheckBox } from '@/shared/components/ui/app-checkbox'
import { Button } from '@/shared/components/ui/button'
import { Card } from '@/shared/components/ui/card'
import { AppUtils } from '@/shared/utils/app-utils'
import { formatPrice } from '@/shared/utils/currency-utils'
import { Trash2 } from 'lucide-react'

function resolveCourseId(item: CartItem): number {
  return Number(item.courseId ?? item.course?.id ?? 0)
}

export function CartItemsSection({
  items,
  onRemoveCourse,
  onToggleAll,
  onToggleCourse,
  selectedCourseIds,
}: {
  items: CartItem[]
  onRemoveCourse: (courseId: number) => void
  onToggleAll: () => void
  onToggleCourse: (courseId: number) => void
  selectedCourseIds: number[]
}) {
  const allSelected = items.length > 0 && items.every((item) => selectedCourseIds.includes(resolveCourseId(item)))

  return (
    <Card className="space-y-5 border-border/70 bg-white/95 p-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Giỏ hàng</p>
          <h1 className="mt-2 text-3xl font-semibold text-[color:var(--brand-900)]">Khóa học đã chọn</h1>
        </div>

        <label className="inline-flex items-center gap-3 rounded-full border border-border/70 bg-background/80 px-4 py-2 text-sm text-[color:var(--brand-900)]">
          <AppCheckBox checked={allSelected} onCheckedChange={onToggleAll} />
          Chọn tất cả
        </label>
      </div>

      <div className="space-y-4">
        {items.map((item) => {
          const course = item.course
          const courseId = resolveCourseId(item)
          const imageUrl = AppUtils.getStorageUrl(course?.thumbnail)
          const selected = selectedCourseIds.includes(courseId)

          return (
            <div
              key={item.id}
              role="button"
              tabIndex={0}
              className={`flex gap-4 rounded-2xl border p-4 transition-colors ${
                selected
                  ? 'border-primary/35 bg-primary/5'
                  : 'border-border/70 bg-background/80'
              }`}
              onClick={() => onToggleCourse(courseId)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault()
                  onToggleCourse(courseId)
                }
              }}
            >
              <div className="pt-1">
                <AppCheckBox
                  checked={selected}
                  onCheckedChange={() => onToggleCourse(courseId)}
                  onClick={(event) => event.stopPropagation()}
                />
              </div>

              <div className="h-24 w-24 overflow-hidden rounded-2xl bg-muted">
                {imageUrl ? (
                  <Image
                    src={imageUrl}
                    alt={course?.name ?? 'Course image'}
                    width={96}
                    height={96}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-xs text-muted-foreground">
                    No image
                  </div>
                )}
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <h2 className="line-clamp-2 text-lg font-semibold text-[color:var(--brand-900)]">
                      {course?.name ?? 'Khóa học'}
                    </h2>
                    <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                      {course?.level?.name ? <span>{course.level.name}</span> : null}
                      {course?.category?.name ? <span>{course.category.name}</span> : null}
                      <span>Số lượng: {item.quantity}</span>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Đơn giá</p>
                    <p className="mt-2 text-lg font-semibold text-primary">{formatPrice(course?.price)}</p>
                  </div>
                </div>

                <div className="mt-4">
                  <Button
                    variant="ghost"
                    className="h-9 rounded-full px-3 text-rose-600 hover:bg-rose-50 hover:text-rose-700"
                    onClick={(event) => {
                      event.stopPropagation()
                      onRemoveCourse(courseId)
                    }}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Xóa khỏi giỏ
                  </Button>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </Card>
  )
}
