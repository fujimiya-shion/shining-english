import { NextResponse } from "next/server";
import { callBackend, responseToJson } from "@/infra/server/backend-http";
import { getAccessTokenFromCookie } from "@/infra/server/auth-cookie";

export async function GET(): Promise<NextResponse> {
  const accessToken = await getAccessTokenFromCookie();

  if (!accessToken) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const mePath = process.env.BACKEND_AUTH_ME_PATH ?? "/auth/me";
  let backendResponse: Response;
  try {
    backendResponse = await callBackend({
      method: "GET",
      path: mePath,
      accessToken,
    });
  } catch {
    return NextResponse.json(
      { message: "Unable to reach backend service" },
      { status: 502 },
    );
  }

  const payload = await responseToJson(backendResponse);

  return NextResponse.json(payload, {
    status: backendResponse.status,
  });
}
