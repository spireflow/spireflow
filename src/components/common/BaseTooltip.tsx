import React from "react";

interface BaseTooltipProps {
  title: string;
  children: React.ReactNode;
}

/**
 * Base tooltip component with title header and content body.
 * Provides a styled container with border, shadow, and rounded corners.
 * Used as foundation for custom tooltip implementations in charts.
 *
 * @component
 * @param {BaseTooltipProps} props - Component props
 * @param {string} props.title - Header text displayed at top
 * @param {React.ReactNode} props.children - Main content area
 *
 * @example
 * ```tsx
 * <BaseTooltip title="User Info">
 *   <p>Additional details here</p>
 * </BaseTooltip>
 * ```
 */
export const BaseTooltip = ({ title, children }: BaseTooltipProps) => (
  <div className="bg-tooltipBg border border-mainBorder shadow-sm rounded-md text-sm">
    <div className="text-sm text-primaryText border-b border-mainBorder w-full px-4 py-3 mb-2">
      {title}
    </div>
    <div className="p-1"> {children}</div>
  </div>
);
