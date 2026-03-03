import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "../../../utils/classNames";

/**
 * Style variants configuration for Alert component.
 * Defines visual styles using class-variance-authority.
 *
 * @property {Object} variants.variant - Available alert variants
 * @property {string} variants.variant.default - Standard informational alert
 * @property {string} variants.variant.destructive - Error or critical warning alert
 */
const alertVariants = cva(
  "relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground",
  {
    variants: {
      variant: {
        default: "bg-background text-primaryText border-inputBorder",
        destructive:
          "border-destructiveAlertBorder text-destructiveAlertText [&>svg]:text-destructiveAlertIcon bg-destructiveAlertBg",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

/**
 * Alert notification container for displaying important messages and notifications.
 * Supports optional icons and multiple visual variants for different message types.
 * Built with proper ARIA attributes for accessibility.
 *
 * @component
 * @param {string} [className] - Additional CSS classes to apply
 * @param {('default'|'destructive')} [variant='default'] - Visual style variant
 * @param {React.ReactNode} children - Alert content including title and description
 * @param {React.Ref} ref - Forwarded ref to the alert container
 *
 * @example
 * ```tsx
 * <Alert>
 *   <AlertTitle>Heads up!</AlertTitle>
 *   <AlertDescription>
 *     You can add components to your app using the CLI.
 *   </AlertDescription>
 * </Alert>
 * ```
 */
const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, variant, ...props }, ref) => (
  <div
    ref={ref}
    role="alert"
    className={cn(alertVariants({ variant }), className)}
    {...props}
  />
));
Alert.displayName = "Alert";

/**
 * Title heading for the alert notification.
 * Provides a prominent header for the alert message.
 *
 * @component
 * @param {string} [className] - Additional CSS classes to apply
 * @param {React.ReactNode} children - Title text content
 * @param {React.Ref} ref - Forwarded ref to the heading element
 *
 * @example
 * ```tsx
 * <AlertTitle>Payment Successful</AlertTitle>
 * <AlertTitle className="text-lg">Important Notice</AlertTitle>
 * ```
 */
const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn("mb-1 font-medium leading-none tracking-tight", className)}
    {...props}
  />
));
AlertTitle.displayName = "AlertTitle";

/**
 * Description text content for the alert notification.
 * Provides detailed information about the alert message.
 * Supports paragraph formatting and rich text content.
 *
 * @component
 * @param {string} [className] - Additional CSS classes to apply
 * @param {React.ReactNode} children - Description content (can include paragraphs, links, etc.)
 * @param {React.Ref} ref - Forwarded ref to the description container
 *
 * @example
 * ```tsx
 * <AlertDescription>
 *   Your changes have been saved successfully.
 * </AlertDescription>
 * ```
 */
const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm [&_p]:leading-relaxed", className)}
    {...props}
  />
));
AlertDescription.displayName = "AlertDescription";

export { Alert, AlertDescription, AlertTitle };
