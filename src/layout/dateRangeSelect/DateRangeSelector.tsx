"use client";

import { useState, useCallback } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Check } from "lucide-react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../components/common/shadcn/popover";
import { Separator } from "../../components/common/shadcn/separator";
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
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const t = useTranslations("dateRange");
  const locale = useLocale();

  const selectedPreset = useDateRangeStore((s) => s.selectedPreset);
  const customRange = useDateRangeStore((s) => s.customRange);
  const setSelectedPreset = useDateRangeStore((s) => s.setSelectedPreset);
  const setCustomRange = useDateRangeStore((s) => s.setCustomRange);

  const handlePresetSelect = (preset: Exclude<DateRangePreset, "custom">) => {
    setSelectedPreset(preset);
    setPopoverOpen(false);
  };

  const handleCustomRangeClick = () => {
    setPopoverOpen(false);
    setDialogOpen(true);
  };

  const handleCustomRangeApply = useCallback(
    (range: CustomDateRange) => {
      setCustomRange(range);
    },
    [setCustomRange]
  );

  const triggerLabel =
    selectedPreset === "custom" && customRange
      ? formatCustomLabel(customRange, locale)
      : t(selectedPreset);

  return (
    <>
      <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
        <PopoverTrigger asChild>
          <button
            className="-mt-[0.1rem] text-xs xsm:text-sm 3xl:text-base cursor-pointer flex rounded-md justify-center items-center gap-2 h-[2.4rem] px-3 xsm:px-4 border border-mainBorder hover:border-mainBorderHover text-primaryText stroke-grayIcon fill-grayIcon"
            type="button"
          >
            <CalendarIcon />
            <span className="hidden xsm:inline whitespace-nowrap">
              {triggerLabel}
            </span>
            <ChevronDownIcon />
          </button>
        </PopoverTrigger>
        <PopoverContent align="end" sideOffset={6} className="w-[13rem] p-1">
          <ul role="listbox">
            {DATE_RANGE_PRESETS.map((preset) => {
              const isActive = preset === selectedPreset;
              return (
                <li
                  key={preset}
                  role="option"
                  aria-selected={isActive}
                  onClick={() => handlePresetSelect(preset)}
                  className={`relative flex w-full cursor-pointer select-none items-center rounded-sm py-1.5 pl-2 pr-2 text-sm outline-none transition-colors text-primaryText hover:bg-dropdownBgHover`}
                >
                  <span className="flex h-3.5 w-3.5 items-center justify-center mr-2 shrink-0">
                    {isActive && <Check className="h-4 w-4" />}
                  </span>
                  <span>{t(preset)}</span>
                </li>
              );
            })}
          </ul>
          <Separator className="my-1" />
          <button
            type="button"
            onClick={handleCustomRangeClick}
            className="relative flex w-full cursor-pointer select-none items-center rounded-sm py-1.5 pl-2 pr-2 text-sm outline-none transition-colors text-primaryText hover:bg-dropdownBgHover"
          >
            <span className="flex h-3.5 w-3.5 items-center justify-center mr-2 shrink-0">
              {selectedPreset === "custom" && <Check className="h-4 w-4" />}
            </span>
            <span>{t("customRange")}</span>
          </button>
        </PopoverContent>
      </Popover>

      <CustomDateRangeDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onApply={handleCustomRangeApply}
        initialRange={customRange}
      />
    </>
  );
};
