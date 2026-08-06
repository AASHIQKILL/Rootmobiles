import type { Metadata } from "next";

import { Reveal } from "@/components/motion/reveal";
import { LegalSection } from "@/components/legal-section";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "Terms and conditions for purchasing products and using repair services at Root Mobiles.",
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 pb-24 pt-32 sm:px-6 sm:pt-40 lg:px-8">
      <Reveal>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Legal</p>
        <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight">Terms &amp; Conditions</h1>
        <p className="mt-3 text-muted-foreground">Please read these terms carefully before using our services.</p>
      </Reveal>

      <Reveal delay={0.1} className="glass mt-10 rounded-3xl p-8 sm:p-10">
        <LegalSection title="1. General Terms">
          <p>By purchasing from or using services at Root Mobiles, you agree to be bound by these terms and conditions.</p>
        </LegalSection>
        <LegalSection title="2. Product Sales">
          <ul className="list-disc space-y-1 pl-5">
            <li>All mobile phones are sold with manufacturer warranty where applicable.</li>
            <li>Pre-owned devices come with store warranty as specified.</li>
            <li>Prices are subject to change without notice.</li>
            <li>Stock availability is subject to confirmation.</li>
          </ul>
        </LegalSection>
        <LegalSection title="3. Repair Services">
          <ul className="list-disc space-y-1 pl-5">
            <li>Repair estimates are provided before work begins.</li>
            <li>We are not responsible for data loss during repairs.</li>
            <li>Warranty on repairs is limited to the specific service performed.</li>
            <li>Customers must back up their data before repair service.</li>
          </ul>
        </LegalSection>
        <LegalSection title="4. Returns & Exchanges">
          <ul className="list-disc space-y-1 pl-5">
            <li>Returns accepted within 7 days of purchase with original receipt.</li>
            <li>Device must be in original condition with all accessories.</li>
            <li>Pre-owned devices are subject to different return policies.</li>
            <li>Refunds processed within 7-10 business days.</li>
          </ul>
        </LegalSection>
        <LegalSection title="5. Liability">
          <p>Root Mobiles is not liable for any indirect, special, or consequential damages arising from the use of our products or services.</p>
        </LegalSection>
        <LegalSection title="6. Privacy">
          <p>We respect your privacy and handle your personal information according to our Privacy Policy.</p>
        </LegalSection>
        <LegalSection title="7. Governing Law">
          <p>These terms are governed by the laws of Tamil Nadu, India.</p>
        </LegalSection>
      </Reveal>
    </div>
  );
}
