"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import { SERVICES } from "@/lib/data/services";
import { ICON_MAP } from "@/components/icon-map";
import { Reveal } from "@/components/motion/reveal";

export function Services() {
  return (
    <section className="relative py-20 sm:py-28" id="services">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Everything, in one store</p>
          <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
            One store for your entire device life cycle
          </h2>
          <p className="mt-4 text-muted-foreground">
            From your first flagship to your next trade-in — buy, sell, repair, and protect it all in one place.
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service, i) => {
            const Icon = ICON_MAP[service.icon];
            return (
              <Reveal key={service.id} delay={(i % 3) * 0.08}>
                <Link href={service.href} className="group block h-full">
                  <motion.div
                    whileHover={{ y: -6 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                    className="glass relative flex h-full flex-col justify-between overflow-hidden rounded-2xl p-6 transition-colors group-hover:border-accent/40"
                  >
                    <div
                      aria-hidden
                      className="pointer-events-none absolute -right-8 -top-8 size-32 rounded-full bg-accent/10 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
                    />
                    <div>
                      <div className="mb-5 flex size-12 items-center justify-center rounded-xl bg-accent/10 text-accent transition-transform duration-300 group-hover:scale-110">
                        {Icon && <Icon className="size-5" />}
                      </div>
                      <h3 className="font-display text-lg font-semibold">{service.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {service.description}
                      </p>
                    </div>
                    <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
                      <span className="text-xs font-medium text-accent">{service.stat}</span>
                      <ArrowUpRight className="size-4 text-muted-foreground transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
                    </div>
                  </motion.div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
