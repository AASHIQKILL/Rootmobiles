import type { Metadata } from "next";
import { Star, CreditCard, Wrench, ShieldCheck } from "lucide-react";

import { BUSINESS } from "@/lib/constants";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { AnimatedCounter } from "@/components/motion/animated-counter";

export const metadata: Metadata = {
  title: "About Us",
  description: `The story of ${BUSINESS.name}, Coimbatore's trusted mobile store — ${BUSINESS.happyCustomers} customers, ${BUSINESS.rating}★ rated.`,
};

const HIGHLIGHTS = [
  { icon: Star, title: `${BUSINESS.rating}★ Google Rating`, desc: "Consistently rated as one of the best mobile stores in Coimbatore by our satisfied customers." },
  { icon: CreditCard, title: "EMI via Bajaj Finserv", desc: "Flexible payment options to make your dream smartphone affordable with easy EMI plans." },
  { icon: Wrench, title: "Certified Repair Experts", desc: "Our skilled technicians are certified and experienced in handling all types of mobile repairs." },
  { icon: ShieldCheck, title: "Honest, Local Service", desc: "No hidden fees, no bait-and-switch — the same team you can walk in and talk to, every time." },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 pb-24 pt-32 sm:px-6 sm:pt-40 lg:px-8">
      <Reveal className="mx-auto max-w-2xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">About Us</p>
        <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
          Your trusted partner in mobile technology
        </h1>
      </Reveal>

      <Reveal delay={0.1} className="glass mt-14 rounded-3xl p-8 sm:p-12">
        <p className="text-lg leading-relaxed text-foreground/85">
          Root Mobiles started with a simple idea: buying, selling, and repairing a phone shouldn&apos;t feel
          like a gamble. Today, from our Gandhipuram store, we offer high-quality new and pre-owned mobiles
          from Apple, Samsung, OnePlus and more, fast expert repairs, and genuine accessories — all backed by
          honest pricing and real warranty support.
        </p>
        <div className="mt-10 grid grid-cols-2 gap-8 border-t border-border pt-8 sm:grid-cols-4">
          <div>
            <p className="font-display text-3xl font-semibold text-gradient-gold">
              <AnimatedCounter value={5000} suffix="+" />
            </p>
            <p className="mt-1 text-sm text-muted-foreground">Customers served</p>
          </div>
          <div>
            <p className="font-display text-3xl font-semibold text-gradient-gold">
              <AnimatedCounter value={4.8} decimals={1} suffix="★" />
            </p>
            <p className="mt-1 text-sm text-muted-foreground">Average rating</p>
          </div>
          <div>
            <p className="font-display text-3xl font-semibold text-gradient-gold">
              <AnimatedCounter value={2018} />
            </p>
            <p className="mt-1 text-sm text-muted-foreground">Founded</p>
          </div>
          <div>
            <p className="font-display text-3xl font-semibold text-gradient-gold">
              <AnimatedCounter value={1} />
            </p>
            <p className="mt-1 text-sm text-muted-foreground">Coimbatore store</p>
          </div>
        </div>
      </Reveal>

      <RevealGroup className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2" stagger={0.08}>
        {HIGHLIGHTS.map((h) => (
          <RevealItem key={h.title}>
            <div className="glass flex h-full gap-4 rounded-2xl p-6">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
                <h.icon className="size-5" />
              </span>
              <div>
                <h3 className="font-display text-base font-semibold">{h.title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{h.desc}</p>
              </div>
            </div>
          </RevealItem>
        ))}
      </RevealGroup>
    </div>
  );
}
