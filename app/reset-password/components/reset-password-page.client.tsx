"use client";

import { FormEvent, Suspense, useEffect, useMemo } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { AppButton } from "@/shared/components/ui/app-button";
import { Input } from "@/shared/components/ui/input";
import { AppStatus } from "@/shared/enums/app-status";
import { useResetPasswordStore } from "@/app/reset-password/stores/reset-password.store";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";

function ResetPasswordContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") ?? "";
  const token = searchParams.get("token") ?? "";
  const {
    status,
    password,
    passwordConfirmation,
    message,
    errorMessage,
    localError,
    setPassword,
    setPasswordConfirmation,
    clearFeedback,
    setLocalError,
    resetPassword,
    reset,
  } = useResetPasswordStore();

  useEffect(() => {
    clearFeedback();
    reset();
  }, [clearFeedback, reset]);

  const hasResetContext = useMemo(() => {
    return email.trim().length > 0 && token.trim().length > 0;
  }, [email, token]);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLocalError(null);

    const success = await resetPassword(email, token);

    if (success) {
      reset();
      window.setTimeout(() => {
        router.push("/login");
      }, 1200);
    }
  };

  const isSubmitting = status === AppStatus.loading;

  return (
    <main className="min-h-full bg-[radial-gradient(1200px_circle_at_top_left,var(--sky-110)_0%,var(--sky-60)_50%,var(--white)_100%)] px-4 py-12">
      <div className="mx-auto w-full max-w-xl">
        <Card className="border-border/70 bg-white/95 shadow-[0_24px_70px_-50px_rgba(15,43,82,0.35)]">
          <CardHeader className="space-y-2">
            <CardTitle className="text-3xl">Đặt lại mật khẩu</CardTitle>
            <CardDescription>
              Tạo mật khẩu mới để tiếp tục đăng nhập và học tập.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <form className="space-y-4" onSubmit={onSubmit}>
              <div className="space-y-2">
                <label htmlFor="reset-context-email" className="text-sm font-medium">
                  Email
                </label>
                <Input
                  id="reset-context-email"
                  type="email"
                  value={email}
                  readOnly
                  className="bg-muted"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="new-password" className="text-sm font-medium">
                  Mật khẩu mới
                </label>
                <Input
                  id="new-password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="confirm-password" className="text-sm font-medium">
                  Nhập lại mật khẩu
                </label>
                <Input
                  id="confirm-password"
                  type="password"
                  placeholder="••••••••"
                  value={passwordConfirmation}
                  onChange={(event) => setPasswordConfirmation(event.target.value)}
                  required
                />
              </div>
              {(localError || errorMessage) && (
                <p className="text-sm text-red-600" role="alert">
                  {localError ?? errorMessage}
                </p>
              )}
              {message && (
                <p className="text-sm text-emerald-700" role="status">
                  {message}
                </p>
              )}
              <AppButton
                className="h-11 w-full rounded-full"
                type="submit"
                disabled={isSubmitting || !hasResetContext}
              >
                {isSubmitting ? "Đang cập nhật..." : "Lưu mật khẩu mới"}
              </AppButton>
            </form>
            <div className="rounded-2xl border border-border/70 bg-[color:var(--sky-70)] p-4 text-sm text-muted-foreground">
              Hãy chọn mật khẩu tối thiểu 6 ký tự. Bạn sẽ được chuyển về trang đăng nhập sau khi cập nhật thành công.
            </div>
            <div className="text-center text-sm text-muted-foreground">
              <Link href="/login" className="text-primary font-medium hover:underline">
                Quay lại đăng nhập
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}

export function ResetPasswordPageClient() {
  return (
    <Suspense
      fallback={
        <main className="min-h-full bg-[radial-gradient(1200px_circle_at_top_left,var(--sky-110)_0%,var(--sky-60)_50%,var(--white)_100%)] px-4 py-12">
          <div className="mx-auto w-full max-w-xl">
            <Card className="border-border/70 bg-white/95 shadow-[0_24px_70px_-50px_rgba(15,43,82,0.35)]">
              <CardContent className="p-8 text-center text-sm text-muted-foreground">
                Đang tải thông tin đặt lại mật khẩu...
              </CardContent>
            </Card>
          </div>
        </main>
      }
    >
      <ResetPasswordContent />
    </Suspense>
  );
}
