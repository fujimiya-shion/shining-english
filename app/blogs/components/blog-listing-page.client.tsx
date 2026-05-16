'use client'

import { useEffect, useMemo } from 'react'
import Link from 'next/link'
import { BookOpenText, Search, Sparkles } from 'lucide-react'
import { toast, Toaster } from 'react-hot-toast'
import { BlogCardItem } from '@/shared/components/ui/blog/blog-card-item'
import { AppButton } from '@/shared/components/ui/app-button'
import { Card } from '@/shared/components/ui/card'
import { Input } from '@/shared/components/ui/input'
import { useBlogListStore } from '@/app/blogs/stores/blog-list.store'
import { AppStatus } from '@/shared/enums/app-status'
import { toPlainText } from '@/shared/utils/text-utils'

export function BlogListingPageClient() {
  const status = useBlogListStore((state) => state.status)
  const blogs = useBlogListStore((state) => state.blogs)
  const topics = useBlogListStore((state) => state.topics)
  const query = useBlogListStore((state) => state.query)
  const starBalance = useBlogListStore((state) => state.starBalance)
  const errorMessage = useBlogListStore((state) => state.errorMessage)
  const initial = useBlogListStore((state) => state.initial)
  const setQuery = useBlogListStore((state) => state.setQuery)

  useEffect(() => {
    if (status === AppStatus.initial) {
      void initial()
    }
  }, [initial, status])

  useEffect(() => {
    if (status === AppStatus.error && errorMessage) {
      toast.error(errorMessage)
    }
  }, [errorMessage, status])

  const filteredBlogs = useMemo(() => {
    const keyword = query.trim().toLowerCase()
    if (keyword === '') {
      return blogs
    }

    return blogs.filter((blog) => {
      const haystack = [
        blog.title,
        blog.shortDescription,
        toPlainText(blog.description),
        blog.tag?.name,
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase()

      return haystack.includes(keyword)
    })
  }, [blogs, query])

  return (
    <main className="min-h-full bg-[radial-gradient(1200px_circle_at_top_left,var(--sky-90)_0%,var(--sky-60)_52%,var(--white)_100%)] py-12">
      <Toaster position="top-right" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-muted-foreground">Miễn phí & mở bằng sao</p>
            <h1 className="mt-3 text-4xl font-semibold text-[color:var(--brand-900)]">
              Blog học tiếng Anh dễ áp dụng
            </h1>
            <p className="mt-2 max-w-2xl text-muted-foreground">
              Bài viết miễn phí để đọc ngay, và các bài chuyên sâu có thể mở bằng sao của bạn.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-white/90 px-4 py-2 text-sm font-semibold text-[color:var(--brand-900)] shadow-sm">
              <Sparkles className="h-4 w-4 text-primary" />
              {typeof starBalance === 'number' ? `${starBalance} sao hiện có` : 'Đăng nhập để xem số sao'}
            </div>
            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <Input
                placeholder="Tìm bài viết..."
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                className="h-10 w-full sm:w-72"
              />
              <AppButton size="icon" className="h-10 w-10 rounded-full" aria-label="Tìm bài viết">
                <Search className="h-4 w-4" />
                <span className="sr-only">Tìm bài viết</span>
              </AppButton>
            </div>
          </div>
        </div>

        <div className="mt-10 grid items-start gap-6 lg:grid-cols-[2fr_1fr]">
          <div className="grid items-start gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredBlogs.map((post) => (
              <BlogCardItem key={post.id} post={post} />
            ))}

            {status === AppStatus.loading ? (
              <Card className="min-h-60 border-border/70 bg-white/95 p-6 text-sm text-muted-foreground sm:col-span-2 lg:col-span-3">
                Đang tải danh sách bài viết...
              </Card>
            ) : null}

            {status === AppStatus.done && filteredBlogs.length === 0 ? (
              <Card className="min-h-60 border-border/70 bg-white/95 p-6 text-sm text-muted-foreground sm:col-span-2 lg:col-span-3">
                Không tìm thấy bài viết phù hợp với từ khóa hiện tại.
              </Card>
            ) : null}
          </div>

          <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            <Card className="border-border/70 bg-white/95 p-6">
              <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Chủ đề nổi bật</p>
              <div className="mt-4 space-y-3">
                {topics.map((topic) => (
                  <button
                    key={topic.id ?? topic.slug ?? topic.name}
                    type="button"
                    onClick={() => setQuery(topic.name ?? '')}
                    className="flex w-full items-center justify-between rounded-xl bg-[color:var(--sky-70)] px-3 py-2 text-left text-sm"
                  >
                    <span className="text-[color:var(--brand-900)]">{topic.name}</span>
                    <span className="text-xs text-muted-foreground">Lọc</span>
                  </button>
                ))}
              </div>
            </Card>

            <Card className="border-border/70 bg-white/95 p-6">
              <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Học tiếp</p>
              <h2 className="mt-3 text-xl font-semibold text-[color:var(--brand-900)]">
                Muốn học sâu hơn từ bài viết?
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Sau khi đọc blog, bạn có thể chuyển sang các khóa học liên quan để luyện tập có hệ thống.
              </p>
              <div className="mt-4 space-y-3">
                <AppButton asChild className="w-full rounded-full">
                  <Link href="/courses">
                    <BookOpenText className="h-4 w-4" />
                    Xem khóa học
                  </Link>
                </AppButton>
              </div>
            </Card>
          </aside>
        </div>
      </div>
    </main>
  )
}
