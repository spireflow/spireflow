"use client";

import * as React from "react";
import { Drawer as DrawerPrimitive } from "vaul";

import { cn } from "@/utils/classNames";

/**
 * Root drawer component that manages drawer state and behavior.
 * Built on Vaul library with support for multiple directions.
 *
 * @component
 * @example
 * ```tsx
 * <Drawer direction="bottom">
 *   <DrawerTrigger>Open</DrawerTrigger>
 *   <DrawerContent>
 *     <DrawerHeader>
 *       <DrawerTitle>Title</DrawerTitle>
 *     </DrawerHeader>
 *   </DrawerContent>
 * </Drawer>
 * ```
 */
const Drawer = ({
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Root>) => {
  return <DrawerPrimitive.Root data-slot="drawer" {...props} />;
};

/**
 * Trigger button that opens the drawer when clicked.
 *
 * @component
 */
const DrawerTrigger = ({
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Trigger>) => {
  return (
    <DrawerPrimitive.Trigger
      data-slot="drawer-trigger"
      tabIndex={0}
      {...props}
    />
  );
};

/**
 * Portal container that renders drawer content outside the DOM hierarchy.
 *
 * @component
 */
const DrawerPortal = ({
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Portal>) => {
  return <DrawerPrimitive.Portal data-slot="drawer-portal" {...props} />;
};

/**
 * Button to close the drawer.
 *
 * @component
 */
const DrawerClose = ({
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Close>) => {
  return (
    <DrawerPrimitive.Close data-slot="drawer-close" tabIndex={0} {...props} />
  );
};

/**
 * Semi-transparent backdrop overlay behind the drawer.
 * Clicking it closes the drawer.
 *
 * @component
 * @param {string} [className] - Additional CSS classes to apply
 */
const DrawerOverlay = ({
  className,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Overlay>) => {
  return (
    <DrawerPrimitive.Overlay
      data-slot="drawer-overlay"
      className={cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
        className,
      )}
      {...props}
    />
  );
};

/**
 * Main drawer content container with directional animations.
 * Supports top, bottom, left, and right drawer directions.
 *
 * @component
 * @param {string} [className] - Additional CSS classes to apply
 * @param {React.ReactNode} children - Drawer content
 */
const DrawerContent = ({
  className,
  children,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Content>) => {
  return (
    <DrawerPortal data-slot="drawer-portal">
      <DrawerOverlay />
      <DrawerPrimitive.Content
        data-slot="drawer-content"
        className={cn(
          "group/drawer-content bg-modalBg fixed z-50 flex h-auto flex-col border-inputBorder",
          "data-[vaul-drawer-direction=top]:inset-x-0 data-[vaul-drawer-direction=top]:top-0 data-[vaul-drawer-direction=top]:mb-24 data-[vaul-drawer-direction=top]:max-h-[80vh] data-[vaul-drawer-direction=top]:rounded-b-lg data-[vaul-drawer-direction=top]:border-b",
          "data-[vaul-drawer-direction=bottom]:inset-x-0 data-[vaul-drawer-direction=bottom]:bottom-0 data-[vaul-drawer-direction=bottom]:mt-24 data-[vaul-drawer-direction=bottom]:max-h-[80vh] data-[vaul-drawer-direction=bottom]:rounded-t-lg data-[vaul-drawer-direction=bottom]:border-t",
          "data-[vaul-drawer-direction=right]:inset-y-0 data-[vaul-drawer-direction=right]:right-0 data-[vaul-drawer-direction=right]:w-3/4 data-[vaul-drawer-direction=right]:border-l data-[vaul-drawer-direction=right]:sm:max-w-sm",
          "data-[vaul-drawer-direction=left]:inset-y-0 data-[vaul-drawer-direction=left]:left-0 data-[vaul-drawer-direction=left]:w-3/4 data-[vaul-drawer-direction=left]:border-r data-[vaul-drawer-direction=left]:sm:max-w-sm",
          className,
        )}
        {...props}
      >
        <div className="bg-inputBorder mx-auto mt-4 hidden h-2 w-25 shrink-0 rounded-full group-data-[vaul-drawer-direction=bottom]/drawer-content:block" />
        {children}
      </DrawerPrimitive.Content>
    </DrawerPortal>
  );
};

/**
 * Header section for drawer title and description.
 *
 * @component
 * @param {string} [className] - Additional CSS classes to apply
 */
const DrawerHeader = ({ className, ...props }: React.ComponentProps<"div">) => {
  return (
    <div
      data-slot="drawer-header"
      className={cn(
        "flex flex-col gap-0.5 p-4 group-data-[vaul-drawer-direction=bottom]/drawer-content:text-center group-data-[vaul-drawer-direction=top]/drawer-content:text-center md:gap-1.5 md:text-left",
        className,
      )}
      {...props}
    />
  );
};

/**
 * Footer section typically containing action buttons.
 *
 * @component
 * @param {string} [className] - Additional CSS classes to apply
 */
const DrawerFooter = ({ className, ...props }: React.ComponentProps<"div">) => {
  return (
    <div
      data-slot="drawer-footer"
      className={cn("mt-auto flex flex-col gap-2 p-4", className)}
      {...props}
    />
  );
};

/**
 * Title heading for the drawer.
 *
 * @component
 * @param {string} [className] - Additional CSS classes to apply
 */
const DrawerTitle = ({
  className,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Title>) => {
  return (
    <DrawerPrimitive.Title
      data-slot="drawer-title"
      className={cn("text-primaryText font-semibold text-lg", className)}
      {...props}
    />
  );
};

/**
 * Descriptive text providing context for the drawer.
 *
 * @component
 * @param {string} [className] - Additional CSS classes to apply
 */
const DrawerDescription = ({
  className,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Description>) => {
  return (
    <DrawerPrimitive.Description
      data-slot="drawer-description"
      className={cn("text-secondaryText text-sm", className)}
      {...props}
    />
  );
};

export {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerPortal,
  DrawerTitle,
  DrawerTrigger,
};
