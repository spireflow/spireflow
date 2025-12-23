"use client";

import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { useTheme } from "next-themes";
import { Card } from "../../common/Card";
import { useChartColors } from "../../../hooks/useChartColors";
import { BaseTooltip } from "../../common/BaseTooltip";

interface DataPoint {
  subject: string;
  productA: number;
  productB: number;
  fullMark: number;
}

interface RadarTooltipProps {
  active?: boolean;
  payload?: Array<{
    name: string;
    value: number;
    dataKey: string;
  }>;
  label?: string;
}

const RadarTooltip = ({ active, payload, label }: RadarTooltipProps) => {
  if (!active || !payload || payload.length === 0) return null;

  return (
    <BaseTooltip title={label || ""}>
      {payload.map((entry, index) => (
        <p
          key={index}
          className="px-3 pb-1 text-primaryText flex items-center justify-between"
        >
          <span>{entry.name}: </span>
          <span className="pl-[0.7rem]">{entry.value}/100</span>
        </p>
      ))}
    </BaseTooltip>
  );
};

export const RadarChartComponent = () => {
  const { theme } = useTheme();
  const chartColors = useChartColors(theme as "dark" | "light");

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
      className="w-full h-full"
      title="Radar Chart"
      padding="px-9"
      isHeaderDividerVisible
      addTitleMargin
    >
      <div className="h-80 1xl:h-96 3xl:h-[28rem] w-full flex flex-col">
        <ResponsiveContainer width="100%" height="85%">
          <RadarChart data={chartdata} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
            <PolarGrid stroke={chartColors.primary.grid} />
            <PolarAngleAxis
              dataKey="subject"
              tick={{ fill: "rgba(255,255,255,0.65)", fontSize: 12 }}
            />
            <PolarRadiusAxis
              angle={90}
              domain={[0, 100]}
              tick={{ fill: "rgba(255,255,255,0.65)", fontSize: 10 }}
              tickFormatter={(value) => value === 100 ? "" : value.toString()}
            />
            <Radar
              name="Product A"
              dataKey="productA"
              stroke={chartColors.primary.fill}
              fill={chartColors.primary.fill}
              fillOpacity={0.5}
              strokeWidth={2}
            />
            <Radar
              name="Product B"
              dataKey="productB"
              stroke={chartColors.secondary.fill}
              fill={chartColors.secondary.fill}
              fillOpacity={0.5}
              strokeWidth={2}
            />
            <Tooltip content={<RadarTooltip />} />
          </RadarChart>
        </ResponsiveContainer>
        <div className="flex flex-row justify-center gap-8 text-white w-full mt-4">
          <div className="flex items-center">
            <div
              className="w-3 h-3 mr-2"
              style={{ backgroundColor: chartColors.primary.fill }}
            />
            <span className="text-xs 1xl:text-sm text-primaryText">Product A</span>
          </div>
          <div className="flex items-center">
            <div
              className="w-3 h-3 mr-2"
              style={{ backgroundColor: chartColors.secondary.fill }}
            />
            <span className="text-xs 1xl:text-sm text-primaryText">Product B</span>
          </div>
        </div>
      </div>
    </Card>
  );
};
