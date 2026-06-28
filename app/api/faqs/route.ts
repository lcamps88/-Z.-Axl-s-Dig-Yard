import { NextResponse } from "next/server";
import { getFAQs } from "@/lib/sanity/queries";

export const dynamic = "force-dynamic";

export async function GET() {
  const faqs = await getFAQs();
  return NextResponse.json(faqs);
}
