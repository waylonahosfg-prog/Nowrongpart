"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Gauge, ExternalLink, ShieldCheck, CheckCircle2, AlertTriangle } from "lucide-react";

export default function BladeSpeedCalculatorPage() {
  const [engineRpm, setEngineRpm] = useState<string>("3600");
  const [enginePulley, setEnginePulley] = useState<string>("6.0");
  const [spindlePulley, setSpindlePulley] = useState<string>("5.5");
  const [bladeLength, setBladeLength] = useState<string>("20.5");

  const rpm = parseFloat(engineRpm) || 0;
  const ePulley = parseFloat(enginePulley) || 0;
  const sPulley = parseFloat(spindlePulley) || 0;
  const bLength = parseFloat(bladeLength) || 0;

  // Blade Tip Speed Formula: FPM = (Engine RPM * (Engine Pulley / Spindle Pulley) * Blade Diameter * PI) / 12
  let fpm = 0;
  if (rpm > 0 && ePulley > 0 && sPulley > 0 && bLength > 0) {
    const spindleRpm = rpm * (ePulley / sPulley);
    const circumferenceFeet = (bLength * Math.PI) / 12;
    fpm = Math.round(spindleRpm * circumferenceFeet);
  }

  const isLegal = fpm <= 19000;
  const amazonBladeQuery = `${bladeLength} inch high lift commercial mower blades`;

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
        {/* Main Calculator Card */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-xs mb-6">
          <div className="flex items-center gap-2 text-amber-600 font-bold text-xs uppercase tracking-wider mb-2">
            <Gauge className="h-4 w-4" /> Commercial Turf Performance Tool
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900">
            Mower Blade Tip Speed (FPM) Calculator
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
            Calculate your cutter deck's Blade Tip Speed in Feet Per Minute (FPM). ANSI B71.4 safety standards limit commercial mower blade tip speed to a maximum of <strong>19,000 FPM</strong>.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Engine Operating Speed (RPM)
              </label>
              <input
                type="number"
                value={engineRpm}
                onChange={(e) => setEngineRpm(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm font-bold focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Individual Blade Length (Inches)
              </label>
              <input
                type="number"
                step="0.1"
                value={bladeLength}
                onChange={(e) => setBladeLength(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm font-bold focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Engine PTO Pulley Diameter (Inches)
              </label>
              <input
                type="number"
                step="0.1"
                value={enginePulley}
                onChange={(e) => setEnginePulley(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm font-bold focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Deck Spindle Pulley Diameter (Inches)
              </label>
              <input
                type="number"
                step="0.1"
                value={spindlePulley}
                onChange={(e) => setSpindlePulley(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm font-bold focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
          </div>

          {/* Result & Dual Monetization Box */}
          {fpm > 0 && (
            <div className="mt-8 p-6 bg-slate-900 text-white rounded-2xl shadow-xs">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                    <ShieldCheck className="h-4 w-4 text-emerald-400" />
                    Calculated Blade Tip Velocity
                  </span>
                  <div className="text-3xl sm:text-4xl font-black mt-1">
                    {fpm.toLocaleString()} <span className="text-sm font-bold text-slate-400">FPM</span>
                  </div>
                  <div className="mt-2 flex items-center gap-2">
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-md ${isLegal ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40" : "bg-red-500/20 text-red-400 border border-red-500/40"}`}>
                      {isLegal ? "✓ Within 19,000 FPM ANSI Safety Limit" : "⚠️ Exceeds 19,000 FPM ANSI Safety Limit"}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-2.5 w-full md:w-auto shrink-0">
                  <a
                    href={`/api/out?q=${encodeURIComponent(amazonBladeQuery)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 px-5 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-extrabold rounded-xl transition shadow-xs"
                  >
                    Find {bladeLength}" High-Lift Blades on Amazon
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* High-Ticket Wear Items Section */}
        {fpm > 0 && (
          <section className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-xs mb-6">
            <div className="flex items-center gap-2 text-amber-600 font-bold text-xs uppercase tracking-wider mb-1">
              <AlertTriangle className="h-4 w-4" /> Optimizing Cut Quality & Vacuum Flow
            </div>
            <h2 className="text-base sm:text-lg font-extrabold text-slate-900">
              Upgrading Deck Performance at {fpm.toLocaleString()} FPM
            </h2>
            <p className="text-xs text-slate-600 mt-1 mb-4">
              Higher blade tip speeds require precision blade balance and heavy-duty spindle bearings to handle rotational inertia.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <a
                href={`/api/out?q=${encodeURIComponent("magnetic wall mount lawn mower blade balancer")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-xl border border-slate-200 hover:border-amber-400 bg-slate-50 hover:bg-amber-50/30 transition flex flex-col justify-between group"
              >
                <div>
                  <span className="text-[11px] font-bold uppercase text-amber-700 block">Precision Maintenance</span>
                  <div className="text-sm font-bold text-slate-900 mt-0.5 group-hover:text-amber-700">
                    Magnetic Blade Balancers
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    Unbalanced blades destroy spindle bearings at high RPMs.
                  </p>
                </div>
                <span className="text-xs font-bold text-slate-900 mt-3 inline-flex items-center gap-1">
                  Shop Balancers on Amazon <ExternalLink className="h-3 w-3 text-amber-600" />
                </span>
              </a>

              <a
                href={`/api/out?q=${encodeURIComponent("mulching blade set commercial mower")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-xl border border-slate-200 hover:border-amber-400 bg-slate-50 hover:bg-amber-50/30 transition flex flex-col justify-between group"
              >
                <div>
                  <span className="text-[11px] font-bold uppercase text-amber-700 block">Cut Quality</span>
                  <span className="text-sm font-bold text-slate-900 mt-0.5 group-hover:text-amber-700 block">
                    Commercial Mulching Blades
                  </span>
                  <p className="text-xs text-slate-500 mt-1">
                    Gator and wavy teeth blades shred leaves and grass clippings fine.
                  </p>
                </div>
                <span className="text-xs font-bold text-slate-900 mt-3 inline-flex items-center gap-1">
                  Shop Mulch Blades on Amazon <ExternalLink className="h-3 w-3 text-amber-600" />
                </span>
              </a>

              <a
                href={`/api/out?q=${encodeURIComponent("digital tachometer engine rpm gauge")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-xl border border-slate-200 hover:border-amber-400 bg-slate-50 hover:bg-amber-50/30 transition flex flex-col justify-between group"
              >
                <div>
                  <span className="text-[11px] font-bold uppercase text-amber-700 block">Diagnostic Tool</span>
                  <div className="text-sm font-bold text-slate-900 mt-0.5 group-hover:text-amber-700">
                    Digital Engine Tachometers
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    Verify true governor RPM speed under full deck load.
                  </p>
                </div>
                <span className="text-xs font-bold text-slate-900 mt-3 inline-flex items-center gap-1">
                  Shop Tachometers on Amazon <ExternalLink className="h-3 w-3 text-amber-600" />
                </span>
              </a>
            </div>
          </section>
        )}

        {/* FPM Calculation Formula Reference */}
        <section className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
          <h2 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
            Blade Tip Speed Engineering Formula
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Blade Tip Speed (FPM) is calculated using engine RPM, pulley ratio, and blade length:
          </p>
          <div className="my-3 p-3 bg-slate-100 rounded-lg text-xs font-mono text-slate-800 overflow-x-auto">
            FPM = [Engine RPM × (Engine Pulley ÷ Spindle Pulley) × Blade Length × π] ÷ 12
          </div>
          <p className="text-xs text-slate-500 leading-relaxed">
            Most commercial zero-turns operate between <strong>18,000 and 18,900 FPM</strong> to maximize grass discharge velocity without exceeding safety limits.
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
