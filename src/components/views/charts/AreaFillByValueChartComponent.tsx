"use client";

import { useTranslations } from "next-intl";
import {
  Area,
  AreaChart,
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
import { cn } from "@/utils/classNames";

/** Data point structure for profit/loss chart. */
interface DataPoint {
  name: string;
  value: number;
}

/** Props for fill-by-value chart tooltip component. */
interface FillByValueTooltipProps {
  active?: boolean;
  payload?: Array<{
    payload: DataPoint;
    value: number;
  }>;
  label?: string;
  positiveColor: string;
  negativeColor: string;
}

/** Props for profit/loss legend component. */
interface CustomLegendProps {
  positiveColor: string;
  negativeColor: string;
}

/**
 * Custom legend showing profit and loss colors.
 *
 * @component
 */
const CustomLegend = ({ positiveColor, negativeColor }: CustomLegendProps) => {
  return (
    <div
      className="flex flex-row justify-end text-white w-full mb-6 whitespace-nowrap"
      style={{ gap: "1rem" }}
    >
      <div className="flex items-center">
        <div
          className="w-3 h-3 mr-2"
          style={{ backgroundColor: positiveColor }}
        />
        <span className="text-sm text-primaryText">Profit</span>
      </div>
      <div className="flex items-center">
        <div
          className="w-3 h-3 mr-2"
          style={{ backgroundColor: negativeColor }}
        />
        <span className="text-sm text-primaryText">Loss</span>
      </div>
    </div>
  );
};

/**
 * Custom tooltip displaying P&L value with color coding.
 *
 * @component
 */
const FillByValueTooltip = ({
  active,
  payload,
  label,
  positiveColor,
  negativeColor,
}: FillByValueTooltipProps) => {
  if (!active || !payload || payload.length === 0) return null;

  const value = payload[0].value;
  const isPositive = value >= 0;

  return (
    <BaseTooltip title={label ?? ""}>
      <p className="px-3 pb-1 text-primaryText flex items-center justify-between">
        <span>
          <span
            className="w-2 h-2 mr-2 rounded inline-block"
            style={{
              backgroundColor: isPositive ? positiveColor : negativeColor,
            }}
          />
          P&L:
        </span>
        <span className="pl-[0.7rem]">
          {isPositive ? "+" : ""}
          {Intl.NumberFormat("us").format(value)}
        </span>
      </p>
    </BaseTooltip>
  );
};

/**
 * Area chart with gradient fill based on positive/negative values.
 * Uses split colors to show profit and loss regions.
 *
 * @component
 */
export const AreaFillByValueChartComponent = () => {
  const t = useTranslations("charts");
  const { width: windowWidth } = useWindowDimensions();
  const { shouldAnimate, animationBegin, isReady } =
    useChartAnimation("charts");

  const positiveColor = "var(--color-chartPrimaryFill)";
  const negativeColor = "var(--color-chartSecondaryFill)";

  const chartdata: DataPoint[] = [
    { name: "Jan", value: 4200 },
    { name: "Feb", value: 3100 },
    { name: "Mar", value: -1500 },
    { name: "Apr", value: -2800 },
    { name: "May", value: 1800 },
    { name: "Jun", value: 5200 },
    { name: "Jul", value: 3900 },
    { name: "Aug", value: -900 },
  ];

  const dataMax = Math.max(...chartdata.map((i) => i.value));
  const dataMin = Math.min(...chartdata.map((i) => i.value));

  const gradientOffset = () => {
    if (dataMax <= 0) return 0;
    if (dataMin >= 0) return 1;
    return dataMax / (dataMax - dataMin);
  };

  const off = gradientOffset();

  return (
    <Card id="areaFillByValue" className="w-full h-full">
      <CardHeader
        variant="divider"
        className={cn(
          "px-9",
          windowWidth !== 0 && windowWidth < BREAKPOINTS.xsm && "mb-0",
        )}
      >
        <CardTitle>{t("areaFillByValueChart")}</CardTitle>
      </CardHeader>
      <CardContent className="px-9">
        <div className="h-72 xsm:h-80 1xl:h-96 3xl:h-112 w-full">
          <ResponsiveContainer
            width="100%"
            height="100%"
            initialDimension={{ width: 320, height: 200 }}
          >
            <AreaChart
              accessibilityLayer={false}
              data={isReady ? chartdata : []}
              margin={{
                top: 20,
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
                tickFormatter={(value) => Intl.NumberFormat("us").format(value)}
              />
              <Tooltip
                content={
                  <FillByValueTooltip
                    positiveColor={positiveColor}
                    negativeColor={negativeColor}
                  />
                }
                isAnimationActive={false}
                cursor={{
                  fill: "rgba(255,255,255,0.05)",
                  stroke: "var(--color-chartVerticalLine)",
                }}
              />
              <Legend
                verticalAlign="top"
                align="center"
                content={
                  <CustomLegend
                    positiveColor={positiveColor}
                    negativeColor={negativeColor}
                  />
                }
              />
              <defs>
                <linearGradient id="splitColor" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="0"
                    stopColor={positiveColor}
                    stopOpacity={0.8}
                  />
                  <stop
                    offset={off}
                    stopColor={positiveColor}
                    stopOpacity={0.1}
                  />
                  <stop
                    offset={off}
                    stopColor={negativeColor}
                    stopOpacity={0.1}
                  />
                  <stop
                    offset="1"
                    stopColor={negativeColor}
                    stopOpacity={0.8}
                  />
                </linearGradient>
              </defs>
              <Area
                type="monotone"
                dataKey="value"
                stroke="rgba(255,255,255,0.5)"
                strokeWidth={2}
                fill="url(#splitColor)"
                isAnimationActive={shouldAnimate}
                animationBegin={animationBegin}
                animationDuration={800}
                animationEasing="ease-out"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
