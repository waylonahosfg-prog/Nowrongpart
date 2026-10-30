import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ExternalLink,
  ArrowLeft,
  Wrench,
  CheckCircle2,
  BookOpen,
  ShieldCheck,
} from "lucide-react";
import type { Metadata } from "next";
import { guidesData } from "@/lib/guides";

export async function generateStaticParams() {
  return guidesData.map((g) => ({
    slug: g.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const guide = guidesData.find((g) => g.slug === slug);
  if (!guide) return { title: "Guide Not Found" };

  return {
    title: `${guide.title} | NoWrongPart`,
    description: guide.metaDescription,
    openGraph: {
      title: guide.title,
      description: guide.metaDescription,
      url: `https://nowrongpart.com/guides/${guide.slug}`,
      siteName: "NoWrongPart",
      type: "article",
    },
  };
}

export default async function GuideDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guide = guidesData.find((g) => g.slug === slug);

  if (!guide) return notFound();

  const otherGuides = guidesData.filter((g) => g.slug !== guide.slug);

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
            <ArrowLeft className="h-3.5 w-3.5" /> Part & Belt Lookup
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8 sm:py-10 flex-1 w-full">
        <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-xs mb-6">
          <span className="px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-100 text-amber-900 border border-amber-200 inline-flex items-center gap-1.5">
            <Wrench className="h-3.5 w-3.5 text-amber-700" /> {guide.category}
          </span>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 mt-3 leading-tight">
            {guide.title}
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
            {guide.summary}
          </p>
        </div>

        <div className="space-y-6">
          {guide.sections.map((sec, idx) => (
            <section
              key={idx}
              className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-xs"
            >
              <h2 className="text-lg sm:text-xl font-extrabold text-slate-900">
                {sec.heading}
              </h2>
              <p className="text-sm text-slate-700 leading-relaxed mt-2 mb-4">
                {sec.body}
              </p>

              <div className="bg-slate-50 border border-slate-200/80 rounded-lg p-4 mb-5">
                <div className="text-xs font-bold uppercase text-slate-500 mb-2 flex items-center gap-1.5">
                  <ShieldCheck className="h-4 w-4 text-emerald-600" />
                  Mechanic&apos;s Inspection Checklist
                </div>
                <ul className="space-y-1.5">
                  {sec.checklist.map((item, i) => (
                    <li key={i} className="text-xs sm:text-sm text-slate-700 flex items-start gap-2">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <a
                href={`/api/out?q=${encodeURIComponent(sec.amazonQuery)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-extrabold rounded-lg shadow-xs transition"
              >
                {sec.amazonCta}
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </section>
          ))}
        </div>

        <section className="mt-10">
          <h2 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-amber-600" />
            More Equipment Maintenance & Diagnostic Guides
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {otherGuides.map((g) => (
              <Link
                key={g.slug}
                href={`/guides/${g.slug}`}
                className="bg-white border border-slate-200 hover:border-amber-400 p-4 rounded-xl shadow-xs transition block"
              >
                <span className="text-[11px] font-bold uppercase text-amber-600">
                  {g.category}
                </span>
                <h3 className="text-sm font-extrabold text-slate-900 mt-1">
                  {g.title}
                </h3>
              </Link>
            ))}
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
