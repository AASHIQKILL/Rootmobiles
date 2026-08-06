"use client";

import { ReactLenis } from "lenis/react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <>{children}</>;
  }

  return (
    <ReactLenis
      root
      options={{
        lerp: 0.11,
        duration: 1.1,
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1.15,
      }}
    >
      {children}
    </ReactLenis>
  );
}
