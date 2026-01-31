"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { useTheme } from "next-themes";
import { useTranslations } from "next-intl";

import { Card } from "../../common/Card";
import { useChartColors } from "../../../hooks/useChartColors";
import { useWindowDimensions } from "../../../hooks/useWindowDimensions";
import { BaseTooltip } from "../../common/BaseTooltip";
import { useChartAnimation } from "../../../hooks/useChartAnimation";

/** Data point structure for vertical bar chart. */
interface DataPoint {
  category: string;
  sales: number;
  color: string;
}

/** Props for vertical bar chart tooltip component. */
interface VerticalBarTooltipProps {
  active?: boolean;
  payload?: Array<{
    name: string;
    value: number;
    payload: DataPoint;
  }>;
  label?: string;
}

/**
 * Custom tooltip displaying sales value.
 *
 * @component
 */
const VerticalBarTooltip = ({
  active,
  payload,
  label,
}: VerticalBarTooltipProps) => {
  if (!active || !payload || payload.length === 0) return null;

  const color = payload[0].payload.color;

  return (
    <BaseTooltip title={label || ""}>
      <p className="px-3 pb-1 text-primaryText flex items-center justify-between">
        <span>
          <span
            className="w-2 h-2 mr-2 rounded inline-block"
            style={{ backgroundColor: color }}
          />
          Sales:
        </span>
        <span className="pl-[0.7rem]">
          ${Intl.NumberFormat("us").format(payload[0].value)}
        </span>
      </p>
    </BaseTooltip>
  );
};

/**
 * Vertical bar chart showing sales by product category.
 * Uses Recharts with alternating bar colors.
 *
 * @component
 */
export const VerticalBarChartComponent = () => {
  const t = useTranslations("charts");
  const { theme } = useTheme();
  const chartColors = useChartColors(theme as "dark" | "light");
  const { width: windowWidth } = useWindowDimensions();
  const { shouldAnimate, animationBegin } = useChartAnimation("charts");

  const chartdata: DataPoint[] = [
    { category: "Fashion", sales: 45000, color: chartColors.primary.fill },
    { category: "Tech", sales: 62000, color: chartColors.secondary.fill },
    { category: "Home", sales: 38000, color: chartColors.primary.fill },
    { category: "Beauty", sales: 29000, color: chartColors.secondary.fill },
    { category: "Sports", sales: 41000, color: chartColors.primary.fill },
    { category: "Books", sales: 22000, color: chartColors.secondary.fill },
  ];

  return (
    <Card
      className="w-full h-full"
      title={t("verticalBarChart")}
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
              bottom: 20,
            }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={chartColors.primary.grid}
            />
            <XAxis
              dataKey="category"
              stroke="rgba(255,255,255,0.1)"
              tick={{ fill: "rgba(255,255,255,0.65)", fontSize: 12 }}
            />
            <YAxis
              stroke="rgba(255,255,255,0.1)"
              tick={{ fill: "rgba(255,255,255,0.65)", fontSize: 12 }}
              tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`}
            />
            <Tooltip content={<VerticalBarTooltip />} cursor={{ fill: "rgba(255, 255, 255, 0.02)", stroke: "var(--color-chartVerticalLine)" }} isAnimationActive={false} />
            <Bar
              dataKey="sales"
              name="Sales"
              radius={[8, 8, 0, 0]}
              fill={chartColors.primary.fill}
              isAnimationActive={shouldAnimate}
              animationBegin={animationBegin}
              animationDuration={800}
              animationEasing="ease-out"
            >
              {chartdata.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};
