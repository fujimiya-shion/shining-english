'use client'

import { SerializedCourseReview } from '@/data/models/course-review.model'
import { CourseLearningPlayerRatingStars } from '@/app/courses/components/course-learning-player-sections/course-learning-player-rating-stars'
import { AppUtils } from '@/shared/utils/app-utils'
import { formatRelativeTime } from '@/shared/utils/date-time-utils'
import { Button } from '@/shared/components/ui/button'

export function CourseLearningPlayerReviewsSection({
  reviews,
  canWriteReview,
  onOpenReviewModal,
  hasReviewed,
}: {
  reviews: SerializedCourseReview[]
  canWriteReview: boolean
  onOpenReviewModal?: () => void
  hasReviewed?: boolean
}) {
  return (
    <div className="mt-2 rounded-2xl border border-border/60 bg-card/70 p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold">Đánh giá khóa học</h3>
          <p className="text-sm text-muted-foreground">Phản hồi từ học viên đã tham gia khóa học</p>
        </div>
        {canWriteReview ? (
          <Button variant="outline" onClick={onOpenReviewModal}>
            {hasReviewed ? 'Sửa đánh giá' : 'Viết đánh giá'}
          </Button>
        ) : null}
      </div>
      <div className="mt-6 grid gap-4">
        {reviews.map((review) => {
          const name = review.user?.name?.trim() || 'Học viên'
          return (
            <div key={review.id} className="rounded-xl border border-border/60 bg-background p-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  {review.user?.avatar ? (
                    <img
                      src={AppUtils.getHostUrl(review.user.avatar)}
                      alt={name}
                      className="h-10 w-10 rounded-full object-cover"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 font-semibold text-primary">
                      {name.slice(0, 1)}
                    </div>
                  )}
                  <div>
                    <p className="font-medium">{name}</p>
                    <p className="text-xs text-muted-foreground">{review.createdAt ? formatRelativeTime(review.createdAt) : ''}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <CourseLearningPlayerRatingStars rating={review.rating ?? 0} />
                </div>
              </div>
              <p className="mt-3 text-sm text-muted-foreground">{review.content?.trim() || 'Đánh giá đang được cập nhật.'}</p>
            </div>
          )
        })}
        {reviews.length === 0 ? (
          <div className="rounded-xl border border-border/60 bg-background p-4 text-sm text-muted-foreground">
            Chưa có đánh giá cho khóa học này.
          </div>
        ) : null}
      </div>
    </div>
  )
}
