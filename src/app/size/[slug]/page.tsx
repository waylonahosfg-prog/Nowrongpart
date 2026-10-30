import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ExternalLink,
  ShieldCheck,
  ArrowLeft,
  ArrowRight,
  ChevronRight,
  Home,
  Ruler,
  CheckCircle2,
  HelpCircle,
  Wrench,
} from "lucide-react";
import type { Metadata } from "next";
import { getAllDimensionGroups } from "@/lib/dimensions";

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
  const groups = getAllDimensionGroups();
  const group = groups.find((g) => g.slug === slug);
  if (!group) return { title: "Belt Size Not Found" };

  const oemList = group.matchingParts
    .map((p) => `${p.oemBrand} ${p.oemPartNumber}`)
    .join(", ");

  return {
    title: `${group.displayTitle} Kevlar Mower Belt (${group.industryCode}) Cross-Reference | NoWrongPart`,
    description: `Looking for a ${group.cleanWidth} x ${group.cleanLength} (${group.width} by ${group.length}) lawn mower belt? Direct Kevlar replacement for ${oemList}. View exact ID/OD specs and Stens/Oregon equivalents.`,
    openGraph: {
      title: `${group.displayTitle} Heavy-Duty Kevlar Mower Belt Cross-Reference`,
      description: `Fits ${oemList}. Industrial cross-reference ${group.industryCode}.`,
      url: `https://nowrongpart.com/size/${group.slug}`,
      siteName: "NoWrongPart",
      type: "website",
    },
  };
}

