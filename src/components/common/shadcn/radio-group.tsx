import * as React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { Circle } from "lucide-react";

import { cn } from "../../../lib/utils";

/**
 * Container for a group of radio button options.
 * Built on Radix UI RadioGroup primitive with accessibility and keyboard navigation.
 * Only one item can be selected at a time.
 *
 * @component
 * @param {string} [className] - Additional CSS classes to apply
 * @param {React.Ref} ref - Forwarded ref to the radio group element
 * @param {React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>} props - Radix RadioGroup props
 *
 * @example
 * ```tsx
 * <RadioGroup value={value} onValueChange={setValue}>
 *   <div className="flex items-center space-x-2">
 *     <RadioGroupItem value="option1" id="r1" />
 *     <Label htmlFor="r1">Option 1</Label>
 *   </div>
 * </RadioGroup>
 * ```
 */
const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => (
  <RadioGroupPrimitive.Root
    className={cn("grid gap-2", className)}
    {...props}
    ref={ref}
  />
));
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;

/**
 * Individual radio button item within a RadioGroup.
 * Shows a filled circle indicator when selected.
 *
 * @component
 * @param {string} [className] - Additional CSS classes to apply
 * @param {string} value - Unique value for this radio option
 * @param {React.Ref} ref - Forwarded ref to the radio item element
 *
 * @example
 * ```tsx
 * <RadioGroupItem value="default" id="r1" />
 * ```
 */
const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ className, onKeyDown, ...props }, ref) => (
  <RadioGroupPrimitive.Item
    ref={ref}
    tabIndex={0}
    className={cn(
      "aspect-square h-4 w-4 rounded-full border border-checkboxBorder text-containedButtonBg disabled:cursor-not-allowed disabled:border-checkboxBorderDisabled disabled:opacity-50",
      className
    )}
    onKeyDownCapture={(e) => {
      if (e.key === "Enter" && !props.disabled) {
        e.preventDefault();
        (e.currentTarget as HTMLButtonElement).click();
      }
      onKeyDown?.(e);
    }}
    {...props}
  >
    <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
      <Circle className="h-2.5 w-2.5 fill-current text-current" />
    </RadioGroupPrimitive.Indicator>
  </RadioGroupPrimitive.Item>
));
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;

export { RadioGroup, RadioGroupItem };
