import { notFound } from "next/navigation";
import Link from "next/link";
import partsData from "@/data/parts.json";
import modelsData from "@/data/models.json";
import { getDimensionGroupBySlug, getAllDimensionGroups } from "@/lib/dimensions";
import {
  ExternalLink,
  ArrowLeft,
  Ruler,
  ShieldCheck,
  CheckCircle2,
  Wrench,
  AlertTriangle,
  ChevronRight,
  Home,
  Truck,
  Zap,
} from "lucide-react";
import type { Metadata } from "next";
import { PartRecord, ModelHubRecord } from "@/types/part";
import { SITE_URL } from "@/lib/site";

export async function generateStaticParams() {
  const groups = getAllDimensionGroups();
  return groups.map((g) => ({
    slug: g.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const group = getDimensionGroupBySlug(slug);

  if (!group) return { title: "Size Group Not Found" };

  return {
    title: `${group.displayTitle} Kevlar Mower Belts & OEM Cross-References | NoWrongPart`,
    description: `Complete OEM and aftermarket fitment index for ${group.displayTitle} Kevlar mower belts (${group.industryCode}). Verified part numbers for Scag, Toro, Cub Cadet, and John Deere.`,
    alternates: {
      canonical: `/size/${group.slug}`,
    },
    openGraph: {
      title: `${group.displayTitle} Kevlar Mower Belt Fitment Chart`,
      description: `Exact specs, industry codes (${group.industryCode}), and OEM cross-references for ${group.displayTitle} deck and hydro belts.`,
      url: `${SITE_URL}/size/${group.slug}`,
      siteName: "NoWrongPart",
      type: "website",
    },
  };
}

export default async function DimensionGroupPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const group = getDimensionGroupBySlug(slug);

  if (!group) return notFound();

  const allParts: PartRecord[] = partsData;
  const allModels: ModelHubRecord[] = modelsData as ModelHubRecord[];

  // Filter parts matching this size profile
  const matchingParts = allParts.filter((p) =>
    p.specs.length.toLowerCase().includes(group.length.toLowerCase()) &&
    p.specs.width.toLowerCase().includes(group.width.toLowerCase())
  );

  // Filter models that use these matching parts
  const matchedPartOems = new Set(matchingParts.map((p) => p.oemPartNumber.toLowerCase()));
  const matchingModels = allModels.filter((m) =>
    matchedPartOems.has(m.deckBeltOem.toLowerCase()) ||
    m.deckBeltDimensions.toLowerCase().includes(group.length.toLowerCase())
  );

  const cleanWidth = group.width.replace(" in", '"');
  const cleanLength = group.length.replace(" in", '"');
  const baseUrl = SITE_URL;

  // BreadcrumbList JSON-LD Schema
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
        "name": "Belt Sizes",
        "item": `${baseUrl}/size`,
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": group.displayTitle,
        "item": `${baseUrl}/size/${group.slug}`,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col justify-between font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
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
            <ArrowLeft className="h-3.5 w-3.5" /> Back to Search
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6 sm:py-8 flex-1 w-full">
        {/* Visible Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="mb-4">
          <ol className="flex items-center gap-1.5 text-xs text-slate-500 overflow-x-auto no-scrollbar">
            <li className="shrink-0">
              <Link href="/" className="hover:text-slate-900 inline-flex items-center gap-1">
                <Home className="h-3 w-3" />
                <span>Home</span>
              </Link>
            </li>
            <ChevronRight className="h-3 w-3 text-slate-300 shrink-0" />
            <li className="shrink-0">
              <span className="font-medium text-slate-700">Belt Sizes</span>
            </li>
            <ChevronRight className="h-3 w-3 text-slate-300 shrink-0" />
            <li className="shrink-0">
              <span className="font-semibold text-slate-900">{group.displayTitle}</span>
            </li>
          </ol>
        </nav>

        {/* Hero Size Spec Card */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-xs mb-6">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-100 text-amber-900 border border-amber-200 flex items-center gap-1">
              <Ruler className="h-3.5 w-3.5 text-amber-700" /> V-Belt Dimension Specification
            </span>
            <span className="text-xs font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
              Standard: {group.industryCode}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
            {group.displayTitle} Kevlar Mower Belt Fitment Chart
          </h1>

          <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
            Technical specs and cross-references for <strong>{cleanWidth} top-width by {cleanLength} outside circumference (OD)</strong> Aramid/Kevlar cord belts.
          </p>

          {/* Quick Specs Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 border-y border-slate-100 py-4 my-6 bg-slate-50/70 rounded-lg px-4">
            <div>
              <span className="text-[11px] font-semibold text-slate-400 uppercase block">Width</span>
              <span className="font-extrabold text-slate-900 text-base">{cleanWidth}</span>
            </div>
            <div>
              <span className="text-[11px] font-semibold text-slate-400 uppercase block">Outside Length</span>
              <span className="font-extrabold text-slate-900 text-base">{cleanLength}</span>
            </div>
            <div>
              <span className="text-[11px] font-semibold text-slate-400 uppercase block">Industrial Code</span>
              <span className="font-extrabold text-slate-900 text-sm">{group.industryCode.split(" / ")[0]}</span>
            </div>
            <div>
              <span className="text-[11px] font-semibold text-slate-400 uppercase block">Cord Material</span>
              <span className="font-extrabold text-amber-700 text-base">Aramid / Kevlar</span>
            </div>
          </div>

          {/* Primary High-Converting CTA Box */}
          <div className="p-4 bg-gradient-to-r from-amber-50 to-amber-100/50 border border-amber-200 rounded-xl space-y-3">
            <div className="flex flex-wrap items-center gap-3 text-xs font-bold text-slate-700">
              <span className="inline-flex items-center gap-1 text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                <Zap className="h-3.5 w-3.5 fill-emerald-600" /> In-Stock Verified
              </span>
              <span className="inline-flex items-center gap-1 text-slate-700 bg-white border border-slate-200 px-2 py-0.5 rounded">
                <Truck className="h-3.5 w-3.5 text-amber-600" /> Fast 1-Day / 2-Day Prime Options
              </span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
              <div>
                <div className="text-sm font-extrabold text-slate-900">
                  Ready to order a {cleanWidth} × {cleanLength} Kevlar belt?
                </div>
                <p className="text-xs text-slate-600 mt-0.5">
                  Direct dry-wrapped Aramid replacement for high shock-load commercial cutter decks.
                </p>
              </div>
              <a
                href={`/api/out?q=${encodeURIComponent(`${cleanWidth} x ${cleanLength} kevlar mower belt`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 px-5 py-3 bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-extrabold rounded-lg shadow-xs transition shrink-0"
              >
                Find on Amazon
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* High-Ticket "Deck Overhaul & Maintenance Bundle" Matrix */}
        <section className="mb-6 bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
          <div className="flex items-center gap-2 text-amber-600 font-bold text-xs uppercase tracking-wider mb-1">
            <AlertTriangle className="h-4 w-4" /> Prevent Repeat Belt Failure
          </div>
          <h2 className="text-base sm:text-lg font-extrabold text-slate-900">
            Replacing a {cleanWidth} × {cleanLength} Belt? Inspect These Wear Components
          </h2>
          <p className="text-xs text-slate-600 mt-1 mb-4">
            Belts snap or shred due to dragging idler bearings, loose deck tension springs, or worn spindle assemblies. Save shop labor by servicing companion wear items together:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <a
              href={`/api/out?q=${encodeURIComponent(`${cleanWidth} mower deck idler pulley`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-xl border border-slate-200 hover:border-amber-400 bg-slate-50 hover:bg-amber-50/30 transition flex flex-col justify-between group"
            >
              <div>
                <span className="text-[11px] font-bold uppercase text-amber-700 block">Check #1: Pulley Bearings</span>
                <div className="text-sm font-bold text-slate-900 mt-0.5 group-hover:text-amber-700">
                  Flat & V-Groove Idler Pulleys
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  Seized idler bearings drag against raw Kevlar fabric, overheating and snapping new belts.
                </p>
              </div>
              <span className="text-xs font-bold text-slate-900 mt-3 inline-flex items-center gap-1">
                Shop Idlers on Amazon <ExternalLink className="h-3 w-3 text-amber-600" />
              </span>
            </a>

            <a
              href={`/api/out?q=${encodeURIComponent(`mower deck spindle assembly set`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-xl border border-slate-200 hover:border-amber-400 bg-slate-50 hover:bg-amber-50/30 transition flex flex-col justify-between group"
            >
              <div>
                <span className="text-[11px] font-bold uppercase text-amber-700 block">Check #2: Spindle Play</span>
                <div className="text-sm font-bold text-slate-900 mt-0.5 group-hover:text-amber-700">
                  Deck Spindle Assembly Kits
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  Tilted spindle shafts or bad housing bearings throw deck belts off under load.
                </p>
              </div>
              <span className="text-xs font-bold text-slate-900 mt-3 inline-flex items-center gap-1">
                Shop Spindles on Amazon <ExternalLink className="h-3 w-3 text-amber-600" />
              </span>
            </a>

            <a
              href={`/api/out?q=${encodeURIComponent(`commercial high lift mower blades 3 pack`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-xl border border-slate-200 hover:border-amber-400 bg-slate-50 hover:bg-amber-50/30 transition flex flex-col justify-between group"
            >
              <div>
                <span className="text-[11px] font-bold uppercase text-amber-700 block">Check #3: While Deck is Down</span>
                <div className="text-sm font-bold text-slate-900 mt-0.5 group-hover:text-amber-700">
                  Commercial High-Lift Blade 3-Packs
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  Fresh sharp blades reduce drag and stress on your engine PTO clutch and deck belt.
                </p>
              </div>
              <span className="text-xs font-bold text-slate-900 mt-3 inline-flex items-center gap-1">
                Shop Blade Sets on Amazon <ExternalLink className="h-3 w-3 text-amber-600" />
              </span>
            </a>
          </div>
        </section>

        {/* Matching OEM Part Specifications */}
        {matchingParts.length > 0 && (
          <section className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-xs mb-6">
            <h2 className="text-base sm:text-lg font-extrabold text-slate-900 mb-1 flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-emerald-600" />
              OEM Part Numbers Using This {group.displayTitle} Belt Size
            </h2>
            <p className="text-xs text-slate-500 mb-4">
              The following OEM part numbers share the exact physical dimensions of {cleanWidth} × {cleanLength}:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {matchingParts.map((part) => (
                <div key={part.slug} className="p-4 rounded-xl border border-slate-200 bg-slate-50/80 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase text-amber-700">{part.oemBrand}</span>
                      <span className="text-[10px] text-slate-400 font-mono">#{part.oemPartNumber}</span>
                    </div>
                    <div className="text-sm font-extrabold text-slate-900 mt-1">
                      {part.oemBrand} #{part.oemPartNumber}
                    </div>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-1">
                      Fits: {part.compatibleModels.join(", ")}
                    </p>
                  </div>
                  <div className="mt-3 pt-2 border-t border-slate-200/60 flex items-center justify-between">
                    <Link
                      href={`/parts/${part.slug}`}
                      className="text-xs font-bold text-slate-900 hover:text-amber-600 transition"
                    >
                      View Cross References →
                    </Link>
                    <a
                      href={`/api/out?q=${encodeURIComponent(`${part.oemBrand} ${part.oemPartNumber} kevlar belt`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-bold text-amber-700 hover:underline inline-flex items-center gap-0.5"
                    >
                      Amazon <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Matching Mower Model Hubs */}
        {matchingModels.length > 0 && (
          <section className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-xs mb-6">
            <h2 className="text-base sm:text-lg font-extrabold text-slate-900 mb-1 flex items-center gap-2">
              <Wrench className="h-5 w-5 text-amber-600" />
              Confirmed Mowers Using {group.displayTitle} Belts
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3">
              {matchingModels.map((m) => (
                <Link
                  key={m.slug}
                  href={`/mowers/${m.slug}`}
                  className="p-3 bg-slate-50 hover:bg-amber-50/50 border border-slate-200 hover:border-amber-300 rounded-lg transition flex items-center justify-between group"
                >
                  <div>
                    <span className="text-xs font-bold text-slate-900 group-hover:text-amber-700">{m.brand} {m.modelName}</span>
                    <span className="text-[10px] text-slate-500 block">{m.deckSize} • Belt #{m.deckBeltOem}</span>
                  </div>
                  <ChevronRight className="h-4 w-4 text-slate-400 group-hover:text-amber-600 transition shrink-0" />
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
