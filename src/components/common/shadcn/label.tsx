import * as LabelPrimitive from "@radix-ui/react-label";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "../../../utils/classNames";

/**
 * Style variants for the Label component.
 * Includes disabled state handling for peer elements.
 */
const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
);

/**
 * Accessible label component for form inputs.
 * Built on Radix UI Label primitive with proper semantic HTML and ARIA attributes.
 * Automatically associates with form controls and handles disabled states.
 *
 * @component
 * @param {string} [className] - Additional CSS classes to apply
 * @param {React.Ref} ref - Forwarded ref to the label element
 * @param {React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>} props - Radix Label props
 *
 * @example
 * ```tsx
 * <Label htmlFor="email">Email Address</Label>
 * <Input id="email" type="email" />
 * ```
 */
const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> &
    VariantProps<typeof labelVariants>
>(({ className, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(labelVariants(), className)}
    {...props}
  />
));
Label.displayName = LabelPrimitive.Root.displayName;

export { Label };
