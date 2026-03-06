"use client";

import { useTranslations } from "next-intl";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { useChartAnimation } from "../../../../hooks/useChartAnimation";
import { useWindowDimensions } from "../../../../hooks/useWindowDimensions";
import { BREAKPOINTS } from "../../../../styles/breakpoints";
import { BaseTooltip } from "../../../common/BaseTooltip";
import { Card } from "../../../common/Card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../../common/shadcn/tabs";
import { TodaySalesProps } from "../types";

interface TodaySalesTooltipProps {
  active?: boolean;
  payload?: Array<{ name: string; value: number; color?: string }>;
  label?: string;
}

const TodaySalesTooltip = ({
  active,
  payload,
  label,
}: TodaySalesTooltipProps) => {
  if (!active || !payload || payload.length === 0 || !label) return null;

  return (
    <BaseTooltip title={label}>
      {payload.map((entry, index) => (
        <p
          key={`todaysales-tooltip-${index}`}
          className="px-3 pb-1 text-primaryText flex items-center justify-between"
        >
          <span>
            <span
              className="w-2 h-2 mr-2 rounded inline-block"
              style={{ backgroundColor: entry.color }}
            />
            {`${entry.name}:   `}
          </span>
          <span className="pl-[0.7rem]">
            ${Intl.NumberFormat("us").format(entry.value)}
          </span>
        </p>
      ))}
    </BaseTooltip>
  );
};

