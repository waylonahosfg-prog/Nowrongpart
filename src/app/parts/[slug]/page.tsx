import partsData from "@/data/parts.json";
import modelsData from "@/data/models.json";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ExternalLink,
  CheckCircle2,
  ShieldCheck,
  ArrowLeft,
  ArrowRight,
  ChevronRight,
  Home,
  Tractor,
  Wrench,
  HelpCircle,
  AlertTriangle,
} from "lucide-react";
import type { Metadata } from "next";
import { PartRecord, ModelHubRecord } from "@/types/part";

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

  const primaryCross = part.crossReferences[0]
    ? `${part.crossReferences[0].brand} ${part.crossReferences[0].partNumber}`
    : "Aftermarket";

  return {
    title: `${part.oemBrand} ${part.oemPartNumber} Belt Size (${part.specs.length} x ${part.specs.width}) & ${primaryCross} Cross | NoWrongPart`,
    description: `Exact dimensions for ${part.oemBrand} #${part.oemPartNumber}: ${part.specs.length} long x ${part.specs.width} wide (${part.specs.material}). Direct cross-reference to ${part.crossReferences.map((c) => `${c.brand} ${c.partNumber}`).join(", ")}.`,
    openGraph: {
      title: `${part.oemBrand} #${part.oemPartNumber} (${part.specs.length} x ${part.specs.width}) Spec Sheet`,
      description: `Verified aftermarket cross-references and exact dimensions for ${part.oemBrand} ${part.oemPartNumber}.`,
      url: `https://nowrongpart.com/parts/${part.slug}`,
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

  const matchingMowerHubs = allModels.filter(
    (m) =>
      m.deckBeltSlug === part.slug ||
      m.pumpBeltSlug === part.slug ||
      m.brand.toLowerCase() === part.oemBrand.toLowerCase()
  );

  // Also find belts with similar length/width for dimensional cross-linking
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

  const baseUrl = "https://nowrongpart.com";
  const crossListText = part.crossReferences
    .map((c) => `${c.brand} #${c.partNumber}`)
    .join(", ");
  const primaryModel = part.compatibleModels[0] || `${part.oemBrand} Mower`;
  const beltSectionProfile = part.specs.width.includes("5/8")
    ? "B-Section / 5L Commercial Profile (21/32\" Top Width)"
    : "A-Section / 4L Residential & Hydro Profile (1/2\" Top Width)";

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": `${part.oemBrand} OEM #${part.oemPartNumber} ${part.partType} (${part.specs.length} x ${part.specs.width})`,
    "description": `OEM technical specifications (${part.specs.length} x ${part.specs.width}) and aftermarket equivalents (${crossListText}) for ${part.oemBrand} ${part.oemPartNumber}.`,
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

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": `What are the exact dimensions of the ${part.oemBrand} ${part.oemPartNumber} belt?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `The ${part.oemBrand} OEM #${part.oemPartNumber} ${part.partType.toLowerCase()} measures ${part.specs.length} in outside length and ${part.specs.width} in top width, constructed with ${part.specs.material}.`,
        },
      },
      {
        "@type": "Question",
        "name": `What aftermarket belt replaces ${part.oemBrand} ${part.oemPartNumber}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `Verified direct aftermarket cross-references for ${part.oemBrand} ${part.oemPartNumber} include ${crossListText}.`,
        },
      },
      {
        "@type": "Question",
        "name": `What models fit the ${part.oemBrand} ${part.oemPartNumber}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `This ${part.specs.length} x ${part.specs.width} belt is confirmed to fit: ${part.compatibleModels.join(", ")}.`,
        },
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
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
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-50 text-amber-700 border border-amber-200">
              {part.oemBrand} OEM Spec
            </span>
            <span className="text-slate-300">•</span>
            <span className="text-xs font-medium text-slate-500">{part.partType}</span>
            <span className="text-slate-300">•</span>
            <span className="text-xs font-semibold text-emerald-700">
              Replaces {crossListText}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
            {part.oemBrand} #{part.oemPartNumber} Belt Size ({part.specs.length} × {part.specs.width}) & Cross-Reference
          </h1>

          <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
            Direct dimensional reference and verified Kevlar/Aramid aftermarket equivalents for <strong>{part.oemBrand} OEM #{part.oemPartNumber}</strong>, engineered for {part.compatibleModels.join(", ")}.
          </p>

          <div className="grid grid-cols-3 gap-2 sm:gap-4 border-y border-slate-100 py-4 my-6 text-center sm:text-left bg-slate-50/60 rounded-lg sm:bg-transparent">
            <div>
              <span className="text-[11px] sm:text-xs font-semibold text-slate-400 uppercase">Outside Length</span>
              <p className="font-bold text-slate-900 text-sm sm:text-lg">{part.specs.length}</p>
            </div>
            <div>
              <span className="text-[11px] sm:text-xs font-semibold text-slate-400 uppercase">Top Width</span>
              <p className="font-bold text-slate-900 text-sm sm:text-lg">{part.specs.width}</p>
            </div>
            <div>
              <span className="text-[11px] sm:text-xs font-semibold text-slate-400 uppercase">Cord Spec</span>
              <p className="font-bold text-slate-900 text-xs sm:text-base truncate">{part.specs.material}</p>
            </div>
          </div>

          <h2 className="text-base sm:text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-emerald-600" />
            Verified Aftermarket & OEM Replacements
          </h2>

          <div className="space-y-3 mb-8">
            {/* Direct OEM Option */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-amber-50/50 border border-amber-200 rounded-lg gap-3">
              <div>
                <div className="font-bold text-slate-900 text-base">
                  Genuine {part.oemBrand} <span className="text-amber-700">#{part.oemPartNumber}</span>
                </div>
                <div className="text-xs text-slate-600 mt-0.5">
                  Exact OEM specification ({part.specs.length} × {part.specs.width} {part.specs.material})
                </div>
              </div>

              <a
                href={`/api/out?q=${encodeURIComponent(`${part.oemBrand} ${part.oemPartNumber} belt`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-lg shadow-xs transition active:scale-95"
              >
                Find Genuine OEM on Amazon
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>

            {/* Aftermarket Crosses */}
            {part.crossReferences.map((cross, idx) => (
              <div
                key={idx}
                className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-slate-50 border border-slate-200 rounded-lg gap-3"
              >
                <div>
                  <div className="font-bold text-slate-900 text-base">
                    {cross.brand} <span className="text-slate-500">#{cross.partNumber}</span>
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5">{cross.notes} — Replaces {part.oemBrand} {part.oemPartNumber}</div>
                </div>

                <a
                  href={`/api/out?q=${encodeURIComponent(`${cross.brand} ${cross.partNumber} ${part.partType}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold rounded-lg shadow-xs transition active:scale-95"
                >
                  Check In-Stock on Amazon
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            ))}
          </div>

          <h3 className="text-sm sm:text-base font-bold text-slate-900 mb-2">Confirmed Equipment Compatibility</h3>
          <ul className="grid grid-cols-1 gap-2 mb-6">
            {part.compatibleModels.map((model, idx) => (
              <li key={idx} className="flex items-center gap-2 text-xs sm:text-sm text-slate-600 bg-slate-50 p-2.5 rounded border border-slate-100">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                <span>{model}</span>
              </li>
            ))}
          </ul>

          {/* Information Gain: Engineering & Pulley Fitment Spec Table */}
          <div className="border-t border-slate-100 pt-6 mt-6">
            <h3 className="text-sm sm:text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
              <Wrench className="h-4 w-4 text-slate-500" />
              Technical Belt Profile & Installation Notes
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-600 bg-slate-50 p-4 rounded-lg border border-slate-200/80">
              <div>
                <strong className="text-slate-900 block">Cross-Section Profile:</strong>
                {beltSectionProfile}
              </div>
              <div>
                <strong className="text-slate-900 block">Tensile Cord Rating:</strong>
                {part.specs.material} (High-shock PTO engagement & backside idler rated)
              </div>
            </div>
          </div>
        </div>

        {/* High-Ticket Affiliate Upsell: Companion Pulleys, Spindles & PTO Clutches */}
        <section className="mt-6 bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
          <div className="flex items-center gap-2 text-amber-600 font-bold text-xs uppercase tracking-wider mb-1">
            <AlertTriangle className="h-4 w-4" /> Prevent Repeat Belt Failure
          </div>
          <h2 className="text-base sm:text-lg font-extrabold text-slate-900">
            Shredded or Thrown Belt? Inspect These {part.oemBrand} Deck Components
          </h2>
          <p className="text-xs text-slate-600 mt-1 mb-4">
            A new {part.specs.length} Kevlar belt will burn or roll within 5 hours if a flat idler pulley bearing is dragging or a deck spindle is out of true.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <a
              href={`/api/out?q=${encodeURIComponent(`${primaryModel} deck idler pulley replacement`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3.5 rounded-lg border border-slate-200 hover:border-amber-400 bg-slate-50 hover:bg-amber-50/30 transition flex flex-col justify-between group"
            >
              <div>
                <span className="text-[11px] font-bold uppercase text-amber-700">Check #1: Bearings</span>
                <div className="text-sm font-bold text-slate-900 mt-0.5 group-hover:text-amber-700">
                  {part.oemBrand} Deck Idler Pulleys
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  Spin pulleys by hand; any grinding or wobble glazes belt sidewalls.
                </p>
              </div>
              <span className="text-xs font-bold text-slate-900 mt-3 inline-flex items-center gap-1">
                View Pulleys on Amazon <ExternalLink className="h-3 w-3 text-amber-600" />
              </span>
            </a>

            <a
              href={`/api/out?q=${encodeURIComponent(`${primaryModel} deck spindle assembly`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3.5 rounded-lg border border-slate-200 hover:border-amber-400 bg-slate-50 hover:bg-amber-50/30 transition flex flex-col justify-between group"
            >
              <div>
                <span className="text-[11px] font-bold uppercase text-amber-700">Check #2: Blade Play</span>
                <div className="text-sm font-bold text-slate-900 mt-0.5 group-hover:text-amber-700">
                  {part.oemBrand} Spindle Assemblies
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  Tilted spindle housings throw the {part.oemPartNumber} belt off under load.
                </p>
              </div>
              <span className="text-xs font-bold text-slate-900 mt-3 inline-flex items-center gap-1">
                View Spindles on Amazon <ExternalLink className="h-3 w-3 text-amber-600" />
              </span>
            </a>

            <a
              href={`/api/out?q=${encodeURIComponent(`${primaryModel} high lift mower blades`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3.5 rounded-lg border border-slate-200 hover:border-amber-400 bg-slate-50 hover:bg-amber-50/30 transition flex flex-col justify-between group"
            >
              <div>
                <span className="text-[11px] font-bold uppercase text-amber-700">Check #3: While Deck is Off</span>
                <div className="text-sm font-bold text-slate-900 mt-0.5 group-hover:text-amber-700">
                  Replacement High-Lift Blades
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  Replace bent or unbalanced blades while you have the deck belt off.
                </p>
              </div>
              <span className="text-xs font-bold text-slate-900 mt-3 inline-flex items-center gap-1">
                View Blade Sets <ExternalLink className="h-3 w-3 text-amber-600" />
              </span>
            </a>
          </div>
        </section>

        {/* Visible SEO FAQ Section */}
        <section className="mt-6 bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
          <h2 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
            <HelpCircle className="h-4 w-4 text-amber-500" />
            {part.oemBrand} #{part.oemPartNumber} Fitment Q&A
          </h2>
          <div className="space-y-4 text-xs sm:text-sm">
            <div>
              <h3 className="font-bold text-slate-900">
                What are the exact dimensions of the {part.oemBrand} {part.oemPartNumber} belt?
              </h3>
              <p className="text-slate-600 mt-1">
                The {part.oemBrand} #{part.oemPartNumber} measures <strong>{part.specs.length}</strong> in outside length by <strong>{part.specs.width}</strong> in top width, utilizing a {part.specs.material} core to resist stretching during PTO clutch engagement.
              </p>
            </div>
            <div className="pt-3 border-t border-slate-100">
              <h3 className="font-bold text-slate-900">
                What is the Stens or Oregon equivalent for {part.oemBrand} {part.oemPartNumber}?
              </h3>
              <p className="text-slate-600 mt-1">
                You can replace {part.oemBrand} #{part.oemPartNumber} directly with <strong>{crossListText}</strong>. All listed equivalents match the OEM {part.specs.length} × {part.specs.width} profile.
              </p>
            </div>
          </div>
        </section>

        {/* Bi-Directional Model Hub Cross-Links */}
        {matchingMowerHubs.length > 0 && (
          <section className="mt-8 bg-amber-50/70 border border-amber-200 rounded-xl p-5 sm:p-6">
            <div className="flex items-center gap-2 text-amber-800 font-bold text-xs uppercase tracking-wider mb-2">
              <Tractor className="h-4 w-4 text-amber-600" />
              Complete Machine Maintenance Charts (Blades, Filters & Belts)
            </div>
            <p className="text-xs text-slate-600 mb-4">
              Need matching high-lift mower blades or hydro transmission filter numbers for your {part.oemBrand}? View the full model spec sheet:
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
                      Blades: #{hub.bladeSpecs.oemPartNumber} ({hub.bladeSpecs.length}) • Deck: #{hub.deckBeltOem}
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
                Other {part.oemBrand} Belt & Part Specifications
              </h2>
              <span className="text-xs text-slate-400 font-medium">Internal Reference Index</span>
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
