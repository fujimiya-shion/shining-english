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

export default function ForgotPasswordPage() {
  return (
    <main className="min-h-full bg-[radial-gradient(1200px_circle_at_top_left,var(--sky-110)_0%,var(--sky-60)_50%,var(--white)_100%)] px-4 py-12">
      <div className="mx-auto w-full max-w-xl">
        <Card className="border-border/70 bg-white/95 shadow-[0_24px_70px_-50px_rgba(15,43,82,0.35)]">
          <CardHeader className="space-y-2">
            <CardTitle className="text-3xl">Quên mật khẩu</CardTitle>
            <CardDescription>
              Nhập email để nhận liên kết đặt lại mật khẩu.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <form className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="reset-email" className="text-sm font-medium">
                  Email đăng ký
                </label>
                <Input id="reset-email" type="email" placeholder="you@email.com" />
              </div>
              <AppButton className="h-11 w-full rounded-full" type="button">
                Gửi liên kết đặt lại
              </AppButton>
            </form>
            <div className="rounded-2xl border border-border/70 bg-[color:var(--sky-70)] p-4 text-sm text-muted-foreground">
              Nếu bạn không nhận được email trong 5 phút, hãy kiểm tra mục spam.
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
