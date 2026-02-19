import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../../../lib/utils";
import { buttonVariants } from "./button";

interface InputGroupContextValue {
  hasLeftAddon: boolean;
  hasRightAddon: boolean;
}

const InputGroupContext = React.createContext<InputGroupContextValue>({
  hasLeftAddon: false,
  hasRightAddon: false,
});

/**
 * Container component for inputs with addons like icons, buttons, or text.
 * Automatically detects addon positions and adjusts input padding accordingly.
 *
 * @component
 * @param {string} [className] - Additional CSS classes to apply
 * @param {React.ReactNode} children - InputGroupInput and InputGroupAddon components
 * @param {React.Ref} ref - Forwarded ref to the container element
 *
 * @example
 * ```tsx
 * <InputGroup>
 *   <InputGroupAddon align="inline-start">
 *     <SearchIcon />
 *   </InputGroupAddon>
 *   <InputGroupInput placeholder="Search..." />
 * </InputGroup>
 * ```
 */
const InputGroup = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  const childrenArray = React.Children.toArray(children);

  const checkAddonAlignment = (alignValue: string | undefined, targetAlign: string) => {
    if (targetAlign === "inline-start") {
      return !alignValue || alignValue === "inline-start";
    }
    return alignValue === targetAlign;
  };

  const hasLeftAddon = childrenArray.some((child) => {
    if (React.isValidElement(child)) {
      const childType = child.type as { displayName?: string };
      if (childType.displayName === "InputGroupAddon") {
        const addonProps = child.props as { align?: string };
        return checkAddonAlignment(addonProps.align, "inline-start");
      }
    }
    return false;
  });

  const hasRightAddon = childrenArray.some((child) => {
    if (React.isValidElement(child)) {
      const childType = child.type as { displayName?: string };
      if (childType.displayName === "InputGroupAddon") {
        const addonProps = child.props as { align?: string };
        return checkAddonAlignment(addonProps.align, "inline-end");
      }
    }
    return false;
  });

  return (
    <InputGroupContext.Provider value={{ hasLeftAddon, hasRightAddon }}>
      <div
        ref={ref}
        className={cn(
          "relative flex min-w-0 items-stretch rounded-md has-[:disabled]:opacity-50",
          className
        )}
        {...props}
      >
        {children}
      </div>
    </InputGroupContext.Provider>
  );
});
InputGroup.displayName = "InputGroup";

/**
 * Style variants configuration for the InputGroupAddon component.
 * Defines positioning based on alignment using class-variance-authority.
 */
const inputGroupAddonVariants = cva(
  "pointer-events-none absolute z-10 top-1/2 -translate-y-[calc(50%+0.1rem)] flex items-center justify-center gap-1 stroke-grayIcon fill-grayIcon [&>svg]:shrink-0",
  {
    variants: {
      align: {
        "inline-start": "left-0 pl-3",
        "inline-end": "right-0 pr-3",
        "block-start": "left-0 top-0 translate-y-0 w-full px-3 pt-3",
        "block-end": "bottom-0 top-auto translate-y-0 left-0 w-full px-3 pb-3",
      },
    },
    defaultVariants: {
      align: "inline-start",
    },
  }
);

interface InputGroupAddonProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof inputGroupAddonVariants> {}

/**
 * Container for icons, buttons, or text positioned alongside the input.
 * Supports four alignment positions for flexible addon placement.
 *
 * @component
 * @param {string} [className] - Additional CSS classes to apply
 * @param {('inline-start'|'inline-end'|'block-start'|'block-end')} [align='inline-start'] - Position of the addon
 * @param {React.Ref} ref - Forwarded ref to the addon element
 *
 * @example
 * ```tsx
 * <InputGroupAddon align="inline-end">
 *   <InputGroupButton><EyeIcon /></InputGroupButton>
 * </InputGroupAddon>
 * ```
 */
const InputGroupAddon = React.forwardRef<HTMLDivElement, InputGroupAddonProps>(
  ({ className, align, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(inputGroupAddonVariants({ align }), className)}
        {...props}
      />
    );
  }
);
InputGroupAddon.displayName = "InputGroupAddon";

/**
 * Style variants configuration for the InputGroupButton component.
 * Defines button sizes using class-variance-authority.
 */
const inputGroupButtonVariants = cva("", {
  variants: {
    size: {
      xs: "h-6 px-2 text-xs",
      "icon-xs": "size-6 p-0",
      sm: "h-8 px-3 text-xs",
      "icon-sm": "size-8 p-0",
    },
  },
  defaultVariants: {
    size: "xs",
  },
});

interface InputGroupButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "xs" | "icon-xs" | "sm" | "icon-sm";
}

