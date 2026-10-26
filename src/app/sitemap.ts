import { MetadataRoute } from "next";
import partsData from "@/data/parts.json";
import modelsData from "@/data/models.json";
import { SITE_URL } from "@/lib/site";
import { PartRecord, ModelHubRecord } from "@/types/part";

export default function sitemap(): MetadataRoute.Sitemap {
  const parts: PartRecord[] = partsData;
  const models: ModelHubRecord[] = modelsData as ModelHubRecord[];

  return [
    { url: SITE_URL },
    { url: `${SITE_URL}/buyers-guide` },
    { url: `${SITE_URL}/mowers` },
    ...models.map((model) => ({ url: `${SITE_URL}/mowers/${model.slug}` })),
    ...parts.map((part) => ({ url: `${SITE_URL}/parts/${part.slug}` })),
  ];
}
