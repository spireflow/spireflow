import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";

import { cn } from "../../../lib/utils";

/**
 * Range slider component for selecting numeric values.
 * Built on Radix UI Slider primitive with support for single or multiple thumbs.
 * Includes keyboard navigation, touch support, and accessibility features.
 *
 * @component
 * @param {string} [className] - Additional CSS classes to apply
 * @param {number|number[]} [defaultValue] - Initial value(s) for the slider
 * @param {React.Ref} ref - Forwarded ref to the slider root element
 * @param {React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>} props - Radix Slider props
 *
 * @example
 * ```tsx
 * <Slider
 *   defaultValue={[50]}
 *   max={100}
 *   step={1}
 *   onValueChange={(value) => console.log(value)}
 * />
 * ```
 */
const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => {
  const initialValue = Array.isArray(props.defaultValue)
    ? props.defaultValue
    : [props.defaultValue ?? 0];

  return (
    <SliderPrimitive.Root
      ref={ref}
      className={cn(
        "relative flex w-full touch-none select-none items-center",
        className
      )}
      {...props}
    >
      <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-secondaryBg">
        <SliderPrimitive.Range className="absolute h-full bg-containedButtonBg" />
      </SliderPrimitive.Track>
      {initialValue.map((_, i) => (
        <SliderPrimitive.Thumb
          key={i}
          className="block h-5 w-5 rounded-full border-2 border-containedButtonBg bg-white transition-colors disabled:pointer-events-none disabled:opacity-50"
        />
      ))}
    </SliderPrimitive.Root>
  );
});
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
