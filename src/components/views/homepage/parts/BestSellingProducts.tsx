import { useTranslations } from "next-intl";
import React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
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
  BestSellingCustomTooltipProps,
  BestSellingProductsProps,
  TranslatedProduct,
} from "../types";

const BestSellingCustomLegend = ({
  payload,
}: {
  payload?: Array<{ value: string; color?: string }>;
}) => {
  return (
    <div className="flex flex-row justify-end gap-8 text-white w-full mb-6 mt-2">
      {[...(payload ?? [])].reverse().map((entry, index) => (
        <div key={`legend-${index}`} className="flex items-center">
          <div
            className="w-3 h-3 rounded-sm mr-2"
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
  isFourCardsMode,
}: BestSellingProductsProps) => {
  const t = useTranslations("homepage.bestSellingProducts");

  const chartData = bestSellingProductsData.map(
    (product: TranslatedProduct) => ({
      name: product.name,
      Sales: product.sales,
      Profit: product.profit,
    }),
  );

  const { width: windowWidth } = useWindowDimensions();

  const { shouldAnimate, animationBegin } = useChartAnimation("homepage");

  const getBarSize = () => {
    if (windowWidth > BREAKPOINTS["1xl"]) return 25;
    if (windowWidth > BREAKPOINTS.xl) return 20;
    if (windowWidth >= BREAKPOINTS.lg) return 15;
    if (windowWidth > BREAKPOINTS.md) return 20;
    if (windowWidth > BREAKPOINTS.sm) return 15;
    return 25;
  };

  return (
    <Card className="h-full" id="bestsellingProducts" title={t("title")}>
      <div
        role="img"
        aria-label="Best selling products bar chart"
        className="h-74 1xl:h-80 3xl:h-[21.8rem] relative mt-1 3xl:mt-0"
      >
        <ResponsiveContainer
          width="100%"
          height="100%"
          initialDimension={{ width: 320, height: 200 }}
        >
          <BarChart
            layout={isFourCardsMode ? "vertical" : "horizontal"}
            data={chartData}
            margin={{
              top: 20,
              right: windowWidth > BREAKPOINTS.md ? 30 : 10,
              left: 0,
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
              strokeDasharray="3 3"
              stroke="var(--color-chartPrimaryGrid)"
            />
            {isFourCardsMode ? (
              <XAxis
                type="number"
                axisLine={{ stroke: "var(--color-chartAxisLine)" }}
                tickLine={false}
                tick={{ fill: "var(--color-chartAxisText)", fontSize: 12 }}
                tickFormatter={(value) =>
                  `$${Intl.NumberFormat("us").format(value)}`
                }
                domain={[
                  0,
                  (dataMax: number) => Math.ceil(dataMax / 1000) * 1000,
                ]}
              />
            ) : (
              <XAxis
                type="category"
                dataKey="name"
                axisLine={{ stroke: "var(--color-chartAxisLine)" }}
                tickLine={false}
                tick={{ fill: "var(--color-chartAxisText)", fontSize: 12 }}
              />
            )}
            {isFourCardsMode ? (
              <YAxis
                type="category"
                dataKey="name"
                axisLine={{ stroke: "var(--color-chartAxisLine)" }}
                tickLine={false}
                tick={({
                  x,
                  y,
                  payload,
                }: {
                  x: string | number;
                  y: string | number;
                  payload: { value: string };
                }) => (
                  <text
                    x={x}
                    y={y}
                    dy={4}
                    textAnchor="end"
                    fill="var(--color-chartAxisText)"
                    fontSize={12}
                  >
                    {payload.value}
                  </text>
                )}
                width={windowWidth > BREAKPOINTS.md ? 90 : 70}
              />
            ) : (
              <YAxis
                type="number"
                axisLine={{ stroke: "var(--color-chartAxisLine)" }}
                tickLine={false}
                tick={{ fill: "var(--color-chartAxisText)", fontSize: 12 }}
                tickFormatter={(value) =>
                  `$${Intl.NumberFormat("us").format(value)}`
                }
                domain={[
                  0,
                  (dataMax: number) => Math.ceil(dataMax / 1000) * 1000,
                ]}
              />
            )}
            <Tooltip
              content={<BestSellingTooltip />}
              isAnimationActive={false}
              cursor={{
                fill: "rgba(255,255,255,0.05)",
                stroke: "var(--color-chartVerticalLine)",
              }}
            />
            <Bar
              dataKey="Sales"
              fill="var(--color-chartSecondaryFill)"
              radius={isFourCardsMode ? [0, 4, 4, 0] : [4, 4, 0, 0]}
              barSize={getBarSize()}
              isAnimationActive={shouldAnimate}
              animationBegin={animationBegin}
              animationDuration={800}
              animationEasing="ease-out"
            />
            <Bar
              dataKey="Profit"
              fill="var(--color-chartPrimaryFill)"
              radius={isFourCardsMode ? [0, 4, 4, 0] : [4, 4, 0, 0]}
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
