import { LoginPageClient } from "@/app/login/components/login-page.client";
import { GuestOnlyGuard } from "@/shared/components/auth/client-auth-guard";
import { normalizeReturnTo } from "@/shared/utils/return-to-utils";

type LoginPageProps = {
  searchParams?: Promise<{ returnTo?: string }> | { returnTo?: string };
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const resolvedSearchParams = await Promise.resolve(searchParams);
  const redirectTo = normalizeReturnTo(resolvedSearchParams?.returnTo, "/profile");

  return (
    <GuestOnlyGuard redirectTo={redirectTo}>
      <LoginPageClient />
    </GuestOnlyGuard>
  );
}
