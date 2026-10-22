import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NoWrongPart | Commercial Mower Spec & Cross-Reference Engine",
  description: "Instant OEM-to-aftermarket cross-referencing and exact belt dimensions for commercial zero-turn mowers.",
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
