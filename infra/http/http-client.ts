export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export type QueryValue = string | number | boolean | null | undefined;

export interface HttpRequestConfig<TBody = unknown> {
  url: string;
  method?: HttpMethod;
  headers?: Record<string, string>;
  query?: Record<string, QueryValue>;
  body?: TBody;
  signal?: AbortSignal;
}

export interface HttpClient {
  request<TResponse = unknown, TBody = unknown>(
    config: HttpRequestConfig<TBody>,
  ): Promise<TResponse>;
}
