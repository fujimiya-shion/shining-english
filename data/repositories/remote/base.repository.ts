import { HttpClient, QueryValue } from "@/infra/http/http-client";

export abstract class BaseRepository {
  constructor(protected readonly httpClient: HttpClient) {}

  protected async get<TResponse>(
    url: string,
    query?: Record<string, QueryValue>,
    headers?: Record<string, string>,
  ): Promise<TResponse> {
    return this.httpClient.request<TResponse>({
      url,
      method: "GET",
      query,
      headers,
    });
  }

  protected async post<TResponse, TBody = unknown>(
    url: string,
    body?: TBody,
    headers?: Record<string, string>,
  ): Promise<TResponse> {
    return this.httpClient.request<TResponse, TBody>({
      url,
      method: "POST",
      body,
      headers,
    });
  }

  protected async put<TResponse, TBody = unknown>(
    url: string,
    body?: TBody,
    headers?: Record<string, string>,
  ): Promise<TResponse> {
    return this.httpClient.request<TResponse, TBody>({
      url,
      method: "PUT",
      body,
      headers,
    });
  }

  protected async patch<TResponse, TBody = unknown>(
    url: string,
    body?: TBody,
    headers?: Record<string, string>,
  ): Promise<TResponse> {
    return this.httpClient.request<TResponse, TBody>({
      url,
      method: "PATCH",
      body,
      headers,
    });
  }

  protected async delete<TResponse>(
    url: string,
    headers?: Record<string, string>,
  ): Promise<TResponse> {
    return this.httpClient.request<TResponse>({
      url,
      method: "DELETE",
      headers,
    });
  }
}
