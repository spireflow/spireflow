import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import { useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

import { useTranslateData } from "../../../hooks/useTranslateData";
import { HomeSmallCardsProps } from "./types";
import { Card } from "../../common/Card";
import { useChartColors } from "../../../hooks/useChartColors";
import { Tooltip } from "../../common/Tooltip";

export const HomeSmallCards = ({ homeSmallCardsData }: HomeSmallCardsProps) => {
  const t = useTranslations("homepage.homeSmallCards");
  const { theme } = useTheme();
  const chartColors = useChartColors(theme as "dark" | "light");
  const [hoveredChart, setHoveredChart] = useState<number | null>(null);

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

  const renderCircularChart = (percentage: number, color: string, index: number) => {
    const data = [
      { name: "completed", value: percentage },
      { name: "remaining", value: 100 - percentage },
    ];

    // Color for the remaining part of the pie chart
    const remainingColor = theme === "light" 
      ? "rgba(0, 0, 0, 0.1)" 
      : "rgba(255, 255, 255, 0.1)";

    return (
      <div 
        onMouseEnter={() => setHoveredChart(index)}
        onMouseLeave={() => setHoveredChart(null)}
      >
        <ResponsiveContainer width={90} height={90}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={32}
              outerRadius={41}
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
    <Card className="!pt-2 !pb-2 [&>div]:!pb-2 [&>div]:!pt-2 flex items-center h-[calc(100%-1rem)]">
      <div className="flex flex-row justify-between items-center gap-8 px-4 py-1 w-full">
        {metricsData.map((metric, index) => (
          <div
            key={metric.title}
            className="flex flex-1 items-center justify-center gap-8"
          >
            <div className="flex flex-col justify-center gap-1.5">
              <h3 className="text-secondaryText text-sm font-medium">
                {metric.title}
              </h3>
              <p className="text-primaryText text-2xl 1xl:text-3xl font-bold mb-1">
                {metric.metric}
              </p>
              <p className="text-sm flex items-center gap-1.5">
                <span className={metric.increased ? "text-green-500" : "text-red-500"}>
                  {metric.increased ? "+" : "-"}{metric.changeValue}%
                </span>
                <span className="text-secondaryText text-xs">{metric.changeText}</span>
              </p>
            </div>
            <div className="relative flex items-center justify-center flex-shrink-0">
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                <span className="text-primaryText text-base font-bold">
                  {hardcodedPercentages[index]}%
                </span>
              </div>
              {renderCircularChart(hardcodedPercentages[index], getChartColor(index), index)}
              {hoveredChart === index && (
                <div className="absolute pointer-events-none" style={{ top: '-24px', right: '-79px', zIndex: 999999999 }}>
                  <Tooltip text={t("monthlyTarget")} />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
