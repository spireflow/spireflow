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

import { BaseTooltip } from "@/components/common/BaseTooltip";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/common/shadcn/card";
import { useChartAnimation } from "@/hooks/useChartAnimation";
import { useWindowDimensions } from "@/hooks/useWindowDimensions";
import { BREAKPOINTS } from "@/styles/breakpoints";

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
  const { width: windowWidth } = useWindowDimensions();
  const t = useTranslations("singleCharts.bars");
  const { shouldAnimate, animationBegin, isReady } =
    useChartAnimation("charts");

  const barChartData = [
    {
      name: "Q1 2023",
      widgets: 745,
      gadgets: 523,
      modules: 634,
      components: 478,
      kits: 365,
      accessories: 598,
    },
    {
      name: "Q2 2023",
      widgets: 812,
      gadgets: 436,
      modules: 587,
      components: 519,
      kits: 402,
      accessories: 670,
    },
    {
      name: "Q3 2023",
      widgets: 670,
      gadgets: 489,
      modules: 456,
      components: 432,
      kits: 389,
      accessories: 722,
    },
    {
      name: "Q4 2023",
      widgets: 693,
      gadgets: 575,
      modules: 563,
      components: 499,
      kits: 416,
      accessories: 655,
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
    <Card className="w-full pt-11 pb-6">
      <CardHeader variant="divider" className="px-6 md:px-20">
        <CardTitle>{t("title")}</CardTitle>
      </CardHeader>
      <CardContent className="px-6 md:px-20">
        <div className="h-64 1xl:h-80 w-full">
          <ResponsiveContainer
            width="100%"
            height="100%"
            initialDimension={{ width: 320, height: 200 }}
          >
            <BarChart
              accessibilityLayer={false}
              data={isReady ? barChartData : []}
              margin={{
                top: 10,
                right: windowWidth > BREAKPOINTS.md ? 30 : 10,
                left: windowWidth > BREAKPOINTS.md ? 20 : 5,
                bottom: 5,
              }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke={"var(--color-chartPrimaryGrid)"}
              />
              <XAxis
                dataKey="name"
                axisLine={{ stroke: "var(--color-chartAxisLine)" }}
                tickLine={false}
                tick={{ fill: "var(--color-chartAxisText)", fontSize: 12 }}
              />
              <YAxis
                axisLine={{ stroke: "var(--color-chartAxisLine)" }}
                tickLine={false}
                tick={{ fill: "var(--color-chartAxisText)", fontSize: 12 }}
                tickFormatter={(value) =>
                  `$${Intl.NumberFormat("us").format(value)}`
                }
                width={60}
              />
              <Tooltip
                content={<BarTooltip />}
                cursor={{
                  fill: "rgba(255,255,255,0.05)",
                  stroke: "var(--color-chartVerticalLine)",
                }}
                isAnimationActive={false}
              />
              <Legend
                verticalAlign="top"
                align="center"
                content={<CustomLegend />}
              />
              <Bar
                dataKey="widgets"
                name="Widgets"
                fill={barColors[0]}
                radius={[4, 4, 0, 0]}
                isAnimationActive={shouldAnimate}
                animationBegin={animationBegin}
                animationDuration={800}
                animationEasing="ease-out"
              />
              <Bar
                dataKey="gadgets"
                name="Gadgets"
                fill={barColors[1]}
                radius={[4, 4, 0, 0]}
                isAnimationActive={shouldAnimate}
                animationBegin={animationBegin}
                animationDuration={800}
                animationEasing="ease-out"
              />
              <Bar
                dataKey="modules"
                name="Modules"
                fill={barColors[2]}
                radius={[4, 4, 0, 0]}
                isAnimationActive={shouldAnimate}
                animationBegin={animationBegin}
                animationDuration={800}
                animationEasing="ease-out"
              />
              <Bar
                dataKey="components"
                name="Components"
                fill={barColors[3]}
                radius={[4, 4, 0, 0]}
                isAnimationActive={shouldAnimate}
                animationBegin={animationBegin}
                animationDuration={800}
                animationEasing="ease-out"
              />
              <Bar
                dataKey="kits"
                name="Kits"
                fill={barColors[4]}
                radius={[4, 4, 0, 0]}
                isAnimationActive={shouldAnimate}
                animationBegin={animationBegin}
                animationDuration={800}
                animationEasing="ease-out"
              />
              <Bar
                dataKey="accessories"
                name="Accessories"
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
      </CardContent>
    </Card>
  );
};
