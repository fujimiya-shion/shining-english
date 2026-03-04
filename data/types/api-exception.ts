type ApiExceptionParams = {
  message: string;
  status?: boolean;
  errors?: Record<string, unknown> | null;
  httpStatus?: number | null;
};

type ApiErrorBody = Record<string, unknown> & {
  status?: unknown;
  message?: unknown;
  errors?: unknown;
  status_code?: unknown;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return !!value && typeof value === "object" && !Array.isArray(value);
}

function asBoolean(value: unknown): boolean | undefined {
  return typeof value === "boolean" ? value : undefined;
}

function asString(value: unknown): string | undefined {
  return typeof value === "string" ? value : undefined;
}

function asNumber(value: unknown): number | undefined {
  return typeof value === "number" && Number.isFinite(value) ? value : undefined;
}

export class ApiException extends Error {
  readonly status?: boolean;
  readonly errors?: Record<string, unknown> | null;
  readonly httpStatus?: number | null;

  constructor({ message, status, errors, httpStatus }: ApiExceptionParams) {
    super(message);
    this.name = "ApiException";
    this.status = status;
    this.errors = errors ?? null;
    this.httpStatus = httpStatus ?? null;
  }

  static fromJson(json: Record<string, unknown>): ApiException {
    const body = json as ApiErrorBody;

    const status = asBoolean(body.status);
    const message = asString(body.message) ?? ApiException.fallbackMessageByHttp(
      asNumber(body.status_code),
    );

    const errors = isRecord(body.errors)
      ? (body.errors as Record<string, unknown>)
      : null;

    return new ApiException({
      status,
      message,
      errors,
      httpStatus: asNumber(body.status_code) ?? null,
    });
  }

  static fromUnknown(error: unknown): ApiException {
    if (error instanceof ApiException) {
      return error;
    }

    if (isRecord(error)) {
      if ("message" in error || "status" in error || "errors" in error) {
        return ApiException.fromJson(error);
      }
    }

    if (error instanceof Error) {
      const httpStatus = ApiException.extractHttpStatus(error.message);
      const body = ApiException.tryParseBody(error.message);

      if (body) {
        return new ApiException({
          status: asBoolean(body.status),
          message: ApiException.resolveMessage(body, httpStatus),
          errors: isRecord(body.errors)
            ? (body.errors as Record<string, unknown>)
            : null,
          httpStatus,
        });
      }

      return new ApiException({
        status: false,
        message: httpStatus
          ? ApiException.fallbackMessageByHttp(httpStatus)
          : error.message,
        errors: null,
        httpStatus,
      });
    }

    return new ApiException({
      status: false,
      message: "Đã xảy ra lỗi, vui lòng thử lại sau!",
      errors: null,
      httpStatus: null,
    });
  }

  private static resolveMessage(
    body: ApiErrorBody,
    httpStatus?: number,
  ): string {
    const rawMessage = asString(body.message);
    if (rawMessage && rawMessage.trim().length > 0) {
      return rawMessage;
    }

    return ApiException.fallbackMessageByHttp(httpStatus);
  }

  private static extractHttpStatus(message?: string): number | undefined {
    if (!message) {
      return undefined;
    }

    const match = message.match(/HTTP\s+(\d{3})/i);
    if (!match) {
      return undefined;
    }

    const parsed = Number.parseInt(match[1], 10);
    return Number.isNaN(parsed) ? undefined : parsed;
  }

  private static tryParseBody(message?: string): ApiErrorBody | null {
    if (!message) {
      return null;
    }

    const index = message.indexOf(":");
    if (index < 0) {
      return null;
    }

    const maybeJson = message.slice(index + 1).trim();
    if (!maybeJson) {
      return null;
    }

    try {
      const parsed = JSON.parse(maybeJson);
      return isRecord(parsed) ? (parsed as ApiErrorBody) : null;
    } catch {
      return null;
    }
  }

  static messageByFetchError(error: unknown): string {
    if (error instanceof TypeError) {
      return "Không có kết nối mạng";
    }

    if (error instanceof Error) {
      return error.message || "Đã xảy ra lỗi, vui lòng thử lại sau!";
    }

    return "Đã xảy ra lỗi, vui lòng thử lại sau!";
  }

  static fallbackMessageByHttp(status?: number | null): string {
    switch (status) {
      case 400:
        return "Yêu cầu không hợp lệ";
      case 401:
        return "Không được phép. Vui lòng đăng nhập lại";
      case 403:
        return "Bị từ chối truy cập";
      case 404:
        return "Không tìm thấy tài nguyên";
      case 500:
        return "Lỗi máy chủ";
      case 502:
        return "Lỗi cổng kết nối";
      case 503:
        return "Dịch vụ tạm thời không sẵn sàng";
      default:
        return "Đã xảy ra lỗi, vui lòng thử lại sau!";
    }
  }
}
