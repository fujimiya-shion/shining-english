"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { AppButton } from "@/shared/components/ui/app-button";
import { useAuthStore } from "@/shared/stores/auth.store";
import { AppStatus } from "@/shared/enums/app-status";

type LogoutButtonProps = {
  className?: string;
  onLoggedOut?: () => void;
};

export function LogoutButton({ className, onLoggedOut }: LogoutButtonProps) {
  const router = useRouter();
  const status = useAuthStore((state) => state.status);
  const logout = useAuthStore((state) => state.logout);

  const isSubmitting = status === AppStatus.loading;

  const handleLogout = async () => {
    const success = await logout();

    if (!success) {
      return;
    }

    onLoggedOut?.();
    router.replace("/login");
  };

  return (
    <AppButton
      type="button"
      variant="outline"
      className={className}
      onClick={handleLogout}
      disabled={isSubmitting}
    >
      <LogOut className="h-4 w-4" aria-hidden="true" />
      {isSubmitting ? "Đang đăng xuất..." : "Đăng xuất"}
    </AppButton>
  );
}
