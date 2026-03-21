import type { DateRangePreset } from "../store/dateRangeStore";
import type { SidebarDefaultState } from "../store/layoutStore";
import type { FontType } from "../styles/fonts";

/**
 * Central defaults for the Spireflow dashboard starter.
 *
 * Change these values to customize the out-of-the-box experience.
 * They are consumed by Zustand stores, providers and UI components.
 */
export const APP_DEFAULTS = {
  /** Homepage card layout: "three-cards" or "four-cards" */
  homepageLayout: "three-cards" as "three-cards" | "four-cards",

  /** Font family: "default" (Outfit) or "alternative" (Open Sans) */
  fontType: "default" as FontType,

  /** Sidebar state on first visit: "expanded" or "collapsed" */
  sidebarDefaultState: "expanded" as SidebarDefaultState,

  /** Whether chart animations are enabled on first visit */
  chartAnimationsEnabled: false,

  /** Whether the navbar stays fixed on scroll */
  fixedNavbar: true,

  /** Default date range filter preset */
  dateRangePreset: "last7days" as DateRangePreset,

  /** Color theme for new visitors: "dark" or "light" */
  defaultTheme: "dark",

  /** Global tooltip show delay in milliseconds */
  tooltipDelayMs: 100,

  /** How long a toast notification stays visible (ms) */
  toastDurationMs: 5000,

  /** Duration of the full-screen loader on first visit (ms) */
  loaderDurationMs: 1000,
} as const;
