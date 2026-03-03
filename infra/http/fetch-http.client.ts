import { HttpClient, HttpRequestConfig, QueryValue } from "./http-client";

export interface FetchHttpClientOptions {
  baseUrl: string;
  defaultHeaders?: Record<string, string>;
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

export class FetchHttpClient implements HttpClient {
  constructor(private readonly options: FetchHttpClientOptions) {}

  async request<TResponse = unknown, TBody = unknown>(
    config: HttpRequestConfig<TBody>,
  ): Promise<TResponse> {
    const url = this.buildUrl(config.url, config.query);
    const rawBody = config.body as unknown;
    const headers: Record<string, string> = {
      ...this.options.defaultHeaders,
      ...config.headers,
    };

    if (!isFormData(rawBody)) {
      headers["Content-Type"] = headers["Content-Type"] ?? "application/json";
    }

    const response = await fetch(url, {
      method: config.method ?? "GET",
      headers,
      body: buildBody(rawBody),
      signal: config.signal,
    });

    if (!response.ok) {
      const message = await response.text();
      throw new Error(
        `HTTP ${response.status} ${response.statusText}${
          message ? `: ${message}` : ""
        }`,
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

  private buildUrl(path: string, query?: Record<string, QueryValue>): string {
    const normalizedBaseUrl = this.options.baseUrl.replace(/\/$/, "");
    const normalizedPath = path.startsWith("/") ? path : `/${path}`;
    const hasAbsoluteBase = /^https?:\/\//.test(normalizedBaseUrl);

    if (hasAbsoluteBase) {
      const url = new URL(`${normalizedBaseUrl}${normalizedPath}`);

      if (query) {
        for (const [key, value] of Object.entries(query)) {
          if (value !== undefined && value !== null) {
            url.searchParams.set(key, String(value));
          }
        }
      }

      return url.toString();
    }

    const relativeUrl = `${normalizedBaseUrl}${normalizedPath}`;

    if (!query) {
      return relativeUrl;
    }

    const search = new URLSearchParams();
    for (const [key, value] of Object.entries(query)) {
      if (value !== undefined && value !== null) {
        search.set(key, String(value));
      }
    }

    const queryString = search.toString();
    return queryString ? `${relativeUrl}?${queryString}` : relativeUrl;
  }
}
