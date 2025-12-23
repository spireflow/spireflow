"use client";

import {
  RadialBarChart,
  RadialBar,
  Legend,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { useTheme } from "next-themes";
import { Card } from "../../common/Card";
import { BaseTooltip } from "../../common/BaseTooltip";
import { useChartColors } from "../../../hooks/useChartColors";

interface DataPoint {
  name: string;
  value: number;
  fill: string;
}

interface RadialTooltipProps {
  active?: boolean;
  payload?: Array<{
    payload: DataPoint;
  }>;
}

const RadialTooltip = ({ active, payload }: RadialTooltipProps) => {
  if (!active || !payload || payload.length === 0) return null;

  const data = payload[0].payload;

  return (
    <BaseTooltip title={data.name}>
      <p className="px-3 pb-1 text-primaryText flex items-center justify-between">
        <span>Performance: </span>
        <span className="pl-[0.7rem]">{data.value}%</span>
      </p>
    </BaseTooltip>
  );
};

export const RadialBarChartComponent = () => {
  const { theme } = useTheme();
  const chartColors = useChartColors(theme as "dark" | "light");

  const chartdata: DataPoint[] = [
    {
      name: "Q1 Sales",
      value: 78,
      fill: chartColors.primary.fill,
    },
    {
      name: "Q2 Sales",
      value: 85,
      fill: chartColors.secondary.fill,
    },
    {
      name: "Q3 Sales",
      value: 92,
      fill: "rgb(168, 162, 255)",
    },
    {
      name: "Q4 Sales",
      value: 88,
      fill: "rgb(100, 200, 180)",
    },
  ];

  return (
    <Card
      className="w-full h-full"
      title="Radial Bar Chart"
      padding="px-9"
      isHeaderDividerVisible
      addTitleMargin
    >
      <div className="h-80 1xl:h-96 3xl:h-[28rem] w-full flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <RadialBarChart
            cx="50%"
            cy="50%"
            innerRadius="10%"
            outerRadius="90%"
            barSize={20}
            data={chartdata}
          >
            <RadialBar
              minAngle={15}
              label={{ position: "insideStart", fill: "#fff" }}
              background={{ fill: "rgba(255,255,255,0.05)" }}
              clockWise
              dataKey="value"
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
            <Tooltip content={<RadialTooltip />} />
          </RadialBarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};
