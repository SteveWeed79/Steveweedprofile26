import type { MetadataRoute } from 'next';
import { caseStudyRoutes } from '@/data/projects';

const SITE_URL = 'https://www.swbuild.dev';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: 'monthly', priority: 1 },
    { url: `${SITE_URL}/work`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    ...caseStudyRoutes.map((route) => ({
      url: `${SITE_URL}${route}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  ];
}
