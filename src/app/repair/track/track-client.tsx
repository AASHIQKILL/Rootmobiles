"use client";

import { useSearchParams } from "next/navigation";

import { RepairTracker } from "@/components/tools/repair-tracker";
import { Reveal } from "@/components/motion/reveal";

export function TrackClient() {
  const searchParams = useSearchParams();
  const initialTicket = searchParams.get("ticket") ?? undefined;

  return (
    <Reveal delay={0.1}>
      <RepairTracker initialTicket={initialTicket} />
    </Reveal>
  );
}
