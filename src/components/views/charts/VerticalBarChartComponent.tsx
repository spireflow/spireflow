"use client";

import { useTranslations } from "next-intl";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
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
  const { width: windowWidth } = useWindowDimensions();
  const { shouldAnimate, animationBegin } = useChartAnimation("charts");

  const chartdata: DataPoint[] = [
    {
      category: "Fashion",
      sales: 45000,
      color: "var(--color-chartPrimaryFill)",
    },
    {
      category: "Tech",
      sales: 62000,
      color: "var(--color-chartSecondaryFill)",
    },
    { category: "Home", sales: 38000, color: "var(--color-chartPrimaryFill)" },
    {
      category: "Beauty",
      sales: 29000,
      color: "var(--color-chartSecondaryFill)",
    },
    {
      category: "Sports",
      sales: 41000,
      color: "var(--color-chartPrimaryFill)",
    },
    {
      category: "Books",
      sales: 22000,
      color: "var(--color-chartSecondaryFill)",
    },
  ];

  return (
    <Card
      id="verticalBarChart"
      className="w-full h-full"
      title={t("verticalBarChart")}
      padding="px-9"
      isHeaderDividerVisible
      addTitleMargin
    >
      <div className="h-64 xsm:h-80 1xl:h-96 3xl:h-112 w-full mt-4">
        <ResponsiveContainer
          width="100%"
          height="100%"
          initialDimension={{ width: 320, height: 200 }}
        >
          <BarChart
            data={chartdata}
            margin={{
              top: 20,
              right: windowWidth > BREAKPOINTS.md ? 30 : 10,
              left: windowWidth > BREAKPOINTS.md ? 20 : 5,
              bottom: 20,
            }}
            barSize={
              windowWidth > BREAKPOINTS["1xl"]
                ? 40
                : windowWidth > BREAKPOINTS.sm
                  ? 32
                  : windowWidth > BREAKPOINTS.xsm
                    ? 26
                    : 16
            }
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={"var(--color-chartPrimaryGrid)"}
            />
            <XAxis
              dataKey="category"
              axisLine={{ stroke: "var(--color-chartAxisLine)" }}
              tickLine={false}
              tick={{ fill: "var(--color-chartAxisText)", fontSize: 12 }}
            />
            <YAxis
              axisLine={{ stroke: "var(--color-chartAxisLine)" }}
              tickLine={false}
              tick={{ fill: "var(--color-chartAxisText)", fontSize: 12 }}
              tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`}
            />
            <Tooltip
              content={<VerticalBarTooltip />}
              cursor={{
                fill: "rgba(255, 255, 255, 0.02)",
                stroke: "var(--color-chartVerticalLine)",
              }}
              isAnimationActive={false}
            />
            <Bar
              dataKey="sales"
              name="Sales"
              radius={[8, 8, 0, 0]}
              fill={"var(--color-chartPrimaryFill)"}
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
