"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, CheckCircle2, Circle, MessageCircle } from "lucide-react";

import { getMockRepairTicket, REPAIR_STAGE_META, type RepairStatusStage } from "@/lib/data/repair";
import { whatsappLink } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

const ALL_STAGES: RepairStatusStage[] = ["received", "diagnosing", "in-repair", "quality-check", "ready"];

export function RepairTracker({ initialTicket }: { initialTicket?: string }) {
  const [input, setInput] = useState(initialTicket ?? "");
  const [ticket, setTicket] = useState(() => (initialTicket ? getMockRepairTicket(initialTicket) : null));
  const [searched, setSearched] = useState(Boolean(initialTicket));

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    setTicket(getMockRepairTicket(input));
    setSearched(true);
  }

  const currentIndex = ticket ? ALL_STAGES.indexOf(ticket.stage) : -1;

  return (
    <div className="glass-strong mx-auto max-w-2xl rounded-3xl p-6 sm:p-10">
      <form onSubmit={handleSearch} className="flex gap-3">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter your ticket ID, e.g. RM-4F2A"
          aria-label="Repair ticket ID"
        />
        <Button type="submit" size="icon" aria-label="Track repair">
          <Search className="size-4" />
        </Button>
      </form>

      {searched && !ticket && (
        <p className="mt-6 text-center text-sm text-muted-foreground">
          We couldn&apos;t find that ticket. Double-check the ID, or{" "}
          <a href={whatsappLink("Hi! I'd like to check my repair status.")} className="text-accent underline">
            ask us on WhatsApp
          </a>
          .
        </p>
      )}

      {ticket && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mt-8"
        >
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <p className="text-xs text-muted-foreground">Ticket {ticket.ticketId}</p>
              <h3 className="font-display text-xl font-semibold">
                {ticket.device} — {ticket.issue}
              </h3>
            </div>
            <span className="rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
              {REPAIR_STAGE_META[ticket.stage].label}
            </span>
          </div>

          <Progress value={REPAIR_STAGE_META[ticket.stage].progress} className="mt-6" />

          <ol className="mt-8 space-y-5">
            {ALL_STAGES.map((stage, i) => {
              const done = i <= currentIndex;
              const event = ticket.timeline.find((t) => t.stage === stage);
              return (
                <li key={stage} className="flex gap-3">
                  {done ? (
                    <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-accent" />
                  ) : (
                    <Circle className="mt-0.5 size-5 shrink-0 text-muted-foreground/40" />
                  )}
                  <div>
                    <p className={cn("text-sm font-medium", done ? "text-foreground" : "text-muted-foreground")}>
                      {REPAIR_STAGE_META[stage].label}
                    </p>
                    {event && <p className="text-xs text-muted-foreground">{event.timestamp}</p>}
                  </div>
                </li>
              );
            })}
          </ol>

          <div className="mt-8 grid grid-cols-2 gap-4 text-sm">
            <div className="glass rounded-xl px-4 py-3">
              <p className="text-xs text-muted-foreground">Technician</p>
              <p className="mt-0.5 font-medium">{ticket.technician}</p>
            </div>
            <div className="glass rounded-xl px-4 py-3">
              <p className="text-xs text-muted-foreground">Est. completion</p>
              <p className="mt-0.5 font-medium">{ticket.estimatedCompletion}</p>
            </div>
          </div>

          <Button variant="whatsapp" className="mt-6 w-full" asChild>
            <a
              href={whatsappLink(`Hi! Checking in on my repair, ticket ${ticket.ticketId}.`)}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle className="size-4" /> Ask about this repair
            </a>
          </Button>
        </motion.div>
      )}
    </div>
  );
}
