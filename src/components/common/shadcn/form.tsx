import * as LabelPrimitive from "@radix-ui/react-label";
import { Slot } from "@radix-ui/react-slot";
import * as React from "react";
import {
  Controller,
  ControllerProps,
  FieldPath,
  FieldValues,
  FormProvider,
  useFormContext,
} from "react-hook-form";

import { cn } from "../../../utils/classNames";
import { Label } from "./label";

/**
 * Root form component that provides form context to child components.
 * Re-exports FormProvider from react-hook-form.
 *
 * @component
 */
const Form = FormProvider;

/**
 * Context value type for form field state.
 *
 * @template TFieldValues - Form values type
 * @template TName - Field name path type
 */
type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName;
};

/**
 * Internal context for managing form field state.
 */
const FormFieldContext = React.createContext<FormFieldContextValue>(
  {} as FormFieldContextValue,
);

/**
 * Wrapper for react-hook-form Controller that provides field context.
 * Manages controlled form inputs with validation and state.
 *
 * @template TFieldValues - Form values type
 * @template TName - Field name path type
 * @param {ControllerProps<TFieldValues, TName>} props - Controller props from react-hook-form
 *
 * @example
 * ```tsx
 * <FormField
 *   control={form.control}
 *   name="email"
 *   render={({ field }) => (
 *     <FormItem>
 *       <FormLabel>Email</FormLabel>
 *       <FormControl>
 *         <Input {...field} />
 *       </FormControl>
 *     </FormItem>
 *   )}
 * />
 * ```
 */
const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  );
};

/**
 * Hook to access form field state and metadata.
 * Must be used within a FormField component.
 *
 * @returns {Object} Form field state including id, name, error state, and ARIA attributes
 * @throws {Error} When used outside of FormField context
 *
 * @example
 * ```tsx
 * const { error, formItemId } = useFormField();
 * ```
 */
const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext);
  const itemContext = React.useContext(FormItemContext);
  const { getFieldState, formState } = useFormContext();

  const fieldState = getFieldState(fieldContext.name, formState);

  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>");
  }

  const { id } = itemContext;

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  };
};

/**
 * Context value type for form item container.
 */
type FormItemContextValue = {
  id: string;
};

/**
 * Internal context for managing form item IDs.
 */
const FormItemContext = React.createContext<FormItemContextValue>(
  {} as FormItemContextValue,
);

/**
 * Container for a single form field including label, control, and messages.
 * Provides unique IDs for accessibility and manages spacing.
 *
 * @component
 * @param {string} [className] - Additional CSS classes to apply
 * @param {React.Ref} ref - Forwarded ref to the container div
 *
 * @example
 * ```tsx
 * <FormItem>
 *   <FormLabel>Username</FormLabel>
 *   <FormControl>
 *     <Input />
 *   </FormControl>
 *   <FormDescription>Your public display name.</FormDescription>
 *   <FormMessage />
 * </FormItem>
 * ```
 */
const FormItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const id = React.useId();

  return (
    <FormItemContext.Provider value={{ id }}>
      <div ref={ref} className={cn("space-y-2", className)} {...props} />
    </FormItemContext.Provider>
  );
});
FormItem.displayName = "FormItem";

/**
 * Label component for form fields with error state styling.
 * Automatically associates with the form control via htmlFor.
 *
 * @component
 * @param {string} [className] - Additional CSS classes to apply
 * @param {React.Ref} ref - Forwarded ref to the label element
 *
 * @example
 * ```tsx
 * <FormLabel>Email Address</FormLabel>
 * ```
 */
const FormLabel = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ className, ...props }, ref) => {
  const { error, formItemId } = useFormField();

  return (
    <Label
      ref={ref}
      className={cn(error && "text-errorBg", className)}
      htmlFor={formItemId}
      {...props}
    />
  );
});
FormLabel.displayName = "FormLabel";

/**
 * Wrapper for form control elements (inputs, selects, etc.).
 * Provides proper ARIA attributes for accessibility and error states.
 *
 * @component
 * @param {React.Ref} ref - Forwarded ref to the control element
 *
 * @example
 * ```tsx
 * <FormControl>
 *   <Input type="email" />
 * </FormControl>
 * ```
 */
const FormControl = React.forwardRef<
  React.ElementRef<typeof Slot>,
  React.ComponentPropsWithoutRef<typeof Slot>
>(({ ...props }, ref) => {
  const { error, formItemId, formDescriptionId, formMessageId } =
    useFormField();

  return (
    <Slot
      ref={ref}
      id={formItemId}
      aria-describedby={
        !error
          ? `${formDescriptionId}`
          : `${formDescriptionId} ${formMessageId}`
      }
      aria-invalid={!!error}
      {...props}
    />
  );
});
FormControl.displayName = "FormControl";

/**
 * Descriptive text for form fields providing additional context or instructions.
 * Linked to the form control via ARIA attributes.
 *
 * @component
 * @param {string} [className] - Additional CSS classes to apply
 * @param {React.Ref} ref - Forwarded ref to the paragraph element
 *
 * @example
 * ```tsx
 * <FormDescription>
 *   We'll never share your email with anyone else.
 * </FormDescription>
 * ```
 */
const FormDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  const { formDescriptionId } = useFormField();

  return (
    <p
      ref={ref}
      id={formDescriptionId}
      className={cn("text-sm text-secondaryText", className)}
      {...props}
    />
  );
});
FormDescription.displayName = "FormDescription";

/**
 * Displays validation error messages for form fields.
 * Automatically shows error message from form state or custom children.
 * Only renders when there is an error or children content.
 *
 * @component
 * @param {string} [className] - Additional CSS classes to apply
 * @param {React.ReactNode} [children] - Custom error message content
 * @param {React.Ref} ref - Forwarded ref to the paragraph element
 *
 * @example
 * ```tsx
 * <FormMessage />
 * ```
 */
const FormMessage = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => {
  const { error, formMessageId } = useFormField();
  const body = error ? String(error?.message) : children;

  if (!body) {
    return null;
  }

  return (
    <p
      ref={ref}
      id={formMessageId}
      className={cn("text-sm font-medium text-errorBg", className)}
      {...props}
    />
  );
});
FormMessage.displayName = "FormMessage";

export {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  useFormField,
};
