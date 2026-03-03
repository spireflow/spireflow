"use client";

import { useTranslations } from "next-intl";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { useChartAnimation } from "../../../hooks/useChartAnimation";
import { useWindowDimensions } from "../../../hooks/useWindowDimensions";
import { BREAKPOINTS } from "../../../styles/breakpoints";
import { BaseTooltip } from "../../common/BaseTooltip";
import { Card } from "../../common/Card";

/** Data point structure for two-axis line chart. */
interface DataPoint {
  week: string;
  customers: number;
  avgOrderValue: number;
}

/** Props for two-axis chart tooltip component. */
interface TwoAxisTooltipProps {
  active?: boolean;
  payload?: Array<{
    name: string;
    value: number;
    dataKey: string;
    color: string;
  }>;
  label?: string;
}

/**
 * Custom tooltip displaying customer count and order value.
 *
 * @component
 */
const TwoAxisTooltip = ({ active, payload, label }: TwoAxisTooltipProps) => {
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
            {entry.dataKey === "avgOrderValue"
              ? `$${entry.value}`
              : Intl.NumberFormat("us").format(entry.value)}
          </span>
        </p>
      ))}
    </BaseTooltip>
  );
};

/** Props for two-axis chart legend component. */
interface TwoAxisLegendProps {
  payload?: Array<{
    value: string;
    color?: string;
  }>;
}

/**
 * Custom legend with line-style indicators.
 *
 * @component
 */
const TwoAxisCustomLegend = ({ payload }: TwoAxisLegendProps) => {
  return (
    <div
      className="flex flex-row justify-center gap-8 text-white w-full whitespace-nowrap"
      style={{ gap: "2rem" }}
    >
      {payload?.map((entry, index) => (
        <div key={`legend-${index}`} className="flex items-center">
          <div
            className="w-3 h-1 mr-2"
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
 * Dual Y-axis line chart showing customers and average order value.
 * Uses separate scales for count and currency values.
 *
 * @component
 */
export const TwoAxisLineChartComponent = () => {
  const t = useTranslations("charts");
  const { width: windowWidth } = useWindowDimensions();
  const { shouldAnimate, animationBegin } = useChartAnimation("charts");

  const chartdata: DataPoint[] = [
    { week: "Week 1", customers: 1240, avgOrderValue: 85 },
    { week: "Week 2", customers: 1580, avgOrderValue: 92 },
    { week: "Week 3", customers: 1420, avgOrderValue: 88 },
    { week: "Week 4", customers: 1890, avgOrderValue: 95 },
    { week: "Week 5", customers: 2100, avgOrderValue: 102 },
    { week: "Week 6", customers: 1950, avgOrderValue: 98 },
  ];

  return (
    <Card
      className="w-full h-full"
      title={t("twoAxisLineChart")}
      padding="px-9"
      isHeaderDividerVisible
      addTitleMargin
    >
      <div
        className="h-64 xsm:h-80 1xl:h-96 3xl:h-112 w-full"
        style={{ marginTop: "2rem" }}
      >
        <ResponsiveContainer
          width="100%"
          height="100%"
          initialDimension={{ width: 320, height: 200 }}
        >
          <LineChart
            data={chartdata}
            margin={{
              top: 20,
              right: windowWidth > BREAKPOINTS.md ? 50 : 30,
              left: windowWidth > BREAKPOINTS.md ? 20 : 5,
              bottom: 20,
            }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={"var(--color-chartPrimaryGrid)"}
            />
            <XAxis
              dataKey="week"
              axisLine={{ stroke: "var(--color-chartAxisLine)" }}
              tickLine={false}
              tick={{ fill: "var(--color-chartAxisText)", fontSize: 12 }}
            />
            <YAxis
              yAxisId="left"
              axisLine={{ stroke: "var(--color-chartAxisLine)" }}
              tickLine={false}
              tick={{ fill: "var(--color-chartAxisText)", fontSize: 12 }}
              tickFormatter={(value) => Intl.NumberFormat("us").format(value)}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              axisLine={{ stroke: "var(--color-chartAxisLine)" }}
              tickLine={false}
              tick={{ fill: "var(--color-chartAxisText)", fontSize: 12 }}
              tickFormatter={(value) => `$${value}`}
            />
            <Tooltip
              content={<TwoAxisTooltip />}
              cursor={{ stroke: "var(--color-chartVerticalLine)" }}
              isAnimationActive={false}
            />
            <Legend
              iconType="line"
              wrapperStyle={{ paddingTop: "2rem" }}
              content={<TwoAxisCustomLegend />}
            />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="customers"
              stroke={"var(--color-chartPrimaryFill)"}
              strokeWidth={3}
              name="New Customers"
              dot={{ r: 5 }}
              activeDot={{ r: 7 }}
              isAnimationActive={shouldAnimate}
              animationBegin={animationBegin}
              animationDuration={800}
              animationEasing="ease-out"
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="avgOrderValue"
              stroke={"var(--color-chartSecondaryFill)"}
              strokeWidth={3}
              name="Avg Order Value"
              dot={{ r: 5, fill: "var(--color-chartSecondaryFill)" }}
              activeDot={{ r: 7 }}
              isAnimationActive={shouldAnimate}
              animationBegin={animationBegin}
              animationDuration={800}
              animationEasing="ease-out"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};
