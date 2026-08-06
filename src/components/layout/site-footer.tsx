import Link from "next/link";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

import { BUSINESS, FOOTER_LINKS } from "@/lib/constants";
import { InstagramIcon, FacebookIcon } from "@/components/social-icons";

export function SiteFooter() {
  return (
    <footer className="relative mt-32 overflow-hidden border-t border-border">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-1 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent"
      />
      <div className="mx-auto max-w-7xl px-4 pb-10 pt-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="flex items-center gap-2 font-display text-xl font-semibold">
              <span className="flex size-8 items-center justify-center rounded-full bg-gradient-to-br from-accent-soft to-accent-deep text-sm font-bold text-accent-foreground">
                R
              </span>
              Root <span className="text-gradient-gold">Mobiles</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              {BUSINESS.tagline}. Quality devices, expert repairs, and honest service — trusted by{" "}
              {BUSINESS.happyCustomers} customers in Coimbatore.
            </p>
            <div className="mt-5 flex gap-3">
              <a
                href={BUSINESS.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Root Mobiles on Instagram"
                className="flex size-10 items-center justify-center rounded-full border border-border-strong text-foreground/80 transition-colors hover:border-accent hover:text-accent"
              >
                <InstagramIcon className="size-4" />
              </a>
              <a
                href={BUSINESS.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Root Mobiles on Facebook"
                className="flex size-10 items-center justify-center rounded-full border border-border-strong text-foreground/80 transition-colors hover:border-accent hover:text-accent"
              >
                <FacebookIcon className="size-4" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-foreground/60">
              Company
            </h3>
            <ul className="mt-4 space-y-3">
              {FOOTER_LINKS.company.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted-foreground transition-colors hover:text-accent">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-foreground/60">
              Services
            </h3>
            <ul className="mt-4 space-y-3">
              {FOOTER_LINKS.services.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted-foreground transition-colors hover:text-accent">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-foreground/60">
              Visit Us
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              <li className="flex gap-2.5">
                <MapPin className="mt-0.5 size-4 shrink-0 text-accent" />
                <span>
                  {BUSINESS.address.line1}, {BUSINESS.address.city}, {BUSINESS.address.state}{" "}
                  {BUSINESS.address.postalCode}
                </span>
              </li>
              <li className="flex gap-2.5">
                <Phone className="mt-0.5 size-4 shrink-0 text-accent" />
                <a href={`tel:${BUSINESS.phoneRaw}`} className="hover:text-accent">
                  {BUSINESS.phone}
                </a>
              </li>
              <li className="flex gap-2.5">
                <Mail className="mt-0.5 size-4 shrink-0 text-accent" />
                <a href={`mailto:${BUSINESS.email}`} className="hover:text-accent break-all">
                  {BUSINESS.email}
                </a>
              </li>
              <li className="flex gap-2.5">
                <Clock className="mt-0.5 size-4 shrink-0 text-accent" />
                <span>
                  {BUSINESS.hours.map((h) => `${h.days}: ${h.time}`).join(" · ")}
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 text-xs text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} Root Mobiles. All rights reserved.</p>
          <div className="flex gap-5">
            {FOOTER_LINKS.legal.map((link) => (
              <Link key={link.href} href={link.href} className="hover:text-accent">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-24 left-1/2 h-64 w-[80%] -translate-x-1/2 rounded-full bg-accent/10 blur-[100px]"
      />
    </footer>
  );
}
