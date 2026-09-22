// Payment status classification used by the reservation page to decide which
// state to render (paid / failed / pending).
//
// Only "paid" and known failure values are classified explicitly; anything
// else (e.g. "pending" or unknown) falls through to the pending state.

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
