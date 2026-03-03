"use client";

import { useTranslations } from "next-intl";
import type { PieSectorShapeProps } from "recharts";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Sector,
  Tooltip,
} from "recharts";

import { useChartAnimation } from "../../../hooks/useChartAnimation";
import { useWindowDimensions } from "../../../hooks/useWindowDimensions";
import { BREAKPOINTS } from "../../../styles/breakpoints";
import { BaseTooltip } from "../../common/BaseTooltip";
import { Card } from "../../common/Card";

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
  windowWidth?: number;
}

/**
 * Custom legend with rounded color indicators.
 *
 * @component
 */
const PieCustomLegend = ({
  payload,
  colors,
  windowWidth = 0,
}: PieLegendProps) => {
  if (!payload) return null;

  const renderItem = (
    entry: { value: string; color?: string },
    index: number,
  ) => (
    <div key={`legend-${index}`} className="flex items-center">
      <div
        className="w-3 h-3 mr-2 rounded-full"
        style={{ backgroundColor: colors[index % colors.length] }}
      />
      <span className="text-xs 1xl:text-sm text-primaryText">
        {entry.value}
      </span>
    </div>
  );

  if (windowWidth > 0 && windowWidth < BREAKPOINTS.xsm) {
    return (
      <div className="flex flex-col items-center gap-2 text-white w-full mt-2">
        <div className="flex flex-row justify-center gap-4">
          {payload.slice(0, 2).map((entry, index) => renderItem(entry, index))}
        </div>
        <div className="flex flex-row justify-center gap-4">
          {payload
            .slice(2, 4)
            .map((entry, index) => renderItem(entry, index + 2))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-row justify-center gap-4 text-white w-full mt-2 whitespace-nowrap">
      {payload.map((entry, index) => renderItem(entry, index))}
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

/**
 * Creates renderer for pie sectors with expanded active state.
 */
const createPieShapeRenderer =
  (colors: string[]) => (props: PieSectorShapeProps) => {
    const {
      cx,
      cy,
      innerRadius,
      outerRadius,
      startAngle,
      endAngle,
      fill,
      stroke,
      strokeWidth,
      isActive,
      index,
    } = props;

    if (!isActive) {
      return (
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
          stroke={stroke}
          strokeWidth={strokeWidth}
        />
      );
    }

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
  const { shouldAnimate, animationBegin } = useChartAnimation("charts");
  const { width: windowWidth } = useWindowDimensions();

  const COLORS = [
    "var(--color-chartPrimaryFill)",
    "var(--color-chartSecondaryFill)",
    "rgb(168, 162, 255)",
    "rgb(100, 200, 180)",
  ];

  const chartdata: DataPoint[] = [
    { name: "Electronics", value: 4500, color: COLORS[0] },
    { name: "Clothing", value: 3200, color: COLORS[1] },
    { name: "Home & Garden", value: 2800, color: COLORS[2] },
    { name: "Sports", value: 1900, color: COLORS[3] },
  ];

  return (
    <Card
      className="w-full h-full"
      title={t("gradientPieChart")}
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
              shape={createPieShapeRenderer(COLORS)}
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
            <Tooltip
              content={<GradientPieTooltip />}
              isAnimationActive={false}
            />
            <Legend
              verticalAlign="bottom"
              height={
                windowWidth > 0 && windowWidth < BREAKPOINTS.xsm ? 56 : 36
              }
              content={
                <PieCustomLegend colors={COLORS} windowWidth={windowWidth} />
              }
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};
