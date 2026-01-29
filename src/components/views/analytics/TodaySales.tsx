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
import { useTranslations } from "next-intl";

import { useBackendTranslations } from "../../../hooks/useBackendTranslations";
import { useTranslateData } from "../../../hooks/useTranslateData";
import { TodaySalesProps } from "./types";
import { Card } from "../../common/Card";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "../../common/shadcn/tabs";
import { BaseTooltip } from "../../common/BaseTooltip";
import { useChartColors } from "../../../hooks/useChartColors";
import { useWindowDimensions } from "../../../hooks/useWindowDimensions";
import { useChartAnimation } from "../../../hooks/useChartAnimation";

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
    <div className="flex flex-row justify-end gap-8 text-white w-full mt-0 1xl:mt-3">
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

export const TodaySales = ({ todaySalesData }: TodaySalesProps) => {
  const t = useTranslations("analytics.todaySales");
  const backendTranslations = useBackendTranslations("analytics.todaySales");
  const translatedData = useTranslateData(todaySalesData, backendTranslations);

  const { theme } = useTheme();
  const chartColors = useChartColors(theme as "dark" | "light");
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
        <TabsList variant="line" className="mt-1 1xl:mt-2 3xl:mt-6">
          <TabsTrigger
            variant="line"
            value="yesterday"
            className="text-xs 1xl:text-sm"
          >
            {t("todayVsYesterday")}
          </TabsTrigger>
          <TabsTrigger
            variant="line"
            value="average"
            className="text-xs 1xl:text-sm"
          >
            {t("todayVsAverage")}
          </TabsTrigger>
        </TabsList>
        <TabsContent value="yesterday">
          <div className="mt-6 3xl:mt-6 h-52 lg:h-36 1xl:h-[11.5rem] 3xl:h-[16rem]">
            <ResponsiveContainer
              width="100%"
              height="100%"
              initialDimension={{ width: 320, height: 200 }}
            >
              <LineChart
                data={translatedData}
                margin={{
                  top: 5,
                  right: windowWidth > 700 ? 30 : 10,
                  left: windowWidth > 700 ? 20 : 5,
                  bottom: 5,
                }}
                tabIndex={-1}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke={chartColors.primary.grid}
                />
                <XAxis
                  dataKey="hour"
                  stroke="rgba(255,255,255,0.1)"
                  tick={{ fill: "rgba(255,255,255,0.65)", fontSize: 12 }}
                />
                <YAxis
                  stroke="rgba(255,255,255,0.1)"
                  tick={{ fill: "rgba(255,255,255,0.65)", fontSize: 12 }}
                  tickFormatter={(value) =>
                    `$${Intl.NumberFormat("us").format(value)}`
                  }
                />
                <Tooltip
                  content={<TodaySalesTooltip />}
                  cursor={{ fill: "rgba(255,255,255,0.05)", stroke: "var(--color-chartVerticalLine)" }}
                  isAnimationActive={false}
                />
                <Legend
                  verticalAlign="bottom"
                  align="right"
                  content={<CustomLegend />}
                />
                <Line
                  type="monotone"
                  dataKey={t("today")}
                  stroke={chartColors.primary.fill}
                  strokeWidth={2}
                  dot={false}
                  isAnimationActive={shouldAnimate}
                  animationBegin={animationBegin}
                  animationDuration={800}
                  animationEasing="ease-out"
                />
                <Line
                  type="monotone"
                  dataKey={t("yesterday")}
                  stroke={chartColors.secondary.fill}
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
          <div className="mt-6 3xl:mt-6 h-52 lg:h-36 1xl:h-[11.5rem] 3xl:h-[16rem]">
            <ResponsiveContainer
              width="100%"
              height="100%"
              initialDimension={{ width: 320, height: 200 }}
            >
              <LineChart
                data={translatedData}
                margin={{
                  top: 5,
                  right: windowWidth > 700 ? 30 : 10,
                  left: windowWidth > 700 ? 20 : 5,
                  bottom: 5,
                }}
                tabIndex={-1}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke={chartColors.primary.grid}
                />
                <XAxis
                  dataKey="hour"
                  stroke="rgba(255,255,255,0.1)"
                  tick={{ fill: "rgba(255,255,255,0.65)", fontSize: 12 }}
                />
                <YAxis
                  stroke="rgba(255,255,255,0.1)"
                  tick={{ fill: "rgba(255,255,255,0.65)", fontSize: 12 }}
                  tickFormatter={(value) =>
                    `$${Intl.NumberFormat("us").format(value)}`
                  }
                />
                <Tooltip
                  content={<TodaySalesTooltip />}
                  cursor={{ fill: "rgba(255,255,255,0.05)", stroke: "var(--color-chartVerticalLine)" }}
                  isAnimationActive={false}
                />
                <Legend
                  verticalAlign="bottom"
                  align="right"
                  content={<CustomLegend />}
                />
                <Line
                  type="monotone"
                  dataKey={t("today")}
                  stroke={chartColors.primary.fill}
                  strokeWidth={2}
                  dot={false}
                  isAnimationActive={shouldAnimate}
                  animationBegin={animationBegin}
                  animationDuration={800}
                  animationEasing="ease-out"
                />
                <Line
                  type="monotone"
                  dataKey={t("average")}
                  stroke={chartColors.secondary.fill}
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
