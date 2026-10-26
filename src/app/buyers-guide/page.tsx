import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle2, ClipboardCheck, Info } from "lucide-react";
import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Mower Buying Guide: What to Verify Before You Buy | NoWrongPart",
  description:
    "A practical checklist for comparing mower configurations, service support, and replacement-part information without relying on unsourced rankings or outdated prices.",
  alternates: {
    canonical: "/buyers-guide",
  },
  openGraph: {
    title: "Mower Buying Guide: What to Verify Before You Buy",
    description:
      "Compare exact mower configurations and service information with a source-first checklist.",
    url: `${SITE_URL}/buyers-guide`,
    siteName: "NoWrongPart",
    type: "website",
  },
};

const buyingChecks = [
  {
    title: "Confirm the exact machine configuration",
    description:
      "Write down the complete model number, deck size, model year when available, and serial number. A model family can include different decks or production revisions, so do not assume one listing fits every version.",
  },
  {
    title: "Compare specifications from the same model year",
    description:
      "Use the manufacturer’s product page, operator manual, and parts catalog for the specific configuration. Record the source and date for figures such as deck construction, engine, and warranty before comparing models.",
  },
  {
    title: "Judge serviceability from real evidence",
    description:
      "Check the maintenance schedule and service instructions, and inspect access to routine service points where possible. Avoid relying on a universal repair-time or durability claim unless its test method and conditions are published.",
  },
  {
    title: "Check parts and local support",
    description:
      "Before buying, look up the actual replacement numbers for the machine and deck you are considering. Ask a local dealer or repair shop about parts availability, service coverage, and warranty support for that exact model.",
  },
];

export default function BuyersGuidePage() {
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
            <ArrowLeft className="h-3.5 w-3.5" /> Back to Part Lookup
          </Link>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-10 sm:py-12 flex-1 w-full">
        <div className="max-w-3xl mb-8">
          <span className="px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-100 text-amber-800 border border-amber-200">
            A practical checklist
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 mt-3">
            A careful guide to choosing a mower
          </h1>
          <p className="mt-3 text-base text-slate-600 leading-relaxed">
            Compare the exact machine you plan to buy—not just a model-family name. Use manufacturer documents for specifications, and treat repair-time, lifespan, and price comparisons as claims that need a source and a clear method.
          </p>
        </div>

        <div className="mb-8 flex items-start gap-3 rounded-xl border border-blue-200 bg-blue-50 p-4 sm:p-5">
          <Info className="h-5 w-5 text-blue-700 shrink-0 mt-0.5" />
          <p className="text-sm leading-relaxed text-slate-700">
            NoWrongPart is a reference tool, not a hands-on mower test or a price tracker. The current catalog does not publish the source, model-year, or serial-range history for every entry. Confirm specifications and fitment in the manufacturer’s parts catalog or manual before buying.
          </p>
        </div>

        <section aria-labelledby="checklist-heading" className="space-y-4">
          <div className="flex items-center gap-2">
            <ClipboardCheck className="h-5 w-5 text-amber-600" />
            <h2 id="checklist-heading" className="text-xl font-extrabold text-slate-900">
              Four checks to make before you choose
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {buyingChecks.map((item) => (
              <article
                key={item.title}
                className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6 shadow-xs"
              >
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold text-slate-900">{item.title}</h3>
                    <p className="mt-2 text-sm text-slate-600 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-8 rounded-xl border border-slate-200 bg-white p-5 sm:p-6">
          <h2 className="text-lg font-extrabold text-slate-900">Before ordering a replacement part</h2>
          <p className="mt-2 text-sm text-slate-600 leading-relaxed">
            Match the part number to the mower’s full model and serial details, then check the correct deck and parts-list revision. Belt length or a similar-looking part number by itself is not a fitment guarantee.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              href="/mowers"
              className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-slate-800"
            >
              Browse mower model records <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 transition hover:border-slate-400"
            >
              Search part references
            </Link>
          </div>
        </section>
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