/**
 * Interactive button component for use within InputGroupAddon.
 * Inherits button styling with sizes optimized for input groups.
 *
 * @component
 * @param {string} [className] - Additional CSS classes to apply
 * @param {('default'|'destructive'|'outline'|'secondary'|'ghost'|'link')} [variant='ghost'] - Button style variant
 * @param {('xs'|'icon-xs'|'sm'|'icon-sm')} [size='xs'] - Button size variant
 * @param {React.Ref} ref - Forwarded ref to the button element
 *
 * @example
 * ```tsx
 * <InputGroupAddon align="inline-end">
 *   <InputGroupButton onClick={toggleVisibility}>
 *     <EyeIcon />
 *   </InputGroupButton>
 * </InputGroupAddon>
 * ```
 */
const InputGroupButton = React.forwardRef<
  HTMLButtonElement,
  InputGroupButtonProps
>(
  (
    {
      className,
      variant = "ghost",
      size = "xs",
      type = "button",
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        type={type}
        className={cn(
          buttonVariants({ variant, size: "default" }),
          inputGroupButtonVariants({ size }),
          "pointer-events-auto text-grayIcon stroke-grayIcon",
          className
        )}
        {...props}
      />
    );
  }
);
InputGroupButton.displayName = "InputGroupButton";

/**
 * Text display component for non-interactive content within InputGroupAddon.
 * Useful for displaying units, prefixes, or static labels.
 *
 * @component
 * @param {string} [className] - Additional CSS classes to apply
 * @param {React.Ref} ref - Forwarded ref to the text container element
 *
 * @example
 * ```tsx
 * <InputGroupAddon align="inline-end">
 *   <InputGroupText>USD</InputGroupText>
 * </InputGroupAddon>
 * ```
 */
const InputGroupText = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "pointer-events-auto flex h-6 items-center text-xs text-secondaryText",
        className
      )}
      {...props}
    />
  );
});
InputGroupText.displayName = "InputGroupText";

/**
 * Style variants configuration for the InputGroupInput component.
 * Defines visual styles and heights using class-variance-authority.
 */
const inputGroupInputVariants = cva(
  "flex w-full rounded-md border text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-placeholderText focus-visible:!outline-none disabled:cursor-not-allowed disabled:opacity-50 transition px-3",
  {
    variants: {
      variant: {
        default: "h-[2.3rem] 3xl:h-[2.6rem] py-2 bg-inputBg hover:bg-inputBgHover border-inputBorder hover:border-inputBorderHover focus:border-inputBorderFocus",
        navbarSearch: "h-[2.2rem] 3xl:h-[2.5rem] py-0 items-center bg-navbarSearchInputBg hover:bg-navbarSearchInputBgHover border-navbarSearchInputBorder hover:border-navbarSearchInputBorderHover focus:border-inputBorderFocus",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

interface InputGroupInputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputGroupInputVariants> {
  fixedHeight?: boolean;
}

/**
 * Input element designed for use within InputGroup.
 * Automatically adjusts padding based on detected addons.
 *
 * @component
 * @param {string} [className] - Additional CSS classes to apply
 * @param {string} [type] - HTML input type attribute
 * @param {('default'|'navbarSearch')} [variant='default'] - Visual style variant
 * @param {React.Ref} ref - Forwarded ref to the input element
 *
 * @example
 * ```tsx
 * <InputGroup>
 *   <InputGroupAddon><SearchIcon /></InputGroupAddon>
 *   <InputGroupInput type="text" placeholder="Search..." variant="default" />
 * </InputGroup>
 * ```
 */
const InputGroupInput = React.forwardRef<
  HTMLInputElement,
  InputGroupInputProps
>(({ className, type, variant, fixedHeight, ...props }, ref) => {
  const { hasLeftAddon, hasRightAddon } = React.useContext(InputGroupContext);

  return (
    <input
      type={type}
      className={cn(
        inputGroupInputVariants({ variant }),
        fixedHeight && (variant === "navbarSearch" ? "h-[2.5rem]" : "h-[2.6rem]"),
        hasLeftAddon && "pl-11",
        hasRightAddon && "pr-11",
        className
      )}
      ref={ref}
      data-slot="input-group-control"
      {...props}
    />
  );
});
InputGroupInput.displayName = "InputGroupInput";

interface InputGroupTextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

/**
 * Textarea element designed for use within InputGroup.
 * Supports multi-line text input with consistent styling.
 *
 * @component
 * @param {string} [className] - Additional CSS classes to apply
 * @param {React.Ref} ref - Forwarded ref to the textarea element
 *
 * @example
 * ```tsx
 * <InputGroup>
 *   <InputGroupAddon align="block-start">
 *     <span>Description</span>
 *   </InputGroupAddon>
 *   <InputGroupTextarea placeholder="Enter description..." />
 * </InputGroup>
 * ```
 */
const InputGroupTextarea = React.forwardRef<
  HTMLTextAreaElement,
  InputGroupTextareaProps
>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex min-h-[80px] w-full rounded-md border border-inputBorder bg-inputBg px-3 py-2 text-sm transition placeholder:text-placeholderText hover:bg-inputBgHover hover:border-inputBorderHover focus:border-inputBorderFocus focus-visible:!outline-none disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      ref={ref}
      data-slot="input-group-control"
      {...props}
    />
  );
});
InputGroupTextarea.displayName = "InputGroupTextarea";

export {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
};
