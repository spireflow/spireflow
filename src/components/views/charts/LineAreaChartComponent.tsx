"use client";

import { useTranslations } from "next-intl";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { useChartAnimation } from "../../../hooks/useChartAnimation";
import { useWindowDimensions } from "../../../hooks/useWindowDimensions";
import { BaseTooltip } from "../../common/BaseTooltip";
import { Card } from "../../common/Card";

/** Data point structure for orders and returns chart. */
interface DataPoint {
  month: string;
  orders: number;
  returns: number;
}

/** Props for line area chart tooltip component. */
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

/**
 * Custom tooltip displaying orders and returns values.
 *
 * @component
 */
const LineAreaTooltip = ({ active, payload, label }: LineAreaTooltipProps) => {
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

/**
 * Area chart showing orders and returns trends over time.
 * Uses gradient fills and custom tooltip.
 *
 * @component
 */
export const LineAreaChartComponent = () => {
  const t = useTranslations("charts");
  const { width: windowWidth } = useWindowDimensions();
  const { shouldAnimate, animationBegin } = useChartAnimation("charts");

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
      title={t("lineAreaChart")}
      padding="px-9"
      isHeaderDividerVisible
      addTitleMargin
    >
      <div className="h-96 1xl:h-112 3xl:h-128 w-full">
        <ResponsiveContainer
          width="100%"
          height="100%"
          initialDimension={{ width: 320, height: 200 }}
        >
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
                  stopColor={"var(--color-chartPrimaryFill)"}
                  stopOpacity={0.3}
                />
                <stop
                  offset="95%"
                  stopColor={"var(--color-chartPrimaryFill)"}
                  stopOpacity={0}
                />
              </linearGradient>
              <linearGradient id="colorReturns" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={"var(--color-chartPrimaryDisabled)"}
                  stopOpacity={0.3}
                />
                <stop
                  offset="95%"
                  stopColor={"var(--color-chartPrimaryDisabled)"}
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={"var(--color-chartPrimaryGrid)"}
            />
            <XAxis
              dataKey="month"
              axisLine={{ stroke: "var(--color-chartAxisLine)" }}
              tickLine={false}
              tick={{ fill: "var(--color-chartAxisText)", fontSize: 12 }}
            />
            <YAxis
              axisLine={{ stroke: "var(--color-chartAxisLine)" }}
              tickLine={false}
              tick={{ fill: "var(--color-chartAxisText)", fontSize: 12 }}
              tickFormatter={(value) => Intl.NumberFormat("us").format(value)}
            />
            <Tooltip
              content={<LineAreaTooltip />}
              cursor={{ stroke: "var(--color-chartVerticalLine)" }}
              isAnimationActive={false}
            />
            <Legend
              wrapperStyle={{
                paddingTop: "10px",
              }}
            />
            <Area
              type="monotone"
              dataKey="orders"
              stroke={"var(--color-chartPrimaryFill)"}
              strokeWidth={2}
              fill="url(#colorOrders)"
              name="Orders"
              isAnimationActive={shouldAnimate}
              animationBegin={animationBegin}
              animationDuration={800}
              animationEasing="ease-out"
            />
            <Area
              type="monotone"
              dataKey="returns"
              stroke={"var(--color-chartPrimaryDisabled)"}
              strokeWidth={2}
              fill="url(#colorReturns)"
              name="Returns"
              isAnimationActive={shouldAnimate}
              animationBegin={animationBegin}
              animationDuration={800}
              animationEasing="ease-out"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};
