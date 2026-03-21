import React, { memo } from "react";

import { APP_DEFAULTS } from "../../config/appDefaults";

export const LOADER_DURATION_MS = APP_DEFAULTS.loaderDurationMs;
export const CHART_ANIMATION_DELAY_MS = 600;

/**
 * Full-screen loading overlay with animated spinner.
 * Displays three animated circles in a fixed overlay covering entire viewport.
 * Memoized to prevent unnecessary re-renders. Includes ARIA attributes for accessibility.
 *
 * @component
 *
 * @example
 * ```tsx
 * {isLoading && <FullScreenLoader />}
 * ```
 */
export const FullScreenLoader = memo(() => (
  <div
    className="fixed inset-0 flex justify-center items-center z-50 bg-loaderBg"
    role="alert"
    aria-live="assertive"
    aria-busy="true"
  >
    <div className="flex justify-center">
      <span className="circle animate-loader"></span>
      <span className="circle animate-loader animation-delay-200"></span>
      <span className="circle animate-loader animation-delay-400"></span>
    </div>
  </div>
));

FullScreenLoader.displayName = "FullScreenLoader";
