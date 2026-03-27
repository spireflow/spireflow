import * as React from "react";

import { cn } from "../../../utils/classNames";

/**
 * Props interface for the Textarea component.
 * Extends all standard HTML textarea attributes.
 */
export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

/**
 * Multi-line text input component with consistent theming.
 * Supports all standard HTML textarea attributes including rows, cols, and maxLength.
 * Includes focus, disabled, and placeholder state styling.
 *
 * @component
 * @param {string} [className] - Additional CSS classes to apply
 * @param {React.Ref} ref - Forwarded ref to the textarea element
 * @param {TextareaProps} props - Standard HTML textarea attributes
 *
 * @example
 * ```tsx
 * <Textarea
 *   placeholder="Enter your message"
 *   rows={5}
 *   value={message}
 *   onChange={(e) => setMessage(e.target.value)}
 * />
 * ```
 */
const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-20 w-full rounded-md border border-inputBorder bg-inputBg px-3 py-2 text-sm transition placeholder:text-secondaryText hover:border-inputBorderHover disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Textarea.displayName = "Textarea";

export { Textarea };
