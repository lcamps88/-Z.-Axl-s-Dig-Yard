"use client";

import dynamic from "next/dynamic";
import config from "@/sanity.config";
import { Suspense } from "react";

// Load studio dynamically — it has many heavy deps
const NextStudio = dynamic(
  () => import("next-sanity/studio").then((m) => m.NextStudio),
  { ssr: false, loading: () => <div className="min-h-screen bg-[#101112] flex items-center justify-center text-white font-mono text-sm">Loading Sanity Studio…</div> }
);

export default function StudioPage() {
  return (
    <Suspense>
      <NextStudio config={config} />
    </Suspense>
  );
}
