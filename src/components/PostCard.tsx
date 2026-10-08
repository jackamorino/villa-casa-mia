import Image from 'next/image';
import Link from 'next/link';

import { urlFor } from '@/sanity/image';
import { categoryLabel } from '@/lib/site';
import type { Post } from '@/lib/types';

export function PostCard({
  post,
  showExcerpt = false,
}: {
  post: Post;
  showExcerpt?: boolean;
}) {
  return (
    <Link
      href={`/blog/${post.slug.current}`}
      className="group block rounded-xl overflow-hidden border border-stone-200 hover:shadow-md transition-shadow"
    >
      {post.mainImage && (
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image
            src={urlFor(post.mainImage).width(600).height(375).url()}
            alt={post.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 700px) 100vw, 33vw"
          />
        </div>
      )}
      <div className="p-4">
        {post.categories?.[0] && (
          <span className="text-xs font-medium text-green-700 uppercase tracking-wide">
            {categoryLabel(post.categories[0])}
          </span>
        )}
        <h3 className="text-base font-semibold text-stone-800 mt-1 group-hover:text-green-700 transition-colors">
          {post.title}
        </h3>
        {showExcerpt && post.excerpt && (
          <p className="text-sm text-stone-500 mt-1 line-clamp-2">{post.excerpt}</p>
        )}
      </div>
    </Link>
  );
}
