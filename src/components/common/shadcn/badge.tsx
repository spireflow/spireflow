import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../../../lib/utils";

/**
 * Style variants configuration for the Badge component.
 */
const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-mainColor text-white hover:bg-mainColor/80",
        secondary:
          "border-transparent bg-secondaryBg text-primaryText hover:bg-secondaryBg/80",
        destructive:
          "border-transparent bg-errorBg text-white hover:bg-errorBg/80",
        outline:
          "text-primaryText border-inputBorder bg-chipBg hover:bg-chipBgHover",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

/**
 * Small badge component for labels, status indicators, and counts.
 * Displays inline with rounded pill shape in multiple color variants.
 *
 * @component
 * @param {string} [className] - Additional CSS classes to apply
 * @param {('default'|'secondary'|'destructive'|'outline')} [variant='default'] - Style variant
 *
 * @example
 * ```tsx
 * <Badge>New</Badge>
 * <Badge variant="destructive">Error</Badge>
 * <Badge variant="outline">Draft</Badge>
 * ```
 */
function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
