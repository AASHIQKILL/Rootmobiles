"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

import { CATEGORY_IMAGE, type Product } from "@/lib/data/products";
import { Badge } from "@/components/ui/badge";
import { formatINR } from "@/lib/format";
import { cn } from "@/lib/utils";

export function ProductCard({ product, className }: { product: Product; className?: string }) {
  const discount = product.mrp ? Math.round(((product.mrp - product.price) / product.mrp) * 100) : 0;

  return (
    <motion.div whileHover={{ y: -6 }} transition={{ type: "spring", stiffness: 260, damping: 20 }} className={cn("h-full", className)}>
      <Link href={`/shop/${product.slug}`} className="group flex h-full flex-col overflow-hidden rounded-2xl glass">
        <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden bg-gradient-to-b from-white/[0.04] to-transparent p-8">
          {product.badge && (
            <Badge className="absolute left-3 top-3 z-10">{product.badge}</Badge>
          )}
          {discount > 0 && (
            <Badge variant="success" className="absolute right-3 top-3 z-10">
              -{discount}%
            </Badge>
          )}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={CATEGORY_IMAGE[product.category]}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.5)] transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <div className="flex flex-1 flex-col p-5">
          <div className="flex items-center justify-between gap-2">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{product.brand}</p>
            <span className="flex items-center gap-1 text-xs text-foreground/80">
              <Star className="size-3 fill-accent text-accent" /> {product.rating}
              <span className="text-muted-foreground">({product.reviewCount})</span>
            </span>
          </div>
          <h3 className="mt-1 font-display text-base font-semibold leading-snug">{product.name}</h3>

          <div className="mt-3 flex flex-wrap gap-1.5">
            {product.specs.slice(0, 2).map((spec) => (
              <span key={spec.label} className="rounded-full bg-white/5 px-2 py-0.5 text-[11px] text-muted-foreground">
                {spec.value}
              </span>
            ))}
          </div>

          <div className="mt-auto pt-4">
            <div className="flex items-baseline gap-2">
              <span className="font-display text-xl font-semibold text-foreground">{formatINR(product.price)}</span>
              {product.mrp && (
                <span className="text-sm text-muted-foreground line-through">{formatINR(product.mrp)}</span>
              )}
            </div>
            {product.emiFrom && (
              <p className="mt-1 text-xs text-accent">EMI from {formatINR(product.emiFrom)}/mo</p>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
