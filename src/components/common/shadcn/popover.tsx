import * as PopoverPrimitive from "@radix-ui/react-popover";
import * as React from "react";

import { cn } from "../../../utils/classNames";

/**
 * Root component for creating a popover container.
 * Uses Radix UI's Popover primitive for accessibility and behavior.
 *
 * @component
 * @example
 * ```tsx
 * <Popover>
 *   <PopoverTrigger>Open</PopoverTrigger>
 *   <PopoverContent>Content here</PopoverContent>
 * </Popover>
 * ```
 */
const Popover = PopoverPrimitive.Root;

/**
 * Trigger element that opens the popover when clicked.
 * Can be any interactive element.
 *
 * @component
 */
const PopoverTrigger = PopoverPrimitive.Trigger;

/**
 * Content container for the popover with styled appearance and animations.
 * Includes fade-in/out and zoom transitions based on open state.
 *
 * @component
 * @param {string} [className] - Additional CSS classes to apply
 * @param {('center'|'start'|'end')} [align='center'] - Alignment relative to the trigger
 * @param {number} [sideOffset=4] - Distance in pixels from the trigger
 * @param {React.Ref} ref - Forwarded ref to the content element
 *
 * @example
 * ```tsx
 * <PopoverContent align="start" sideOffset={8}>
 *   <p>Popover content</p>
 * </PopoverContent>
 * ```
 */
const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(
  (
    { className, align = "center", sideOffset = 4, onCloseAutoFocus, ...props },
    ref,
  ) => {
    const closedWithPointerRef = React.useRef(false);

    return (
      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          ref={ref}
          align={align}
          sideOffset={sideOffset}
          className={cn(
            "z-50 w-72 rounded-md border border-inputBorder bg-dropdownBg p-4 text-primaryText shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
            className,
          )}
          onPointerDown={() => {
            closedWithPointerRef.current = true;
          }}
          onPointerDownOutside={() => {
            closedWithPointerRef.current = true;
          }}
          onCloseAutoFocus={(e) => {
            if (closedWithPointerRef.current) {
              e.preventDefault();
              closedWithPointerRef.current = false;
            }
            onCloseAutoFocus?.(e);
          }}
          {...props}
        />
      </PopoverPrimitive.Portal>
    );
  },
);
PopoverContent.displayName = PopoverPrimitive.Content.displayName;

export { Popover, PopoverContent, PopoverTrigger };
