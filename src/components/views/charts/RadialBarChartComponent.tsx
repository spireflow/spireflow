"use client";

import { useTranslations } from "next-intl";
import {
  RadialBar,
  RadialBarChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

import { useChartAnimation } from "../../../hooks/useChartAnimation";
import { useWindowDimensions } from "../../../hooks/useWindowDimensions";
import { BREAKPOINTS } from "../../../styles/breakpoints";
import { BaseTooltip } from "../../common/BaseTooltip";
import { Card } from "../../common/Card";

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
  const { shouldAnimate, animationBegin } = useChartAnimation("charts");
  const { width: windowWidth } = useWindowDimensions();

  const chartdata: DataPoint[] = [
    {
      name: "Q1 Sales",
      value: 35,
      fill: "var(--color-chartPrimaryFill)",
    },
    {
      name: "Q2 Sales",
      value: 52,
      fill: "var(--color-chartSecondaryFill)",
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
      <div className="h-64 xsm:h-80 1xl:h-96 3xl:h-112 w-full flex flex-col">
        <div className="flex-1 min-h-0">
          <ResponsiveContainer
            width="100%"
            height="100%"
            initialDimension={{ width: 320, height: 200 }}
          >
            <RadialBarChart
              cx="50%"
              cy="42%"
              innerRadius="10%"
              outerRadius="80%"
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
              <Tooltip content={<RadialTooltip />} isAnimationActive={false} />
            </RadialBarChart>
          </ResponsiveContainer>
        </div>
        <div className="flex flex-row justify-center gap-6 whitespace-nowrap pb-2">
          {chartdata.map((entry, index) => (
            <div key={`legend-${index}`} className="flex items-center">
              <div
                className="w-2.5 h-2.5 mr-1.5 rounded-sm"
                style={{ backgroundColor: entry.fill }}
              />
              <span className="text-xs 1xl:text-sm text-primaryText">
                {windowWidth > 0 && windowWidth < BREAKPOINTS.xsm
                  ? entry.name.replace(" Sales", "")
                  : entry.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};
