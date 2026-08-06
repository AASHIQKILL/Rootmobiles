"use client";

import { useState } from "react";
import { FAQS, type FaqItem } from "@/lib/data/faq";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

const CATEGORIES: FaqItem["category"][] = ["Buying", "Selling", "Repair", "Warranty & EMI"];

export function Faq() {
  const [active, setActive] = useState<FaqItem["category"]>("Buying");
  const filtered = FAQS.filter((f) => f.category === active);

  return (
    <section className="relative py-20 sm:py-28" id="faq">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">FAQ</p>
          <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
            Questions, answered
          </h2>
        </Reveal>

        <Reveal delay={0.1} className="mt-10 flex flex-wrap justify-center gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={cn(
                "rounded-full border px-4 py-2 text-sm font-medium transition-colors cursor-pointer",
                active === cat
                  ? "border-accent bg-accent text-accent-foreground"
                  : "border-border-strong text-foreground/70 hover:border-accent/50 hover:text-foreground"
              )}
            >
              {cat}
            </button>
          ))}
        </Reveal>

        <Reveal delay={0.15} className="glass mt-8 rounded-2xl px-6">
          <Accordion type="single" collapsible key={active}>
            {filtered.map((faq) => (
              <AccordionItem key={faq.id} value={faq.id}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
}
