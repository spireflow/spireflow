"use client";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import { useTheme } from "next-themes";
import { Card } from "../../common/Card";
import { BaseTooltip } from "../../common/BaseTooltip";
import { useChartColors } from "../../../hooks/useChartColors";

interface DataPoint {
  name: string;
  value: number;
  percentage: number;
}

interface PieTooltipProps {
  active?: boolean;
  payload?: Array<{
    payload: DataPoint;
  }>;
}

interface PieLegendProps {
  payload?: Array<{
    value: string;
    color?: string;
  }>;
}

const PieTooltip = ({ active, payload }: PieTooltipProps) => {
  if (!active || !payload || payload.length === 0) return null;

  const data = payload[0].payload;

  return (
    <BaseTooltip title={data.name}>
      <p className="px-3 pb-1 text-primaryText flex items-center justify-between">
        <span>Sales: </span>
        <span className="pl-[0.7rem]">
          ${Intl.NumberFormat("us").format(data.value)}
        </span>
      </p>
      <p className="px-3 pb-1 text-primaryText flex items-center justify-between">
        <span>Share: </span>
        <span className="pl-[0.7rem]">{data.percentage}%</span>
      </p>
    </BaseTooltip>
  );
};

const PieCustomLegend = ({ payload }: PieLegendProps) => {
  return (
    <div className="flex flex-row justify-center gap-8 text-white w-full mt-4">
      {payload?.map((entry, index) => (
        <div key={`legend-${index}`} className="flex items-center">
          <div
            className="w-3 h-3 mr-2 rounded-full"
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

export const PieChartComponent = () => {
  const { theme } = useTheme();
  const chartColors = useChartColors(theme as "dark" | "light");

  const chartdata: DataPoint[] = [
    { name: "Electronics", value: 245000, percentage: 35 },
    { name: "Clothing", value: 175000, percentage: 25 },
    { name: "Home & Garden", value: 140000, percentage: 20 },
    { name: "Sports", value: 84000, percentage: 12 },
    { name: "Books", value: 56000, percentage: 8 },
  ];

  const COLORS = [
    chartColors.primary.fill,
    chartColors.secondary.fill,
    "rgb(168, 162, 255)",
    "rgb(100, 200, 180)",
    "rgb(255, 150, 150)",
  ];

  return (
    <Card
      className="w-full h-full"
      title="Pie Chart"
      padding="px-9"
      isHeaderDividerVisible
      addTitleMargin
    >
      <div className="h-80 1xl:h-96 3xl:h-[28rem] w-full flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartdata}
              cx="50%"
              cy="45%"
              labelLine={false}
              label={({ name, percentage }) => `${name} ${percentage}%`}
              outerRadius={120}
              fill="#8884d8"
              dataKey="value"
              stroke="none"
              strokeWidth={0}
            >
              {chartdata.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                  stroke="none"
                />
              ))}
            </Pie>
            <Tooltip content={<PieTooltip />} />
            <Legend
              verticalAlign="bottom"
              height={36}
              content={<PieCustomLegend />}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};
