import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../../../lib/utils";

/**
 * Style variants configuration for the Button component.
 * Defines visual styles and sizes using class-variance-authority.
 */
const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-containedButtonBg text-white hover:bg-containedButtonBgHover",
        destructive: "bg-errorBg text-white hover:bg-errorBg/85",
        outline:
          "border border-outlinedButtonBorder bg-outlinedButtonBg text-primaryText hover:bg-outlinedButtonBgHover",
        secondary: "bg-secondaryBg text-primaryText hover:brightness-95",
        ghost: "text-primaryText hover:bg-navItemBgHover",
        link: "text-coloredText underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
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
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

/**
 * Versatile button component with multiple style variants and sizes.
 * Supports composition pattern via asChild prop for custom elements.
 *
 * @component
 * @param {string} [className] - Additional CSS classes to apply
 * @param {('default'|'destructive'|'outline'|'secondary'|'ghost'|'link')} [variant='default'] - Style variant
 * @param {('default'|'sm'|'lg'|'icon')} [size='default'] - Size variant
 * @param {boolean} [asChild=false] - Render as Radix Slot for composition
 * @param {React.Ref} ref - Forwarded ref to the button element
 *
 * @example
 * ```tsx
 * <Button variant="default">Click me</Button>
 * <Button variant="destructive" size="sm">Delete</Button>
 * <Button variant="ghost" size="icon"><Icon /></Button>
 * ```
 */
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
