import type { Metadata } from "next";

import { DeviceComparison } from "@/components/tools/device-comparison";
import { Reveal } from "@/components/motion/reveal";

export const metadata: Metadata = {
  title: "Compare Devices",
  description: "Compare smartphones side by side — display, chip, camera, battery, and price — before you buy.",
};

export default function ComparePage() {
  return (
    <div className="mx-auto max-w-6xl px-4 pb-24 pt-32 sm:px-6 sm:pt-40 lg:px-8">
      <Reveal className="mx-auto max-w-2xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Compare</p>
        <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
          Put them side by side
        </h1>
        <p className="mt-4 text-muted-foreground">Pick up to three devices to compare specs and pricing.</p>
      </Reveal>

      <Reveal delay={0.1} className="mt-12">
        <DeviceComparison />
      </Reveal>
    </div>
  );
}
