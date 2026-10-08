import Image from 'next/image';

import { Footer } from '@/components/Footer';
import { JsonLd } from '@/components/JsonLd';
import { Nav } from '@/components/Nav';
import { PortableTextRenderer } from '@/components/PortableText';
import { getYogaStudio } from '@/lib/data';
import { breadcrumbJsonLd, pageMetadata } from '@/lib/seo';
import { urlFor } from '@/sanity/image';

export const metadata = pageMetadata({
  title: 'Yoga Studio',
  path: '/yoga',
  description: 'Lo studio yoga di Villa Casa Mia: pratica immersa nella natura dei Colli Euganei ad Arquà Petrarca.',
});
export const revalidate = 60;

export default async function YogaPage() {
  const studio = await getYogaStudio();

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Yoga', path: '/yoga' },
        ])}
      />
      <Nav solid />

      <main id="main" className="pt-20">
        <header className="text-center px-4 py-12 sm:py-16">
          <h1 className="text-3xl sm:text-4xl font-bold text-stone-800">
            {studio?.title || 'Yoga Studio'}
          </h1>
          <p className="text-stone-500 mt-3 text-lg max-w-xl mx-auto">
            Pratica yoga immersa nella pace dei Colli Euganei.
          </p>
        </header>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-16">
          {studio?.mainImage && (
            <div className="relative aspect-[21/9] max-h-[400px] rounded-xl overflow-hidden mb-10">
              <Image
                src={urlFor(studio.mainImage).width(1400).height(600).url()}
                alt={studio.title || 'Yoga Studio'}
                fill
                className="object-cover"
                sizes="100vw"
              />
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Description */}
            <div className="lg:col-span-2">
              {studio?.description && (
                <PortableTextRenderer value={studio.description} />
              )}
              {!studio?.description && (
                <div className="prose prose-stone">
                  <p>
                    Il nostro studio yoga è uno spazio dedicato alla pratica e al
                    benessere, con vista panoramica sugli ulivi e i colli.
                    Offriamo sessioni per tutti i livelli, dalla meditazione
                    mattutina allo yoga dinamico.
                  </p>
                </div>
              )}
            </div>

            {/* Offerings */}
            <div className="lg:col-span-1">
              {studio?.offerings && studio.offerings.length > 0 && (
                <div className="rounded-xl border border-stone-200 bg-white p-5">
                  <h2 className="text-lg font-semibold text-stone-800 mb-4">
                    Le nostre offerte
                  </h2>
                  <div className="space-y-4">
                    {studio.offerings.map((offering) => (
                      <div key={offering._key} className="border-b border-stone-100 pb-3 last:border-0">
                        <h3 className="font-medium text-stone-800">{offering.name}</h3>
                        {offering.description && (
                          <p className="text-sm text-stone-500 mt-1">{offering.description}</p>
                        )}
                        <div className="flex gap-3 mt-1 text-xs text-stone-400">
                          {offering.duration && <span>{offering.duration}</span>}
                          {offering.price != null && (
                            <span className="text-green-700 font-medium">
                              &euro;{offering.price}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Gallery */}
          {studio?.gallery && studio.gallery.length > 0 && (
            <div className="mt-12">
              <h2 className="text-xl font-semibold text-stone-800 mb-4">Galleria</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                {studio.gallery.map((img, i) => (
                  <div key={i} className="relative aspect-square rounded-lg overflow-hidden">
                    <Image
                      src={urlFor(img).width(400).height(400).url()}
                      alt={`Yoga studio foto ${i + 1}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 50vw, 25vw"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}
