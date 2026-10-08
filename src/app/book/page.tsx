import Link from 'next/link';
import Image from 'next/image';

import { Footer } from '@/components/Footer';
import { JsonLd } from '@/components/JsonLd';
import { Nav } from '@/components/Nav';
import { getRooms } from '@/lib/data';
import { breadcrumbJsonLd, pageMetadata } from '@/lib/seo';
import { urlFor } from '@/sanity/image';

export const metadata = pageMetadata({
  title: 'Prenota',
  path: '/book',
  description: 'Prenota direttamente a Villa Casa Mia e risparmia il 5%. Scegli la tua camera e le date del soggiorno.',
});
export const revalidate = 60;

export default async function BookPage() {
  const rooms = await getRooms();

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Prenota', path: '/book' },
        ])}
      />
      <Nav solid />

      <main id="main" className="pt-20">
        <header className="text-center px-4 py-12 sm:py-16">
          <h1 className="text-3xl sm:text-4xl font-bold text-stone-800">
            Prenota il tuo soggiorno
          </h1>
          <p className="text-stone-500 mt-3 text-lg max-w-xl mx-auto">
            Scegli la camera e verifica la disponibilità.
            Prenotando direttamente risparmi il 5%.
          </p>
        </header>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 pb-16">
          {rooms.length === 0 && (
            <p className="text-center text-stone-500">
              Le camere saranno disponibili presto. Torna a trovarci!
            </p>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {rooms.map((room) => (
              <Link
                key={room._id}
                href={`/rooms/${room.slug.current}`}
                className="group rounded-xl overflow-hidden border border-stone-200 hover:shadow-lg transition-shadow bg-white"
              >
                {room.mainImage && (
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={urlFor(room.mainImage).width(600).height(375).url()}
                      alt={room.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 640px) 100vw, 50vw"
                    />
                  </div>
                )}
                <div className="p-5">
                  <h2 className="text-lg font-semibold text-stone-800 group-hover:text-green-700 transition-colors">
                    {room.name}
                  </h2>
                  {room.tagline && (
                    <p className="text-sm text-stone-500 mt-1">{room.tagline}</p>
                  )}
                  <div className="flex items-center justify-between mt-3">
                    <div>
                      <span className="text-green-700 font-semibold">
                        &euro;{room.pricePerNight}
                      </span>
                      <span className="text-sm text-stone-400"> / notte</span>
                    </div>
                    {room.directDiscount > 0 && (
                      <span className="text-xs bg-green-50 text-green-700 font-medium rounded-full px-2.5 py-1">
                        -{room.directDiscount}% diretto
                      </span>
                    )}
                  </div>
                  <div className="mt-3 text-center">
                    <span className="text-sm text-green-700 font-medium">
                      Verifica disponibilità &rarr;
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
