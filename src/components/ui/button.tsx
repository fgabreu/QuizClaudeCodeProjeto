import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-[var(--color-primary)] text-white shadow hover:bg-[var(--color-primary-dark)]",
        outline:
          "border border-[var(--border)] bg-[var(--surface)] text-[var(--fg)] hover:bg-[var(--color-cream)] hover:border-[var(--color-primary)]",
        ghost: "text-[var(--fg)] hover:bg-[var(--color-cream)]",
        secondary:
          "bg-[var(--surface)] border border-[var(--border)] text-[var(--fg)] shadow-sm hover:bg-[var(--color-cream)]",
        correct:
          "bg-emerald-500 text-white shadow hover:bg-emerald-600 border-2 border-emerald-600",
        incorrect: "bg-red-500 text-white shadow hover:bg-red-600 border-2 border-red-600",
      },
      size: {
        default: "h-10 px-5 py-2",
        sm: "h-8 px-3 text-xs",
        lg: "h-12 px-8 text-base",
        xl: "h-14 px-10 text-lg",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
