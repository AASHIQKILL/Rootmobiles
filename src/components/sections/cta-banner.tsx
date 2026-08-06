import Link from "next/link";
import { MessageCircle, ArrowRight } from "lucide-react";

import { whatsappLink } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/motion/magnetic-button";
import { Reveal } from "@/components/motion/reveal";

export function CtaBanner() {
  return (
    <section className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="glass-strong relative overflow-hidden rounded-3xl px-6 py-16 text-center sm:px-16">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse 60% 80% at 50% 100%, color-mix(in oklab, var(--color-accent) 20%, transparent), transparent 70%)",
              }}
            />
            <h2 className="relative font-display text-4xl font-semibold tracking-tight sm:text-5xl">
              Prefer to just <span className="text-gradient-gold">chat?</span>
            </h2>
            <p className="relative mx-auto mt-4 max-w-lg text-muted-foreground">
              Skip the forms — message us on WhatsApp for instant pricing, repair slots, or trade-in quotes.
              A real person replies, usually in minutes.
            </p>
            <div className="relative mt-9 flex flex-wrap items-center justify-center gap-4">
              <Magnetic>
                <Button size="lg" variant="whatsapp" asChild>
                  <a href={whatsappLink("Hi Root Mobiles! I'd like to know more.")} target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="size-4" />
                    Chat on WhatsApp
                  </a>
                </Button>
              </Magnetic>
              <Magnetic>
                <Button size="lg" variant="secondary" asChild>
                  <Link href="/contact">
                    Contact the Store <ArrowRight className="size-4" />
                  </Link>
                </Button>
              </Magnetic>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
