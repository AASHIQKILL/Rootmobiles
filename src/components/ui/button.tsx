import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 cursor-pointer select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background",
  {
    variants: {
      variant: {
        default:
          "bg-accent text-accent-foreground shadow-[0_0_0_1px_rgba(244,196,48,0.35),0_8px_24px_-8px_rgba(244,196,48,0.55)] hover:shadow-[0_0_0_1px_rgba(244,196,48,0.5),0_10px_32px_-8px_rgba(244,196,48,0.7)] hover:brightness-110 active:scale-[0.97]",
        secondary:
          "glass text-foreground hover:bg-white/8 active:scale-[0.97]",
        outline:
          "border border-border-strong text-foreground hover:border-accent/60 hover:text-accent active:scale-[0.97]",
        ghost: "text-foreground/80 hover:text-foreground hover:bg-white/5",
        link: "text-accent underline-offset-4 hover:underline",
        whatsapp:
          "bg-[#25D366] text-black shadow-[0_8px_24px_-8px_rgba(37,211,102,0.55)] hover:brightness-110 active:scale-[0.97]",
      },
      size: {
        default: "h-11 px-6 has-[>svg]:px-5",
        sm: "h-9 px-4 text-[13px] has-[>svg]:px-3.5",
        lg: "h-14 px-8 text-base has-[>svg]:px-7",
        icon: "size-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
