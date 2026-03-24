import { AuthRequiredGuard } from '@/shared/components/auth/client-auth-guard'
import { StudentDashboard } from '@/shared/components/ui/student-dashboard'

export default function DashboardPage() {
  return (
    <AuthRequiredGuard redirectTo="/login">
      <StudentDashboard />
    </AuthRequiredGuard>
  )
}
