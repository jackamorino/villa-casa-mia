import { eachDayOfInterval, parseISO, format } from 'date-fns';

export interface BlockedRange {
  start: Date;
  end: Date;
  summary?: string;
  source: 'airbnb' | 'booking' | 'direct';
}

/**
 * Fetch and parse an iCal feed URL, returning blocked date ranges.
 * Works with Airbnb and Booking.com iCal exports.
 */
export async function fetchIcalEvents(
  url: string,
  source: BlockedRange['source']
): Promise<BlockedRange[]> {
  // Dynamic import — node-ical is server-only
  const ical = await import('node-ical');
  const events = await ical.async.fromURL(url);
  const blocked: BlockedRange[] = [];

  for (const key of Object.keys(events)) {
    const event = events[key];
    if (event.type !== 'VEVENT') continue;
    if (!event.start || !event.end) continue;

    blocked.push({
      start: new Date(event.start),
      end: new Date(event.end),
      summary: event.summary || undefined,
      source,
    });
  }

  return blocked;
}

/**
 * Merge multiple blocked-range arrays and return a Set of blocked
 * date strings (YYYY-MM-DD). A date is blocked if it falls within
 * any range's [start, end) interval (end date is checkout, so it's free).
 */
export function blockedDatesFromRanges(ranges: BlockedRange[]): Set<string> {
  const blocked = new Set<string>();

  for (const range of ranges) {
    // end date in iCal is the checkout day — the guest leaves, so
    // it should NOT be blocked (it's available for a new check-in).
    const adjustedEnd = new Date(range.end);
    adjustedEnd.setDate(adjustedEnd.getDate() - 1);

    if (adjustedEnd < range.start) continue;

    const days = eachDayOfInterval({ start: range.start, end: adjustedEnd });
    for (const day of days) {
      blocked.add(format(day, 'yyyy-MM-dd'));
    }
  }

  return blocked;
}

/**
 * Check if a requested date range conflicts with blocked dates.
 */
export function isAvailable(
  checkIn: string,
  checkOut: string,
  blockedDates: Set<string>
): boolean {
  const start = parseISO(checkIn);
  const end = parseISO(checkOut);
  // Adjust end: checkout day is free
  const adjustedEnd = new Date(end);
  adjustedEnd.setDate(adjustedEnd.getDate() - 1);

  if (adjustedEnd < start) return false;

  const days = eachDayOfInterval({ start, end: adjustedEnd });
  return days.every((day) => !blockedDates.has(format(day, 'yyyy-MM-dd')));
}
