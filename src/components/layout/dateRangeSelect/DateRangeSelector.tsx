"use client";

import { Check } from "lucide-react";

import { CalendarIcon } from "../../../assets/icons/CalendarIcon";
import { ChevronDownIcon } from "../../../assets/icons/ChevronDownIcon";
import { DATE_RANGE_PRESETS } from "../../../store/dateRangeStore";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../common/shadcn/dropdown-menu";
import { CustomDateRangeDialog } from "./CustomDateRangeDialog";
import { useRangeSelect } from "./useRangeSelect";

export const DateRangeSelector = () => {
  const {
    menuOpen,
    setMenuOpen,
    dialogOpen,
    setDialogOpen,
    t,
    selectedPreset,
    customRange,
    handlePresetSelect,
    handleCustomRangeClick,
    handleCustomRangeApply,
    triggerLabel,
  } = useRangeSelect();

  return (
    <>
      <DropdownMenu open={menuOpen} onOpenChange={setMenuOpen}>
        <DropdownMenuTrigger asChild>
          <button
            className="-mt-[0.1rem] text-sm cursor-pointer flex rounded-md justify-center items-center gap-2 h-[2.4rem] px-3 xsm:px-4 border border-mainBorder hover:border-mainBorderHover text-primaryText stroke-grayIcon fill-grayIcon"
            type="button"
            aria-label="Select date range"
          >
            <CalendarIcon />
            <span className="hidden xsm:inline whitespace-nowrap">
              {triggerLabel}
            </span>
            <ChevronDownIcon />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" sideOffset={6} className="w-52">
          {DATE_RANGE_PRESETS.map((preset) => {
            const isActive = preset === selectedPreset;
            return (
              <DropdownMenuItem
                key={preset}
                onSelect={() => handlePresetSelect(preset)}
                className="pl-2 pr-2"
              >
                <span className="flex h-3.5 w-3.5 items-center justify-center shrink-0">
                  {isActive && <Check className="h-4 w-4" />}
                </span>
                <span>{t(preset)}</span>
              </DropdownMenuItem>
            );
          })}
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onSelect={handleCustomRangeClick}
            className="pl-2 pr-2"
          >
            <span className="flex h-3.5 w-3.5 items-center justify-center shrink-0">
              {selectedPreset === "custom" && <Check className="h-4 w-4" />}
            </span>
            <span>{t("customRange")}</span>
          </DropdownMenuItem>
          {selectedPreset === "custom" && customRange && (
            <p className="xsm:hidden pb-1 pt-0.5 pl-[1.875rem] text-sm text-subtitleText">
              {triggerLabel}
            </p>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      <CustomDateRangeDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onApply={handleCustomRangeApply}
        initialRange={customRange}
      />
    </>
  );
};
