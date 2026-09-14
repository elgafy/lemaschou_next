// Payment status classification shared by the reservation confirmation and
// payment-failed pages.
//
// Redirects only happen on a *clear* mismatch (paid vs failed). Any other
// status (e.g. "pending" or unknown) renders in place, which avoids an
// infinite redirect loop between the two pages.

export const PAID_PAYMENT_STATUSES = ["paid", "completed", "success"];

export const FAILED_PAYMENT_STATUSES = [
  "failed",
  "unpaid",
  "cancelled",
  "canceled",
  "expired",
];

export function normalizeStatus(status: unknown): string {
  return String(status ?? "")
    .trim()
    .toLowerCase();
}

export function isPaidStatus(status: unknown): boolean {
  return PAID_PAYMENT_STATUSES.includes(normalizeStatus(status));
}

export function isFailedStatus(status: unknown): boolean {
  return FAILED_PAYMENT_STATUSES.includes(normalizeStatus(status));
}
