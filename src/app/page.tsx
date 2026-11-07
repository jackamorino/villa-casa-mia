import Image from 'next/image';
import Link from 'next/link';

import { Footer } from '@/components/Footer';
import { Nav } from '@/components/Nav';
import { getRooms, getSiteSettings } from '@/lib/data';
import { guides } from '@/lib/guides';
import { pageMetadata } from '@/lib/seo';
import { urlFor } from '@/sanity/image';

export const metadata = pageMetadata({
  title: 'Soggiorni ad Arquà Petrarca, tra i Colli Euganei',
  description:
    'Villa Casa Mia ad Arquà Petrarca: appartamenti con travi a vista e muri in pietra, yoga e una guida ai Colli Euganei. Prenota direttamente il tuo soggiorno.',
});
export const revalidate = 60;

/** Local photographs from the property, used when Sanity has no image. */
const roomFallbackPhotos = ['/photos/bedroom.jpg', '/photos/living.jpg'];

const features = [
  {
    title: 'Benvenuto incluso',
    text: 'Vino, snack, pasta e sugo, caffè, tè e olio locale ad attenderti.',
  },
  {
    title: 'Cucina completa',
    text: 'Piano in marmo, lavastoviglie, forno e tutto per cucinare con calma.',
  },
  {
    title: 'Comfort moderno',
    text: 'Aria condizionata, wifi, lavatrice e asciugatrice.',
  },
  {
    title: 'Accoglienza di Annalisa',
    text: 'Quattordici anni di ospitalità e consigli personali sul territorio.',
  },
];

const gallery = [
  { src: '/photos/kitchen.jpg', alt: 'Cucina con travi in legno e piano bianco' },
  { src: '/photos/bath.jpg', alt: 'Bagno con lavabo in pietra e specchio tondo' },
  { src: '/photos/terrace.jpg', alt: 'Terrazzo con tavolino in ferro battuto accanto alla facciata' },
  { src: '/photos/welcome.jpg', alt: 'Benvenuto: vino, pasta e caffè sul piano della cucina' },
];

