import { ResetPasswordPageClient } from "@/app/reset-password/components/reset-password-page.client";
import { GuestOnlyGuard } from "@/shared/components/auth/client-auth-guard";

export default function ResetPasswordPage() {
  return (
    <GuestOnlyGuard redirectTo="/profile">
      <ResetPasswordPageClient />
    </GuestOnlyGuard>
  );
}
