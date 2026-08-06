"use client";

import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, ArrowRight, TrendingUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { PRODUCTS, CATEGORY_IMAGE, type Product } from "@/lib/data/products";
import { formatINR } from "@/lib/format";
import { cn } from "@/lib/utils";

const TRENDING = ["iPhone 15 Pro", "Galaxy S24 Ultra", "Certified iPhone 13", "PS5 Slim"];

export function ProductSearch({ className }: { className?: string }) {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);

  const results = useMemo<Product[]>(() => {
    if (!query.trim()) return [];
    const q = query.trim().toLowerCase();
    return PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
    ).slice(0, 5);
  }, [query]);

  const showPanel = focused && (query.trim().length > 0 || TRENDING.length > 0);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!query.trim()) return;
    router.push(`/shop?q=${encodeURIComponent(query.trim())}`);
    setFocused(false);
  }

  return (
    <div ref={containerRef} className={cn("relative w-full", className)}>
      <form onSubmit={handleSubmit} className="glass-strong flex items-center gap-3 rounded-full px-5 py-3.5 sm:py-4">
        <Search className="size-5 shrink-0 text-accent" />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setTimeout(() => setFocused(false), 150)}
          placeholder="Search iPhone 15, Galaxy S24, MacBook Air…"
          aria-label="Search products"
          className="w-full bg-transparent text-base text-foreground placeholder:text-muted-foreground outline-none"
        />
        <button
          type="submit"
          aria-label="Search"
          className="flex size-9 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground transition-transform hover:scale-105 active:scale-95 cursor-pointer"
        >
          <ArrowRight className="size-4" />
        </button>
      </form>

      <AnimatePresence>
        {showPanel && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="glass-strong absolute inset-x-0 top-[calc(100%+0.5rem)] z-30 overflow-hidden rounded-2xl p-2 text-left shadow-2xl"
          >
            {query.trim().length === 0 ? (
              <div className="p-3">
                <p className="mb-2 flex items-center gap-1.5 px-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  <TrendingUp className="size-3.5" /> Trending
                </p>
                <div className="flex flex-wrap gap-2">
                  {TRENDING.map((t) => (
                    <button
                      key={t}
                      type="button"
                      onMouseDown={() => setQuery(t)}
                      className="rounded-full border border-border-strong px-3 py-1.5 text-xs text-foreground/80 transition-colors hover:border-accent hover:text-accent cursor-pointer"
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            ) : results.length > 0 ? (
              <ul>
                {results.map((product) => (
                  <li key={product.id}>
                    <Link
                      href={`/shop/${product.slug}`}
                      className="flex items-center gap-3 rounded-xl p-2.5 transition-colors hover:bg-white/5"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={CATEGORY_IMAGE[product.category]}
                        alt=""
                        className="size-11 shrink-0 rounded-lg bg-white/5 object-contain p-1"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-foreground">{product.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {product.brand} · {product.condition}
                        </p>
                      </div>
                      <span className="shrink-0 text-sm font-semibold text-accent">
                        {formatINR(product.price)}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="p-4 text-center text-sm text-muted-foreground">
                No matches for &ldquo;{query}&rdquo; — try a brand or category.
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
