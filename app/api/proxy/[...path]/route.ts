import { NextRequest, NextResponse } from "next/server";
import { callBackend } from "@/infra/backend/http";
import { getBackendAccessToken } from "@/infra/backend/access-token";
import {
  getUserAccessTokenCookieName,
  getUserAccessTokenCookieMaxAge,
} from "@/infra/backend/user-access-token";
import {
  createProxyGuardValue,
  getProxyGuardCookieMaxAge,
  PROXY_GUARD_COOKIE_NAME,
  verifyProxyGuardValue,
} from "@/infra/security/proxy-guard";

type RouteContext = {
  params?: Promise<{ path?: string[] }> | { path?: string[] };
};

function applyProxyGuardCookie(response: NextResponse): void {
  response.cookies.set(PROXY_GUARD_COOKIE_NAME, createProxyGuardValue(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: getProxyGuardCookieMaxAge(),
  });
}

function getUserAccessTokenCookie(): string {
  return getUserAccessTokenCookieName();
}

function buildPassthroughHeaders(sourceHeaders: Headers): Headers {
  const headers = new Headers();

  for (const [key, value] of sourceHeaders.entries()) {
    const normalizedKey = key.toLowerCase();

    if (
      normalizedKey === "content-type" ||
      normalizedKey === "content-length" ||
      normalizedKey === "content-disposition" ||
      normalizedKey === "accept-ranges" ||
      normalizedKey === "content-range" ||
      normalizedKey === "cache-control" ||
      normalizedKey === "etag" ||
      normalizedKey === "last-modified"
    ) {
      headers.set(key, value);
    }
  }

  return headers;
}

function buildUpstreamHeaders(request: NextRequest): Record<string, string> {
  const headers: Record<string, string> = {};
  const range = request.headers.get("range");
  const ifRange = request.headers.get("if-range");

  if (range) {
    headers.Range = range;
  }

  if (ifRange) {
    headers["If-Range"] = ifRange;
  }

  return headers;
}

function getUserAccessToken(request: NextRequest): string | null {
  const headerToken = request.headers.get("User-Authorization");
  if (headerToken) {
    return headerToken;
  }

  return request.cookies.get(getUserAccessTokenCookie())?.value ?? null;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return !!value && typeof value === "object" && !Array.isArray(value);
}

function extractUserAccessTokenFromPayload(payload: unknown): string | null {
  if (!isRecord(payload)) {
    return null;
  }

  const data = payload.data;
  if (!isRecord(data)) {
    return null;
  }

  return typeof data.token === "string" && data.token.trim().length > 0
    ? data.token
    : null;
}

function shouldPersistUserAccessToken(path: string, payload: unknown): boolean {
  return (
    path === "/auth/login" ||
    path === "/auth/register" ||
    path === "/auth/third-party-login"
  )
    && extractUserAccessTokenFromPayload(payload) !== null;
}

function shouldClearUserAccessToken(path: string, status: number): boolean {
  return status === 401 || (path === "/auth/logout" && status >= 200 && status < 300);
}

function shouldRememberUserAccessToken(path: string, body: unknown): boolean {
  if (
    (path !== "/auth/login" && path !== "/auth/third-party-login") ||
    !isRecord(body)
  ) {
    return false;
  }

  return body.remember === true;
}

function sanitizeRequestBody(path: string, body: unknown): unknown {
  if (
    (path !== "/auth/login" && path !== "/auth/third-party-login") ||
    !isRecord(body)
  ) {
    return body;
  }

  const { remember: _remember, ...rest } = body;
  return rest;
}

function persistUserAccessToken(
  response: NextResponse,
  payload: unknown,
  rememberLogin: boolean,
): void {
  const token = extractUserAccessTokenFromPayload(payload);
  if (!token) {
    return;
  }

  const cookieOptions: Parameters<typeof response.cookies.set>[2] = {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
  };

  if (rememberLogin) {
    cookieOptions.maxAge = getUserAccessTokenCookieMaxAge();
  }

  response.cookies.set(getUserAccessTokenCookie(), token, cookieOptions);
}

