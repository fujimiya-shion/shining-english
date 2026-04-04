import { RegisterPageClient } from "@/app/register/components/register-page.client";
import { GuestOnlyGuard } from "@/shared/components/auth/client-auth-guard";
import { normalizeReturnTo } from "@/shared/utils/return-to-utils";

type RegisterPageProps = {
  searchParams?: Promise<{ returnTo?: string }> | { returnTo?: string };
};

export default async function RegisterPage({ searchParams }: RegisterPageProps) {
  const resolvedSearchParams = await Promise.resolve(searchParams);
  const redirectTo = normalizeReturnTo(resolvedSearchParams?.returnTo, "/profile");

  return (
    <GuestOnlyGuard redirectTo={redirectTo}>
      <RegisterPageClient />
    </GuestOnlyGuard>
  );
}
