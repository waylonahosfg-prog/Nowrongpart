import { MetadataRoute } from 'next';
import partsData from '@/data/parts.json';
import { PartRecord } from '@/types/part';

export default function sitemap(): MetadataRoute.Sitemap {
  const parts: PartRecord[] = partsData;
  const baseUrl = 'https://nowrongpart.com';

  const partUrls = parts.map((part) => ({
    url: `${baseUrl}/parts/${part.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    ...partUrls,
  ];
}
