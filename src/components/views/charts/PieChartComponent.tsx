"use client";

import { useTranslations } from "next-intl";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

import { useChartAnimation } from "../../../hooks/useChartAnimation";
import { useWindowDimensions } from "../../../hooks/useWindowDimensions";
import { BREAKPOINTS } from "../../../styles/breakpoints";
import { BaseTooltip } from "../../common/BaseTooltip";
import { Card } from "../../common/Card";

/** Data point structure for pie chart segments. */
interface DataPoint {
  name: string;
  value: number;
  percentage: number;
  color: string;
}

/** Props for pie chart tooltip component. */
interface PieTooltipProps {
  active?: boolean;
  payload?: Array<{
    payload: DataPoint;
  }>;
}

/** Props for pie chart legend component. */
interface PieLegendProps {
  payload?: Array<{
    value: string;
    color?: string;
  }>;
  windowWidth?: number;
}

/**
 * Custom tooltip displaying sales value and percentage share.
 *
 * @component
 */
const PieTooltip = ({ active, payload }: PieTooltipProps) => {
  if (!active || !payload || payload.length === 0) return null;

  const data = payload[0].payload;
  const color = data.color;

  return (
    <BaseTooltip title={data.name}>
      <p className="px-3 pb-1 text-primaryText flex items-center justify-between">
        <span>
          <span
            className="w-2 h-2 mr-2 rounded inline-block"
            style={{ backgroundColor: color }}
          />
          Sales:
        </span>
        <span className="pl-[0.7rem]">
          ${Intl.NumberFormat("us").format(data.value)}
        </span>
      </p>
    </BaseTooltip>
  );
};

/**
 * Custom legend with rounded color indicators.
 *
 * @component
 */
const PieCustomLegend = ({ payload, windowWidth = 0 }: PieLegendProps) => {
  if (!payload) return null;

  const renderItem = (
    entry: { value: string; color?: string },
    index: number,
  ) => (
    <div key={`legend-${index}`} className="flex items-center">
      <div
        className="w-3 h-3 mr-2 rounded-full"
        style={{ backgroundColor: entry.color }}
      />
      <span className="text-xs 1xl:text-sm text-primaryText">
        {entry.value}
      </span>
    </div>
  );

  if (windowWidth > 0 && windowWidth < BREAKPOINTS["2xl"]) {
    return (
      <div className="flex flex-col items-center gap-2 text-white w-full mt-4 whitespace-nowrap">
        <div className="flex flex-row justify-center gap-8">
          {[4, 1, 0].map((i) => payload[i] && renderItem(payload[i], i))}
        </div>
        <div className="flex flex-row justify-center gap-8">
          {[2, 3].map((i) => payload[i] && renderItem(payload[i], i))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-row justify-center gap-8 text-white w-full mt-4 whitespace-nowrap">
      {payload.map((entry, index) => renderItem(entry, index))}
    </div>
  );
};

/**
 * Pie chart displaying sales distribution by product category.
 * Uses Recharts with custom tooltip and legend.
 *
 * @component
 */
export const PieChartComponent = () => {
  const t = useTranslations("charts");
  const { shouldAnimate, animationBegin } = useChartAnimation("charts");
  const { width: windowWidth } = useWindowDimensions();

  const COLORS = [
    "var(--color-chartPrimaryFill)",
    "var(--color-chartSecondaryFill)",
    "rgb(168, 162, 255)",
    "rgb(100, 200, 180)",
    "rgb(255, 150, 150)",
  ];

  const chartdata: DataPoint[] = [
    { name: "Electronics", value: 245000, percentage: 35, color: COLORS[0] },
    { name: "Clothing", value: 175000, percentage: 25, color: COLORS[1] },
    { name: "Home & Garden", value: 140000, percentage: 20, color: COLORS[2] },
    { name: "Sports", value: 84000, percentage: 12, color: COLORS[3] },
    { name: "Books", value: 56000, percentage: 8, color: COLORS[4] },
  ];

  return (
    <Card
      id="pieChart"
      className="w-full h-full"
      title={t("pieChart")}
      padding="px-9"
      isHeaderDividerVisible
      addTitleMargin
    >
      <div className="h-64 xsm:h-80 1xl:h-96 3xl:h-112 w-full flex items-center justify-center">
        <ResponsiveContainer
          width="100%"
          height="100%"
          initialDimension={{ width: 320, height: 200 }}
        >
          <PieChart>
            <Pie
              data={chartdata}
              cx="50%"
              cy="45%"
              labelLine={false}
              label={
                windowWidth > 0 && windowWidth < BREAKPOINTS.sm
                  ? false
                  : (props) => {
                      const p = props as unknown as DataPoint & {
                        cx: number;
                        cy: number;
                        midAngle: number;
                        outerRadius: number;
                      };
                      const RADIAN = Math.PI / 180;
                      const r = p.outerRadius + 15;
                      const x = p.cx + r * Math.cos(-p.midAngle * RADIAN);
                      const y = p.cy + r * Math.sin(-p.midAngle * RADIAN);
                      return (
                        <text
                          x={x}
                          y={y}
                          fill="rgba(255,255,255,0.85)"
                          textAnchor={x > p.cx ? "start" : "end"}
                          dominantBaseline="central"
                          fontSize={windowWidth < BREAKPOINTS["2xl"] ? 10 : 12}
                        >
                          {`${p.name} ${p.percentage}%`}
                        </text>
                      );
                    }
              }
              outerRadius={
                windowWidth === 0 || windowWidth >= BREAKPOINTS["2xl"]
                  ? 120
                  : 84
              }
              fill="#8884d8"
              dataKey="value"
              stroke="none"
              strokeWidth={0}
              isAnimationActive={shouldAnimate}
              animationBegin={animationBegin}
              animationDuration={800}
              animationEasing="ease-out"
            >
              {chartdata.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
              ))}
            </Pie>
            <Tooltip content={<PieTooltip />} isAnimationActive={false} />
            <Legend
              verticalAlign="bottom"
              height={
                windowWidth > 0 && windowWidth < BREAKPOINTS["2xl"] ? 56 : 36
              }
              content={<PieCustomLegend windowWidth={windowWidth} />}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};
