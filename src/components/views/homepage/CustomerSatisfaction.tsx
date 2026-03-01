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
import { useTranslations } from "next-intl";

import { CustomerSatisfactionProps } from "./types";
import { Card } from "../../common/Card";
import { BaseTooltip } from "../../common/BaseTooltip";
import { useWindowDimensions } from "../../../hooks/useWindowDimensions";
import { useChartAnimation } from "../../../hooks/useChartAnimation";

interface CustomerScatterTooltipProps {
  active?: boolean;
  payload?: Array<{
    payload: {
      brandName: string;
      [key: string]: string | number;
    };
  }>;
}

const CustomerScatterTooltip = ({
  active,
  payload,
}: CustomerScatterTooltipProps) => {
  if (!active || !payload || payload.length === 0) return null;

  const data = payload[0].payload;
  const numberOfOrdersScaleFactor = 1.1;

  return (
    <BaseTooltip title={data.brandName}>
      <p className="px-3 pb-1 text-primaryText flex items-center justify-between">
        <span>Total sales: </span>
        <span className="pl-[0.7rem]">
          ${(Number(data.totalSales) / 1000).toFixed(1)}K
        </span>
      </p>
      <p className="px-3 pb-1 text-primaryText flex items-center justify-between">
        <span>Satisfaction: </span>
        <span className="pl-[0.7rem]">{data.customerSatisfaction}%</span>
      </p>
      <p className="px-3 pb-1 text-primaryText flex items-center justify-between">
        <span>Orders: </span>
        <span className="pl-[0.7rem]">
          {Math.round(Number(data.numberOfOrders) / numberOfOrdersScaleFactor)}
        </span>
      </p>
    </BaseTooltip>
  );
};

export const CustomerSatisfaction = ({
  customerSatisfactionData,
}: CustomerSatisfactionProps) => {
  const t = useTranslations("homepage.customerSatisfaction");

  const { width: windowWidth } = useWindowDimensions();
  const { shouldAnimate, animationBegin } = useChartAnimation("homepage");

  const bubbleRange: [number, number] =
    windowWidth < 1024 ? [56, 1250] : [111, 2500];

  return (
    <Card
      className="max-w-full h-full max-h-full flex flex-col"
      id="customerSatisfaction"
      title={t("title")}
    >
      <div
        role="img"
        aria-label="Customer satisfaction scatter chart"
        className="h-[16rem] 1xl:h-[17.5rem] 3xl:h-[19.5rem] mt-10"
      >
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
              stroke="var(--color-chartPrimaryGrid)"
            />
            <XAxis
              type="number"
              dataKey="totalSales"
              name="Total sales"
              stroke="rgba(255,255,255,0.1)"
              tick={{ fill: "rgba(255,255,255,0.65)", fontSize: 12 }}
              tickFormatter={(value) => `$${(value / 1000).toFixed(1)}K`}
            />
            <YAxis
              type="number"
              dataKey="customerSatisfaction"
              name="Customer satisfaction"
              stroke="rgba(255,255,255,0.1)"
              tick={{ fill: "rgba(255,255,255,0.65)", fontSize: 12 }}
              domain={[60, 100]}
              width={50}
            />
            <ZAxis
              type="number"
              dataKey="numberOfOrders"
              range={bubbleRange}
              name="Number of orders"
            />
            <Tooltip
              content={<CustomerScatterTooltip />}
              cursor={{ strokeDasharray: "3 3" }}
              isAnimationActive={false}
            />
            <Scatter
              data={customerSatisfactionData}
              fill="var(--color-chartPrimaryFill)"
              fillOpacity={0.8}
              isAnimationActive={shouldAnimate}
              animationBegin={animationBegin}
              animationDuration={800}
              animationEasing="ease-out"
            >
              {customerSatisfactionData.map((_entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={
                    index % 3 === 0
                      ? "var(--color-chartPrimaryFill)"
                      : index % 3 === 1
                        ? "var(--color-chartSecondaryFill)"
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