const CustomLegend = ({
  payload,
}: {
  payload?: Array<{ value: string; color?: string }>;
}) => {
  return (
    <div className="flex flex-row justify-end gap-8 text-white w-full mt-2 1xl:mt-3">
      {payload?.map((entry, index) => (
        <div key={`legend-${index}`} className="flex items-center">
          <div
            className="w-3 h-3 rounded-sm mr-2"
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

export const TodaySales = ({ todaySalesData }: TodaySalesProps) => {
  const t = useTranslations("analytics.todaySales");

  const { width: windowWidth } = useWindowDimensions();
  const { shouldAnimate, animationBegin } = useChartAnimation("analytics");

  return (
    <Card
      className="w-full h-full recharts-tooltip-stable todaySalesContainer"
      id="todaysSales"
      customHeader
    >
      <p className="text-sm text-primaryText">{t("title")}</p>
      <div className="mt-1 text-xl 1xl:text-2xl 3xl:text-3xl font-bold text-primaryText">
        $ 2276
      </div>
      <Tabs defaultValue="yesterday">
        <TabsList
          variant="line"
          className="flex lg:hidden 1xl:flex mt-1 2xl:mt-2 3xl:mt-6"
        >
          <TabsTrigger
            variant="line"
            value="yesterday"
            className="text-xs 1xl:text-sm"
          >
            Today vs. Yesterday
          </TabsTrigger>
          <TabsTrigger
            variant="line"
            value="average"
            className="text-xs 1xl:text-sm"
          >
            Today vs. Average
          </TabsTrigger>
        </TabsList>
        <TabsContent value="yesterday">
          <div
            role="img"
            aria-label="Today's sales line chart"
            className="mt-7 lg:mt-6 1xl:mt-4 2xl:mt-8 3xl:mt-6 -ml-3 1xl:ml-0 h-60 lg:h-44 1xl:h-50 3xl:h-64"
          >
            <ResponsiveContainer
              width="100%"
              height="100%"
              initialDimension={{ width: 320, height: 200 }}
            >
              <LineChart
                data={todaySalesData}
                margin={{
                  top: 5,
                  right: windowWidth > BREAKPOINTS.md ? 30 : 10,
                  left: windowWidth > BREAKPOINTS.md ? 20 : 5,
                  bottom: 5,
                }}
                tabIndex={-1}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke={"var(--color-chartPrimaryGrid)"}
                />
                <XAxis
                  dataKey="hour"
                  axisLine={{ stroke: "var(--color-chartAxisLine)" }}
                  tickLine={false}
                  tick={{ fill: "var(--color-chartAxisText)", fontSize: 12 }}
                />
                <YAxis
                  axisLine={{ stroke: "var(--color-chartAxisLine)" }}
                  tickLine={false}
                  tick={{ fill: "var(--color-chartAxisText)", fontSize: 12 }}
                  tickFormatter={(value) =>
                    `$${Intl.NumberFormat("us").format(value)}`
                  }
                />
                <Tooltip
                  content={<TodaySalesTooltip />}
                  cursor={{
                    fill: "rgba(255,255,255,0.05)",
                    stroke: "var(--color-chartVerticalLine)",
                  }}
                  isAnimationActive={false}
                />
                <Legend
                  verticalAlign="bottom"
                  align="right"
                  content={<CustomLegend />}
                />
                <Line
                  type="monotone"
                  dataKey="today"
                  name="Today"
                  stroke={"var(--color-chartPrimaryFill)"}
                  strokeWidth={2}
                  dot={false}
                  isAnimationActive={shouldAnimate}
                  animationBegin={animationBegin}
                  animationDuration={800}
                  animationEasing="ease-out"
                />
                <Line
                  type="monotone"
                  dataKey="yesterday"
                  name="Yesterday"
                  stroke={"var(--color-chartSecondaryFill)"}
                  strokeWidth={2}
                  dot={false}
                  isAnimationActive={shouldAnimate}
                  animationBegin={animationBegin}
                  animationDuration={800}
                  animationEasing="ease-out"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </TabsContent>
        <TabsContent value="average">
          <div
            role="img"
            aria-label="Today's sales vs average line chart"
            className="mt-7 lg:mt-6 1xl:mt-4 2xl:mt-8 3xl:mt-6 -ml-3 1xl:ml-0 h-60 lg:h-44 1xl:h-50 3xl:h-64"
          >
            <ResponsiveContainer
              width="100%"
              height="100%"
              initialDimension={{ width: 320, height: 200 }}
            >
              <LineChart
                data={todaySalesData}
                margin={{
                  top: 5,
                  right: windowWidth > BREAKPOINTS.md ? 30 : 10,
                  left: windowWidth > BREAKPOINTS.md ? 20 : 5,
                  bottom: 5,
                }}
                tabIndex={-1}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke={"var(--color-chartPrimaryGrid)"}
                />
                <XAxis
                  dataKey="hour"
                  axisLine={{ stroke: "var(--color-chartAxisLine)" }}
                  tickLine={false}
                  tick={{ fill: "var(--color-chartAxisText)", fontSize: 12 }}
                />
                <YAxis
                  axisLine={{ stroke: "var(--color-chartAxisLine)" }}
                  tickLine={false}
                  tick={{ fill: "var(--color-chartAxisText)", fontSize: 12 }}
                  tickFormatter={(value) =>
                    `$${Intl.NumberFormat("us").format(value)}`
                  }
                />
                <Tooltip
                  content={<TodaySalesTooltip />}
                  cursor={{
                    fill: "rgba(255,255,255,0.05)",
                    stroke: "var(--color-chartVerticalLine)",
                  }}
                  isAnimationActive={false}
                />
                <Legend
                  verticalAlign="bottom"
                  align="right"
                  content={<CustomLegend />}
                />
                <Line
                  type="monotone"
                  dataKey="today"
                  name="Today"
                  stroke={"var(--color-chartPrimaryFill)"}
                  strokeWidth={2}
                  dot={false}
                  isAnimationActive={shouldAnimate}
                  animationBegin={animationBegin}
                  animationDuration={800}
                  animationEasing="ease-out"
                />
                <Line
                  type="monotone"
                  dataKey="average"
                  name="Average"
                  stroke={"var(--color-chartSecondaryFill)"}
                  strokeWidth={2}
                  dot={false}
                  isAnimationActive={shouldAnimate}
                  animationBegin={animationBegin}
                  animationDuration={800}
                  animationEasing="ease-out"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </TabsContent>
      </Tabs>
    </Card>
  );
};
