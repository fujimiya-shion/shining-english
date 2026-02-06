import Link from 'next/link'
import Image from 'next/image'
import { Calendar, Clock, ArrowRight } from 'lucide-react'
import { AppButton } from '@/components/ui/app-button'
import { Card } from '@/components/ui/card'

export type BlogCardItemData = {
  slug: string
  title: string
  excerpt: string
  category: string
  date: string
  readTime: string
  image: string
}

type BlogCardItemProps = {
  post: BlogCardItemData
}

export function BlogCardItem({ post }: BlogCardItemProps) {
  return (
    <Card className="overflow-hidden border-border/70 bg-white/95 shadow-sm">
      <div className="relative h-44">
        <Image
          src={post.image}
          alt={post.title}
          fill
          sizes="(min-width: 1024px) 40vw, 100vw"
          className="object-cover"
        />
      </div>
      <div className="p-5">
        <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
          <span className="rounded-full bg-[color:var(--sky-70)] px-2.5 py-1 text-[10px] font-semibold uppercase text-[color:var(--brand-900)]">
            {post.category}
          </span>
          <span className="inline-flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5" />
            {post.date}
          </span>
          <span className="inline-flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            {post.readTime}
          </span>
        </div>
        <h3 className="mt-3 text-lg font-semibold text-[color:var(--brand-900)]">
          {post.title}
        </h3>
        <p className="mt-2 text-sm text-muted-foreground line-clamp-3">{post.excerpt}</p>
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
