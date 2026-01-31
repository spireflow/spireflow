"use client";

import { useState, useRef } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { useTheme } from "next-themes";
import { useTranslations } from "next-intl";

import { AssetPerformanceProps } from "./types";
import { Card } from "../../common/Card";
import { BaseTooltip } from "../../common/BaseTooltip";
import { useChartColors } from "../../../hooks/useChartColors";
import { useChartAnimation } from "../../../hooks/useChartAnimation";

interface AssetDataWithColor {
  name: string;
  sales: number;
  color: string;
}

interface AssetTooltipProps {
  active?: boolean;
  payload?: Array<{
    payload: AssetDataWithColor;
  }>;
}

const AssetTooltip = ({ active, payload }: AssetTooltipProps) => {
  if (!active || !payload || payload.length === 0) return null;

  const data = payload[0].payload;
  const color = data.color;

  return (
    <BaseTooltip title={data.name}>
      <p className="px-3 pb-1 text-primaryText flex items-center justify-between">
        <span>
          <span
            className="w-2 h-2 mr-2 rounded inline-block"
            style={{ backgroundColor: color }}
          />
          Sales:
        </span>
        <span className="pl-[0.7rem]">
          {Intl.NumberFormat("us").format(data.sales)} $
        </span>
      </p>
    </BaseTooltip>
  );
};

export const AssetPerformance = ({
  assetPerformanceData,
}: AssetPerformanceProps) => {
  const t = useTranslations("analytics.assetPerformance");
  const { theme } = useTheme();
  const chartColors = useChartColors(theme as "dark" | "light");
  const { shouldAnimate, animationBegin } = useChartAnimation("analytics");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const chartContainerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (chartContainerRef.current) {
      const rect = chartContainerRef.current.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  const COLORS = [
    chartColors.primary.fill,
    chartColors.secondary.fill,
    "rgb(168, 162, 255)",
    "rgb(100, 200, 180)",
    "rgb(255, 150, 150)",
    "rgb(255, 200, 100)",
    "rgb(150, 150, 255)",
    "rgb(200, 100, 255)",
  ];

  const dataWithColors: AssetDataWithColor[] = assetPerformanceData.map(
    (item, index) => ({
      ...item,
      color: COLORS[index % COLORS.length],
    })
  );

  const totalSales = assetPerformanceData.reduce(
    (sum, asset) => sum + asset.sales,
    0
  );

  const getDeltaColor = (status: string) => {
    switch (status) {
      case "emerald":
        return "rgb(16, 185, 129)";
      case "rose":
        return "rgb(244, 63, 94)";
      default:
        return "rgb(156, 163, 175)";
    }
  };

  return (
    <Card
      className="assetPerformanceCard h-full"
      id="assetPerformance"
      title={t("title")}
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 mt-4 1xl:mt-6 3xl:mt-8 gap-x-10 gap-y-10">
        <div className="flex justify-center items-center">
          <div
            ref={chartContainerRef}
            onMouseMove={handleMouseMove}
            className="h-52 1xl:h-56 3xl:h-64 w-full relative"
            tabIndex={-1}
          >
            <ResponsiveContainer
              width="100%"
              height="100%"
              initialDimension={{ width: 320, height: 200 }}
            >
              <PieChart tabIndex={-1}>
                <Pie
                  data={dataWithColors}
                  cx="50%"
                  cy="50%"
                  innerRadius="60%"
                  outerRadius="85%"
                  fill="#8884d8"
                  dataKey="sales"
                  stroke="none"
                  strokeWidth={0}
                  isAnimationActive={shouldAnimate}
                  animationBegin={animationBegin}
                  animationDuration={800}
                  animationEasing="ease-out"
                >
                  {dataWithColors.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.color}
                      stroke="none"
                    />
                  ))}
                </Pie>
                <Tooltip
                  content={<AssetTooltip />}
                  isAnimationActive={false}
                  position={{ x: mousePosition.x + 15, y: mousePosition.y - 10 }}
                  wrapperStyle={{ zIndex: 10 }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="text-center">
                <div className="text-sm 1xl:text-base 3xl:text-lg font-bold text-primaryText">
                  ${Intl.NumberFormat("en-US").format(totalSales)}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="lg:col-span-2">
          <div className="block md:hidden lg:block">
            <p className="text-secondaryText font-bold">
              +/-% {t("sinceTransaction")}
            </p>
          </div>
          <div className="sm:max-h-32 lg:max-h-full overflow-auto pr-2">
            <ul className="mt-1 1xl:mt-2">
              {assetPerformanceData.map((asset, index) => (
                <li
                  key={asset.name}
                  className={`flex items-center justify-between border-b border-inputBorder
                  ${index === 7 ? "hidden 3xl:flex" : ""}
                  ${index === 6 ? "hidden 1xl:flex" : ""}
                  pb-2 pt-2 1xl:py-2`}
                >
                  <div className="text-xs 1xl:text-sm 3xl:text-base text-secondaryText">
                    {asset.name}
                  </div>
                  <div>
                    <div className="flex items-center justify-end space-x-4">
                      <p
                        className="ml-2 text-sm"
                        style={{ color: getDeltaColor(asset.status) }}
                      >
                        {asset.delta}%
                      </p>
                      <div className="hidden lg:block w-44">
                        <div className="relative h-2 w-full bg-assetPerformanceBarBg rounded-full overflow-hidden">
                          <div
                            className="absolute h-full rounded-full transition-all"
                            style={{
                              backgroundColor: getDeltaColor(asset.status),
                              width: `${Math.abs(asset.delta)}%`,
                              left:
                                asset.delta >= 0
                                  ? "50%"
                                  : `${50 - Math.abs(asset.delta)}%`,
                            }}
                          />
                          <div
                            className="absolute h-full w-0.5 bg-inputBorder"
                            style={{ left: "50%" }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Card>
  );
};
