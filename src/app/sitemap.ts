import { MetadataRoute } from "next";
import partsData from "@/data/parts.json";
import { PartRecord } from "@/types/part";

export default function sitemap(): MetadataRoute.Sitemap {
  const parts: PartRecord[] = partsData;
  const baseUrl = "https://nowrongpart.com";

  // Generate dynamic URLs for all 60+ part cross-reference pages
  const partUrls: MetadataRoute.Sitemap = parts.map((part) => ({
    url: `${baseUrl}/parts/${part.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/buyers-guide`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...partUrls,
  ];
}
