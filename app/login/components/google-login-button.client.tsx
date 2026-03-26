"use client";

import { useGoogleLogin } from "@react-oauth/google";
import { AppButton } from "@/shared/components/ui/app-button";

type GoogleLoginButtonProps = {
  disabled?: boolean;
  onBeforeAccessToken?: () => boolean;
  onAccessToken: (accessToken: string) => Promise<void> | void;
  onError: (message: string) => void;
};

export function GoogleLoginButton({
  disabled = false,
  onBeforeAccessToken = () => true,
  onAccessToken,
  onError,
}: GoogleLoginButtonProps) {
  const login = useGoogleLogin({
    scope: "openid email profile",
    onSuccess: async (tokenResponse) => {
      if (!tokenResponse.access_token) {
        onError("Google không trả về access token.");
        return;
      }

      await onAccessToken(tokenResponse.access_token);
    },
    onError: () => {
      onError("Đăng nhập với Google thất bại.");
    },
  });

  const onClick = () => {
    const canProcess = onBeforeAccessToken();
    if(canProcess) {
      login();
    }
  }

  return (
    <AppButton
      className="h-11 w-full rounded-full border-border/80 bg-white text-[color:var(--brand-900)] shadow-none hover:bg-[color:var(--sky-70)]"
      type="button"
      variant="outline"
      disabled={disabled}
      onClick={onClick}
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
      {disabled ? "Đang kết nối..." : "Tiếp tục với Google"}
    </AppButton>
  );
}
