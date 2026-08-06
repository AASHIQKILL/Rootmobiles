"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { SlidersHorizontal } from "lucide-react";

import { PRODUCTS, CATEGORIES, type ProductCategory, type ProductCondition } from "@/lib/data/products";
import { ProductCard } from "@/components/product-card";
import { ProductSearch } from "@/components/search/product-search";
import { RevealGroup, RevealItem, Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

type SortKey = "relevance" | "price-asc" | "price-desc" | "rating";

export function ShopClient() {
  const searchParams = useSearchParams();
  const [category, setCategory] = useState<ProductCategory | "All">(
    (searchParams.get("category") as ProductCategory) || "All"
  );
  const [condition, setCondition] = useState<ProductCondition | "All">(
    (searchParams.get("condition") as ProductCondition) || "All"
  );
  const [sort, setSort] = useState<SortKey>("relevance");
  const query = searchParams.get("q")?.toLowerCase() ?? "";

  const filtered = useMemo(() => {
    let list = PRODUCTS.filter((p) => {
      const matchesCategory = category === "All" || p.category === category;
      const matchesCondition = condition === "All" || p.condition === condition;
      const matchesQuery =
        !query ||
        p.name.toLowerCase().includes(query) ||
        p.brand.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query);
      return matchesCategory && matchesCondition && matchesQuery;
    });

    list = [...list].sort((a, b) => {
      if (sort === "price-asc") return a.price - b.price;
      if (sort === "price-desc") return b.price - a.price;
      if (sort === "rating") return b.rating - a.rating;
      return 0;
    });

    return list;
  }, [category, condition, sort, query]);

  return (
    <div className="mx-auto max-w-7xl px-4 pb-24 pt-32 sm:px-6 sm:pt-40 lg:px-8">
      <Reveal>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Shop</p>
        <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
          Every device, one store
        </h1>
        <div className="mt-8 max-w-xl">
          <ProductSearch />
        </div>
      </Reveal>

      <Reveal delay={0.1} className="mt-10 flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-muted-foreground">
          <SlidersHorizontal className="size-3.5" /> Filter
        </div>
        {(["All", ...CATEGORIES.map((c) => c.id)] as const).map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat as ProductCategory | "All")}
            className={cn(
              "rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors cursor-pointer",
              category === cat
                ? "border-accent bg-accent text-accent-foreground"
                : "border-border-strong text-foreground/70 hover:border-accent/50"
            )}
          >
            {cat}
          </button>
        ))}
        <span className="mx-1 h-4 w-px bg-border" />
        {(["All", "New", "Certified Pre-Owned"] as const).map((c) => (
          <button
            key={c}
            onClick={() => setCondition(c as ProductCondition | "All")}
            className={cn(
              "rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors cursor-pointer",
              condition === c
                ? "border-accent bg-accent text-accent-foreground"
                : "border-border-strong text-foreground/70 hover:border-accent/50"
            )}
          >
            {c}
          </button>
        ))}
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as SortKey)}
          className="ml-auto rounded-full border border-border-strong bg-transparent px-3.5 py-1.5 text-sm text-foreground/80 outline-none cursor-pointer"
        >
          <option value="relevance" className="bg-background">Sort: Relevance</option>
          <option value="price-asc" className="bg-background">Price: Low to High</option>
          <option value="price-desc" className="bg-background">Price: High to Low</option>
          <option value="rating" className="bg-background">Rating</option>
        </select>
      </Reveal>

      {filtered.length > 0 ? (
        <RevealGroup className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4" stagger={0.05}>
          {filtered.map((product) => (
            <RevealItem key={product.id}>
              <ProductCard product={product} />
            </RevealItem>
          ))}
        </RevealGroup>
      ) : (
        <div className="glass mt-10 rounded-2xl p-12 text-center text-muted-foreground">
          No devices match your filters yet — try widening your search or{" "}
          <a href="https://wa.me/917092877739" className="text-accent underline">
            ask us on WhatsApp
          </a>
          .
        </div>
      )}
    </div>
  );
}
