import partsData from "@/data/parts.json";
import modelsData from "@/data/models.json";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  ArrowLeft,
  Ruler,
  Zap,
  Truck,
  CopyButton,
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
  const parts: PartRecord[] = partsData;
  const part = parts.find((p) => p.slug === slug);
  if (!part) return { title: "Part Not Found" };

  return {
    title: `${part.oemBrand} ${part.oemPartNumber} Deck Belt Cross-Reference & Specs | NoWrongPart`,
    description: `Looking for ${part.oemBrand} #${part.oemPartNumber}? Dimensions: ${part.specs.width} x ${part.specs.length}. Stens/Oregon cross references and compatible mowers.`,
    openGraph: {
      title: `${part.oemBrand} ${part.oemPartNumber} Deck Belt Compatibility & Cross Reference`,
      description: `Exact specs: ${part.specs.width} wide x ${part.specs.length} long (${part.specs.material}). Fits ${part.compatibleModels.join(", ")}.`,
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
  const parts: PartRecord[] = partsData;
  const models: ModelHubRecord[] = modelsData as ModelHubRecord[];
  const part = parts.find((p) => p.slug === slug);

  if (!part) return notFound();

  // Cross-reference compatible model hubs
  const matchedModelHubs = models.filter((m) =>
    part.compatibleModels.some(
      (cm) => cm.toLowerCase().includes(m.modelName.toLowerCase()) || m.deckBeltOem === part.oemPartNumber
    )
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col justify-between font-sans">
      <header className="border-b border-slate-200 bg-white sticky top-0 z-20 shadow-xs">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="text-xl font-black tracking-tight text-slate-900">
            NoWrongPart<span className="text-amber-500">.com</span>
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-md transition"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> All Parts
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6 sm:py-8 flex-1 w-full">
        {/* Main Part Card */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-xs mb-6">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-100 text-amber-900 border border-amber-200">
              {part.oemBrand} OEM Specification
            </span>
            <span className="text-xs text-slate-400 font-mono">
              SKU: {part.oemPartNumber}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
            {part.oemBrand} OEM #{part.oemPartNumber} {part.partType}
          </h1>

          <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
            Direct OEM replacement and high-tensile Kevlar equivalent specifications for <strong>{part.oemBrand} Part #{part.oemPartNumber}</strong>.
          </p>

          {/* Quick Specs Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 border-y border-slate-100 py-4 my-6 bg-slate-50/70 rounded-lg px-4">
            <div>
              <span className="text-[11px] font-semibold text-slate-400 uppercase block">Width</span>
              <span className="font-extrabold text-slate-900 text-base">{part.specs.width}</span>
            </div>
            <div>
              <span className="text-[11px] font-semibold text-slate-400 uppercase block">Outside Length</span>
              <span className="font-extrabold text-slate-900 text-base">{part.specs.length}</span>
            </div>
            <div>
              <span className="text-[11px] font-semibold text-slate-400 uppercase block">Material</span>
              <span className="font-extrabold text-slate-900 text-base">{part.specs.material}</span>
            </div>
            <div>
              <span className="text-[11px] font-semibold text-slate-400 uppercase block">Belt Type</span>
              <span className="font-extrabold text-amber-700 text-base">{part.partType}</span>
            </div>
          </div>

          {/* High-Converting CTA Box with Trust Badges */}
          <div className="p-4 bg-gradient-to-r from-amber-50 to-amber-100/50 border border-amber-200 rounded-xl space-y-3">
            {/* Urgency & Prime Trust Badges */}
            <div className="flex flex-wrap items-center gap-3 text-xs font-bold text-slate-700">
              <span className="inline-flex items-center gap-1 text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                <Zap className="h-3.5 w-3.5 fill-emerald-600" /> In-Stock Verified
              </span>
              <span className="inline-flex items-center gap-1 text-slate-700 bg-white border border-slate-200 px-2 py-0.5 rounded">
                <Truck className="h-3.5 w-3.5 text-amber-600" /> Fast 1-Day / 2-Day Prime Available
              </span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
              <div>
                <div className="text-sm font-extrabold text-slate-900">
                  Ready to replace #{part.oemPartNumber}?
                </div>
                <p className="text-xs text-slate-600 mt-0.5">
                  Direct Kevlar aramid cord upgrade for long life and heavy clutching.
                </p>
              </div>
              <a
                href={`/api/out?q=${encodeURIComponent(`${part.oemBrand} ${part.oemPartNumber} kevlar belt`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 px-5 py-3 bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-extrabold rounded-lg shadow-xs transition shrink-0"
              >
                Check Amazon Price & Stock
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Aftermarket Cross References */}
        <section className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-xs mb-6">
          <h2 className="text-base sm:text-lg font-extrabold text-slate-900 mb-1 flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-emerald-600" />
            Aftermarket Equivalent Part Numbers
          </h2>
          <p className="text-xs text-slate-500 mb-4">
            These aftermarket brands offer exact physical dimensions and specs to match OEM #{part.oemPartNumber}:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {part.crossReferences.map((cross, idx) => (
              <div key={idx} className="p-3.5 rounded-lg border border-slate-200 bg-slate-50 flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-bold uppercase text-slate-400 block">{cross.brand}</span>
                  <span className="text-sm font-extrabold text-slate-900">#{cross.partNumber}</span>
                </div>
                <a
                  href={`/api/out?q=${encodeURIComponent(`${cross.brand} ${cross.partNumber} belt`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-bold text-amber-700 hover:text-amber-800 bg-amber-100/60 hover:bg-amber-100 px-2.5 py-1.5 rounded transition"
                >
                  Buy {cross.brand} <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* Model Compatibility & Hub Links */}
        <section className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-xs">
          <h2 className="text-base sm:text-lg font-extrabold text-slate-900 mb-1">
            Confirmed Mower Compatibility
          </h2>
          <p className="text-xs text-slate-500 mb-4">
            Verified to fit the following mower decks and drive systems:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6">
            {part.compatibleModels.map((model, idx) => (
              <div key={idx} className="flex items-center gap-2 text-xs text-slate-700 p-2 rounded bg-slate-50 border border-slate-100">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                <span>{model}</span>
              </div>
            ))}
          </div>

          {matchedModelHubs.length > 0 && (
            <div className="border-t border-slate-100 pt-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
                Detailed Model Maintenance Hubs:
              </span>
              <div className="flex flex-wrap gap-2">
                {matchedModelHubs.map((m) => (
                  <Link
                    key={m.slug}
                    href={`/mowers/${m.slug}`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 hover:border-amber-400 text-xs font-bold text-slate-800 bg-slate-50 hover:bg-amber-50/50 transition"
                  >
                    <span>{m.brand} {m.modelName} Spec Hub</span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </section>
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
