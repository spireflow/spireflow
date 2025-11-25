"use client";

import { LineChart } from "@tremor/react";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import { useWindowDimensions } from "../../../hooks/useWindowDimensions";
import { Card } from "../../common/Card";

export const LineChartComponent = () => {
  const t = useTranslations("singleCharts.line");

  const { width: windowWidth } = useWindowDimensions();

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
  const dataFormatter = (number: number) =>
    `${Intl.NumberFormat("us").format(number).toString()}`;

  const { theme } = useTheme();

  const colorSchemes: { [key: string]: string } = {
    dark: "emerald",
    light: "blue",
  };

  const defaultTheme = "midnight";

  const mainLineColor = colorSchemes[theme || defaultTheme];

  return (
    <Card
      className="w-full pt-11 pb-6"
      title={t("title")}
      padding="px-6 md:px-20"
    >
      <LineChart
        className="mt-2 1xl:mt-6 h-56 1xl:h-72 3xl:h-80"
        data={dragonPopulationInWesteros}
        index="year"
        categories={[t("houseTargaryen"), t("houseVelaryon")]}
        colors={[mainLineColor, "slate"]}
        valueFormatter={dataFormatter}
        yAxisWidth={40}
        intervalType="preserveStartEnd"
      />
      <div className="w-full hidden sm:flex justify-between mx-auto mt-6 1xl:mt-8 ml-8">
        {dragonPopulationInWesteros.map((item, index) => (
          <div
            key={index}
            className="text-[12px] lg:text-[13px] text-primaryText px-2"
          >
            {item.title}
          </div>
        ))}
      </div>
    </Card>
  );
};
