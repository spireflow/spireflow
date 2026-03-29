import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { Circle } from "lucide-react";
import * as React from "react";

import { cn } from "@/utils/classNames";

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
    className={cn("grid gap-3", className)}
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
      "aspect-square h-4.5 w-4.5 rounded-full border border-checkboxBorder text-containedButtonBg transition-colors focus-visible:!outline-2 focus-visible:!outline-focusVisibleBorder focus-visible:!outline-offset-2 data-[state=unchecked]:hover:border-checkboxUncheckedBorderHover data-[state=checked]:border-containedButtonBg disabled:cursor-not-allowed disabled:border-checkboxBorderDisabled disabled:opacity-50",
      className,
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
    <RadioGroupPrimitive.Indicator className="relative flex items-center justify-center">
      <Circle className="absolute top-1/2 left-1/2 h-2.75 w-2.75 -translate-x-1/2 -translate-y-1/2 fill-current text-current" />
    </RadioGroupPrimitive.Indicator>
  </RadioGroupPrimitive.Item>
));
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;

export { RadioGroup, RadioGroupItem };
