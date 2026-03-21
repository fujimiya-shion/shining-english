import { NextRequest, NextResponse } from "next/server";

import {
  createProxyGuardValue,
  getProxyGuardCookieMaxAge,
  PROXY_GUARD_COOKIE_NAME,
  verifyProxyGuardValue,
} from "@/infra/security/proxy-guard";

function applyProxyGuardCookie(response: NextResponse): void {
  response.cookies.set(PROXY_GUARD_COOKIE_NAME, createProxyGuardValue(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: getProxyGuardCookieMaxAge(),
  });
}

export function proxy(request: NextRequest): NextResponse {
  const proxyGuard = request.cookies.get(PROXY_GUARD_COOKIE_NAME)?.value;
  const verification = verifyProxyGuardValue(proxyGuard);

  if (verification.valid && !verification.shouldRefresh) {
    return NextResponse.next();
  }

  const response = NextResponse.next();
  if (verification.reason === "expired" || verification.reason === "invalid" || verification.shouldRefresh) {
    applyProxyGuardCookie(response);
  }
  return response;
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\..*).*)",
  ],
};
