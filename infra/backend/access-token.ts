import "server-only";

import { ObjectResponse } from "@/data/dtos/common/object-response";
import { AccessTokenResponse } from "@/data/dtos/server/server.dto";
import { AppEndpoints } from "@/shared/constants/app-endpoints";

import { callBackend, responseToJson } from "./http";

let cachedAccessToken: string | null = null;
let pendingAccessTokenPromise: Promise<string> | null = null;

function isRecord(value: unknown): value is Record<string, unknown> {
  return !!value && typeof value === "object" && !Array.isArray(value);
}

function extractAccessToken(data: AccessTokenResponse | null | undefined): string | null {
  if (!data) {
    return null;
  }

  return data.accessToken ?? null;
}

async function requestAccessToken(): Promise<string> {
  const email = process.env.ACCESS_TOKEN_EMAIL ?? "";
  const password = process.env.ACCESS_TOKEN_PASSWORD ?? "";

  const response = await callBackend({
    method: "POST",
    path: AppEndpoints.server.accessToken,
    body: {
      email,
      password,
    },
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(
      `Unable to bootstrap backend access token: HTTP ${response.status}${text ? `: ${text}` : ""}`,
    );
  }

  const payload = await responseToJson(response);
  const apiResponse = isRecord(payload)
    ? ObjectResponse.fromApiJson<AccessTokenResponse>(payload, AccessTokenResponse)
    : null;
  const accessToken = extractAccessToken(apiResponse?.data);

  if (!accessToken) {
    throw new Error("Unable to bootstrap backend access token: missing access token in response");
  }

  cachedAccessToken = accessToken;
  return accessToken;
}

export async function getBackendAccessToken(): Promise<string> {
  if (cachedAccessToken) {
    return cachedAccessToken;
  }

  if (!pendingAccessTokenPromise) {
    pendingAccessTokenPromise = requestAccessToken()
      .catch((error) => {
        cachedAccessToken = null;
        throw error;
      })
      .finally(() => {
        pendingAccessTokenPromise = null;
      });
  }

  return pendingAccessTokenPromise;
}
