import React from "react";
import { useTranslations } from "next-intl";
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
import { useTheme } from "next-themes";

import { Card } from "../../common/Card";
import { BaseTooltip } from "../../common/BaseTooltip";
import {
  OverviewMonthData,
  YearOverviewCustomLegendProps,
  YearOverviewCustomTooltipProps,
  YearOverviewProps,
} from "./types";
import { useChartColors } from "../../../hooks/useChartColors";
import { useWindowDimensions } from "../../../hooks/useWindowDimensions";
import { useChartAnimation } from "../../../hooks/useChartAnimation";
import { useAppStore } from "../../../store/appStore";

const YearOverviewTooltip = ({
  active,
  payload,
  label,
}: YearOverviewCustomTooltipProps) => {
  const t = useTranslations("analytics.yearOverview");

  if (!active || !payload || !payload.length || !label) return null;

  return (
    <BaseTooltip title={label}>
      {payload.map((entry, index) => (
        <p
          key={`yearoverview-tooltip-${index}`}
          className="px-3 pb-1 text-primaryText flex items-center justify-between"
        >
          <span>
            <span
              className="w-2 h-2 mr-2 rounded inline-block"
              style={{ backgroundColor: entry.color }}
            />
            {`${t(entry.name.toLowerCase())}:   `}
          </span>
          <span className="pl-[0.7rem]">
            ${Intl.NumberFormat("us").format(entry.value)}
          </span>
        </p>
      ))}
    </BaseTooltip>
  );
};

const CustomLegend = ({ payload }: YearOverviewCustomLegendProps) => {
  const tDevices = useTranslations("analytics.yearOverview");

  return (
    <div className="flex flex-row justify-end gap-8 text-white w-full mb-6">
      {payload?.map((entry, index) => (
        <div key={index} className="flex items-center">
          <div
            className="w-3 h-3 mr-2"
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-sm text-primaryText">
            {tDevices(entry.value)}
          </span>
        </div>
      ))}
    </div>
  );
};

const DataTable = ({ data }: { data: OverviewMonthData[] }) => {
  const t = useTranslations("analytics.yearOverview");
  const lastSixMonths = data.slice(-8);

  return (
    <div className="overflow-hidden h-[18rem] 1xl:h-[19rem] 3xl:h-[24rem] mr-8 mt-1">
      <table className="w-full">
        <thead>
          <tr>
            <th className="text-secondaryText text-xs text-left text-base pl-4 py-2 3xl:py-3 border-b border-inputBorder">
              {t("month")}
            </th>
            <th className="text-secondaryText text-xs text-left text-base pl-4  py-2 3xl:py-3 border-b border-inputBorder">
              {t("phones")}
            </th>
            <th className="text-secondaryText text-xs text-left text-base pl-4  py-2 3xl:py-3 border-b border-inputBorder">
              {t("laptops")}
            </th>
          </tr>
        </thead>
        <tbody>
          {lastSixMonths.map((row) => (
            <tr key={row.name} className="hover:bg-[rgb(255,255,255,0.03)]">
              <td className="text-tableCellText  font-medium text-xs 3xl:text-sm p-[0.4rem] 3xl:p-2 pl-4 border-b border-inputBorder">
                {row.name}
              </td>
              <td className="text-tableCellText  font-medium text-xs 3xl:text-sm pl-4 border-b border-inputBorder text-left">
                ${Intl.NumberFormat("us").format(row.phones)}
              </td>
              <td className="text-tableCellText  font-medium text-xs 3xl:text-sm pl-4 border-b border-inputBorder text-left">
                ${Intl.NumberFormat("us").format(row.laptops)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export const YearOverview = ({ yearOverviewData }: YearOverviewProps) => {
  const t = useTranslations("analytics.yearOverview");

  const translatedData = yearOverviewData.map((item) => ({
    ...item,
    name: t(item.name.toLowerCase()),
  }));

  const { theme } = useTheme();

  const chartColors = useChartColors(theme as "dark" | "light");

  const { width: windowWidth } = useWindowDimensions();

  const { shouldAnimate, animationBegin } = useChartAnimation("analytics");
  const shouldStartChartAnimations = useAppStore(
    (state) => state.shouldStartChartAnimations
  );

  return (
    <Card className="h-full" id="yearOverview" title={t("title")}>
      <div className="flex gap-8 3xl:pt-4">
        <div className="w-full lg:w-3/4 h-[18rem] 1xl:h-[19rem] 3xl:h-[24rem]">
          <ResponsiveContainer
            width="100%"
            height="100%"
            initialDimension={{ width: 320, height: 200 }}
          >
            <AreaChart
              data={shouldStartChartAnimations ? translatedData : []}
              margin={{
                top: 20,
                right: windowWidth > 500 ? 30 : 15,
                left: windowWidth > 500 ? 20 : 7,
                bottom: 5,
              }}
              tabIndex={-1}
            >
              <defs>
                <linearGradient id="colorPhones" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor={chartColors.secondary.inverted}
                    stopOpacity={0.3}
                  />
                  <stop
                    offset="95%"
                    stopColor={chartColors.secondary.inverted}
                    stopOpacity={0}
                  />
                </linearGradient>
                <linearGradient id="colorLaptops" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor={chartColors.primary.inverted}
                    stopOpacity={0.3}
                  />
                  <stop
                    offset="95%"
                    stopColor={chartColors.primary.inverted}
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke={chartColors.primary.grid}
              />
              <XAxis
                dataKey="name"
                stroke="rgba(255,255,255,0.1)"
                tick={{ fill: "rgba(255,255,255,0.65)", fontSize: 12 }}
              />
              <YAxis
                stroke="rgba(255,255,255,0.1)"
                tick={{ fill: "rgba(255,255,255,0.65)", fontSize: 12 }}
                tickFormatter={(value) =>
                  `${Intl.NumberFormat("us").format(value)}`
                }
                domain={[
                  0,
                  (dataMax: number) => Math.ceil(dataMax / 1000) * 1000,
                ]}
              />
              <Tooltip
                content={<YearOverviewTooltip />}
                cursor={{ fill: "rgba(255,255,255,0.05)", stroke: "var(--color-chartVerticalLine)" }}
                isAnimationActive={false}
              />
              <Legend
                verticalAlign="top"
                align="center"
                content={<CustomLegend />}
              />
              <Area
                name="phones"
                type="monotone"
                dataKey="phones"
                stroke={chartColors.secondary.inverted}
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorPhones)"
                isAnimationActive={shouldAnimate}
                animationBegin={animationBegin}
                animationDuration={800}
                animationEasing="ease-out"
              />
              <Area
                name="laptops"
                type="monotone"
                dataKey="laptops"
                stroke={chartColors.primary.inverted}
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorLaptops)"
                isAnimationActive={shouldAnimate}
                animationBegin={animationBegin}
                animationDuration={800}
                animationEasing="ease-out"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="hidden lg:inline lg:w-1/4">
          <DataTable data={translatedData} />
        </div>
      </div>
    </Card>
  );
};
