import type { Metadata } from "next";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

import { BUSINESS } from "@/lib/constants";
import { Reveal } from "@/components/motion/reveal";
import { ContactForm } from "./contact-form";

export const metadata: Metadata = {
  title: "Contact Us",
  description: `Get in touch with ${BUSINESS.name} in Gandhipuram, Coimbatore. Call, email, or WhatsApp us — we're here to help.`,
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 pb-24 pt-32 sm:px-6 sm:pt-40 lg:px-8">
      <Reveal className="mx-auto max-w-2xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Contact</p>
        <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
          We&apos;re here to help
        </h1>
      </Reveal>

      <div className="mt-14 grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
        <Reveal className="glass flex flex-col gap-6 rounded-2xl p-8">
          <div className="flex gap-3">
            <MapPin className="mt-0.5 size-5 shrink-0 text-accent" />
            <div>
              <p className="text-sm font-medium">Address</p>
              <p className="text-sm text-muted-foreground">
                {BUSINESS.address.line1}, {BUSINESS.address.city}, {BUSINESS.address.state} {BUSINESS.address.postalCode}
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <Phone className="mt-0.5 size-5 shrink-0 text-accent" />
            <div>
              <p className="text-sm font-medium">Phone</p>
              <a href={`tel:${BUSINESS.phoneRaw}`} className="text-sm text-muted-foreground hover:text-accent">
                {BUSINESS.phone}
              </a>
            </div>
          </div>
          <div className="flex gap-3">
            <Mail className="mt-0.5 size-5 shrink-0 text-accent" />
            <div>
              <p className="text-sm font-medium">Email</p>
              <a href={`mailto:${BUSINESS.email}`} className="text-sm text-muted-foreground hover:text-accent break-all">
                {BUSINESS.email}
              </a>
            </div>
          </div>
          <div className="flex gap-3">
            <Clock className="mt-0.5 size-5 shrink-0 text-accent" />
            <div>
              <p className="text-sm font-medium">Hours</p>
              {BUSINESS.hours.map((h) => (
                <p key={h.days} className="text-sm text-muted-foreground">
                  {h.days}: {h.time}
                </p>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <ContactForm />
        </Reveal>
      </div>
    </div>
  );
}
