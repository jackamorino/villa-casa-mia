import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@sanity/client';
import { apiVersion, dataset, projectId } from '@/sanity/env';
import { getBlockedDates } from '@/lib/availability';
import { isAvailable } from '@/lib/ical';

// Write client (needs token with write permissions)
const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN,
});

interface BookingRequest {
  roomSlug: string;
  roomId: string;
  guestName: string;
  guestEmail: string;
  guestPhone?: string;
  checkIn: string;  // YYYY-MM-DD
  checkOut: string; // YYYY-MM-DD
  guests: number;
  notes?: string;
  totalPrice: number;
}

/**
 * POST /api/book
 *
 * Creates a new booking after validating availability.
 */
export async function POST(request: NextRequest) {
  try {
    const body: BookingRequest = await request.json();

    // Validate required fields
    const required: (keyof BookingRequest)[] = [
      'roomSlug', 'roomId', 'guestName', 'guestEmail', 'checkIn', 'checkOut', 'guests', 'totalPrice',
    ];
    for (const field of required) {
      if (!body[field]) {
        return NextResponse.json({ error: `Missing field: ${field}` }, { status: 400 });
      }
    }

    // Double-check availability (race condition guard)
    const blockedDates = await getBlockedDates(body.roomSlug);
    if (!isAvailable(body.checkIn, body.checkOut, blockedDates)) {
      return NextResponse.json(
        { error: 'Selected dates are no longer available' },
        { status: 409 }
      );
    }

    // Create booking in Sanity
    const booking = await writeClient.create({
      _type: 'booking',
      room: { _type: 'reference', _ref: body.roomId },
      guestName: body.guestName,
      guestEmail: body.guestEmail,
      guestPhone: body.guestPhone || '',
      checkIn: body.checkIn,
      checkOut: body.checkOut,
      guests: body.guests,
      totalPrice: body.totalPrice,
      notes: body.notes || '',
      status: 'pending',
      source: 'direct',
    });

    // TODO: Send confirmation email
    // TODO: Integrate payment (Stripe)

    return NextResponse.json({
      success: true,
      bookingId: booking._id,
      message: 'Booking request received. We will confirm shortly.',
    });
  } catch (err) {
    console.error('Booking error:', err);
    return NextResponse.json(
      { error: 'Failed to create booking' },
      { status: 500 }
    );
  }
}
