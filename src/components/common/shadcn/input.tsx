import * as React from "react";

import { cn } from "../../../lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

/**
 * Styled text input component with consistent theming.
 * Supports all standard HTML input types and attributes.
 * Includes focus, disabled, and placeholder state styling.
 *
 * @component
 * @param {string} [className] - Additional CSS classes to apply
 * @param {string} [type] - HTML input type (text, email, password, etc.)
 * @param {React.Ref} ref - Forwarded ref to the input element
 * @param {InputProps} props - Standard HTML input attributes
 *
 * @example
 * ```tsx
 * <Input
 *   type="email"
 *   placeholder="Enter your email"
 *   value={email}
 *   onChange={(e) => setEmail(e.target.value)}
 * />
 * ```
 */
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-inputBorder bg-inputBg px-3 py-2 text-sm transition file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-placeholderText hover:bg-inputBgHover hover:border-inputBorderHover focus:border-inputBorderFocus focus-visible:!outline-none disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
