import { NextRequest, NextResponse } from 'next/server';
import { getBlockedDates } from '@/lib/availability';

/**
 * GET /api/availability?room=camera-olivo&month=2026-10
 *
 * Returns blocked dates for a room in a given month (or all upcoming if no month).
 */
export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const roomSlug = searchParams.get('room');

  if (!roomSlug) {
    return NextResponse.json({ error: 'Missing room parameter' }, { status: 400 });
  }

  try {
    const blockedDates = await getBlockedDates(roomSlug);
    const month = searchParams.get('month'); // YYYY-MM

    let dates = Array.from(blockedDates);

    // Filter to requested month if provided
    if (month) {
      dates = dates.filter((d) => d.startsWith(month));
    }

    return NextResponse.json({
      room: roomSlug,
      blockedDates: dates.sort(),
    });
  } catch (err) {
    console.error('Availability error:', err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
