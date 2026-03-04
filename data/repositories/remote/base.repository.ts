import { ApiException } from "@/data/types/api-exception";
import { ApiResult } from "@/data/types/api-result";
import { ObjectResponse } from "@/data/dtos/common/object-response";
import { HttpClient, QueryValue } from "@/infra/http/http-client";

type MapResponse<TResponse> = (data: unknown) => TResponse;

type RequestOptions<TResponse, TBody = unknown> = {
  url: string;
  query?: Record<string, QueryValue>;
  headers?: Record<string, string>;
  body?: TBody;
  map?: MapResponse<TResponse>;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return !!value && typeof value === "object" && !Array.isArray(value);
}

function normalizeRaw(raw: unknown): unknown {
  if (typeof raw !== "string") {
    return raw;
  }

  const trimmed = raw.trim();
  if (!trimmed) {
    return raw;
  }

  if (trimmed.startsWith("{") || trimmed.startsWith("[")) {
    try {
      return JSON.parse(trimmed);
    } catch {
      return raw;
    }
  }

  return raw;
}

export abstract class BaseRepository {
  constructor(protected readonly httpClient: HttpClient) { }

  protected async get<TResponse extends ObjectResponse<unknown>>(
    options: RequestOptions<TResponse>,
  ): Promise<ApiResult<TResponse, ApiException>> {
    try {
      const raw = await this.httpClient.request<unknown>({
        url: options.url,
        method: "GET",
        query: options.query,
        headers: options.headers,
      });

      const normalizedRaw = normalizeRaw(raw);

      if (isRecord(normalizedRaw) && normalizedRaw.status === false) {
        return new ApiResult<TResponse, ApiException>(
          undefined,
          ApiException.fromJson(normalizedRaw),
        );
      }

      try {
        const response = options.map
          ? options.map(normalizedRaw)
          : (normalizedRaw as TResponse);
        return new ApiResult<TResponse, ApiException>(response);
      } catch (error) {
        return new ApiResult<TResponse, ApiException>(undefined, ApiException.fromUnknown(error));
      }
    } catch (error) {
      return new ApiResult<TResponse, ApiException>(undefined, ApiException.fromUnknown(error));
    }
  }

  protected async post<TResponse extends ObjectResponse<unknown>, TBody = unknown>(
    options: RequestOptions<TResponse, TBody>,
  ): Promise<ApiResult<TResponse, ApiException>> {
    try {
      const raw = await this.httpClient.request<unknown, TBody>({
        url: options.url,
        method: "POST",
        body: options.body,
        headers: options.headers,
      });

      const normalizedRaw = normalizeRaw(raw);

      if (isRecord(normalizedRaw) && normalizedRaw.status === false) {
        return new ApiResult<TResponse, ApiException>(
          undefined,
          ApiException.fromJson(normalizedRaw),
        );
      }

      try {
        const response = options.map
          ? options.map(normalizedRaw)
          : (normalizedRaw as TResponse);
        return new ApiResult<TResponse, ApiException>(response);
      } catch (error) {
        return new ApiResult<TResponse, ApiException>(undefined, ApiException.fromUnknown(error));
      }
    } catch (error) {
      return new ApiResult<TResponse, ApiException>(undefined, ApiException.fromUnknown(error));
    }
  }

  protected async put<TResponse extends ObjectResponse<unknown>, TBody = unknown>(
    options: RequestOptions<TResponse, TBody>,
  ): Promise<ApiResult<TResponse, ApiException>> {
    try {
      const raw = await this.httpClient.request<unknown, TBody>({
        url: options.url,
        method: "PUT",
        body: options.body,
        headers: options.headers,
      });

      const normalizedRaw = normalizeRaw(raw);

      if (isRecord(normalizedRaw) && normalizedRaw.status === false) {
        return new ApiResult<TResponse, ApiException>(
          undefined,
          ApiException.fromJson(normalizedRaw),
        );
      }

      try {
        const response = options.map
          ? options.map(normalizedRaw)
          : (normalizedRaw as TResponse);
        return new ApiResult<TResponse, ApiException>(response);
      } catch (error) {
        return new ApiResult<TResponse, ApiException>(undefined, ApiException.fromUnknown(error));
      }
    } catch (error) {
      return new ApiResult<TResponse, ApiException>(undefined, ApiException.fromUnknown(error));
    }
  }

  protected async patch<TResponse extends ObjectResponse<unknown>, TBody = unknown>(
    options: RequestOptions<TResponse, TBody>,
  ): Promise<ApiResult<TResponse, ApiException>> {
    try {
      const raw = await this.httpClient.request<unknown, TBody>({
        url: options.url,
        method: "PATCH",
        body: options.body,
        headers: options.headers,
      });

      const normalizedRaw = normalizeRaw(raw);

      if (isRecord(normalizedRaw) && normalizedRaw.status === false) {
        return new ApiResult<TResponse, ApiException>(
          undefined,
          ApiException.fromJson(normalizedRaw),
        );
      }

      try {
        const response = options.map
          ? options.map(normalizedRaw)
          : (normalizedRaw as TResponse);
        return new ApiResult<TResponse, ApiException>(response);
      } catch (error) {
        return new ApiResult<TResponse, ApiException>(undefined, ApiException.fromUnknown(error));
      }
    } catch (error) {
      return new ApiResult<TResponse, ApiException>(undefined, ApiException.fromUnknown(error));
    }
  }

  protected async delete<TResponse extends ObjectResponse<unknown>>(
    options: RequestOptions<TResponse>,
  ): Promise<ApiResult<TResponse, ApiException>> {
    try {
      const raw = await this.httpClient.request<unknown>({
        url: options.url,
        method: "DELETE",
        headers: options.headers,
      });

      const normalizedRaw = normalizeRaw(raw);

      if (isRecord(normalizedRaw) && normalizedRaw.status === false) {
        return new ApiResult<TResponse, ApiException>(
          undefined,
          ApiException.fromJson(normalizedRaw),
        );
      }

      try {
        const response = options.map
          ? options.map(normalizedRaw)
          : (normalizedRaw as TResponse);
        return new ApiResult<TResponse, ApiException>(response);
      } catch (error) {
        return new ApiResult<TResponse, ApiException>(undefined, ApiException.fromUnknown(error));
      }
    } catch (error) {
      return new ApiResult<TResponse, ApiException>(undefined, ApiException.fromUnknown(error));
    }
  }
}
