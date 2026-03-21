import { create } from "zustand";

import { APP_DEFAULTS } from "../config/appDefaults";

export type DateRangePreset =
  | "today"
  | "last7days"
  | "last30days"
  | "thisMonth"
  | "lastQuarter"
  | "thisYear"
  | "custom";

export interface CustomDateRange {
  from: string;
  to: string;
}

interface DateRangeStore {
  selectedPreset: DateRangePreset;
  customRange: CustomDateRange | null;
  setSelectedPreset: (preset: DateRangePreset) => void;
  setCustomRange: (range: CustomDateRange) => void;
}

export const DATE_RANGE_PRESETS: Exclude<DateRangePreset, "custom">[] = [
  "today",
  "last7days",
  "last30days",
  "thisMonth",
  "lastQuarter",
  "thisYear",
];

export const useDateRangeStore = create<DateRangeStore>()((set) => ({
  selectedPreset: APP_DEFAULTS.dateRangePreset,
  customRange: null,
  setSelectedPreset: (selectedPreset) => set(() => ({ selectedPreset })),
  setCustomRange: (customRange) =>
    set(() => ({ customRange, selectedPreset: "custom" })),
}));
