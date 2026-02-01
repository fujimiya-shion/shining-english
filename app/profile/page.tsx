import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { AppButton } from '@/components/ui/app-button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export default function ProfilePage() {
  return (
    <main className="min-h-full bg-[radial-gradient(1200px_circle_at_top_left,var(--sky-110)_0%,var(--sky-60)_50%,var(--white)_100%)] px-4 py-12">
      <div className="mx-auto w-full max-w-4xl">
        <Card className="border-border/70 bg-white/95 shadow-[0_24px_70px_-50px_rgba(15,43,82,0.35)]">
          <CardHeader className="space-y-2">
            <CardTitle className="text-3xl">Hồ sơ học viên</CardTitle>
            <CardDescription>
              Quản lý thông tin cá nhân, mục tiêu học và tiến độ của bạn.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="rounded-2xl border border-border/70 bg-[color:var(--sky-70)] p-4">
              <p className="text-sm text-muted-foreground">
                Thông tin hồ sơ sẽ hiển thị ở đây sau khi bạn hoàn thiện.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <AppButton type="button" className="h-11 rounded-full">
                Chỉnh sửa hồ sơ
              </AppButton>
              <Button asChild variant="outline" className="h-11 rounded-full">
                <Link href="/dashboard">Quay về dashboard</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
