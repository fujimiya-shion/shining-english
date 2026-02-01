import Image from 'next/image'
import Link from 'next/link'
import { AppButton } from '@/components/ui/app-button'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'

export type CourseCardProps = {
  title: string
  image: string
  imageAlt?: string
  category?: string
  level?: string
  rating?: number
  students?: number | string
  lessons?: number
  duration?: string
  price?: number | string
  metaNote?: string
  href?: string
  actionLabel?: string
  actions?: React.ReactNode
  className?: string
}

export function CourseCard({
  title,
  image,
  imageAlt,
  category,
  level,
  rating,
  students,
  lessons,
  duration,
  price,
  metaNote,
  href,
  actionLabel = 'Xem Chi Tiết',
  actions,
  className,
}: CourseCardProps) {
  const metaParts: string[] = []
  if (lessons) metaParts.push(`${lessons} bài`)
  if (duration) metaParts.push(duration)
  if (students) {
    const formattedStudents =
      typeof students === 'number' ? students.toLocaleString('vi-VN') : students
    metaParts.push(`${formattedStudents} học viên`)
  }
  if (metaNote) metaParts.push(metaNote)

  const formattedPrice =
    typeof price === 'number' ? price.toLocaleString('vi-VN') : price

  return (
    <Card
      className={cn(
        'course-card group relative overflow-hidden rounded-2xl border border-border/70 bg-white/95 p-0 gap-0 shadow-[0_12px_30px_-20px_rgba(0,0,0,0.45)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_50px_-22px_rgba(0,0,0,0.5)]',
        className
      )}
    >
      <div className="relative">
        <div className="relative aspect-[4/3] bg-muted overflow-hidden rounded-t-2xl">
          <Image
            src={image}
            alt={imageAlt || title}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent"></div>
        {category && (
          <div className="absolute top-4 left-4 rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-foreground shadow-sm">
            {category}
          </div>
        )}
        {level ? (
          <div className="absolute top-4 right-4 rounded-full bg-[#0f2b52]/90 px-3 py-1 text-xs text-white shadow-sm">
            {level}
          </div>
        ) : rating ? (
          <div className="absolute top-4 right-4 flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-xs font-medium text-foreground shadow-sm">
            <span className="text-primary">★</span>
            {rating}
          </div>
        ) : null}
      </div>

      <div className="flex-1 p-6 flex flex-col">
        <h3 className="text-base font-semibold leading-snug line-clamp-2 group-hover:text-primary transition-colors">
          {title}
        </h3>
        {metaParts.length > 0 && (
          <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
            {metaParts.join(' • ')}
          </div>
        )}
        {(price || rating) && (
          <div className="mt-auto pt-5 flex items-center justify-between border-t border-border/60">
            {price ? (
              <span className="text-lg font-bold text-primary">₫{formattedPrice}</span>
            ) : (
              <span />
            )}
            {rating && level && (
              <span className="text-xs text-muted-foreground">{rating}★</span>
            )}
          </div>
        )}
        <div className="mt-4 flex items-center gap-3">
          {actions ? (
            actions
          ) : href ? (
            <AppButton asChild className="flex-1 rounded-full">
              <Link href={href}>{actionLabel}</Link>
            </AppButton>
          ) : null}
        </div>
      </div>
    </Card>
  )
}
