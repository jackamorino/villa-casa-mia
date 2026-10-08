import { revalidateTag } from 'next/cache';
import { type NextRequest, NextResponse } from 'next/server';

/**
 * POST /api/revalidate
 *
 * Sanity webhook endpoint — triggers on-demand revalidation when
 * content changes in the CMS.
 */
export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get('secret');
  if (secret !== process.env.SANITY_REVALIDATE_SECRET) {
    return NextResponse.json({ error: 'Invalid secret' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const tag = body._type || 'all';
    revalidateTag(tag);
    return NextResponse.json({ revalidated: true, tag });
  } catch {
    return NextResponse.json({ error: 'Failed to revalidate' }, { status: 500 });
  }
}
