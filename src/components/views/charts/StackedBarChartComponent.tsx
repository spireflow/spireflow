"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useTheme } from "next-themes";
import { useTranslations } from "next-intl";

import { Card } from "../../common/Card";
import { useChartColors } from "../../../hooks/useChartColors";
import { useWindowDimensions } from "../../../hooks/useWindowDimensions";
import { BaseTooltip } from "../../common/BaseTooltip";
import { useChartAnimation } from "../../../hooks/useChartAnimation";

interface DataPoint {
  day: string;
  desktop: number;
  mobile: number;
  tablet: number;
}

interface StackedTooltipProps {
  active?: boolean;
  payload?: Array<{
    name: string;
    value: number;
    dataKey: string;
    color: string;
  }>;
  label?: string;
}

interface StackedLegendProps {
  payload?: Array<{
    value: string;
    color?: string;
  }>;
}

const StackedTooltip = ({ active, payload, label }: StackedTooltipProps) => {
  if (!active || !payload || payload.length === 0) return null;

  const total = payload.reduce((sum, entry) => sum + (entry.value || 0), 0);

  return (
    <BaseTooltip title={label || ""}>
      {payload.map((entry, index) => (
        <p
          key={index}
          className="px-3 pb-1 text-primaryText flex items-center justify-between"
        >
          <span>
            <span
              className="w-2 h-2 mr-2 rounded inline-block"
              style={{ backgroundColor: entry.color }}
            />
            {entry.name}:{" "}
          </span>
          <span className="pl-[0.7rem]">
            {Intl.NumberFormat("us").format(entry.value)}
          </span>
        </p>
      ))}
      <div className="border-t border-gray-600 mt-1 pt-1 px-3 pb-1">
        <p className="text-primaryText flex items-center justify-between font-semibold">
          <span>Total: </span>
          <span className="pl-[0.7rem]">
            {Intl.NumberFormat("us").format(total)}
          </span>
        </p>
      </div>
    </BaseTooltip>
  );
};

const StackedCustomLegend = ({ payload }: StackedLegendProps) => {
  return (
    <div className="flex flex-row justify-center gap-8 text-white w-full mt-4">
      {payload?.map((entry, index) => (
        <div key={`legend-${index}`} className="flex items-center">
          <div
            className="w-3 h-3 mr-2"
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-xs 1xl:text-sm text-primaryText">
            {entry.value}
          </span>
        </div>
      ))}
    </div>
  );
};

export const StackedBarChartComponent = () => {
  const t = useTranslations("charts");
  const { theme } = useTheme();
  const chartColors = useChartColors(theme as "dark" | "light");
  const { width: windowWidth } = useWindowDimensions();
  const { shouldAnimate, animationBegin } = useChartAnimation("charts");

  const chartdata: DataPoint[] = [
    { day: "Mon", desktop: 4200, mobile: 2800, tablet: 1200 },
    { day: "Tue", desktop: 3800, mobile: 3200, tablet: 1400 },
    { day: "Wed", desktop: 4500, mobile: 3600, tablet: 1100 },
    { day: "Thu", desktop: 4100, mobile: 2900, tablet: 1300 },
    { day: "Fri", desktop: 5200, mobile: 4100, tablet: 1800 },
    { day: "Sat", desktop: 5800, mobile: 4800, tablet: 2100 },
    { day: "Sun", desktop: 4900, mobile: 4200, tablet: 1900 },
  ];

  return (
    <Card
      className="w-full h-full"
      title={t("stackedBarChart")}
      padding="px-9"
      isHeaderDividerVisible
      addTitleMargin
    >
      <div className="h-80 1xl:h-96 3xl:h-[28rem] w-full mt-4">
        <ResponsiveContainer
          width="100%"
          height="100%"
          initialDimension={{ width: 320, height: 200 }}
        >
          <BarChart
            data={chartdata}
            margin={{
              top: 20,
              right: windowWidth > 700 ? 30 : 10,
              left: windowWidth > 700 ? 20 : 5,
              bottom: 5,
            }}
            barSize={40}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={chartColors.primary.grid}
            />
            <XAxis
              dataKey="day"
              stroke="rgba(255,255,255,0.1)"
              tick={{ fill: "rgba(255,255,255,0.65)", fontSize: 12 }}
            />
            <YAxis
              stroke="rgba(255,255,255,0.1)"
              tick={{ fill: "rgba(255,255,255,0.65)", fontSize: 12 }}
              tickFormatter={(value) => `${(value / 1000).toFixed(0)}K`}
            />
            <Tooltip
              content={<StackedTooltip />}
              cursor={{ fill: "rgba(255, 255, 255, 0.02)", stroke: "var(--color-chartVerticalLine)" }}
              isAnimationActive={false}
            />
            <Legend
              verticalAlign="bottom"
              align="center"
              content={<StackedCustomLegend />}
            />
            <Bar
              dataKey="desktop"
              stackId="a"
              fill={chartColors.primary.fill}
              name="Desktop"
              radius={[0, 0, 0, 0]}
              isAnimationActive={shouldAnimate}
              animationBegin={animationBegin}
              animationDuration={800}
              animationEasing="ease-out"
            />
            <Bar
              dataKey="mobile"
              stackId="a"
              fill={chartColors.secondary.fill}
              name="Mobile"
              radius={[0, 0, 0, 0]}
              isAnimationActive={shouldAnimate}
              animationBegin={animationBegin}
              animationDuration={800}
              animationEasing="ease-out"
            />
            <Bar
              dataKey="tablet"
              stackId="a"
              fill="rgb(168, 162, 255)"
              name="Tablet"
              radius={[8, 8, 0, 0]}
              isAnimationActive={shouldAnimate}
              animationBegin={animationBegin}
              animationDuration={800}
              animationEasing="ease-out"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};
