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
  month: string;
  organic: number;
  paid: number;
  referral: number;
}

interface MixedLineTooltipProps {
  active?: boolean;
  payload?: Array<{
    name: string;
    value: number;
    dataKey: string;
    color: string;
  }>;
  label?: string;
}

const MixedLineTooltip = ({
  active,
  payload,
  label,
}: MixedLineTooltipProps) => {
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

interface MixedLineLegendProps {
  payload?: Array<{
    value: string;
    color?: string;
  }>;
}

const MixedLineCustomLegend = ({ payload }: MixedLineLegendProps) => {
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

export const MixedLineChartComponent = () => {
  const { theme } = useTheme();
  const chartColors = useChartColors(theme as "dark" | "light");
  const { width: windowWidth } = useWindowDimensions();

  const chartdata: DataPoint[] = [
    { month: "Jan", organic: 3400, paid: 1200, referral: 800 },
    { month: "Feb", organic: 3800, paid: 1400, referral: 900 },
    { month: "Mar", organic: 4200, paid: 1600, referral: 1100 },
    { month: "Apr", organic: 3900, paid: 1800, referral: 950 },
    { month: "May", organic: 4500, paid: 2100, referral: 1300 },
    { month: "Jun", organic: 5100, paid: 2400, referral: 1500 },
  ];

  return (
    <Card
      className="w-full h-full"
      title="Line Chart (Multi-Series)"
      padding="px-9"
      isHeaderDividerVisible
      addTitleMargin
    >
      <div className="h-80 1xl:h-96 3xl:h-[28rem] w-full mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
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
              dataKey="month"
              stroke="rgba(255,255,255,0.1)"
              tick={{ fill: "rgba(255,255,255,0.65)", fontSize: 12 }}
            />
            <YAxis
              stroke="rgba(255,255,255,0.1)"
              tick={{ fill: "rgba(255,255,255,0.65)", fontSize: 12 }}
              tickFormatter={(value) => Intl.NumberFormat("us").format(value)}
            />
            <Tooltip content={<MixedLineTooltip />} />
            <Legend iconType="line" wrapperStyle={{ paddingTop: '2rem' }} content={<MixedLineCustomLegend />} />
            <Line
              type="monotone"
              dataKey="organic"
              stroke={chartColors.primary.fill}
              strokeWidth={2}
              name="Organic"
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
            <Line
              type="monotone"
              dataKey="paid"
              stroke={chartColors.secondary.fill}
              strokeWidth={2}
              name="Paid Ads"
              dot={{ r: 4, fill: chartColors.secondary.fill }}
              activeDot={{ r: 6 }}
            />
            <Line
              type="monotone"
              dataKey="referral"
              stroke="rgb(168, 162, 255)"
              strokeWidth={2}
              name="Referral"
              dot={{ r: 4, fill: "rgb(168, 162, 255)" }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};
