"use client";

import { useState, useCallback } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Check } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../components/common/shadcn/dropdown-menu";
import { CustomDateRangeDialog } from "./CustomDateRangeDialog";
import { CalendarIcon } from "../../assets/icons/CalendarIcon";
import { ChevronDownIcon } from "../../assets/icons/ChevronDownIcon";
import {
  useDateRangeStore,
  DATE_RANGE_PRESETS,
} from "../../store/dateRangeStore";
import type {
  DateRangePreset,
  CustomDateRange,
} from "../../store/dateRangeStore";

const formatCustomLabel = (range: CustomDateRange, locale: string): string => {
  const fmt = new Intl.DateTimeFormat(locale, {
    month: "short",
    day: "numeric",
  });
  const from = fmt.format(new Date(range.from + "T00:00:00"));
  const to = fmt.format(new Date(range.to + "T00:00:00"));
  return `${from} – ${to}`;
};

export const DateRangeSelector = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const t = useTranslations("dateRange");
  const locale = useLocale();

  const selectedPreset = useDateRangeStore((s) => s.selectedPreset);
  const customRange = useDateRangeStore((s) => s.customRange);
  const setSelectedPreset = useDateRangeStore((s) => s.setSelectedPreset);
  const setCustomRange = useDateRangeStore((s) => s.setCustomRange);

  const handlePresetSelect = (preset: Exclude<DateRangePreset, "custom">) => {
    setSelectedPreset(preset);
    setMenuOpen(false);
  };

  const handleCustomRangeClick = () => {
    setMenuOpen(false);
    setDialogOpen(true);
  };

  const handleCustomRangeApply = useCallback(
    (range: CustomDateRange) => {
      setCustomRange(range);
    },
    [setCustomRange],
  );

  const triggerLabel =
    selectedPreset === "custom" && customRange
      ? formatCustomLabel(customRange, locale)
      : t(selectedPreset);

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
        <DropdownMenuContent align="end" sideOffset={6} className="w-[13rem]">
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
