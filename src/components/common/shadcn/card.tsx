import { cva, type VariantProps } from "class-variance-authority";
import { type ReactNode } from "react";

import { cn } from "../../../utils/classNames";

/**
 * Style variants configuration for CardHeader component.
 * Defines visual styles using class-variance-authority.
 *
 * @property {Object} variants.variant - Available header variants
 * @property {string} variants.variant.default - Standard header without divider
 * @property {string} variants.variant.divider - Header with bottom border divider and spacing
 */
const cardHeaderVariants = cva("w-full px-6", {
  variants: {
    variant: {
      default: "",
      divider: "border-b border-cardBorder pb-4 mb-6",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

type CardProps = {
  children: ReactNode;
  className?: string;
  id?: string;
};

/**
 * Root card container with consistent border, shadow, and rounded corners.
 * Used throughout the application for grouping related content.
 *
 * @component
 * @param {ReactNode} children - Card content (CardHeader, CardContent, or raw elements)
 * @param {string} [className] - Additional CSS classes to apply
 * @param {string} [id] - Element identifier
 *
 * @example
 * ```tsx
 * <Card>
 *   <CardHeader variant="divider">
 *     <CardTitle>Statistics</CardTitle>
 *   </CardHeader>
 *   <CardContent>
 *     <p>Card content here</p>
 *   </CardContent>
 * </Card>
 * ```
 */
export const Card = ({ children, className, id }: CardProps) => {
  return (
    <div
      id={id}
      style={{ boxShadow: "var(--cardShadow)" }}
      className={cn(
        "border border-cardBorder rounded-xl bg-primaryBg relative w-full text-left h-full pt-[1.35rem] pb-6",
        className,
      )}
    >
      {children}
    </div>
  );
};

type CardHeaderProps = {
  children: ReactNode;
  className?: string;
} & VariantProps<typeof cardHeaderVariants>;

/**
 * Header section for title and optional actions.
 * Supports a divider variant that adds a bottom border spanning the full card width.
 *
 * @component
 * @param {ReactNode} children - Header content (typically CardTitle)
 * @param {string} [className] - Additional CSS classes to apply
 * @param {('default'|'divider')} [variant='default'] - Visual style variant
 *
 * @example
 * ```tsx
 * <CardHeader variant="divider">
 *   <CardTitle>Revenue Overview</CardTitle>
 * </CardHeader>
 * ```
 */
export const CardHeader = ({
  children,
  className,
  variant,
}: CardHeaderProps) => {
  return (
    <div className={cn(cardHeaderVariants({ variant }), className)}>
      {children}
    </div>
  );
};

type CardTitleProps = {
  children: ReactNode;
  className?: string;
};

/**
 * Title text for the card header.
 * Renders with responsive font sizes across breakpoints.
 *
 * @component
 * @param {ReactNode} children - Title text content
 * @param {string} [className] - Additional CSS classes to apply
 *
 * @example
 * ```tsx
 * <CardTitle>Monthly Revenue</CardTitle>
 * ```
 */
export const CardTitle = ({ children, className }: CardTitleProps) => {
  return (
    <p
      className={cn(
        "text-sm 1xl:text-base 3xl:text-lg font-semibold text-primaryText",
        className,
      )}
    >
      {children}
    </p>
  );
};

type CardContentProps = {
  children: ReactNode;
  className?: string;
};

/**
 * Main body container for card content.
 * Provides consistent horizontal padding matching the header.
 *
 * @component
 * @param {ReactNode} children - Body content (charts, forms, tables, etc.)
 * @param {string} [className] - Additional CSS classes to apply
 *
 * @example
 * ```tsx
 * <CardContent>
 *   <p>Content with default px-6 padding</p>
 * </CardContent>
 * <CardContent className="px-9">
 *   <p>Content with custom padding</p>
 * </CardContent>
 * ```
 */
export const CardContent = ({ children, className }: CardContentProps) => {
  return (
    <div className={cn("w-full px-6 max-h-full", className)}>{children}</div>
  );
};
