import type { Metadata } from "next";
import { Wallet, ShieldCheck, Zap } from "lucide-react";

import { TradeInEstimator } from "@/components/tools/trade-in-estimator";
import { Reveal } from "@/components/motion/reveal";

export const metadata: Metadata = {
  title: "Sell Your Phone — Instant Trade-in Value",
  description:
    "Get an instant, fair trade-in estimate for your used phone at Root Mobiles, Coimbatore. Same-day payment, no haggling.",
};

const STEPS = [
  { icon: Wallet, title: "Get an instant estimate", desc: "Answer a few quick questions about your device." },
  { icon: ShieldCheck, title: "In-store verification", desc: "We confirm the condition in a 10-minute check." },
  { icon: Zap, title: "Get paid instantly", desc: "Cash or bank transfer, same day — no waiting." },
];

export default function SellPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 pb-24 pt-32 sm:px-6 sm:pt-40 lg:px-8">
      <Reveal className="mx-auto max-w-2xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Sell / Trade-in</p>
        <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
          What&apos;s your old phone worth?
        </h1>
        <p className="mt-4 text-muted-foreground">
          Answer four quick questions for an instant estimate — then confirm in-store or over WhatsApp.
        </p>
      </Reveal>

      <Reveal delay={0.1} className="mt-10">
        <TradeInEstimator />
      </Reveal>

      <div className="mt-20 grid gap-6 sm:grid-cols-3">
        {STEPS.map((s, i) => (
          <Reveal key={s.title} delay={i * 0.08} className="glass rounded-2xl p-6 text-center">
            <div className="mx-auto flex size-11 items-center justify-center rounded-full bg-accent/10 text-accent">
              <s.icon className="size-5" />
            </div>
            <h3 className="mt-4 font-display text-base font-semibold">{s.title}</h3>
            <p className="mt-1.5 text-sm text-muted-foreground">{s.desc}</p>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
