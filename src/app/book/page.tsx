import Link from 'next/link';
import Image from 'next/image';

import { Footer } from '@/components/Footer';
import { JsonLd } from '@/components/JsonLd';
import { Nav } from '@/components/Nav';
import { PageHero } from '@/components/PageHero';
import { getRooms } from '@/lib/data';
import { photos } from '@/lib/photos';
import { siteConfig } from '@/lib/site';
import { breadcrumbJsonLd, pageMetadata } from '@/lib/seo';
import { urlFor } from '@/sanity/image';

export const metadata = pageMetadata({
  title: 'Prenota',
  path: '/book',
  description: 'Prenota direttamente a Villa Casa Mia e risparmia il 5%. Scegli la tua camera e le date del soggiorno.',
});
export const revalidate = 60;

export default async function BookPage() {
  const rooms = await getRooms().catch(() => []);

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Prenota', path: '/book' },
        ])}
      />
      <Nav solid />

      <main id="main">
        <PageHero
          eyebrow="Prenota diretto"
          title={<>Prenota il tuo <em>soggiorno.</em></>}
          intro="Scegli l’appartamento e verifica la disponibilità. Prenotando direttamente risparmi il 5%."
          image={photos.welcome.src}
          alt={photos.welcome.alt}
        />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
          {rooms.length === 0 && (
            <p className="text-center text-stone-500">
              Le date online saranno disponibili presto. Nel frattempo scrivici a{' '}
              <a className="text-green-700 underline underline-offset-4" href={`mailto:${siteConfig.author.email}`}>
                {siteConfig.author.email}
              </a>
              .
            </p>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {rooms.map((room) => (
              <Link
                key={room._id}
                href={`/rooms/${room.slug.current}`}
                className="group rounded-xl overflow-hidden border border-stone-200 hover:shadow-lg transition-shadow bg-white"
              >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={room.mainImage ? urlFor(room.mainImage).width(600).height(375).url() : photos.bedroom.src}
                      alt={room.mainImage ? room.name : photos.bedroom.alt}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 640px) 100vw, 50vw"
                    />
                  </div>
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
