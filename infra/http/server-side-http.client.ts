import "server-only";

import { headers } from "next/headers";
import {
  createProxyGuardValue,
  PROXY_GUARD_COOKIE_NAME,
} from "@/infra/security/proxy-guard";
import { HttpClient, HttpRequestConfig, QueryValue } from "./http-client";

function buildProxyUrl(
  origin: string,
  path: string,
  query?: Record<string, QueryValue>,
): string {
  const normalizedOrigin = origin.replace(/\/$/, "");
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const url = new URL(`${normalizedOrigin}/api/proxy${normalizedPath}`);

  if (query) {
    for (const [key, value] of Object.entries(query)) {
      if (value !== undefined && value !== null) {
        url.searchParams.set(key, String(value));
      }
    }
  }

  return url.toString();
}

function isFormData(body: unknown): body is FormData {
  return typeof FormData !== "undefined" && body instanceof FormData;
}

function buildBody(body: unknown): BodyInit | undefined {
  if (body === undefined || body === null) {
    return undefined;
  }

  if (isFormData(body)) {
    return body;
  }

  return JSON.stringify(body);
}

async function getAppOrigin(): Promise<string> {
  try {
    const headerStore = await headers();
    const host = headerStore.get("x-forwarded-host") ?? headerStore.get("host");
    const protocol =
      headerStore.get("x-forwarded-proto") ??
      (host?.includes("localhost") || host?.startsWith("127.0.0.1") ? "http" : "https");

    if (host) {
      return `${protocol}://${host}`;
    }
  } catch {
    // Ignore missing request context and fall back to env-based origin.
  }

  return process.env.NEXT_PUBLIC_APP_URL ?? process.env.APP_URL ?? "http://localhost:3000";
}

export class ServerSideHttpClient implements HttpClient {
  async request<TResponse = unknown, TBody = unknown>(
    config: HttpRequestConfig<TBody>,
  ): Promise<TResponse> {
    const headerStore = await headers();
    const rawBody = config.body as unknown;
    const requestHeaders: Record<string, string> = {
      ...config.headers,
    };

    if (!isFormData(rawBody)) {
      requestHeaders["Content-Type"] = requestHeaders["Content-Type"] ?? "application/json";
    }

    const incomingCookieHeader = headerStore.get("cookie");
    const proxyGuardCookie = `${PROXY_GUARD_COOKIE_NAME}=${createProxyGuardValue()}`;
    requestHeaders.Cookie = incomingCookieHeader
      ? `${incomingCookieHeader}; ${proxyGuardCookie}`
      : proxyGuardCookie;

    const response = await fetch(
      buildProxyUrl(await getAppOrigin(), config.url, config.query),
      {
        method: config.method ?? "GET",
        headers: requestHeaders,
        body: buildBody(rawBody),
        signal: config.signal,
        cache: "no-store",
      },
    );

    if (!response.ok) {
      const text = await response.text();
      throw new Error(
        `HTTP ${response.status} ${response.statusText}${text ? `: ${text}` : ""}`,
      );
    }

    if (response.status === 204) {
      return undefined as TResponse;
    }

    const contentType = response.headers.get("content-type") ?? "";
    if (contentType.includes("application/json")) {
      return (await response.json()) as TResponse;
    }

    return (await response.text()) as TResponse;
  }
}
