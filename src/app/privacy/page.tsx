import type { Metadata } from "next";

import { BUSINESS } from "@/lib/constants";
import { Reveal } from "@/components/motion/reveal";
import { LegalSection } from "@/components/legal-section";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Root Mobiles collects, uses, and protects your personal information.",
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 pb-24 pt-32 sm:px-6 sm:pt-40 lg:px-8">
      <Reveal>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Legal</p>
        <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight">Privacy Policy</h1>
        <p className="mt-3 text-muted-foreground">Your privacy is important to us.</p>
      </Reveal>

      <Reveal delay={0.1} className="glass mt-10 rounded-3xl p-8 sm:p-10">
        <LegalSection title="Information We Collect">
          <p>We collect information you provide directly to us, such as when you:</p>
          <ul className="list-disc space-y-1 pl-5">
            <li>Purchase products or services</li>
            <li>Contact us for support</li>
            <li>Sign up for our newsletter</li>
            <li>Provide feedback or reviews</li>
          </ul>
        </LegalSection>
        <LegalSection title="How We Use Your Information">
          <ul className="list-disc space-y-1 pl-5">
            <li>Process transactions and provide services</li>
            <li>Communicate with you about your orders</li>
            <li>Improve our products and services</li>
            <li>Send promotional materials (with your consent)</li>
          </ul>
        </LegalSection>
        <LegalSection title="Information Sharing">
          <p>We do not sell, trade, or rent your personal information to third parties. We may share information:</p>
          <ul className="list-disc space-y-1 pl-5">
            <li>With service providers who assist in our operations</li>
            <li>When required by law or legal process</li>
            <li>To protect our rights and safety</li>
          </ul>
        </LegalSection>
        <LegalSection title="Data Security">
          <p>We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.</p>
        </LegalSection>
        <LegalSection title="Your Rights">
          <ul className="list-disc space-y-1 pl-5">
            <li>Access your personal information</li>
            <li>Correct inaccurate information</li>
            <li>Request deletion of your information</li>
            <li>Opt-out of marketing communications</li>
          </ul>
        </LegalSection>
        <LegalSection title="Contact Us">
          <p>
            If you have questions about this Privacy Policy, contact us at{" "}
            <a href={`mailto:${BUSINESS.email}`} className="text-accent">
              {BUSINESS.email}
            </a>{" "}
            or {BUSINESS.phone}.
          </p>
        </LegalSection>
      </Reveal>
    </div>
  );
}
