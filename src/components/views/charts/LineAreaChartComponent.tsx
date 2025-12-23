"use client";

import {
  LineChart,
  Line,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
} from "recharts";
import { useTheme } from "next-themes";
import { Card } from "../../common/Card";
import { useChartColors } from "../../../hooks/useChartColors";
import { useWindowDimensions } from "../../../hooks/useWindowDimensions";
import { BaseTooltip } from "../../common/BaseTooltip";

interface DataPoint {
  month: string;
  orders: number;
  returns: number;
}

interface LineAreaTooltipProps {
  active?: boolean;
  payload?: Array<{
    name: string;
    value: number;
    dataKey: string;
    color: string;
  }>;
  label?: string;
}

const LineAreaTooltip = ({
  active,
  payload,
  label,
}: LineAreaTooltipProps) => {
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
            {Intl.NumberFormat("us").format(entry.value)}
          </span>
        </p>
      ))}
    </BaseTooltip>
  );
};

export const LineAreaChartComponent = () => {
  const { theme } = useTheme();
  const chartColors = useChartColors(theme as "dark" | "light");
  const { width: windowWidth } = useWindowDimensions();

  const chartdata: DataPoint[] = [
    { month: "Jan", orders: 3200, returns: 180 },
    { month: "Feb", orders: 3800, returns: 220 },
    { month: "Mar", orders: 4200, returns: 195 },
    { month: "Apr", orders: 3900, returns: 240 },
    { month: "May", orders: 4800, returns: 210 },
    { month: "Jun", orders: 5200, returns: 260 },
  ];

  return (
    <Card
      className="w-full h-full"
      title="Orders & Returns Trend"
      padding="px-9"
      isHeaderDividerVisible
      addTitleMargin
    >
      <div className="h-96 1xl:h-[28rem] 3xl:h-[32rem] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartdata}
            margin={{
              top: 20,
              right: windowWidth > 700 ? 30 : 10,
              left: windowWidth > 700 ? 20 : 5,
              bottom: 5,
            }}
          >
            <defs>
              <linearGradient id="colorOrders" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={chartColors.primary.fill}
                  stopOpacity={0.3}
                />
                <stop
                  offset="95%"
                  stopColor={chartColors.primary.fill}
                  stopOpacity={0}
                />
              </linearGradient>
              <linearGradient id="colorReturns" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={chartColors.primary.disabled}
                  stopOpacity={0.3}
                />
                <stop
                  offset="95%"
                  stopColor={chartColors.primary.disabled}
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={chartColors.primary.grid}
            />
            <XAxis
              dataKey="month"
              stroke="rgba(255,255,255,0.1)"
              tick={{ fill: "rgba(255,255,255,0.65)", fontSize: 12 }}
            />
            <YAxis
              stroke="rgba(255,255,255,0.1)"
              tick={{ fill: "rgba(255,255,255,0.65)", fontSize: 12 }}
              tickFormatter={(value) => Intl.NumberFormat("us").format(value)}
            />
            <Tooltip content={<LineAreaTooltip />} />
            <Legend
              wrapperStyle={{
                paddingTop: "10px",
              }}
            />
            <Area
              type="monotone"
              dataKey="orders"
              stroke={chartColors.primary.fill}
              strokeWidth={2}
              fill="url(#colorOrders)"
              name="Orders"
            />
            <Area
              type="monotone"
              dataKey="returns"
              stroke={chartColors.primary.disabled}
              strokeWidth={2}
              fill="url(#colorReturns)"
              name="Returns"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};
