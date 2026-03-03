import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import * as React from "react";

import { cn } from "../../../utils/classNames";

/**
 * Provider component that wraps the application or section to enable tooltips.
 * Required for Tooltip components to function properly.
 *
 * @component
 * @example
 * ```tsx
 * <TooltipProvider>
 *   <App />
 * </TooltipProvider>
 * ```
 */
const TooltipProvider = TooltipPrimitive.Provider;

/**
 * Root tooltip component that manages tooltip state.
 *
 * @component
 * @example
 * ```tsx
 * <Tooltip>
 *   <TooltipTrigger>Hover me</TooltipTrigger>
 *   <TooltipContent>Tooltip text</TooltipContent>
 * </Tooltip>
 * ```
 */
const Tooltip = TooltipPrimitive.Root;

/**
 * Trigger element that shows the tooltip when hovered or focused.
 *
 * @component
 */
const TooltipTrigger = TooltipPrimitive.Trigger;

/**
 * Portal component for rendering tooltip content in a custom container.
 * By default tooltips render to document.body, but this allows custom positioning.
 *
 * @component
 * @param {HTMLElement} [container] - Custom container element for the portal
 */
const TooltipPortal = TooltipPrimitive.Portal;

/**
 * Content container for the tooltip with styled appearance and animations.
 * Includes smooth fade-in/out and zoom transitions.
 *
 * @component
 * @param {string} [className] - Additional CSS classes to apply
 * @param {number} [sideOffset=4] - Distance in pixels from the trigger element
 * @param {React.Ref} ref - Forwarded ref to the content element
 *
 * @example
 * ```tsx
 * <TooltipContent sideOffset={8}>
 *   This is a helpful tooltip message
 * </TooltipContent>
 * ```
 */
const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, align = "start", ...props }, ref) => (
  <TooltipPrimitive.Portal>
    <TooltipPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      align={align}
      className={cn(
        "z-50 overflow-hidden rounded-md border border-mainBorder bg-tooltipBg px-3 py-1.5 text-sm text-primaryText shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className,
      )}
      {...props}
    />
  </TooltipPrimitive.Portal>
));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

export {
  Tooltip,
  TooltipContent,
  TooltipPortal,
  TooltipProvider,
  TooltipTrigger,
};