export default async function BeltDimensionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const allGroups = getAllDimensionGroups();
  const group = allGroups.find((g) => g.slug === slug);

  if (!group) return notFound();

  const numLength = parseFloat(group.length);
  const isFiveEighths = group.width.includes("5/8");
  const insideDiameter = isFiveEighths ? (numLength - 3).toFixed(1) : (numLength - 2).toFixed(1);

  // Nearby belt sizes (within +/- 5 inches of same width) for internal linking & stretched-belt shoppers
  const nearbySizes = allGroups
    .filter(
      (g) =>
        g.width === group.width &&
        g.slug !== group.slug &&
        Math.abs(parseFloat(g.length) - numLength) <= 6
    )
    .slice(0, 6);

  const baseUrl = "https://nowrongpart.com";
  const oemSummary = group.matchingParts
    .map((p) => `${p.oemBrand} #${p.oemPartNumber}`)
    .join(", ");

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": `What mowers use a ${group.cleanWidth} x ${group.cleanLength} belt?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `A ${group.cleanWidth} by ${group.cleanLength} (${group.industryCode}) belt fits ${group.matchingParts
            .flatMap((p) => p.compatibleModels)
            .join(", ")}, replacing OEM part numbers ${oemSummary}.`,
        },
      },
      {
        "@type": "Question",
        "name": `What is the inside length (ID) of a ${group.cleanWidth} x ${group.cleanLength} mower belt?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `A ${group.cleanWidth} x ${group.cleanLength} belt has an Outside Circumference (OD) of ${group.length} and an Inside Circumference (ID) of approximately ${insideDiameter} inches (${group.industryCode} standard).`,
        },
      },
    ],
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col justify-between font-sans">
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
            <ArrowLeft className="h-3.5 w-3.5" /> All Parts & Sizes
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6 sm:py-8 flex-1 w-full">
        {/* Breadcrumb */}
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
              <span className="font-medium text-slate-700">Belt Size Lookup</span>
            </li>
            <ChevronRight className="h-3 w-3 text-slate-300 shrink-0" />
            <li>
              <span className="font-semibold text-slate-900">{group.displayTitle} Belt</span>
            </li>
          </ol>
        </nav>

        {/* Primary Dimensional Spec Card */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-xs mb-6">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-100 text-amber-900 border border-amber-200 inline-flex items-center gap-1">
              <Ruler className="h-3 w-3" /> Exact Dimensional Spec
            </span>
            <span className="text-slate-300">•</span>
            <span className="text-xs font-bold text-slate-600">
              Industrial Code: {group.industryCode}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
            {group.displayTitle} ({group.width} × {group.length}) Kevlar Lawn Mower Belt Cross-Reference
          </h1>

          <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
            Direct dimensional match and OEM cross-reference chart for <strong>{group.cleanWidth} wide by {group.cleanLength} outside length</strong> Aramid/Kevlar V-belts. Confirmed fitment for <strong>{group.brands.join(", ")}</strong> turf equipment.
          </p>

          {/* 4-Column Engineering Measurement Box */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 border-y border-slate-100 py-4 my-6 bg-slate-50/70 rounded-lg px-4">
            <div>
              <span className="text-[11px] font-semibold text-slate-400 uppercase block">Top Width</span>
              <span className="font-extrabold text-slate-900 text-base sm:text-lg">{group.width}</span>
            </div>
            <div>
              <span className="text-[11px] font-semibold text-slate-400 uppercase block">Outside Length (OD)</span>
              <span className="font-extrabold text-slate-900 text-base sm:text-lg">{group.length}</span>
            </div>
            <div>
              <span className="text-[11px] font-semibold text-slate-400 uppercase block">Inside Length (ID)</span>
              <span className="font-extrabold text-slate-900 text-base sm:text-lg">~{insideDiameter} in</span>
            </div>
            <div>
              <span className="text-[11px] font-semibold text-slate-400 uppercase block">Belt Series</span>
              <span className="font-extrabold text-amber-700 text-sm sm:text-base">{group.industryCode}</span>
            </div>
          </div>

          {/* Direct Universal Size Buy CTA */}
          <div className="p-4 bg-gradient-to-r from-amber-50 to-amber-100/50 border border-amber-200 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="text-sm font-extrabold text-slate-900">
                Need a Heavy-Duty {group.displayTitle} Aramid/Kevlar Belt Today?
              </div>
              <p className="text-xs text-slate-600 mt-0.5">
                High-tensile Kevlar cord construction rated for severe clutching and backside idler pulleys.
              </p>
            </div>
            <a
              href={`/api/out?q=${encodeURIComponent(`${group.cleanWidth} x ${group.cleanLength} kevlar lawn mower belt`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 px-5 py-3 bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-extrabold rounded-lg shadow-xs transition shrink-0"
            >
              Find {group.displayTitle} Kevlar Belt on Amazon
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>

        {/* Matching OEM & Aftermarket Part Numbers */}
        <section className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-xs mb-6">
          <h2 className="text-base sm:text-lg font-extrabold text-slate-900 mb-1 flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-emerald-600" />
            OEM & Aftermarket Part Numbers Measuring {group.displayTitle}
          </h2>
          <p className="text-xs text-slate-500 mb-4">
            Every OEM belt listed below shares the exact {group.width} × {group.length} dimensional envelope:
          </p>

          <div className="space-y-4">
            {group.matchingParts.map((part) => (
              <div
                key={part.slug}
                className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 flex flex-col justify-between gap-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200/70 pb-3">
                  <div>
                    <span className="text-xs font-extrabold uppercase text-amber-600">
                      {part.oemBrand} • {part.partType}
                    </span>
                    <h3 className="text-lg font-extrabold text-slate-900">
                      {part.oemBrand} OEM #{part.oemPartNumber}
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Aftermarket Equivalents:{" "}
                      <strong>
                        {part.crossReferences.map((c) => `${c.brand} ${c.partNumber}`).join(" / ")}
                      </strong>
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <Link
                      href={`/parts/${part.slug}`}
                      className="px-3 py-2 rounded-lg border border-slate-300 bg-white hover:bg-slate-100 text-xs font-bold text-slate-800 transition"
                    >
                      Full #{part.oemPartNumber} Spec Sheet
                    </Link>
                    <a
                      href={`/api/out?q=${encodeURIComponent(`${part.oemBrand} ${part.oemPartNumber} kevlar belt`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-3.5 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition"
                    >
                      Check Amazon <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </div>

                <div>
                  <span className="text-[11px] font-bold uppercase text-slate-400 block mb-1.5">
                    Confirmed Machines Using This {group.displayTitle} Belt:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                    {part.compatibleModels.map((m, idx) => (
                      <div key={idx} className="flex items-center gap-1.5 text-xs text-slate-700">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                        <span>{m}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Stretched Belt Warning & Nearby Sizes */}
        {nearbySizes.length > 0 && (
          <section className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs mb-6">
            <div className="flex items-center gap-2 text-amber-600 font-bold text-xs uppercase tracking-wider mb-1">
              <Wrench className="h-4 w-4" /> Did You Measure an Old Stretched Belt?
            </div>
            <h2 className="text-base font-extrabold text-slate-900">
              Close {group.cleanWidth} Belt Sizes (Account for 1&quot;–2&quot; of Belt Stretch)
            </h2>
            <p className="text-xs text-slate-600 mt-1 mb-4">
              Used mower belts typically stretch <strong>1.0 to 2.5 inches</strong> before snapping. If you measured {group.cleanLength} with a tape measure on a broken belt, verify whether your machine actually calls for a slightly shorter factory size below:
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {nearbySizes.map((near) => (
                <Link
                  key={near.slug}
                  href={`/size/${near.slug}`}
                  className="p-3 rounded-lg border border-slate-200 hover:border-amber-400 bg-slate-50 hover:bg-amber-50/30 transition flex items-center justify-between group"
                >
                  <div>
                    <div className="text-sm font-extrabold text-slate-900 group-hover:text-amber-700">
                      {near.displayTitle}
                    </div>
                    <div className="text-[11px] text-slate-500 truncate">
                      {near.brands.slice(0, 2).join(", ")} ({near.industryCode.split(" / ")[0]})
                    </div>
                  </div>
                  <ArrowRight className="h-3.5 w-3.5 text-slate-400 group-hover:text-amber-600 shrink-0" />
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Technical FAQ Block */}
        <section className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
          <h2 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
            <HelpCircle className="h-4 w-4 text-amber-500" />
            {group.displayTitle} Mower Belt Technical FAQ
          </h2>
          <div className="space-y-4 text-xs sm:text-sm">
            <div>
              <h3 className="font-bold text-slate-900">
                What is the difference between {group.industryCode} and {group.displayTitle}?
              </h3>
              <p className="text-slate-600 mt-1">
                Lawn mower belts are listed by their <strong>Outside Circumference ({group.length})</strong>, whereas standard industrial V-belts ({group.industryCode.split(" / ")[0]}) are numbered by their <strong>Inside Circumference (~{insideDiameter} in)</strong>. Always choose a dry-cloth wrapped Aramid/Kevlar turf belt rather than a black automotive rubber belt so the clutch engages smoothly without grabbing.
              </p>
            </div>
          </div>
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
