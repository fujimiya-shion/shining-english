'use client'

import { CourseLearningPlayerRatingStars } from '@/app/courses/components/course-learning-player-sections/course-learning-player-rating-stars'
import { CourseLearningPlayerMeta } from '@/app/courses/components/course-learning-player-sections/course-learning-player-types'
import { AppButton } from '@/shared/components/ui/app-button'
import { Button } from '@/shared/components/ui/button'
import { formatPrice } from '@/shared/utils/currency-utils'

export function CourseLearningPlayerHeaderSection({
  authenticated,
  canWatchCourse,
  courseMeta,
  coursePrice,
  inCart,
  progressPercentage,
  onAddToCart,
  onBuyNow,
  purchaseErrorMessage,
  purchaseMessage,
  isPurchaseActionLoading,
}: {
  authenticated: boolean
  canWatchCourse: boolean
  courseMeta: CourseLearningPlayerMeta
  coursePrice?: number
  inCart: boolean
  progressPercentage: number
  onAddToCart: () => void
  onBuyNow: () => void
  purchaseErrorMessage?: string | null
  purchaseMessage?: string | null
  isPurchaseActionLoading: boolean
}) {
  return (
    <div className="rounded-2xl border border-border/60 bg-card/80 p-6">
      <div className="flex flex-wrap items-start justify-between gap-6">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-muted/60 px-3 py-1 text-xs text-muted-foreground">
            Lộ trình cá nhân • {courseMeta.level}
          </div>
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">{courseMeta.title}</h1>
            <p className="mt-2 text-muted-foreground">{courseMeta.subtitle}</p>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <span>Giảng viên: {courseMeta.instructor}</span>
            <span>•</span>
            <span>{courseMeta.totalLessons} bài học</span>
            {courseMeta.totalHours > 0 ? (
              <>
                <span>•</span>
                <span>{courseMeta.totalHours} giờ học</span>
              </>
            ) : null}
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <CourseLearningPlayerRatingStars rating={courseMeta.rating} />
            </div>
            <span className="text-sm font-medium">{courseMeta.rating}</span>
            <span className="text-sm text-muted-foreground">
              ({courseMeta.reviewCount.toLocaleString()} đánh giá)
            </span>
          </div>
        </div>

        <div
          className={`w-full rounded-[28px] border px-5 py-5 shadow-[0_22px_60px_-42px_rgba(15,23,42,0.38)] ${
            canWatchCourse
              ? 'border-border/60 bg-background'
              : 'border-primary/15 bg-[linear-gradient(180deg,rgba(255,248,230,0.98),rgba(255,255,255,0.98))]'
          }`}
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                {canWatchCourse ? 'Đang học' : 'Mở khóa khóa học'}
              </p>
              <p
                className={`mt-2 text-3xl font-semibold ${
                  canWatchCourse ? 'text-primary' : 'text-[color:var(--brand-900)]'
                }`}
              >
                {canWatchCourse ? `${Math.round(progressPercentage)}%` : formatPrice(coursePrice)}
              </p>
            </div>
            {!canWatchCourse ? (
              <div className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                {inCart ? 'Trong giỏ hàng' : authenticated ? 'Chưa sở hữu' : 'Khách'}
              </div>
            ) : null}
          </div>

          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            {canWatchCourse
              ? 'Tiếp tục học từ bài học gần nhất của bạn.'
              : inCart
                ? 'Khóa học đã nằm trong giỏ hàng. Bạn có thể sang checkout để hoàn tất.'
                : authenticated
                  ? 'Mở toàn bộ video, tài liệu và tiến độ học tập ngay sau khi thanh toán.'
                  : 'Đăng nhập để thêm vào giỏ, mua ngay và mở toàn bộ nội dung khóa học.'}
          </p>

          {!canWatchCourse ? (
            <div className="mt-4 rounded-2xl border border-primary/15 bg-white/80 px-4 py-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Quyền lợi sau khi mở khóa</span>
                <span className="font-medium text-[color:var(--brand-900)]">{courseMeta.totalLessons} bài học</span>
              </div>
              <div className="mt-3 grid gap-2 text-sm text-[color:var(--brand-900)]">
                <div>Toàn bộ video theo lộ trình</div>
                <div>Ghi chú và tài liệu theo bài học</div>
                <div>Theo dõi tiến độ học tập cá nhân</div>
              </div>
            </div>
          ) : null}

          {purchaseMessage ? (
            <div className="mt-4 rounded-2xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
              {purchaseMessage}
            </div>
          ) : null}
          {purchaseErrorMessage ? (
            <div className="mt-4 rounded-2xl border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">
              {purchaseErrorMessage}
            </div>
          ) : null}

          {canWatchCourse ? (
            <AppButton className="mt-5 h-11 w-full rounded-full">Tiếp tục học</AppButton>
          ) : (
            <div className="mt-5 grid gap-3">
              <AppButton className="h-11 w-full rounded-full text-base font-semibold" onClick={onBuyNow}>
                Mua ngay
              </AppButton>
              <Button
                variant="outline"
                className="h-11 w-full rounded-full border-primary/25 bg-white/80 text-[color:var(--brand-900)] hover:border-primary/45 hover:bg-primary/5"
                disabled={isPurchaseActionLoading}
                onClick={onAddToCart}
              >
                {inCart ? 'Đi đến giỏ hàng' : 'Thêm vào giỏ hàng'}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
