'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Calendar, ChevronLeft, Clock, Lock, Sparkles } from 'lucide-react'
import { toast, Toaster } from 'react-hot-toast'
import { AppButton } from '@/shared/components/ui/app-button'
import { Card } from '@/shared/components/ui/card'
import { AppStatus } from '@/shared/enums/app-status'
import { useAuthStore } from '@/shared/stores/auth.store'
import { useBlogDetailStore } from '@/app/blogs/stores/blog-detail.store'
import { AppUtils } from '@/shared/utils/app-utils'
import { toPlainText } from '@/shared/utils/text-utils'

function formatDate(value?: string | null): string {
  if (!value) {
    return 'Mới cập nhật'
  }

  const date = new Date(value)
  if (Number.isNaN(date.getTime())) {
    return 'Mới cập nhật'
  }

  return new Intl.DateTimeFormat('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(date)
}

export function BlogDetailPageClient({ slug }: { slug: string }) {
  const authenticated = useAuthStore((state) => state.authenticated)
  const status = useBlogDetailStore((state) => state.status)
  const actionStatus = useBlogDetailStore((state) => state.actionStatus)
  const blog = useBlogDetailStore((state) => state.blog)
  const starBalance = useBlogDetailStore((state) => state.starBalance)
  const message = useBlogDetailStore((state) => state.message)
  const errorMessage = useBlogDetailStore((state) => state.errorMessage)
  const fetchBySlug = useBlogDetailStore((state) => state.fetchBySlug)
  const unlock = useBlogDetailStore((state) => state.unlock)
  const clearFeedback = useBlogDetailStore((state) => state.clearFeedback)

  useEffect(() => {
    void fetchBySlug(slug)
  }, [fetchBySlug, slug])

  useEffect(() => {
    if (message) {
      toast.success(message)
      clearFeedback()
    }
  }, [clearFeedback, message])

  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage)
      clearFeedback()
    }
  }, [clearFeedback, errorMessage])

  if (status === AppStatus.loading || !blog) {
    return (
      <main className="min-h-full bg-[radial-gradient(1200px_circle_at_top_left,var(--sky-90)_0%,var(--sky-60)_52%,var(--white)_100%)] py-12">
        <Toaster position="top-right" />
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <Card className="border-border/70 bg-white/95 p-8 text-sm text-muted-foreground">
            Đang tải bài viết...
          </Card>
        </div>
      </main>
    )
  }

  const hasEnoughStars =
    typeof starBalance === 'number' && typeof blog.requiredStar === 'number'
      ? starBalance >= blog.requiredStar
      : false
  const imageUrl = AppUtils.getStorageUrl(blog.thumbnail ?? undefined)
  const hasImage = !!imageUrl
  const isExternalRemote =
    hasImage &&
    /^https?:\/\//i.test(imageUrl) &&
    !imageUrl.includes('localhost')
  const isLocalImage =
    hasImage &&
    (imageUrl.startsWith('http://localhost') || imageUrl.startsWith('https://localhost'))

  return (
    <main className="min-h-full bg-[radial-gradient(1200px_circle_at_top_left,var(--sky-90)_0%,var(--sky-60)_52%,var(--white)_100%)] py-12">
      <Toaster position="top-right" />
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <AppButton asChild variant="outline" className="mb-6 rounded-full">
          <Link href="/blogs">
            <ChevronLeft className="h-4 w-4" />
            Quay lại Blog
          </Link>
        </AppButton>

        <Card className="!gap-0 !p-0 overflow-hidden border-border/70 bg-white/95 shadow-sm">
          <div className="relative aspect-[16/9] overflow-hidden bg-muted">
            {hasImage && isExternalRemote ? (
              <img
                src={imageUrl}
                alt={blog.title ?? 'Blog'}
                className="h-full w-full object-cover"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
            ) : hasImage ? (
              <Image
                src={imageUrl}
                alt={blog.title ?? 'Blog'}
                fill
                unoptimized={isLocalImage}
                sizes="(min-width: 1024px) 60vw, 100vw"
                className="object-cover"
              />
            ) : (
              <div className="absolute inset-0 bg-linear-to-br from-(--sky-100) to-(--sky-200)" />
            )}
          </div>
          <div className="p-6 md:p-10">
            <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
              <span className="rounded-full bg-[color:var(--sky-70)] px-2.5 py-1 text-[10px] font-semibold uppercase text-[color:var(--brand-900)]">
                {blog.tag?.name ?? 'Blog'}
              </span>
              <span
                className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 font-semibold ${
                  blog.isFree ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                }`}
              >
                {blog.isFree ? <Sparkles className="h-3.5 w-3.5" /> : <Lock className="h-3.5 w-3.5" />}
                {blog.isFree ? 'Miễn phí' : `${blog.requiredStar} sao`}
              </span>
              <span className="inline-flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5" />
                {formatDate(blog.publishedAt)}
              </span>
              <span className="inline-flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" />
                {Math.max(1, blog.readTimeMinutes ?? 1)} phút đọc
              </span>
            </div>

            <h1 className="mt-4 text-3xl font-semibold text-[color:var(--brand-900)]">{blog.title}</h1>
            <p className="mt-3 text-muted-foreground">
              {blog.shortDescription?.trim() ? blog.shortDescription : toPlainText(blog.description)}
            </p>

            {blog.canView ? (
              <div
                className="blog-content mt-8 text-sm leading-7 text-muted-foreground [&_h2]:mb-3 [&_h2]:mt-8 [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:leading-tight [&_h2]:text-[color:var(--brand-900)] [&_h2]:first:mt-0 [&_p]:mb-4 [&_p]:leading-7 [&_ul]:mb-4 [&_ol]:mb-4 [&_ul]:ml-6 [&_ol]:ml-6 [&_ul]:list-disc [&_ol]:list-decimal [&_li]:mb-2 [&_a]:text-primary [&_a]:underline [&_strong]:font-semibold [&_em]:italic"
                dangerouslySetInnerHTML={{ __html: blog.content ?? '' }}
              />
            ) : (
              <Card className="mt-8 border-amber-200 bg-amber-50/70 p-6">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div className="space-y-2">
                    <p className="text-sm font-semibold text-amber-800">Bài viết này đang bị khóa</p>
                    <p className="text-sm text-amber-700">
                      Dùng {blog.requiredStar} sao để mở toàn bộ nội dung. Số sao hiện có của bạn:{' '}
                      {typeof starBalance === 'number' ? starBalance : 'chưa xác định'}.
                    </p>
                  </div>

                  {!authenticated ? (
                    <AppButton asChild className="rounded-full">
                      <Link href="/login">Đăng nhập để mở bài</Link>
                    </AppButton>
                  ) : (
                    <AppButton
                      className="rounded-full"
                      disabled={!hasEnoughStars || actionStatus === AppStatus.loading}
                      onClick={() => {
                        void unlock()
                      }}
                    >
                      {actionStatus === AppStatus.loading
                        ? 'Đang mở...'
                        : hasEnoughStars
                          ? `Dùng ${blog.requiredStar} sao để mở`
                          : 'Không đủ sao để mở'}
                    </AppButton>
                  )}
                </div>
              </Card>
            )}

            <div className="mt-10 flex flex-wrap gap-3">
              <AppButton asChild className="rounded-full">
                <Link href="/courses">Xem khóa học liên quan</Link>
              </AppButton>
              <AppButton asChild variant="outline" className="rounded-full">
                <Link href="/blogs">Đọc thêm bài khác</Link>
              </AppButton>
            </div>
          </div>
        </Card>
      </div>
    </main>
  )
}
