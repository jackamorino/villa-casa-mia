import { Footer } from '@/components/Footer';
import { JsonLd } from '@/components/JsonLd';
import { Nav } from '@/components/Nav';
import { PostCard } from '@/components/PostCard';
import { getPosts } from '@/lib/data';
import { breadcrumbJsonLd, pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Blog',
  path: '/blog',
  description: 'Il blog di Villa Casa Mia: storie dalla costruzione, guide locali su Arquà Petrarca e i Colli Euganei, yoga, cibo e vino.',
});
export const revalidate = 60;

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Blog', path: '/blog' },
        ])}
      />
      <Nav solid />

      <main id="main" className="pt-20">
        <header className="text-center px-4 py-12 sm:py-16">
          <h1 className="text-3xl sm:text-4xl font-bold text-stone-800">Blog</h1>
          <p className="text-stone-500 mt-3 text-lg max-w-xl mx-auto">
            Storie dalla villa, guide per esplorare il territorio e consigli
            per vivere al meglio i Colli Euganei.
          </p>
        </header>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-16">
          {posts.length === 0 && (
            <p className="text-center text-stone-500">
              I primi articoli arriveranno presto. Torna a trovarci!
            </p>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <PostCard key={post._id} post={post} showExcerpt />
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
