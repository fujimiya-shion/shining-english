'use client'

import { AuthRequiredGuard } from '@/shared/components/auth/client-auth-guard'
import { NotesResources } from '@/shared/components/ui/notes-resources'

export default function NotesPage() {
  return (
    <AuthRequiredGuard redirectTo="/login">
      <main className="min-h-screen bg-background py-4">
        <NotesResources />
      </main>
    </AuthRequiredGuard>
  )
}
