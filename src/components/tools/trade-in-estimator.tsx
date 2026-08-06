"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, MessageCircle, RotateCcw } from "lucide-react";
import { toast } from "sonner";

import {
  TRADE_IN_BRANDS,
  TRADE_IN_MODELS,
  CONDITION_MULTIPLIERS,
  estimateTradeInValue,
  type TradeInCondition,
} from "@/lib/data/trade-in";
import { whatsappLink } from "@/lib/constants";
import { formatINR } from "@/lib/format";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

const STEPS = ["Brand", "Model", "Condition", "Your Quote"] as const;
const CONDITIONS = Object.keys(CONDITION_MULTIPLIERS) as TradeInCondition[];

export function TradeInEstimator() {
  const [step, setStep] = useState(0);
  const [brand, setBrand] = useState<string | null>(null);
  const [modelId, setModelId] = useState<string | null>(null);
  const [storage, setStorage] = useState<string | null>(null);
  const [condition, setCondition] = useState<TradeInCondition | null>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const modelsForBrand = useMemo(() => TRADE_IN_MODELS.filter((m) => m.brand === brand), [brand]);
  const selectedModel = useMemo(() => TRADE_IN_MODELS.find((m) => m.id === modelId), [modelId]);

  const estimate = useMemo(() => {
    if (!modelId || !storage || !condition) return 0;
    return estimateTradeInValue(modelId, storage, condition);
  }, [modelId, storage, condition]);

  function goNext() {
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
  }

  function reset() {
    setStep(0);
    setBrand(null);
    setModelId(null);
    setStorage(null);
    setCondition(null);
    setName("");
    setPhone("");
    setSubmitted(false);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || phone.trim().length < 10) {
      toast.error("Please enter your name and a valid phone number.");
      return;
    }
    setSubmitted(true);
    toast.success("Quote saved! We'll reach out shortly, or chat with us now on WhatsApp.");
  }

  const progress = ((step + 1) / STEPS.length) * 100;

  return (
    <div className="glass-strong mx-auto max-w-2xl rounded-3xl p-6 sm:p-10">
      <div className="mb-8 flex items-center justify-between">
        <div className="flex gap-2">
          {STEPS.map((s, i) => (
            <span
              key={s}
              className={cn(
                "text-xs font-medium",
                i === step ? "text-accent" : i < step ? "text-foreground/60" : "text-muted-foreground/50"
              )}
            >
              {s}
              {i < STEPS.length - 1 && <span className="mx-2 text-muted-foreground/30">/</span>}
            </span>
          ))}
        </div>
        {step > 0 && (
          <button
            onClick={reset}
            className="flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-accent cursor-pointer"
          >
            <RotateCcw className="size-3" /> Start over
          </button>
        )}
      </div>
      <Progress value={progress} className="mb-8" />

      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.div key="brand" {...stepMotion}>
            <h3 className="font-display text-2xl font-semibold">What&apos;s your phone brand?</h3>
            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {TRADE_IN_BRANDS.map((b) => (
                <button
                  key={b}
                  onClick={() => {
                    setBrand(b);
                    setModelId(null);
                    goNext();
                  }}
                  className={cn(
                    "rounded-xl border px-4 py-4 text-sm font-medium transition-colors cursor-pointer",
                    "border-border-strong hover:border-accent hover:bg-accent/5"
                  )}
                >
                  {b}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {step === 1 && (
          <motion.div key="model" {...stepMotion}>
            <h3 className="font-display text-2xl font-semibold">Which model is it?</h3>
            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {modelsForBrand.map((m) => (
                <button
                  key={m.id}
                  onClick={() => {
                    setModelId(m.id);
                    setStorage(m.storageOptions[0].label);
                    goNext();
                  }}
                  className="flex items-center justify-between rounded-xl border border-border-strong px-4 py-4 text-left text-sm font-medium transition-colors hover:border-accent hover:bg-accent/5 cursor-pointer"
                >
                  {m.model}
                  <span className="text-xs text-muted-foreground">up to {formatINR(m.baseValue)}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {step === 2 && selectedModel && (
          <motion.div key="condition" {...stepMotion}>
            <h3 className="font-display text-2xl font-semibold">Storage &amp; condition</h3>

            <p className="mb-2 mt-6 text-xs font-medium uppercase tracking-wider text-muted-foreground">Storage</p>
            <div className="flex flex-wrap gap-2">
              {selectedModel.storageOptions.map((s) => (
                <button
                  key={s.label}
                  onClick={() => setStorage(s.label)}
                  className={cn(
                    "rounded-full border px-4 py-2 text-sm font-medium transition-colors cursor-pointer",
                    storage === s.label
                      ? "border-accent bg-accent text-accent-foreground"
                      : "border-border-strong hover:border-accent/50"
                  )}
                >
                  {s.label}
                </button>
              ))}
            </div>

            <p className="mb-2 mt-6 text-xs font-medium uppercase tracking-wider text-muted-foreground">Condition</p>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {CONDITIONS.map((c) => (
                <button
                  key={c}
                  onClick={() => {
                    setCondition(c);
                  }}
                  className={cn(
                    "rounded-xl border px-4 py-3 text-left transition-colors cursor-pointer",
                    condition === c
                      ? "border-accent bg-accent/10"
                      : "border-border-strong hover:border-accent/50"
                  )}
                >
                  <span className="text-sm font-medium">{c}</span>
                  <p className="mt-0.5 text-xs text-muted-foreground">{CONDITION_MULTIPLIERS[c].description}</p>
                </button>
              ))}
            </div>

            <Button size="lg" className="mt-8 w-full" disabled={!storage || !condition} onClick={goNext}>
              See My Estimate
            </Button>
          </motion.div>
        )}

        {step === 3 && selectedModel && condition && storage && (
          <motion.div key="quote" {...stepMotion}>
            {!submitted ? (
              <>
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Estimated trade-in value for {selectedModel.model} ({storage}, {condition})
                </p>
                <p className="mt-2 font-display text-5xl font-semibold text-gradient-gold">{formatINR(estimate)}</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Final quote confirmed after a quick in-store inspection — usually within 3-5% of this estimate.
                </p>

                <form onSubmit={handleSubmit} className="mt-8 grid gap-4 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="ti-name">Your name</Label>
                    <Input id="ti-name" value={name} onChange={(e) => setName(e.target.value)} className="mt-1.5" required />
                  </div>
                  <div>
                    <Label htmlFor="ti-phone">Phone number</Label>
                    <Input
                      id="ti-phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="mt-1.5"
                      required
                    />
                  </div>
                  <Button type="submit" size="lg" className="sm:col-span-2">
                    Save My Quote
                  </Button>
                </form>
              </>
            ) : (
              <div className="text-center">
                <CheckCircle2 className="mx-auto size-12 text-accent" />
                <h3 className="mt-4 font-display text-2xl font-semibold">Quote saved, {name.split(" ")[0]}!</h3>
                <p className="mt-2 text-muted-foreground">
                  We&apos;ll reach out at {phone} shortly. Want a faster response?
                </p>
                <Button size="lg" variant="whatsapp" className="mt-6" asChild>
                  <a
                    href={whatsappLink(
                      `Hi Root Mobiles! I'd like to sell my ${selectedModel.model} (${storage}, ${condition}). Estimated value: ${formatINR(estimate)}. My name is ${name}.`
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle className="size-4" /> Confirm on WhatsApp
                  </a>
                </Button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const stepMotion = {
  initial: { opacity: 0, x: 16 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -16 },
  transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] as const },
};
