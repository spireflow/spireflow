import { Slot } from "@radix-ui/react-slot";
import { ChevronRight, MoreHorizontal } from "lucide-react";
import * as React from "react";

import { cn } from "../../../utils/classNames";

/**
 * Root breadcrumb navigation component for displaying hierarchical page location.
 * Provides semantic navigation structure with proper ARIA labels for accessibility.
 * Automatically wraps BreadcrumbList and BreadcrumbItem components.
 *
 * @component
 * @param {string} [className] - Additional CSS classes to apply
 * @param {React.ReactNode} children - Breadcrumb content (typically BreadcrumbList)
 * @param {React.ReactNode} [separator] - Custom separator element between items
 * @param {React.Ref} ref - Forwarded ref to the nav element
 */
const Breadcrumb = React.forwardRef<
  HTMLElement,
  React.ComponentPropsWithoutRef<"nav"> & {
    separator?: React.ReactNode;
  }
>(({ ...props }, ref) => <nav ref={ref} aria-label="breadcrumb" {...props} />);
Breadcrumb.displayName = "Breadcrumb";

/**
 * Ordered list container for breadcrumb items.
 * Provides flexbox layout with responsive spacing and text styling.
 *
 * @component
 * @param {string} [className] - Additional CSS classes to apply
 * @param {React.ReactNode} children - Breadcrumb items and separators
 * @param {React.Ref} ref - Forwarded ref to the ol element
 */
const BreadcrumbList = React.forwardRef<
  HTMLOListElement,
  React.ComponentPropsWithoutRef<"ol">
>(({ className, ...props }, ref) => (
  <ol
    ref={ref}
    className={cn(
      "flex flex-wrap items-center gap-1.5 break-words text-sm text-secondaryText sm:gap-2.5",
      className,
    )}
    {...props}
  />
));
BreadcrumbList.displayName = "BreadcrumbList";

/**
 * Individual breadcrumb item wrapper.
 * Wraps a single breadcrumb link or page indicator.
 *
 * @component
 * @param {string} [className] - Additional CSS classes to apply
 * @param {React.ReactNode} children - Content (typically BreadcrumbLink or BreadcrumbPage)
 * @param {React.Ref} ref - Forwarded ref to the li element
 *
 * @example
 * ```tsx
 * <BreadcrumbItem>
 *   <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
 * </BreadcrumbItem>
 * ```
 */
const BreadcrumbItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentPropsWithoutRef<"li">
>(({ className, ...props }, ref) => (
  <li
    ref={ref}
    className={cn("inline-flex items-center gap-1.5", className)}
    {...props}
  />
));
BreadcrumbItem.displayName = "BreadcrumbItem";

/**
 * Clickable link for navigating between breadcrumb levels.
 * Supports hover effects and composition pattern via asChild prop.
 *
 * @component
 * @param {boolean} [asChild=false] - When true, merges props with child element (useful with Next.js Link)
 * @param {boolean} [disabledLink=false] - When true, renders as span instead of anchor (non-clickable)
 * @param {string} [className] - Additional CSS classes to apply
 * @param {string} [href] - URL to navigate to
 * @param {React.ReactNode} children - Link text content
 * @param {React.Ref} ref - Forwarded ref to the anchor element
 *
 * @example
 * ```tsx
 * <BreadcrumbLink href="/products">
 *   Products
 * </BreadcrumbLink>
 * ```
 */
const BreadcrumbLink = React.forwardRef<
  HTMLAnchorElement,
  React.ComponentPropsWithoutRef<"a"> & {
    asChild?: boolean;
    disabledLink?: boolean;
  }
>(({ asChild, disabledLink, className, ...props }, ref) => {
  const Comp = disabledLink ? "span" : asChild ? Slot : "a";

  return (
    <Comp
      ref={ref as React.Ref<HTMLAnchorElement & HTMLSpanElement>}
      className={cn(
        "transition-colors",
        !disabledLink && "hover:text-primaryText",
        className,
      )}
      {...props}
    />
  );
});
BreadcrumbLink.displayName = "BreadcrumbLink";

/**
 * Current page indicator (non-clickable).
 * Marks the active page in breadcrumb trail with proper ARIA attributes.
 * Typically the last item in the breadcrumb navigation.
 *
 * @component
 * @param {string} [className] - Additional CSS classes to apply
 * @param {React.ReactNode} children - Current page name
 * @param {React.Ref} ref - Forwarded ref to the span element
 *
 * @example
 * ```tsx
 * <BreadcrumbItem>
 *   <BreadcrumbPage>Product Details</BreadcrumbPage>
 * </BreadcrumbItem>
 * ```
 */
const BreadcrumbPage = React.forwardRef<
  HTMLSpanElement,
  React.ComponentPropsWithoutRef<"span">
>(({ className, ...props }, ref) => (
  <span
    ref={ref}
    role="link"
    aria-disabled="true"
    aria-current="page"
    className={cn("font-normal text-primaryText", className)}
    {...props}
  />
));
BreadcrumbPage.displayName = "BreadcrumbPage";

/**
 * Visual separator between breadcrumb items.
 * Defaults to chevron icon but supports custom separators.
 * Hidden from screen readers with aria-hidden attribute.
 *
 * @component
 * @param {Object} props - Component props
 * @param {React.ReactNode} [props.children] - Custom separator content (defaults to ChevronRight icon)
 * @param {string} [props.className] - Additional CSS classes to apply
 *
 * @example
 * ```tsx
 * <BreadcrumbSeparator>
 *   <SlashIcon className="h-4 w-4" />
 * </BreadcrumbSeparator>
 * ```
 */
const BreadcrumbSeparator = ({
  children,
  className,
  ...props
}: React.ComponentProps<"li">) => (
  <li
    role="presentation"
    aria-hidden="true"
    className={cn("[&>svg]:size-3.5", className)}
    {...props}
  >
    {children ?? <ChevronRight />}
  </li>
);
BreadcrumbSeparator.displayName = "BreadcrumbSeparator";

/**
 * Ellipsis indicator for collapsed breadcrumb items.
 * Shows three dots icon to indicate truncated navigation path.
 * Useful for long breadcrumb trails to maintain compact layout.
 * Hidden from screen readers with aria-hidden attribute.
 *
 * @component
 * @param {Object} props - Component props
 * @param {string} [props.className] - Additional CSS classes to apply
 */
const BreadcrumbEllipsis = ({
  className,
  ...props
}: React.ComponentProps<"span">) => (
  <span
    role="presentation"
    aria-hidden="true"
    className={cn("flex h-9 w-9 items-center justify-center", className)}
    {...props}
  >
    <MoreHorizontal className="h-4 w-4" />
    <span className="sr-only">More</span>
  </span>
);
BreadcrumbEllipsis.displayName = "BreadcrumbEllipsis";

export {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
};
