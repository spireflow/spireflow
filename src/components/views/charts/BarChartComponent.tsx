"use client";

import { BarChart } from "@tremor/react";
import { useTranslations } from "next-intl";
import { Card } from "../../common/Card";

export const BarChartComponent = () => {
  const t = useTranslations("singleCharts.bars");

  const barChartData = [
    {
      name: "Q1 2023",
      [t("widgets")]: 745,
      [t("gadgets")]: 523,
      [t("modules")]: 634,
      [t("components")]: 478,
      [t("kits")]: 365,
      [t("accessories")]: 598,
    },
    {
      name: "Q2 2023",
      [t("widgets")]: 812,
      [t("gadgets")]: 436,
      [t("modules")]: 587,
      [t("components")]: 519,
      [t("kits")]: 402,
      [t("accessories")]: 670,
    },
    {
      name: "Q3 2023",
      [t("widgets")]: 670,
      [t("gadgets")]: 489,
      [t("modules")]: 456,
      [t("components")]: 432,
      [t("kits")]: 389,
      [t("accessories")]: 722,
    },
    {
      name: "Q4 2023",
      [t("widgets")]: 693,
      [t("gadgets")]: 575,
      [t("modules")]: 563,
      [t("components")]: 499,
      [t("kits")]: 416,
      [t("accessories")]: 655,
    },
  ];

  const dataFormatter = (number: number) => {
    return "$ " + Intl.NumberFormat("us").format(number).toString();
  };

  return (
    <Card
      className="w-full pt-11 pb-6"
      title={t("title")}
      padding="px-6 md:px-20"
    >
      <BarChart
        className="h-64 1xl:h-80 3xl:mt-6 single-chart-bars"
        data={barChartData}
        index="name"
        categories={[
          t("widgets"),
          t("gadgets"),
          t("modules"),
          t("components"),
          t("kits"),
          t("accessories"),
        ]}
        colors={["blue", "teal", "amber", "rose", "indigo", "emerald"]}
        valueFormatter={dataFormatter}
        yAxisWidth={48}
      />
    </Card>
  );
};
