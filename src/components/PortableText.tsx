import { PortableText as SanityPortableText, type PortableTextComponents } from '@portabletext/react';
import type { PortableTextBlock } from '@portabletext/react';
import Image from 'next/image';

import { urlFor } from '@/sanity/image';

const components: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      if (!value?.asset) return null;
      return (
        <figure className="my-6">
          <Image
            src={urlFor(value).width(800).url()}
            alt={value.alt || ''}
            width={800}
            height={500}
            className="rounded-lg w-full h-auto"
            sizes="(max-width: 800px) 100vw, 800px"
          />
          {value.caption && (
            <figcaption className="text-sm text-stone-400 text-center mt-2">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
  },
  block: {
    h2: ({ children }) => (
      <h2 className="text-2xl font-semibold text-stone-800 mt-8 mb-3">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl font-semibold text-stone-800 mt-6 mb-2">{children}</h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-green-600 pl-4 italic text-stone-600 my-4">
        {children}
      </blockquote>
    ),
  },
  marks: {
    link: ({ children, value }) => (
      <a
        href={value?.href}
        className="text-green-700 underline hover:text-green-800"
        target={value?.href?.startsWith('http') ? '_blank' : undefined}
        rel={value?.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
      >
        {children}
      </a>
    ),
  },
};

export function PortableTextRenderer({ value }: { value: PortableTextBlock[] }) {
  return (
    <div className="prose prose-stone max-w-none leading-relaxed">
      <SanityPortableText value={value} components={components} />
    </div>
  );
}
