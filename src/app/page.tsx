"use client";

import { useState } from "react";
import Link from "next/link";
import partsData from "@/data/parts.json";
import modelsData from "@/data/models.json";
import { Search, ArrowRight, Wrench, ShieldCheck, Tractor, Sparkles } from "lucide-react";
import { PartRecord, ModelHubRecord } from "@/types/part";

export default function HomePage() {
  const [query, setQuery] = useState("");
  const [selectedBrand, setSelectedBrand] = useState<string>("All");

  const parts: PartRecord[] = partsData;
  const models: ModelHubRecord[] = modelsData as ModelHubRecord[];

  // Extract unique brands for quick filter pills
  const brands = ["All", ...Array.from(new Set(parts.map((p) => p.oemBrand)))];

  const filteredParts = parts.filter((part) => {
    const q = query.toLowerCase();
    const matchesSearch =
      part.oemBrand.toLowerCase().includes(q) ||
      part.oemPartNumber.toLowerCase().includes(q) ||
      part.partType.toLowerCase().includes(q) ||
      part.compatibleModels.some((m) => m.toLowerCase().includes(q)) ||
      part.crossReferences.some(
        (c) =>
          c.partNumber.toLowerCase().includes(q) ||
          c.brand.toLowerCase().includes(q)
      );

    const matchesBrand =
      selectedBrand === "All" ||
      part.oemBrand.toLowerCase() === selectedBrand.toLowerCase();

    return matchesSearch && matchesBrand;
  });

  const filteredModels = models.filter((model) => {
    const q = query.toLowerCase();
    const matchesSearch =
      model.brand.toLowerCase().includes(q) ||
      model.modelName.toLowerCase().includes(q) ||
      model.deckBeltOem.toLowerCase().includes(q) ||
      model.bladeSpecs.oemPartNumber.toLowerCase().includes(q);

    const matchesBrand =
      selectedBrand === "All" ||
      model.brand.toLowerCase() === selectedBrand.toLowerCase();

    return matchesSearch && matchesBrand;
  });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col justify-between font-sans">
      {/* Sticky Top Header */}
      <header className="border-b border-slate-200 bg-white sticky top-0 z-20 shadow-xs">
        <div className="max-w-5xl mx-auto px-4 py-3.5 flex items-center justify-between gap-2">
          <Link href="/" className="text-xl font-black tracking-tight text-slate-900">
            NoWrongPart<span className="text-amber-500">.com</span>
          </Link>

          <div className="flex items-center gap-2 sm:gap-3">
            <span className="hidden md:inline-flex text-xs font-semibold px-2.5 py-1 bg-amber-50 text-amber-800 rounded-full border border-amber-200">
              60+ Verified Turf Specs
            </span>
            <Link
              href="/buyers-guide"
              className="inline-flex items-center gap-1.5 text-xs font-bold px-3.5 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition shadow-xs"
            >
              <ShieldCheck className="h-3.5 w-3.5 text-amber-400" />
              <span>Mower Buyer&apos;s Guide</span>
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8 sm:py-12 flex-1 w-full">
        {/* Hero Section */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-100/80 text-amber-900 border border-amber-200 mb-3">
            <Wrench className="h-3.5 w-3.5 text-amber-600" />
            Commercial & Residential Fitment Engine
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            Never order the wrong equipment part again.
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-600">
            Instant OEM-to-aftermarket cross-referencing, exact Kevlar belt dimensions, and verified blade fitment for zero-turns and lawn tractors.
          </p>
        </div>

        {/* Search Input Bar */}
        <div className="relative max-w-2xl mx-auto mb-6">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
            <Search className="h-5 w-5" />
          </div>
          <input
            type="text"
            className="w-full pl-11 pr-4 py-3.5 bg-white border border-slate-300 rounded-xl shadow-xs focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm"
            placeholder="Search OEM part # (48265), aftermarket (265-247), or mower (Cheetah, Raptor 52)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        {/* Brand Quick-Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-3 mb-8 no-scrollbar justify-start sm:justify-center">
          {brands.map((brand) => {
            const active = selectedBrand === brand;
            return (
              <button
                key={brand}
                onClick={() => setSelectedBrand(brand)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition cursor-pointer ${
                  active
                    ? "bg-amber-500 text-slate-950 shadow-xs"
                    : "bg-white text-slate-600 border border-slate-200 hover:border-slate-300"
                }`}
              >
                {brand}
              </button>
            );
          })}
        </div>

        {/* Buyer's Guide Promotional Callout */}
        <div className="mb-10 bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl p-5 sm:p-6 text-white shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-amber-400 mb-1">
              <Sparkles className="h-3.5 w-3.5" /> New Mechanic&apos;s Inspection Report
            </div>
            <h2 className="text-lg sm:text-xl font-extrabold">
              Shopping for a New Zero-Turn or Lawn Tractor?
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
              Compare Cub Cadet, Bad Boy, Toro, and John Deere by deck steel thickness, Hydro-Gear transaxle serviceability, and annual belt replacement costs.
            </p>
          </div>
          <Link
            href="/buyers-guide"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-extrabold rounded-xl shrink-0 transition"
          >
            Read Buyer&apos;s Guide
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Section 1: Mower Model Maintenance Hubs */}
        {filteredModels.length > 0 && (
          <section className="mb-12">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Tractor className="h-5 w-5 text-amber-600" />
                <h2 className="text-base sm:text-lg font-extrabold text-slate-900">
                  Mower Model Spec & Maintenance Hubs ({filteredModels.length})
                </h2>
              </div>
              <span className="text-xs text-slate-500 hidden sm:inline">
                Complete Belt, Blade & Filter Kits
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {filteredModels.slice(0, 6).map((m) => (
                <Link
                  key={m.slug}
                  href={`/parts/${m.deckBeltSlug}`}
                  className="bg-white border border-slate-200 hover:border-amber-400 rounded-xl p-4 shadow-xs transition flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-extrabold uppercase tracking-wider text-amber-600">
                        {m.brand}
                      </span>
                      <span className="text-[11px] font-medium px-2 py-0.5 bg-slate-100 text-slate-600 rounded">
                        {m.machineCategory}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-slate-900 mt-1 group-hover:text-amber-600 transition">
                      {m.modelName}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">{m.deckSize}</p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-slate-600">
                      Deck Belt: <strong className="text-slate-900">#{m.deckBeltOem}</strong>
                    </span>
                    <span className="font-bold text-slate-900 group-hover:translate-x-0.5 transition inline-flex items-center gap-1">
                      Specs <ArrowRight className="h-3 w-3 text-amber-500" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Section 2: Direct OEM Part Cross-Reference List */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Showing {filteredParts.length} Verified Belt & Part Specifications
            </h2>
            {selectedBrand !== "All" && (
              <button
                onClick={() => setSelectedBrand("All")}
                className="text-xs font-semibold text-amber-600 hover:underline"
              >
                Reset Brand Filter
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 gap-3">
            {filteredParts.map((part) => (
              <div
                key={part.slug}
                className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs hover:border-slate-300 transition flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-bold text-amber-600 text-sm">{part.oemBrand}</span>
                    <span className="text-slate-300">•</span>
                    <span className="text-xs font-medium text-slate-500">{part.partType}</span>
                    <span className="text-slate-300 hidden sm:inline">•</span>
                    <span className="text-xs text-slate-400 hidden sm:inline">
                      Replaces: {part.crossReferences.map((c) => `${c.brand} ${c.partNumber}`).join(", ")}
                    </span>
                  </div>
                  <h3 className="text-lg font-extrabold text-slate-900 mt-1">
                    OEM #{part.oemPartNumber}
                  </h3>
                  <div className="mt-1.5 text-xs text-slate-600 flex flex-wrap gap-x-4 gap-y-1">
                    <span>Length: <strong>{part.specs.length}</strong></span>
                    <span>Width: <strong>{part.specs.width}</strong></span>
                    <span>Cord: <strong>{part.specs.material}</strong></span>
                  </div>
                  <div className="mt-2 text-xs text-slate-500 line-clamp-1">
                    Fits: {part.compatibleModels.join(" | ")}
                  </div>
                </div>

                <Link
                  href={`/parts/${part.slug}`}
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition shrink-0"
                >
                  View Equivalents
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-8 mt-12">
        <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="space-y-1 text-center sm:text-left">
            <p className="font-semibold text-slate-700">NoWrongPart.com — Commercial & Residential Fitment Index</p>
            <p>As an Amazon Associate I earn from qualifying purchases.</p>
          </div>
          <div className="flex items-center gap-4 font-medium text-slate-600">
            <Link href="/" className="hover:text-slate-900">Part Lookup</Link>
            <Link href="/buyers-guide" className="hover:text-slate-900">Mower Buyer&apos;s Guide</Link>
            <Link href="/sitemap.xml" className="hover:text-slate-900">Sitemap</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
