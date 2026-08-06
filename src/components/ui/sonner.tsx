"use client";

import { Toaster as Sonner, type ToasterProps } from "sonner";

function Toaster(props: ToasterProps) {
  return (
    <Sonner
      theme="dark"
      className="toaster group"
      position="bottom-right"
      toastOptions={{
        classNames: {
          toast:
            "glass-strong !rounded-2xl !text-foreground !shadow-2xl group-[.toaster]:border-border-strong",
          description: "!text-muted-foreground",
          actionButton: "!bg-accent !text-accent-foreground",
          cancelButton: "!bg-white/10 !text-foreground",
        },
      }}
      {...props}
    />
  );
}

export { Toaster };
