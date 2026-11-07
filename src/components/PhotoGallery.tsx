import Image from 'next/image';

import type { Photo } from '@/lib/photos';

/** Staggered four-column photo row used on the homepage and inner pages. */
export function PhotoGallery({ items, label = 'Galleria' }: { items: readonly Photo[]; label?: string }) {
  return (
    <div className="gallery-grid" role="group" aria-label={label}>
      {items.map((p) => (
        <div className="gallery-item" key={p.src}>
          <Image src={p.src} alt={p.alt} fill sizes="(max-width: 900px) 50vw, 25vw" />
        </div>
      ))}
    </div>
  );
}
