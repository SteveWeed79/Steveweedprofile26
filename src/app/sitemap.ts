import type { MetadataRoute } from 'next';

const SITE_URL = 'https://steveweed.dev';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: 'monthly', priority: 1 },
    { url: `${SITE_URL}/ktxz`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/foresight`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
  ];
}
