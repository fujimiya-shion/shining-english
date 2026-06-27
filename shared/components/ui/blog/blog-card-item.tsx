import Image from 'next/image'
import Link from 'next/link'
import { Calendar, Clock, ArrowRight } from 'lucide-react'
import { AppButton } from '@/shared/components/ui/app-button'
import { Card } from '@/shared/components/ui/card'
import { Blog } from '@/data/models/blog.model'
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

type BlogCardItemProps = {
  post: Blog
}

export function BlogCardItem({ post }: BlogCardItemProps) {
  const descriptionSource =
    post.shortDescription?.trim() ? post.shortDescription : post.description
  const description = toPlainText(descriptionSource)
  const imageUrl = AppUtils.getStorageUrl(post.thumbnail ?? undefined)
  const hasImage = !!imageUrl
  const isExternalRemote =
    hasImage &&
    /^https?:\/\//i.test(imageUrl) &&
    !imageUrl.includes('localhost')
  const isLocalImage =
    hasImage &&
    (imageUrl.startsWith('http://localhost') || imageUrl.startsWith('https://localhost'))

  return (
    <Card className="!gap-0 !p-0 h-full overflow-hidden border-border/70 bg-white/95 shadow-sm">
      <div className="relative aspect-[16/9] overflow-hidden bg-muted">
        {hasImage && isExternalRemote ? (
          <img
            src={imageUrl}
            alt={post.title ?? 'Blog'}
            className="h-full w-full object-cover"
            loading="lazy"
            referrerPolicy="no-referrer"
          />
        ) : hasImage ? (
          <Image
            src={imageUrl}
            alt={post.title ?? 'Blog'}
            fill
            unoptimized={isLocalImage}
            sizes="(min-width: 1024px) 40vw, 100vw"
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-linear-to-br from-(--sky-100) to-(--sky-200)" />
        )}
      </div>

      <div className="p-5">
        <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
          <span className="rounded-full bg-[color:var(--sky-70)] px-2.5 py-1 text-[10px] font-semibold uppercase text-[color:var(--brand-900)]">
            {post.tag?.name ?? 'Blog'}
          </span>
          <span className="inline-flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5" />
            {formatDate(post.publishedAt)}
          </span>
          <span className="inline-flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            {Math.max(1, post.readTimeMinutes ?? 1)} phút đọc
          </span>
        </div>

        <h3
          className="mt-3 overflow-hidden text-lg font-semibold leading-[1.3] text-[color:var(--brand-900)]"
          style={{
            display: '-webkit-box',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: 2,
          }}
        >
          {post.title}
        </h3>
        <p
          className="mt-2 overflow-hidden text-sm leading-6 text-muted-foreground"
          style={{
            display: '-webkit-box',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: 3,
          }}
        >
          {description}
        </p>

        <AppButton asChild className="mt-4 w-full rounded-full">
          <Link href={`/blogs/${post.slug}`}>
            Đọc bài viết
            <ArrowRight className="h-4 w-4" />
          </Link>
        </AppButton>
      </div>
    </Card>
  )
}
