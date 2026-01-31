"use client";

import {
  RadialBarChart,
  RadialBar,
  Legend,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { useTheme } from "next-themes";
import { useTranslations } from "next-intl";

import { Card } from "../../common/Card";
import { BaseTooltip } from "../../common/BaseTooltip";
import { useChartColors } from "../../../hooks/useChartColors";
import { useChartAnimation } from "../../../hooks/useChartAnimation";

/** Data point structure for radial bar chart. */
interface DataPoint {
  name: string;
  value: number;
  fill: string;
}

/** Props for radial bar chart tooltip component. */
interface RadialTooltipProps {
  active?: boolean;
  payload?: Array<{
    payload: DataPoint;
  }>;
}

/**
 * Custom tooltip displaying performance percentage.
 *
 * @component
 */
const RadialTooltip = ({ active, payload }: RadialTooltipProps) => {
  if (!active || !payload || payload.length === 0) return null;

  const data = payload[0].payload;

  return (
    <BaseTooltip title={data.name}>
      <p className="px-3 pb-1 text-primaryText flex items-center justify-between">
        <span>
          <span
            className="w-2 h-2 mr-2 rounded inline-block"
            style={{ backgroundColor: data.fill }}
          />
          Performance:
        </span>
        <span className="pl-[0.7rem]">{data.value}%</span>
      </p>
    </BaseTooltip>
  );
};

/**
 * Radial bar chart showing quarterly sales performance.
 * Uses concentric circular bars with labels.
 *
 * @component
 */
export const RadialBarChartComponent = () => {
  const t = useTranslations("charts");
  const { theme } = useTheme();
  const chartColors = useChartColors(theme as "dark" | "light");
  const { shouldAnimate, animationBegin } = useChartAnimation("charts");

  const chartdata: DataPoint[] = [
    {
      name: "Q1 Sales",
      value: 35,
      fill: chartColors.primary.fill,
    },
    {
      name: "Q2 Sales",
      value: 52,
      fill: chartColors.secondary.fill,
    },
    {
      name: "Q3 Sales",
      value: 68,
      fill: "rgb(168, 162, 255)",
    },
    {
      name: "Q4 Sales",
      value: 45,
      fill: "rgb(100, 200, 180)",
    },
  ];

  return (
    <Card
      className="w-full h-full"
      title={t("radialBarChart")}
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
          <RadialBarChart
            cx="50%"
            cy="50%"
            innerRadius="10%"
            outerRadius="90%"
            barSize={20}
            data={chartdata}
          >
            <RadialBar
              label={{ position: "insideStart", fill: "#fff" }}
              background={{ fill: "rgba(255,255,255,0.05)" }}
              dataKey="value"
              isAnimationActive={shouldAnimate}
              animationBegin={animationBegin}
              animationDuration={800}
              animationEasing="ease-out"
            />
            <Legend
              iconSize={10}
              layout="vertical"
              verticalAlign="middle"
              align="right"
              wrapperStyle={{
                paddingLeft: "20px",
              }}
            />
            <Tooltip content={<RadialTooltip />} isAnimationActive={false} />
          </RadialBarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};
