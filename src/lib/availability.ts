import { client } from '@/sanity/client';
import { bookingsForRoomQuery, roomBySlugQuery } from '@/sanity/queries';
import { fetchIcalEvents, blockedDatesFromRanges, type BlockedRange } from './ical';

interface SanityBooking {
  checkIn: string;
  checkOut: string;
  status: string;
}

interface RoomData {
  _id: string;
  icalAirbnb?: string;
  icalBooking?: string;
}

/**
 * Get all blocked dates for a room by merging:
 * 1. Airbnb iCal feed
 * 2. Booking.com iCal feed
 * 3. Direct bookings stored in Sanity
 *
 * Returns a Set of YYYY-MM-DD strings that are unavailable.
 */
export async function getBlockedDates(roomSlug: string): Promise<Set<string>> {
  // Fetch room to get iCal URLs
  const room: RoomData | null = await client.fetch(roomBySlugQuery, { slug: roomSlug });
  if (!room) throw new Error(`Room not found: ${roomSlug}`);

  const allRanges: BlockedRange[] = [];

  // Fetch external iCal feeds in parallel
  const icalPromises: Promise<BlockedRange[]>[] = [];

  if (room.icalAirbnb) {
    icalPromises.push(
      fetchIcalEvents(room.icalAirbnb, 'airbnb').catch((err) => {
        console.error(`Failed to fetch Airbnb iCal for ${roomSlug}:`, err);
        return [];
      })
    );
  }
  if (room.icalBooking) {
    icalPromises.push(
      fetchIcalEvents(room.icalBooking, 'booking').catch((err) => {
        console.error(`Failed to fetch Booking.com iCal for ${roomSlug}:`, err);
        return [];
      })
    );
  }

  const icalResults = await Promise.all(icalPromises);
  for (const ranges of icalResults) {
    allRanges.push(...ranges);
  }

  // Fetch direct bookings from Sanity
  const sanityBookings: SanityBooking[] = await client.fetch(bookingsForRoomQuery, {
    roomId: room._id,
  });

  for (const b of sanityBookings) {
    allRanges.push({
      start: new Date(b.checkIn),
      end: new Date(b.checkOut),
      source: 'direct',
    });
  }

  return blockedDatesFromRanges(allRanges);
}
