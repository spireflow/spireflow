import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
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

export const HomeSmallCards = ({ homeSmallCardsData }: HomeSmallCardsProps) => {
  const t = useTranslations("homepage.homeSmallCards");
  const { theme } = useTheme();
  const chartColors = useChartColors(theme as "dark" | "light");

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

  const renderCircularChart = (percentage: number, color: string) => {
    const data = [
      { name: "completed", value: percentage },
      { name: "remaining", value: 100 - percentage },
    ];

    return (
      <ResponsiveContainer width={110} height={110}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={38}
            outerRadius={50}
            startAngle={90}
            endAngle={-270}
            dataKey="value"
            stroke="none"
            isAnimationActive={false}
          >
            <Cell fill={color} />
            <Cell fill="rgba(255, 255, 255, 0.1)" />
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    );
  };

  return (
    <Card className="!pt-2 !pb-2 [&>div]:!pb-2 [&>div]:!pt-2">
      <div className="flex flex-row justify-between items-center gap-8 px-4 py-1">
        {metricsData.map((metric, index) => (
          <div
            key={metric.title}
            className="flex flex-1 items-center justify-center gap-12"
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
              {renderCircularChart(hardcodedPercentages[index], getChartColor(index))}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-primaryText text-base font-bold">
                  {hardcodedPercentages[index]}%
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
