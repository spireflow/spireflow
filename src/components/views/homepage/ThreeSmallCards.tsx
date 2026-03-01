import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

import { ThreeSmallCardsProps } from "./types";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "../../common/shadcn/tooltip";

import { useChartAnimation } from "../../../hooks/useChartAnimation";

export const ThreeSmallCards = ({
  threeSmallCardsData,
}: ThreeSmallCardsProps) => {
  const t = useTranslations("homepage.threeSmallCards");
  const { theme } = useTheme();
  const { shouldAnimate, animationBegin } = useChartAnimation("homepage");

  const [isBelow1280, setIsBelow1280] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsBelow1280(window.innerWidth < 1280);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const hoverScaleClass =
    "transition-transform duration-200 group-hover:scale-110";

  // Take first 3 cards
  const metricsData = threeSmallCardsData.slice(0, 3);

  // Hardcoded percentages for visual representation
  const hardcodedPercentages = [37, 28, 64];

  const getChartColor = (index: number) => {
    const colors = [
      "var(--color-chartPrimaryFill)",
      "var(--color-chartSecondaryFill)",
      "var(--color-chartPrimaryFill)",
    ];
    return colors[index];
  };

  const renderCircularChart = (percentage: number, color: string) => {
    const data = [
      { name: "completed", value: percentage },
      { name: "remaining", value: 100 - percentage },
    ];

    // Color for the remaining part of the pie chart
    const remainingColor =
      theme === "light" ? "rgba(0, 0, 0, 0.1)" : "rgba(255, 255, 255, 0.1)";

    return (
      <div
        role="img"
        aria-label="Metric chart"
        className={`w-[6.5rem] h-[6.5rem] sm:w-[6.25rem] sm:h-[6.25rem] md:w-[4.75rem] md:h-[4.75rem] lg:w-[4.5rem] lg:h-[4.5rem] xl:w-20 xl:h-20 3xl:w-24 3xl:h-24 ${hoverScaleClass}`}
      >
        <ResponsiveContainer
          width="100%"
          height="100%"
          initialDimension={{ width: 100, height: 100 }}
        >
          <PieChart tabIndex={-1}>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius="66%"
              outerRadius="86%"
              startAngle={90}
              endAngle={-270}
              dataKey="value"
              stroke="none"
              isAnimationActive={shouldAnimate}
              animationBegin={animationBegin}
              animationDuration={800}
              animationEasing="ease-out"
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
      <div className="flex flex-col gap-4 sm:hidden">
        {metricsData.map((metric, index) => (
          <div
            key={metric.title}
            className="border light:shadow-lg border-cardBorder rounded-[12px] bg-primaryBg relative w-full text-left py-6 pl-8 pr-5 min-[25rem]:pr-8"
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
                  <span className="text-secondaryText text-xs whitespace-nowrap">
                    {metric.changeText}
                  </span>
                </p>
              </div>
              <div
                className="relative flex items-center justify-center flex-shrink-0 group"
                tabIndex={-1}
              >
                <div
                  className={`absolute inset-0 flex items-center justify-center pointer-events-none z-10 ${hoverScaleClass}`}
                >
                  <span className="text-primaryText text-sm font-bold">
                    {hardcodedPercentages[index]}%
                  </span>
                </div>
                {renderCircularChart(
                  hardcodedPercentages[index],
                  getChartColor(index),
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Small tablet (640-768px): 2 separate cards in a row */}
      <div className="hidden sm:grid md:hidden grid-cols-2 gap-4">
        {metricsData.slice(0, 2).map((metric, index) => (
          <div
            key={metric.title}
            className="border light:shadow-lg border-cardBorder rounded-[12px] bg-primaryBg relative w-full text-left py-5 px-5"
          >
            <div className="flex items-center justify-between gap-3 w-full">
              <div className="flex flex-col justify-center gap-1">
                <h3 className="text-secondaryText text-sm font-medium">
                  {metric.title}
                </h3>
                <p className="text-primaryText text-2xl font-bold mb-0.5">
                  {metric.metric}
                </p>
                <p className="text-xs flex items-center gap-1.5">
                  <span
                    className={
                      metric.increased ? "text-green-500" : "text-red-500"
                    }
                  >
                    {metric.increased ? "+" : "-"}
                    {metric.changeValue}%
                  </span>
                  <span className="text-secondaryText text-[0.625rem] whitespace-nowrap">
                    {metric.changeText}
                  </span>
                </p>
              </div>
              <div
                className="relative flex items-center justify-center flex-shrink-0 group"
                tabIndex={-1}
              >
                <div
                  className={`absolute inset-0 flex items-center justify-center pointer-events-none z-10 ${hoverScaleClass}`}
                >
                  <span className="text-primaryText text-sm font-bold">
                    {hardcodedPercentages[index]}%
                  </span>
                </div>
                {renderCircularChart(
                  hardcodedPercentages[index],
                  getChartColor(index),
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Tablet+: single card with all metrics */}
      <div className="hidden md:flex border light:shadow-lg border-cardBorder rounded-[12px] bg-primaryBg relative w-full text-left py-4 1xl:py-[1.3rem] 3xl:py-[1.5rem]">
        <div className="flex flex-row justify-between gap-3 1xl:gap-4 2xl:gap-6 3xl:gap-8 px-5 3xl:px-4 w-full">
          {metricsData.map((metric, index) => (
            <div
              key={metric.title}
              className="flex flex-1 items-center justify-center gap-3 md:gap-5 lg:gap-3 1xl:gap-4 2xl:gap-6 3xl:gap-10"
            >
              <div className="flex flex-col justify-center gap-0.5 3xl:gap-1.5">
                <h3 className="text-secondaryText text-sm font-medium">
                  {metric.title}
                </h3>
                <p className="text-primaryText text-3xl xsm:text-base 1xl:text-xl 2xl:text-2xl 3xl:text-3xl font-bold mb-0 3xl:mb-1">
                  {metric.metric}
                </p>
                <p className="text-xs 3xl:text-sm flex items-center gap-1.5 mt-1 3xl:mt-0">
                  <span
                    className={
                      metric.increased ? "text-green-500" : "text-red-500"
                    }
                  >
                    {metric.increased ? "+" : "-"}
                    {metric.changeValue}%
                  </span>
                  <span className="text-secondaryText text-[0.625rem] 3xl:text-xs whitespace-nowrap">
                    {metric.changeText}
                  </span>
                </p>
              </div>
              <Tooltip open={isBelow1280 ? false : undefined}>
                <TooltipTrigger asChild>
                  <div
                    className={`relative flex items-center justify-center flex-shrink-0 group ${isBelow1280 ? "" : "cursor-pointer"}`}
                    tabIndex={-1}
                  >
                    <div
                      className={`absolute inset-0 flex items-center justify-center pointer-events-none z-10 ${hoverScaleClass}`}
                    >
                      <span className="text-primaryText text-xs 3xl:text-base font-bold">
                        {hardcodedPercentages[index]}%
                      </span>
                    </div>
                    {renderCircularChart(
                      hardcodedPercentages[index],
                      getChartColor(index),
                    )}
                  </div>
                </TooltipTrigger>
                <TooltipContent
                  side="right"
                  align="start"
                  alignOffset={-30}
                  sideOffset={-4}
                >
                  <p>{t("monthlyTarget")}</p>
                </TooltipContent>
              </Tooltip>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
