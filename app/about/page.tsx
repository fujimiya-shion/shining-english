import Link from 'next/link'
import { AppButton } from '@/components/ui/app-button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function AboutPage() {
  return (
    <main className="min-h-full bg-[radial-gradient(1200px_circle_at_top_left,var(--sky-110)_0%,var(--sky-60)_50%,var(--white)_100%)] px-4 py-12">
      <div className="mx-auto w-full max-w-4xl">
        <Card className="border-border/70 bg-white/95 shadow-[0_24px_70px_-50px_rgba(15,43,82,0.35)]">
          <CardHeader className="space-y-2">
            <CardTitle className="text-3xl">Về Shining English</CardTitle>
            <CardDescription>
              Một người dạy, một lộ trình rõ ràng, tập trung vào hiệu quả thực tế.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-muted-foreground">
            <p>
              Shining English là dự án học tiếng Anh được xây dựng theo hướng ngắn gọn,
              dễ áp dụng và tập trung vào phản xạ giao tiếp. Mỗi bài học đều được sắp
              xếp theo lộ trình rõ ràng để bạn không bị rối.
            </p>
            <p>
              Bạn có thể theo dõi tiến độ, làm bài tập, nhận phản hồi và cập nhật nội
              dung mới mỗi tuần.
            </p>
            <div className="pt-2">
              <AppButton asChild className="rounded-full">
                <Link href="/courses">Khám phá khóa học</Link>
              </AppButton>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
