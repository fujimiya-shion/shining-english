import { HttpClient, HttpRequestConfig, QueryValue } from "./http-client";

function buildProxyUrl(path: string, query?: Record<string, QueryValue>): string {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const base = `/api/proxy${normalizedPath}`;

  if (!query) {
    return base;
  }

  const searchParams = new URLSearchParams();
  for (const [key, value] of Object.entries(query)) {
    if (value !== undefined && value !== null) {
      searchParams.set(key, String(value));
    }
  }

  const queryString = searchParams.toString();
  return queryString ? `${base}?${queryString}` : base;
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

export class ClientSideHttpClient implements HttpClient {
  async request<TResponse = unknown, TBody = unknown>(
    config: HttpRequestConfig<TBody>,
  ): Promise<TResponse> {
    const rawBody = config.body as unknown;
    const hasBody = rawBody !== undefined && rawBody !== null;
    const headers: Record<string, string> = {
      ...config.headers,
    };

    if (hasBody && !isFormData(rawBody)) {
      headers["Content-Type"] = headers["Content-Type"] ?? "application/json";
    }

    const response = await fetch(buildProxyUrl(config.url, config.query), {
      method: config.method ?? "GET",
      headers,
      body: buildBody(rawBody),
      signal: config.signal,
      credentials: "same-origin",
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
