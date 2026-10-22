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
