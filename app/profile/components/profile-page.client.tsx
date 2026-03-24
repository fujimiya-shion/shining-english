"use client";

import Link from "next/link";
import { AuthRequiredGuard } from "@/shared/components/auth/client-auth-guard";
import { LogoutButton } from "@/shared/components/auth/logout-button";
import { AppButton } from "@/shared/components/ui/app-button";
import { Button } from "@/shared/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { useAuthStore } from "@/shared/stores/auth.store";

export function ProfilePageClient() {
  const user = useAuthStore((state) => state.currentUser);

  return (
    <AuthRequiredGuard redirectTo="/login">
      <ProfilePageContent
        name={user?.name}
        nickname={user?.nickname}
        email={user?.email}
        phone={user?.phone}
        createdAt={user?.createdAt}
        emailVerifiedAt={user?.emailVerifiedAt ?? user?.email_verified_at}
      />
    </AuthRequiredGuard>
  );
}

type ProfilePageContentProps = {
  name?: string | null;
  nickname?: string | null;
  email?: string | null;
  phone?: string | null;
  createdAt?: Date | null;
  emailVerifiedAt?: Date | string | null;
};

function ProfilePageContent({
  name,
  nickname,
  email,
  phone,
  createdAt,
  emailVerifiedAt,
}: ProfilePageContentProps) {
  const displayName = name?.trim() || nickname?.trim() || "Học viên";
  const initials =
    displayName
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase() ?? "")
      .join("") || "HV";
  const joinedAt =
    createdAt instanceof Date && !Number.isNaN(createdAt.getTime())
      ? new Intl.DateTimeFormat("vi-VN", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        }).format(createdAt)
      : null;
  const hasVerifiedEmail = Boolean(emailVerifiedAt);
  const profileFields = [
    { label: "Họ và tên", value: name ?? "Chưa cập nhật" },
    { label: "Biệt danh", value: nickname ?? "Chưa cập nhật" },
    { label: "Email", value: email ?? "Chưa cập nhật" },
    { label: "Số điện thoại", value: phone ?? "Chưa cập nhật" },
    { label: "Ngày tham gia", value: joinedAt ?? "Chưa xác định" },
    {
      label: "Trạng thái email",
      value: hasVerifiedEmail ? "Đã xác thực" : "Chưa xác thực",
    },
  ];

  return (
    <main className="min-h-full bg-[radial-gradient(1200px_circle_at_top_left,var(--sky-110)_0%,var(--sky-60)_50%,var(--white)_100%)] py-12">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <Card className="border-border/70 bg-[color:var(--brand-900)] text-white shadow-[0_24px_70px_-50px_rgba(15,43,82,0.55)]">
            <CardContent className="flex h-full flex-col gap-6 p-8">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.35em] text-white/60">
                    Account
                  </p>
                  <h1 className="mt-4 text-4xl font-semibold leading-tight">
                    {displayName}
                  </h1>
                  <p className="mt-3 text-sm text-white/70">
                    Đây là thông tin tài khoản hiện được đồng bộ từ backend qua proxy.
                  </p>
                </div>
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/10 text-xl font-semibold">
                  {initials}
                </div>
              </div>

              <div className="grid gap-3">
                <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                  <p className="text-xs text-white/60">Email</p>
                  <p className="mt-1 text-sm font-medium">{email ?? "Chưa cập nhật"}</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                  <p className="text-xs text-white/60">Số điện thoại</p>
                  <p className="mt-1 text-sm font-medium">{phone ?? "Chưa cập nhật"}</p>
                </div>
              </div>

              <div className="mt-auto flex flex-wrap gap-3">
                <AppButton asChild className="h-11 rounded-full">
                  <Link href="/settings">Chỉnh sửa hồ sơ</Link>
                </AppButton>
                <Button
                  asChild
                  variant="outline"
                  className="h-11 rounded-full border-sky-300/30 bg-sky-300/10 text-sky-50 hover:bg-sky-300/18 hover:text-white"
                >
                  <Link href="/dashboard">Quay về dashboard</Link>
                </Button>
                <LogoutButton className="h-11 rounded-full border-rose-300/30 bg-rose-300/10 text-rose-50 hover:bg-rose-300/18 hover:text-white" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/70 bg-white/95 shadow-[0_24px_70px_-50px_rgba(15,43,82,0.35)]">
            <CardHeader className="space-y-2">
              <CardTitle className="text-3xl">Thông tin tài khoản</CardTitle>
              <CardDescription>
                Tổng quan hồ sơ học viên và trạng thái tài khoản hiện tại.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-3 sm:grid-cols-2">
                {profileFields.map((field) => (
                  <div
                    key={field.label}
                    className="rounded-2xl border border-border/70 bg-[color:var(--sky-70)] px-4 py-3"
                  >
                    <p className="text-xs text-muted-foreground">{field.label}</p>
                    <p className="mt-1 text-sm font-semibold text-[color:var(--brand-900)]">
                      {field.value}
                    </p>
                  </div>
                ))}
              </div>

              <div className="rounded-2xl border border-border/70 bg-white p-5 shadow-sm">
                <p className="text-sm font-semibold text-[color:var(--brand-900)]">
                  Gợi ý tiếp theo
                </p>
                <div className="mt-4 grid gap-3">
                  <div className="flex items-center justify-between rounded-xl bg-[color:var(--sky-70)] px-4 py-3">
                    <span className="text-sm text-muted-foreground">
                      Hoàn thiện thông tin hồ sơ
                    </span>
                    <span className="text-sm font-semibold text-emerald-600">
                      {phone ? "Đã có" : "Cần cập nhật"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between rounded-xl bg-[color:var(--sky-70)] px-4 py-3">
                    <span className="text-sm text-muted-foreground">Xác thực email</span>
                    <span className="text-sm font-semibold text-emerald-600">
                      {hasVerifiedEmail ? "Hoàn tất" : "Chưa hoàn tất"}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
