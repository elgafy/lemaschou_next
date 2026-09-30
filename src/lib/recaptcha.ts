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
  if (!token) {
    console.error(
      "reCAPTCHA DEBUG: no token received from client — client-side token acquisition failed"
    );
    return false;
  }
  try {
    console.log(
      `reCAPTCHA DEBUG: verifying token (len=${token.length}, head="${token.slice(0, 10)}…", tail="…${token.slice(-10)}", expectedAction="${expectedAction}")`
    );
    const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ secret, response: token }),
    });
    const data = await res.json();
    console.log(
      `reCAPTCHA DEBUG: siteverify response: ${JSON.stringify(data)}`
    );
    if (!data.success) {
      console.error(
        `reCAPTCHA DEBUG: verification FAILED — error-codes: ${JSON.stringify(data["error-codes"])}`
      );
      return false;
    }
    if (data.action && data.action !== expectedAction) {
      console.error(
        `reCAPTCHA DEBUG: action mismatch — expected "${expectedAction}", got "${data.action}"`
      );
      return false;
    }
    const minScore = parseFloat(process.env.RECAPTCHA_MIN_SCORE || "0.5");
    if (typeof data.score === "number" && data.score < minScore) {
      console.error(
        `reCAPTCHA DEBUG: score ${data.score} is below threshold ${minScore}`
      );
      return false;
    }
    console.log(
      `reCAPTCHA DEBUG: verified OK (score=${data.score}, hostname=${data.hostname}, action=${data.action})`
    );
    return true;
  } catch (e) {
    console.error("reCAPTCHA DEBUG: verification error:", e);
    return false;
  }
}
