import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Star, ShieldCheck, MessageCircle, ChevronLeft } from "lucide-react";

import { PRODUCTS, CATEGORY_IMAGE } from "@/lib/data/products";
import { whatsappLink } from "@/lib/constants";
import { formatINR } from "@/lib/format";
import { SITE_URL } from "@/lib/seo";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/motion/reveal";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = PRODUCTS.find((p) => p.slug === slug);
  if (!product) return {};

  return {
    title: product.name,
    description: `${product.name} — ${product.condition} from ${formatINR(product.price)} at Root Mobiles, Coimbatore. ${product.specs.map((s) => s.value).join(", ")}.`,
    openGraph: { title: `${product.name} | Root Mobiles`, url: `${SITE_URL}/shop/${product.slug}` },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = PRODUCTS.find((p) => p.slug === slug);
  if (!product) notFound();

  const discount = product.mrp ? Math.round(((product.mrp - product.price) / product.mrp) * 100) : 0;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    brand: { "@type": "Brand", name: product.brand },
    offers: {
      "@type": "Offer",
      priceCurrency: "INR",
      price: product.price,
      availability: "https://schema.org/InStock",
      url: `${SITE_URL}/shop/${product.slug}`,
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating,
      reviewCount: product.reviewCount,
    },
  };

  return (
    <div className="mx-auto max-w-6xl px-4 pb-24 pt-32 sm:px-6 sm:pt-40 lg:px-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <Link href="/shop" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-accent">
        <ChevronLeft className="size-4" /> Back to shop
      </Link>

      <div className="mt-6 grid gap-10 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <div className="glass relative flex aspect-square items-center justify-center overflow-hidden rounded-3xl p-12">
            {product.badge && <Badge className="absolute left-4 top-4">{product.badge}</Badge>}
            {discount > 0 && (
              <Badge variant="success" className="absolute right-4 top-4">
                -{discount}%
              </Badge>
            )}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={CATEGORY_IMAGE[product.category]}
              alt={product.name}
              className="h-full w-full object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.5)]"
            />
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            {product.brand} · {product.condition}
          </p>
          <h1 className="mt-2 font-display text-4xl font-semibold tracking-tight">{product.name}</h1>

          <div className="mt-3 flex items-center gap-2 text-sm">
            <span className="flex items-center gap-1 text-foreground/85">
              <Star className="size-4 fill-accent text-accent" /> {product.rating}
            </span>
            <span className="text-muted-foreground">({product.reviewCount} reviews)</span>
          </div>

          <div className="mt-6 flex items-baseline gap-3">
            <span className="font-display text-4xl font-semibold text-gradient-gold">{formatINR(product.price)}</span>
            {product.mrp && <span className="text-lg text-muted-foreground line-through">{formatINR(product.mrp)}</span>}
          </div>
          {product.emiFrom && (
            <p className="mt-1 text-sm text-muted-foreground">
              or from <span className="text-accent">{formatINR(product.emiFrom)}/mo</span> with No-Cost EMI
            </p>
          )}

          <div className="mt-8 grid grid-cols-2 gap-3">
            {product.specs.map((spec) => (
              <div key={spec.label} className="glass rounded-xl px-4 py-3">
                <p className="text-xs text-muted-foreground">{spec.label}</p>
                <p className="mt-0.5 text-sm font-medium">{spec.value}</p>
              </div>
            ))}
          </div>

          {product.colorSwatches.length > 0 && (
            <div className="mt-6">
              <p className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">Available colors</p>
              <div className="flex gap-2">
                {product.colorSwatches.map((c) => (
                  <span
                    key={c}
                    className="size-7 rounded-full border border-white/20"
                    style={{ backgroundColor: c }}
                  />
                ))}
              </div>
            </div>
          )}

          <div className="mt-9 flex flex-wrap gap-3">
            <Button size="lg" variant="whatsapp" asChild>
              <a
                href={whatsappLink(`Hi! I'm interested in the ${product.name} (${formatINR(product.price)}). Is it in stock?`)}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="size-4" /> Enquire on WhatsApp
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/compare">Compare Devices</Link>
            </Button>
          </div>

          <div className="mt-6 flex items-center gap-2 text-xs text-muted-foreground">
            <ShieldCheck className="size-4 text-accent" />
            {product.condition === "Certified Pre-Owned"
              ? "42-point inspected · Store warranty included"
              : "Full manufacturer warranty included"}
          </div>
        </Reveal>
      </div>
    </div>
  );
}
