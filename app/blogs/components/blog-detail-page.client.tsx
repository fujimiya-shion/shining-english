'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Calendar, ChevronLeft, Clock } from 'lucide-react'
import { Toaster } from 'react-hot-toast'
import { AppButton } from '@/shared/components/ui/app-button'
import { Card } from '@/shared/components/ui/card'
import { AppStatus } from '@/shared/enums/app-status'
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
  const status = useBlogDetailStore((state) => state.status)
  const blog = useBlogDetailStore((state) => state.blog)
  const fetchBySlug = useBlogDetailStore((state) => state.fetchBySlug)

  useEffect(() => {
    void fetchBySlug(slug)
  }, [fetchBySlug, slug])

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

            <div
              className="blog-content mt-8 text-sm leading-7 text-muted-foreground [&_h2]:mb-3 [&_h2]:mt-8 [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:leading-tight [&_h2]:text-[color:var(--brand-900)] [&_h2]:first:mt-0 [&_p]:mb-4 [&_p]:leading-7 [&_ul]:mb-4 [&_ol]:mb-4 [&_ul]:ml-6 [&_ol]:ml-6 [&_ul]:list-disc [&_ol]:list-decimal [&_li]:mb-2 [&_a]:text-primary [&_a]:underline [&_strong]:font-semibold [&_em]:italic [&_table]:w-full [&_table]:border-collapse [&_table]:mb-6 [&_table_th]:border [&_table_th]:border-border [&_table_th]:bg-muted [&_table_th]:px-4 [&_table_th]:py-2 [&_table_th]:text-left [&_table_th]:font-semibold [&_table_td]:border [&_table_td]:border-border [&_table_td]:px-4 [&_table_td]:py-2"
              dangerouslySetInnerHTML={{ __html: blog.content ?? '' }}
            />

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
