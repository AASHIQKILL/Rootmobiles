"use client";

import { MapPin, Phone, Clock, Navigation } from "lucide-react";
import { motion } from "framer-motion";

import { STORES } from "@/lib/data/stores";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";

export function StoreLocator() {
  const store = STORES[0];

  return (
    <section className="relative py-20 sm:py-28" id="store">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Visit us</p>
          <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
            Find us in Gandhipuram
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <Reveal className="glass flex flex-col justify-between rounded-3xl p-8">
            <div>
              <h3 className="font-display text-xl font-semibold">{store.name}</h3>
              <ul className="mt-6 space-y-5 text-sm">
                <li className="flex gap-3">
                  <MapPin className="mt-0.5 size-5 shrink-0 text-accent" />
                  <span className="text-foreground/85">{store.address}</span>
                </li>
                <li className="flex gap-3">
                  <Clock className="mt-0.5 size-5 shrink-0 text-accent" />
                  <span className="text-foreground/85">{store.hours}</span>
                </li>
                <li className="flex gap-3">
                  <Phone className="mt-0.5 size-5 shrink-0 text-accent" />
                  <a href={`tel:${store.phone}`} className="text-foreground/85 hover:text-accent">
                    {store.phone}
                  </a>
                </li>
              </ul>
            </div>
            <Button asChild className="mt-8 w-full" size="lg">
              <a href={store.mapsDirectionsUrl} target="_blank" rel="noopener noreferrer">
                <Navigation className="size-4" />
                Get Directions
              </a>
            </Button>
          </Reveal>

          <Reveal delay={0.1}>
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="glass-strong h-80 overflow-hidden rounded-3xl lg:h-full"
            >
              <iframe
                title={`Map to ${store.name}`}
                src={store.mapsEmbedSrc}
                className="h-full w-full grayscale-[35%] contrast-[1.05] invert-[0.92] hue-rotate-180"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </motion.div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
