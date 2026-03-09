import Image from 'next/image'
import Link from 'next/link'
import { Calendar, Clock, ChevronLeft } from 'lucide-react'
import { AppButton } from '@/shared/components/ui/app-button'
import { Card } from '@/shared/components/ui/card'

const mockPost = {
  title: 'Lộ trình tự học giao tiếp 12 tuần cho người bận rộn',
  excerpt:
    'Chia nhỏ mục tiêu theo tuần, tận dụng 20-30 phút mỗi ngày để tạo phản xạ nói tự nhiên và bền vững.',
  category: 'Giao tiếp',
  date: '25/01/2026',
  readTime: '6 phút đọc',
  image:
    'https://images.pexels.com/photos/3769714/pexels-photo-3769714.jpeg?cs=srgb&dl=pexels-andrea-piacquadio-3769714.jpg&fm=jpg',
  sections: [
    {
      heading: 'Tuần 1-2: Xây nền phản xạ nghe - nói',
      content:
        'Tập trung vào shadowing, nghe - nhắc lại câu ngắn, và luyện 10 mẫu câu cơ bản dùng mỗi ngày.',
    },
    {
      heading: 'Tuần 3-6: Mở rộng chủ đề giao tiếp',
      content:
        'Mỗi tuần chọn 2 chủ đề: công việc, sở thích, du lịch, mua sắm. Ghi âm 2 phút/ngày và tự sửa lỗi.',
    },
    {
      heading: 'Tuần 7-12: Thực hành tình huống thật',
      content:
        'Luyện hội thoại theo tình huống (meeting, email, gọi điện), kết hợp phản hồi từ người hướng dẫn.',
    },
  ],
}

export default function BlogDetailPage() {
  return (
    <main className="min-h-full bg-[radial-gradient(1200px_circle_at_top_left,var(--sky-90)_0%,var(--sky-60)_52%,var(--white)_100%)] py-12">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <AppButton asChild variant="outline" className="mb-6 rounded-full">
          <Link href="/blogs">
            <ChevronLeft className="h-4 w-4" />
            Quay lại Blog
          </Link>
        </AppButton>

        <Card className="overflow-hidden border-border/70 bg-white/95 shadow-sm">
          <div className="relative h-64">
            <Image
              src={mockPost.image}
              alt={mockPost.title}
              fill
              sizes="(min-width: 1024px) 60vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="p-6 md:p-10">
            <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
              <span className="rounded-full bg-[color:var(--sky-70)] px-2.5 py-1 text-[10px] font-semibold uppercase text-[color:var(--brand-900)]">
                {mockPost.category}
              </span>
              <span className="inline-flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5" />
                {mockPost.date}
              </span>
              <span className="inline-flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" />
                {mockPost.readTime}
              </span>
            </div>

            <h1 className="mt-4 text-3xl font-semibold text-[color:var(--brand-900)]">
              {mockPost.title}
            </h1>
            <p className="mt-3 text-muted-foreground">{mockPost.excerpt}</p>

            <div className="mt-8 space-y-6 text-sm text-muted-foreground">
              {mockPost.sections.map((section) => (
                <div key={section.heading}>
                  <h2 className="text-lg font-semibold text-[color:var(--brand-900)]">
                    {section.heading}
                  </h2>
                  <p className="mt-2 leading-relaxed">{section.content}</p>
                </div>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap gap-3">
              <AppButton asChild className="rounded-full">
                <Link href="/courses">Xem khóa học liên quan</Link>
              </AppButton>
              <AppButton asChild variant="outline" className="rounded-full">
                <Link href="/dashboard">Lưu vào lộ trình</Link>
              </AppButton>
            </div>
          </div>
        </Card>
      </div>
    </main>
  )
}
