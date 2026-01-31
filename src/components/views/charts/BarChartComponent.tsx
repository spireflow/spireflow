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

import { BaseTooltip } from "../../common/BaseTooltip";
import { useChartColors } from "../../../hooks/useChartColors";
import { useWindowDimensions } from "../../../hooks/useWindowDimensions";
import { Card } from "../../common/Card";
import { useChartAnimation } from "../../../hooks/useChartAnimation";

/** Tooltip payload item structure. */
interface TooltipPayload {
  dataKey: string;
  name?: string;
  value?: number;
  color?: string;
}

/** Props for bar chart tooltip component. */
interface BarTooltipProps {
  active?: boolean;
  payload?: TooltipPayload[];
  label?: string;
}

/**
 * Custom tooltip displaying product category sales data.
 *
 * @component
 */
const BarTooltip = ({ active, payload, label }: BarTooltipProps) => {
  if (!active || !payload || payload.length === 0 || !label) return null;

  return (
    <BaseTooltip title={label}>
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
            {`${entry.name}: `}
          </span>
          <span className="pl-[0.7rem]">
            $ {Intl.NumberFormat("us").format(entry.value ?? 0)}
          </span>
        </p>
      ))}
    </BaseTooltip>
  );
};

/** Props for custom legend component. */
interface CustomLegendProps {
  payload?: Array<{
    value: string;
    color: string;
  }>;
}

/**
 * Custom legend with colored indicators.
 *
 * @component
 */
const CustomLegend = ({ payload }: CustomLegendProps) => {
  return (
    <div className="flex flex-row flex-wrap justify-center gap-4 md:gap-8 text-white w-full mb-6">
      {payload?.map((entry, index) => (
        <div key={`legend-${index}`} className="flex items-center">
          <div
            className="w-3 h-3 mr-2"
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-sm text-primaryText">{entry.value}</span>
        </div>
      ))}
    </div>
  );
};

/**
 * Grouped bar chart showing quarterly sales by product category.
 * Uses Recharts with multiple colored bars per data point.
 *
 * @component
 */
export const BarChartComponent = () => {
  const { theme } = useTheme();
  const chartColors = useChartColors(theme as "dark" | "light");
  const { width: windowWidth } = useWindowDimensions();
  const t = useTranslations("singleCharts.bars");
  const { shouldAnimate, animationBegin } = useChartAnimation("charts");

  const barChartData = [
    {
      name: "Q1 2023",
      [t("widgets")]: 745,
      [t("gadgets")]: 523,
      [t("modules")]: 634,
      [t("components")]: 478,
      [t("kits")]: 365,
      [t("accessories")]: 598,
    },
    {
      name: "Q2 2023",
      [t("widgets")]: 812,
      [t("gadgets")]: 436,
      [t("modules")]: 587,
      [t("components")]: 519,
      [t("kits")]: 402,
      [t("accessories")]: 670,
    },
    {
      name: "Q3 2023",
      [t("widgets")]: 670,
      [t("gadgets")]: 489,
      [t("modules")]: 456,
      [t("components")]: 432,
      [t("kits")]: 389,
      [t("accessories")]: 722,
    },
    {
      name: "Q4 2023",
      [t("widgets")]: 693,
      [t("gadgets")]: 575,
      [t("modules")]: 563,
      [t("components")]: 499,
      [t("kits")]: 416,
      [t("accessories")]: 655,
    },
  ];

  const barColors = [
    "#3b82f6", // blue
    "#14b8a6", // teal
    "#f59e0b", // amber
    "#f43f5e", // rose
    "#6366f1", // indigo
    "#10b981", // emerald
  ];

  return (
    <Card
      className="w-full pt-11 pb-6"
      title={t("title")}
      padding="px-6 md:px-20"
      isHeaderDividerVisible
      addTitleMargin
    >
      <div className="h-64 1xl:h-80 w-full">
        <ResponsiveContainer
          width="100%"
          height="100%"
          initialDimension={{ width: 320, height: 200 }}
        >
          <BarChart
            data={barChartData}
            margin={{
              top: 10,
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
              dataKey="name"
              stroke="rgba(255,255,255,0.1)"
              tick={{ fill: "rgba(255,255,255,0.65)", fontSize: 12 }}
            />
            <YAxis
              stroke="rgba(255,255,255,0.1)"
              tick={{ fill: "rgba(255,255,255,0.65)", fontSize: 12 }}
              tickFormatter={(value) =>
                `$${Intl.NumberFormat("us").format(value)}`
              }
              width={60}
            />
            <Tooltip
              content={<BarTooltip />}
              cursor={{ fill: "rgba(255,255,255,0.05)", stroke: "var(--color-chartVerticalLine)" }}
              isAnimationActive={false}
            />
            <Legend
              verticalAlign="top"
              align="center"
              content={<CustomLegend />}
            />
            <Bar
              dataKey={t("widgets")}
              fill={barColors[0]}
              radius={[4, 4, 0, 0]}
              isAnimationActive={shouldAnimate}
              animationBegin={animationBegin}
              animationDuration={800}
              animationEasing="ease-out"
            />
            <Bar
              dataKey={t("gadgets")}
              fill={barColors[1]}
              radius={[4, 4, 0, 0]}
              isAnimationActive={shouldAnimate}
              animationBegin={animationBegin}
              animationDuration={800}
              animationEasing="ease-out"
            />
            <Bar
              dataKey={t("modules")}
              fill={barColors[2]}
              radius={[4, 4, 0, 0]}
              isAnimationActive={shouldAnimate}
              animationBegin={animationBegin}
              animationDuration={800}
              animationEasing="ease-out"
            />
            <Bar
              dataKey={t("components")}
              fill={barColors[3]}
              radius={[4, 4, 0, 0]}
              isAnimationActive={shouldAnimate}
              animationBegin={animationBegin}
              animationDuration={800}
              animationEasing="ease-out"
            />
            <Bar
              dataKey={t("kits")}
              fill={barColors[4]}
              radius={[4, 4, 0, 0]}
              isAnimationActive={shouldAnimate}
              animationBegin={animationBegin}
              animationDuration={800}
              animationEasing="ease-out"
            />
            <Bar
              dataKey={t("accessories")}
              fill={barColors[5]}
              radius={[4, 4, 0, 0]}
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
