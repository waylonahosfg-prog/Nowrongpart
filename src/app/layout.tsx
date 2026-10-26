import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

const siteTitle = "NoWrongPart | Mower Part Lookup & Cross-References";
const siteDescription =
  "Search OEM and aftermarket part references, listed measurements, and mower model links. Confirm the correct year, deck, and serial range with the manufacturer’s manual before ordering.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: siteTitle,
  description: siteDescription,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "NoWrongPart",
    title: siteTitle,
    description: siteDescription,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased bg-slate-50 text-slate-900">{children}</body>
    </html>
  );
}
