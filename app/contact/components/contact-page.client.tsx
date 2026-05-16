"use client";

import Link from "next/link";
import { FormEvent, useEffect } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { AppButton } from "@/shared/components/ui/app-button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Input } from "@/shared/components/ui/input";
import { AppStatus } from "@/shared/enums/app-status";
import { useContactStore } from "@/app/contact/stores/contact.store";

export function ContactPageClient() {
  const {
    status,
    name,
    email,
    message,
    successMessage,
    errorMessage,
    setName,
    setEmail,
    setMessage,
    submitContact,
    clearFeedback,
  } = useContactStore();
  const { executeRecaptcha } = useGoogleReCaptcha();

  useEffect(() => {
    clearFeedback();
  }, [clearFeedback]);

  const isSubmitting = status === AppStatus.loading;

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const recaptchaAction = process.env.NEXT_PUBLIC_RECAPTCHA_CONTACT_ACTION ?? "contact";

    if (!executeRecaptcha) {
      await submitContact("");
      return;
    }

    try {
      const token = await executeRecaptcha(recaptchaAction);
      await submitContact(token);
    } catch {
      await submitContact("");
    }
  };

  return (
    <main className="min-h-full bg-[radial-gradient(1200px_circle_at_top_left,var(--sky-110)_0%,var(--sky-60)_50%,var(--white)_100%)] px-4 py-12">
      <div className="mx-auto w-full max-w-4xl">
        <Card className="border-border/70 bg-white/95 shadow-[0_24px_70px_-50px_rgba(15,43,82,0.35)]">
          <CardHeader className="space-y-2">
            <CardTitle className="text-3xl">Liên hệ</CardTitle>
            <CardDescription>
              Gửi câu hỏi hoặc đề xuất để được phản hồi trong 24h.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <form className="space-y-4" onSubmit={onSubmit}>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor="contact-name" className="text-sm font-medium">
                    Họ và tên
                  </label>
                  <Input
                    id="contact-name"
                    placeholder="Nguyễn Minh Anh"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="contact-email" className="text-sm font-medium">
                    Email
                  </label>
                  <Input
                    id="contact-email"
                    type="email"
                    placeholder="you@email.com"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="contact-message" className="text-sm font-medium">
                  Nội dung
                </label>
                <textarea
                  id="contact-message"
                  className="h-32 w-full rounded-lg border border-border bg-background p-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Bạn cần hỗ trợ gì?"
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  required
                />
              </div>
              {errorMessage && (
                <p className="text-sm text-red-600" role="alert">
                  {errorMessage}
                </p>
              )}
              {successMessage && (
                <p className="text-sm text-emerald-700" role="status">
                  {successMessage}
                </p>
              )}
              <div className="flex flex-wrap gap-3">
                <AppButton className="rounded-full" type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Đang gửi..." : "Gửi liên hệ"}
                </AppButton>
                <AppButton asChild variant="outline" className="rounded-full">
                  <Link href="/">Quay về trang chủ</Link>
                </AppButton>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
