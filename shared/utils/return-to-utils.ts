const DEFAULT_RETURN_TO = "/profile";

export function normalizeReturnTo(
  value?: string | null,
  fallback = DEFAULT_RETURN_TO,
): string {
  if (!value) {
    return fallback;
  }

  if (!value.startsWith("/") || value.startsWith("//")) {
    return fallback;
  }

  return value;
}

export function resolveReturnToFromReferrer(fallback = DEFAULT_RETURN_TO): string {
  if (typeof document === "undefined") {
    return fallback;
  }

  const referrer = document.referrer;
  if (!referrer) {
    return fallback;
  }

  try {
    const currentOrigin = window.location.origin;
    const referrerUrl = new URL(referrer);

    if (referrerUrl.origin !== currentOrigin) {
      return fallback;
    }

    const path = `${referrerUrl.pathname}${referrerUrl.search}${referrerUrl.hash}`;
    if (path.startsWith("/login")) {
      return fallback;
    }

    return normalizeReturnTo(path, fallback);
  } catch {
    return fallback;
  }
}
