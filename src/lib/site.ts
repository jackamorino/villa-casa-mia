/**
 * Central site configuration. Values here drive metadata, JSON-LD, nav and footer.
 */

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || 'https://villacasamiaitalia.com'
).replace(/\/$/, '');

export const siteConfig = {
  name: 'Villa Casa Mia',
  wordmark: 'VILLA CASA MIA',
  title: 'Villa Casa Mia — Arquà Petrarca',
  tagline: 'La tua casa sui Colli Euganei',
  description:
    'Villa Casa Mia: soggiorna tra gli ulivi dei Colli Euganei ad Arquà Petrarca. Due camere esclusive, studio yoga e la storia di una villa rinata.',
  author: {
    name: 'Villa Casa Mia',
    email: 'info@villacasamiaitalia.com',
  },
  url: SITE_URL,
  copyright: `Villa Casa Mia © ${new Date().getFullYear()}`,
  locale: 'it-IT',
  location: {
    name: 'Arquà Petrarca',
    region: 'Veneto',
    country: 'Italy',
    lat: 45.2709,
    lng: 11.7175,
  },
} as const;

export const navLinks: { href: string; label: string }[] = [
  { href: '/rooms', label: 'Camere' },
  { href: '/story', label: 'La Storia' },
  { href: '/yoga', label: 'Yoga' },
  { href: '/blog', label: 'Blog' },
];

export const ctaLink = { href: '/book', label: 'Prenota' };

/**
 * Blog post categories — matching the Sanity schema's categories list.
 */
export const categories = {
  'villa-story': 'La Villa',
  'local-guide': 'Guida Locale',
  yoga: 'Yoga',
  'food-wine': 'Cibo & Vino',
  events: 'Eventi',
} as const;

export type CategoryKey = keyof typeof categories;

export function categoryLabel(cat?: string | null): string {
  if (!cat) return '';
  return (categories as Record<string, string>)[cat] ?? cat;
}
