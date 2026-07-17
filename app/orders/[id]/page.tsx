import { AuthRequiredGuard } from '@/shared/components/auth/client-auth-guard'
import { OrderDetailClient } from './order-detail.client'

export default function OrderDetailPage() {
  return (
    <AuthRequiredGuard redirectTo="/login">
      <main className="min-h-full bg-[radial-gradient(1200px_circle_at_top_left,var(--sky-110)_0%,var(--sky-60)_50%,var(--white)_100%)] px-4 py-12">
        <div className="mx-auto w-full max-w-3xl">
          <OrderDetailClient />
        </div>
      </main>
    </AuthRequiredGuard>
  )
}
