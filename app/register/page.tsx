import { RegisterPageClient } from "@/app/register/components/register-page.client";
import { redirectIfAuthenticated } from "@/shared/server/auth-redirect";

export default async function RegisterPage() {
  await redirectIfAuthenticated();

  return <RegisterPageClient />;
}
