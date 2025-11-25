"use client";

import { ScatterChart } from "@tremor/react";
import { useTranslations } from "next-intl";
import { Card } from "../../common/Card";

export const ScatterChartComponent = () => {
  const t = useTranslations("singleCharts.scatter");

  const chartdata = [
    {
      [t("country")]: t("countries.Argentina"),
      [t("lifeExpectancy")]: 76.3,
      [t("gdp")]: 13467.1236,
      [t("population")]: 43417765,
    },
    {
      [t("country")]: t("countries.Australia"),
      [t("lifeExpectancy")]: 82.8,
      [t("gdp")]: 56554.3876,
      [t("population")]: 23789338,
    },
    {
      [t("country")]: t("countries.Austria"),
      [t("lifeExpectancy")]: 81.5,
      [t("gdp")]: 43665.947,
      [t("population")]: 8633169,
    },
    {
      [t("country")]: t("countries.Brazil"),
      [t("lifeExpectancy")]: 75.4,
      [t("gdp")]: 11024.0342,
      [t("population")]: 211049527,
    },
    {
      [t("country")]: t("countries.Canada"),
      [t("lifeExpectancy")]: 82.3,
      [t("gdp")]: 44974.243,
      [t("population")]: 37058856,
    },
    {
      [t("country")]: t("countries.China"),
      [t("lifeExpectancy")]: 76.9,
      [t("gdp")]: 10746.782,
      [t("population")]: 13715000,
    },
    {
      [t("country")]: t("countries.Denmark"),
      [t("lifeExpectancy")]: 80.7,
      [t("gdp")]: 55675.003,
      [t("population")]: 5754356,
    },
    {
      [t("country")]: t("countries.Egypt"),
      [t("lifeExpectancy")]: 71.8,
      [t("gdp")]: 5744.787,
      [t("population")]: 98423595,
    },
    {
      [t("country")]: t("countries.Finland"),
      [t("lifeExpectancy")]: 81.1,
      [t("gdp")]: 42032.056,
      [t("population")]: 552529,
    },
    {
      [t("country")]: t("countries.Germany"),
      [t("lifeExpectancy")]: 81.0,
      [t("gdp")]: 44680.009,
      [t("population")]: 82792351,
    },
    {
      [t("country")]: t("countries.India"),
      [t("lifeExpectancy")]: 69.4,
      [t("gdp")]: 5191.054,
      [t("population")]: 16417754,
    },
    {
      [t("country")]: t("countries.Japan"),
      [t("lifeExpectancy")]: 84.1,
      [t("gdp")]: 40551.553,
      [t("population")]: 126530000,
    },
    {
      [t("country")]: t("countries.Mexico"),
      [t("lifeExpectancy")]: 74.9,
      [t("gdp")]: 17924.041,
      [t("population")]: 127575529,
    },
    {
      [t("country")]: t("countries.Netherlands"),
      [t("lifeExpectancy")]: 81.5,
      [t("gdp")]: 49088.289,
      [t("population")]: 17134872,
    },
    {
      [t("country")]: t("countries.Russia"),
      [t("lifeExpectancy")]: 72.6,
      [t("gdp")]: 11288.872,
      [t("population")]: 144478050,
    },
    {
      [t("country")]: t("countries.Poland"),
      [t("lifeExpectancy")]: 77.5,
      [t("gdp")]: 29582.345,
      [t("population")]: 37887768,
    },
    {
      [t("country")]: t("countries.Spain"),
      [t("lifeExpectancy")]: 83.4,
      [t("gdp")]: 32290.175,
      [t("population")]: 46736776,
    },
    {
      [t("country")]: t("countries.Greece"),
      [t("lifeExpectancy")]: 81.1,
      [t("gdp")]: 21345.678,
      [t("population")]: 10473455,
    },
  ];

  return (
    <Card className="w-full h-full" title={t("title")} padding="px-9">
      <span style={{ fontSize: "0.85rem", color: "rgb(140, 145, 150)" }}>
        {t("subtitle")}
      </span>
      <ScatterChart
        className="h-56 1xl:h-72 3xl:h-80 mt-6 -ml-2"
        yAxisWidth={50}
        data={chartdata}
        category={t("country")}
        x={t("gdp")}
        y={t("lifeExpectancy")}
        size={t("population")}
        showOpacity={true}
        minYValue={60}
        valueFormatter={{
          x: (amount) => `$${(amount / 1000).toFixed(1)}K`,
          y: (lifeExp) => `${lifeExp} ${t("yrs")}`,
          size: (population) => `${(population / 1000000).toFixed(1)}M`,
        }}
        showLegend={false}
      />
    </Card>
  );
};
