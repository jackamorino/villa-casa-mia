import Image from 'next/image';
import Link from 'next/link';

import { Footer } from '@/components/Footer';
import { JsonLd } from '@/components/JsonLd';
import { Nav } from '@/components/Nav';
import { getRooms } from '@/lib/data';
import { breadcrumbJsonLd, pageMetadata } from '@/lib/seo';
import { urlFor } from '@/sanity/image';

export const metadata = pageMetadata({
  title: 'Gli Appartamenti',
  path: '/rooms',
  description: 'Gli appartamenti di Villa Casa Mia ad Arquà Petrarca: comfort, vista sui Colli Euganei e prenotazione diretta con sconto.',
});
export const revalidate = 60;

export default async function RoomsPage() {
  const rooms = await getRooms();

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Appartamenti', path: '/rooms' },
        ])}
      />
      <Nav solid />

      <main id="main" className="pt-20">
        <header className="text-center px-4 py-12 sm:py-16">
          <h1 className="text-3xl sm:text-4xl font-bold text-stone-800">I nostri appartamenti</h1>
          <p className="text-stone-500 mt-3 text-lg max-w-xl mx-auto">
            Due appartamenti immerse tra gli ulivi, con vista sui Colli Euganei.
          </p>
        </header>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-16 grid grid-cols-1 md:grid-cols-2 gap-8">
          {rooms.map((room) => (
            <Link
              key={room._id}
              href={`/rooms/${room.slug.current}`}
              className="group rounded-xl overflow-hidden border border-stone-200 hover:shadow-lg transition-shadow bg-white"
            >
              {room.mainImage && (
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={urlFor(room.mainImage).width(700).height(438).url()}
                    alt={room.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              )}
              <div className="p-6">
                <h2 className="text-xl font-semibold text-stone-800 group-hover:text-green-700 transition-colors">
                  {room.name}
                </h2>
                {room.tagline && (
                  <p className="text-stone-500 mt-1">{room.tagline}</p>
                )}
                <div className="flex items-center justify-between mt-4">
                  <span className="text-green-700 font-semibold text-lg">
                    &euro;{room.pricePerNight}
                    <span className="text-sm text-stone-400 font-normal"> / notte</span>
                  </span>
                  <span className="text-sm text-stone-400">
                    max {room.maxGuests} ospiti &middot; min {room.minNights} notti
                  </span>
                </div>
                {room.amenities && room.amenities.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {room.amenities.slice(0, 5).map((a) => (
                      <span key={a} className="text-xs bg-stone-100 text-stone-600 rounded-full px-3 py-1">
                        {a}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      </main>

      <Footer />
    </>
  );
}
