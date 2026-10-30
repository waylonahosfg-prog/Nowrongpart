import partsData from "@/data/parts.json";
import { PartRecord } from "@/types/part";

export interface DimensionGroup {
  slug: string;           // e.g., "5-8-x-135-5"
  width: string;          // e.g., "5/8 in"
  length: string;         // e.g., "135.5 in"
  cleanWidth: string;     // e.g., "5/8\""
  cleanLength: string;    // e.g., "135.5\""
  displayTitle: string;   // e.g., "5/8\" x 135.5\""
  industryCode: string;   // e.g., "B132 / 5L1355"
  sectionProfile: string; // e.g., "B-Section / 5L (5/8\" Top Width x 13/32\" Depth)"
  matchingParts: PartRecord[];
  brands: string[];
}

export function createDimensionSlug(width: string, length: string): string {
  const w = width.replace(" in", "").trim().replace(/\//g, "-").replace(/\./g, "-");
  const l = length.replace(" in", "").trim().replace(/\//g, "-").replace(/\./g, "-");
  return `${w}-x-${l}`;
}

export function getAllDimensionGroups(): DimensionGroup[] {
  const parts: PartRecord[] = partsData;
  const map = new Map<string, PartRecord[]>();

  for (const part of parts) {
    const slug = createDimensionSlug(part.specs.width, part.specs.length);
    if (!map.has(slug)) {
      map.set(slug, []);
    }
    map.get(slug)!.push(part);
  }

  const groups: DimensionGroup[] = [];

  for (const [slug, matchingParts] of map.entries()) {
    const sample = matchingParts[0];
    const rawW = sample.specs.width.replace(" in", "").trim();
    const rawL = sample.specs.length.replace(" in", "").trim();
    const numL = parseFloat(rawL);

    // Calculate approximate classical industrial V-Belt code (ID = OD - 3" for B-section, OD - 2" for A-section)
    const isFiveEighths = rawW.includes("5/8");
    const insideLength = isFiveEighths ? Math.max(20, Math.round(numL - 3)) : Math.max(20, Math.round(numL - 2));
    const fhpCode = isFiveEighths ? `5L${Math.round(numL * 10)}` : `4L${Math.round(numL * 10)}`;
    const classicalCode = isFiveEighths ? `B${insideLength}` : `A${insideLength}`;

    const brands = Array.from(new Set(matchingParts.map((p) => p.oemBrand)));

    groups.push({
      slug,
      width: sample.specs.width,
      length: sample.specs.length,
      cleanWidth: `${rawW}"`,
      cleanLength: `${rawL}"`,
      displayTitle: `${rawW}" × ${rawL}"`,
      industryCode: `${classicalCode} / ${fhpCode}`,
      sectionProfile: isFiveEighths
        ? "B-Section / 5L Commercial Profile (5/8\" Top Width, 13/32\" Thickness, 40° Wedge Angle)"
        : "A-Section / 4L Residential/Hydro Profile (1/2\" Top Width, 5/16\" Thickness, 40° Wedge Angle)",
      matchingParts,
      brands,
    });
  }

  return groups.sort((a, b) => parseFloat(a.length) - parseFloat(b.length));
}
