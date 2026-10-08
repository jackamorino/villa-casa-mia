import { NextRequest, NextResponse } from 'next/server';
import { client } from '@/sanity/client';
import { roomBySlugQuery, bookingsForRoomQuery } from '@/sanity/queries';

/**
 * GET /api/calendar/camera-olivo
 *
 * Generates an iCal feed for a room's direct bookings.
 * Import this URL into Airbnb and Booking.com to sync availability.
 */
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ roomSlug: string }> }
) {
  const { roomSlug } = await params;

  const room = await client.fetch(roomBySlugQuery, { slug: roomSlug });
  if (!room) {
    return NextResponse.json({ error: 'Room not found' }, { status: 404 });
  }

  const bookings = await client.fetch(bookingsForRoomQuery, { roomId: room._id });

  // Dynamic import — ical-generator is ESM
  const { default: icalGenerator } = await import('ical-generator');

  const calendar = icalGenerator({
    name: `Villa Casa Mia — ${room.name}`,
    prodId: { company: 'Villa Casa Mia', product: 'Booking Calendar' },
  });

  for (const booking of bookings) {
    calendar.createEvent({
      start: new Date(booking.checkIn),
      end: new Date(booking.checkOut),
      summary: `Booked — ${room.name}`,
      description: 'Direct booking via villacasamiaitalia.com',
      allDay: true,
    });
  }

  return new NextResponse(calendar.toString(), {
    headers: {
      'Content-Type': 'text/calendar; charset=utf-8',
      'Content-Disposition': `attachment; filename="${roomSlug}.ics"`,
      'Cache-Control': 'no-cache, no-store, must-revalidate',
    },
  });
}
