import Image from 'next/image';
import type { ReactNode } from 'react';

/**
 * Inner-page header in the Luce style: headline on white beside a
 * full-height portrait photograph (the property photos are all portrait).
 */
export function PageHero({
  eyebrow,
  title,
  intro,
  image,
  alt,
  children,
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  image: string;
  alt: string;
  children?: ReactNode;
}) {
  return (
    <section className="luce-hero-split page-hero">
      <div className="luce-hero-split-copy">
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h1>{title}</h1>
        {intro && <p>{intro}</p>}
        {children}
      </div>
      <div className="luce-hero-split-photo">
        <Image src={image} alt={alt} fill priority sizes="(max-width: 900px) 100vw, 45vw" />
      </div>
    </section>
  );
}
