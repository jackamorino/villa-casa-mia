import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import BookingCalendar from '@/components/BookingCalendar';
import BookingForm from '@/components/BookingForm';
import { Footer } from '@/components/Footer';
import { JsonLd } from '@/components/JsonLd';
import { Nav } from '@/components/Nav';
import { PortableTextRenderer } from '@/components/PortableText';
import { getRoom, getRoomSlugs } from '@/lib/data';
import { breadcrumbJsonLd, roomJsonLd, pageMetadata } from '@/lib/seo';
import { urlFor } from '@/sanity/image';

export const revalidate = 60;

export async function generateStaticParams() {
  const slugs = await getRoomSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const room = await getRoom(slug);
  if (!room) return pageMetadata({ title: 'Non trovato', path: `/rooms/${slug}` });
  return pageMetadata({
    title: room.name,
    description: room.tagline || `Camera ${room.name} — Villa Casa Mia`,
    path: `/rooms/${room.slug.current}`,
    image: room.mainImage ? urlFor(room.mainImage).width(1200).height(630).url() : undefined,
  });
}

export default async function RoomDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const room = await getRoom(slug);
  if (!room) notFound();

  return (
    <>
      <JsonLd
        data={[
          roomJsonLd(room),
          breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'Camere', path: '/rooms' },
            { name: room.name, path: `/rooms/${room.slug.current}` },
          ]),
        ]}
      />
      <Nav solid />

      <main id="main" className="pt-20">
        {/* Hero image */}
        {room.mainImage && (
          <div className="relative aspect-[21/9] max-h-[500px] overflow-hidden">
            <Image
              src={urlFor(room.mainImage).width(1400).height(600).url()}
              alt={room.name}
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
          </div>
        )}

        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Left: room details */}
            <div className="lg:col-span-2">
              <Link href="/rooms" className="text-sm text-green-700 hover:text-green-800">
                &larr; Tutte le camere
              </Link>
              <h1 className="text-3xl sm:text-4xl font-bold text-stone-800 mt-3">
                {room.name}
              </h1>
              {room.tagline && (
                <p className="text-lg text-stone-500 mt-2">{room.tagline}</p>
              )}

              <div className="flex gap-4 mt-4 text-sm text-stone-500">
                <span>Max {room.maxGuests} ospiti</span>
                <span>&middot;</span>
                <span>Min {room.minNights} notti</span>
                <span>&middot;</span>
                <span className="text-green-700 font-medium">
                  &euro;{room.pricePerNight}/notte
                </span>
              </div>

              {room.amenities && room.amenities.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {room.amenities.map((a) => (
                    <span key={a} className="text-sm bg-stone-100 text-stone-600 rounded-full px-3 py-1">
                      {a}
                    </span>
                  ))}
                </div>
              )}

              {room.description && (
                <div className="mt-8">
                  <PortableTextRenderer value={room.description} />
                </div>
              )}

              {/* Gallery */}
              {room.gallery && room.gallery.length > 0 && (
                <div className="mt-10">
                  <h2 className="text-xl font-semibold text-stone-800 mb-4">Galleria</h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {room.gallery.map((img, i) => (
                      <div key={i} className="relative aspect-square rounded-lg overflow-hidden">
                        <Image
                          src={urlFor(img).width(400).height(400).url()}
                          alt={`${room.name} foto ${i + 1}`}
                          fill
                          className="object-cover"
                          sizes="(max-width: 640px) 50vw, 33vw"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right: booking sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 rounded-xl border border-stone-200 bg-white p-5 shadow-sm">
                <h2 className="text-lg font-semibold text-stone-800 mb-1">
                  Prenota questa camera
                </h2>
                {room.directDiscount > 0 && (
                  <p className="text-sm text-green-700 mb-4">
                    {room.directDiscount}% di sconto prenotando qui
                  </p>
                )}

                <RoomBookingWidget room={room} />
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

/**
 * Client-side booking widget that connects calendar + form.
 * Extracted as a separate client component wrapper.
 */
function RoomBookingWidget({ room }: { room: Awaited<ReturnType<typeof getRoom>> }) {
  if (!room) return null;

  return (
    <RoomBookingWidgetClient
      roomSlug={room.slug.current}
      roomId={room._id}
      roomName={room.name}
      pricePerNight={room.pricePerNight}
      directDiscount={room.directDiscount}
      maxGuests={room.maxGuests}
      minNights={room.minNights}
    />
  );
}

// Need a separate file for the client component — inline 'use client' not possible.
// We'll make it a component that wraps calendar + form.
import { RoomBookingWidgetClient } from '@/components/RoomBookingWidget';
