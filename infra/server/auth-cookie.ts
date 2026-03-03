import { cookies } from "next/headers";

const ACCESS_TOKEN_COOKIE = "se_access_token";
const REFRESH_TOKEN_COOKIE = "se_refresh_token";

const isProduction = process.env.NODE_ENV === "production";

function resolveCookieDomain(): string | undefined {
  return process.env.AUTH_COOKIE_DOMAIN || undefined;
}

function resolveAccessTokenMaxAge(expiresInSeconds?: number): number {
  if (typeof expiresInSeconds === "number" && expiresInSeconds > 0) {
    return expiresInSeconds;
  }

  return Number(process.env.AUTH_ACCESS_TOKEN_MAX_AGE ?? 60 * 15);
}

function resolveRefreshTokenMaxAge(expiresInSeconds?: number): number {
  if (typeof expiresInSeconds === "number" && expiresInSeconds > 0) {
    return expiresInSeconds;
  }

  return Number(process.env.AUTH_REFRESH_TOKEN_MAX_AGE ?? 60 * 60 * 24 * 14);
}

export type TokenPayload = {
  accessToken: string;
  refreshToken?: string;
  accessTokenExpiresIn?: number;
  refreshTokenExpiresIn?: number;
};

export async function setAuthCookies(payload: TokenPayload): Promise<void> {
  const cookieStore = await cookies();
  const domain = resolveCookieDomain();

  cookieStore.set(ACCESS_TOKEN_COOKIE, payload.accessToken, {
    httpOnly: true,
    secure: isProduction,
    sameSite: "lax",
    path: "/",
    domain,
    maxAge: resolveAccessTokenMaxAge(payload.accessTokenExpiresIn),
  });

  if (payload.refreshToken) {
    cookieStore.set(REFRESH_TOKEN_COOKIE, payload.refreshToken, {
      httpOnly: true,
      secure: isProduction,
      sameSite: "lax",
      path: "/",
      domain,
      maxAge: resolveRefreshTokenMaxAge(payload.refreshTokenExpiresIn),
    });
  }
}

export async function clearAuthCookies(): Promise<void> {
  const cookieStore = await cookies();
  const domain = resolveCookieDomain();

  cookieStore.set(ACCESS_TOKEN_COOKIE, "", {
    httpOnly: true,
    secure: isProduction,
    sameSite: "lax",
    path: "/",
    domain,
    maxAge: 0,
  });

  cookieStore.set(REFRESH_TOKEN_COOKIE, "", {
    httpOnly: true,
    secure: isProduction,
    sameSite: "lax",
    path: "/",
    domain,
    maxAge: 0,
  });
}

export async function getAccessTokenFromCookie(): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get(ACCESS_TOKEN_COOKIE)?.value ?? null;
}

export async function getRefreshTokenFromCookie(): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get(REFRESH_TOKEN_COOKIE)?.value ?? null;
}
