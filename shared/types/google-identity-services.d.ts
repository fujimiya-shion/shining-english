export {};

declare global {
  interface Window {
    google?: {
      accounts: {
        oauth2: {
          initTokenClient: (
            config: GoogleOAuthTokenClientConfig,
          ) => GoogleOAuthTokenClient;
        };
      };
    };
  }

  interface GoogleOAuthTokenClientConfig {
    client_id: string;
    scope: string;
    callback: (response: GoogleOAuthTokenResponse) => void;
    error_callback?: (error: { type: string }) => void;
    prompt?: string;
  }

  interface GoogleOAuthTokenClient {
    requestAccessToken: (overrideConfig?: { prompt?: string }) => void;
  }

  interface GoogleOAuthTokenResponse {
    access_token?: string;
    error?: string;
    error_description?: string;
    expires_in?: number;
    prompt?: string;
    scope?: string;
    token_type?: string;
  }
}
