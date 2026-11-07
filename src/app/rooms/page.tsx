import Image from 'next/image';
import Link from 'next/link';

import { Footer } from '@/components/Footer';
import { JsonLd } from '@/components/JsonLd';
import { Nav } from '@/components/Nav';
import { PageHero } from '@/components/PageHero';
import { PhotoGallery } from '@/components/PhotoGallery';
import { getRooms } from '@/lib/data';
import { photos } from '@/lib/photos';
import { breadcrumbJsonLd, pageMetadata } from '@/lib/seo';
import { urlFor } from '@/sanity/image';

export const metadata = pageMetadata({
  title: 'Gli Appartamenti',
  path: '/rooms',
  description: 'Gli appartamenti di Villa Casa Mia ad Arquà Petrarca: comfort, vista sui Colli Euganei e prenotazione diretta con sconto.',
});
export const revalidate = 60;

const roomFallbackPhotos = [photos.bedroom, photos.living];

export default async function RoomsPage() {
  const rooms = await getRooms().catch(() => []);

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Appartamenti', path: '/rooms' },
        ])}
      />
      <Nav solid />

      <main id="main">
        <PageHero
          eyebrow="Gli appartamenti"
          title={<>Spazio per <em>stare bene.</em></>}
          intro="Travi in larice, muri in pietra a vista e una cucina completa, ai piedi del borgo di Arquà Petrarca."
          image={photos.living.src}
          alt={photos.living.alt}
        />

        <section className="page-section wrap" aria-label="Elenco appartamenti">
          <div className="room-grid">
            {rooms.length > 0 ? (
              rooms.map((room, i) => {
                const fallback = roomFallbackPhotos[i % roomFallbackPhotos.length];
                return (
                  <Link
                    key={room._id}
                    href={`/rooms/${room.slug.current}`}
                    className={rooms.length === 1 ? 'room-card room-card-wide' : 'room-card'}
                  >
                    <div className="room-image">
                      <Image
                        src={room.mainImage ? urlFor(room.mainImage).width(1000).height(1250).url() : fallback.src}
                        alt={room.mainImage ? room.name : fallback.alt}
                        fill
                        sizes="(max-width: 760px) 100vw, 50vw"
                      />
                    </div>
                    <div className="room-meta">
                      <div>
                        <h2>{room.name}</h2>
                        <p>
                          {room.tagline ? `${room.tagline} · ` : ''}max {room.maxGuests} ospiti · min{' '}
                          {room.minNights} notti
                        </p>
                        {room.amenities && room.amenities.length > 0 && (
                          <ul className="room-amenities">
                            {room.amenities.slice(0, 5).map((a) => (
                              <li key={a}>{a}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                      <span className="room-price">da €{room.pricePerNight} / notte</span>
                    </div>
                  </Link>
                );
              })
            ) : (
              <Link className="room-card room-card-wide" href="/book">
                <div className="room-image">
                  <Image src={photos.bedroom.src} alt={photos.bedroom.alt} fill sizes="(max-width: 760px) 100vw, 50vw" />
                </div>
                <div className="room-meta">
                  <div>
                    <h2>Primo Piano</h2>
                    <p>3 ospiti · 1 camera · letto king + divano letto · 1 bagno</p>
                    <ul className="room-amenities">
                      <li>Cucina completa</li>
                      <li>Aria condizionata</li>
                      <li>Wifi</li>
                      <li>Lavatrice e asciugatrice</li>
                    </ul>
                  </div>
                  <span className="room-price">Verifica le date</span>
                </div>
              </Link>
            )}
          </div>
        </section>

        <section className="page-section page-section-tint" aria-labelledby="tour-title">
          <div className="wrap">
            <div className="section-heading">
              <h2 id="tour-title">
                La casa, <em>stanza per stanza.</em>
              </h2>
            </div>
            <PhotoGallery
              label="Foto dell'appartamento"
              items={[photos.bedroom, photos.dining, photos.kitchen, photos.bath]}
            />
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
