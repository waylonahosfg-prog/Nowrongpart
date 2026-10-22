"use client";

import { useState } from "react";
import Link from "next/link";
import partsData from "@/data/parts.json";
import { Search, ArrowRight } from "lucide-react";
import { PartRecord } from "@/types/part";

export default function HomePage() {
  const [query, setQuery] = useState("");
  const parts: PartRecord[] = partsData;

  const filteredParts = parts.filter((part) => {
    const q = query.toLowerCase();
    return (
      part.oemBrand.toLowerCase().includes(q) ||
      part.oemPartNumber.toLowerCase().includes(q) ||
      part.partType.toLowerCase().includes(q) ||
      part.compatibleModels.some((m) => m.toLowerCase().includes(q))
    );
  });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col justify-between">
      <header className="border-b border-slate-200 bg-white sticky top-0 z-10 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-xl font-black tracking-tight text-slate-900">
            NoWrongPart<span className="text-amber-500">.com</span>
          </Link>
          <span className="text-xs font-semibold px-2.5 py-1 bg-amber-50 text-amber-800 rounded-full border border-amber-200">
            Turf Spec Engine
          </span>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8 sm:py-12 flex-1 w-full">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Never order the wrong equipment part again.
          </h1>
          <p className="mt-3 text-sm text-slate-600">
            OEM-to-aftermarket cross-referencing and exact belt dimensions for commercial mowers.
          </p>
        </div>

        <div className="relative max-w-xl mx-auto mb-8">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
            <Search className="h-5 w-5" />
          </div>
          <input
            type="text"
            className="w-full pl-11 pr-4 py-3 bg-white border border-slate-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm"
            placeholder="Search part number (e.g. 48265) or model (Cheetah)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        <div className="space-y-3">
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Showing {filteredParts.length} Verified Specifications
          </div>

          <div className="grid grid-cols-1 gap-3">
            {filteredParts.map((part) => (
              <div
                key={part.slug}
                className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:border-slate-300 transition flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-amber-600 text-sm">{part.oemBrand}</span>
                    <span className="text-slate-300">•</span>
                    <span className="text-xs font-medium text-slate-500">{part.partType}</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mt-1">
                    OEM #{part.oemPartNumber}
                  </h3>
                  <div className="mt-1 text-xs text-slate-600 flex flex-wrap gap-x-4 gap-y-1">
                    <span>Length: <strong>{part.specs.length}</strong></span>
                    <span>Width: <strong>{part.specs.width}</strong></span>
                  </div>
                </div>

                <Link
                  href={`/parts/${part.slug}`}
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition"
                >
                  View Equivalents
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </main>

      <footer className="border-t border-slate-200 bg-white py-6">
        <div className="max-w-5xl mx-auto px-4 text-center text-xs text-slate-500 space-y-1">
          <p>As an Amazon Associate I earn from qualifying purchases.</p>
          <p>© 2026 NoWrongPart.com. Independent fitment reference.</p>
        </div>
      </footer>
    </div>
  );
}
