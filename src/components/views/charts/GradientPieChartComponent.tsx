"use client";

import { PieChart, Pie, Sector, Tooltip, Legend, ResponsiveContainer, Cell } from "recharts";
import { useTheme } from "next-themes";
import { useTranslations } from "next-intl";
import { useState } from "react";

import { Card } from "../../common/Card";
import { BaseTooltip } from "../../common/BaseTooltip";
import { useChartColors } from "../../../hooks/useChartColors";
import { useChartAnimation } from "../../../hooks/useChartAnimation";

/** Data point structure for gradient pie chart. */
interface DataPoint {
  name: string;
  value: number;
  color: string;
}

/** Props for gradient pie chart tooltip component. */
interface GradientPieTooltipProps {
  active?: boolean;
  payload?: Array<{
    payload: DataPoint;
    value: number;
    name: string;
  }>;
}

/** Props for gradient pie chart legend component. */
interface PieLegendProps {
  payload?: Array<{
    value: string;
    color?: string;
  }>;
  colors: string[];
}

/**
 * Custom legend with rounded color indicators.
 *
 * @component
 */
const PieCustomLegend = ({ payload, colors }: PieLegendProps) => {
  return (
    <div className="flex flex-row justify-center gap-4 text-white w-full mt-2 flex-wrap">
      {payload?.map((entry, index) => (
        <div key={`legend-${index}`} className="flex items-center">
          <div
            className="w-3 h-3 mr-2 rounded-full"
            style={{ backgroundColor: colors[index % colors.length] }}
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
 * Custom tooltip displaying segment value.
 *
 * @component
 */
const GradientPieTooltip = ({ active, payload }: GradientPieTooltipProps) => {
  if (!active || !payload || payload.length === 0) return null;

  const data = payload[0];
  const color = data.payload.color;

  return (
    <BaseTooltip title={data.name}>
      <p className="px-3 pb-1 text-primaryText flex items-center justify-between">
        <span>
          <span
            className="w-2 h-2 mr-2 rounded inline-block"
            style={{ backgroundColor: color }}
          />
          Value:
        </span>
        <span className="pl-[0.7rem]">
          {Intl.NumberFormat("us").format(data.value)}
        </span>
      </p>
    </BaseTooltip>
  );
};

/** Props for active sector shape rendering. */
interface ActiveShapeProps {
  cx: number;
  cy: number;
  innerRadius: number;
  outerRadius: number;
  startAngle: number;
  endAngle: number;
  fill: string;
  payload: DataPoint;
  index: number;
}

/**
 * Creates renderer for expanded active pie sector with gradient.
 */
const createActiveShapeRenderer = (colors: string[]) => (props: ActiveShapeProps) => {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, index } = props;
  const color = colors[index % colors.length];

  return (
    <g>
      <defs>
        <radialGradient
          id={`activeGradient${index}`}
          cx="50%"
          cy="50%"
          r="50%"
        >
          <stop offset="0%" stopColor={color} stopOpacity={0.4} />
          <stop offset="100%" stopColor={color} stopOpacity={1} />
        </radialGradient>
      </defs>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius - 5}
        outerRadius={outerRadius + 10}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={`url(#activeGradient${index})`}
        stroke={color}
        strokeWidth={2}
      />
    </g>
  );
};

/**
 * Donut chart with radial gradient fills and hover expansion.
 * Uses interactive active sector highlighting.
 *
 * @component
 */
export const GradientPieChartComponent = () => {
  const t = useTranslations("charts");
  const { theme } = useTheme();
  const chartColors = useChartColors(theme as "dark" | "light");
  const { shouldAnimate, animationBegin } = useChartAnimation("charts");
  const [activeIndex, setActiveIndex] = useState<number | undefined>(undefined);

  const COLORS = [
    chartColors.primary.fill,
    chartColors.secondary.fill,
    "rgb(168, 162, 255)",
    "rgb(100, 200, 180)",
  ];

  const chartdata: DataPoint[] = [
    { name: "Electronics", value: 4500, color: COLORS[0] },
    { name: "Clothing", value: 3200, color: COLORS[1] },
    { name: "Home & Garden", value: 2800, color: COLORS[2] },
    { name: "Sports", value: 1900, color: COLORS[3] },
  ];

  const onPieEnter = (_: unknown, index: number) => {
    setActiveIndex(index);
  };

  const onPieLeave = () => {
    setActiveIndex(undefined);
  };

  return (
    <Card
      className="w-full h-full"
      title={t("gradientPieChart")}
      padding="px-9"
      isHeaderDividerVisible
      addTitleMargin
    >
      <div className="h-80 1xl:h-96 3xl:h-[28rem] w-full flex items-center justify-center">
        <ResponsiveContainer
          width="100%"
          height="100%"
          initialDimension={{ width: 320, height: 200 }}
        >
          <PieChart>
            <defs>
              {COLORS.map((color, index) => (
                <radialGradient
                  key={`gradient${index}`}
                  id={`pieGradient${index}`}
                  cx="50%"
                  cy="50%"
                  r="50%"
                >
                  <stop offset="0%" stopColor={color} stopOpacity={0.7} />
                  <stop offset="100%" stopColor={color} stopOpacity={1} />
                </radialGradient>
              ))}
            </defs>
            <Pie
              data={chartdata}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius="30%"
              outerRadius="70%"
              paddingAngle={3}
              activeIndex={activeIndex}
              activeShape={createActiveShapeRenderer(COLORS) as unknown as ((props: unknown) => JSX.Element)}
              onMouseEnter={onPieEnter}
              onMouseLeave={onPieLeave}
              isAnimationActive={shouldAnimate}
              animationBegin={animationBegin}
              animationDuration={800}
              animationEasing="ease-out"
            >
              {chartdata.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={`url(#pieGradient${index})`}
                  stroke={COLORS[index % COLORS.length]}
                  strokeWidth={1}
                />
              ))}
            </Pie>
            <Tooltip content={<GradientPieTooltip />} isAnimationActive={false} />
            <Legend
              verticalAlign="bottom"
              height={36}
              content={<PieCustomLegend colors={COLORS} />}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};
