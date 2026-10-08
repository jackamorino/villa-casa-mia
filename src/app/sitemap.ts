import type { MetadataRoute } from 'next';

import { getPostSlugs, getRoomSlugs } from '@/lib/data';
import { SITE_URL } from '@/lib/site';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [roomSlugs, postSlugs] = await Promise.all([
    getRoomSlugs(),
    getPostSlugs(),
  ]);

  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${SITE_URL}/rooms`, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE_URL}/book`, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE_URL}/yoga`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/story`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${SITE_URL}/blog`, changeFrequency: 'daily', priority: 0.8 },
  ];

  const roomPages: MetadataRoute.Sitemap = roomSlugs.map((slug) => ({
    url: `${SITE_URL}/rooms/${slug}`,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const postPages: MetadataRoute.Sitemap = postSlugs.map((slug) => ({
    url: `${SITE_URL}/blog/${slug}`,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...staticPages, ...roomPages, ...postPages];
}
