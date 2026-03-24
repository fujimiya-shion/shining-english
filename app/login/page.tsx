import { LoginPageClient } from "@/app/login/components/login-page.client";
import { GuestOnlyGuard } from "@/shared/components/auth/client-auth-guard";

export default function LoginPage() {
  return (
    <GuestOnlyGuard redirectTo="/profile">
      <LoginPageClient />
    </GuestOnlyGuard>
  );
}
