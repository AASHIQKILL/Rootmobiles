import Link from "next/link";
import { Clock, ShieldCheck, Sparkles, ArrowRight } from "lucide-react";

import { BeforeAfterSlider } from "@/components/before-after-slider";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";

const HIGHLIGHTS = [
  { icon: Clock, label: "Most repairs done in 45–60 minutes" },
  { icon: ShieldCheck, label: "Genuine parts, every time" },
  { icon: Sparkles, label: "Warranty on every repair" },
];

export function RepairShowcase() {
  return (
    <section className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <BeforeAfterSlider
              beforeSrc="/repair/before.svg"
              afterSrc="/repair/after.svg"
              className="mx-auto max-w-md shadow-2xl lg:mx-0"
            />
          </Reveal>

          <Reveal delay={0.1}>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Repairs, done right</p>
            <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
              Drag to see the difference
            </h2>
            <p className="mt-5 max-w-md text-muted-foreground">
              Every screen, battery, and port repair is carried out by certified technicians using
              genuine parts — so the &ldquo;after&rdquo; always looks and feels like the original.
            </p>

            <ul className="mt-8 space-y-4">
              {HIGHLIGHTS.map((h) => (
                <li key={h.label} className="flex items-center gap-3 text-sm text-foreground/85">
                  <span className="flex size-9 items-center justify-center rounded-full bg-accent/10 text-accent">
                    <h.icon className="size-4" />
                  </span>
                  {h.label}
                </li>
              ))}
            </ul>

            <Button size="lg" className="mt-8" asChild>
              <Link href="/repair">
                Book a Repair <ArrowRight className="size-4" />
              </Link>
            </Button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
