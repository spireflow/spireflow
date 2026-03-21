import { useTranslations } from "next-intl";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

import { useChartAnimation } from "../../../../hooks/useChartAnimation";
import { useIsFirstRender } from "../../../../hooks/useIsFirstRender";
import { useMediaQuery } from "../../../../hooks/useMediaQuery";
import { BREAKPOINTS } from "../../../../styles/breakpoints";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "../../../common/shadcn/tooltip";
import { ThreeSmallCardsProps } from "../types";

export const ThreeSmallCards = ({
  threeSmallCardsData,
}: ThreeSmallCardsProps) => {
  const t = useTranslations("homepage.threeSmallCards");
  const { shouldAnimate, animationBegin } = useChartAnimation("homepage");

  const isFirstRender = useIsFirstRender();
  const isSm = useMediaQuery(`(min-width: ${BREAKPOINTS.sm}px)`);
  const isMd = useMediaQuery(`(min-width: ${BREAKPOINTS.md}px)`);
  const isBelow1280 = !useMediaQuery(`(min-width: ${BREAKPOINTS.xl}px)`);

  const shouldRenderMobileCharts = !isFirstRender && !isSm;
  const shouldRenderTabletCharts = !isFirstRender && isSm && !isMd;
  const shouldRenderDesktopCharts = !isFirstRender && isMd;

  const hoverScaleClass =
    "transition-transform duration-200 group-hover:scale-110";

  const metricsData = threeSmallCardsData.slice(0, 3);

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

    const remainingColor = "var(--color-chartSecondaryDisabled)";

    return (
      <div
        role="img"
        aria-label="Metric chart"
        className={`w-26 h-26 sm:w-25 sm:h-25 md:w-19 md:h-19 lg:w-18 lg:h-18 xl:w-20 xl:h-20 3xl:w-24 3xl:h-24 ${hoverScaleClass}`}
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
            style={{ boxShadow: "var(--cardShadow)" }}
            className="border border-cardBorder rounded-xl bg-primaryBg relative w-full text-left py-4 pl-8 pr-5 min-[25rem]:pr-8"
          >
            <div className="flex items-center justify-between gap-5 w-full">
              <div className="flex flex-col justify-center gap-1.5">
                <p className="text-secondaryText text-sm font-medium">
                  {metric.title}
                </p>
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
                {shouldRenderMobileCharts &&
                  renderCircularChart(
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
            style={{ boxShadow: "var(--cardShadow)" }}
            className="border border-cardBorder rounded-xl bg-primaryBg relative w-full text-left py-4 px-5"
          >
            <div className="flex items-center justify-between gap-3 w-full">
              <div className="flex flex-col justify-center gap-1">
                <p className="text-secondaryText text-sm font-medium">
                  {metric.title}
                </p>
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
                {shouldRenderTabletCharts &&
                  renderCircularChart(
                    hardcodedPercentages[index],
                    getChartColor(index),
                  )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Tablet+: single card with all metrics */}
      <div
        style={{ boxShadow: "var(--cardShadow)" }}
        className="hidden md:flex border border-cardBorder rounded-xl bg-primaryBg relative w-full text-left py-4 1xl:py-[1.3rem] 3xl:py-6"
      >
        <div className="flex flex-row justify-between gap-3 1xl:gap-4 2xl:gap-6 3xl:gap-8 px-5 3xl:px-4 w-full">
          {metricsData.map((metric, index) => (
            <div
              key={metric.title}
              className="flex flex-1 items-center justify-center gap-3 md:gap-5 lg:gap-3 1xl:gap-4 2xl:gap-6 3xl:gap-10"
            >
              <div className="flex flex-col justify-center gap-0.5 3xl:gap-1.5">
                <p className="text-secondaryText text-sm font-medium">
                  {metric.title}
                </p>
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
              {!isFirstRender && !isBelow1280 ? (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div
                      className="relative flex items-center justify-center flex-shrink-0 group cursor-pointer"
                      tabIndex={-1}
                    >
                      <div
                        className={`absolute inset-0 flex items-center justify-center pointer-events-none z-10 ${hoverScaleClass}`}
                      >
                        <span className="text-primaryText text-xs 3xl:text-base font-bold">
                          {hardcodedPercentages[index]}%
                        </span>
                      </div>
                      {shouldRenderDesktopCharts &&
                        renderCircularChart(
                          hardcodedPercentages[index],
                          getChartColor(index),
                        )}
                    </div>
                  </TooltipTrigger>
                  <TooltipContent
                    side="right"
                    align="start"
                    alignOffset={-14}
                    sideOffset={-4}
                  >
                    <p>{t("monthlyTarget")}</p>
                  </TooltipContent>
                </Tooltip>
              ) : (
                <div
                  className="relative flex items-center justify-center flex-shrink-0 group"
                  tabIndex={-1}
                >
                  <div
                    className={`absolute inset-0 flex items-center justify-center pointer-events-none z-10 ${hoverScaleClass}`}
                  >
                    <span className="text-primaryText text-xs 3xl:text-base font-bold">
                      {hardcodedPercentages[index]}%
                    </span>
                  </div>
                  {shouldRenderDesktopCharts &&
                    renderCircularChart(
                      hardcodedPercentages[index],
                      getChartColor(index),
                    )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
