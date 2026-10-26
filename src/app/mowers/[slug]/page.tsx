import modelsData from "@/data/models.json";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ExternalLink,
  ShieldCheck,
  ArrowLeft,
  ArrowRight,
  ChevronRight,
  Home,
  Wrench,
  Disc,
  Filter,
  AlertCircle,
  HelpCircle,
} from "lucide-react";
import type { Metadata } from "next";
import { ModelHubRecord } from "@/types/part";
import AffiliateDisclosure from "@/components/AffiliateDisclosure";
import { SITE_URL } from "@/lib/site";

export async function generateStaticParams() {
  const models: ModelHubRecord[] = modelsData as ModelHubRecord[];
  return models.map((model) => ({
    slug: model.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const model = (modelsData as ModelHubRecord[]).find((m) => m.slug === slug);
  if (!model) return { title: "Mower Model Not Found" };

  return {
    title: `${model.brand} ${model.modelName} Listed Belt, Blade & Filter References | NoWrongPart`,
    description: `Current NoWrongPart record for ${model.brand} ${model.modelName}: listed deck-belt number #${model.deckBeltOem}, measurements, blade, and filter references. Check the exact year, deck, and serial range against the manufacturer’s parts catalog.`,
    alternates: {
      canonical: `/mowers/${model.slug}`,
    },
    openGraph: {
      title: `${model.brand} ${model.modelName} Maintenance & Fitment Chart`,
      description: `Listed belt measurements and mower-part references for ${model.brand} ${model.modelName}; verify the exact configuration before ordering.`,
      url: `${SITE_URL}/mowers/${model.slug}`,
      siteName: "NoWrongPart",
      type: "website",
    },
  };
}

export default async function MowerModelPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const allModels = modelsData as ModelHubRecord[];
  const model = allModels.find((m) => m.slug === slug);

  if (!model) return notFound();

  // Related models for internal link equity
  let relatedModels = allModels.filter(
    (m) => m.brand.toLowerCase() === model.brand.toLowerCase() && m.slug !== model.slug
  );
  if (relatedModels.length < 3) {
    const fallback = allModels.filter(
      (m) => m.slug !== model.slug && !relatedModels.some((r) => r.slug === m.slug)
    );
    relatedModels = [...relatedModels, ...fallback].slice(0, 4);
  } else {
    relatedModels = relatedModels.slice(0, 4);
  }

  const baseUrl = SITE_URL;

  // 1. BreadcrumbList Schema
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
        "name": "Mower Models",
        "item": `${baseUrl}/mowers`,
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": `${model.brand} ${model.modelName}`,
        "item": `${baseUrl}/mowers/${model.slug}`,
      },
    ],
  };

  // 2. FAQPage Schema for High-CTR Search Snippets
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": `What size deck belt does a ${model.brand} ${model.modelName} use?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `The current NoWrongPart record lists OEM deck-belt number #${model.deckBeltOem} and measurements of ${model.deckBeltDimensions} for ${model.brand} ${model.modelName} (${model.deckSize}). Verify the exact configuration in the manufacturer’s parts catalog or manual.`,
        },
      },
      {
        "@type": "Question",
        "name": `What size blades fit the ${model.brand} ${model.modelName}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `The current NoWrongPart record lists ${model.bladeSpecs.quantityRequired} blades measuring ${model.bladeSpecs.length} with a ${model.bladeSpecs.centerHole} center hole (OEM reference #${model.bladeSpecs.oemPartNumber}; cross-reference ${model.bladeSpecs.aftermarketCross}). Verify the correct deck and serial range before ordering.`,
        },
      },
    ],
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col justify-between font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <header className="border-b border-slate-200 bg-white sticky top-0 z-20 shadow-xs">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="text-xl font-black tracking-tight text-slate-900">
            NoWrongPart<span className="text-amber-500">.com</span>
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-md transition"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> All Specs
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6 sm:py-8 flex-1 w-full">
        {/* Visible Breadcrumbs */}
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
              <span className="font-medium text-slate-700">Mower Models</span>
            </li>
            <ChevronRight className="h-3 w-3 text-slate-300 shrink-0" />
            <li>
              <span className="font-semibold text-slate-900 truncate">{model.modelName}</span>
            </li>
          </ol>
        </nav>

        {/* Hero Spec Card */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-xs mb-6">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-50 text-amber-800 border border-amber-200">
              {model.brand} {model.machineCategory}
            </span>
            <span className="text-slate-300">•</span>
            <span className="text-xs font-medium text-slate-500">{model.deckSize}</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
            {model.brand} {model.modelName} Belt, Blade & Filter Spec Chart
          </h1>

          <p className="text-xs sm:text-sm text-slate-600 mt-2">
            Engine options in the current record: <strong>{model.engineOptions.join(" / ")}</strong>
          </p>

          {/* Mechanic's Shop Note */}
          <div className="mt-5 p-4 bg-amber-50/70 border border-amber-200 rounded-lg flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm text-slate-800">
              <strong className="font-bold text-slate-900 block mb-0.5">Mechanic&apos;s Fitment Note:</strong>
              {model.maintenanceNotes}
              <p className="mt-2 text-xs text-slate-700">
                This record does not include a source, model-year, or serial-range history. Verify the exact machine and deck against the manufacturer’s parts catalog or manual before ordering.
              </p>
            </div>
          </div>
        </div>

        <AffiliateDisclosure />

        {/* Complete Wear-Parts Matrix */}
        <div className="space-y-4">
          {/* 1. Primary Cutter Deck Belt */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
            <div className="flex items-center gap-2 text-amber-600 font-bold text-xs uppercase tracking-wider mb-1">
              <Wrench className="h-4 w-4" /> Primary Cutter Deck Belt
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-2">
              <div>
                <h2 className="text-xl font-extrabold text-slate-900">
                  OEM #{model.deckBeltOem}
                </h2>
                <p className="text-sm text-slate-600 mt-0.5">
                  Listed belt dimensions: <strong className="text-slate-900">{model.deckBeltDimensions}</strong>
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <Link
                  href={`/parts/${model.deckBeltSlug}`}
                  className="px-3.5 py-2.5 rounded-lg border border-slate-300 hover:border-slate-400 text-xs font-bold text-slate-800 transition"
                >
                  View Stens/Oregon Cross #
                </Link>
                <a
                  href={`/api/out?q=${encodeURIComponent(`${model.brand} ${model.deckBeltOem} kevlar deck belt`)}`}
                  target="_blank"
                  rel="sponsored noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold rounded-lg shadow-xs transition"
                >
                  Search Amazon for This Belt
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          </div>

          {/* 2. Hydro Pump / Transmission Drive Belt (if applicable) */}
          {model.pumpBeltOem && (
            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
              <div className="flex items-center gap-2 text-blue-600 font-bold text-xs uppercase tracking-wider mb-1">
                <ShieldCheck className="h-4 w-4" /> Hydro Pump / Transmission Drive Belt
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-2">
                <div>
                  <h2 className="text-xl font-extrabold text-slate-900">
                    OEM #{model.pumpBeltOem}
                  </h2>
                  <p className="text-sm text-slate-600 mt-0.5">
                    Listed belt dimensions: <strong className="text-slate-900">{model.pumpBeltDimensions}</strong>
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  {model.pumpBeltSlug && (
                    <Link
                      href={`/parts/${model.pumpBeltSlug}`}
                      className="px-3.5 py-2.5 rounded-lg border border-slate-300 hover:border-slate-400 text-xs font-bold text-slate-800 transition"
                    >
                      View Pump Belt Cross #
                    </Link>
                  )}
                  <a
                    href={`/api/out?q=${encodeURIComponent(`${model.brand} ${model.pumpBeltOem} drive belt`)}`}
                    target="_blank"
                    rel="sponsored noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold rounded-lg shadow-xs transition"
                  >
                    Search Amazon for This Belt
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* 3. Mower Blade Set Specifications */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
            <div className="flex items-center gap-2 text-emerald-600 font-bold text-xs uppercase tracking-wider mb-1">
              <Disc className="h-4 w-4" /> Replacement Mower Blade Set ({model.bladeSpecs.quantityRequired}-Blade Deck)
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-2">
              <div>
                <h2 className="text-xl font-extrabold text-slate-900">
                  OEM Blade #{model.bladeSpecs.oemPartNumber}
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Cross-references in the current record: <strong>{model.bladeSpecs.aftermarketCross}</strong>
                </p>
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-700 mt-2">
                  <span>Length: <strong>{model.bladeSpecs.length}</strong></span>
                  <span>Center Hole: <strong>{model.bladeSpecs.centerHole}</strong></span>
                  <span>Width: <strong>{model.bladeSpecs.width}</strong></span>
                  <span>Qty Needed: <strong>{model.bladeSpecs.quantityRequired} Blades</strong></span>
                </div>
              </div>
              <a
                href={`/api/out?q=${encodeURIComponent(`${model.brand} ${model.bladeSpecs.oemPartNumber} blades ${model.bladeSpecs.quantityRequired} pack`)}`}
                target="_blank"
                rel="sponsored noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold rounded-lg shadow-xs transition shrink-0"
              >
                Search Amazon for This Blade Reference
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>

          {/* 4. Hydraulic / Engine Filter Specs */}
          {model.hydroFilterOem && (
            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
              <div className="flex items-center gap-2 text-slate-600 font-bold text-xs uppercase tracking-wider mb-1">
                <Filter className="h-4 w-4" /> Hydro-Gear Transaxle / Service Filter
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-2">
                <div>
                  <h2 className="text-lg font-extrabold text-slate-900">
                    OEM Filter: {model.hydroFilterOem}
                  </h2>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Aftermarket Cross-Reference: <strong>{model.hydroFilterCross}</strong>
                  </p>
                </div>
                <a
                  href={`/api/out?q=${encodeURIComponent(`${model.brand} ${model.modelName} tune up maintenance kit`)}`}
                  target="_blank"
                  rel="sponsored noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-lg transition shrink-0"
                >
                  Search Amazon for an Engine Service Kit
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Built-in SEO FAQ Block */}
        <section className="mt-8 bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
          <h2 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
            <HelpCircle className="h-4 w-4 text-amber-500" />
            Frequently Asked Fitment Questions
          </h2>
          <div className="space-y-4 text-xs sm:text-sm">
            <div>
              <h3 className="font-bold text-slate-900">
                What size deck belt does a {model.brand} {model.modelName} take?
              </h3>
              <p className="text-slate-600 mt-1">
                The current NoWrongPart record lists OEM deck-belt number <strong>#{model.deckBeltOem}</strong> and measurements of <strong>{model.deckBeltDimensions}</strong> for {model.brand} {model.modelName} ({model.deckSize}). Confirm the exact configuration and replacement requirements in the manufacturer’s parts catalog or manual.
              </p>
            </div>
            <div className="pt-3 border-t border-slate-100">
              <h3 className="font-bold text-slate-900">
                What blades fit the {model.brand} {model.modelName}?
              </h3>
              <p className="text-slate-600 mt-1">
                The current record lists <strong>{model.bladeSpecs.quantityRequired} blades</strong> measuring <strong>{model.bladeSpecs.length}</strong> long with a <strong>{model.bladeSpecs.centerHole}</strong> center hole, with OEM reference <strong>#{model.bladeSpecs.oemPartNumber}</strong> and cross-reference <strong>{model.bladeSpecs.aftermarketCross}</strong>. Verify the correct deck and serial range before ordering.
              </p>
            </div>
          </div>
        </section>

        {/* Related Mower Hubs */}
        {relatedModels.length > 0 && (
          <section className="mt-10">
            <h2 className="text-lg font-bold text-slate-900 mb-4">
              Other Commercial & Residential Mower Spec Hubs
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {relatedModels.map((rel) => (
                <Link
                  key={rel.slug}
                  href={`/mowers/${rel.slug}`}
                  className="bg-white border border-slate-200 hover:border-amber-400 p-4 rounded-xl shadow-xs transition flex items-center justify-between group"
                >
                  <div>
                    <div className="text-xs font-bold text-amber-600 uppercase">
                      {rel.brand} • {rel.machineCategory}
                    </div>
                    <div className="text-sm font-extrabold text-slate-900 mt-0.5">
                      {rel.modelName}
                    </div>
                    <div className="text-xs text-slate-500 mt-0.5">
                      Belt #{rel.deckBeltOem} ({rel.deckBeltDimensions})
                    </div>
                  </div>
                  <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-amber-600 transition" />
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
