import React, { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useTheme } from "next-themes";
import { useTranslations } from "next-intl";

import { Card } from "../../common/Card";

import {
  RevenueOverTimeProps,
  RevenueOverTimeTooltipProps,
} from "./types";
import { useBackendTranslations } from "../../../hooks/useBackendTranslations";
import { useTranslateData } from "../../../hooks/useTranslateData";
import { BaseTooltip } from "../../common/BaseTooltip";
import { useChartColors } from "../../../hooks/useChartColors";
import { useWindowDimensions } from "../../../hooks/useWindowDimensions";

const RevenueOverTimeTooltip = ({
  active,
  payload,
  label,
}: RevenueOverTimeTooltipProps) => {
  if (!active || !payload || payload.length === 0 || !label) return null;

  const websiteEntry =
    payload.find((p) => p.dataKey === "websiteSales") || payload[0];
  const inStoreEntry =
    payload.find((p) => p.dataKey === "inStoreSales") || payload[1];

  return (
    <BaseTooltip title={label}>
      {websiteEntry && (
        <p className="px-3 pb-1 text-primaryText flex items-center justify-between">
          <span>
            <span
              className="w-2 h-2 mr-2 rounded inline-block"
              style={{ backgroundColor: websiteEntry.color }}
            />
            {`${websiteEntry.name}:   `}
          </span>
          <span className="pl-[0.7rem]">
            ${Intl.NumberFormat("us").format(websiteEntry.value)}
          </span>
        </p>
      )}
      {inStoreEntry && (
        <p className="px-3 pb-1 text-primaryText flex items-center justify-between">
          <span>
            <span
              className="w-2 h-2 mr-2 rounded inline-block"
              style={{ backgroundColor: inStoreEntry.color }}
            />
            {`${inStoreEntry.name}:   `}
          </span>
          <span className="pl-[0.7rem]">
            ${Intl.NumberFormat("us").format(inStoreEntry.value)}
          </span>
        </p>
      )}
    </BaseTooltip>
  );
};

export const RevenueOverTime = ({
  revenueOverTimeData,
}: RevenueOverTimeProps) => {
  const t = useTranslations("homepage.revenueOverTime");
  const backendTranslations = useBackendTranslations(
    "homepage.revenueOverTime"
  );

  const translatedData = useTranslateData(
    revenueOverTimeData,
    backendTranslations
  );

  const { theme } = useTheme();

  const chartColors = useChartColors(
    theme as "dark" | "light"
  );

  const { width: windowWidth } = useWindowDimensions();
  
  const [timeRange, setTimeRange] = useState<"Monthly" | "Quarterly">("Monthly");

  // Function to group monthly data into quarterly data
  const processDataByTimeRange = (data: typeof translatedData) => {
    if (timeRange === "Monthly") {
      return data;
    }

    // Group by quarters
    const quarters: { [key: string]: { websiteSales: number; inStoreSales: number; count: number } } = {};
    
    data.forEach((item) => {
      // Extract month and year from date (e.g., "Mar 23" -> month=03, year=23)
      const [monthStr, yearStr] = item.date.split(" ");
      const monthMap: { [key: string]: number } = {
        Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
        Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11
      };
      
      const month = monthMap[monthStr];
      const quarter = Math.floor(month / 3) + 1;
      const quarterKey = `Q${quarter} ${yearStr}`;
      
      if (!quarters[quarterKey]) {
        quarters[quarterKey] = { websiteSales: 0, inStoreSales: 0, count: 0 };
      }
      
      quarters[quarterKey].websiteSales += item.websiteSales;
      quarters[quarterKey].inStoreSales += item.inStoreSales;
      quarters[quarterKey].count += 1;
    });

    // Convert to array and calculate averages
    return Object.entries(quarters).map(([date, values]) => ({
      date,
      websiteSales: Math.round(values.websiteSales / values.count),
      inStoreSales: Math.round(values.inStoreSales / values.count),
    }));
  };

  const displayData = processDataByTimeRange(translatedData);

  const customHeader = (
    <div className="flex items-center justify-between">
      <div className="flex flex-col gap-0.5">
        <span className="text-[0.9rem] 1xl:text-[1rem] 3xl:text-[1.2rem] font-semibold text-primaryText">
          {t("title")}
        </span>
        <span style={{ fontSize: '0.85rem', color: 'rgb(140, 145, 150)' }}>
          Track revenue changes over time
        </span>
      </div>
      <div className="flex items-center gap-1 bg-tabsBg rounded-lg p-1">
        <button
          onClick={() => setTimeRange("Monthly")}
          className={`px-3 py-1 text-xs rounded-md transition-colors ${
            timeRange === "Monthly"
              ? "bg-inputBg text-primaryText"
              : "text-secondaryText hover:text-primaryText"
          }`}
        >
          Monthly
        </button>
        <button
          onClick={() => setTimeRange("Quarterly")}
          className={`px-3 py-1 text-xs rounded-md transition-colors ${
            timeRange === "Quarterly"
              ? "bg-inputBg text-primaryText"
              : "text-secondaryText hover:text-primaryText"
          }`}
        >
          Quarterly
        </button>
      </div>
    </div>
  );

  return (
    <Card className="h-full" id="revenueOverTime" customHeader={customHeader} hasSubtitle={true}>
      <div className="h-[15.5rem] 1xl:h-[16.3rem] 3xl:h-[18.5rem] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={displayData}
            margin={{
              top: 10,
              right: windowWidth > 700 ? 30 : 10,
              left: windowWidth > 700 ? 20 : 5,
              bottom: 5,
            }}
          >
            <defs>
              <linearGradient id="colorWebsite" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={chartColors.primary.disabled}
                  stopOpacity={0.3}
                />
                <stop
                  offset="95%"
                  stopColor={chartColors.primary.disabled}
                  stopOpacity={0}
                />
              </linearGradient>
              <linearGradient id="colorInStore" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={chartColors.primary.fill}
                  stopOpacity={0.3}
                />
                <stop
                  offset="95%"
                  stopColor={chartColors.primary.fill}
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={chartColors.primary.grid}
            />
            <XAxis
              dataKey="date"
              stroke="rgba(255,255,255,0.1)"
              tick={{ fill: "rgba(255,255,255,0.65)", fontSize: 12 }}
            />
            <YAxis
              stroke="rgba(255,255,255,0.1)"
              tick={{ fill: "rgba(255,255,255,0.65)", fontSize: 12 }}
              tickFormatter={(value) =>
                `$${Intl.NumberFormat("us").format(value)}`
              }
            />
            <Tooltip
              content={<RevenueOverTimeTooltip />}
              isAnimationActive={false}
              cursor={{ fill: "rgba(255,255,255,0.05)" }}
            />
            <Area
              type="linear"
              dataKey="websiteSales"
              name={t("websiteSales")}
              stroke={chartColors.primary.disabled}
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorWebsite)"
              isAnimationActive={false}
            />
            <Area
              type="linear"
              dataKey="inStoreSales"
              name={t("inStoreSales")}
              stroke={chartColors.primary.fill}
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorInStore)"
              isAnimationActive={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};
