import { NextResponse } from "next/server";
import { callBackend } from "@/infra/server/backend-http";
import { clearAuthCookies, getAccessTokenFromCookie } from "@/infra/server/auth-cookie";

export async function POST(): Promise<NextResponse> {
  const accessToken = await getAccessTokenFromCookie();
  const logoutPath = process.env.BACKEND_AUTH_LOGOUT_PATH ?? "/auth/logout";

  if (accessToken) {
    await callBackend({
      method: "POST",
      path: logoutPath,
      accessToken,
    }).catch(() => {
      // Clear local cookies even if backend logout fails.
    });
  }

  await clearAuthCookies();

  return NextResponse.json({ message: "Logout successful" });
}
