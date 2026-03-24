import { ForgotPasswordPageClient } from "@/app/forgot-password/components/forgot-password-page.client";
import { redirectIfAuthenticated } from "@/shared/server/auth-redirect";

export default async function ForgotPasswordPage() {
  await redirectIfAuthenticated();

  return <ForgotPasswordPageClient />;
}
