import { type DialogProps } from "@radix-ui/react-dialog";
import { Command as CommandPrimitive } from "cmdk";
import { Search } from "lucide-react";
import * as React from "react";

import { cn } from "../../../utils/classNames";
import { Dialog, DialogContent } from "./dialog";

/**
 * Root command menu component for searchable command palette interfaces.
 * Built on cmdk library with keyboard navigation and filtering.
 *
 * @component
 * @param {string} [className] - Additional CSS classes to apply
 * @param {React.Ref} ref - Forwarded ref to the command element
 */
const Command = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive>
>(({ className, ...props }, ref) => (
  <CommandPrimitive
    ref={ref}
    className={cn(
      "flex h-full w-full flex-col overflow-hidden rounded-md bg-dropdownBg text-primaryText",
      className,
    )}
    {...props}
  />
));
Command.displayName = CommandPrimitive.displayName;

interface CommandDialogProps extends DialogProps {}

/**
 * Command palette displayed in a modal dialog.
 * Combines Command with Dialog for quick access interfaces.
 *
 * @component
 * @param {React.ReactNode} children - Command menu content
 *
 * @example
 * ```tsx
 * <CommandDialog open={open} onOpenChange={setOpen}>
 *   <CommandInput placeholder="Search..." />
 *   <CommandList>
 *     <CommandGroup heading="Suggestions">
 *       <CommandItem>Item 1</CommandItem>
 *     </CommandGroup>
 *   </CommandList>
 * </CommandDialog>
 * ```
 */
const CommandDialog = ({ children, ...props }: CommandDialogProps) => {
  return (
    <Dialog {...props}>
      <DialogContent className="overflow-hidden p-0 shadow-lg">
        <Command className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-secondaryText [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5">
          {children}
        </Command>
      </DialogContent>
    </Dialog>
  );
};

/**
 * Search input for filtering command menu items.
 * Includes search icon and real-time filtering.
 *
 * @component
 * @param {string} [className] - Additional CSS classes to apply
 * @param {React.Ref} ref - Forwarded ref to the input element
 */
const CommandInput = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Input>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input>
>(({ className, ...props }, ref) => (
  <div
    className="flex items-center border-b border-inputBorder px-3"
    cmdk-input-wrapper=""
  >
    <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
    <CommandPrimitive.Input
      ref={ref}
      className={cn(
        "flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-secondaryText disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  </div>
));

CommandInput.displayName = CommandPrimitive.Input.displayName;

/**
 * Scrollable list container for command items.
 *
 * @component
 * @param {string} [className] - Additional CSS classes to apply
 * @param {React.Ref} ref - Forwarded ref to the list element
 */
const CommandList = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.List>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.List
    ref={ref}
    className={cn("max-h-75 overflow-y-auto overflow-x-hidden", className)}
    {...props}
  />
));

CommandList.displayName = CommandPrimitive.List.displayName;

/**
 * Empty state message displayed when no items match the search.
 *
 * @component
 * @param {React.Ref} ref - Forwarded ref to the empty element
 */
const CommandEmpty = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Empty>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Empty>
>((props, ref) => (
  <CommandPrimitive.Empty
    ref={ref}
    className="py-6 text-center text-sm"
    {...props}
  />
));

CommandEmpty.displayName = CommandPrimitive.Empty.displayName;

/**
 * Group container for related command items with optional heading.
 *
 * @component
 * @param {string} [className] - Additional CSS classes to apply
 * @param {React.Ref} ref - Forwarded ref to the group element
 */
const CommandGroup = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Group>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Group>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Group
    ref={ref}
    className={cn(
      "overflow-hidden p-1 text-primaryText [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-secondaryText",
      className,
    )}
    {...props}
  />
));

CommandGroup.displayName = CommandPrimitive.Group.displayName;

/**
 * Visual separator between command groups.
 *
 * @component
 * @param {string} [className] - Additional CSS classes to apply
 * @param {React.Ref} ref - Forwarded ref to the separator element
 */
const CommandSeparator = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 h-px bg-inputBorder", className)}
    {...props}
  />
));
CommandSeparator.displayName = CommandPrimitive.Separator.displayName;

/**
 * Individual selectable item in the command menu.
 * Supports keyboard navigation and selection.
 *
 * @component
 * @param {string} [className] - Additional CSS classes to apply
 * @param {React.Ref} ref - Forwarded ref to the item element
 */
const CommandItem = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Item>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none aria-selected:bg-dropdownBgHover aria-selected:text-primaryText data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50",
      className,
    )}
    {...props}
  />
));

CommandItem.displayName = CommandPrimitive.Item.displayName;

/**
 * Keyboard shortcut indicator displayed at the right edge of command items.
 *
 * @component
 * @param {string} [className] - Additional CSS classes to apply
 *
 * @example
 * ```tsx
 * <CommandItem>
 *   New File
 *   <CommandShortcut>⌘N</CommandShortcut>
 * </CommandItem>
 * ```
 */
const CommandShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn(
        "ml-auto text-xs tracking-widest text-secondaryText",
        className,
      )}
      {...props}
    />
  );
};
CommandShortcut.displayName = "CommandShortcut";

export {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
};
