'use client'

import { AppStatus } from '@/shared/enums/app-status'
import { Button } from '@/shared/components/ui/button'
import { Star } from 'lucide-react'

export function CourseLearningPlayerReviewModal({
  open,
  title,
  content,
  rating,
  actionStatus,
  message,
  errorMessage,
  onClose,
  onRatingChange,
  onContentChange,
  onSubmit,
}: {
  open: boolean
  title: string
  content: string
  rating: number
  actionStatus: AppStatus
  message?: string | null
  errorMessage?: string | null
  onClose: () => void
  onRatingChange: (rating: number) => void
  onContentChange: (value: string) => void
  onSubmit: () => void
}) {
  if (!open) {
    return null
  }

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/45 px-4">
      <div className="w-full max-w-xl rounded-2xl border border-border/60 bg-background p-6 shadow-2xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-xl font-semibold">{title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">Đánh giá của bạn giúp cải thiện chất lượng khóa học.</p>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>Đóng</Button>
        </div>

        <div className="mt-5 flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((value) => (
            <button
              key={value}
              type="button"
              className="rounded-md p-1 transition hover:scale-105"
              onClick={() => onRatingChange(value)}
            >
              <Star
                className={`h-8 w-8 ${
                  value <= rating ? 'fill-amber-400 text-amber-400' : 'text-muted-foreground/40'
                }`}
              />
            </button>
          ))}
          <span className="ml-2 text-sm font-medium text-muted-foreground">{rating}/5</span>
        </div>

        <textarea
          value={content}
          onChange={(event) => onContentChange(event.target.value)}
          placeholder="Chia sẻ trải nghiệm của bạn..."
          className="mt-4 h-32 w-full resize-none rounded-xl border border-border bg-card p-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        />

        {message ? <p className="mt-3 text-sm text-emerald-600">{message}</p> : null}
        {errorMessage ? <p className="mt-3 text-sm text-destructive">{errorMessage}</p> : null}

        <div className="mt-5 flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>Để sau</Button>
          <Button onClick={onSubmit} disabled={actionStatus === AppStatus.loading || !content.trim()}>
            {actionStatus === AppStatus.loading ? 'Đang gửi...' : 'Gửi đánh giá'}
          </Button>
        </div>
      </div>
    </div>
  )
}
