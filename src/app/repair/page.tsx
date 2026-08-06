import type { Metadata } from "next";
import Link from "next/link";
import { Search } from "lucide-react";

import { RepairBookingForm } from "@/components/tools/repair-booking-form";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Book a Mobile Repair",
  description:
    "Book a screen, battery, or charging port repair at Root Mobiles, Coimbatore. Genuine parts, certified technicians, most repairs done same day.",
};

export default function RepairPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 pb-24 pt-32 sm:px-6 sm:pt-40 lg:px-8">
      <Reveal className="mx-auto max-w-2xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Repair</p>
        <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
          Book your repair in under a minute
        </h1>
        <p className="mt-4 text-muted-foreground">
          Pick your device, tell us the issue, choose a slot — we&apos;ll have it ready while you shop or grab a coffee.
        </p>
        <Button variant="outline" className="mt-5" asChild>
          <Link href="/repair/track">
            <Search className="size-4" /> Already booked? Track your repair
          </Link>
        </Button>
      </Reveal>

      <Reveal delay={0.1} className="mt-10">
        <RepairBookingForm />
      </Reveal>
    </div>
  );
}
