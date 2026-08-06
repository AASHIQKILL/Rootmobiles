"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { PRODUCTS, CATEGORIES, type ProductCategory } from "@/lib/data/products";
import { ProductCard } from "@/components/product-card";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function FeaturedProducts() {
  const [active, setActive] = useState<ProductCategory | "All">("All");

  const filtered = active === "All" ? PRODUCTS : PRODUCTS.filter((p) => p.category === active);

  return (
    <section className="relative py-20 sm:py-28" id="featured">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Featured</p>
            <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
              Handpicked devices, ready today
            </h2>
          </div>
          <Button variant="outline" asChild>
            <Link href="/shop">
              View all devices <ArrowRight className="size-4" />
            </Link>
          </Button>
        </Reveal>

        <div className="mt-10 flex flex-wrap gap-2">
          <button
            onClick={() => setActive("All")}
            className={cn(
              "rounded-full border px-4 py-2 text-sm font-medium transition-colors cursor-pointer",
              active === "All"
                ? "border-accent bg-accent text-accent-foreground"
                : "border-border-strong text-foreground/70 hover:border-accent/50 hover:text-foreground"
            )}
          >
            All
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActive(cat.id)}
              className={cn(
                "rounded-full border px-4 py-2 text-sm font-medium transition-colors cursor-pointer",
                active === cat.id
                  ? "border-accent bg-accent text-accent-foreground"
                  : "border-border-strong text-foreground/70 hover:border-accent/50 hover:text-foreground"
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <RevealGroup className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4" stagger={0.06}>
          {filtered.map((product) => (
            <RevealItem key={product.id}>
              <ProductCard product={product} />
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
