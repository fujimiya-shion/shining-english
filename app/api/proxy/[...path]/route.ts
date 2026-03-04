import { NextRequest, NextResponse } from "next/server";
import { callBackend } from "@/infra/server/backend-http";
import { getAccessTokenFromCookie } from "@/infra/server/auth-cookie";

type RouteContext = {
  params?: Promise<{ path?: string[] }> | { path?: string[] };
};

function buildPath(pathSegments: string[]): string {
  return `/${pathSegments.join("/")}`;
}

async function parseBodyIfNeeded(request: NextRequest, method: string): Promise<unknown> {
  if (method === "GET" || method === "DELETE") {
    return undefined;
  }

  const contentType = request.headers.get("content-type") ?? "";

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

  const accessToken = await getAccessTokenFromCookie();
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

  let upstreamResponse: Response;
  try {
    upstreamResponse = await callBackend({
      method,
      path: buildPath(pathSegments),
      query,
      body,
      accessToken,
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
    return NextResponse.json(payload, { status: upstreamResponse.status });
  }

  const text = await upstreamResponse.text();
  return new NextResponse(text, {
    status: upstreamResponse.status,
    headers: {
      "content-type": contentType || "text/plain; charset=utf-8",
    },
  });
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
