import React from "react";
import { useTheme } from "next-themes";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useTranslations } from "next-intl";

import { Card } from "../../common/Card";
import { useTranslateData } from "../../../hooks/useTranslateData";
import {
  BestSellingCustomTooltipProps,
  BestSellingProductsProps,
  TranslatedProduct,
} from "./types";
import { BaseTooltip } from "../../common/BaseTooltip";
import { useChartColors } from "../../../hooks/useChartColors";
import { useWindowDimensions } from "../../../hooks/useWindowDimensions";
import { useChartAnimation } from "../../../hooks/useChartAnimation";

const BestSellingCustomLegend = ({
  payload,
}: {
  payload?: Array<{ value: string; color?: string }>;
}) => {
  return (
    <div className="flex flex-row justify-end gap-8 text-white w-full mb-6 mt-2">
      {payload?.map((entry, index) => (
        <div key={`legend-${index}`} className="flex items-center">
          <div
            className="w-3 h-3 mr-2"
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-xs 1xl:text-sm text-primaryText">
            {entry.value.split(" ")[0]}
          </span>
        </div>
      ))}
    </div>
  );
};

const BestSellingTooltip = ({
  active,
  payload,
  label,
}: BestSellingCustomTooltipProps) => {
  if (!active || !payload || !payload.length || !label) return null;

  return (
    <BaseTooltip title={label}>
      {payload.map((entry, index) => (
        <p
          key={`item-${index}`}
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
            ${Intl.NumberFormat("us").format(entry.value ?? 0)}
          </span>
        </p>
      ))}
    </BaseTooltip>
  );
};

export const BestSellingProducts = ({
  bestSellingProductsData,
}: BestSellingProductsProps) => {
  const t = useTranslations("homepage.bestSellingProducts");

  const translations = {
    "Profit from last week": t("profitFromLastWeek"),
    "Revenue from last week": t("revenueFromLastWeek"),
  };

  const translatedData = useTranslateData(
    bestSellingProductsData,
    translations
  );

  const chartData = translatedData.map((product: TranslatedProduct) => ({
    name: product.name,
    [t("profitFromLastWeek")]: product.profit,
    [t("revenueFromLastWeek")]: product.revenue,
  }));

  const { theme } = useTheme();

  const chartColors = useChartColors(
    theme as "dark" | "light"
  );

  const { width: windowWidth } = useWindowDimensions();

  const { shouldAnimate, animationBegin } = useChartAnimation("homepage");

  const getBarSize = () => {
    if (windowWidth > 1400) return 25;
    if (windowWidth > 1024) return 20;
    if (windowWidth > 720) return 20;
    if (windowWidth > 640) return 15;
    return 25;
  };

  return (
    <Card className="h-full" id="bestsellingProducts" title={t("title")}>
      <div className="h-[18.5rem] 1xl:h-[20rem] 3xl:h-[21.8rem] relative mt-1 3xl:mt-0">
        <ResponsiveContainer
          width="100%"
          height="100%"
          initialDimension={{ width: 320, height: 200 }}
        >
          <BarChart
            data={chartData}
            margin={{
              top: 20,
              right: windowWidth > 700 ? 30 : 10,
              left: windowWidth > 700 ? 20 : 5,
              bottom: 5,
            }}
            tabIndex={-1}
          >
            <Legend
              verticalAlign="top"
              align="center"
              content={<BestSellingCustomLegend />}
            />
            <CartesianGrid
              strokeDasharray="0"
              stroke={chartColors.primary.grid}
            />
            <XAxis
              dataKey="name"
              tick={{ fill: "white", fontSize: "0.8rem" }}
            />
            <YAxis
              tick={{ fill: "white", fontSize: "0.8rem" }}
              tickFormatter={(value) =>
                `$${Intl.NumberFormat("us").format(value)}`
              }
              domain={[
                0,
                (dataMax: number) => Math.ceil(dataMax / 1000) * 1000,
              ]}
            />
            <Tooltip
              content={<BestSellingTooltip />}
              isAnimationActive={false}
              cursor={{ fill: "rgba(255,255,255,0.05)", stroke: "var(--color-chartVerticalLine)" }}
            />
            <Bar
              dataKey={t("profitFromLastWeek")}
              fill={chartColors.secondary.fill}
              radius={[4, 4, 0, 0]}
              barSize={getBarSize()}
              isAnimationActive={shouldAnimate}
              animationBegin={animationBegin}
              animationDuration={800}
              animationEasing="ease-out"
            />
            <Bar
              dataKey={t("revenueFromLastWeek")}
              fill={chartColors.primary.fill}
              radius={[4, 4, 0, 0]}
              barSize={getBarSize()}
              isAnimationActive={shouldAnimate}
              animationBegin={animationBegin}
              animationDuration={800}
              animationEasing="ease-out"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};
