import Link from "next/link";
import { ExternalLink, ShieldCheck, Wrench, CheckCircle2, ArrowLeft, AlertTriangle } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Commercial & Residential Mower Buyer's Guide (By Serviceability) | NoWrongPart",
  description: "Compare zero-turn mowers and lawn tractors by deck steel thickness, Hydro-Gear transaxle serviceability, engine reliability, and replacement belt costs.",
};

interface MowerGuideItem {
  id: string;
  brand: string;
  model: string;
  category: string;
  engine: string;
  deckType: string;
  transaxle: string;
  replacementBeltSlug: string;
  replacementBeltOem: string;
  verdict: string;
  pros: string[];
  watchOuts: string;
}

const mowerPicks: MowerGuideItem[] = [
  {
    id: "cub-cadet-zt1-50",
    brand: "Cub Cadet",
    model: "Ultima ZT1 50-Inch",
    category: "Best Value Fabricated Deck (Up to 3 Acres)",
    engine: "23 HP Kawasaki FR691V V-Twin",
    deckType: "50\" Fabricated 11-Gauge AeroForce Steel",
    transaxle: "Dual Hydro-Gear EZT-2200",
    replacementBeltSlug: "cub-cadet-954-05078",
    replacementBeltOem: "954-05078 (5/8\" x 143.5\")",
    verdict: "The Kawasaki FR691V engine alone makes the ZT1-50 a standout in the residential class. Easy pulley access under the removable floor pan makes belt swaps a 15-minute job.",
    pros: [
      "Commercial-grade Kawasaki V-Twin engine",
      "Welded fabricated steel deck instead of thin stamped steel",
      "Standard 5/8\" x 143.5\" Kevlar aftermarket belts are inexpensive ($28)"
    ],
    watchOuts: "Sealed EZT transaxles do not have external spin-on filters; avoid heavy towing on steep grades."
  },
  {
    id: "bad-boy-magnum-54",
    brand: "Bad Boy",
    model: "MZ Magnum 54-Inch",
    category: "Heaviest Deck Steel Under $4,500",
    engine: "24 HP Kohler PRO KT724 (747cc)",
    deckType: "54\" Solid 7-Gauge Welded Steel",
    transaxle: "Dual Hydro-Gear ZT-2200 Integrated",
    replacementBeltSlug: "bad-boy-041-1470-00",
    replacementBeltOem: "041-1470-00 (5/8\" x 147\")",
    verdict: "Built like a commercial tank. While competitors use 11- or 12-gauge steel, Bad Boy welds a 7-gauge bull-nose deck that refuses to warp when hitting roots or field transitions.",
    pros: [
      "Industry-thickest 7-gauge fabricated steel cutter deck",
      "Flip-up floorboards give wide-open access to top deck spindles",
      "Uses heavy 5/8\" wide Aramid belts that resist snapping under shock loads"
    ],
    watchOuts: "Heavy chassis weight requires firm turf; can leave ruts in wet, swampy bottoms."
  },
  {
    id: "toro-timecutter-5000",
    brand: "Toro",
    model: "TimeCutter 50-Inch (MyRIDE)",
    category: "Best Suspension & Ride Comfort",
    engine: "23 HP Kawasaki V-Twin / Toro 24.5 HP",
    deckType: "50\" 10-Gauge IronForged Fabricated",
    transaxle: "Dual Hydrostatic HG-ZT2100",
    replacementBeltSlug: "toro-119-8819",
    replacementBeltOem: "119-8819 (1/2\" x 141.5\")",
    verdict: "Rough pastures beat up both the operator and the chassis. Toro's suspended operator platform isolates you from ruts while the 10-gauge IronForged deck handles thick fescue.",
    pros: [
      "Unmatched back protection on bumpy, uneven acreage",
      "Smart Speed control lever lets beginners trim slowly around beds",
      "Massive aftermarket parts support for blades and spindles"
    ],
    watchOuts: "Runs a 1/2\" wide deck belt (#119-8819); always keep a Kevlar spare on the shelf."
  },
  {
    id: "john-deere-s100-z315e",
    brand: "John Deere",
    model: "Z315E ZTrak / S100 42-Inch",
    category: "Best Parts Availability for Tight Yards (< 1.5 Acres)",
    engine: "20 HP V-Twin (Z315E) / 17.5 HP Single (S100)",
    deckType: "42\" 12-Gauge Accel Deep / Edge Stamped",
    transaxle: "Hydrostatic Twin-Touch / Dual EZT",
    replacementBeltSlug: "john-deere-gx20072",
    replacementBeltOem: "GX20072 (1/2\" x 103.75\")",
    verdict: "If you have narrow backyard gates and want a mower where every spindle, pulley, and belt is stocked online for next-day delivery, the 42-inch Deere platform is the gold standard.",
    pros: [
      "Deep-dish deck shell bags and mulches cleanly without clumping",
      "2-blade system is fast and cheap to sharpen or replace",
      "Fits through standard 48-inch residential fence gates"
    ],
    watchOuts: "Stamped deck requires regular scraping to prevent wet grass rust buildup."
  }
];

