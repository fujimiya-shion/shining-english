import "server-only";

export function getUserAccessTokenCookieName(): string {
  const cookieName = process.env.USER_ACCESS_TOKEN_COOKIE_NAME;

  if (!cookieName) {
    throw new Error("Missing USER_ACCESS_TOKEN_COOKIE_NAME env");
  }

  return cookieName;
}

export function getUserAccessTokenCookieMaxAge(): number {
  const parsed = Number.parseInt(
    process.env.USER_ACCESS_TOKEN_COOKIE_TTL_SECONDS ?? `${60 * 60 * 24 * 30}`,
    10,
  );

  return Number.isFinite(parsed) && parsed > 0
    ? parsed
    : 60 * 60 * 24 * 30;
}
