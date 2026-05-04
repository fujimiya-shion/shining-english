export class AppUtils {
  static getHostUrl(url?: string): string {
    if (!url) return "";

    if (/^https?:\/\//i.test(url)) {
      return url;
    }

    const baseUrl =
      process.env.NEXT_PUBLIC_BACKEND_BASE_URL ??
      process.env.BACKEND_BASE_URL ??
      "";

    if (!baseUrl) {
      return url;
    }

    const normalizedBase = baseUrl.replace(/\/$/, "");
    const withScheme = /^https?:\/\//i.test(normalizedBase)
      ? normalizedBase
      : `https://${normalizedBase}`;
    const normalizedPath = url.startsWith("/") ? url : `/${url}`;
    return `${withScheme}${normalizedPath}`;
  }

  static getStorageUrl(url?: string): string {
    if (!url) return "";

    if (/^https?:\/\//i.test(url)) {
      return url;
    }

    const normalizedPath = url.startsWith("/") ? url : `/${url}`;

    const baseUrl =
      process.env.NEXT_PUBLIC_BACKEND_BASE_URL ??
      process.env.BACKEND_BASE_URL ??
      "";

    if (!baseUrl) {
      if (normalizedPath.startsWith("/storage")) {
        return normalizedPath;
      }
      if (normalizedPath.startsWith("/public/")) {
        return normalizedPath.replace("/public/", "/storage/");
      }
      return `/storage${normalizedPath}`;
    }

    const normalizedBase = baseUrl.replace(/\/$/, "");
    const withScheme = /^https?:\/\//i.test(normalizedBase)
      ? normalizedBase
      : `https://${normalizedBase}`;

    if (normalizedPath.startsWith("/storage")) {
      return `${withScheme}${normalizedPath}`;
    }
    if (normalizedPath.startsWith("/public/")) {
      return `${withScheme}${normalizedPath.replace("/public/", "/storage/")}`;
    }
    if (normalizedPath.startsWith("/uploads/")) {
      return `${withScheme}${normalizedPath}`;
    }
    return `${withScheme}/storage${normalizedPath}`;
  }
}
