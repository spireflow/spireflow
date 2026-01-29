import React from "react";

import { SpinnerIcon } from "../../assets/icons/SpinnerIcon";

interface ContainedButtonProps {
  text?: string;
  children?: React.ReactNode;
  handleClick?: () => void;
  loading?: boolean;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  icon?: React.ReactNode;
  className?: string;
  ariaLabel?: string;
  ariaPressed?: boolean;
  fullWidth?: boolean;
}

/**
 * Primary contained button component with filled background.
 * Supports loading state, icons, and full accessibility attributes.
 *
 * @component
 * @param {string} [text] - Button label
 * @param {React.ReactNode} [children] - Button content
 * @param {Function} [handleClick] - Callback on click
 * @param {boolean} [loading=false] - Loading state with spinner
 * @param {boolean} [disabled=false] - Disabled state
 * @param {('button'|'submit'|'reset')} [type='button'] - Button type
 * @param {React.ReactNode} [icon] - Optional icon
 * @param {string} [className] - Extra classes
 * @param {string} [ariaLabel] - Aria label
 * @param {boolean} [ariaPressed] - Aria pressed state
 *
 * @example
 * ```tsx
 * <ContainedButton text="Submit" handleClick={handleSubmit} />
 * <ContainedButton loading={true}>Processing...</ContainedButton>
 * ```
 */
export const ContainedButton = ({
  text,
  children,
  handleClick,
  loading = false,
  disabled = false,
  type = "button",
  icon,
  className,
  ariaLabel,
  ariaPressed,
  fullWidth = true,
}: ContainedButtonProps) => {
  return (
    <button
      onClick={handleClick}
      type={type}
      disabled={disabled || loading}
      aria-disabled={disabled || loading}
      aria-busy={loading}
      aria-label={ariaLabel || text}
      aria-pressed={ariaPressed}
      className={`transition text-nowrap ${fullWidth ? "w-full h-full" : ""} flex items-center justify-center disabled:opacity-75 bg-containedButtonBg
      hover:bg-containedButtonBgHover text-white p-2 rounded-md ${className} text-sm 3xl:text-base`}
    >
      {icon && <div className="mr-2"> {icon}</div>}
      {loading ? <SpinnerIcon /> : children || text}
    </button>
  );
};
