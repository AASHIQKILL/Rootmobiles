"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Clock, MessageCircle, RotateCcw } from "lucide-react";
import { toast } from "sonner";

import { REPAIR_SERVICES, DEVICE_BRANDS } from "@/lib/data/repair";
import { whatsappLink } from "@/lib/constants";
import { formatINR } from "@/lib/format";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

const STEPS = ["Device", "Issue", "Slot", "Details"] as const;

const SLOTS = ["Today, 2:00 PM", "Today, 5:00 PM", "Tomorrow, 10:00 AM", "Tomorrow, 3:00 PM"];

function generateTicketId() {
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `RM-${rand}`;
}

export function RepairBookingForm() {
  const [step, setStep] = useState(0);
  const [brand, setBrand] = useState<string | null>(null);
  const [model, setModel] = useState("");
  const [issueId, setIssueId] = useState<string | null>(null);
  const [slot, setSlot] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [ticketId, setTicketId] = useState<string | null>(null);

  const issue = useMemo(() => REPAIR_SERVICES.find((r) => r.id === issueId), [issueId]);
  const progress = ((step + 1) / STEPS.length) * 100;

  function goNext() {
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
  }

  function reset() {
    setStep(0);
    setBrand(null);
    setModel("");
    setIssueId(null);
    setSlot(null);
    setName("");
    setPhone("");
    setTicketId(null);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || phone.trim().length < 10) {
      toast.error("Please enter your name and a valid phone number.");
      return;
    }
    const id = generateTicketId();
    setTicketId(id);
    toast.success("Repair booked! Save your ticket ID to track progress.");
  }

  return (
    <div className="glass-strong mx-auto max-w-2xl rounded-3xl p-6 sm:p-10">
      {!ticketId ? (
        <>
          <div className="mb-8 flex items-center justify-between">
            <div className="flex gap-2">
              {STEPS.map((s, i) => (
                <span key={s} className={cn("text-xs font-medium", i === step ? "text-accent" : i < step ? "text-foreground/60" : "text-muted-foreground/50")}>
                  {s}
                  {i < STEPS.length - 1 && <span className="mx-2 text-muted-foreground/30">/</span>}
                </span>
              ))}
            </div>
            {step > 0 && (
              <button onClick={reset} className="flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-accent cursor-pointer">
                <RotateCcw className="size-3" /> Start over
              </button>
            )}
          </div>
          <Progress value={progress} className="mb-8" />

          <AnimatePresence mode="wait">
            {step === 0 && (
              <motion.div key="device" {...stepMotion}>
                <h3 className="font-display text-2xl font-semibold">Tell us about your device</h3>
                <p className="mb-2 mt-6 text-xs font-medium uppercase tracking-wider text-muted-foreground">Brand</p>
                <div className="flex flex-wrap gap-2">
                  {DEVICE_BRANDS.map((b) => (
                    <button
                      key={b}
                      onClick={() => setBrand(b)}
                      className={cn(
                        "rounded-full border px-4 py-2 text-sm font-medium transition-colors cursor-pointer",
                        brand === b ? "border-accent bg-accent text-accent-foreground" : "border-border-strong hover:border-accent/50"
                      )}
                    >
                      {b}
                    </button>
                  ))}
                </div>
                <div className="mt-5">
                  <Label htmlFor="model">Model (e.g. iPhone 13, Galaxy S22)</Label>
                  <Input id="model" value={model} onChange={(e) => setModel(e.target.value)} className="mt-1.5" placeholder="Type your device model" />
                </div>
                <Button size="lg" className="mt-8 w-full" disabled={!brand || !model.trim()} onClick={goNext}>
                  Continue
                </Button>
              </motion.div>
            )}

            {step === 1 && (
              <motion.div key="issue" {...stepMotion}>
                <h3 className="font-display text-2xl font-semibold">What&apos;s the issue?</h3>
                <div className="mt-6 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                  {REPAIR_SERVICES.map((r) => (
                    <button
                      key={r.id}
                      onClick={() => {
                        setIssueId(r.id);
                        goNext();
                      }}
                      className="rounded-xl border border-border-strong p-4 text-left transition-colors hover:border-accent hover:bg-accent/5 cursor-pointer"
                    >
                      <p className="text-sm font-medium">{r.label}</p>
                      <p className="mt-1 text-xs text-muted-foreground">{r.description}</p>
                      <p className="mt-2 text-xs text-accent">From {formatINR(r.priceFrom)}</p>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 2 && issue && (
              <motion.div key="slot" {...stepMotion}>
                <h3 className="font-display text-2xl font-semibold">Pick a drop-off slot</h3>
                <p className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground">
                  <Clock className="size-4 text-accent" /> Estimated repair time: ~{issue.etaMinutes < 120 ? `${issue.etaMinutes} min` : `${Math.round(issue.etaMinutes / 60)} hrs`}
                </p>
                <div className="mt-6 grid grid-cols-2 gap-3">
                  {SLOTS.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSlot(s)}
                      className={cn(
                        "rounded-xl border px-4 py-3 text-sm font-medium transition-colors cursor-pointer",
                        slot === s ? "border-accent bg-accent text-accent-foreground" : "border-border-strong hover:border-accent/50"
                      )}
                    >
                      {s}
                    </button>
                  ))}
                </div>
                <Button size="lg" className="mt-8 w-full" disabled={!slot} onClick={goNext}>
                  Continue
                </Button>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div key="details" {...stepMotion}>
                <h3 className="font-display text-2xl font-semibold">Your details</h3>
                <form onSubmit={handleSubmit} className="mt-6 grid gap-4">
                  <div>
                    <Label htmlFor="rb-name">Full name</Label>
                    <Input id="rb-name" value={name} onChange={(e) => setName(e.target.value)} className="mt-1.5" required />
                  </div>
                  <div>
                    <Label htmlFor="rb-phone">Phone number</Label>
                    <Input id="rb-phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className="mt-1.5" required />
                  </div>
                  <Button type="submit" size="lg" className="mt-2">
                    Confirm Booking
                  </Button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      ) : (
        <div className="text-center">
          <CheckCircle2 className="mx-auto size-12 text-accent" />
          <h3 className="mt-4 font-display text-2xl font-semibold">Booking confirmed, {name.split(" ")[0]}!</h3>
          <p className="mt-2 text-muted-foreground">Bring your device to Gandhipuram at your chosen slot: {slot}.</p>
          <div className="glass mt-6 inline-block rounded-xl px-6 py-3">
            <p className="text-xs text-muted-foreground">Your Ticket ID</p>
            <p className="font-display text-2xl font-semibold text-gradient-gold">{ticketId}</p>
          </div>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg">
              <Link href={`/repair/track?ticket=${ticketId}`}>Track This Repair</Link>
            </Button>
            <Button size="lg" variant="whatsapp" asChild>
              <a
                href={whatsappLink(`Hi Root Mobiles! I just booked a repair (Ticket ${ticketId}) for my ${brand} ${model} — ${issue?.label}, slot: ${slot}.`)}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="size-4" /> Confirm on WhatsApp
              </a>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

const stepMotion = {
  initial: { opacity: 0, x: 16 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -16 },
  transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] as const },
};
