import partsData from "@/data/parts.json";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ExternalLink, CheckCircle2, ShieldCheck, ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import { PartRecord } from "@/types/part";

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
    title: `${part.oemBrand} ${part.oemPartNumber} Aftermarket Equivalent & Specs | NoWrongPart`,
    description: `Exact dimensions and aftermarket equivalents for ${part.oemBrand} OEM #${part.oemPartNumber}.`,
  };
}

export default async function PartDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const part = (partsData as PartRecord[]).find((p) => p.slug === slug);

  if (!part) return notFound();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col justify-between font-sans">
      <header className="border-b border-slate-200 bg-white sticky top-0 z-10 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="text-xl font-black tracking-tight text-slate-900">
            NoWrongPart<span className="text-amber-500">.com</span>
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 px-3 py-1.5 rounded-md transition"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back to Search
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8 sm:py-10 flex-1 w-full">
        <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-50 text-amber-700 border border-amber-200">
              {part.oemBrand} OEM Spec
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

          <h2 className="text-base sm:text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-emerald-600" />
            Verified Aftermarket Replacements
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
                  href={`/api/out?q=${encodeURIComponent(`${cross.brand} ${cross.partNumber}${part.partType}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold rounded-lg shadow-sm transition active:scale-95"
                >
                  Check In-Stock on Amazon
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            ))}
          </div>

          <h3 className="text-sm sm:text-base font-bold text-slate-900 mb-2">Confirmed Model Compatibility</h3>
          <ul className="grid grid-cols-1 gap-2">
            {part.compatibleModels.map((model, idx) => (
              <li key={idx} className="flex items-center gap-2 text-xs sm:text-sm text-slate-600 bg-slate-50 p-2.5 rounded border border-slate-100">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 flex-shrink-0" />
                <span>{model}</span>
              </li>
            ))}
          </ul>
        </div>
      </main>

      <footer className="border-t border-slate-200 bg-white py-6">
        <div className="max-w-4xl mx-auto px-4 text-center text-xs text-slate-500 space-y-1">
          <p>As an Amazon Associate I earn from qualifying purchases.</p>
          <p>© 2026 NoWrongPart.com. Independent equipment compatibility reference.</p>
        </div>
      </footer>
    </div>
  );
}
