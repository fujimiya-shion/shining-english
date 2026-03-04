import Link from 'next/link'
import { ShoppingCart } from 'lucide-react'
import { Button } from '@/shared/components/ui/button'
import { AppButton } from '@/shared/components/ui/app-button'

export default function CartPage() {
  return (
    <main className="min-h-full bg-[radial-gradient(1200px_circle_at_top_left,var(--sky-90)_0%,var(--sky-50)_52%,var(--white)_100%)]">
      <div className="mx-auto flex min-h-[60vh] max-w-3xl items-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-border/70 bg-white/90 p-10 text-center shadow-[0_24px_70px_-50px_rgba(15,43,82,0.35)]">
          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-[color:var(--surface-ghost)] text-[color:var(--brand-900)]">
            <ShoppingCart className="h-11 w-11" aria-hidden="true" />
          </div>
          <h1 className="mt-6 text-3xl font-semibold text-[color:var(--brand-900)]">Giỏ hàng trống</h1>
          <p className="mt-3 text-muted-foreground">
            Hãy đăng nhập hoặc tạo tài khoản để lưu khoá học và tiếp tục thanh toán.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <AppButton asChild className="h-11 rounded-full px-8">
              <Link href="/login">Đăng nhập</Link>
            </AppButton>
            <Button asChild variant="outline" className="h-11 rounded-full px-8 bg-transparent">
              <Link href="/register">Tạo tài khoản</Link>
            </Button>
          </div>
        </div>
      </div>
    </main>
  )
}
