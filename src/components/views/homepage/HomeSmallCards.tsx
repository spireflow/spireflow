import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import { useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

import { useTranslateData } from "../../../hooks/useTranslateData";
import { HomeSmallCardsProps } from "./types";
import { useChartColors } from "../../../hooks/useChartColors";
import { Tooltip } from "../../common/Tooltip";
import { useMediaQuery } from "../../../hooks/useMediaQuery";

export const HomeSmallCards = ({ homeSmallCardsData }: HomeSmallCardsProps) => {
  const t = useTranslations("homepage.homeSmallCards");
  const { theme } = useTheme();
  const chartColors = useChartColors(theme as "dark" | "light");
  const [hoveredChart, setHoveredChart] = useState<number | null>(null);
  const is2XL = useMediaQuery("(min-width: 1750px)");
  const isMobile = useMediaQuery("(max-width: 479px)");

  const translations = {
    Sales: t("sales"),
    Profit: t("profit"),
    Traffic: t("traffic"),
    Customers: t("customers"),
    "Last 3 weeks": t("Last 3 weeks"),
    "Last month": t("Last month"),
    Yesterday: t("Yesterday"),
    "Last week": t("Last week"),
  };

  const translatedData = useTranslateData(homeSmallCardsData, translations);

  // Take first 3 cards
  const metricsData = translatedData.slice(0, 3);

  // Hardcoded percentages for visual representation
  const hardcodedPercentages = [37, 28, 64];

  const getChartColor = (index: number) => {
    const colors = [
      chartColors.primary.fill, // Green
      chartColors.secondary.fill, // Blue
      chartColors.primary.fill, // Green
    ];
    return colors[index];
  };

  const renderCircularChart = (
    percentage: number,
    color: string,
    index: number
  ) => {
    const data = [
      { name: "completed", value: percentage },
      { name: "remaining", value: 100 - percentage },
    ];

    // Color for the remaining part of the pie chart
    const remainingColor =
      theme === "light" ? "rgba(0, 0, 0, 0.1)" : "rgba(255, 255, 255, 0.1)";

    // Responsive circle sizes
    let innerRadius, outerRadius;

    if (isMobile) {
      // Mobile: 1.5x larger
      innerRadius = 39; // 1.5x of 26
      outerRadius = 51; // 1.5x of 34
    } else if (is2XL) {
      // Desktop large
      innerRadius = 32;
      outerRadius = 41;
    } else {
      // Tablet/small desktop
      innerRadius = 26;
      outerRadius = 34;
    }

    return (
      <div
        onMouseEnter={() => setHoveredChart(index)}
        onMouseLeave={() => setHoveredChart(null)}
        className="w-[112px] h-[112px] xsm:w-[75px] xsm:h-[75px] 2xl:w-[90px] 2xl:h-[90px] transition-transform duration-200 group-hover:scale-110"
      >
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={innerRadius}
              outerRadius={outerRadius}
              startAngle={90}
              endAngle={-270}
              dataKey="value"
              stroke="none"
              isAnimationActive={false}
            >
              <Cell fill={color} />
              <Cell fill={remainingColor} />
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
    );
  };

  return (
    <>
      {/* Mobile: separate cards */}
      <div className="flex flex-col gap-4 xsm:hidden">
        {metricsData.map((metric, index) => (
          <div
            key={metric.title}
            className="border light:shadow-lg border-cardBorder rounded-[12px] bg-primaryBg relative w-full text-left py-6 px-8"
          >
            <div className="flex items-center justify-between gap-5 w-full">
              <div className="flex flex-col justify-center gap-1.5">
                <h3 className="text-secondaryText text-sm font-medium">
                  {metric.title}
                </h3>
                <p className="text-primaryText text-3xl font-bold mb-1">
                  {metric.metric}
                </p>
                <p className="text-sm flex items-center gap-1.5">
                  <span
                    className={
                      metric.increased ? "text-green-500" : "text-red-500"
                    }
                  >
                    {metric.increased ? "+" : "-"}
                    {metric.changeValue}%
                  </span>
                  <span className="text-secondaryText text-xs">
                    {metric.changeText}
                  </span>
                </p>
              </div>
              <div className="relative flex items-center justify-center flex-shrink-0 group cursor-pointer">
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 transition-transform duration-200 group-hover:scale-110">
                  <span className="text-primaryText text-sm font-bold">
                    {hardcodedPercentages[index]}%
                  </span>
                </div>
                {renderCircularChart(
                  hardcodedPercentages[index],
                  getChartColor(index),
                  index
                )}
                {hoveredChart === index && (
                  <div
                    className="absolute pointer-events-none"
                    style={{ top: "-24px", right: "-79px", zIndex: 999999999 }}
                  >
                    <Tooltip text={t("monthlyTarget")} />
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Tablet+: single card with all metrics */}
      <div className="hidden xsm:flex border light:shadow-lg border-cardBorder rounded-[12px] bg-primaryBg relative w-full text-left py-6 3xl:py-[1.85rem]">
        <div className="flex flex-row justify-between gap-3 1xl:gap-4 2xl:gap-6 3xl:gap-8 px-5 3xl:px-4 w-full">
          {metricsData.map((metric, index) => (
            <div
              key={metric.title}
              className={`flex flex-1 items-center justify-center gap-3 1xl:gap-4 2xl:gap-6 3xl:gap-10 ${
                index === 2 ? "flex xsm:hidden md:flex" : ""
              }`}
            >
              <div className="flex flex-col justify-center gap-1.5">
                <h3 className="text-secondaryText text-sm font-medium">
                  {metric.title}
                </h3>
                <p className="text-primaryText text-3xl xsm:text-lg 1xl:text-xl 2xl:text-2xl 3xl:text-3xl font-bold mb-1">
                  {metric.metric}
                </p>
                <p className="text-sm flex items-center gap-1.5">
                  <span
                    className={
                      metric.increased ? "text-green-500" : "text-red-500"
                    }
                  >
                    {metric.increased ? "+" : "-"}
                    {metric.changeValue}%
                  </span>
                  <span className="text-secondaryText text-xs">
                    {metric.changeText}
                  </span>
                </p>
              </div>
              <div className="relative flex items-center justify-center flex-shrink-0 group cursor-pointer">
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 transition-transform duration-200 group-hover:scale-110">
                  <span className="text-primaryText text-sm 1xl:text-base font-bold">
                    {hardcodedPercentages[index]}%
                  </span>
                </div>
                {renderCircularChart(
                  hardcodedPercentages[index],
                  getChartColor(index),
                  index
                )}
                {hoveredChart === index && (
                  <div
                    className="absolute pointer-events-none"
                    style={{ top: "-24px", right: "-79px", zIndex: 999999999 }}
                  >
                    <Tooltip text={t("monthlyTarget")} />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
