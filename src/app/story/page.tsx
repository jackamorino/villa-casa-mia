import { Footer } from '@/components/Footer';
import { JsonLd } from '@/components/JsonLd';
import { Nav } from '@/components/Nav';
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

      <main id="main" className="pt-20">
        <header className="text-center px-4 py-12 sm:py-16 max-w-3xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold text-stone-800">
            La storia di Casa Mia
          </h1>
          <p className="text-stone-500 mt-4 text-lg leading-relaxed">
            Come una villa dimenticata tra gli ulivi dei Colli Euganei è diventata
            la nostra casa — e la vostra.
          </p>
        </header>

        <article className="max-w-3xl mx-auto px-4 sm:px-6 pb-16 prose prose-stone">
          {/*
            This is a placeholder. The actual story content will come from Sanity CMS.
            For now, we show a static teaser. Once Sanity is set up, this page
            will fetch content from a "story" document type or from blog posts
            tagged with the "villa-story" category.
          */}
          <p>
            Villa Casa Mia sorge nel cuore dei Colli Euganei, ad Arquà Petrarca —
            uno dei borghi più belli d&apos;Italia. La nostra avventura è iniziata
            quando abbiamo trovato questa villa in stato di abbandono e abbiamo
            deciso di restituirle la vita che meritava.
          </p>
          <p>
            Ogni pietra racconta una storia. Ogni ulivo nel giardino è testimone
            di secoli di storia. La ristrutturazione ha preservato l&apos;anima
            della casa, integrando comfort moderni con il rispetto per la
            tradizione.
          </p>
          <p>
            Seguici sul <a href="/blog" className="text-green-700 hover:text-green-800">blog</a> per
            scoprire il diario della costruzione, le scoperte fatte durante i lavori
            e i segreti di questa terra meravigliosa.
          </p>
        </article>
      </main>

      <Footer />
    </>
  );
}
