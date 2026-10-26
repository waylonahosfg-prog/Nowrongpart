import { MetadataRoute } from "next";
import partsData from "@/data/parts.json";
import modelsData from "@/data/models.json";
import { PartRecord, ModelHubRecord } from "@/types/part";

export default function sitemap(): MetadataRoute.Sitemap {
  const parts: PartRecord[] = partsData;
  const models: ModelHubRecord[] = modelsData as ModelHubRecord[];
  const baseUrl = "https://nowrongpart.com";

  // 1. Generate URLs for all 100 individual part specification pages
  const partUrls: MetadataRoute.Sitemap = parts.map((part) => ({
    url: `${baseUrl}/parts/${part.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  // 2. Generate URLs for all 15 Mower Model Maintenance Hubs
  const modelUrls: MetadataRoute.Sitemap = models.map((model) => ({
    url: `${baseUrl}/mowers/${model.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.9,
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
    ...modelUrls,
    ...partUrls,
  ];
}
