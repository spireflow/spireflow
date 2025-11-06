"use client";

import { AreaChart } from "@tremor/react";
import { useTheme } from "next-themes";
import { useTranslations } from "next-intl";

import { CenteredPageWrapper } from "../../../../components/common/CenteredPageWrapper";

const Area = () => {
  const dataFormatter = (number: number) => {
    return Intl.NumberFormat("us").format(number).toString();
  };

  const { theme } = useTheme();

  const colorSchemes: { [key: string]: string[] } = {
    dark: ["gray", "emerald"],
  };

  const defaultTheme = "midnight";

  const selectedColors = colorSchemes[theme || defaultTheme];

  const t = useTranslations("singleCharts.area");

  const chartdata = [
    {
      date: t("jan"),
      [t("views")]: 1983,
      [t("uniqueVisitors")]: 1654,
    },
    {
      date: t("feb"),
      [t("views")]: 2543,
      [t("uniqueVisitors")]: 1320,
    },
    {
      date: t("mar"),
      [t("views")]: 3221,
      [t("uniqueVisitors")]: 1845,
    },
    {
      date: t("apr"),
      [t("views")]: 2896,
      [t("uniqueVisitors")]: 1990,
    },
    {
      date: t("may"),
      [t("views")]: 3577,
      [t("uniqueVisitors")]: 1530,
    },
    {
      date: t("jun"),
      [t("views")]: 3188,
      [t("uniqueVisitors")]: 2421,
    },
  ];

  return (
    <CenteredPageWrapper>
      <>
        <div className="text-lg 1xl:text-xl 3xl:text-2xl w-full text-left mb-4 1xl:mb-6 text-primaryText">
          {t("title")}
        </div>
        <AreaChart
          className="h-72 1xl:h-80 3xl:h-96 3xl:mt-4"
          data={chartdata}
          index="date"
          categories={[t("views"), t("uniqueVisitors")]}
          colors={selectedColors}
          valueFormatter={dataFormatter}
        />
      </>
    </CenteredPageWrapper>
  );
};

export default Area;
