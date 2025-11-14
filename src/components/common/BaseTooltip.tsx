import React from "react";

interface BaseTooltipProps {
  title: string;
  children: React.ReactNode;
}

export const BaseTooltip = ({ title, children }: BaseTooltipProps) => (
  <div className="bg-tooltipBg border border-mainBorder shadow-sm rounded-md text-sm">
    <div className="text-sm text-primaryText border-b border-mainBorder w-full px-4 py-3 mb-2">
      {title}
    </div>
    <div className="p-1"> {children}</div>
  </div>
);
