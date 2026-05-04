import Image from 'next/image'
import Link from 'next/link'
import { BookOpen, Clock3, MessageCircle, ShoppingCart, Star, Users } from 'lucide-react'
import { Course, SerializedCourse } from '@/data/models/course.model'
import { AppButton } from '@/shared/components/ui/app-button'
import { Card } from '@/shared/components/ui/card'
import { AppUtils } from '@/shared/utils/app-utils'
import { cn } from '@/lib/utils'

type CourseCardItemCourse = Course | SerializedCourse

function stripHtml(input?: string): string {
  if (!input) return ''
  return input.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
}

function formatVnd(value: number): string {
  return `${value.toLocaleString('vi-VN')}đ`
}

export type CourseCardItemProps = {
  course: CourseCardItemCourse
  href?: string
  actionLabel?: string
  cartAction?: React.ReactNode
  className?: string
}

export function CourseCardItem({
  course,
  href,
  actionLabel = 'Xem chi tiết',
  cartAction,
  className,
}: CourseCardItemProps) {
  const title = course.name ?? 'Khóa học'
  const category = course.category?.name
  const level = course.level?.name
  const description = stripHtml(course.description)
  const rating = course.rating
  const learned = course.learned
  const lessonsCount = course.lessonsCount ?? course.lessons?.length ?? 0
  const commentsCount = course.commentsCount ?? course.reviews?.length ?? 0
  const totalDurationMinutes =
    course.totalDurationMinutes
    ?? course.lessons?.reduce((total, lesson) => total + (lesson.durationMinutes ?? 0), 0)
    ?? 0
  const totalHours = totalDurationMinutes > 0 ? Number((totalDurationMinutes / 60).toFixed(1)) : 0
  const price = typeof course.price === 'number' ? course.price : undefined
  const originalPriceRaw = (course as { originalPrice?: number; compareAtPrice?: number }).originalPrice
    ?? (course as { originalPrice?: number; compareAtPrice?: number }).compareAtPrice
  const originalPrice =
    typeof originalPriceRaw === 'number' && typeof price === 'number' && originalPriceRaw > price
      ? originalPriceRaw
      : undefined

  const imageUrl = AppUtils.getStorageUrl(course.thumbnail)
  const hasImage = !!imageUrl
  const isExternalRemote =
    hasImage &&
    /^https?:\/\//i.test(imageUrl) &&
    !imageUrl.includes('localhost')
  const isLocalImage =
    hasImage &&
    (imageUrl.startsWith('http://localhost') || imageUrl.startsWith('https://localhost'))

  const formattedPrice =
    typeof price === 'number'
      ? price === 0
        ? 'Miễn phí'
        : formatVnd(price)
      : 'Liên hệ'
  const formattedOriginalPrice = typeof originalPrice === 'number' ? formatVnd(originalPrice) : undefined

  const formattedLearned =
    typeof learned === 'number' ? learned.toLocaleString('vi-VN') : learned

  return (
    <Card
      className={cn(
        'group flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card p-0 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg',
        className
      )}
    >
      <div className="relative aspect-16/10 overflow-hidden bg-muted">
        {hasImage && isExternalRemote ? (
          <img
            src={imageUrl}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
            loading="lazy"
            referrerPolicy="no-referrer"
          />
        ) : hasImage ? (
          <Image
            src={imageUrl}
            alt={title}
            fill
            unoptimized={isLocalImage}
            sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
          />
        ) : (
          <div className="absolute inset-0 bg-linear-to-br from-(--sky-100) to-(--sky-200)" />
        )}

        <div className="absolute left-3 top-3 flex items-center gap-2">
          {typeof rating === 'number' ? (
            <span className="inline-flex items-center gap-1 rounded-full bg-card/95 px-2.5 py-1 text-xs font-semibold text-card-foreground shadow-sm">
              <Star className="h-3.5 w-3.5 fill-primary text-primary" />
              {rating.toFixed(1)}
            </span>
          ) : null}

          {level ? (
            <span className="rounded-full bg-card/95 px-2.5 py-1 text-[11px] font-semibold text-muted-foreground shadow-sm">
              {level}
            </span>
          ) : null}
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-4 p-4">
        <div className="space-y-2">
          {category ? (
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-primary">
              {category}
            </p>
          ) : null}

          <h3 className="line-clamp-2 min-h-[52px] text-xl font-extrabold leading-[1.25] tracking-tight text-card-foreground">
            {title}
          </h3>

          {description ? (
            <p className="line-clamp-2 min-h-[40px] break-words text-sm leading-5 text-muted-foreground">
              {description}
            </p>
          ) : null}
        </div>

        <div className="grid grid-cols-3 rounded-2xl bg-muted/70 p-3">
          <div className="flex flex-col gap-1">
            <BookOpen className="h-4 w-4 text-primary" />
            <span className="text-[11px] text-muted-foreground">Bài học</span>
            <span className="text-sm font-bold text-card-foreground">
              {lessonsCount || '--'}
            </span>
          </div>

          <div className="flex flex-col gap-1">
            <Users className="h-4 w-4 text-primary" />
            <span className="text-[11px] text-muted-foreground">Học viên</span>
            <span className="text-sm font-bold text-card-foreground">
              {formattedLearned || '--'}
            </span>
          </div>

          <div className="flex flex-col gap-1">
            <MessageCircle className="h-4 w-4 text-primary" />
            <span className="text-[11px] text-muted-foreground">Bình luận</span>
            <span className="text-sm font-bold text-card-foreground">
              {commentsCount || '--'}
            </span>
          </div>
        </div>

        <div className="inline-flex items-center gap-1.5 rounded-full bg-[color:var(--sky-60)] px-3 py-1 text-xs font-semibold text-[color:var(--brand-800)]">
          <Clock3 className="h-3.5 w-3.5 text-primary" />
          {totalHours > 0 ? `${totalHours} giờ học` : 'Chưa có thời lượng'}
        </div>

        <div className="mt-auto border-t border-border pt-4">
          <div className="rounded-2xl border border-border/60 bg-muted/40 px-3 py-2.5">
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-muted-foreground">
              Giá khóa học
            </p>
            <div className="mt-1.5 flex flex-wrap items-end gap-x-2 gap-y-1">
              <p
                className={cn(
                  'text-2xl font-extrabold leading-none',
                  price === 0 ? 'text-emerald-600' : 'text-card-foreground'
                )}
              >
                {formattedPrice}
              </p>
              {formattedOriginalPrice ? (
                <span className="text-sm font-semibold text-muted-foreground line-through">
                  {formattedOriginalPrice}
                </span>
              ) : null}
            </div>
          </div>

          <div className="mt-3 flex items-center justify-between gap-2">
            {href ? (
              <AppButton
                asChild
                className="h-11 rounded-full px-4 text-sm font-semibold"
              >
                <Link href={href}>{actionLabel}</Link>
              </AppButton>
            ) : null}

            {cartAction ?? (
              <button
                type="button"
                aria-label="Thêm vào giỏ hàng"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card text-card-foreground shadow-sm transition hover:bg-muted"
              >
                <ShoppingCart className="h-5 w-5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </Card>
  )
}
