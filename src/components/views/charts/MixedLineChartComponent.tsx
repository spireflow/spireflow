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

/** Data point structure for mixed line chart. */
interface DataPoint {
  month: string;
  organic: number;
  paid: number;
  referral: number;
}

/** Props for mixed line chart tooltip component. */
interface MixedLineTooltipProps {
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
 * Custom tooltip displaying traffic source breakdown.
 *
 * @component
 */
const MixedLineTooltip = ({
  active,
  payload,
  label,
}: MixedLineTooltipProps) => {
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
            {Intl.NumberFormat("us").format(entry.value)}
          </span>
        </p>
      ))}
    </BaseTooltip>
  );
};

/** Props for mixed line chart legend component. */
interface MixedLineLegendProps {
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
const MixedLineCustomLegend = ({ payload }: MixedLineLegendProps) => {
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
 * Multi-line chart showing traffic sources over time.
 * Displays organic, paid, and referral traffic trends.
 *
 * @component
 */
export const MixedLineChartComponent = () => {
  const t = useTranslations("charts");
  const { width: windowWidth } = useWindowDimensions();
  const { shouldAnimate, animationBegin } = useChartAnimation("charts");

  const chartdata: DataPoint[] = [
    { month: "Jan", organic: 3400, paid: 1200, referral: 800 },
    { month: "Feb", organic: 3800, paid: 1400, referral: 900 },
    { month: "Mar", organic: 4200, paid: 1600, referral: 1100 },
    { month: "Apr", organic: 3900, paid: 1800, referral: 950 },
    { month: "May", organic: 4500, paid: 2100, referral: 1300 },
    { month: "Jun", organic: 5100, paid: 2400, referral: 1500 },
  ];

  return (
    <Card
      className="w-full h-full"
      title={t("mixedLineChart")}
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
          <LineChart
            data={chartdata}
            margin={{
              top: 20,
              right: windowWidth > BREAKPOINTS.md ? 30 : 10,
              left: windowWidth > BREAKPOINTS.md ? 20 : 5,
              bottom: 20,
            }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={"var(--color-chartPrimaryGrid)"}
            />
            <XAxis
              dataKey="month"
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
              content={<MixedLineTooltip />}
              cursor={{ stroke: "var(--color-chartVerticalLine)" }}
              isAnimationActive={false}
            />
            <Legend
              iconType="line"
              wrapperStyle={{ paddingTop: "2rem" }}
              content={<MixedLineCustomLegend />}
            />
            <Line
              type="monotone"
              dataKey="organic"
              stroke={"var(--color-chartPrimaryFill)"}
              strokeWidth={2}
              name="Organic"
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
              isAnimationActive={shouldAnimate}
              animationBegin={animationBegin}
              animationDuration={800}
              animationEasing="ease-out"
            />
            <Line
              type="monotone"
              dataKey="paid"
              stroke={"var(--color-chartSecondaryFill)"}
              strokeWidth={2}
              name="Paid Ads"
              dot={{ r: 4, fill: "var(--color-chartSecondaryFill)" }}
              activeDot={{ r: 6 }}
              isAnimationActive={shouldAnimate}
              animationBegin={animationBegin}
              animationDuration={800}
              animationEasing="ease-out"
            />
            <Line
              type="monotone"
              dataKey="referral"
              stroke="rgb(168, 162, 255)"
              strokeWidth={2}
              name="Referral"
              dot={{ r: 4, fill: "rgb(168, 162, 255)" }}
              activeDot={{ r: 6 }}
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
