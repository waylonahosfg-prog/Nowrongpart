import partsData from "@/data/parts.json";
import modelsData from "@/data/models.json";
import { notFound } from "next/navigation";
import Link from "next/link";
import AffiliateDisclosure from "@/components/AffiliateDisclosure";
import {
  ExternalLink,
  ArrowLeft,
  ArrowRight,
  ChevronRight,
  Home,
  Tractor,
} from "lucide-react";
import type { Metadata } from "next";
import { PartRecord, ModelHubRecord } from "@/types/part";
import { SITE_URL } from "@/lib/site";

export async function generateStaticParams() {
  const parts: PartRecord[] = partsData;
  return parts.map((part) => ({
    slug: part.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const part = (partsData as PartRecord[]).find((p) => p.slug === slug);
  if (!part) return { title: "Part Not Found" };

  return {
    title: `${part.oemBrand} ${part.oemPartNumber} Cross-References & Measurements | NoWrongPart`,
    description: `Listed measurements (${part.specs.length} x ${part.specs.width}) and current cross-references for ${part.oemBrand} part #${part.oemPartNumber} (${part.partType}). Verify fitment against the exact machine and parts manual before ordering.`,
    alternates: {
      canonical: `/parts/${part.slug}`,
    },
    openGraph: {
      title: `${part.oemBrand} #${part.oemPartNumber} ${part.partType} Specs`,
      description: `Current database cross-references and listed measurements for ${part.oemBrand} ${part.oemPartNumber}.`,
      url: `${SITE_URL}/parts/${part.slug}`,
      siteName: "NoWrongPart",
      type: "website",
    },
  };
}

export default async function PartDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const allParts = partsData as PartRecord[];
  const allModels = modelsData as ModelHubRecord[];
  const part = allParts.find((p) => p.slug === slug);

  if (!part) return notFound();

  // Only link mower records that explicitly reference this part as a deck or pump belt.
  const matchingMowerHubs = allModels.filter(
    (m) =>
      m.deckBeltSlug === part.slug ||
      m.pumpBeltSlug === part.slug
  );

  // Sibling parts from the same brand
  let relatedParts = allParts.filter(
    (p) => p.oemBrand.toLowerCase() === part.oemBrand.toLowerCase() && p.slug !== part.slug
  );

  if (relatedParts.length < 3) {
    const additional = allParts.filter(
      (p) =>
        p.partType === part.partType &&
        p.slug !== part.slug &&
        !relatedParts.some((r) => r.slug === p.slug)
    );
    relatedParts = [...relatedParts, ...additional].slice(0, 4);
  } else {
    relatedParts = relatedParts.slice(0, 4);
  }

  const baseUrl = SITE_URL;

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": `${part.oemBrand} OEM #${part.oemPartNumber} ${part.partType}`,
    "description": `Part reference and cross-reference information currently listed for ${part.oemBrand} ${part.oemPartNumber}.`,
    "brand": {
      "@type": "Brand",
      "name": part.oemBrand,
    },
    "sku": part.oemPartNumber,
    "mpn": part.oemPartNumber,
    "category": part.partType,
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": baseUrl,
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": part.oemBrand,
        "item": `${baseUrl}/?brand=${encodeURIComponent(part.oemBrand.toLowerCase())}`,
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": `${part.oemBrand} #${part.oemPartNumber}`,
        "item": `${baseUrl}/parts/${part.slug}`,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col justify-between font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <header className="border-b border-slate-200 bg-white sticky top-0 z-10 shadow-xs">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="text-xl font-black tracking-tight text-slate-900">
            NoWrongPart<span className="text-amber-500">.com</span>
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-md transition"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back to Search
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6 sm:py-8 flex-1 w-full">
        {/* Visible Breadcrumb Trail */}
        <nav aria-label="Breadcrumb" className="mb-4">
          <ol className="flex items-center gap-1.5 text-xs text-slate-500">
            <li>
              <Link href="/" className="hover:text-slate-900 inline-flex items-center gap-1">
                <Home className="h-3 w-3" />
                <span>Home</span>
              </Link>
            </li>
            <ChevronRight className="h-3 w-3 text-slate-300 shrink-0" />
            <li>
              <span className="font-medium text-slate-700">{part.oemBrand}</span>
            </li>
            <ChevronRight className="h-3 w-3 text-slate-300 shrink-0" />
            <li>
              <span className="font-semibold text-slate-900 truncate">#{part.oemPartNumber}</span>
            </li>
          </ol>
        </nav>

        {/* Core Technical Specification Card */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-xs">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-50 text-amber-700 border border-amber-200">
              {part.oemBrand} Part Reference
            </span>
            <span className="text-slate-300">•</span>
            <span className="text-xs font-medium text-slate-500">{part.partType}</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
            {part.oemBrand} #{part.oemPartNumber} Dimensions & Cross-Reference
          </h1>

          <div className="grid grid-cols-3 gap-2 sm:gap-4 border-y border-slate-100 py-4 my-6 text-center sm:text-left bg-slate-50/60 rounded-lg sm:bg-transparent">
            <div>
              <span className="text-[11px] sm:text-xs font-semibold text-slate-400 uppercase">Length</span>
              <p className="font-bold text-slate-900 text-sm sm:text-lg">{part.specs.length}</p>
            </div>
            <div>
              <span className="text-[11px] sm:text-xs font-semibold text-slate-400 uppercase">Width</span>
              <p className="font-bold text-slate-900 text-sm sm:text-lg">{part.specs.width}</p>
            </div>
            <div>
              <span className="text-[11px] sm:text-xs font-semibold text-slate-400 uppercase">Material</span>
              <p className="font-bold text-slate-900 text-xs sm:text-base truncate">{part.specs.material}</p>
            </div>
          </div>

          <AffiliateDisclosure />
          <h2 className="text-base sm:text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
            <ArrowRight className="h-5 w-5 text-slate-500" />
            Cross-References in the Current Database
          </h2>

          <div className="space-y-3 mb-8">
            {part.crossReferences.map((cross, idx) => (
              <div
                key={idx}
                className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-slate-50 border border-slate-200 rounded-lg gap-3"
              >
                <div>
                  <div className="font-bold text-slate-900 text-base">
                    {cross.brand} <span className="text-slate-500">#{cross.partNumber}</span>
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5">{cross.notes}</div>
                </div>

                <a
                  href={`/api/out?q=${encodeURIComponent(`${cross.brand} ${cross.partNumber} ${part.partType}`)}`}
                  target="_blank"
                  rel="sponsored noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold rounded-lg shadow-xs transition active:scale-95"
                >
                  Search Amazon for This Reference
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            ))}
          </div>

          <h3 className="text-sm sm:text-base font-bold text-slate-900 mb-2">Model Names in This Part Record</h3>
          <p className="text-xs text-slate-600 mb-3">
            These names are listed in the current site data; year, deck, and serial-range sources are not recorded for every entry. Confirm the exact machine in the manufacturer’s parts catalog or manual before ordering.
          </p>
          <ul className="grid grid-cols-1 gap-2">
            {part.compatibleModels.map((model, idx) => (
              <li key={idx} className="flex items-center gap-2 text-xs sm:text-sm text-slate-600 bg-slate-50 p-2.5 rounded border border-slate-100">
                <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-slate-400 shrink-0" />
                <span>{model}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Day 10: Bi-Directional Model Hub Cross-Links */}
        {matchingMowerHubs.length > 0 && (
          <section className="mt-8 bg-amber-50/70 border border-amber-200 rounded-xl p-5 sm:p-6">
            <div className="flex items-center gap-2 text-amber-800 font-bold text-xs uppercase tracking-wider mb-2">
              <Tractor className="h-4 w-4 text-amber-600" />
              Mower Model Records That Reference This Part
            </div>
            <p className="text-xs text-slate-600 mb-4">
              These model records explicitly list this part as a deck belt or pump-drive belt in the current site data. Other machines from the same brand are not shown here as fitment matches.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {matchingMowerHubs.slice(0, 4).map((hub) => (
                <Link
                  key={hub.slug}
                  href={`/mowers/${hub.slug}`}
                  className="bg-white border border-amber-200 hover:border-amber-500 p-3.5 rounded-lg shadow-2xs transition flex items-center justify-between group"
                >
                  <div>
                    <div className="text-xs font-extrabold text-slate-900 group-hover:text-amber-600 transition">
                      {hub.brand} {hub.modelName}
                    </div>
                    <div className="text-[11px] text-slate-500 mt-0.5">
                      Listed as {hub.deckBeltSlug === part.slug && hub.pumpBeltSlug === part.slug
                        ? "deck and pump-drive belt references"
                        : hub.deckBeltSlug === part.slug
                          ? "a deck-belt reference"
                          : "a pump-drive-belt reference"}
                    </div>
                  </div>
                  <ArrowRight className="h-4 w-4 text-amber-600 shrink-0 group-hover:translate-x-0.5 transition" />
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Sibling Part Cross-Links */}
        {relatedParts.length > 0 && (
          <section className="mt-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-slate-900">
                Other {part.oemBrand} Part References
              </h2>
              <span className="text-xs text-slate-400 font-medium">Not fitment matches for this part</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {relatedParts.map((rel) => (
                <Link
                  key={rel.slug}
                  href={`/parts/${rel.slug}`}
                  className="bg-white border border-slate-200 hover:border-amber-400 p-4 rounded-xl shadow-xs transition flex items-center justify-between group"
                >
                  <div>
                    <div className="text-xs font-bold text-amber-600 uppercase tracking-wider">
                      {rel.oemBrand}
                    </div>
                    <div className="text-sm font-extrabold text-slate-900 mt-0.5">
                      OEM #{rel.oemPartNumber}
                    </div>
                    <div className="text-xs text-slate-500 mt-0.5">
                      {rel.specs.length} × {rel.specs.width} • {rel.partType}
                    </div>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-amber-500 group-hover:text-slate-950 transition">
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>

      <footer className="border-t border-slate-200 bg-white py-6 mt-12">
        <div className="max-w-4xl mx-auto px-4 text-center text-xs text-slate-500 space-y-1">
          <p>As an Amazon Associate I earn from qualifying purchases.</p>
          <p>© 2026 NoWrongPart.com. Independent equipment compatibility reference.</p>
        </div>
      </footer>
    </div>
  );
}
