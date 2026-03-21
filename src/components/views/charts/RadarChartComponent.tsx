"use client";

import { useTranslations } from "next-intl";
import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

import { useChartAnimation } from "../../../hooks/useChartAnimation";
import { useWindowDimensions } from "../../../hooks/useWindowDimensions";
import { BREAKPOINTS } from "../../../styles/breakpoints";
import { BaseTooltip } from "../../common/BaseTooltip";
import { Card } from "../../common/Card";

/** Data point structure for radar chart. */
interface DataPoint {
  subject: string;
  productA: number;
  productB: number;
  fullMark: number;
}

/** Props for radar chart tooltip component. */
interface RadarTooltipProps {
  active?: boolean;
  payload?: Array<{
    name: string;
    value: number;
    dataKey: string;
    color?: string;
    stroke?: string;
  }>;
  label?: string;
}

/**
 * Custom tooltip displaying product comparison scores.
 *
 * @component
 */
const RadarTooltip = ({ active, payload, label }: RadarTooltipProps) => {
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
              style={{ backgroundColor: entry.color || entry.stroke }}
            />
            {entry.name}:
          </span>
          <span className="pl-[0.7rem]">{entry.value}/100</span>
        </p>
      ))}
    </BaseTooltip>
  );
};

/**
 * Radar chart comparing two products across multiple attributes.
 * Uses overlapping filled areas for visual comparison.
 *
 * @component
 */
export const RadarChartComponent = () => {
  const t = useTranslations("charts");
  const { shouldAnimate, animationBegin } = useChartAnimation("charts");
  const { width: windowWidth } = useWindowDimensions();

  const chartdata: DataPoint[] = [
    { subject: "Quality", productA: 70, productB: 95, fullMark: 100 },
    { subject: "Price", productA: 88, productB: 10, fullMark: 100 },
    { subject: "Design", productA: 65, productB: 90, fullMark: 100 },
    { subject: "Durability", productA: 92, productB: 75, fullMark: 100 },
    { subject: "Support", productA: 78, productB: 85, fullMark: 100 },
    { subject: "Features", productA: 85, productB: 70, fullMark: 100 },
  ];

  return (
    <Card
      id="radarChart"
      className="w-full h-full"
      title={t("radarChart")}
      padding="px-9"
      isHeaderDividerVisible
      addTitleMargin
    >
      <div className="h-64 xsm:h-80 1xl:h-96 3xl:h-112 w-full flex flex-col">
        <ResponsiveContainer
          width="100%"
          height={
            windowWidth > 0 && windowWidth < BREAKPOINTS.xsm ? "76%" : "85%"
          }
          initialDimension={{ width: 320, height: 200 }}
        >
          <RadarChart
            data={chartdata}
            margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
          >
            <PolarGrid stroke={"var(--color-chartPrimaryGrid)"} />
            <PolarAngleAxis
              dataKey="subject"
              tick={{ fill: "rgba(255,255,255,0.65)", fontSize: 12 }}
            />
            <PolarRadiusAxis
              angle={90}
              domain={[0, 100]}
              tick={{ fill: "rgba(255,255,255,0.65)", fontSize: 10 }}
              tickFormatter={(value) => (value === 100 ? "" : value.toString())}
            />
            <Radar
              name="Product A"
              dataKey="productA"
              stroke={"var(--color-chartPrimaryFill)"}
              fill={"var(--color-chartPrimaryFill)"}
              fillOpacity={0.5}
              strokeWidth={2}
              isAnimationActive={shouldAnimate}
              animationBegin={animationBegin}
              animationDuration={800}
              animationEasing="ease-out"
            />
            <Radar
              name="Product B"
              dataKey="productB"
              stroke={"var(--color-chartSecondaryFill)"}
              fill={"var(--color-chartSecondaryFill)"}
              fillOpacity={0.5}
              strokeWidth={2}
              isAnimationActive={shouldAnimate}
              animationBegin={animationBegin}
              animationDuration={800}
              animationEasing="ease-out"
            />
            <Tooltip content={<RadarTooltip />} isAnimationActive={false} />
          </RadarChart>
        </ResponsiveContainer>
        <div
          className="flex flex-row justify-center gap-8 text-white w-full whitespace-nowrap"
          style={{
            marginTop:
              windowWidth > 0 && windowWidth < BREAKPOINTS.xsm
                ? "1.5rem"
                : "1rem",
          }}
        >
          <div className="flex items-center">
            <div
              className="w-3 h-3 mr-2"
              style={{ backgroundColor: "var(--color-chartPrimaryFill)" }}
            />
            <span className="text-xs 1xl:text-sm text-primaryText">
              Product A
            </span>
          </div>
          <div className="flex items-center">
            <div
              className="w-3 h-3 mr-2"
              style={{ backgroundColor: "var(--color-chartSecondaryFill)" }}
            />
            <span className="text-xs 1xl:text-sm text-primaryText">
              Product B
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
};
