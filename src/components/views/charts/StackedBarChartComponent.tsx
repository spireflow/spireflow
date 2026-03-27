"use client";

import { useTranslations } from "next-intl";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { useChartAnimation } from "../../../hooks/useChartAnimation";
import { useWindowDimensions } from "../../../hooks/useWindowDimensions";
import { BREAKPOINTS } from "../../../styles/breakpoints";
import { BaseTooltip } from "../../common/BaseTooltip";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../common/shadcn/card";

/** Data point structure for stacked bar chart. */
interface DataPoint {
  day: string;
  desktop: number;
  mobile: number;
  tablet: number;
}

/** Props for stacked chart tooltip component. */
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

/** Props for stacked chart legend component. */
interface StackedLegendProps {
  payload?: Array<{
    value: string;
    color?: string;
  }>;
}

/**
 * Custom tooltip displaying device breakdown with total.
 *
 * @component
 */
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

/**
 * Custom legend with colored indicators.
 *
 * @component
 */
const StackedCustomLegend = ({ payload }: StackedLegendProps) => {
  return (
    <div className="flex flex-row justify-center gap-8 text-white w-full mt-4 whitespace-nowrap">
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
 * Stacked bar chart showing daily traffic by device type.
 * Uses Recharts with stacked bars for desktop, mobile, and tablet.
 *
 * @component
 */
export const StackedBarChartComponent = () => {
  const t = useTranslations("charts");
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
    <Card id="stackedBarChart" className="w-full h-full">
      <CardHeader variant="divider" className="px-9">
        <CardTitle>{t("stackedBarChart")}</CardTitle>
      </CardHeader>
      <CardContent className="px-9">
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
                bottom: 5,
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
                dataKey="day"
                axisLine={{ stroke: "var(--color-chartAxisLine)" }}
                tickLine={false}
                tick={{ fill: "var(--color-chartAxisText)", fontSize: 12 }}
              />
              <YAxis
                axisLine={{ stroke: "var(--color-chartAxisLine)" }}
                tickLine={false}
                tick={{ fill: "var(--color-chartAxisText)", fontSize: 12 }}
                tickFormatter={(value) => `${(value / 1000).toFixed(0)}K`}
              />
              <Tooltip
                content={<StackedTooltip />}
                cursor={{
                  fill: "rgba(255, 255, 255, 0.02)",
                  stroke: "var(--color-chartVerticalLine)",
                }}
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
                fill={"var(--color-chartPrimaryFill)"}
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
                fill={"var(--color-chartSecondaryFill)"}
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
      </CardContent>
    </Card>
  );
};
