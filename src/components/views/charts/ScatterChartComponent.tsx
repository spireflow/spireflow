"use client";

import { useTranslations } from "next-intl";
import {
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
  ZAxis,
} from "recharts";

import { useChartAnimation } from "../../../hooks/useChartAnimation";
import { useWindowDimensions } from "../../../hooks/useWindowDimensions";
import { BREAKPOINTS } from "../../../styles/breakpoints";
import { BaseTooltip } from "../../common/BaseTooltip";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../common/shadcn/card";

/** Data point structure for scatter chart. */
interface DataPoint {
  country: string;
  lifeExpectancy: number;
  gdp: number;
  population: number;
  color: string;
}

/** Props for scatter chart tooltip component. */
interface ScatterTooltipProps {
  active?: boolean;
  payload?: Array<{
    payload: DataPoint;
  }>;
}

/**
 * Custom tooltip displaying country GDP, life expectancy, and population.
 *
 * @component
 */
const ScatterTooltip = ({ active, payload }: ScatterTooltipProps) => {
  if (!active || !payload || payload.length === 0) return null;

  const data = payload[0].payload;

  return (
    <BaseTooltip title={data.country}>
      <p className="px-3 pb-1 text-primaryText flex items-center justify-between">
        <span>GDP:</span>
        <span className="pl-[0.7rem]">${(data.gdp / 1000).toFixed(1)}K</span>
      </p>
      <p className="px-3 pb-1 text-primaryText flex items-center justify-between">
        <span>Life expectancy:</span>
        <span className="pl-[0.7rem]">{data.lifeExpectancy} yrs</span>
      </p>
      <p className="px-3 pb-1 text-primaryText flex items-center justify-between">
        <span>Population:</span>
        <span className="pl-[0.7rem]">
          {(data.population / 1000000).toFixed(1)}M
        </span>
      </p>
    </BaseTooltip>
  );
};

/**
 * Scatter chart showing GDP vs life expectancy by country.
 * Point size represents population, with color variation.
 *
 * @component
 */
export const ScatterChartComponent = () => {
  const t = useTranslations("charts");
  const { width: windowWidth } = useWindowDimensions();
  const { shouldAnimate, animationBegin } = useChartAnimation("charts");

  const chartdata = [
    {
      country: "Argentina",
      lifeExpectancy: 76.3,
      gdp: 13467.1236,
      population: 43417765,
    },
    {
      country: "Australia",
      lifeExpectancy: 82.8,
      gdp: 56554.3876,
      population: 23789338,
    },
    {
      country: "Austria",
      lifeExpectancy: 81.5,
      gdp: 43665.947,
      population: 8633169,
    },
    {
      country: "Brazil",
      lifeExpectancy: 75.4,
      gdp: 11024.0342,
      population: 211049527,
    },
    {
      country: "Canada",
      lifeExpectancy: 82.3,
      gdp: 44974.243,
      population: 37058856,
    },
    {
      country: "China",
      lifeExpectancy: 76.9,
      gdp: 10746.782,
      population: 13715000,
    },
    {
      country: "Denmark",
      lifeExpectancy: 80.7,
      gdp: 55675.003,
      population: 5754356,
    },
    {
      country: "Egypt",
      lifeExpectancy: 71.8,
      gdp: 5744.787,
      population: 98423595,
    },
    {
      country: "Finland",
      lifeExpectancy: 81.1,
      gdp: 42032.056,
      population: 552529,
    },
    {
      country: "Germany",
      lifeExpectancy: 81.0,
      gdp: 44680.009,
      population: 82792351,
    },
    {
      country: "India",
      lifeExpectancy: 69.4,
      gdp: 5191.054,
      population: 16417754,
    },
    {
      country: "Japan",
      lifeExpectancy: 84.1,
      gdp: 40551.553,
      population: 126530000,
    },
    {
      country: "Mexico",
      lifeExpectancy: 74.9,
      gdp: 17924.041,
      population: 127575529,
    },
    {
      country: "Netherlands",
      lifeExpectancy: 81.5,
      gdp: 49088.289,
      population: 17134872,
    },
    {
      country: "Russia",
      lifeExpectancy: 72.6,
      gdp: 11288.872,
      population: 144478050,
    },
    {
      country: "Poland",
      lifeExpectancy: 77.5,
      gdp: 29582.345,
      population: 37887768,
    },
    {
      country: "Spain",
      lifeExpectancy: 83.4,
      gdp: 32290.175,
      population: 46736776,
    },
    {
      country: "Greece",
      lifeExpectancy: 81.1,
      gdp: 21345.678,
      population: 10473455,
    },
  ].map((item, index) => ({
    ...item,
    color:
      index % 3 === 0
        ? "var(--color-chartPrimaryFill)"
        : index % 3 === 1
          ? "var(--color-chartSecondaryFill)"
          : "rgb(168, 162, 255)",
  }));

  return (
    <Card id="scatterChart" className="w-full h-full">
      <CardHeader variant="divider" className="px-9">
        <CardTitle>{t("scatterChart")}</CardTitle>
      </CardHeader>
      <CardContent className="px-9">
        <div className="h-64 xsm:h-80 1xl:h-96 3xl:h-112 w-full mt-2">
          <ResponsiveContainer
            width="100%"
            height="100%"
            initialDimension={{ width: 320, height: 200 }}
          >
            <ScatterChart
              margin={{
                top: 40,
                right: windowWidth > BREAKPOINTS.md ? 30 : 10,
                left: windowWidth > BREAKPOINTS["1xl"] ? 20 : 5,
                bottom: 5,
              }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke={"var(--color-chartPrimaryGrid)"}
              />
              <XAxis
                type="number"
                dataKey="gdp"
                name="GDP"
                axisLine={{ stroke: "var(--color-chartAxisLine)" }}
                tickLine={false}
                tick={{ fill: "var(--color-chartAxisText)", fontSize: 12 }}
                tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`}
              />
              <YAxis
                type="number"
                dataKey="lifeExpectancy"
                name="Life expectancy"
                axisLine={{ stroke: "var(--color-chartAxisLine)" }}
                tickLine={false}
                tick={{ fill: "var(--color-chartAxisText)", fontSize: 12 }}
                domain={[60, 90]}
                width={50}
              />
              <ZAxis
                type="number"
                dataKey="population"
                range={[50, 1000]}
                name="Population"
              />
              <Tooltip
                content={<ScatterTooltip />}
                cursor={{
                  strokeDasharray: "3 3",
                  stroke: "var(--color-chartVerticalLine)",
                }}
                isAnimationActive={false}
              />
              <Scatter
                data={chartdata}
                fill={"var(--color-chartPrimaryFill)"}
                fillOpacity={0.8}
                isAnimationActive={shouldAnimate}
                animationBegin={animationBegin}
                animationDuration={800}
                animationEasing="ease-out"
              >
                {chartdata.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Scatter>
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
