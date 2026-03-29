import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { SpinnerIcon } from "@/assets/icons/SpinnerIcon";
import { cn } from "@/utils/classNames";

/**
 * Style variants configuration for the Button component.
 * Defines visual styles and sizes using class-variance-authority.
 */
const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "border border-transparent bg-containedButtonBg text-white hover:bg-containedButtonBgHover",
        destructive:
          "border border-transparent bg-errorBg text-white hover:bg-errorBgHover",
        outline:
          "border border-outlinedButtonBorder bg-outlinedButtonBg text-primaryText hover:bg-outlinedButtonBgHover hover:border-outlinedButtonBorderHover",
        secondary:
          "border border-transparent bg-secondaryButtonBg text-primaryText hover:bg-secondaryButtonBgHover",
        ghost:
          "border border-transparent text-primaryText hover:bg-navItemBgHover",
        link: "border border-transparent text-coloredText underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
}

/**
 * Versatile button component with multiple style variants and sizes.
 * Supports composition pattern via asChild prop for custom elements.
 *
 * @component
 * @param {string} [className] - Additional CSS classes to apply
 * @param {('default'|'destructive'|'outline'|'secondary'|'ghost'|'link')} [variant='default'] - Style variant
 * @param {('default'|'sm'|'lg'|'icon')} [size='default'] - Size variant
 * @param {boolean} [asChild=false] - Render as Radix Slot for composition
 * @param {boolean} [loading=false] - Loading state with spinner
 * @param {React.ReactNode} [icon] - Optional icon rendered before children
 * @param {React.Ref} ref - Forwarded ref to the button element
 *
 * @example
 * ```tsx
 * <Button variant="default">Click me</Button>
 * <Button variant="destructive" size="sm">Delete</Button>
 * <Button variant="ghost" size="icon"><Icon /></Button>
 * <Button loading={isLoading}>Submit</Button>
 * <Button icon={<PhoneIcon />}>Call</Button>
 * ```
 */
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      loading = false,
      icon,
      children,
      disabled,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        tabIndex={0}
        {...props}
        disabled={disabled || loading}
        aria-busy={loading || undefined}
      >
        {asChild ? (
          children
        ) : loading ? (
          <>
            <div className="flex items-center justify-center">
              <SpinnerIcon width={36} height={36} />
            </div>
            <span className="sr-only">{children}</span>
          </>
        ) : (
          <>
            {icon && <div className="mr-2">{icon}</div>}
            {children}
          </>
        )}
      </Comp>
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
