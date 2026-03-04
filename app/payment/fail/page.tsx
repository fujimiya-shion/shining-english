import Link from 'next/link'
import { Button } from '@/shared/components/ui/button'
import { AppButton } from '@/shared/components/ui/app-button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card'

export default function PaymentFailPage() {
  return (
    <main className="min-h-full bg-[radial-gradient(1200px_circle_at_top_left,var(--sky-110)_0%,var(--sky-60)_50%,var(--white)_100%)] px-4 py-12">
      <div className="mx-auto w-full max-w-3xl">
        <Card className="border-border/70 bg-white/95 text-center shadow-[0_24px_70px_-50px_rgba(15,43,82,0.35)]">
          <CardHeader className="space-y-2">
            <CardTitle className="text-3xl">Thanh toán chưa thành công</CardTitle>
            <CardDescription>
              Đơn hàng chưa hoàn tất. Bạn có thể thử lại hoặc liên hệ hỗ trợ.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="rounded-2xl border border-border/70 bg-[color:var(--sky-70)] p-4 text-sm text-muted-foreground">
              Nếu tài khoản đã bị trừ tiền, vui lòng gửi mã giao dịch để được kiểm tra.
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              <AppButton asChild className="h-11 rounded-full">
                <Link href="/checkout">Thử thanh toán lại</Link>
              </AppButton>
              <Button asChild variant="outline" className="h-11 rounded-full">
                <Link href="/">Về trang chủ</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
