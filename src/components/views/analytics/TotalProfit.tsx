"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useTranslations } from "next-intl";

import {
  ProductProfit,
  TotalProfitProps,
  TotalProfitTooltipProps,
} from "./types";
import { Card } from "../../common/Card";
import { Badge } from "../../common/shadcn/badge";
import { Progress } from "../../common/shadcn/progress";
import { BaseTooltip } from "../../common/BaseTooltip";
import { useWindowDimensions } from "../../../hooks/useWindowDimensions";
import { useChartAnimation } from "../../../hooks/useChartAnimation";
import { useAppStore } from "../../../store/appStore";

const TotalProfitTooltip = ({
  active,
  payload,
  label,
}: TotalProfitTooltipProps) => {
  if (!active || !payload || payload.length === 0 || !label) return null;

  return (
    <BaseTooltip title={label}>
      {payload.map((entry, index) => (
        <p
          key={`totalprofit-tooltip-${index}`}
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

export const TotalProfit = ({
  totalProfitProducts,
  totalProfitSales,
}: TotalProfitProps) => {
  const t = useTranslations("analytics.totalProfit");

  const { width: windowWidth } = useWindowDimensions();
  const { shouldAnimate, animationBegin } = useChartAnimation("analytics");
  const shouldStartChartAnimations = useAppStore(
    (state) => state.shouldStartChartAnimations,
  );

  return (
    <Card
      className="w-full mx-auto recharts-tooltip-stable"
      id="totalProfit"
      customHeader
    >
      <div className="flex items-start justify-between">
        <p className="text-sm text-primaryText">{t("title")}</p>
        <Badge className="bg-green-500/20 text-green-400 border-green-500/30 hover:bg-green-500/30">
          23.1%
        </Badge>
      </div>
      <div className="flex items-baseline justify-start space-x-3 truncate">
        <div className="text-2xl 3xl:text-3xl font-bold text-primaryText">
          $ 442,276
        </div>
        <p className="text-sm text-primaryText">this year</p>
      </div>
      <div
        role="img"
        aria-label="Total profit area chart"
        className="mt-8 3xl:mt-10 h-48 1xl:h-44 3xl:h-48"
      >
        <ResponsiveContainer
          width="100%"
          height="100%"
          initialDimension={{ width: 320, height: 200 }}
        >
          <AreaChart
            data={shouldStartChartAnimations ? totalProfitSales : []}
            margin={{
              top: 10,
              right: windowWidth > 700 ? 30 : 10,
              left: windowWidth > 700 ? 20 : 5,
              bottom: 5,
            }}
            tabIndex={-1}
          >
            <defs>
              <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
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
              dataKey="month"
              stroke="rgba(255,255,255,0.1)"
              tick={{ fill: "rgba(255,255,255,0.65)", fontSize: 12 }}
              ticks={[
                totalProfitSales[0]?.month,
                totalProfitSales[totalProfitSales.length - 1]?.month,
              ]}
            />
            <YAxis hide />
            <Tooltip
              content={<TotalProfitTooltip />}
              cursor={{
                fill: "rgba(255,255,255,0.05)",
                stroke: "var(--color-chartVerticalLine)",
              }}
              isAnimationActive={false}
            />
            <Area
              type="monotone"
              dataKey="sales"
              name="Sales"
              stroke={"var(--color-chartPrimaryFill)"}
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorSales)"
              isAnimationActive={shouldAnimate}
              animationBegin={animationBegin}
              animationDuration={800}
              animationEasing="ease-out"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      {totalProfitProducts.map((item: ProductProfit, index: number) => (
        <div
          key={item.title}
          className={`mt-4 space-y-2
            ${index === 0 ? "hidden 1xl:block" : ""}
            ${index === 1 ? "hidden 1xl:block" : ""}
            ${index === 2 ? "hidden 3xl:block" : ""}
          `}
        >
          <div className="flex items-center justify-between">
            <p className="text-sm text-primaryText">{item.title}</p>
            <p className="text-sm text-primaryText">{`${item.value}% (${item.metric})`}</p>
          </div>
          <Progress
            value={item.value}
            className="h-2"
            indicatorColor={"var(--color-chartSecondaryFill)"}
          />
        </div>
      ))}
    </Card>
  );
};
