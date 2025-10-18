import React, {
  ChangeEvent,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";

import { useClickOutside } from "../../hooks/useClickOutside";
import { ArrowDownSimpleIcon } from "../../assets/icons/ArrowDownSimpleIcon";
import { ArrowUpSimpleIcon } from "../../assets/icons/ArrowUpSimpleIcon";
import { CheckIcon } from "../../assets/icons/CheckIcon";

interface SelectProps {
  value?: string | number;
  onChange?: (e: ChangeEvent<HTMLSelectElement>) => void;
  placeholder?: string;
  children?: ReactNode;
  customOnDesktop?: boolean;
  customOptions?: string[];
  direction?: "top" | "bottom";
  isBottomPlaceholderVisible?: boolean;
  enableOptionsDropdownScroll?: boolean;
  ariaLabel?: string;
  compact?: boolean; // New prop for compact size
}

export const Select = ({
  value,
  onChange,
  placeholder,
  customOptions,
  direction = "bottom",
  isBottomPlaceholderVisible = false,
  enableOptionsDropdownScroll = false,
  ariaLabel,
  compact = false,
}: SelectProps) => {
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState<string | number>(
    value ?? ""
  );
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSelectedValue(value ?? "");
  }, [value]);

  const handleCustomChange = (newValue: string) => {
    setSelectedValue(newValue);
    if (onChange) {
      onChange({
        target: { value: newValue },
      } as ChangeEvent<HTMLSelectElement>);
    }
    setIsSelectOpen(false);
  };

  useClickOutside(dropdownRef, () => setIsSelectOpen(false));

  const clearSelection = () => {
    setSelectedValue("");
    if (onChange) {
      onChange({
        target: { value: "" },
      } as ChangeEvent<HTMLSelectElement>);
    }
    setIsSelectOpen(false);
  };

  return (
    <>
      <div className={`relative `} ref={dropdownRef}>
        <div
          className={`rounded-md w-full cursor-pointer border border-mainBorder bg-selectBg text-primaryText placeholder-secondaryText hover:!border-inputBorderHover hover:bg-inputBgHover hover:bg-selectBgHover ${
            compact ? "text-xs p-1.5 pl-2.5 pr-2.5" : "text-sm 3xl:text-base p-2 pl-3 pr-3"
          }`}
          onClick={() => setIsSelectOpen(!isSelectOpen)}
          aria-expanded={isSelectOpen}
          aria-label={ariaLabel || placeholder || "Select"}
        >
          {value || placeholder}
        </div>
        <div
          className={`text-secondaryText absolute cursor-pointer pointer-events-none ${
            compact ? "top-1.5 right-1 w-4 h-4" : "top-2 right-1 w-6 h-6"
          }`}
          onClick={() => setIsSelectOpen(!isSelectOpen)}
          aria-label={isSelectOpen ? "Collapse dropdown" : "Expand dropdown"}
        >
          {isSelectOpen ? <ArrowUpSimpleIcon /> : <ArrowDownSimpleIcon />}
        </div>
        {/* Dropdown for custom select */}
        {isSelectOpen && (
          <div
            className={`rounded-md backdrop-blur-lg absolute w-full ${
              direction === "top" ? "bottom-[2.8rem]" : compact ? "top-[2.4rem]" : "top-[2.9rem]"
            } 
            ${
              enableOptionsDropdownScroll ? "max-h-[13rem] overflow-y-auto" : ""
            }
            border border-inputBorder
           border-inputBorder z-10 bg-dropdownBg bg-dropdownBg text-primaryText text-primaryText`}
          >
            <>
              {customOptions?.map((option, index) => (
                <div
                  key={index}
                  className={`flex items-center justify-between cursor-pointer hover:bg-dropdownBgHover hover:bg-dropdownBgHover ${
                    compact ? "text-xs p-1.5" : "text-sm 3xl:text-base p-2"
                  }
                ${
                  value === option &&
                  "bg-dropdownBgHover bg-dropdownBgHover pointer-events-none"
                }
                `}
                  onClick={() => handleCustomChange(option)}
                  role="option"
                  aria-selected={value === option}
                >
                  {option}
                  {value === option && (
                    <div className="text-secondaryText">
                      <CheckIcon />
                    </div>
                  )}
                </div>
              ))}
              {isBottomPlaceholderVisible && (
                <div
                  className={`cursor-pointer hover:bg-dropdownBgHover hover:bg-dropdownBgHover ${
                    compact ? "text-xs p-1.5" : "text-sm 3xl:text-base p-2"
                  }
                ${
                  !selectedValue &&
                  "bg-dropdownBgHover bg-dropdownBgHover pointer-events-none"
                }
                `}
                  onClick={clearSelection}
                >
                  {placeholder}
                </div>
              )}
            </>
          </div>
        )}
      </div>
    </>
  );
};
