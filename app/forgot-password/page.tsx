import { ForgotPasswordPageClient } from "@/app/forgot-password/components/forgot-password-page.client";
import { GuestOnlyGuard } from "@/shared/components/auth/client-auth-guard";

export default function ForgotPasswordPage() {
  return (
    <GuestOnlyGuard redirectTo="/profile">
      <ForgotPasswordPageClient />
    </GuestOnlyGuard>
  );
}
