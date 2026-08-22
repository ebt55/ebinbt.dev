/** Date helpers. All formatting is done in UTC so builds are deterministic. */

const FULL = new Intl.DateTimeFormat('en-GB', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
  timeZone: 'UTC',
});

/** 2026-08-22 -> "22 Aug 2026" */
export function formatDate(date: Date): string {
  return FULL.format(date);
}

/** 2026-08-22 -> "2026-08-22" (for <time datetime>) */
export function isoDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}
