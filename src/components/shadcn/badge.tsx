import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../../lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ringBorder focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-mainColor text-white hover:bg-mainColor/80",
        secondary:
          "border-transparent bg-secondaryBg text-primaryText hover:bg-secondaryBg/80",
        destructive:
          "border-transparent bg-errorBg text-white hover:bg-errorBg/80",
        outline: "text-primaryText border-inputBorder bg-chipBg hover:bg-chipBgHover",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
