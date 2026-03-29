import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";
import * as React from "react";

import { cn } from "@/utils/classNames";

/**
 * Checkbox component for boolean selection states.
 * Built on Radix UI Checkbox primitive with accessibility and keyboard support.
 * Displays a checkmark icon when checked.
 *
 * @component
 * @param {string} [className] - Additional CSS classes to apply
 * @param {React.Ref} ref - Forwarded ref to the checkbox element
 * @param {React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>} props - Radix Checkbox props
 *
 * @example
 * ```tsx
 * <Checkbox
 *   checked={isChecked}
 *   onCheckedChange={setIsChecked}
 *   id="terms"
 * />
 * <Label htmlFor="terms">Accept terms</Label>
 * ```
 */
const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, onKeyDown, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    tabIndex={0}
    className={cn(
      "peer h-4.5 w-4.5 shrink-0 rounded-sm border border-checkboxBorder transition-colors disabled:cursor-not-allowed disabled:border-checkboxBorderDisabled disabled:opacity-50 data-[state=unchecked]:hover:border-checkboxUncheckedBorderHover data-[state=checked]:bg-containedButtonBg data-[state=checked]:text-white data-[state=checked]:border-containedButtonBg",
      className,
    )}
    onKeyDown={(e) => {
      if (e.key === "Enter" && !props.disabled) {
        e.preventDefault();
        const mouseEvent = new MouseEvent("click", {
          bubbles: true,
          cancelable: true,
          view: window,
        });
        e.currentTarget.dispatchEvent(mouseEvent);
      }
      onKeyDown?.(e);
    }}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className={cn("flex items-center justify-center text-current")}
    >
      <Check className="h-4.5 w-4.5" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
