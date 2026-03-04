import { BookOpenText } from 'lucide-react'
import { AppButton } from '@/shared/components/ui/app-button'
import { Card } from '@/shared/components/ui/card'
import { Input } from '@/shared/components/ui/input'
import { BlogCardItem, type BlogCardItemData } from '@/shared/components/ui/blog/blog-card-item'

const blogPosts: BlogCardItemData[] = [
  {
    slug: 'lo-trinh-tu-hoc-giao-tiep-12-tuan',
    title: 'Lộ trình tự học giao tiếp 12 tuần cho người bận rộn',
    excerpt:
      'Cách chia nhỏ mục tiêu học, sắp xếp lịch học 20-30 phút mỗi ngày để tạo phản xạ nói nhanh hơn.',
    category: 'Giao tiếp',
    date: '25/01/2026',
    readTime: '6 phút đọc',
    image:
      'https://images.pexels.com/photos/3769714/pexels-photo-3769714.jpeg?cs=srgb&dl=pexels-andrea-piacquadio-3769714.jpg&fm=jpg',
  },
  {
    slug: '5-loi-ngu-phap-nguoi-viet-hay-gap',
    title: '5 lỗi ngữ pháp người Việt hay gặp và cách sửa nhanh',
    excerpt:
      'Checklist lỗi sai phổ biến kèm ví dụ thực tế giúp bạn tự sửa trong lúc nói và viết.',
    category: 'Ngữ pháp',
    date: '18/01/2026',
    readTime: '5 phút đọc',
    image:
      'https://images.pexels.com/photos/4144222/pexels-photo-4144222.jpeg?cs=srgb&dl=pexels-olia-danilevich-4144222.jpg&fm=jpg',
  },
  {
    slug: 'viet-email-cong-viec-chuan',
    title: 'Viết email công việc chuẩn, gọn, lịch sự trong 10 phút',
    excerpt:
      'Mẫu cấu trúc email và cụm từ hay dùng để bạn tự tin gửi mail cho sếp, khách hàng.',
    category: 'Viết học thuật',
    date: '10/01/2026',
    readTime: '7 phút đọc',
    image:
      'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?cs=srgb&dl=pexels-fauxels-3184465.jpg&fm=jpg',
  },
]

export default function BlogListingPage() {
  return (
    <main className="min-h-full bg-[radial-gradient(1200px_circle_at_top_left,var(--sky-90)_0%,var(--sky-60)_52%,var(--white)_100%)] py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-muted-foreground">Blog học tiếng Anh</p>
            <h1 className="mt-3 text-4xl font-semibold text-[color:var(--brand-900)]">
              Mẹo học nhanh & dễ áp dụng
            </h1>
            <p className="mt-2 max-w-2xl text-muted-foreground">
              Bài viết ngắn, tập trung vào ngữ pháp, giao tiếp và viết email công việc.
            </p>
          </div>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Input placeholder="Tìm bài viết..." className="h-10 w-full sm:w-72" />
            <AppButton size="icon" className="h-10 w-10 rounded-full">
              <BookOpenText className="h-4 w-4" />
              <span className="sr-only">Tìm bài viết</span>
            </AppButton>
          </div>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[2fr_1fr]">
          <div className="grid gap-6 md:grid-cols-2">
            {blogPosts.map((post) => (
              <BlogCardItem key={post.slug} post={post} />
            ))}
          </div>

          <aside className="space-y-6">
            <Card className="border-border/70 bg-white/95 p-6">
              <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Chủ đề nổi bật</p>
              <div className="mt-4 space-y-3">
                {['Giao tiếp', 'Ngữ pháp', 'IELTS', 'Viết email', 'Phát âm'].map((topic) => (
                  <div
                    key={topic}
                    className="flex items-center justify-between rounded-xl bg-[color:var(--sky-70)] px-3 py-2 text-sm"
                  >
                    <span className="text-[color:var(--brand-900)]">{topic}</span>
                    <span className="text-xs text-muted-foreground">Xem</span>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="border-border/70 bg-white/95 p-6">
              <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Nhận mail cập nhật</p>
              <h2 className="mt-3 text-xl font-semibold text-[color:var(--brand-900)]">
                Mỗi tuần 1 mẹo học nhanh
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Không spam. Chỉ gửi các bài học ngắn và dễ áp dụng.
              </p>
              <div className="mt-4 space-y-3">
                <Input placeholder="you@email.com" className="h-10" />
                <AppButton className="w-full rounded-full">Đăng ký nhận bài</AppButton>
              </div>
            </Card>
          </aside>
        </div>
      </div>
    </main>
  )
}
