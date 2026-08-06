import type { Metadata } from "next";
import { ShieldCheck, Smartphone, Wrench, MessageCircle } from "lucide-react";

import { whatsappLink } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";

export const metadata: Metadata = {
  title: "Warranty Support",
  description: "Warranty coverage for new devices, certified pre-owned phones, and repairs at Root Mobiles.",
};

const PLANS = [
  {
    icon: Smartphone,
    title: "New Devices",
    coverage: "Full manufacturer warranty",
    detail: "Every new phone, laptop, and accessory carries its full manufacturer warranty, honored at official service centers pan-India.",
  },
  {
    icon: ShieldCheck,
    title: "Certified Pre-Owned",
    coverage: "6-month store warranty",
    detail: "Covers hardware faults not caused by accidental damage — including battery, display, and core functionality.",
  },
  {
    icon: Wrench,
    title: "Repairs",
    coverage: "30–90 day service warranty",
    detail: "Every repair carries a warranty on the replaced part and workmanship, specific to the service performed.",
  },
];

export default function WarrantyPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 pb-24 pt-32 sm:px-6 sm:pt-40 lg:px-8">
      <Reveal className="mx-auto max-w-2xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Warranty Support</p>
        <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
          Real coverage, real support
        </h1>
        <p className="mt-4 text-muted-foreground">
          Every device we sell or repair is backed by warranty support from a team you can actually reach.
        </p>
      </Reveal>

      <RevealGroup className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-3" stagger={0.08}>
        {PLANS.map((plan) => (
          <RevealItem key={plan.title}>
            <div className="glass flex h-full flex-col rounded-2xl p-6">
              <span className="flex size-11 items-center justify-center rounded-full bg-accent/10 text-accent">
                <plan.icon className="size-5" />
              </span>
              <h3 className="mt-4 font-display text-lg font-semibold">{plan.title}</h3>
              <p className="mt-1 text-sm font-medium text-accent">{plan.coverage}</p>
              <p className="mt-2 text-sm text-muted-foreground">{plan.detail}</p>
            </div>
          </RevealItem>
        ))}
      </RevealGroup>

      <Reveal delay={0.2} className="glass-strong mt-14 rounded-3xl p-10 text-center">
        <h2 className="font-display text-2xl font-semibold">Need help with a warranty claim?</h2>
        <p className="mt-2 text-muted-foreground">Message us with your device details and purchase date — we&apos;ll take it from there.</p>
        <Button variant="whatsapp" size="lg" className="mt-6" asChild>
          <a href={whatsappLink("Hi Root Mobiles! I have a warranty question about my device.")} target="_blank" rel="noopener noreferrer">
            <MessageCircle className="size-4" /> Start a Warranty Claim
          </a>
        </Button>
      </Reveal>
    </div>
  );
}
