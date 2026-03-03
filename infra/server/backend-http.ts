export type BackendRequestOptions = {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  path: string;
  query?: URLSearchParams;
  headers?: Record<string, string>;
  body?: unknown;
  accessToken?: string | null;
};

function normalizePath(path: string): string {
  return path.startsWith("/") ? path : `/${path}`;
}

function getBackendBaseUrl(): string {
  const baseUrl = process.env.BACKEND_API_URL;

  if (!baseUrl) {
    throw new Error("Missing BACKEND_API_URL env");
  }

  return baseUrl.replace(/\/$/, "");
}

function isFormData(body: unknown): body is FormData {
  return typeof FormData !== "undefined" && body instanceof FormData;
}

function buildRequestBody(body: unknown): BodyInit | undefined {
  if (body === undefined || body === null) {
    return undefined;
  }

  if (isFormData(body)) {
    return body;
  }

  if (typeof body === "string") {
    return body;
  }

  return JSON.stringify(body);
}

export async function callBackend(options: BackendRequestOptions): Promise<Response> {
  const baseUrl = getBackendBaseUrl();
  const url = new URL(`${baseUrl}${normalizePath(options.path)}`);

  if (options.query) {
    options.query.forEach((value, key) => {
      url.searchParams.append(key, value);
    });
  }

  const headers: Record<string, string> = {
    Accept: "application/json",
    ...options.headers,
  };

  if (options.accessToken) {
    headers["User-Authorization"] = options.accessToken;
  }

  const hasBody = options.body !== undefined && options.body !== null;
  if (hasBody && !isFormData(options.body) && !headers["Content-Type"]) {
    headers["Content-Type"] = "application/json";
  }

  return fetch(url.toString(), {
    method: options.method ?? "GET",
    headers,
    body: buildRequestBody(options.body),
    cache: "no-store",
  });
}

export async function responseToJson(response: Response): Promise<unknown> {
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) {
    return null;
  }

  return response.json();
}
