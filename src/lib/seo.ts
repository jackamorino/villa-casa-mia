import type { Metadata } from 'next';

import { siteConfig, SITE_URL } from './site';
import type { Post, Room } from './types';

const OG_IMAGE = '/assets/og-image.jpg';

interface PageMetaInput {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
}

/** Build per-page Metadata with canonical URL, OG + Twitter cards. */
export function pageMetadata({
  title,
  description = siteConfig.description,
  path = '/',
  image = OG_IMAGE,
  type = 'website',
  publishedTime,
}: PageMetaInput): Metadata {
  const url = `${SITE_URL}${path === '/' ? '' : path}`;
  const fullTitle = title
    ? `${title} · ${siteConfig.name}`
    : siteConfig.title;

  return {
    title: title || siteConfig.title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: siteConfig.name,
      type,
      locale: siteConfig.locale,
      ...(publishedTime ? { publishedTime } : {}),
      images: [
        image === OG_IMAGE
          ? { url: image, width: 1200, height: 630, alt: siteConfig.name }
          : { url: image, alt: siteConfig.name },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [image],
    },
  };
}

type JsonLd = Record<string, unknown>;

export function websiteJsonLd(): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    url: SITE_URL,
    inLanguage: 'it',
  };
}

export function localBusinessJsonLd(): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'LodgingBusiness',
    name: siteConfig.name,
    description: siteConfig.description,
    url: SITE_URL,
    address: {
      '@type': 'PostalAddress',
      addressLocality: siteConfig.location.name,
      addressRegion: siteConfig.location.region,
      addressCountry: 'IT',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: siteConfig.location.lat,
      longitude: siteConfig.location.lng,
    },
  };
}

export function roomJsonLd(room: Room): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'HotelRoom',
    name: room.name,
    description: room.tagline || '',
    url: `${SITE_URL}/rooms/${room.slug.current}`,
    occupancy: {
      '@type': 'QuantitativeValue',
      maxValue: room.maxGuests,
    },
    offers: {
      '@type': 'Offer',
      priceCurrency: 'EUR',
      price: room.pricePerNight,
      availability: 'https://schema.org/InStock',
    },
    containedInPlace: {
      '@type': 'LodgingBusiness',
      name: siteConfig.name,
      url: SITE_URL,
    },
  };
}

export function articleJsonLd(post: Post): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt || '',
    url: `${SITE_URL}/blog/${post.slug.current}`,
    datePublished: post.publishedAt,
    dateModified: post._updatedAt ?? post.publishedAt,
    author: { '@type': 'Organization', name: siteConfig.name },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/blog/${post.slug.current}`,
    },
  };
}

export function breadcrumbJsonLd(
  items: { name: string; path: string }[]
): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.path === '/' ? '' : item.path}`,
    })),
  };
}
