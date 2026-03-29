import * as DialogPrimitive from "@radix-ui/react-dialog";
import * as React from "react";

import { CloseIcon } from "@/assets/icons/CloseIcon";
import { cn } from "@/utils/classNames";

/**
 * Root dialog component that manages modal state.
 * Built on Radix UI Dialog primitive with accessibility support.
 *
 * @component
 * @example
 * ```tsx
 * <Dialog open={open} onOpenChange={setOpen}>
 *   <DialogTrigger>Open Dialog</DialogTrigger>
 *   <DialogContent>
 *     <DialogHeader>
 *       <DialogTitle>Title</DialogTitle>
 *     </DialogHeader>
 *   </DialogContent>
 * </Dialog>
 * ```
 */
const Dialog = DialogPrimitive.Root;

/**
 * Button that opens the dialog when clicked.
 *
 * @component
 */
const DialogTrigger = DialogPrimitive.Trigger;

/**
 * Portal container for rendering dialog content outside the DOM hierarchy.
 *
 * @component
 */
const DialogPortal = DialogPrimitive.Portal;

/**
 * Button to close the dialog programmatically.
 *
 * @component
 */
const DialogClose = DialogPrimitive.Close;

/**
 * Semi-transparent backdrop overlay behind the dialog.
 * Clicking it closes the dialog by default.
 *
 * @component
 * @param {string} [className] - Additional CSS classes to apply
 * @param {React.Ref} ref - Forwarded ref to the overlay element
 */
const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 max-md:duration-0",
      className,
    )}
    {...props}
  />
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

/**
 * Main dialog content container with animations and close button.
 * Centered on screen with backdrop and smooth fade/zoom transitions.
 *
 * @component
 * @param {string} [className] - Additional CSS classes to apply
 * @param {React.ReactNode} children - Dialog content
 * @param {React.Ref} ref - Forwarded ref to the content element
 *
 * @example
 * ```tsx
 * <DialogContent>
 *   <DialogHeader>
 *     <DialogTitle>Confirm Action</DialogTitle>
 *     <DialogDescription>Are you sure?</DialogDescription>
 *   </DialogHeader>
 * </DialogContent>
 * ```
 */
const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, onOpenAutoFocus, ...props }, ref) => {
  const localRef = React.useRef<HTMLDivElement>(null);

  const handleOpenAutoFocus = (e: Event) => {
    if (onOpenAutoFocus) {
      onOpenAutoFocus(e);
      return;
    }
    e.preventDefault();
    localRef.current?.focus();
  };

  return (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Content
        ref={(node: HTMLDivElement | null) => {
          localRef.current = node;
          if (typeof ref === "function") ref(node);
          else if (ref) ref.current = node;
        }}
        tabIndex={-1}
        className={cn(
          "fixed left-[50%] top-[50%] z-50 grid w-dvw h-dvh md:w-auto md:h-auto translate-x-[-50%] translate-y-[-50%] gap-2 md:border md:border-inputBorder bg-loginModalBg shadow-xl px-[6vw] xsm:px-[18vw] sm:px-12 pt-24 sm:pt-12 pb-12 duration-200 max-md:duration-0 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 will-change-transform md:rounded-2xl focus:outline-none focus-visible:outline-none",
          className,
        )}
        onOpenAutoFocus={handleOpenAutoFocus}
        {...props}
      >
        {children}
        <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm text-xl transition-opacity hover:opacity-100 disabled:pointer-events-none fill-secondaryText stroke-secondaryText hover:stroke-secondaryTextHover hover:fill-secondaryTextHover">
          <CloseIcon />
          <span className="sr-only">Close</span>
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPortal>
  );
});
DialogContent.displayName = DialogPrimitive.Content.displayName;

/**
 * Header section for dialog title and description.
 *
 * @component
 * @param {string} [className] - Additional CSS classes to apply
 */
const DialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col space-y-1 text-center sm:text-left",
      className,
    )}
    {...props}
  />
);
DialogHeader.displayName = "DialogHeader";

/**
 * Footer section typically containing action buttons.
 *
 * @component
 * @param {string} [className] - Additional CSS classes to apply
 * @param {('default'|'centered')} [footerVariant='default'] - Layout variant for footer buttons
 */
const DialogFooter = ({
  className,
  footerVariant = "default",
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  footerVariant?: "default" | "centered";
}) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:space-x-4 mt-8 [&>button]:min-w-28 [&>a]:min-w-28",
      footerVariant === "centered"
        ? "sm:justify-center [&>*]:max-w-40"
        : "sm:justify-end [&>button]:px-6",
      className,
    )}
    {...props}
  />
);
DialogFooter.displayName = "DialogFooter";

/**
 * Title heading for the dialog.
 *
 * @component
 * @param {string} [className] - Additional CSS classes to apply
 * @param {React.Ref} ref - Forwarded ref to the title element
 */
const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight text-primaryText mb-4",
      className,
    )}
    {...props}
  />
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;

/**
 * Descriptive text providing context for the dialog.
 *
 * @component
 * @param {string} [className] - Additional CSS classes to apply
 * @param {React.Ref} ref - Forwarded ref to the description element
 */
const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("text-base text-primaryText", className)}
    {...props}
  />
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
};
