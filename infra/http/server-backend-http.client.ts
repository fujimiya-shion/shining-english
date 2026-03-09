import "server-only";

import { callBackend } from "@/infra/server/backend-http";
import { getAccessTokenFromCookie } from "@/infra/server/auth-cookie";

import { HttpClient, HttpRequestConfig, QueryValue } from "./http-client";

function toSearchParams(query?: Record<string, QueryValue>): URLSearchParams | undefined {
  if (!query) {
    return undefined;
  }

  const searchParams = new URLSearchParams();
  for (const [key, value] of Object.entries(query)) {
    if (value !== undefined && value !== null) {
      searchParams.set(key, String(value));
    }
  }

  return searchParams;
}

export class ServerBackendHttpClient implements HttpClient {
  async request<TResponse = unknown, TBody = unknown>(
    config: HttpRequestConfig<TBody>,
  ): Promise<TResponse> {
    const accessToken = await getAccessTokenFromCookie();

    const response = await callBackend({
      method: config.method ?? "GET",
      path: config.url,
      query: toSearchParams(config.query),
      headers: config.headers,
      body: config.body,
      accessToken,
    });

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
