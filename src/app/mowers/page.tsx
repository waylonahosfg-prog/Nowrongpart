import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, ArrowRight, Tractor } from "lucide-react";
import modelsData from "@/data/models.json";
import { SITE_URL } from "@/lib/site";
import { ModelHubRecord } from "@/types/part";

const models = modelsData as ModelHubRecord[];

export const metadata: Metadata = {
  title: "Mower Model Reference Directory | NoWrongPart",
  description:
    "Browse mower model records and their listed belt, blade, and filter references. Confirm the exact year, deck, and serial range with the manufacturer before ordering.",
  alternates: {
    canonical: "/mowers",
  },
  openGraph: {
    title: "Mower Model Reference Directory",
    description:
      "Browse the mower models currently listed in the NoWrongPart reference database.",
    url: `${SITE_URL}/mowers`,
    siteName: "NoWrongPart",
    type: "website",
  },
};

export default function MowerDirectoryPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col justify-between font-sans">
      <header className="border-b border-slate-200 bg-white sticky top-0 z-10 shadow-xs">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
          <Link href="/" className="text-xl font-black tracking-tight text-slate-900">
            NoWrongPart<span className="text-amber-500">.com</span>
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-3 py-2 rounded-md transition"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Part Lookup
          </Link>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-10 sm:py-12 flex-1 w-full">
        <div className="max-w-3xl mb-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-bold uppercase tracking-wide text-amber-800">
            <Tractor className="h-3.5 w-3.5" /> {models.length} model records
          </div>
          <h1 className="mt-3 text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
            Mower model reference directory
          </h1>
          <p className="mt-3 text-base text-slate-600 leading-relaxed">
            Browse the mower models currently listed in NoWrongPart’s database. A listed part number is a reference—not a substitute for checking the exact machine, deck, year, and serial range in the manufacturer’s parts catalog or manual.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {models.map((model) => (
            <Link
              key={model.slug}
              href={`/mowers/${model.slug}`}
              className="group rounded-xl border border-slate-200 bg-white p-5 shadow-xs transition hover:border-amber-400 hover:shadow-sm"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-extrabold uppercase tracking-wider text-amber-700">
                    {model.brand} · {model.machineCategory}
                  </p>
                  <h2 className="mt-1 text-lg font-bold text-slate-900 group-hover:text-amber-700">
                    {model.modelName}
                  </h2>
                </div>
                <ArrowRight className="h-4 w-4 shrink-0 text-slate-400 transition group-hover:translate-x-0.5 group-hover:text-amber-600" />
              </div>
              <p className="mt-3 text-sm text-slate-600">Deck: {model.deckSize}</p>
              <div className="mt-4 border-t border-slate-100 pt-3 text-xs text-slate-600">
                <span className="font-semibold text-slate-800">Listed deck-belt reference:</span>{" "}
                OEM #{model.deckBeltOem} · {model.deckBeltDimensions}
              </div>
            </Link>
          ))}
        </div>

        <p className="mt-6 text-xs leading-relaxed text-slate-500">
          Model-year and serial-range details are not published for every record. Verify the machine identification plate and the applicable manufacturer parts list before ordering.
        </p>
      </main>

      <footer className="border-t border-slate-200 bg-white py-6 mt-12">
        <div className="max-w-5xl mx-auto px-4 text-center text-xs text-slate-500 space-y-1">
          <p>As an Amazon Associate I earn from qualifying purchases.</p>
          <p>© 2026 NoWrongPart.com. Independent equipment compatibility reference.</p>
        </div>
      </footer>
    </div>
  );
}
