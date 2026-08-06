"use client";

import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

import { whatsappLink } from "@/lib/constants";

export function WhatsappFab() {
  return (
    <motion.a
      href={whatsappLink("Hi Root Mobiles! I'd like to know more.")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Root Mobiles on WhatsApp"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.4, type: "spring", stiffness: 200, damping: 16 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.94 }}
      className="fixed bottom-5 right-5 z-40 flex size-14 items-center justify-center rounded-full bg-[#25D366] text-black shadow-[0_10px_30px_-8px_rgba(37,211,102,0.65)] sm:bottom-8 sm:right-8"
    >
      <span className="absolute inset-0 -z-10 animate-pulse-glow rounded-full bg-[#25D366]/50" />
      <MessageCircle className="size-6" />
    </motion.a>
  );
}