export default function BuyersGuidePage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col justify-between font-sans">
      <header className="border-b border-slate-200 bg-white sticky top-0 z-10 shadow-xs">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="text-xl font-black tracking-tight text-slate-900">
            NoWrongPart<span className="text-amber-500">.com</span>
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-md transition"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back to Part Lookup
          </Link>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-10 flex-1 w-full">
        <div className="max-w-3xl mb-10">
          <span className="px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-100 text-amber-800 border border-amber-200">
            Mechanic&apos;s Equipment Inspection
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 mt-3">
            Zero-Turn & Riding Mower Buyer&apos;s Guide: Ranked by Serviceability
          </h1>
          <p className="mt-3 text-base text-slate-600 leading-relaxed">
            Most mower reviews only look at cupholders and paint. We evaluate machines by what actually matters after 200 hours of cutting: <strong>deck steel gauge, Kawasaki/Kohler engine longevity, pulley access, and replacement belt costs.</strong>
          </p>
        </div>

        {/* Mechanic's 3 Rules Banner */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
            <div className="text-xs font-bold uppercase text-amber-600 mb-1">Rule #1: Deck Gauge</div>
            <h2 className="font-bold text-slate-900 text-sm">Fabricated Over Stamped</h2>
            <p className="text-xs text-slate-600 mt-1">
              For properties over 1.5 acres, insist on a 7-gauge to 11-gauge welded (fabricated) deck so spindles don&apos;t flex out of alignment.
            </p>
          </div>
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
            <div className="text-xs font-bold uppercase text-amber-600 mb-1">Rule #2: Belt Width</div>
            <h2 className="font-bold text-slate-900 text-sm">5/8&quot; vs. 1/2&quot; Aramid Belts</h2>
            <p className="text-xs text-slate-600 mt-1">
              Decks 52 inches and wider put heavy torque on the PTO. Machines using 5/8-inch Kevlar belts last 2x longer than 1/2-inch belts.
            </p>
          </div>
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
            <div className="text-xs font-bold uppercase text-amber-600 mb-1">Rule #3: Transaxles</div>
            <h2 className="font-bold text-slate-900 text-sm">Know Your Hydro-Gear Tier</h2>
            <p className="text-xs text-slate-600 mt-1">
              EZT/ZT-2200 drives are great for flat lawns. If you have steep hills, step up to serviceable ZT-2800 or ZT-3100 transmissions.
            </p>
          </div>
        </div>

        {/* Mower Breakdown Cards */}
        <div className="space-y-6">
          {mowerPicks.map((mower) => (
            <div
              key={mower.id}
              className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-xs"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-4">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-600">
                    {mower.category}
                  </span>
                  <h2 className="text-2xl font-extrabold text-slate-900 mt-0.5">
                    {mower.brand} {mower.model}
                  </h2>
                </div>

                <a
                  href={`/api/out?q=${encodeURIComponent(`${mower.brand} ${mower.model} zero turn mower`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold rounded-lg shadow-xs transition"
                >
                  Check Mower Availability on Amazon
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>

              {/* Spec Bar */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 py-4 bg-slate-50 rounded-lg px-4 my-4 text-xs">
                <div>
                  <span className="text-slate-400 font-semibold uppercase block">Engine</span>
                  <span className="font-bold text-slate-900">{mower.engine}</span>
                </div>
                <div>
                  <span className="text-slate-400 font-semibold uppercase block">Cutter Deck</span>
                  <span className="font-bold text-slate-900">{mower.deckType}</span>
                </div>
                <div>
                  <span className="text-slate-400 font-semibold uppercase block">Drive System</span>
                  <span className="font-bold text-slate-900">{mower.transaxle}</span>
                </div>
              </div>

              <p className="text-sm text-slate-700 leading-relaxed mb-4">
                {mower.verdict}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-emerald-50/50 border border-emerald-100 rounded-lg p-4">
                  <div className="text-xs font-bold text-emerald-800 uppercase mb-2 flex items-center gap-1.5">
                    <ShieldCheck className="h-4 w-4 text-emerald-600" />
                    Why Mechanics Like It
                  </div>
                  <ul className="space-y-1.5">
                    {mower.pros.map((pro, i) => (
                      <li key={i} className="text-xs text-slate-700 flex items-start gap-2">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{pro}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-amber-50/50 border border-amber-100 rounded-lg p-4 flex flex-col justify-between">
                  <div>
                    <div className="text-xs font-bold text-amber-900 uppercase mb-1 flex items-center gap-1.5">
                      <AlertTriangle className="h-4 w-4 text-amber-600" />
                      Shop Note & Belt Fitment
                    </div>
                    <p className="text-xs text-slate-700 mb-3">{mower.watchOuts}</p>
                  </div>

                  <div className="pt-2 border-t border-amber-200/60 flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-700">
                      OEM Belt: <strong>#{mower.replacementBeltOem}</strong>
                    </span>
                    <Link
                      href={`/parts/${mower.replacementBeltSlug}`}
                      className="text-xs font-bold text-amber-700 hover:text-amber-900 underline"
                    >
                      View Belt Cross-Reference →
                    </Link>
                  </div>
                </div>
              </div>

              {/* High-Converting Day-1 New Owner Accessories */}
              <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-slate-100">
                <span className="text-xs font-semibold text-slate-400 mr-2 flex items-center gap-1">
                  <Wrench className="h-3.5 w-3.5" /> Essential New-Mower Add-Ons:
                </span>
                <a
                  href={`/api/out?q=${encodeURIComponent(`${mower.brand} ${mower.model} maintenance filter kit`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold px-3 py-1.5 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-800 transition"
                >
                  OEM Engine Service Kit
                </a>
                <a
                  href={`/api/out?q=${encodeURIComponent(`inductive hour meter tachometer lawn mower`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold px-3 py-1.5 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-800 transition"
                >
                  Digital Hour Meter
                </a>
                <a
                  href={`/api/out?q=${encodeURIComponent(`zero turn mower Jack lift for blade change`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold px-3 py-1.5 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-800 transition"
                >
                  300-Lb Front Deck Lift Jack
                </a>
              </div>
            </div>
          ))}
        </div>
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
