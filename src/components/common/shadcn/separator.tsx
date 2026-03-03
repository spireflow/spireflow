import * as SeparatorPrimitive from "@radix-ui/react-separator";
import * as React from "react";

import { cn } from "../../../utils/classNames";

/**
 * Separator component for visually dividing content sections.
 * Built on Radix UI Separator primitive with proper semantic HTML and ARIA attributes.
 * Supports both horizontal and vertical orientations.
 *
 * @component
 * @param {string} [className] - Additional CSS classes to apply
 * @param {('horizontal'|'vertical')} [orientation='horizontal'] - Direction of the separator
 * @param {boolean} [decorative=true] - Whether the separator is purely decorative (affects ARIA)
 * @param {React.Ref} ref - Forwarded ref to the separator element
 *
 * @example
 * ```tsx
 * <div>Content above</div>
 * <Separator className="my-4" />
 * <div>Content below</div>
 *
 * <div className="flex">
 *   <div>Left content</div>
 *   <Separator orientation="vertical" className="mx-2" />
 *   <div>Right content</div>
 * </div>
 * ```
 */
const Separator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>
>(
  (
    { className, orientation = "horizontal", decorative = true, ...props },
    ref,
  ) => (
    <SeparatorPrimitive.Root
      ref={ref}
      decorative={decorative}
      orientation={orientation}
      className={cn(
        "shrink-0 bg-inputBorder",
        orientation === "horizontal" ? "h-px w-full" : "h-full w-px",
        className,
      )}
      {...props}
    />
  ),
);
Separator.displayName = SeparatorPrimitive.Root.displayName;

export { Separator };
