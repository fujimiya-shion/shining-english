import { ResetPasswordPageClient } from "@/app/reset-password/components/reset-password-page.client";
import { redirectIfAuthenticated } from "@/shared/server/auth-redirect";

export default async function ResetPasswordPage() {
  await redirectIfAuthenticated();

  return <ResetPasswordPageClient />;
}