function clearUserAccessToken(response: NextResponse): void {
  response.cookies.set(getUserAccessTokenCookie(), "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });
}

function buildPath(pathSegments: string[]): string {
  return `/${pathSegments.join("/")}`;
}

function shouldAttachAccessToken(pathSegments: string[]): boolean {
  return buildPath(pathSegments) !== "/access-token";
}

async function parseBodyIfNeeded(request: NextRequest, method: string): Promise<unknown> {
  if (method === "GET" || method === "DELETE") {
    return undefined;
  }

  const contentType = request.headers.get("content-type") ?? "";
  const contentLength = request.headers.get("content-length");
  const hasBody = contentLength !== "0";

  if (!hasBody) {
    return undefined;
  }

  if (contentType.includes("application/json")) {
    try {
      return await request.json();
    } catch {
      throw new Error("INVALID_JSON_BODY");
    }
  }

  if (
    contentType.includes("multipart/form-data") ||
    contentType.includes("application/x-www-form-urlencoded")
  ) {
    return request.formData();
  }

  return undefined;
}

async function handleRequest(
  request: NextRequest,
  context: RouteContext,
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
): Promise<NextResponse> {
  const resolvedParams = await Promise.resolve(context.params);
  const pathSegments = resolvedParams?.path ?? [];
  if (pathSegments.length === 0) {
    return NextResponse.json({ message: "Missing backend path" }, { status: 400 });
  }
  const path = buildPath(pathSegments);

  const verification = verifyProxyGuardValue(
    request.cookies.get(PROXY_GUARD_COOKIE_NAME)?.value,
  );

  if (!verification.valid && verification.reason !== "expired") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const accessToken = shouldAttachAccessToken(pathSegments)
    ? await getBackendAccessToken()
    : null;
  const userAccessToken = getUserAccessToken(request);
  const query = request.nextUrl.searchParams;
  let body: unknown;
  try {
    body = await parseBodyIfNeeded(request, method);
  } catch (error) {
    if (error instanceof Error && error.message === "INVALID_JSON_BODY") {
      return NextResponse.json({ message: "Invalid JSON body" }, { status: 400 });
    }

    throw error;
  }
  const sanitizedBody = sanitizeRequestBody(path, body);
  const rememberUserAccessToken = shouldRememberUserAccessToken(path, body);

  let upstreamResponse: Response;
  try {
    upstreamResponse = await callBackend({
      method,
      path,
      query,
      headers: buildUpstreamHeaders(request),
      body: sanitizedBody,
      accessToken,
      userAccessToken,
    });
  } catch {
    return NextResponse.json(
      { message: "Unable to reach backend service" },
      { status: 502 },
    );
  }

  const contentType = upstreamResponse.headers.get("content-type") ?? "";

  if (contentType.includes("application/json")) {
    const payload = await upstreamResponse.json();
    const response = NextResponse.json(payload, { status: upstreamResponse.status });

    if (shouldPersistUserAccessToken(path, payload)) {
      persistUserAccessToken(response, payload, rememberUserAccessToken);
    }

    if (shouldClearUserAccessToken(path, upstreamResponse.status)) {
      clearUserAccessToken(response);
    }

    if (verification.shouldRefresh || verification.reason === "expired") {
      applyProxyGuardCookie(response);
    }

    return response;
  }

  const response = new NextResponse(upstreamResponse.body, {
    status: upstreamResponse.status,
    headers: buildPassthroughHeaders(upstreamResponse.headers),
  });

  if (shouldClearUserAccessToken(path, upstreamResponse.status)) {
    clearUserAccessToken(response);
  }

  if (verification.shouldRefresh || verification.reason === "expired") {
    applyProxyGuardCookie(response);
  }

  return response;
}

export async function GET(request: NextRequest, context: RouteContext): Promise<NextResponse> {
  return handleRequest(request, context, "GET");
}

export async function POST(request: NextRequest, context: RouteContext): Promise<NextResponse> {
  return handleRequest(request, context, "POST");
}

export async function PUT(request: NextRequest, context: RouteContext): Promise<NextResponse> {
  return handleRequest(request, context, "PUT");
}

export async function PATCH(request: NextRequest, context: RouteContext): Promise<NextResponse> {
  return handleRequest(request, context, "PATCH");
}

export async function DELETE(request: NextRequest, context: RouteContext): Promise<NextResponse> {
  return handleRequest(request, context, "DELETE");
}
