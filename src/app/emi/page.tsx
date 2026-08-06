import type { Metadata } from "next";

import { EmiCalculator } from "./emi-calculator";
import { Reveal } from "@/components/motion/reveal";

export const metadata: Metadata = {
  title: "EMI Options",
  description: "No-cost EMI via Bajaj Finserv and leading banks at Root Mobiles. Estimate your monthly payment instantly.",
};

export default function EmiPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 pb-24 pt-32 sm:px-6 sm:pt-40 lg:px-8">
      <Reveal className="mx-auto max-w-2xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">EMI</p>
        <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
          Take it home today, pay monthly
        </h1>
        <p className="mt-4 text-muted-foreground">
          No-cost EMI via Bajaj Finserv and leading banks, arranged in-store in under 10 minutes.
        </p>
      </Reveal>

      <Reveal delay={0.1} className="mt-12">
        <EmiCalculator />
      </Reveal>
    </div>
  );
}
