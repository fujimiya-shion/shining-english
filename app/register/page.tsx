import { RegisterPageClient } from "@/app/register/components/register-page.client";
import { GuestOnlyGuard } from "@/shared/components/auth/client-auth-guard";

export default function RegisterPage() {
  return (
    <GuestOnlyGuard redirectTo="/profile">
      <RegisterPageClient />
    </GuestOnlyGuard>
  );
}
