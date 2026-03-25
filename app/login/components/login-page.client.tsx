"use client";

import { FormEvent, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AppButton } from "@/shared/components/ui/app-button";
import { Input } from "@/shared/components/ui/input";
import { AppStatus } from "@/shared/enums/app-status";
import { useLoginStore } from "@/app/login/stores/login.store";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";

export function LoginPageClient() {
  const router = useRouter();
  const {
    status,
    email,
    password,
    rememberLogin,
    message,
    errorMessage,
    setEmail,
    setPassword,
    setRememberLogin,
    clearFeedback,
    login,
    loginWithGoogle,
    reset,
  } = useLoginStore();

  useEffect(() => {
    clearFeedback();
    reset();
  }, [clearFeedback, reset]);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const authenticated = await login();
    if (authenticated) {
      reset();
      router.replace("/profile");
    }
  };

  const onGoogleLogin = async () => {
    const authenticated = await loginWithGoogle();
    if (authenticated) {
      reset();
      router.replace("/profile");
    }
  };

  const isSubmitting = status === AppStatus.loading;

  return (
    <main className="relative min-h-full overflow-hidden bg-[radial-gradient(1200px_circle_at_top_left,var(--sky-110)_0%,var(--sky-60)_50%,var(--white)_100%)] py-12 lg:py-16">
      <div className="pointer-events-none absolute -left-24 top-10 h-64 w-64 rounded-full bg-[color:var(--sky-300)]/30 blur-3xl"></div>
      <div className="pointer-events-none absolute right-0 top-32 h-72 w-72 rounded-full bg-primary/20 blur-[120px]"></div>
      <div className="pointer-events-none absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-[color:var(--brand-900)]/10 blur-[140px]"></div>
      <div className="relative mx-auto grid max-w-6xl items-stretch gap-10 px-4 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="hidden lg:flex">
          <div className="relative flex w-full flex-col overflow-hidden rounded-3xl border border-border bg-[color:var(--brand-900)] px-8 py-10 text-white shadow-[0_30px_80px_-50px_rgba(15,43,82,0.9)]">
            <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-primary/20 blur-2xl"></div>
            <div className="absolute -bottom-16 -left-8 h-40 w-40 rounded-full bg-[color:var(--sky-300)]/20 blur-3xl"></div>
            <p className="text-xs uppercase tracking-[0.35em] text-white/70">Shining English</p>
            <h1 className="mt-4 text-4xl font-semibold leading-tight">
              Đăng nhập để bắt đầu hành trình học tiếng Anh chuyên sâu.
            </h1>
            <p className="mt-4 text-white/70">
              Học theo lộ trình cá nhân, theo dõi tiến bộ và nhận hỗ trợ trực tiếp từ người dạy.
            </p>
            <div className="mt-8 grid gap-4">
              {[
                "Kho bài học cập nhật hằng tuần",
                "Bài tập thực tế, phản hồi chi tiết",
                "Lộ trình gọn gàng, dễ theo",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/80"
                >
                  <span className="h-2 w-2 rounded-full bg-primary"></span>
                  {item}
                </div>
              ))}
            </div>
            <div className="mt-auto grid gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-xs text-white/70">
              <div className="flex items-center justify-between">
                <span>Người học đang hoạt động</span>
                <span className="text-sm font-semibold text-white">10K+</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Đánh giá trung bình</span>
                <span className="text-sm font-semibold text-white">4.8★</span>
              </div>
            </div>
          </div>
        </div>

        <Card className="mx-auto flex w-full max-w-lg flex-col border-border/70 bg-white/95 shadow-[0_24px_70px_-50px_rgba(15,43,82,0.35)]">
          <CardHeader className="space-y-2">
            <CardTitle className="text-3xl">Chào mừng bạn trở lại</CardTitle>
            <CardDescription>
              Đăng nhập bằng email để tiếp tục học và theo dõi tiến độ của bạn.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-1 flex-col space-y-6">
            <div className="space-y-3">
              <AppButton
                className="h-11 w-full rounded-full border-border/80 bg-white text-[color:var(--brand-900)] shadow-none hover:bg-[color:var(--sky-70)]"
                type="button"
                variant="outline"
                disabled={isSubmitting}
                onClick={onGoogleLogin}
              >
                <span className="mr-2 inline-flex h-5 w-5 items-center justify-center">
                  <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5">
                    <path
                      fill="#4285F4"
                      d="M21.6 12.23c0-.68-.06-1.33-.17-1.95H12v3.69h5.39a4.6 4.6 0 0 1-1.99 3.02v2.5h3.22c1.89-1.74 2.98-4.3 2.98-7.26Z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 22c2.7 0 4.96-.9 6.61-2.44l-3.22-2.5c-.9.6-2.05.96-3.39.96-2.6 0-4.8-1.76-5.59-4.12H3.08v2.59A9.99 9.99 0 0 0 12 22Z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M6.41 13.9A5.99 5.99 0 0 1 6.1 12c0-.66.11-1.3.31-1.9V7.51H3.08A9.99 9.99 0 0 0 2 12c0 1.61.39 3.13 1.08 4.49l3.33-2.59Z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.98c1.47 0 2.8.5 3.84 1.49l2.88-2.88C16.95 2.94 14.69 2 12 2A9.99 9.99 0 0 0 3.08 7.51L6.41 10.1C7.2 7.74 9.4 5.98 12 5.98Z"
                    />
                  </svg>
                </span>
                {isSubmitting ? "Đang kết nối..." : "Tiếp tục với Google"}
              </AppButton>
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-border/70"></span>
                </div>
                <div className="relative flex justify-center text-xs uppercase tracking-[0.24em] text-muted-foreground">
                  <span className="bg-white px-3">Hoặc đăng nhập bằng email</span>
                </div>
              </div>
            </div>
            <form className="space-y-4" onSubmit={onSubmit}>
              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="login-email">
                  Email
                </label>
                <Input
                  id="login-email"
                  type="email"
                  placeholder="you@email.com"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="login-password">
                  Mật khẩu
                </label>
                <Input
                  id="login-password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                />
              </div>
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 text-muted-foreground">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-border"
                    checked={rememberLogin}
                    onChange={(event) => setRememberLogin(event.target.checked)}
                  />
                  Ghi nhớ đăng nhập
                </label>
                <Link className="text-primary hover:underline" href="/forgot-password">
                  Quên mật khẩu?
                </Link>
              </div>
              {errorMessage && (
                <p className="text-sm text-red-600" role="alert">
                  {errorMessage}
                </p>
              )}
              {message && (
                <p className="text-sm text-emerald-700" role="status">
                  {message}
                </p>
              )}
              <AppButton className="h-11 w-full rounded-full" type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Đang đăng nhập..." : "Đăng nhập"}
              </AppButton>
            </form>

            <div className="rounded-2xl border border-border/70 bg-[color:var(--sky-70)] p-4">
              <div className="grid gap-3 sm:grid-cols-3">
                {[
                  { label: "Học nhanh", value: "10 phút/ngày" },
                  { label: "Phản hồi", value: "Trong 24h" },
                  { label: "Lộ trình", value: "Cá nhân hóa" },
                ].map((item) => (
                  <div key={item.label} className="rounded-xl bg-white px-3 py-2 text-center shadow-sm">
                    <p className="text-xs text-muted-foreground">{item.label}</p>
                    <p className="text-sm font-semibold text-[color:var(--brand-900)]">{item.value}</p>
                  </div>
                ))}
              </div>
              <p className="mt-3 text-center text-xs text-muted-foreground">
                Đăng nhập là bạn đã sẵn sàng bắt đầu bài học mới hôm nay.
              </p>
            </div>

            <div className="mt-auto text-center text-sm text-muted-foreground">
              Chưa có tài khoản?{" "}
              <Link className="text-primary font-medium hover:underline" href="/register">
                Tạo tài khoản
              </Link>
            </div>
            <div className="text-center text-xs text-muted-foreground">
              <Link className="hover:underline" href="/">
                Quay lại trang chủ
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
