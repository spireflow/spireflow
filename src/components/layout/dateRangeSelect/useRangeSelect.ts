import { useLocale, useTranslations } from "next-intl";
import { useCallback, useRef, useState } from "react";
import type DatePicker from "react-datepicker";

import { useIsFirstRender } from "../../../hooks/useIsFirstRender";
import { useMediaQuery } from "../../../hooks/useMediaQuery";
import type {
  CustomDateRange,
  DateRangePreset,
} from "../../../store/dateRangeStore";
import { useDateRangeStore } from "../../../store/dateRangeStore";
import { BREAKPOINTS } from "../../../styles/breakpoints";
import type { CustomDateRangeDialogProps } from "./types";

/**
 * Formats a custom date range into a locale-aware label (e.g. "Jan 5 – Feb 12").
 * Appends "T00:00:00" to avoid timezone-related off-by-one day shifts
 * when constructing Date objects from date-only strings.
 */
const formatCustomLabel = (range: CustomDateRange, locale: string): string => {
  const fmt = new Intl.DateTimeFormat(locale, {
    month: "short",
    day: "numeric",
  });
  const from = fmt.format(new Date(range.from + "T00:00:00"));
  const to = fmt.format(new Date(range.to + "T00:00:00"));
  return `${from} – ${to}`;
};

/** Extracts the "YYYY-MM-DD" portion from a Date's ISO string. */
const toISODate = (date: Date): string => date.toISOString().split("T")[0];

/**
 * Parses an ISO date string ("YYYY-MM-DD") into a Date object.
 * Appends "T00:00:00" so the date is interpreted in local time
 * instead of UTC, preventing off-by-one day errors.
 */
const parseDate = (str: string): Date => new Date(str + "T00:00:00");

/**
 * Manages the date-range selector dropdown state and preset/custom selection logic.
 * Handles both predefined presets (e.g. "last 7 days") and user-defined custom ranges.
 */
export const useRangeSelect = () => {
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

  /**
   * Label displayed on the trigger button - shows a formatted date range
   * for custom selections, or a translated preset name for standard presets.
   */
  const triggerLabel =
    selectedPreset === "custom" && customRange
      ? formatCustomLabel(customRange, locale)
      : t(selectedPreset);

  return {
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
  };
};

/**
 * Manages state for the custom date range dialog (calendar pickers).
 * Resets inputs to the initial range each time the dialog opens,
 * and normalizes from/to order on apply so `from` is always <= `to`.
 */
export const useCustomDateRangeDialog = ({
  initialRange,
  onApply,
  onOpenChange,
}: Pick<
  CustomDateRangeDialogProps,
  "initialRange" | "onApply" | "onOpenChange"
>) => {
  const t = useTranslations("dateRange");
  const startPickerRef = useRef<DatePicker>(null);
  const endPickerRef = useRef<DatePicker>(null);

  const today = new Date();
  const todayStr = toISODate(today);
  const fiveYearsAgo = new Date(
    today.getFullYear() - 5,
    today.getMonth(),
    today.getDate(),
  );

  const [fromDate, setFromDate] = useState<Date>(
    parseDate(initialRange?.from ?? todayStr),
  );
  const [toDate, setToDate] = useState<Date>(
    parseDate(initialRange?.to ?? todayStr),
  );

  /**
   * When the dialog opens, resets both date pickers to the previously
   * applied range (or today if none exists) so edits don't persist on cancel.
   */
  const handleOpenChange = (nextOpen: boolean) => {
    if (nextOpen) {
      setFromDate(parseDate(initialRange?.from ?? todayStr));
      setToDate(parseDate(initialRange?.to ?? todayStr));
    }
    onOpenChange(nextOpen);
  };

  /**
   * Applies the selected date range. If the user picked "from" after "to",
   * the dates are swapped so the range is always chronologically valid.
   */
  const handleApply = () => {
    const fromStr = toISODate(fromDate);
    const toStr = toISODate(toDate);

    const normalizedFrom = fromStr <= toStr ? fromStr : toStr;
    const normalizedTo = fromStr <= toStr ? toStr : fromStr;

    onApply({ from: normalizedFrom, to: normalizedTo });
    onOpenChange(false);
  };

  const isDesktop = useMediaQuery(`(min-width: ${BREAKPOINTS.md}px)`);
  const isFirstRender = useIsFirstRender();
  const shouldHideMobileKeyboard = !isFirstRender && !isDesktop;

  /** Prevents virtual keyboard on mobile by setting readOnly on the DOM element directly.
   *  Done via onFocus instead of react-datepicker's readOnly prop,
   *  which would also block the calendar popup from opening. */
  const handleMobileFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    if (shouldHideMobileKeyboard) {
      e.target.readOnly = true;
    }
  };

  const dateInputClasses =
    "pl-3 p-2 text-sm 3xl:text-base bg-inputBg hover:bg-inputBgHover w-full h-[2.3rem] 3xl:h-[2.6rem] border rounded-md border-inputBorder text-primaryText placeholder-secondaryText hover:border-inputBorderHover transition";

  return {
    t,
    startPickerRef,
    endPickerRef,
    fromDate,
    setFromDate,
    toDate,
    setToDate,
    today,
    fiveYearsAgo,
    handleOpenChange,
    handleApply,
    dateInputClasses,
    handleMobileFocus,
  };
};
