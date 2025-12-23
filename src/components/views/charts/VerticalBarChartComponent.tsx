"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { useTheme } from "next-themes";
import { Card } from "../../common/Card";
import { useChartColors } from "../../../hooks/useChartColors";
import { useWindowDimensions } from "../../../hooks/useWindowDimensions";
import { BaseTooltip } from "../../common/BaseTooltip";

interface DataPoint {
  category: string;
  sales: number;
}

interface VerticalBarTooltipProps {
  active?: boolean;
  payload?: Array<{
    name: string;
    value: number;
    payload: DataPoint;
  }>;
  label?: string;
}

const VerticalBarTooltip = ({
  active,
  payload,
  label,
}: VerticalBarTooltipProps) => {
  if (!active || !payload || payload.length === 0) return null;

  return (
    <BaseTooltip title={label || ""}>
      <p className="px-3 pb-1 text-primaryText flex items-center justify-between">
        <span>Sales: </span>
        <span className="pl-[0.7rem]">
          ${Intl.NumberFormat("us").format(payload[0].value)}
        </span>
      </p>
    </BaseTooltip>
  );
};

interface BarLegendProps {
  payload?: Array<{
    value: string;
    color?: string;
  }>;
}

const BarCustomLegend = ({ payload }: BarLegendProps) => {
  return (
    <div className="flex flex-row justify-center gap-8 text-white w-full">
      {payload?.map((entry, index) => (
        <div key={`legend-${index}`} className="flex items-center">
          <div
            className="w-3 h-3 mr-2"
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

export const VerticalBarChartComponent = () => {
  const { theme } = useTheme();
  const chartColors = useChartColors(theme as "dark" | "light");
  const { width: windowWidth } = useWindowDimensions();

  const chartdata: DataPoint[] = [
    { category: "Fashion", sales: 45000 },
    { category: "Tech", sales: 62000 },
    { category: "Home", sales: 38000 },
    { category: "Beauty", sales: 29000 },
    { category: "Sports", sales: 41000 },
    { category: "Books", sales: 22000 },
  ];

  return (
    <Card
      className="w-full h-full"
      title="Bar Chart"
      padding="px-9"
      isHeaderDividerVisible
      addTitleMargin
    >
      <div className="h-80 1xl:h-96 3xl:h-[28rem] w-full mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartdata}
            margin={{
              top: 20,
              right: windowWidth > 700 ? 30 : 10,
              left: windowWidth > 700 ? 20 : 5,
              bottom: 20,
            }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={chartColors.primary.grid}
            />
            <XAxis
              dataKey="category"
              stroke="rgba(255,255,255,0.1)"
              tick={{ fill: "rgba(255,255,255,0.65)", fontSize: 12 }}
            />
            <YAxis
              stroke="rgba(255,255,255,0.1)"
              tick={{ fill: "rgba(255,255,255,0.65)", fontSize: 12 }}
              tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`}
            />
            <Tooltip content={<VerticalBarTooltip />} cursor={{ fill: 'rgba(255, 255, 255, 0.02)' }} />
            <Legend wrapperStyle={{ paddingTop: '2rem' }} content={<BarCustomLegend />} />
            <Bar
              dataKey="sales"
              name="Sales"
              radius={[8, 8, 0, 0]}
              fill={chartColors.primary.fill}
            >
              {chartdata.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={
                    index % 2 === 0
                      ? chartColors.primary.fill
                      : chartColors.secondary.fill
                  }
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};
