import Image from 'next/image';
import Link from 'next/link';

import { Footer } from '@/components/Footer';
import { JsonLd } from '@/components/JsonLd';
import { Nav } from '@/components/Nav';
import { PageHero } from '@/components/PageHero';
import { photos } from '@/lib/photos';
import { breadcrumbJsonLd, pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'La Storia',
  path: '/story',
  description: 'La storia di Villa Casa Mia: come una villa abbandonata sui Colli Euganei è rinata ad Arquà Petrarca.',
});

export default function StoryPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'La Storia', path: '/story' },
        ])}
      />
      <Nav solid />

      <main id="main">
        <PageHero
          eyebrow="La nostra storia"
          title={<>La storia di <em>Casa Mia.</em></>}
          intro="Come una villa dimenticata tra gli ulivi dei Colli Euganei è diventata la nostra casa, e la vostra."
          image={photos.terrace.src}
          alt={photos.terrace.alt}
        />

        {/*
          Placeholder copy. The full story will come from Sanity (a "story"
          document or blog posts tagged "villa-story").
        */}
        <section className="page-section wrap">
          <div className="story-grid">
            <figure className="story-figure">
              <Image src={photos.dining.src} alt={photos.dining.alt} fill sizes="(max-width: 900px) 100vw, 50vw" />
            </figure>
            <div className="prose-luce">
              <div className="rule" />
              <h2>
                Una villa da <em>far rinascere.</em>
              </h2>
              <p>
                Villa Casa Mia sorge nel cuore dei Colli Euganei, ad Arquà Petrarca, uno dei borghi
                più belli d’Italia. La nostra avventura è iniziata quando abbiamo trovato questa villa
                in stato di abbandono e abbiamo deciso di restituirle la vita che meritava.
              </p>
            </div>
          </div>

          <div className="story-grid">
            <div className="prose-luce">
              <div className="rule" />
              <h2>
                Ogni pietra <em>racconta.</em>
              </h2>
              <p>
                Ogni ulivo nel giardino è testimone di secoli di storia. La ristrutturazione ha
                preservato l’anima della casa, integrando comfort moderni con il rispetto per la
                tradizione.
              </p>
              <p>
                Seguici sul <Link href="/blog">blog</Link> per scoprire il diario della costruzione, le
                scoperte fatte durante i lavori e i segreti di questa terra.
              </p>
            </div>
            <figure className="story-figure">
              <Image src={photos.garden.src} alt={photos.garden.alt} fill sizes="(max-width: 900px) 100vw, 50vw" />
            </figure>
          </div>
        </section>

        <section className="luce-closing wrap">
          <p className="eyebrow">Ci vediamo ad Arquà</p>
          <h2>
            Vieni a vedere <em>com’è oggi.</em>
          </h2>
          <Link className="button" href="/rooms">
            Gli appartamenti
          </Link>
        </section>
      </main>

      <Footer />
    </>
  );
}
