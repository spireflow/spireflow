"use client";

import {
  ComposedChart,
  Bar,
  Line,
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

/** Data point structure for composed chart. */
interface DataPoint {
  month: string;
  revenue: number;
  profit: number;
  margin: number;
}

/** Props for composed chart tooltip component. */
interface ComposedTooltipProps {
  active?: boolean;
  payload?: Array<{
    name: string;
    value: number;
    dataKey: string;
    color: string;
  }>;
  label?: string;
}

/** Props for composed chart legend component. */
interface ComposedLegendProps {
  payload?: Array<{
    value: string;
    color?: string;
  }>;
}

/**
 * Custom tooltip displaying revenue, profit, and margin.
 *
 * @component
 */
const ComposedTooltip = ({ active, payload, label }: ComposedTooltipProps) => {
  if (!active || !payload || payload.length === 0) return null;

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
            {entry.dataKey === "margin"
              ? `${entry.value}%`
              : `$${Intl.NumberFormat("us").format(entry.value)}`}
          </span>
        </p>
      ))}
    </BaseTooltip>
  );
};

/**
 * Custom legend with colored indicators.
 *
 * @component
 */
const ComposedCustomLegend = ({ payload }: ComposedLegendProps) => {
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

/**
 * Combined bar and line chart showing revenue, profit, and margin.
 * Uses dual Y-axes for currency and percentage values.
 *
 * @component
 */
export const ComposedChartComponent = () => {
  const t = useTranslations("charts");
  const { theme } = useTheme();
  const chartColors = useChartColors(theme as "dark" | "light");
  const { width: windowWidth } = useWindowDimensions();
  const { shouldAnimate, animationBegin } = useChartAnimation("charts");

  const chartdata: DataPoint[] = [
    { month: "Jan", revenue: 45000, profit: 13500, margin: 30 },
    { month: "Feb", revenue: 52000, profit: 15600, margin: 30 },
    { month: "Mar", revenue: 48000, profit: 12000, margin: 25 },
    { month: "Apr", revenue: 61000, profit: 18300, margin: 30 },
    { month: "May", revenue: 58000, profit: 20300, margin: 35 },
    { month: "Jun", revenue: 67000, profit: 23450, margin: 35 },
  ];

  return (
    <Card
      className="w-full h-full"
      title={t("composedChart")}
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
          <ComposedChart
            data={chartdata}
            margin={{
              top: 20,
              right: windowWidth > 700 ? 30 : 10,
              left: windowWidth > 700 ? 20 : 5,
              bottom: 5,
            }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={chartColors.primary.grid}
            />
            <XAxis
              dataKey="month"
              stroke="rgba(255,255,255,0.1)"
              tick={{ fill: "rgba(255,255,255,0.65)", fontSize: 12 }}
            />
            <YAxis
              yAxisId="left"
              stroke="rgba(255,255,255,0.1)"
              tick={{ fill: "rgba(255,255,255,0.65)", fontSize: 12 }}
              tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              stroke="rgba(255,255,255,0.1)"
              tick={{ fill: "rgba(255,255,255,0.65)", fontSize: 12 }}
              tickFormatter={(value) => `${value}%`}
            />
            <Tooltip content={<ComposedTooltip />} cursor={{ stroke: "var(--color-chartVerticalLine)" }} isAnimationActive={false} />
            <Legend
              verticalAlign="bottom"
              align="center"
              content={<ComposedCustomLegend />}
            />
            <Bar
              yAxisId="left"
              dataKey="revenue"
              fill={chartColors.primary.fill}
              name="Revenue"
              radius={[8, 8, 0, 0]}
              isAnimationActive={shouldAnimate}
              animationBegin={animationBegin}
              animationDuration={800}
              animationEasing="ease-out"
            />
            <Bar
              yAxisId="left"
              dataKey="profit"
              fill={chartColors.secondary.fill}
              name="Profit"
              radius={[8, 8, 0, 0]}
              isAnimationActive={shouldAnimate}
              animationBegin={animationBegin}
              animationDuration={800}
              animationEasing="ease-out"
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="margin"
              stroke="rgb(168, 162, 255)"
              strokeWidth={3}
              name="Margin %"
              dot={{ r: 5, fill: "rgb(168, 162, 255)", strokeWidth: 2 }}
              isAnimationActive={shouldAnimate}
              animationBegin={animationBegin}
              animationDuration={800}
              animationEasing="ease-out"
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};
