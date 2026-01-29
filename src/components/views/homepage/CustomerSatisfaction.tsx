"use client";

import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ZAxis,
  Cell,
} from "recharts";
import { useTheme } from "next-themes";
import { useTranslations } from "next-intl";

import { useTranslateData } from "../../../hooks/useTranslateData";
import { CustomerSatisfactionProps } from "./types";
import { Card } from "../../common/Card";
import { BaseTooltip } from "../../common/BaseTooltip";
import { useChartColors } from "../../../hooks/useChartColors";
import { useWindowDimensions } from "../../../hooks/useWindowDimensions";
import { useChartAnimation } from "../../../hooks/useChartAnimation";

interface CustomerScatterTooltipProps {
  active?: boolean;
  payload?: Array<{
    payload: {
      brandName: string;
      [key: string]: any;
    };
  }>;
}

const CustomerScatterTooltip = ({
  active,
  payload,
}: CustomerScatterTooltipProps) => {
  const t = useTranslations("homepage.customerSatisfaction");

  if (!active || !payload || payload.length === 0) return null;

  const data = payload[0].payload;
  const numberOfOrdersScaleFactor = 1.1;

  return (
    <BaseTooltip title={data.brandName}>
      <p className="px-3 pb-1 text-primaryText flex items-center justify-between">
        <span>{t("totalSales")}: </span>
        <span className="pl-[0.7rem]">
          ${(data[t("totalSales")] / 1000).toFixed(1)}K
        </span>
      </p>
      <p className="px-3 pb-1 text-primaryText flex items-center justify-between">
        <span>{t("customerSatisfaction")}: </span>
        <span className="pl-[0.7rem]">{data[t("customerSatisfaction")]}%</span>
      </p>
      <p className="px-3 pb-1 text-primaryText flex items-center justify-between">
        <span>{t("numberOfOrders")}: </span>
        <span className="pl-[0.7rem]">
          {Math.round(data[t("numberOfOrders")] / numberOfOrdersScaleFactor)}
        </span>
      </p>
    </BaseTooltip>
  );
};

export const CustomerSatisfaction = ({
  customerSatisfactionData,
}: CustomerSatisfactionProps) => {
  const t = useTranslations("homepage.customerSatisfaction");

  const translations = {
    totalSales: t("totalSales"),
    customerSatisfaction: t("customerSatisfaction"),
    numberOfOrders: t("numberOfOrders"),
  };

  const translatedData = useTranslateData(
    customerSatisfactionData,
    translations
  );

  const { theme } = useTheme();
  const chartColors = useChartColors(theme as "dark" | "light");
  const { width: windowWidth } = useWindowDimensions();
  const { shouldAnimate, animationBegin } = useChartAnimation("homepage");

  return (
    <Card
      className="max-w-full h-full max-h-full flex flex-col"
      id="customerSatisfaction"
      title={t("title")}
    >
      <div className="h-[16rem] 1xl:h-[17.5rem] 3xl:h-[19.5rem] mt-10">
        <ResponsiveContainer
          width="100%"
          height="100%"
          initialDimension={{ width: 320, height: 200 }}
        >
          <ScatterChart
            margin={{
              top: 20,
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
              type="number"
              dataKey={t("totalSales")}
              name={t("totalSales")}
              stroke="rgba(255,255,255,0.1)"
              tick={{ fill: "rgba(255,255,255,0.65)", fontSize: 12 }}
              tickFormatter={(value) => `$${(value / 1000).toFixed(1)}K`}
            />
            <YAxis
              type="number"
              dataKey={t("customerSatisfaction")}
              name={t("customerSatisfaction")}
              stroke="rgba(255,255,255,0.1)"
              tick={{ fill: "rgba(255,255,255,0.65)", fontSize: 12 }}
              domain={[60, 100]}
              width={50}
            />
            <ZAxis
              type="number"
              dataKey={t("numberOfOrders")}
              range={[111, 2500]}
              name={t("numberOfOrders")}
            />
            <Tooltip
              content={<CustomerScatterTooltip />}
              cursor={{ strokeDasharray: "3 3" }}
              isAnimationActive={false}
            />
            <Scatter
              data={translatedData}
              fill={chartColors.primary.fill}
              fillOpacity={0.8}
              isAnimationActive={shouldAnimate}
              animationBegin={animationBegin}
              animationDuration={800}
              animationEasing="ease-out"
            >
              {translatedData.map((entry: any, index: number) => (
                <Cell
                  key={`cell-${index}`}
                  fill={
                    index % 3 === 0
                      ? chartColors.primary.fill
                      : index % 3 === 1
                      ? chartColors.secondary.fill
                      : "rgb(168, 162, 255)"
                  }
                />
              ))}
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};
