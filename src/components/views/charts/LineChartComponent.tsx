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
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";

import { useWindowDimensions } from "../../../hooks/useWindowDimensions";
import { Card } from "../../common/Card";
import { BaseTooltip } from "../../common/BaseTooltip";
import { useChartColors } from "../../../hooks/useChartColors";
import { useChartAnimation } from "../../../hooks/useChartAnimation";

interface LineChartTooltipProps {
  active?: boolean;
  payload?: Array<{ name: string; value: number; color?: string }>;
  label?: string;
}

const LineChartTooltip = ({
  active,
  payload,
  label,
}: LineChartTooltipProps) => {
  if (!active || !payload || payload.length === 0 || !label) return null;

  return (
    <BaseTooltip title={label}>
      {payload.map((entry, index) => (
        <p
          key={`linechart-tooltip-${index}`}
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
            {Intl.NumberFormat("us").format(entry.value)}
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
    <div className="flex flex-row justify-end gap-8 text-white w-full -mt-10 mb-6">
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

export const LineChartComponent = () => {
  const tCharts = useTranslations("charts");
  const t = useTranslations("singleCharts.line");
  const { width: windowWidth } = useWindowDimensions();
  const { theme } = useTheme();
  const chartColors = useChartColors(theme as "dark" | "light");
  const { shouldAnimate, animationBegin } = useChartAnimation("charts");

  const dragonPopulationInWesteros = [
    {
      year: windowWidth > 600 ? "0 AC" : "0 AC",
      title: t("aegonsConquest"),
      [t("houseTargaryen")]: 3,
      [t("houseVelaryon")]: 0,
    },
    {
      year: windowWidth > 600 ? "60 AC" : "60",
      title: t("theLongReignOfJaehaerysI"),
      [t("houseTargaryen")]: 19,
      [t("houseVelaryon")]: 2,
    },
    {
      year: windowWidth > 600 ? "120 AC" : "120",
      title: t("houseOfTheDragonSeries"),
      [t("houseTargaryen")]: 15,
      [t("houseVelaryon")]: 3,
    },
    {
      year: windowWidth > 600 ? "180 AC" : "180",
      title: t("theConquestOfDorne"),
      [t("houseTargaryen")]: 4,
      [t("houseVelaryon")]: 0,
    },
    {
      year: windowWidth > 600 ? "240 AC" : "240",
      title: t("theBlackfyreRebellions"),
      [t("houseTargaryen")]: 0,
      [t("houseVelaryon")]: 0,
    },
    {
      year: windowWidth > 600 ? "300 AC" : "300",
      title: t("timeOfTheShowBooksStart"),
      [t("houseTargaryen")]: 3,
      [t("houseVelaryon")]: 0,
    },
  ];

  return (
    <Card
      className="w-full !pt-8 !pb-8"
      customHeader={
        <div className="-mx-6 md:-mx-20 px-6 md:px-20 text-[0.9rem] 1xl:text-[1rem] 3xl:text-[1.2rem] font-semibold text-primaryText pb-6 mb-14 border-b border-cardBorder">
          {tCharts("lineChart")}
        </div>
      }
      padding="px-6 md:px-20"
    >
      <div className="mt-2 1xl:mt-6 h-72 1xl:h-88 3xl:h-96">
        <ResponsiveContainer
          width="100%"
          height="100%"
          initialDimension={{ width: 320, height: 200 }}
        >
          <LineChart
            data={dragonPopulationInWesteros}
            margin={{
              top: 20,
              right: windowWidth > 700 ? 30 : 10,
              left: windowWidth > 700 ? 20 : 5,
              bottom: 5,
            }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={chartColors.primary.grid}
            />
            <XAxis
              dataKey="year"
              stroke="rgba(255,255,255,0.1)"
              tick={{ fill: "rgba(255,255,255,0.65)", fontSize: 12 }}
            />
            <YAxis
              stroke="rgba(255,255,255,0.1)"
              tick={{ fill: "rgba(255,255,255,0.65)", fontSize: 12 }}
              width={40}
              tickFormatter={(value) => Intl.NumberFormat("us").format(value)}
            />
            <Tooltip
              content={<LineChartTooltip />}
              cursor={{ fill: "rgba(255,255,255,0.05)", stroke: "var(--color-chartVerticalLine)" }}
              isAnimationActive={false}
            />
            <Legend
              verticalAlign="top"
              align="center"
              content={<CustomLegend />}
            />
            <Line
              type="monotone"
              dataKey={t("houseTargaryen")}
              stroke={chartColors.primary.fill}
              strokeWidth={2}
              dot={true}
              isAnimationActive={shouldAnimate}
              animationBegin={animationBegin}
              animationDuration={800}
              animationEasing="ease-out"
            />
            <Line
              type="monotone"
              dataKey={t("houseVelaryon")}
              stroke="rgb(148, 163, 184)"
              strokeWidth={2}
              dot={true}
              isAnimationActive={shouldAnimate}
              animationBegin={animationBegin}
              animationDuration={800}
              animationEasing="ease-out"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="w-full hidden sm:flex justify-between mx-auto mt-6 1xl:mt-8 ml-8">
        {dragonPopulationInWesteros.map((item, index) => (
          <div
            key={index}
            className="text-xs lg:text-[13px] text-primaryText px-2"
          >
            {item.title}
          </div>
        ))}
      </div>
    </Card>
  );
};
