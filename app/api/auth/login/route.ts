import { NextRequest, NextResponse } from "next/server";
import { callBackend, responseToJson } from "@/infra/server/backend-http";
import { setAuthCookies } from "@/infra/server/auth-cookie";

type LoginResponseShape = {
  access_token?: string;
  token?: string;
  refresh_token?: string;
  expires_in?: number;
  refresh_expires_in?: number;
  data?: {
    access_token?: string;
    token?: string;
    refresh_token?: string;
    expires_in?: number;
    refresh_expires_in?: number;
    [key: string]: unknown;
  };
  [key: string]: unknown;
};

function pickTokenPayload(payload: LoginResponseShape): {
  accessToken: string | null;
  refreshToken?: string;
  accessTokenExpiresIn?: number;
  refreshTokenExpiresIn?: number;
} {
  const data = payload.data ?? {};

  const accessToken =
    payload.access_token ?? payload.token ?? data.access_token ?? data.token ?? null;

  return {
    accessToken,
    refreshToken: payload.refresh_token ?? data.refresh_token,
    accessTokenExpiresIn: payload.expires_in ?? data.expires_in,
    refreshTokenExpiresIn: payload.refresh_expires_in ?? data.refresh_expires_in,
  };
}

function normalizeLoginPayload(
  body: unknown,
  request: NextRequest,
): Record<string, unknown> {
  const payload: Record<string, unknown> =
    body && typeof body === "object" && !Array.isArray(body)
      ? { ...(body as Record<string, unknown>) }
      : {};

  if (!payload.device_identifier || typeof payload.device_identifier !== "string") {
    payload.device_identifier = `web-${crypto.randomUUID()}`;
  }

  if (!payload.device_name) {
    payload.device_name = "Web Browser";
  }

  if (!payload.platform) {
    payload.platform = request.headers.get("sec-ch-ua-platform") ?? "web";
  }

  if (!payload.user_agent) {
    payload.user_agent = request.headers.get("user-agent") ?? undefined;
  }

  if (!payload.ip_address) {
    const forwarded = request.headers.get("x-forwarded-for");
    payload.ip_address = forwarded ? forwarded.split(",")[0]?.trim() : undefined;
  }

  return payload;
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ message: "Invalid JSON body" }, { status: 400 });
  }

  const loginPath = process.env.BACKEND_AUTH_LOGIN_PATH ?? "/auth/login";
  const normalizedBody = normalizeLoginPayload(body, request);

  let backendResponse: Response;
  try {
    backendResponse = await callBackend({
      method: "POST",
      path: loginPath,
      body: normalizedBody,
    });
  } catch {
    return NextResponse.json(
      { message: "Unable to reach backend service" },
      { status: 502 },
    );
  }

  const backendJson = (await responseToJson(backendResponse)) as LoginResponseShape | null;

  if (!backendResponse.ok) {
    return NextResponse.json(
      backendJson ?? { message: "Login failed" },
      { status: backendResponse.status },
    );
  }

  if (!backendJson) {
    return NextResponse.json({ message: "Unexpected login response" }, { status: 502 });
  }

  const tokenPayload = pickTokenPayload(backendJson);
  if (!tokenPayload.accessToken) {
    return NextResponse.json(
      { message: "Backend response does not include access token" },
      { status: 502 },
    );
  }

  await setAuthCookies({
    accessToken: tokenPayload.accessToken,
    refreshToken: tokenPayload.refreshToken,
    accessTokenExpiresIn: tokenPayload.accessTokenExpiresIn,
    refreshTokenExpiresIn: tokenPayload.refreshTokenExpiresIn,
  });

  return NextResponse.json({
    message: "Login successful",
    data: backendJson.data ?? null,
  });
}
