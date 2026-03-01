"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useTranslations } from "next-intl";

import { BaseTooltip } from "../../common/BaseTooltip";
import { useWindowDimensions } from "../../../hooks/useWindowDimensions";
import { Card } from "../../common/Card";
import { useChartAnimation } from "../../../hooks/useChartAnimation";

/** Tooltip payload item structure. */
interface TooltipPayload {
  dataKey: string;
  name?: string;
  value?: number;
  color?: string;
}

/** Props for area chart tooltip component. */
interface AreaTooltipProps {
  active?: boolean;
  payload?: TooltipPayload[];
  label?: string;
}

/**
 * Custom tooltip for displaying views and visitors data.
 *
 * @component
 */
const AreaTooltip = ({ active, payload, label }: AreaTooltipProps) => {
  if (!active || !payload || payload.length === 0 || !label) return null;

  const viewsEntry = payload.find((p) => p.dataKey === "views") || payload[0];
  const visitorsEntry =
    payload.find((p) => p.dataKey === "uniqueVisitors") || payload[1];

  return (
    <BaseTooltip title={label}>
      {viewsEntry && (
        <p className="px-3 pb-1 text-primaryText flex items-center justify-between">
          <span>
            <span
              className="w-2 h-2 mr-2 rounded inline-block"
              style={{ backgroundColor: viewsEntry.color }}
            />
            {`${viewsEntry.name}:   `}
          </span>
          <span className="pl-[0.7rem]">
            {Intl.NumberFormat("us").format(viewsEntry.value ?? 0)}
          </span>
        </p>
      )}
      {visitorsEntry && (
        <p className="px-3 pb-1 text-primaryText flex items-center justify-between">
          <span>
            <span
              className="w-2 h-2 mr-2 rounded inline-block"
              style={{ backgroundColor: visitorsEntry.color }}
            />
            {`${visitorsEntry.name}:   `}
          </span>
          <span className="pl-[0.7rem]">
            {Intl.NumberFormat("us").format(visitorsEntry.value ?? 0)}
          </span>
        </p>
      )}
    </BaseTooltip>
  );
};

/** Props for custom legend component. */
interface CustomLegendProps {
  payload?: Array<{
    value: string;
    color: string;
  }>;
}

/**
 * Custom legend with colored indicators.
 *
 * @component
 */
const CustomLegend = ({ payload }: CustomLegendProps) => {
  return (
    <div
      className="flex flex-row justify-end text-white w-full mb-6"
      style={{ gap: "1rem" }}
    >
      {payload?.map((entry, index) => (
        <div key={`legend-${index}`} className="flex items-center">
          <div
            className="w-3 h-3 mr-2"
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-sm text-primaryText">{entry.value}</span>
        </div>
      ))}
    </div>
  );
};

/**
 * Area chart displaying website views and unique visitors over time.
 * Uses Recharts with gradient fills and custom tooltip.
 *
 * @component
 */
export const AreaChartComponent = () => {
  const t = useTranslations("charts");
  const { width: windowWidth } = useWindowDimensions();
  const { shouldAnimate, animationBegin } = useChartAnimation("charts");

  const chartdata = [
    { date: "Jan", views: 1983, uniqueVisitors: 1654 },
    { date: "Feb", views: 2543, uniqueVisitors: 1320 },
    { date: "Mar", views: 3221, uniqueVisitors: 1845 },
    { date: "Apr", views: 2896, uniqueVisitors: 1990 },
    { date: "May", views: 3577, uniqueVisitors: 1530 },
    { date: "Jun", views: 3188, uniqueVisitors: 2421 },
  ];

  return (
    <Card
      className="w-full h-full"
      title={t("areaChart")}
      padding="px-9"
      isHeaderDividerVisible
      addTitleMargin
    >
      <div className="h-80 1xl:h-96 3xl:h-[28rem] w-full">
        <ResponsiveContainer
          width="100%"
          height="100%"
          initialDimension={{ width: 320, height: 200 }}
        >
          <AreaChart
            data={chartdata}
            margin={{
              top: 10,
              right: windowWidth > 700 ? 30 : 10,
              left: windowWidth > 700 ? 20 : 5,
              bottom: 5,
            }}
          >
            <defs>
              <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
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
              <linearGradient
                id="colorUniqueVisitors"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
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
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={"var(--color-chartPrimaryGrid)"}
            />
            <XAxis
              dataKey="date"
              stroke="rgba(255,255,255,0.1)"
              tick={{ fill: "rgba(255,255,255,0.65)", fontSize: 12 }}
            />
            <YAxis
              stroke="rgba(255,255,255,0.1)"
              tick={{ fill: "rgba(255,255,255,0.65)", fontSize: 12 }}
              tickFormatter={(value) => Intl.NumberFormat("us").format(value)}
            />
            <Tooltip
              content={<AreaTooltip />}
              isAnimationActive={false}
              cursor={{
                fill: "rgba(255,255,255,0.05)",
                stroke: "var(--color-chartVerticalLine)",
              }}
            />
            <Legend
              verticalAlign="top"
              align="center"
              content={<CustomLegend />}
            />
            <Area
              type="linear"
              dataKey="views"
              name="Views"
              stroke={"var(--color-chartPrimaryDisabled)"}
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorViews)"
              isAnimationActive={shouldAnimate}
              animationBegin={animationBegin}
              animationDuration={800}
              animationEasing="ease-out"
            />
            <Area
              type="linear"
              dataKey="uniqueVisitors"
              name="Unique visitors"
              stroke={"var(--color-chartPrimaryFill)"}
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorUniqueVisitors)"
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
