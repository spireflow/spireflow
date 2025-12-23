"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useTheme } from "next-themes";
import { Card } from "../../common/Card";
import { useChartColors } from "../../../hooks/useChartColors";
import { useWindowDimensions } from "../../../hooks/useWindowDimensions";
import { BaseTooltip } from "../../common/BaseTooltip";

interface DataPoint {
  week: string;
  customers: number;
  avgOrderValue: number;
}

interface TwoAxisTooltipProps {
  active?: boolean;
  payload?: Array<{
    name: string;
    value: number;
    dataKey: string;
    color: string;
  }>;
  label?: string;
}

const TwoAxisTooltip = ({ active, payload, label }: TwoAxisTooltipProps) => {
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
            {entry.dataKey === "avgOrderValue"
              ? `$${entry.value}`
              : Intl.NumberFormat("us").format(entry.value)}
          </span>
        </p>
      ))}
    </BaseTooltip>
  );
};

interface TwoAxisLegendProps {
  payload?: Array<{
    value: string;
    color?: string;
  }>;
}

const TwoAxisCustomLegend = ({ payload }: TwoAxisLegendProps) => {
  return (
    <div className="flex flex-row justify-center gap-8 text-white w-full" style={{ gap: '2rem' }}>
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

export const TwoAxisLineChartComponent = () => {
  const { theme } = useTheme();
  const chartColors = useChartColors(theme as "dark" | "light");
  const { width: windowWidth } = useWindowDimensions();

  const chartdata: DataPoint[] = [
    { week: "Week 1", customers: 1240, avgOrderValue: 85 },
    { week: "Week 2", customers: 1580, avgOrderValue: 92 },
    { week: "Week 3", customers: 1420, avgOrderValue: 88 },
    { week: "Week 4", customers: 1890, avgOrderValue: 95 },
    { week: "Week 5", customers: 2100, avgOrderValue: 102 },
    { week: "Week 6", customers: 1950, avgOrderValue: 98 },
  ];

  return (
    <Card
      className="w-full h-full"
      title="Line Chart (Dual Axis)"
      padding="px-9"
      isHeaderDividerVisible
      addTitleMargin
    >
      <div className="h-80 1xl:h-96 3xl:h-[28rem] w-full" style={{ marginTop: "2rem" }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartdata}
            margin={{
              top: 20,
              right: windowWidth > 700 ? 50 : 30,
              left: windowWidth > 700 ? 20 : 5,
              bottom: 20,
            }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={chartColors.primary.grid}
            />
            <XAxis
              dataKey="week"
              stroke="rgba(255,255,255,0.1)"
              tick={{ fill: "rgba(255,255,255,0.65)", fontSize: 12 }}
            />
            <YAxis
              yAxisId="left"
              stroke="rgba(255,255,255,0.1)"
              tick={{ fill: "rgba(255,255,255,0.65)", fontSize: 12 }}
              tickFormatter={(value) => Intl.NumberFormat("us").format(value)}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              stroke="rgba(255,255,255,0.1)"
              tick={{ fill: "rgba(255,255,255,0.65)", fontSize: 12 }}
              tickFormatter={(value) => `$${value}`}
            />
            <Tooltip content={<TwoAxisTooltip />} />
            <Legend iconType="line" wrapperStyle={{ paddingTop: '2rem' }} content={<TwoAxisCustomLegend />} />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="customers"
              stroke={chartColors.primary.fill}
              strokeWidth={3}
              name="New Customers"
              dot={{ r: 5 }}
              activeDot={{ r: 7 }}
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="avgOrderValue"
              stroke={chartColors.secondary.fill}
              strokeWidth={3}
              name="Avg Order Value"
              dot={{ r: 5, fill: chartColors.secondary.fill }}
              activeDot={{ r: 7 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};
