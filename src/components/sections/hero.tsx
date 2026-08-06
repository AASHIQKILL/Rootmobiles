"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { motion } from "framer-motion";
import { Star, ShieldCheck, ArrowRight } from "lucide-react";

import { BUSINESS } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/motion/magnetic-button";
import { ProductSearch } from "@/components/search/product-search";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

const FloatingPhonesScene = dynamic(
  () => import("@/components/three/floating-phones-scene").then((m) => m.FloatingPhonesScene),
  { ssr: false }
);

export function Hero() {
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const prefersReducedMotion = useReducedMotion();
  const show3D = isDesktop && !prefersReducedMotion;

  return (
    <section className="relative flex min-h-[92vh] items-center overflow-hidden pb-16 pt-32 sm:pt-40">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 50% 0%, color-mix(in oklab, var(--color-accent) 14%, transparent), transparent 65%), radial-gradient(ellipse 45% 40% at 85% 20%, color-mix(in oklab, var(--color-accent) 8%, transparent), transparent 70%)",
        }}
      />

      {show3D && (
        <div className="pointer-events-none absolute inset-0 opacity-90">
          <FloatingPhonesScene />
        </div>
      )}

      <div className="relative mx-auto grid w-full max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:px-8">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-border-strong bg-white/[0.03] px-4 py-1.5 text-xs font-medium text-foreground/80"
          >
            <span className="flex items-center gap-1 text-accent">
              <Star className="size-3.5 fill-accent" /> {BUSINESS.rating}
            </span>
            <span className="text-muted-foreground">·</span>
            <span>{BUSINESS.happyCustomers} happy customers in Coimbatore</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-[13vw] font-semibold leading-[0.98] tracking-tight sm:text-6xl lg:text-7xl"
          >
            Technology,
            <br />
            <span className="text-gradient-gold">trusted in hand.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 max-w-lg text-lg leading-relaxed text-muted-foreground"
          >
            New &amp; certified pre-owned smartphones, expert repairs, and honest trade-ins —
            all from Root Mobiles, Gandhipuram&rsquo;s most trusted store since day one.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.32, ease: [0.16, 1, 0.3, 1] }}
            className="mt-9 max-w-md"
          >
            <ProductSearch />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.42, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 flex flex-wrap items-center gap-4"
          >
            <Magnetic>
              <Button size="lg" asChild>
                <Link href="/shop">
                  Shop Devices <ArrowRight className="size-4" />
                </Link>
              </Button>
            </Magnetic>
            <Magnetic>
              <Button size="lg" variant="secondary" asChild>
                <Link href="/sell">Get Trade-in Value</Link>
              </Button>
            </Magnetic>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.55 }}
            className="mt-10 flex items-center gap-2 pb-16 text-sm text-muted-foreground sm:pb-0"
          >
            <ShieldCheck className="size-4 shrink-0 text-accent" />
            Every device — new or certified — backed by real warranty support.
          </motion.div>
        </div>

        <div className="relative hidden aspect-square lg:block" aria-hidden={show3D}>
          {!show3D && (
            <div className="glass-strong absolute inset-8 flex items-center justify-center rounded-[2.5rem]">
              <div className="text-center text-sm text-muted-foreground">
                <span className="text-gradient-gold font-display text-lg">Root Mobiles</span>
              </div>
            </div>
          )}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-xs text-muted-foreground sm:flex"
      >
        <span>Scroll to explore</span>
        <span className="h-8 w-px animate-pulse-glow bg-gradient-to-b from-accent to-transparent" />
      </motion.div>
    </section>
  );
}
