declare global {
  interface Window {
    grecaptcha?: {
      ready: (cb: () => void) => void;
      execute: (siteKey: string, opts: { action: string }) => Promise<string>;
    };
  }
}

// Get a reCAPTCHA v3 token. Returns null when the site key is not configured
// or the script failed to load (server then skips verification).
export async function getRecaptchaToken(action: string): Promise<string | null> {
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
  if (!siteKey || typeof window === "undefined") {
    console.warn("reCAPTCHA DEBUG: no site key or no window — returning null token");
    return null;
  }
  // Wait briefly for the reCAPTCHA script to load (it loads afterInteractive).
  for (let i = 0; i < 50 && !window.grecaptcha; i++) {
    await new Promise((r) => setTimeout(r, 100));
  }
  if (!window.grecaptcha) {
    console.error("reCAPTCHA DEBUG: window.grecaptcha not available after 5s — script blocked or failed to load");
    return null;
  }
  return new Promise((resolve) => {
    window.grecaptcha!.ready(() => {
      window.grecaptcha!
        .execute(siteKey, { action })
        .then((token) => {
          console.log(
            `reCAPTCHA DEBUG: token obtained for action="${action}" (len=${token?.length ?? 0})`
          );
          resolve(token);
        })
        .catch((e) => {
          console.error("reCAPTCHA DEBUG: execute failed:", e);
          resolve(null);
        });
    });
  });
}
