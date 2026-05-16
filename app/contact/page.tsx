import { ContactPageClient } from "@/app/contact/components/contact-page.client";
import { RecaptchaProviderClient } from "@/shared/components/providers/recaptcha-provider.client";

export default function ContactPage() {
  return (
    <RecaptchaProviderClient>
      <ContactPageClient />
    </RecaptchaProviderClient>
  );
}
