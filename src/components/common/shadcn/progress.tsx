import * as ProgressPrimitive from "@radix-ui/react-progress";
import * as React from "react";

import { cn } from "../../../utils/classNames";

interface ProgressProps extends React.ComponentPropsWithoutRef<
  typeof ProgressPrimitive.Root
> {
  indicatorColor?: string;
}

/**
 * Progress bar component for visualizing task completion or loading states.
 * Built on Radix UI Progress primitive with smooth transitions and customizable colors.
 *
 * @component
 * @param {string} [className] - Additional CSS classes to apply
 * @param {number} [value] - Current progress value (0-100)
 * @param {string} [indicatorColor] - Custom CSS color for the indicator
 * @param {React.Ref} ref - Forwarded ref to the progress root element
 *
 * @example
 * ```tsx
 * <Progress value={45} />
 * <Progress value={70} indicatorColor="#00ff00" />
 * ```
 */
const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  ProgressProps
>(({ className, value, indicatorColor, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      "relative h-4 w-full overflow-hidden rounded-full bg-secondaryBg",
      className,
    )}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className="h-full w-full flex-1 transition-all"
      style={{
        transform: `translateX(-${100 - (value || 0)}%)`,
        backgroundColor: indicatorColor || "var(--color-progressIndicator)",
      }}
    />
  </ProgressPrimitive.Root>
));
Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };
