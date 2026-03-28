import { forwardRef, useEffect, useRef } from "react";

import { SearchIcon } from "@/assets/icons/SearchIcon";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/common/shadcn/input-group";

import { useSearchInput } from "../hooks/useSearchInput";

interface SearchInputProps {
  closeOthers?: () => void;
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

export const SearchInput = forwardRef<HTMLDivElement, SearchInputProps>(
  ({ isOpen, open, close, closeOthers }, ref) => {
    const {
      searchText,
      filteredSections,
      searchPlaceholder,
      noResultsText,
      highlightedIndex,
      handleSearchChange,
      handleInputFocus,
      handleClick,
      handleSectionClick,
      handleKeyDown,
    } = useSearchInput({
      closeOthers,
      open,
      close,
      isOpen,
    });

    const inputRef = useRef<HTMLInputElement>(null);
    const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

    /** Listens for the "global-focus-search" custom event dispatched by the global hotkey handler. */
    useEffect(() => {
      const handleGlobalFocusSearch = () => {
        if (closeOthers) closeOthers();
        open();
        inputRef.current?.focus();
      };

      document.addEventListener("global-focus-search", handleGlobalFocusSearch);
      return () =>
        document.removeEventListener(
          "global-focus-search",
          handleGlobalFocusSearch,
        );
    }, [closeOthers, open]);

    useEffect(() => {
      if (highlightedIndex >= 0 && itemRefs.current[highlightedIndex]) {
        itemRefs.current[highlightedIndex]?.scrollIntoView({
          block: "nearest",
        });
      }
    }, [highlightedIndex]);

    return (
      <>
        <div
          className="2xl:-ml-[0.05rem] 3xl:-ml-[0.15rem] w-68 alternativeScrollbar hidden lg:block"
          ref={ref}
        >
          <div className="relative w-full">
            <InputGroup className="h-[2.2rem] 1xl:h-10 1xl:translate-y-[0.2rem] 3xl:translate-y-0">
              <InputGroupInput
                ref={inputRef}
                variant="navbarSearch"
                type="text"
                placeholder={searchPlaceholder}
                value={searchText}
                onChange={handleSearchChange}
                onFocus={handleInputFocus}
                onClick={handleClick}
                onKeyDown={handleKeyDown}
                role="combobox"
                aria-expanded={isOpen}
                aria-haspopup="listbox"
                aria-controls="search-listbox"
                aria-activedescendant={
                  highlightedIndex >= 0
                    ? `search-option-${highlightedIndex}`
                    : undefined
                }
                autoComplete="off"
                className="z-30 text-primaryText text-xs 1xl:text-sm placeholder:text-xs placeholder:1xl:text-sm"
              />
              <InputGroupAddon>
                <SearchIcon />
              </InputGroupAddon>
            </InputGroup>
            {isOpen && (
              <div
                id="search-listbox"
                role="listbox"
                tabIndex={-1}
                className="absolute top-full left-0 w-[200%] mt-1 bg-dropdownBg border border-inputBorder rounded-md shadow-md z-40 max-h-64 overflow-y-auto"
              >
                {filteredSections.length > 0 ? (
                  filteredSections.map((item, index) => (
                    <div
                      key={index}
                      id={`search-option-${index}`}
                      role="option"
                      aria-selected={index === highlightedIndex}
                      ref={(el) => {
                        itemRefs.current[index] = el;
                      }}
                      onClick={() => handleSectionClick(item)}
                      className={`flex justify-between items-center px-5 py-4 cursor-pointer border-b border-mainBorder last:border-b-0 ${
                        index === highlightedIndex
                          ? "bg-dropdownBgHover"
                          : "hover:bg-dropdownBgHover"
                      }`}
                    >
                      <span className="text-primaryText font-medium text-sm 1xl:text-md">
                        {item.translatedSection}
                      </span>
                      <div className="bg-outlinedButtonBg text-secondaryText text-xs px-2 py-1 rounded border border-mainBorder">
                        {item.translatedPage}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="px-5 py-5 text-center text-secondaryText">
                    {noResultsText}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </>
    );
  },
);

SearchInput.displayName = "SearchInput";
