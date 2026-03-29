import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import * as React from "react";

import { cn } from "@/utils/classNames";

import { type ButtonProps, buttonVariants } from "./button";

/**
 * Root pagination navigation component.
 * Provides semantic HTML structure with proper ARIA labels for accessibility.
 *
 * @component
 * @param {string} [className] - Additional CSS classes to apply
 * @param {React.ComponentProps<'nav'>} props - Standard nav element props
 *
 * @example
 * ```tsx
 * <Pagination>
 *   <PaginationContent>
 *     <PaginationItem>
 *       <PaginationLink>1</PaginationLink>
 *     </PaginationItem>
 *   </PaginationContent>
 * </Pagination>
 * ```
 */
const Pagination = ({ className, ...props }: React.ComponentProps<"nav">) => {
  return (
    <nav
      role="navigation"
      aria-label="pagination"
      data-slot="pagination"
      className={cn("flex w-full justify-center", className)}
      {...props}
    />
  );
};

/**
 * Container for pagination items.
 * Renders as an unordered list with flexbox layout.
 *
 * @component
 * @param {string} [className] - Additional CSS classes to apply
 * @param {React.ComponentProps<'ul'>} props - Standard ul element props
 */
const PaginationContent = ({
  className,
  ...props
}: React.ComponentProps<"ul">) => {
  return (
    <ul
      data-slot="pagination-content"
      className={cn("flex flex-row items-center gap-1", className)}
      {...props}
    />
  );
};

/**
 * Individual pagination item wrapper.
 * Should contain pagination links or controls.
 *
 * @component
 * @param {React.ComponentProps<'li'>} props - Standard li element props
 */
const PaginationItem = ({ ...props }: React.ComponentProps<"li">) => {
  return <li data-slot="pagination-item" {...props} />;
};

/**
 * Props for the PaginationLink component.
 *
 * @typedef {Object} PaginationLinkProps
 * @property {boolean} [isActive] - Whether this page is currently active
 * @property {ButtonProps['size']} [size] - Size variant for the button
 */
type PaginationLinkProps = {
  isActive?: boolean;
} & Pick<ButtonProps, "size"> &
  React.ComponentProps<"button">;

/**
 * Clickable pagination link/button.
 * Supports active state styling and accessible ARIA attributes.
 *
 * @component
 * @param {string} [className] - Additional CSS classes to apply
 * @param {boolean} [isActive] - Whether this is the current page
 * @param {ButtonProps['size']} [size='icon'] - Button size variant
 * @param {React.ComponentProps<'button'>} props - Standard button props
 *
 * @example
 * ```tsx
 * <PaginationLink isActive={true}>1</PaginationLink>
 * ```
 */
const PaginationLink = ({
  className,
  isActive,
  size = "icon",
  ...props
}: PaginationLinkProps) => {
  return (
    <button
      aria-current={isActive ? "page" : undefined}
      tabIndex={0}
      data-slot="pagination-link"
      data-active={isActive}
      className={cn(
        buttonVariants({
          variant: isActive ? "outline" : "ghost",
          size,
        }),
        "transition-none",
        className,
      )}
      {...props}
    />
  );
};

/**
 * Previous page navigation button.
 * Displays a chevron icon and "Previous" text label.
 *
 * @component
 * @param {string} [className] - Additional CSS classes to apply
 * @param {React.ComponentProps<typeof PaginationLink>} props - PaginationLink props
 *
 * @example
 * ```tsx
 * <PaginationPrevious onClick={() => goToPage(currentPage - 1)} />
 * ```
 */
type PaginationPreviousProps = React.ComponentProps<typeof PaginationLink> & {
  label?: string;
};

const PaginationPrevious = ({
  className,
  label = "Previous",
  ...props
}: PaginationPreviousProps) => {
  return (
    <PaginationLink
      aria-label="Go to previous page"
      size="default"
      className={cn("gap-1 px-2.5 sm:pl-2.5", className)}
      {...props}
    >
      <ChevronLeft className="h-4 w-4" />
      <span className="hidden sm:block">{label}</span>
    </PaginationLink>
  );
};

/**
 * Next page navigation button.
 * Displays a chevron icon and "Next" text label.
 *
 * @component
 * @param {string} [className] - Additional CSS classes to apply
 * @param {React.ComponentProps<typeof PaginationLink>} props - PaginationLink props
 *
 * @example
 * ```tsx
 * <PaginationNext onClick={() => goToPage(currentPage + 1)} />
 * ```
 */
type PaginationNextProps = React.ComponentProps<typeof PaginationLink> & {
  label?: string;
};

const PaginationNext = ({
  className,
  label = "Next",
  ...props
}: PaginationNextProps) => {
  return (
    <PaginationLink
      aria-label="Go to next page"
      size="default"
      className={cn("gap-1 px-2.5 sm:pr-2.5", className)}
      {...props}
    >
      <span className="hidden sm:block">{label}</span>
      <ChevronRight className="h-4 w-4" />
    </PaginationLink>
  );
};

/**
 * Ellipsis indicator for truncated page numbers.
 * Shows "..." to indicate skipped pages in pagination.
 * Hidden from screen readers with aria-hidden.
 *
 * @component
 * @param {string} [className] - Additional CSS classes to apply
 * @param {React.ComponentProps<'span'>} props - Standard span element props
 *
 * @example
 * ```tsx
 * <PaginationEllipsis />
 * ```
 */
const PaginationEllipsis = ({
  className,
  ...props
}: React.ComponentProps<"span">) => {
  return (
    <span
      aria-hidden
      data-slot="pagination-ellipsis"
      className={cn("flex size-9 items-center justify-center", className)}
      {...props}
    >
      <MoreHorizontal className="size-4" />
      <span className="sr-only">More pages</span>
    </span>
  );
};

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
};
