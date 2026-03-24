"use client";

import { FormEvent, useEffect } from "react";
import Link from "next/link";
import { AppButton } from "@/shared/components/ui/app-button";
import { Input } from "@/shared/components/ui/input";
import { AppStatus } from "@/shared/enums/app-status";
import { useRegisterStore } from "@/app/register/stores/register.store";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";

export function RegisterPageClient() {
  const {
    status,
    name,
    email,
    phone,
    password,
    passwordConfirmation,
    acceptTerms,
    message,
    errorMessage,
    localError,
    setName,
    setEmail,
    setPhone,
    setPassword,
    setPasswordConfirmation,
    setAcceptTerms,
    clearFeedback,
    reset,
    register,
  } = useRegisterStore();

  useEffect(() => {
    clearFeedback();
    reset();
  }, [clearFeedback, reset]);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await register();
  };

  const isSubmitting = status === AppStatus.loading;

  return (
    <main className="relative min-h-full overflow-hidden bg-[radial-gradient(1200px_circle_at_top_left,var(--sky-110)_0%,var(--sky-60)_50%,var(--white)_100%)] py-12 lg:py-16">
      <div className="pointer-events-none absolute -left-24 top-10 h-64 w-64 rounded-full bg-[color:var(--sky-300)]/30 blur-3xl"></div>
      <div className="pointer-events-none absolute right-0 top-32 h-72 w-72 rounded-full bg-primary/20 blur-[120px]"></div>
      <div className="pointer-events-none absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-[color:var(--brand-900)]/10 blur-[140px]"></div>
      <div className="relative mx-auto grid max-w-6xl items-stretch gap-10 px-4 lg:grid-cols-[0.95fr_1.05fr]">
        <Card className="mx-auto flex w-full max-w-lg flex-col border-border/70 bg-white/95 shadow-[0_24px_70px_-50px_rgba(15,43,82,0.35)]">
          <CardHeader className="space-y-2">
            <CardTitle className="text-3xl">Tạo tài khoản mới</CardTitle>
            <CardDescription>
              Đăng ký bằng email để bắt đầu lộ trình học được cá nhân hóa.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-1 flex-col space-y-6">
            <form className="space-y-4" onSubmit={onSubmit}>
              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="register-name">
                  Họ và tên
                </label>
                <Input
                  id="register-name"
                  type="text"
                  placeholder="Nguyễn Minh Anh"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="register-email">
                  Email
                </label>
                <Input
                  id="register-email"
                  type="email"
                  placeholder="you@email.com"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="register-phone">
                  Số điện thoại
                </label>
                <Input
                  id="register-phone"
                  type="tel"
                  placeholder="0900000000"
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="register-password">
                  Mật khẩu
                </label>
                <Input
                  id="register-password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="register-confirm">
                  Xác nhận mật khẩu
                </label>
                <Input
                  id="register-confirm"
                  type="password"
                  placeholder="••••••••"
                  value={passwordConfirmation}
                  onChange={(event) => setPasswordConfirmation(event.target.value)}
                  required
                />
              </div>
              <label className="flex items-start gap-2 text-sm text-muted-foreground">
                <input
                  type="checkbox"
                  className="mt-1 h-4 w-4 rounded border-border"
                  checked={acceptTerms}
                  onChange={(event) => setAcceptTerms(event.target.checked)}
                />
                Tôi đồng ý với{" "}
                <Link href="/terms" className="text-primary hover:underline">
                  điều khoản sử dụng
                </Link>{" "}
                và{" "}
                <Link href="/privacy" className="text-primary hover:underline">
                  chính sách bảo mật
                </Link>
                .
              </label>
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
              <AppButton className="h-11 w-full rounded-full" type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Đang tạo tài khoản..." : "Tạo tài khoản"}
              </AppButton>
            </form>

            <div className="rounded-2xl border border-border/70 bg-[color:var(--sky-70)] p-4">
              <div className="grid gap-3 sm:grid-cols-3">
                {[
                  { label: "Bắt đầu", value: "3 phút" },
                  { label: "Lộ trình", value: "Cá nhân hóa" },
                  { label: "Hỗ trợ", value: "24/7" },
                ].map((item) => (
                  <div key={item.label} className="rounded-xl bg-white px-3 py-2 text-center shadow-sm">
                    <p className="text-xs text-muted-foreground">{item.label}</p>
                    <p className="text-sm font-semibold text-[color:var(--brand-900)]">{item.value}</p>
                  </div>
                ))}
              </div>
              <p className="mt-3 text-center text-xs text-muted-foreground">
                Hoàn tất đăng ký để nhận bài học đầu tiên ngay hôm nay.
              </p>
            </div>

            <div className="mt-auto text-center text-sm text-muted-foreground">
              Đã có tài khoản?{" "}
              <Link className="text-primary font-medium hover:underline" href="/login">
                Đăng nhập
              </Link>
            </div>
            <div className="text-center text-xs text-muted-foreground">
              <Link className="hover:underline" href="/">
                Quay lại trang chủ
              </Link>
            </div>
          </CardContent>
        </Card>

        <div className="hidden lg:flex">
          <div className="relative flex w-full flex-col overflow-hidden rounded-3xl border border-border bg-[color:var(--brand-900)] px-8 py-10 text-white shadow-[0_30px_80px_-50px_rgba(15,43,82,0.9)]">
            <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-primary/20 blur-2xl"></div>
            <div className="absolute -bottom-16 -left-8 h-40 w-40 rounded-full bg-[color:var(--sky-300)]/20 blur-3xl"></div>
            <p className="text-xs uppercase tracking-[0.35em] text-white/70">Lộ trình cá nhân hóa</p>
            <h2 className="mt-4 text-4xl font-semibold leading-tight">
              Học đúng nhu cầu, tiến bộ đều mỗi tuần.
            </h2>
            <p className="mt-4 text-white/70">
              Theo dõi điểm số, cập nhật bài học mới và nhận phản hồi nhanh ngay trong tài khoản của bạn.
            </p>
            <div className="mt-8 grid gap-4">
              {[
                "Bài học ngắn gọn, dễ áp dụng",
                "Nhắc nhở lịch học linh hoạt",
                "Có phản hồi trực tiếp",
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
                <span>Học viên đã đăng ký</span>
                <span className="text-sm font-semibold text-white">8K+</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Khóa học mới mỗi tuần</span>
                <span className="text-sm font-semibold text-white">5+</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
