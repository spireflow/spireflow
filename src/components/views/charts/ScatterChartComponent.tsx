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
import { BaseTooltip } from "../../common/BaseTooltip";
import { useChartColors } from "../../../hooks/useChartColors";
import { useWindowDimensions } from "../../../hooks/useWindowDimensions";
import { Card } from "../../common/Card";

interface DataPoint {
  country: string;
  lifeExpectancy: number;
  gdp: number;
  population: number;
}

interface ScatterTooltipProps {
  active?: boolean;
  payload?: Array<{
    payload: DataPoint;
  }>;
}

const ScatterTooltip = ({ active, payload }: ScatterTooltipProps) => {
  if (!active || !payload || payload.length === 0) return null;

  const data = payload[0].payload;
  const t = useTranslations("singleCharts.scatter");

  return (
    <BaseTooltip title={data.country}>
      <p className="px-3 pb-1 text-primaryText flex items-center justify-between">
        <span>{t("gdp")}: </span>
        <span className="pl-[0.7rem]">
          ${(data.gdp / 1000).toFixed(1)}K
        </span>
      </p>
      <p className="px-3 pb-1 text-primaryText flex items-center justify-between">
        <span>{t("lifeExpectancy")}: </span>
        <span className="pl-[0.7rem]">
          {data.lifeExpectancy} {t("yrs")}
        </span>
      </p>
      <p className="px-3 pb-1 text-primaryText flex items-center justify-between">
        <span>{t("population")}: </span>
        <span className="pl-[0.7rem]">
          {(data.population / 1000000).toFixed(1)}M
        </span>
      </p>
    </BaseTooltip>
  );
};

export const ScatterChartComponent = () => {
  const { theme } = useTheme();
  const chartColors = useChartColors(theme as "dark" | "light");
  const { width: windowWidth } = useWindowDimensions();
  const t = useTranslations("singleCharts.scatter");

  const chartdata = [
    {
      country: t("countries.Argentina"),
      lifeExpectancy: 76.3,
      gdp: 13467.1236,
      population: 43417765,
    },
    {
      country: t("countries.Australia"),
      lifeExpectancy: 82.8,
      gdp: 56554.3876,
      population: 23789338,
    },
    {
      country: t("countries.Austria"),
      lifeExpectancy: 81.5,
      gdp: 43665.947,
      population: 8633169,
    },
    {
      country: t("countries.Brazil"),
      lifeExpectancy: 75.4,
      gdp: 11024.0342,
      population: 211049527,
    },
    {
      country: t("countries.Canada"),
      lifeExpectancy: 82.3,
      gdp: 44974.243,
      population: 37058856,
    },
    {
      country: t("countries.China"),
      lifeExpectancy: 76.9,
      gdp: 10746.782,
      population: 13715000,
    },
    {
      country: t("countries.Denmark"),
      lifeExpectancy: 80.7,
      gdp: 55675.003,
      population: 5754356,
    },
    {
      country: t("countries.Egypt"),
      lifeExpectancy: 71.8,
      gdp: 5744.787,
      population: 98423595,
    },
    {
      country: t("countries.Finland"),
      lifeExpectancy: 81.1,
      gdp: 42032.056,
      population: 552529,
    },
    {
      country: t("countries.Germany"),
      lifeExpectancy: 81.0,
      gdp: 44680.009,
      population: 82792351,
    },
    {
      country: t("countries.India"),
      lifeExpectancy: 69.4,
      gdp: 5191.054,
      population: 16417754,
    },
    {
      country: t("countries.Japan"),
      lifeExpectancy: 84.1,
      gdp: 40551.553,
      population: 126530000,
    },
    {
      country: t("countries.Mexico"),
      lifeExpectancy: 74.9,
      gdp: 17924.041,
      population: 127575529,
    },
    {
      country: t("countries.Netherlands"),
      lifeExpectancy: 81.5,
      gdp: 49088.289,
      population: 17134872,
    },
    {
      country: t("countries.Russia"),
      lifeExpectancy: 72.6,
      gdp: 11288.872,
      population: 144478050,
    },
    {
      country: t("countries.Poland"),
      lifeExpectancy: 77.5,
      gdp: 29582.345,
      population: 37887768,
    },
    {
      country: t("countries.Spain"),
      lifeExpectancy: 83.4,
      gdp: 32290.175,
      population: 46736776,
    },
    {
      country: t("countries.Greece"),
      lifeExpectancy: 81.1,
      gdp: 21345.678,
      population: 10473455,
    },
  ];

  return (
    <Card
      className="w-full h-full"
      title="Scatter Chart"
      padding="px-9"
      isHeaderDividerVisible
      addTitleMargin
    >
      <div className="h-80 1xl:h-96 3xl:h-[28rem] w-full mt-2">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart
            margin={{
              top: 40,
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
              type="number"
              dataKey="gdp"
              name={t("gdp")}
              stroke="rgba(255,255,255,0.1)"
              tick={{ fill: "rgba(255,255,255,0.65)", fontSize: 12 }}
              tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`}
            />
            <YAxis
              type="number"
              dataKey="lifeExpectancy"
              name={t("lifeExpectancy")}
              stroke="rgba(255,255,255,0.1)"
              tick={{ fill: "rgba(255,255,255,0.65)", fontSize: 12 }}
              domain={[60, 90]}
              width={50}
            />
            <ZAxis
              type="number"
              dataKey="population"
              range={[50, 1000]}
              name={t("population")}
            />
            <Tooltip
              content={<ScatterTooltip />}
              cursor={{ strokeDasharray: "3 3" }}
            />
            <Scatter
              data={chartdata}
              fill={chartColors.primary.fill}
              fillOpacity={0.8}
            >
              {chartdata.map((entry, index) => (
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
