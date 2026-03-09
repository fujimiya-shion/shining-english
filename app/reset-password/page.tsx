import Link from 'next/link'
import { AppButton } from '@/shared/components/ui/app-button'
import { Input } from '@/shared/components/ui/input'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card'

export default function ResetPasswordPage() {
  return (
    <main className="min-h-full bg-[radial-gradient(1200px_circle_at_top_left,var(--sky-110)_0%,var(--sky-60)_50%,var(--white)_100%)] px-4 py-12">
      <div className="mx-auto w-full max-w-xl">
        <Card className="border-border/70 bg-white/95 shadow-[0_24px_70px_-50px_rgba(15,43,82,0.35)]">
          <CardHeader className="space-y-2">
            <CardTitle className="text-3xl">Đặt lại mật khẩu</CardTitle>
            <CardDescription>
              Tạo mật khẩu mới để tiếp tục đăng nhập và học tập.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <form className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="new-password" className="text-sm font-medium">
                  Mật khẩu mới
                </label>
                <Input id="new-password" type="password" placeholder="••••••••" />
              </div>
              <div className="space-y-2">
                <label htmlFor="confirm-password" className="text-sm font-medium">
                  Nhập lại mật khẩu
                </label>
                <Input id="confirm-password" type="password" placeholder="••••••••" />
              </div>
              <AppButton className="h-11 w-full rounded-full" type="button">
                Lưu mật khẩu mới
              </AppButton>
            </form>
            <div className="rounded-2xl border border-border/70 bg-[color:var(--sky-70)] p-4 text-sm text-muted-foreground">
              Hãy chọn mật khẩu tối thiểu 8 ký tự và có cả chữ + số.
            </div>
            <div className="text-center text-sm text-muted-foreground">
              <Link href="/login" className="text-primary font-medium hover:underline">
                Quay lại đăng nhập
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
