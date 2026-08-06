import type { Metadata } from "next";
import { Suspense } from "react";

import { TrackClient } from "./track-client";
import { Reveal } from "@/components/motion/reveal";

export const metadata: Metadata = {
  title: "Track Your Repair",
  description: "Track the live status of your device repair at Root Mobiles, Coimbatore using your ticket ID.",
};

export default function TrackPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 pb-24 pt-32 sm:px-6 sm:pt-40 lg:px-8">
      <Reveal className="mx-auto max-w-2xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Repair Tracking</p>
        <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
          Where&apos;s my repair?
        </h1>
        <p className="mt-4 text-muted-foreground">Enter your ticket ID to see live, step-by-step progress.</p>
      </Reveal>

      <div className="mt-10">
        <Suspense fallback={null}>
          <TrackClient />
        </Suspense>
      </div>
    </div>
  );
}
