import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import {
  Bar,
  BarChart,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
} from "recharts";

import { useChartAnimation } from "../../../../hooks/useChartAnimation";
import { useMediaQuery } from "../../../../hooks/useMediaQuery";
import { Card } from "../../../common/Card";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "../../../common/shadcn/tooltip";
import { FourSmallCardsProps } from "../types";

export const FourSmallCards = ({ fourSmallCardsData }: FourSmallCardsProps) => {
  const t = useTranslations("homepage.fourSmallCards");
  const { theme } = useTheme();
  const isLg = useMediaQuery("(min-width: 1024px)");
  const is1xl = useMediaQuery("(min-width: 1280px)");
  const is3xl = useMediaQuery("(min-width: 1920px)");
  const { shouldAnimate, animationBegin } = useChartAnimation("homepage");

  const hoverScaleClass =
    "transition-transform duration-200 group-hover:scale-110";

  const cardIds = ["salesCard", "profitCard", "trafficCard", "customersCard"];

  const hardcodedPercentages = [37, 28, 64, 45];

  const getChartColor = (index: number) => {
    const colors = [
      "var(--color-chartPrimaryFill)",
      "var(--color-chartSecondaryFill)",
      "var(--color-chartPrimaryFill)",
      "var(--color-chartSecondaryFill)",
    ];
    return colors[index];
  };

  const renderCircularChart = (percentage: number, color: string) => {
    const data = [
      { name: "completed", value: percentage },
      { name: "remaining", value: 100 - percentage },
    ];

    const remainingColor =
      theme === "light" ? "rgba(0, 0, 0, 0.1)" : "rgba(255, 255, 255, 0.1)";

    let innerRadius: number;
    let outerRadius: number;

    if (is3xl) {
      innerRadius = 26;
      outerRadius = 34;
    } else if (is1xl) {
      innerRadius = 24;
      outerRadius = 31;
    } else if (isLg) {
      innerRadius = 20;
      outerRadius = 26;
    } else {
      innerRadius = 24;
      outerRadius = 31;
    }

    return (
      <div
        role="img"
        aria-label="Metric chart"
        className={`size-16 lg:size-14 xl:size-16 3xl:size-20 ${hoverScaleClass}`}
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

  const renderBarChart = (
    chartData: { date: string; metric: number }[],
    color: string,
  ) => {
    return (
      <div
        role="img"
        aria-label="Metric chart"
        className={`w-28 h-16 lg:w-20 lg:h-14 1xl:w-24 1xl:h-16 3xl:w-28 3xl:h-20 ${hoverScaleClass}`}
      >
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} barCategoryGap={1}>
            <Bar
              dataKey="metric"
              fill={color}
              radius={[2, 2, 0, 0]}
              maxBarSize={12}
              isAnimationActive={shouldAnimate}
              animationBegin={animationBegin}
              animationDuration={800}
              animationEasing="ease-out"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  };

  return (
    <>
      {fourSmallCardsData.map((item, index) => (
        <Card
          key={`${item.title}-${index}`}
          id={cardIds[index]}
          className="lg:h-28 1xl:h-28 3xl:h-32 px-5 py-0 lg:py-4 lg:pt-[1.45rem] 2xl:px-6"
        >
          <div className="flex items-center justify-between gap-6 lg:gap-5 1xl:gap-6 h-full">
            <div className="flex flex-col justify-center whitespace-nowrap 1xl:-translate-y-1 3xl:translate-y-0">
              <div className="text-secondaryText text-sm lg:text-xs 1xl:text-sm tracking-tight">
                {item.title}
              </div>
              <div className="text-3xl lg:text-2xl 1xl:text-2xl 3xl:text-3xl font-semibold text-primaryText">
                {item.metric}
              </div>
              <div className="flex items-center gap-1.5 text-xs text-secondaryText mt-0.5">
                <span>{item.changeText}</span>
                <span
                  className={
                    item.increased ? "text-green-500/70" : "text-red-500/70"
                  }
                >
                  {item.increased ? "+" : "-"}
                  {item.changeValue}%
                </span>
              </div>
            </div>
            {index !== 0 && index !== 2 ? (
              <div className="flex items-center justify-center flex-shrink-0 group cursor-pointer">
                {renderBarChart(item.chartData, getChartColor(index))}
              </div>
            ) : (
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="relative flex items-center justify-center flex-shrink-0 group cursor-pointer">
                    <div
                      className={`absolute inset-0 flex items-center justify-center pointer-events-none z-10 ${hoverScaleClass}`}
                    >
                      <span className="text-primaryText text-xs lg:text-[0.625rem] 1xl:text-xs 3xl:text-sm font-bold">
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
                  alignOffset={-18}
                  sideOffset={-4}
                >
                  <p>{t("monthlyTarget")}</p>
                </TooltipContent>
              </Tooltip>
            )}
          </div>
        </Card>
      ))}
    </>
  );
};
