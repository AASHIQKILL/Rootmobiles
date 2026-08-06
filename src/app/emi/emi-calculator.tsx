"use client";

import { useMemo, useState } from "react";
import { MessageCircle } from "lucide-react";

import { whatsappLink } from "@/lib/constants";
import { formatINR } from "@/lib/format";
import { Button } from "@/components/ui/button";

const TENURES = [3, 6, 9, 12, 18, 24];
const ANNUAL_RATE = 0.13; // representative no-cost-EMI-adjacent processing rate

export function EmiCalculator() {
  const [price, setPrice] = useState(60000);
  const [tenure, setTenure] = useState(12);

  const monthlyEmi = useMemo(() => {
    const r = ANNUAL_RATE / 12;
    const n = tenure;
    const emi = (price * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    return Math.round(emi);
  }, [price, tenure]);

  return (
    <div className="glass-strong rounded-3xl p-6 sm:p-10">
      <label htmlFor="price" className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
        Device price
      </label>
      <div className="mt-2 flex items-center gap-4">
        <input
          id="price"
          type="range"
          min={5000}
          max={200000}
          step={1000}
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-white/10 accent-[var(--color-accent)]"
        />
        <span className="w-28 shrink-0 text-right font-display text-lg font-semibold">{formatINR(price)}</span>
      </div>

      <p className="mb-3 mt-8 text-xs font-medium uppercase tracking-wider text-muted-foreground">Tenure</p>
      <div className="flex flex-wrap gap-2">
        {TENURES.map((t) => (
          <button
            key={t}
            onClick={() => setTenure(t)}
            className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors cursor-pointer ${
              tenure === t
                ? "border-accent bg-accent text-accent-foreground"
                : "border-border-strong text-foreground/70 hover:border-accent/50"
            }`}
          >
            {t} months
          </button>
        ))}
      </div>

      <div className="mt-10 rounded-2xl bg-white/[0.03] p-6 text-center">
        <p className="text-xs text-muted-foreground">Estimated monthly EMI</p>
        <p className="mt-1 font-display text-5xl font-semibold text-gradient-gold">{formatINR(monthlyEmi)}</p>
        <p className="mt-1 text-xs text-muted-foreground">/month for {tenure} months</p>
        <p className="mt-4 text-xs text-muted-foreground">
          Indicative estimate. Final rate depends on the bank/NBFC, credit profile, and any no-cost EMI offer
          applicable at checkout.
        </p>
      </div>

      <Button variant="whatsapp" size="lg" className="mt-8 w-full" asChild>
        <a
          href={whatsappLink(`Hi Root Mobiles! I'd like to check EMI options for a device around ${formatINR(price)} over ${tenure} months.`)}
          target="_blank"
          rel="noopener noreferrer"
        >
          <MessageCircle className="size-4" /> Check My EMI Eligibility
        </a>
      </Button>
    </div>
  );
}
