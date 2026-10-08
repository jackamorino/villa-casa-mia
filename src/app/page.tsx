import Image from 'next/image';
import Link from 'next/link';

import { Footer } from '@/components/Footer';
import { Nav } from '@/components/Nav';
import { PostCard } from '@/components/PostCard';
import { getRooms, getPosts, getSiteSettings } from '@/lib/data';
import { urlFor } from '@/sanity/image';
import { siteConfig } from '@/lib/site';

export const revalidate = 60;

export default async function HomePage() {
  const [rooms, posts, settings] = await Promise.all([
    getRooms(),
    getPosts(),
    getSiteSettings(),
  ]);

  const recentPosts = posts.slice(0, 3);

  return (
    <>
      <Nav />

      <main id="main">
        {/* Hero */}
        <section className="relative min-h-[85vh] flex items-end">
          {settings?.heroImage && (
            <Image
              src={urlFor(settings.heroImage).width(1920).height(1080).url()}
              alt="Villa Casa Mia"
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
          )}
          <div className="hero-overlay absolute inset-0" aria-hidden />
          <div className="relative z-10 w-full px-4 pb-16 sm:px-6 max-w-6xl mx-auto">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
              {siteConfig.name}
            </h1>
            <p className="text-lg sm:text-xl text-white/90 mt-3 max-w-xl">
              {settings?.tagline || siteConfig.tagline}
            </p>
            <div className="flex gap-3 mt-6">
              <Link
                href="/book"
                className="rounded-lg bg-green-700 text-white font-medium px-6 py-3 hover:bg-green-800 transition-colors"
              >
                Prenota ora
              </Link>
              <Link
                href="/rooms"
                className="rounded-lg bg-white/20 backdrop-blur text-white font-medium px-6 py-3 hover:bg-white/30 transition-colors"
              >
                Le camere
              </Link>
            </div>
          </div>
        </section>

        {/* Intro */}
        <section className="py-16 sm:py-20 px-4 sm:px-6 max-w-4xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-semibold text-stone-800">
            Benvenuti a Casa Mia
          </h2>
          <p className="text-stone-500 mt-4 text-lg leading-relaxed max-w-2xl mx-auto">
            {settings?.description || siteConfig.description}
          </p>
          <Link
            href="/story"
            className="inline-block mt-6 text-green-700 font-medium hover:text-green-800"
          >
            Scopri la nostra storia &rarr;
          </Link>
        </section>

        {/* Rooms preview */}
        {rooms.length > 0 && (
          <section className="py-16 bg-white px-4 sm:px-6">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-2xl sm:text-3xl font-semibold text-stone-800 text-center mb-10">
                Le nostre camere
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {rooms.map((room) => (
                  <Link
                    key={room._id}
                    href={`/rooms/${room.slug.current}`}
                    className="group rounded-xl overflow-hidden border border-stone-200 hover:shadow-lg transition-shadow"
                  >
                    {room.mainImage && (
                      <div className="relative aspect-[16/10] overflow-hidden">
                        <Image
                          src={urlFor(room.mainImage).width(600).height(375).url()}
                          alt={room.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                      </div>
                    )}
                    <div className="p-5">
                      <h3 className="text-lg font-semibold text-stone-800 group-hover:text-green-700 transition-colors">
                        {room.name}
                      </h3>
                      {room.tagline && (
                        <p className="text-sm text-stone-500 mt-1">{room.tagline}</p>
                      )}
                      <div className="flex items-center justify-between mt-3">
                        <span className="text-green-700 font-semibold">
                          &euro;{room.pricePerNight}
                          <span className="text-sm text-stone-400 font-normal"> / notte</span>
                        </span>
                        <span className="text-sm text-stone-400">
                          max {room.maxGuests} ospiti
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Direct booking value prop */}
        <section className="py-16 px-4 sm:px-6 bg-green-50">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl font-semibold text-stone-800">
              Prenota direttamente e risparmia
            </h2>
            <p className="text-stone-600 mt-4 text-lg leading-relaxed max-w-2xl mx-auto">
              Prenotando dal nostro sito risparmi il 5% rispetto ad Airbnb e Booking.com.
              Stesso servizio, prezzo migliore, contatto diretto con noi.
            </p>
            <Link
              href="/book"
              className="inline-block mt-6 rounded-lg bg-green-700 text-white font-medium px-6 py-3 hover:bg-green-800 transition-colors"
            >
              Verifica disponibilità
            </Link>
          </div>
        </section>

        {/* Blog preview */}
        {recentPosts.length > 0 && (
          <section className="py-16 px-4 sm:px-6 bg-white">
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl sm:text-3xl font-semibold text-stone-800">
                  Dal blog
                </h2>
                <Link
                  href="/blog"
                  className="text-green-700 text-sm font-medium hover:text-green-800"
                >
                  Tutti gli articoli &rarr;
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {recentPosts.map((post) => (
                  <PostCard key={post._id} post={post} showExcerpt />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </>
  );
}
