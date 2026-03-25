type GoogleUserProfile = {
  name: string;
  email: string;
  picture?: string;
};

export type GoogleOAuthSession = {
  accessToken: string;
  profile: GoogleUserProfile;
};

const GOOGLE_IDENTITY_SCRIPT_ID = "google-identity-services";
const GOOGLE_IDENTITY_SCRIPT_SRC = "https://accounts.google.com/gsi/client";
const GOOGLE_IDENTITY_SCOPES = ["openid", "email", "profile"].join(" ");

let googleIdentityLoadPromise: Promise<void> | null = null;

function getGoogleClientId(): string {
  return process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID?.trim() ?? "";
}

function loadGoogleIdentityScript(): Promise<void> {
  if (typeof window === "undefined") {
    return Promise.reject(new Error("Google login chỉ hỗ trợ trên trình duyệt."));
  }

  if (window.google?.accounts?.oauth2) {
    return Promise.resolve();
  }

  if (googleIdentityLoadPromise) {
    return googleIdentityLoadPromise;
  }

  googleIdentityLoadPromise = new Promise<void>((resolve, reject) => {
    const existingScript = document.getElementById(GOOGLE_IDENTITY_SCRIPT_ID) as
      | HTMLScriptElement
      | null;

    if (existingScript) {
      existingScript.addEventListener("load", () => resolve(), { once: true });
      existingScript.addEventListener(
        "error",
        () => reject(new Error("Không thể tải Google Identity Services.")),
        { once: true },
      );
      return;
    }

    const script = document.createElement("script");
    script.id = GOOGLE_IDENTITY_SCRIPT_ID;
    script.src = GOOGLE_IDENTITY_SCRIPT_SRC;
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Không thể tải Google Identity Services."));
    document.head.appendChild(script);
  }).finally(() => {
    if (!window.google?.accounts?.oauth2) {
      googleIdentityLoadPromise = null;
    }
  });

  return googleIdentityLoadPromise;
}

function requestGoogleAccessToken(clientId: string): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    const tokenClient = window.google?.accounts?.oauth2.initTokenClient({
      client_id: clientId,
      scope: GOOGLE_IDENTITY_SCOPES,
      prompt: "select_account",
      callback: (response) => {
        if (response.error) {
          reject(
            new Error(
              response.error_description ??
                "Google không cấp access token. Vui lòng thử lại.",
            ),
          );
          return;
        }

        if (!response.access_token) {
          reject(new Error("Google không trả về access token."));
          return;
        }

        resolve(response.access_token);
      },
      error_callback: (error) => {
        reject(new Error(error.type || "Google login đã bị huỷ."));
      },
    });

    if (!tokenClient) {
      reject(new Error("Không thể khởi tạo Google token client."));
      return;
    }

    tokenClient.requestAccessToken();
  });
}

async function fetchGoogleUserProfile(accessToken: string): Promise<GoogleUserProfile> {
  const response = await fetch("https://openidconnect.googleapis.com/v1/userinfo", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Không thể lấy thông tin tài khoản Google.");
  }

  const payload = (await response.json()) as Partial<GoogleUserProfile>;
  if (!payload.email || !payload.name) {
    throw new Error("Thiếu thông tin tài khoản Google cần thiết.");
  }

  return {
    name: payload.name,
    email: payload.email,
    picture: payload.picture,
  };
}

export async function signInWithGoogle(): Promise<GoogleOAuthSession> {
  const clientId = getGoogleClientId();
  if (!clientId) {
    throw new Error("Thiếu NEXT_PUBLIC_GOOGLE_CLIENT_ID trong cấu hình frontend.");
  }

  await loadGoogleIdentityScript();

  const accessToken = await requestGoogleAccessToken(clientId);
  const profile = await fetchGoogleUserProfile(accessToken);

  return {
    accessToken,
    profile,
  };
}
