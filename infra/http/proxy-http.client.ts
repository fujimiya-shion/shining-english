import { HttpClient, HttpRequestConfig } from "./http-client";

export interface ProxyHttpClientOptions {
  targetBaseUrl: string;
  defaultHeaders?: Record<string, string>;
}

export class ProxyHttpClient implements HttpClient {
  constructor(
    private readonly httpClient: HttpClient,
    private readonly options: ProxyHttpClientOptions,
  ) {}

  request<TResponse = unknown, TBody = unknown>(
    config: HttpRequestConfig<TBody>,
  ): Promise<TResponse> {
    const targetUrl = this.buildTargetUrl(config.url);

    return this.httpClient.request<TResponse, TBody>({
      ...config,
      url: targetUrl,
      headers: {
        ...this.options.defaultHeaders,
        ...config.headers,
      },
    });
  }

  private buildTargetUrl(path: string): string {
    const normalizedBaseUrl = this.options.targetBaseUrl.replace(/\/$/, "");
    const normalizedPath = path.startsWith("/") ? path : `/${path}`;

    return `${normalizedBaseUrl}${normalizedPath}`;
  }
}
