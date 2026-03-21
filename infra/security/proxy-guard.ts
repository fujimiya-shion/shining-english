import { createHmac, randomUUID, timingSafeEqual } from "node:crypto";

export const PROXY_GUARD_COOKIE_NAME = "se_proxy_guard";

type ProxyGuardPayload = {
  iat: number;
  exp: number;
  nonce: string;
};

export type ProxyGuardVerificationResult = {
  valid: boolean;
  shouldRefresh: boolean;
  reason: "valid" | "expired" | "invalid";
};

function getProxyGuardSecret(): string {
  const secret = process.env.PROXY_GUARD_SECRET;

  if (!secret) {
    throw new Error("Missing PROXY_GUARD_SECRET env");
  }

  return secret;
}

function getProxyGuardTtlSeconds(): number {
  const parsed = Number.parseInt(process.env.PROXY_GUARD_TTL_SECONDS ?? "1800", 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 1800;
}

function getProxyGuardRefreshThresholdSeconds(): number {
  const parsed = Number.parseInt(
    process.env.PROXY_GUARD_REFRESH_THRESHOLD_SECONDS ?? "300",
    10,
  );

  return Number.isFinite(parsed) && parsed >= 0 ? parsed : 300;
}

function encodeBase64Url(value: string): string {
  return Buffer.from(value, "utf8").toString("base64url");
}

function decodeBase64Url(value: string): string {
  return Buffer.from(value, "base64url").toString("utf8");
}

function signEncodedPayload(encodedPayload: string): string {
  return createHmac("sha256", getProxyGuardSecret())
    .update(encodedPayload)
    .digest("base64url");
}

function parsePayload(encodedPayload: string): ProxyGuardPayload | null {
  try {
    const value = JSON.parse(decodeBase64Url(encodedPayload)) as Partial<ProxyGuardPayload>;

    if (
      typeof value.iat !== "number" ||
      typeof value.exp !== "number" ||
      typeof value.nonce !== "string"
    ) {
      return null;
    }

    return {
      iat: value.iat,
      exp: value.exp,
      nonce: value.nonce,
    };
  } catch {
    return null;
  }
}

export function createProxyGuardValue(now = Date.now()): string {
  const iat = Math.floor(now / 1000);
  const payload: ProxyGuardPayload = {
    iat,
    exp: iat + getProxyGuardTtlSeconds(),
    nonce: randomUUID(),
  };
  const encodedPayload = encodeBase64Url(JSON.stringify(payload));
  const signature = signEncodedPayload(encodedPayload);

  return `${encodedPayload}.${signature}`;
}

export function verifyProxyGuardValue(
  value: string | undefined,
  now = Date.now(),
): ProxyGuardVerificationResult {
  if (!value) {
    return { valid: false, shouldRefresh: false, reason: "invalid" };
  }

  const [encodedPayload, providedSignature] = value.split(".");
  if (!encodedPayload || !providedSignature) {
    return { valid: false, shouldRefresh: false, reason: "invalid" };
  }

  const expectedSignature = signEncodedPayload(encodedPayload);
  const expectedBuffer = Buffer.from(expectedSignature, "utf8");
  const providedBuffer = Buffer.from(providedSignature, "utf8");

  if (
    expectedBuffer.length !== providedBuffer.length ||
    !timingSafeEqual(expectedBuffer, providedBuffer)
  ) {
    return { valid: false, shouldRefresh: false, reason: "invalid" };
  }

  const payload = parsePayload(encodedPayload);
  if (!payload) {
    return { valid: false, shouldRefresh: false, reason: "invalid" };
  }

  const currentTime = Math.floor(now / 1000);
  if (payload.iat > currentTime) {
    return { valid: false, shouldRefresh: false, reason: "invalid" };
  }

  if (payload.exp <= currentTime) {
    return { valid: false, shouldRefresh: false, reason: "expired" };
  }

  return {
    valid: true,
    shouldRefresh: payload.exp - currentTime <= getProxyGuardRefreshThresholdSeconds(),
    reason: "valid",
  };
}

export function getProxyGuardCookieMaxAge(): number {
  return getProxyGuardTtlSeconds();
}
