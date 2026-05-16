"use client";

declare global {
  interface Window {
    grecaptcha?: {
      ready: (callback: () => void) => void;
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
    };
  }
}

let scriptPromise: Promise<void> | null = null;

function loadRecaptchaScript(siteKey: string): Promise<void> {
  if (scriptPromise) {
    return scriptPromise;
  }

  scriptPromise = new Promise((resolve, reject) => {
    const existingScript = document.querySelector<HTMLScriptElement>('script[data-recaptcha-v3="true"]');

    if (existingScript) {
      existingScript.addEventListener("load", () => resolve(), { once: true });
      existingScript.addEventListener("error", () => reject(new Error("Failed to load reCAPTCHA script.")), { once: true });
      return;
    }

    const script = document.createElement("script");
    script.src = `https://www.google.com/recaptcha/api.js?render=${encodeURIComponent(siteKey)}`;
    script.async = true;
    script.defer = true;
    script.dataset.recaptchaV3 = "true";
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to load reCAPTCHA script."));
    document.head.appendChild(script);
  });

  return scriptPromise;
}

export async function getRecaptchaToken(action: string): Promise<string> {
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

  if (!siteKey) {
    throw new Error("reCAPTCHA site key is not configured.");
  }

  await loadRecaptchaScript(siteKey);

  if (!window.grecaptcha) {
    throw new Error("reCAPTCHA is not available.");
  }

  return new Promise<string>((resolve, reject) => {
    window.grecaptcha?.ready(async () => {
      try {
        const token = await window.grecaptcha?.execute(siteKey, { action });
        if (!token) {
          reject(new Error("Failed to retrieve reCAPTCHA token."));
          return;
        }
        resolve(token);
      } catch {
        reject(new Error("Failed to execute reCAPTCHA."));
      }
    });
  });
}

