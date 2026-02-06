import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { AppButton } from '@/components/ui/app-button'
import { Input } from '@/components/ui/input'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export default function LoginPage() {
  return (
    <main className="relative min-h-full overflow-hidden bg-[radial-gradient(1200px_circle_at_top_left,var(--sky-110)_0%,var(--sky-60)_50%,var(--white)_100%)] py-12 lg:py-16">
      <div className="pointer-events-none absolute -left-24 top-10 h-64 w-64 rounded-full bg-[color:var(--sky-300)]/30 blur-3xl"></div>
      <div className="pointer-events-none absolute right-0 top-32 h-72 w-72 rounded-full bg-primary/20 blur-[120px]"></div>
      <div className="pointer-events-none absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-[color:var(--brand-900)]/10 blur-[140px]"></div>
      <div className="relative mx-auto grid max-w-6xl items-stretch gap-10 px-4 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="hidden lg:flex">
          <div className="relative flex w-full flex-col overflow-hidden rounded-3xl border border-border bg-[color:var(--brand-900)] px-8 py-10 text-white shadow-[0_30px_80px_-50px_rgba(15,43,82,0.9)]">
            <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-primary/20 blur-2xl"></div>
            <div className="absolute -bottom-16 -left-8 h-40 w-40 rounded-full bg-[color:var(--sky-300)]/20 blur-3xl"></div>
            <p className="text-xs uppercase tracking-[0.35em] text-white/70">Shining English</p>
            <h1 className="mt-4 text-4xl font-semibold leading-tight">
              Đăng nhập để bắt đầu hành trình học tiếng Anh chuyên sâu.
            </h1>
            <p className="mt-4 text-white/70">
              Học theo lộ trình cá nhân, theo dõi tiến bộ và nhận hỗ trợ trực tiếp từ người dạy.
            </p>
            <div className="mt-8 grid gap-4">
              {[
                'Kho bài học cập nhật hằng tuần',
                'Bài tập thực tế, phản hồi chi tiết',
                'Lộ trình gọn gàng, dễ theo',
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/80"
                >
                  <span className="h-2 w-2 rounded-full bg-primary"></span>
                  {item}
                </div>
              ))}
            </div>
            <div className="mt-auto grid gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-xs text-white/70">
              <div className="flex items-center justify-between">
                <span>Người học đang hoạt động</span>
                <span className="text-sm font-semibold text-white">10K+</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Đánh giá trung bình</span>
                <span className="text-sm font-semibold text-white">4.8★</span>
              </div>
            </div>
          </div>
        </div>

        <Card className="mx-auto flex w-full max-w-lg flex-col border-border/70 bg-white/95 shadow-[0_24px_70px_-50px_rgba(15,43,82,0.35)]">
          <CardHeader className="space-y-2">
            <CardTitle className="text-3xl">Chào mừng bạn trở lại</CardTitle>
            <CardDescription>
              Đăng nhập bằng Google hoặc email + mật khẩu để tiếp tục học.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-1 flex-col space-y-6">
            <Button
              variant="outline"
              className="h-11 w-full justify-center gap-3 rounded-full"
              type="button"
            >
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-sm font-semibold text-[color:var(--brand-900)] shadow-sm">
                G
              </span>
              Tiếp tục với Google
            </Button>

            <div className="relative">
              <div className="h-px bg-border"></div>
              <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-3 text-xs uppercase tracking-[0.3em] text-muted-foreground">
                Hoặc
              </span>
            </div>

            <form className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="login-email">
                  Email
                </label>
                <Input id="login-email" type="email" placeholder="you@email.com" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="login-password">
                  Mật khẩu
                </label>
                <Input id="login-password" type="password" placeholder="••••••••" />
              </div>
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 text-muted-foreground">
                  <input type="checkbox" className="h-4 w-4 rounded border-border" />
                  Ghi nhớ đăng nhập
                </label>
                <Link className="text-primary hover:underline" href="#">
                  Quên mật khẩu?
                </Link>
              </div>
              <AppButton className="h-11 w-full rounded-full" type="button">
                Đăng nhập
              </AppButton>
            </form>

            <div className="rounded-2xl border border-border/70 bg-[color:var(--sky-70)] p-4">
              <div className="grid gap-3 sm:grid-cols-3">
                {[
                  { label: 'Học nhanh', value: '10 phút/ngày' },
                  { label: 'Phản hồi', value: 'Trong 24h' },
                  { label: 'Lộ trình', value: 'Cá nhân hóa' },
                ].map((item) => (
                  <div key={item.label} className="rounded-xl bg-white px-3 py-2 text-center shadow-sm">
                    <p className="text-xs text-muted-foreground">{item.label}</p>
                    <p className="text-sm font-semibold text-[color:var(--brand-900)]">{item.value}</p>
                  </div>
                ))}
              </div>
              <p className="mt-3 text-center text-xs text-muted-foreground">
                Đăng nhập là bạn đã sẵn sàng bắt đầu bài học mới hôm nay.
              </p>
            </div>

            <div className="mt-auto text-center text-sm text-muted-foreground">
              Chưa có tài khoản?{' '}
              <Link className="text-primary font-medium hover:underline" href="/register">
                Tạo tài khoản
              </Link>
            </div>
            <div className="text-center text-xs text-muted-foreground">
              <Link className="hover:underline" href="/">
                Quay lại trang chủ
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
