import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q") || "";

  const amazonTag = process.env.NEXT_PUBLIC_AMAZON_TAG || "tractorslinks-20";
  const destination = `https://www.amazon.com/s?k=${encodeURIComponent(query)}&tag=${amazonTag}`;

  return NextResponse.redirect(destination, 307);
}
