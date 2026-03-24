import { ApiException } from "@/data/types/api-exception";

type ApiErrorPayload = {
  message?: unknown;
};

function asString(value: unknown): string | null {
  return typeof value === "string" && value.trim().length > 0 ? value : null;
}

function parsePayloadMessage(rawMessage?: string | null): string | null {
  if (!rawMessage) {
    return null;
  }

  const jsonStart = rawMessage.indexOf("{");
  if (jsonStart < 0) {
    return null;
  }

  try {
    const parsed = JSON.parse(rawMessage.slice(jsonStart)) as ApiErrorPayload;
    return asString(parsed.message);
  } catch {
    return null;
  }
}

function extractHttpStatus(rawMessage?: string | null): number | null {
  if (!rawMessage) {
    return null;
  }

  const match = rawMessage.match(/HTTP\s+(\d{3})/i);
  if (!match) {
    return null;
  }

  const status = Number.parseInt(match[1], 10);
  return Number.isNaN(status) ? null : status;
}

export function resolveApiErrorMessage(error?: ApiException | null): string {
  if (!error) {
    return "Đã xảy ra lỗi, vui lòng thử lại sau!";
  }

  const payloadMessage = parsePayloadMessage(error.message);
  if (payloadMessage) {
    return payloadMessage;
  }

  if (error.message && !/^HTTP\s+\d{3}/i.test(error.message)) {
    return error.message;
  }

  const httpStatus = error.httpStatus ?? extractHttpStatus(error.message);
  return ApiException.fallbackMessageByHttp(httpStatus);
}
