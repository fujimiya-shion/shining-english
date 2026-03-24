import { StudentDashboard } from '@/shared/components/ui/student-dashboard'
import { requireAuthenticatedUser } from '@/shared/server/auth-redirect'

export default async function DashboardPage() {
  await requireAuthenticatedUser()

  return <StudentDashboard />
}
