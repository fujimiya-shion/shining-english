"use client";

import { PropsWithChildren, ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AppStatus } from "@/shared/enums/app-status";
import { useAuthStore } from "@/shared/stores/auth.store";

type ClientAuthGuardProps = PropsWithChildren<{
  redirectTo: string;
  fallback?: ReactNode;
}>;

function AuthGuardFallback() {
  return (
    <div className="flex min-h-[40vh] items-center justify-center px-4 text-sm text-muted-foreground">
      Đang đồng bộ trạng thái tài khoản...
    </div>
  );
}

function AuthRedirectFallback() {
  return (
    <div className="flex min-h-[40vh] items-center justify-center px-4 text-sm text-muted-foreground">
      Đang chuyển hướng...
    </div>
  );
}

export function GuestOnlyGuard({
  children,
  redirectTo,
  fallback,
}: ClientAuthGuardProps) {
  const router = useRouter();
  const status = useAuthStore((state) => state.status);
  const authenticated = useAuthStore((state) => state.authenticated);
  const fetchMe = useAuthStore((state) => state.fetchMe);

  useEffect(() => {
    if (status === AppStatus.initial) {
      void fetchMe();
    }
  }, [fetchMe, status]);

  useEffect(() => {
    if (authenticated) {
      router.replace(redirectTo);
    }
  }, [authenticated, redirectTo, router]);

  if (status === AppStatus.initial || status === AppStatus.loading) {
    return fallback ?? <AuthGuardFallback />;
  }

  if (authenticated) {
    return fallback ?? <AuthRedirectFallback />;
  }

  return <>{children}</>;
}

export function AuthRequiredGuard({
  children,
  redirectTo,
  fallback,
}: ClientAuthGuardProps) {
  const router = useRouter();
  const status = useAuthStore((state) => state.status);
  const authenticated = useAuthStore((state) => state.authenticated);
  const fetchMe = useAuthStore((state) => state.fetchMe);

  useEffect(() => {
    if (status === AppStatus.initial) {
      void fetchMe();
    }
  }, [fetchMe, status]);

  useEffect(() => {
    if (
      !authenticated &&
      status !== AppStatus.initial &&
      status !== AppStatus.loading
    ) {
      router.replace(redirectTo);
    }
  }, [authenticated, redirectTo, router, status]);

  if (status === AppStatus.initial || status === AppStatus.loading) {
    return fallback ?? <AuthGuardFallback />;
  }

  if (!authenticated) {
    return fallback ?? <AuthRedirectFallback />;
  }

  return <>{children}</>;
}
