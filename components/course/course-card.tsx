import Image from 'next/image'
import Link from 'next/link'
import { BookOpen, Clock3, Lightbulb, Users } from 'lucide-react'
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
        // Education-y: sáng, vui, bo tròn hơn, shadow mềm, ring nhẹ, hover “pop”
        'group relative overflow-hidden rounded-[26px] border border-border/60 bg-white p-0 shadow-[0_14px_40px_-28px_rgba(0,0,0,0.55)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_28px_70px_-38px_rgba(0,0,0,0.65)] hover:border-[color:color-mix(in_oklab,var(--primary)_35%,transparent)]',
        className
      )}
    >
      {/* subtle playful border glow */}
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="absolute -inset-24 bg-[radial-gradient(circle_at_30%_10%,color-mix(in_oklab,var(--primary)_18%,transparent),transparent_45%),radial-gradient(circle_at_80%_30%,rgba(255,205,61,0.18),transparent_55%)]" />
      </div>

      <div className="relative">
        <div className="relative aspect-[4/3] overflow-hidden rounded-t-[26px] bg-muted">
          <Image
            src={image}
            alt={imageAlt || title}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.06]"
          />

          {/* pattern overlay (education vibe) */}
          <div className="pointer-events-none absolute inset-0 opacity-70 mix-blend-soft-light">
            <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.28)_1px,transparent_1px)] [background-size:14px_14px]" />
          </div>

          {/* gradient overlay: bớt “dark business”, chuyển sang sáng + nổi chữ */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[color:color-mix(in_oklab,var(--primary)_22%,transparent)] via-transparent to-[rgba(255,205,61,0.18)]" />
        </div>

        {/* badges */}
        <div className="absolute top-4 left-4 flex flex-wrap items-center gap-2">
          {category && (
            <div className="rounded-full bg-white/90 px-3.5 py-1.5 text-[11px] font-extrabold uppercase tracking-[0.22em] text-[color:var(--brand-900)] shadow-sm ring-1 ring-black/5 backdrop-blur">
              {category}
            </div>
          )}
          {/* cute “New / Hot” optional: bật khi có metaNote kiểu “Mới” / “Hot” (tuỳ bạn) */}
          {metaNote?.toLowerCase()?.includes('mới') && (
            <div className="rounded-full bg-emerald-500/90 px-3 py-1.5 text-[11px] font-bold text-white shadow-sm ring-1 ring-emerald-200/40 backdrop-blur">
              NEW ✨
            </div>
          )}
        </div>

        <div className="absolute top-4 right-4 flex items-center gap-2">
          {level && (
            <div className="rounded-full bg-[color:color-mix(in_oklab,var(--primary)_85%,#0f2b52)] px-3.5 py-1.5 text-[11px] font-semibold text-white shadow-sm ring-1 ring-white/20 backdrop-blur">
              {level}
            </div>
          )}
          {rating ? (
            <div className="flex items-center gap-1 rounded-full bg-white/90 px-3 py-1.5 text-[11px] font-bold text-[color:var(--brand-900)] shadow-sm ring-1 ring-black/5 backdrop-blur">
              <span className="text-[color:color-mix(in_oklab,var(--primary)_75%,#ffb300)]">★</span>
              {rating}
            </div>
          ) : null}
        </div>

        {/* bottom chips line (super education app vibe) */}
        {(lessons || duration) && (
          <div className="absolute bottom-4 left-4 flex items-center gap-2">
            {lessons ? (
              <div className="rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold text-[color:var(--brand-900)] ring-1 ring-black/5 backdrop-blur">
                <span className="inline-flex items-center gap-1.5">
                  <BookOpen className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
                  {lessons} bài
                </span>
              </div>
            ) : null}
            {duration ? (
              <div className="rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold text-[color:var(--brand-900)] ring-1 ring-black/5 backdrop-blur">
                <span className="inline-flex items-center gap-1.5">
                  <Clock3 className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
                  {duration}
                </span>
              </div>
            ) : null}
          </div>
        )}
      </div>

      <div className="flex-1 p-5 pt-0 flex flex-col">
        <h3 className="text-[17px] font-extrabold leading-snug text-[color:var(--brand-950)] line-clamp-2 transition-colors group-hover:text-[color:var(--brand-900)]">
          {title}
        </h3>

        {/* students + note line */}
        {(students || metaNote) && (
          <div className="mt-2 flex flex-wrap items-center gap-2 text-[13px] text-[color:var(--brand-700)]">
            {students ? (
              <span className="inline-flex items-center gap-1 rounded-full bg-muted/60 px-3 py-1 ring-1 ring-black/5">
                <Users className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
                {typeof students === 'number' ? students.toLocaleString('vi-VN') : students} học viên
              </span>
            ) : null}
            {metaNote ? (
              <span className="inline-flex items-center gap-1 rounded-full bg-muted/60 px-3 py-1 ring-1 ring-black/5">
                <Lightbulb className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
                {metaNote}
              </span>
            ) : null}
          </div>
        )}

        {/* pricing */}
        {(price || rating) && (
          <div className="mt-auto pt-5 flex items-center justify-between border-t border-border/60">
            {price ? (
              <div className="flex flex-col">
                <span className="text-[11px] font-semibold text-[color:var(--brand-600)]">
                  Học phí
                </span>
                <span className="text-[22px] font-extrabold tracking-tight text-primary">
                  ₫{formattedPrice}
                </span>
              </div>
            ) : (
              <span />
            )}

            {/* small social proof */}
            {students ? (
              <span className="text-xs font-semibold text-muted-foreground">
                {typeof students === 'number' ? students.toLocaleString('vi-VN') : students}+ đã học
              </span>
            ) : rating ? (
              <span className="text-xs font-semibold text-muted-foreground">{rating}★</span>
            ) : null}
          </div>
        )}

        <div className="mt-4 flex items-center gap-3">
          {actions ? (
            actions
          ) : href ? (
            <AppButton
              asChild
              className="flex-1 rounded-full font-semibold shadow-sm hover:shadow-md transition-shadow"
            >
              <Link href={href}>{actionLabel}</Link>
            </AppButton>
          ) : null}
        </div>
      </div>
    </Card>
  )
}
