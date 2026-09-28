// Server-side Google reCAPTCHA v3 verification.
// Skips verification when RECAPTCHA_SECRET_KEY is not configured (dev mode).
export async function verifyRecaptchaToken(
  token: string | null | undefined,
  expectedAction: string
): Promise<boolean> {
  const secret = process.env.RECAPTCHA_SECRET_KEY;
  if (!secret) {
    console.warn("reCAPTCHA: RECAPTCHA_SECRET_KEY not set — skipping verification");
    return true;
  }
  if (!token) return false;
  try {
    const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ secret, response: token }),
    });
    const data = await res.json();
    if (!data.success) return false;
    if (data.action && data.action !== expectedAction) return false;
    const minScore = parseFloat(process.env.RECAPTCHA_MIN_SCORE || "0.5");
    if (typeof data.score === "number" && data.score < minScore) return false;
    return true;
  } catch (e) {
    console.error("reCAPTCHA verification error:", e);
    return false;
  }
}
