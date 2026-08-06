"use client";

import { useState, useTransition } from "react";
import { CheckCircle2, MessageCircle } from "lucide-react";
import { toast } from "sonner";

import { whatsappLink } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { submitContactMessage } from "./actions";

export function ContactForm() {
  const [isPending, startTransition] = useTransition();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name.trim() || !form.message.trim()) {
      toast.error("Please fill in your name and message.");
      return;
    }
    startTransition(async () => {
      const res = await submitContactMessage(form);
      if (res.ok) {
        setSubmitted(true);
        toast.success("Message sent — we'll get back to you soon.");
      } else {
        toast.error("Something went wrong. Try WhatsApp instead?");
      }
    });
  }

  if (submitted) {
    return (
      <div className="glass rounded-2xl p-8 text-center">
        <CheckCircle2 className="mx-auto size-10 text-accent" />
        <h3 className="mt-4 font-display text-xl font-semibold">Thanks, {form.name.split(" ")[0]}!</h3>
        <p className="mt-2 text-sm text-muted-foreground">We&apos;ve received your message and will reply shortly.</p>
        <Button variant="whatsapp" className="mt-6" asChild>
          <a href={whatsappLink(`Hi Root Mobiles! Following up on my message: ${form.message}`)} target="_blank" rel="noopener noreferrer">
            <MessageCircle className="size-4" /> Continue on WhatsApp
          </a>
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="glass grid gap-5 rounded-2xl p-6 sm:p-8">
      <div>
        <Label htmlFor="c-name">Name</Label>
        <Input id="c-name" required className="mt-1.5" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="c-email">Email</Label>
          <Input id="c-email" type="email" className="mt-1.5" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        </div>
        <div>
          <Label htmlFor="c-phone">Phone</Label>
          <Input id="c-phone" type="tel" className="mt-1.5" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
        </div>
      </div>
      <div>
        <Label htmlFor="c-message">Message</Label>
        <Textarea id="c-message" required className="mt-1.5" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
      </div>
      <Button type="submit" size="lg" disabled={isPending}>
        {isPending ? "Sending…" : "Send Message"}
      </Button>
    </form>
  );
}
