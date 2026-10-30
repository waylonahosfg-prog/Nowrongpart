import { MetadataRoute } from "next";
import partsData from "@/data/parts.json";
import modelsData from "@/data/models.json";
import { getAllDimensionGroups } from "@/lib/dimensions";
import { guidesData } from "@/app/guides/[slug]/page";
import { PartRecord, ModelHubRecord } from "@/types/part";

export default function sitemap(): MetadataRoute.Sitemap {
  const parts: PartRecord[] = partsData;
  const models: ModelHubRecord[] = modelsData as ModelHubRecord[];
  const dimensions = getAllDimensionGroups();
  const baseUrl = "https://nowrongpart.com";

  // 1. 100 Individual Part Pages
  const partUrls: MetadataRoute.Sitemap = parts.map((part) => ({
    url: `${baseUrl}/parts/${part.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  // 2. 15 Complete Mower Model Maintenance Hubs
  const modelUrls: MetadataRoute.Sitemap = models.map((model) => ({
    url: `${baseUrl}/mowers/${model.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  // 3. 65+ Dimensional Belt Size Lookup Pages
  const sizeUrls: MetadataRoute.Sitemap = dimensions.map((dim) => ({
    url: `${baseUrl}/size/${dim.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.85,
  }));

  // 4. 3 Mechanic Troubleshooting & Diagnostic Guides
  const guideUrls: MetadataRoute.Sitemap = guidesData.map((guide) => ({
    url: `${baseUrl}/guides/${guide.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
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
    ...guideUrls,
    ...modelUrls,
    ...sizeUrls,
    ...partUrls,
  ];
}
