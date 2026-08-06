"use server";

import { createServerSupabaseClient } from "@/lib/supabase/server";

export interface ContactPayload {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export async function submitContactMessage(payload: ContactPayload) {
  const supabase = await createServerSupabaseClient();

  if (!supabase) {
    // No backend configured yet — the site runs on mock data. In production,
    // wire NEXT_PUBLIC_SUPABASE_* env vars and this insert goes live.
    return { ok: true, persisted: false };
  }

  const { error } = await supabase.from("contact_messages").insert({
    name: payload.name,
    email: payload.email,
    phone: payload.phone,
    message: payload.message,
    source_page: "/contact",
  });

  if (error) return { ok: false, persisted: false, error: error.message };
  return { ok: true, persisted: true };
}
