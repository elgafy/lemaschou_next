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

// Reservation-level status (reservation.status, not order.status).
// A "confirmed" reservation is a successful booking regardless of the
// order/payment status (e.g. pay-at-venue bookings have a pending order).
export const CONFIRMED_RESERVATION_STATUSES = ["confirmed", "completed"];

export function isReservationConfirmed(status: unknown): boolean {
  return CONFIRMED_RESERVATION_STATUSES.includes(normalizeStatus(status));
}
