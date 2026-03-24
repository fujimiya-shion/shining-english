import Link from 'next/link'
import { AuthRequiredGuard } from '@/shared/components/auth/client-auth-guard'
import { Button } from '@/shared/components/ui/button'
import { AppButton } from '@/shared/components/ui/app-button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card'

const sampleOrders = [
  { id: 'SE-2401', status: 'Hoàn tất', amount: '890.000đ', date: '02/01/2026' },
  { id: 'SE-2394', status: 'Hoàn tất', amount: '790.000đ', date: '20/12/2025' },
]

export default function OrdersPage() {
  return (
    <AuthRequiredGuard redirectTo="/login">
      <main className="min-h-full bg-[radial-gradient(1200px_circle_at_top_left,var(--sky-110)_0%,var(--sky-60)_50%,var(--white)_100%)] px-4 py-12">
        <div className="mx-auto w-full max-w-4xl">
          <Card className="border-border/70 bg-white/95 shadow-[0_24px_70px_-50px_rgba(15,43,82,0.35)]">
            <CardHeader className="space-y-2">
              <CardTitle className="text-3xl">Lịch sử đơn hàng</CardTitle>
              <CardDescription>
                Theo dõi các đơn hàng bạn đã thanh toán tại Shining English.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-3">
                {sampleOrders.map((order) => (
                  <div
                    key={order.id}
                    className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border/70 bg-[color:var(--sky-70)] px-4 py-3"
                  >
                    <div>
                      <p className="text-sm font-semibold text-[color:var(--brand-900)]">{order.id}</p>
                      <p className="text-xs text-muted-foreground">{order.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold">{order.amount}</p>
                      <p className="text-xs text-muted-foreground">{order.status}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-3">
                <AppButton asChild className="h-11 rounded-full">
                  <Link href="/courses">Khám phá khóa học mới</Link>
                </AppButton>
                <Button asChild variant="outline" className="h-11 rounded-full">
                  <Link href="/dashboard">Quay về dashboard</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </AuthRequiredGuard>
  )
}