export default async function HomePage() {
  // If the CMS is unreachable (or not configured locally) the page still renders
  // with the local property photos instead of failing.
  const [rooms, settings] = await Promise.all([
    getRooms().catch(() => []),
    getSiteSettings().catch(() => null),
  ]);

  return (
    <>
      <Nav />
      <main id="main">
        {settings?.heroImage ? (
        <section className="luce-hero">
          <Image
            src={urlFor(settings.heroImage).width(2400).url()}
            alt="Villa Casa Mia ad Arquà Petrarca"
            fill
            priority
            sizes="100vw"
          />
          <div className="luce-hero-shade" />
          <div className="luce-hero-copy">
            <div>
              <p className="eyebrow">Arquà Petrarca · Colli Euganei</p>
              <h1>
                Il lusso di sentirsi <em>a casa.</em>
              </h1>
            </div>
            <div className="luce-hero-actions">
              <Link className="button" href="/book">
                Verifica disponibilità
              </Link>
              <Link className="button button-outline-light" href="/rooms">
                Gli appartamenti
              </Link>
            </div>
          </div>
        </section>
        ) : (
        /* The property photos are portrait, so without a wide Sanity hero image
           the photo sits beside the headline at full height instead of being cropped. */
        <section className="luce-hero-split">
          <div className="luce-hero-split-copy">
            <p className="eyebrow">Arquà Petrarca · Colli Euganei</p>
            <h1>
              Il lusso di sentirsi <em>a casa.</em>
            </h1>
            <p>
              Un appartamento restaurato ai piedi del borgo di Petrarca: travi a vista, muri in
              pietra e i Colli Euganei fuori dalla finestra.
            </p>
            <div className="luce-hero-actions">
              <Link className="button" href="/book">
                Verifica disponibilità
              </Link>
              <Link className="under-link" href="/rooms">
                Gli appartamenti
              </Link>
            </div>
          </div>
          <div className="luce-hero-split-photo">
            <Image
              src="/photos/dusk.jpg"
              alt="La facciata di Villa Casa Mia illuminata all'imbrunire"
              fill
              priority
              sizes="(max-width: 900px) 100vw, 45vw"
            />
          </div>
        </section>
        )}

        <section className="luce-intro wrap">
          <div>
            <div className="rule" />
            <h2>
              Travi a vista, pietra antica,
              <br />
              <em>silenzio dei colli.</em>
            </h2>
          </div>
          <div>
            <p>
              Ai piedi di Arquà Petrarca, uno dei borghi più belli d’Italia, la tradizione
              incontra il comfort di oggi. Muri in pietra, travi in legno e dettagli curati
              creano un’atmosfera calda e raffinata.
            </p>
            <p>
              Al tuo arrivo trovi vino, pasta, caffè e olio del territorio: una piccola scorta
              per sentirti subito a casa.
            </p>
            <Link className="under-link" href="/story">
              La nostra storia
            </Link>
          </div>
        </section>

        <section className="luce-rooms wrap" aria-labelledby="rooms-title">
          <div className="section-heading">
            <h2 id="rooms-title">Gli appartamenti</h2>
            <Link className="under-link" href="/rooms">
              Vedi tutti
            </Link>
          </div>
          <div className="room-grid">
            {rooms.length > 0 ? (
              rooms.map((room, i) => (
                <Link className={rooms.length === 1 ? "room-card room-card-wide" : "room-card"} key={room._id} href={`/rooms/${room.slug.current}`}>
                  <div className="room-image">
                    <Image
                      src={
                        room.mainImage
                          ? urlFor(room.mainImage).width(1000).height(1250).url()
                          : roomFallbackPhotos[i % roomFallbackPhotos.length]
                      }
                      alt={room.name}
                      fill
                      sizes="(max-width: 760px) 100vw, 50vw"
                    />
                  </div>
                  <div className="room-meta">
                    <div>
                      <h3>{room.name}</h3>
                      <p>
                        {room.tagline ||
                          `Fino a ${room.maxGuests} ospiti · Arquà Petrarca`}
                      </p>
                    </div>
                    {room.pricePerNight > 0 && (
                      <span className="room-price">da €{room.pricePerNight} / notte</span>
                    )}
                  </div>
                </Link>
              ))
            ) : (
              <Link className="room-card room-card-wide" href="/book">
                <div className="room-image">
                  <Image
                    src="/photos/bedroom.jpg"
                    alt="Camera con letto king size e soffitto con travi in legno"
                    fill
                    sizes="(max-width: 760px) 100vw, 50vw"
                  />
                </div>
                <div className="room-meta">
                  <div>
                    <h3>Primo Piano</h3>
                    <p>3 ospiti · 1 camera · letto king + divano letto · 1 bagno</p>
                  </div>
                  <span className="room-price">Verifica le date</span>
                </div>
              </Link>
            )}
          </div>
        </section>

        <section className="luce-features" aria-label="Cosa è incluso">
          <div className="wrap feature-grid">
            {features.map((f, i) => (
              <div key={f.title}>
                <p className="feature-num">0{i + 1}</p>
                <h3>{f.title}</h3>
                <p>{f.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="luce-gallery wrap" aria-label="Galleria">
          <div className="gallery-grid">
            {gallery.map((g) => (
              <div className="gallery-item" key={g.src}>
                <Image src={g.src} alt={g.alt} fill sizes="(max-width: 900px) 50vw, 25vw" />
              </div>
            ))}
          </div>
        </section>

        <section className="luce-banner">
          <Image
            src="/photos/sunset.jpg"
            alt="Cielo rosso al tramonto sui Colli Euganei"
            fill
            sizes="100vw"
          />
          <div className="luce-banner-shade" />
          <div className="luce-banner-copy">
            <p className="eyebrow">I dintorni</p>
            <h2>
              Borghi, sentieri, terme.
              <br />
              <em>Tutto a pochi passi.</em>
            </h2>
            <nav className="banner-links" aria-label="Guide ai dintorni">
              {guides.slice(0, 3).map((g) => (
                <Link key={g.slug} href={`/explore/${g.slug}`}>
                  {g.title}
                </Link>
              ))}
            </nav>
            <Link className="button button-outline-light" href="/explore">
              Esplora i Colli Euganei
            </Link>
          </div>
        </section>

        <section className="luce-closing wrap">
          <p className="eyebrow">Ci vediamo ad Arquà</p>
          <h2>
            Le cose belle hanno
            <br />
            un <em>ritmo diverso.</em>
          </h2>
          <p>
            Prenotando direttamente risparmi il 5% e parli subito con chi ti ospita. C’è anche uno studio yoga, se vuoi rallentare ancora un po’.
          </p>
          <Link className="button" href="/book">
            Organizza il tuo soggiorno
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
