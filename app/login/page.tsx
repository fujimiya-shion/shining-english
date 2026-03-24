import { LoginPageClient } from "@/app/login/components/login-page.client";
import { redirectIfAuthenticated } from "@/shared/server/auth-redirect";

export default async function LoginPage() {
  await redirectIfAuthenticated();

  return <LoginPageClient />;
}
