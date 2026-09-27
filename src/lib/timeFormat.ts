// Convert backend time strings like "7:00 PM" to Arabic display ("7:00 م").
export function formatTimeDisplay(
  time: string | undefined | null,
  locale: string
): string | undefined | null {
  if (!time) return time;
  if (locale !== "ar") return time;
  return time.replace(/\s*AM\b/g, " ص").replace(/\s*PM\b/g, " م");
}

// Format a seating duration in minutes for display.
export function formatSeatingDuration(minutes: number, locale: string): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (locale === "ar") {
    const hoursAr =
      h === 1 ? "ساعة" : h === 2 ? "ساعتان" : h >= 3 && h <= 10 ? `${h} ساعات` : `${h} ساعة`;
    const minsAr =
      m === 0 ? "" : m === 1 ? " و دقيقة" : m === 2 ? " و دقيقتان" : ` و ${m} دقيقة`;
    return m === 0 ? hoursAr : `${hoursAr}${minsAr}`;
  }
  return m === 0 ? `${h}h` : `${h}h : ${m}mins`;
}

// Convert a stored seating duration string (e.g. "2h", "2h : 30mins") to the
// Arabic display format when needed. Unknown formats pass through unchanged.
export function formatStoredSeatingDuration(
  value: string | undefined | null,
  locale: string
): string | undefined | null {
  if (!value || locale !== "ar") return value;
  const match = /^(\d+)h(?:\s*:\s*(\d+)\s*mins)?$/.exec(value.trim());
  if (!match) return value;
  const h = parseInt(match[1], 10);
  const m = match[2] ? parseInt(match[2], 10) : 0;
  return formatSeatingDuration(h * 60 + m, "ar");
}
