"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Calculator, ExternalLink, ShieldCheck, AlertTriangle, CheckCircle2 } from "lucide-react";
import { createDimensionSlug } from "@/lib/dimensions";

export default function BeltCalculatorPage() {
  const [pulleyA, setPulleyA] = useState<string>("5.0");
  const [pulleyB, setPulleyB] = useState<string>("5.0");
  const [centerDist, setCenterDist] = useState<string>("35.0");
  const [beltWidth, setBeltWidth] = useState<string>("5/8 in");

  const D1 = parseFloat(pulleyA) || 0;
  const D2 = parseFloat(pulleyB) || 0;
  const C = parseFloat(centerDist) || 0;

  // Standard V-Belt Pitch Length Formula: L = 2C + 1.57*(D1 + D2) + (D1 - D2)^2 / (4C)
  let calculatedLength = 0;
  if (C > 0 && D1 > 0 && D2 > 0) {
    calculatedLength = 2 * C + 1.57 * (D1 + D2) + Math.pow(D1 - D2, 2) / (4 * C);
  }

  const roundedLength = calculatedLength > 0 ? (Math.round(calculatedLength * 2) / 2).toFixed(1) : "0.0";
  const matchedSlug = createDimensionSlug(beltWidth, `${roundedLength} in`);
  const isFiveEighths = beltWidth.includes("5/8");
  const cleanWidth = isFiveEighths ? '5/8"' : '1/2"';
  const insideDiameter = isFiveEighths
    ? Math.max(0, parseFloat(roundedLength) - 3).toFixed(1)
    : Math.max(0, parseFloat(roundedLength) - 2).toFixed(1);
  const industrialCode = isFiveEighths
    ? `B${Math.round(parseFloat(roundedLength) - 3)} / 5L${Math.round(parseFloat(roundedLength) * 10)}`
    : `A${Math.round(parseFloat(roundedLength) - 2)} / 4L${Math.round(parseFloat(roundedLength) * 10)}`;

  const amazonSearchQuery = `${cleanWidth} x ${roundedLength}" kevlar mower belt`;

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
            <ArrowLeft className="h-3.5 w-3.5" /> Back to Search
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8 sm:py-10 flex-1 w-full">
        {/* Main Calculator Input Card */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-xs mb-6">
          <div className="flex items-center gap-2 text-amber-600 font-bold text-xs uppercase tracking-wider mb-2">
            <Calculator className="h-4 w-4" /> Free Turf Equipment Utility
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900">
            Lawn Mower V-Belt Length Calculator
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
            Calculate the exact Outside Circumference (OD) for replacement deck and hydro drive belts by entering pulley diameters and center-to-center shaft distance.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Drive Pulley Outer Diameter (Inches)
              </label>
              <input
                type="number"
                step="0.1"
                value={pulleyA}
                onChange={(e) => setPulleyA(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm font-bold focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Driven Pulley Outer Diameter (Inches)
              </label>
              <input
                type="number"
                step="0.1"
                value={pulleyB}
                onChange={(e) => setPulleyB(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm font-bold focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Center-to-Center Pulley Distance (Inches)
              </label>
              <input
                type="number"
                step="0.1"
                value={centerDist}
                onChange={(e) => setCenterDist(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm font-bold focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Belt Top Width Profile
              </label>
              <select
                value={beltWidth}
                onChange={(e) => setBeltWidth(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm font-bold focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                <option value="5/8 in">5/8" (B-Section / 5L Commercial Deck)</option>
                <option value="1/2 in">1/2" (A-Section / 4L Residential/Hydro)</option>
              </select>
            </div>
          </div>

          {/* Dynamic Result & Dual-CTA Monetization Box */}
          {calculatedLength > 0 && (
            <div className="mt-8 p-6 bg-gradient-to-r from-amber-50 via-amber-100/40 to-slate-50 border border-amber-300 rounded-2xl shadow-xs">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div>
                  <span className="text-xs font-extrabold uppercase tracking-wider text-amber-800 flex items-center gap-1.5">
                    <ShieldCheck className="h-4 w-4 text-emerald-600" />
                    Calculated Factory Belt Specs
                  </span>
                  <div className="text-3xl sm:text-4xl font-black text-slate-900 mt-1">
                    {cleanWidth} × {roundedLength}" <span className="text-sm font-bold text-slate-500">(OD)</span>
                  </div>
                  <div className="mt-2 text-xs text-slate-600 space-y-0.5">
                    <p>Inside Length (ID): <strong>~{insideDiameter} inches</strong></p>
                    <p>Industrial V-Belt Standard: <strong>{industrialCode}</strong></p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-2.5 w-full md:w-auto shrink-0">
                  <a
                    href={`/api/out?q=${encodeURIComponent(amazonSearchQuery)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 px-5 py-3 bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-extrabold rounded-xl shadow-xs transition"
                  >
                    Find {cleanWidth} × {roundedLength}" Belt on Amazon
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                  <Link
                    href={`/size/${matchedSlug}`}
                    className="inline-flex items-center justify-center gap-1.5 px-5 py-3 bg-slate-900 hover:bg-slate-800 text-white text-xs font-extrabold rounded-xl transition"
                  >
                    View {cleanWidth} × {roundedLength}" OEM Cross-Reference
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* High-Wear Companion Overhaul Cross-Sells */}
        {calculatedLength > 0 && (
          <section className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-xs mb-6">
            <div className="flex items-center gap-2 text-amber-600 font-bold text-xs uppercase tracking-wider mb-1">
              <AlertTriangle className="h-4 w-4" /> Recommended Deck Inspection Items
            </div>
            <h2 className="text-base sm:text-lg font-extrabold text-slate-900">
              Servicing a Belt for a Custom or Measured Deck Setup?
            </h2>
            <p className="text-xs text-slate-600 mt-1 mb-4">
              When installing a new {cleanWidth} × {roundedLength}" belt, verify these companion wear parts on Amazon to prevent premature belt shredding:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <a
                href={`/api/out?q=${encodeURIComponent(`${cleanWidth} mower deck idler pulley`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-xl border border-slate-200 hover:border-amber-400 bg-slate-50 hover:bg-amber-50/30 transition flex flex-col justify-between group"
              >
                <div>
                  <span className="text-[11px] font-bold uppercase text-amber-700 block">Backside Idler</span>
                  <div className="text-sm font-bold text-slate-900 mt-0.5 group-hover:text-amber-700">
                    Flat Idler Pulleys
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    Check for dry bearing growl or melted rubber on flat idler faces.
                  </p>
                </div>
                <span className="text-xs font-bold text-slate-900 mt-3 inline-flex items-center gap-1">
                  Shop Idler Pulleys <ExternalLink className="h-3 w-3 text-amber-600" />
                </span>
              </a>

              <a
                href={`/api/out?q=${encodeURIComponent("v belt measuring gauge tool")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-xl border border-slate-200 hover:border-amber-400 bg-slate-50 hover:bg-amber-50/30 transition flex flex-col justify-between group"
              >
                <div>
                  <span className="text-[11px] font-bold uppercase text-amber-700 block">Shop Specialty Tool</span>
                  <div className="text-sm font-bold text-slate-900 mt-0.5 group-hover:text-amber-700">
                    V-Belt Measuring Gauge
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    Accurately measure old V-belts without stretch errors.
                  </p>
                </div>
                <span className="text-xs font-bold text-slate-900 mt-3 inline-flex items-center gap-1">
                  Shop Belt Gauges <ExternalLink className="h-3 w-3 text-amber-600" />
                </span>
              </a>

              <a
                href={`/api/out?q=${encodeURIComponent("mower deck tension spring heavy duty")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-xl border border-slate-200 hover:border-amber-400 bg-slate-50 hover:bg-amber-50/30 transition flex flex-col justify-between group"
              >
                <div>
                  <span className="text-[11px] font-bold uppercase text-amber-700 block">Tension System</span>
                  <div className="text-sm font-bold text-slate-900 mt-0.5 group-hover:text-amber-700">
                    Deck Tension Springs
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    Fatigued springs cause belt whipping under heavy cutter loads.
                  </p>
                </div>
                <span className="text-xs font-bold text-slate-900 mt-3 inline-flex items-center gap-1">
                  Shop Tension Springs <ExternalLink className="h-3 w-3 text-amber-600" />
                </span>
              </a>
            </div>
          </section>
        )}

        {/* Calculation Logic & Formula Breakdown */}
        <section className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
          <h2 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
            V-Belt Length Calculation Formula
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            This tool uses the standard industrial V-belt pitch circumference formula:
          </p>
          <div className="my-3 p-3 bg-slate-100 rounded-lg text-xs font-mono text-slate-800 overflow-x-auto">
            L = 2C + 1.57 × (D1 + D2) + (D1 - D2)² / (4C)
          </div>
          <p className="text-xs text-slate-500 leading-relaxed">
            Where <strong>C</strong> is center-to-center distance, <strong>D1</strong> is drive pulley diameter, and <strong>D2</strong> is driven pulley diameter. For clutch-driven mower decks, always select dry-wrapped Kevlar/Aramid cord belts rather than rubber automotive V-belts.
          </p>
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
