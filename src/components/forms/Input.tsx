import React, { ReactNode, forwardRef } from "react";

interface InputProps {
  icon?: ReactNode;
  type: string;
  placeholder?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onInput?: (event: React.FormEvent<HTMLInputElement>) => void;
  id?: string;
  name?: string;
  className?: string;
  autoComplete?: string;
  ariaLabel?: string;
  maxLength?: number;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      icon,
      type,
      placeholder,
      value,
      onChange,
      onInput,
      id,
      name,
      className,
      autoComplete,
      ariaLabel,
      maxLength,
    },
    ref
  ) => {
    return (
      <div className="relative w-full h-full">
        <div className="absolute stroke-grayIcon fill-grayIcon top-[0.5rem] xl:top-[0.55rem] 2xl:top-[0.65rem] left-3">
          {icon}
        </div>
        <input
          className={`p-2 text-sm 3xl:text-base bg-inputBg hover:bg-inputBgHover w-full h-full border rounded-md border-inputBorder text-primaryText placeholder-secondaryText  hover:border-inputBorderHover transition
        ${icon ? "pl-11" : "pl-3"}  
        ${className}   
        autofill:!bg-inputBg
        shadow-none
        `}
          ref={ref}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange || (() => {})}
          onInput={onInput}
          id={id}
          name={name}
          autoComplete={autoComplete}
          aria-label={ariaLabel || placeholder}
          maxLength={maxLength}
        />
      </div>
    );
  }
);
