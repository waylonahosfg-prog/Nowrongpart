export interface CrossReference {
  brand: string;
  partNumber: string;
  notes: string;
}

export interface PartSpecs {
  length: string;
  width: string;
  material: string;
}

export interface PartRecord {
  slug: string;
  oemBrand: string;
  oemPartNumber: string;
  partType: string;
  specs: PartSpecs;
  compatibleModels: string[];
  crossReferences: CrossReference[];
}

export interface BladeSpec {
  oemPartNumber: string;
  aftermarketCross: string;
  quantityRequired: number;
  length: string;
  centerHole: string;
  width: string;
}

export interface ModelHubRecord {
  slug: string;
  brand: string;
  modelName: string;
  deckSize: string;
  machineCategory: "Zero-Turn" | "Stand-On" | "Walk-Behind" | "Lawn Tractor";
  engineOptions: string[];
  deckBeltSlug: string;
  deckBeltOem: string;
  deckBeltDimensions: string;
  pumpBeltSlug?: string;
  pumpBeltOem?: string;
  pumpBeltDimensions?: string;
  bladeSpecs: BladeSpec;
  hydroFilterOem?: string;
  hydroFilterCross?: string;
  maintenanceNotes: string;
}
