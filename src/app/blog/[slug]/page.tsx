import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { Footer } from '@/components/Footer';
import { JsonLd } from '@/components/JsonLd';
import { Nav } from '@/components/Nav';
import { PostCard } from '@/components/PostCard';
import { PortableTextRenderer } from '@/components/PortableText';
import { getPost, getPostSlugs, getRelatedPosts } from '@/lib/data';
import { articleJsonLd, breadcrumbJsonLd, pageMetadata } from '@/lib/seo';
import { categoryLabel } from '@/lib/site';
import { urlFor } from '@/sanity/image';

export const revalidate = 60;

export async function generateStaticParams() {
  const slugs = await getPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return pageMetadata({ title: 'Non trovato', path: `/blog/${slug}` });
  return pageMetadata({
    title: post.seo?.metaTitle || post.title,
    description: post.seo?.metaDescription || post.excerpt,
    path: `/blog/${post.slug.current}`,
    image: post.mainImage ? urlFor(post.mainImage).width(1200).height(630).url() : undefined,
    type: 'article',
    publishedTime: post.publishedAt,
  });
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const related = await getRelatedPosts(slug);

  return (
    <>
      <JsonLd
        data={[
          articleJsonLd(post),
          breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'Blog', path: '/blog' },
            { name: post.title, path: `/blog/${post.slug.current}` },
          ]),
        ]}
      />
      <Nav solid />

      <main id="main" className="pt-20">
        {/* Article header */}
        <header className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
          <Link href="/blog" className="text-sm text-green-700 hover:text-green-800">
            &larr; Tutti gli articoli
          </Link>
          {post.categories?.[0] && (
            <span className="block text-xs font-medium text-green-700 uppercase tracking-wide mt-4">
              {categoryLabel(post.categories[0])}
            </span>
          )}
          <h1 className="text-3xl sm:text-4xl font-bold text-stone-800 mt-2 leading-tight">
            {post.title}
          </h1>
          {post.excerpt && (
            <p className="text-lg text-stone-500 mt-3">{post.excerpt}</p>
          )}
          <time
            dateTime={post.publishedAt}
            className="block text-sm text-stone-400 mt-3"
          >
            {new Date(post.publishedAt).toLocaleDateString('it-IT', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </time>
        </header>

        {/* Cover image */}
        {post.mainImage && (
          <div className="max-w-4xl mx-auto px-4 sm:px-6 mb-10">
            <div className="relative aspect-[16/9] rounded-xl overflow-hidden">
              <Image
                src={urlFor(post.mainImage).width(1200).height(675).url()}
                alt={post.title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 900px) 100vw, 900px"
              />
            </div>
          </div>
        )}

        {/* Body */}
        {post.body && (
          <article className="max-w-3xl mx-auto px-4 sm:px-6 pb-12">
            <PortableTextRenderer value={post.body} />
          </article>
        )}

        {/* Related posts */}
        {related.length > 0 && (
          <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-16">
            <h2 className="text-xl font-semibold text-stone-800 mb-6">
              Articoli correlati
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((p) => (
                <PostCard key={p._id} post={p} />
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </>
  );
}
