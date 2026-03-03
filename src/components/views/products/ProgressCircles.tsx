"use client";

import { useTranslations } from "next-intl";

import { useWindowDimensions } from "../../../hooks/useWindowDimensions";
import { ProgressCirclesProps } from "./types";

interface CircularProgressProps {
  value: number;
  size: number;
  strokeWidth: number;
  children: React.ReactNode;
}

const CircularProgress = ({
  value,
  size,
  strokeWidth,
  children,
}: CircularProgressProps) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="rgb(148, 163, 184, 0.2)"
          strokeWidth={strokeWidth}
          fill="none"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="rgb(148, 163, 184)"
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-300"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        {children}
      </div>
    </div>
  );
};

export const ProgressCircles = ({ metrics }: ProgressCirclesProps) => {
  const t = useTranslations("products.metrics");
  const titles = [
    t("inventoryStatus"),
    t("monthlyTarget"),
    t("orderFullfillment"),
    t("conversionRate"),
  ];

  const { width: windowWidth } = useWindowDimensions();

  const getCircleSize = () => {
    if (windowWidth < 490) {
      return { size: 80, strokeWidth: 8 };
    } else if (windowWidth < 640) {
      return { size: 120, strokeWidth: 10 };
    } else if (windowWidth < 1400) {
      return { size: 96, strokeWidth: 9 };
    } else {
      return { size: 120, strokeWidth: 10 };
    }
  };

  const circleConfig = getCircleSize();

  return (
    <div className="mt-16 w-full flex flex-wrap justify-between items-between gap-0 gap-y-10 px-0">
      {metrics.map(({ firstValue, secondValue }, index) => {
        const percentage = Math.round((firstValue / secondValue) * 100);
        return (
          <div
            key={index}
            className="hover:bg-[rgb(255,255,255,0.01)] transition mx-auto sm:mx-unset w-[90%] sm:w-[48%] px-4 flex justify-center items-center border border-mainBorder py-8 1xl:py-12 rounded-md"
          >
            <div className="flex gap-8 sm:gap-4 md:gap-8 items-center">
              <CircularProgress
                value={percentage}
                size={circleConfig.size}
                strokeWidth={circleConfig.strokeWidth}
              >
                <span className="text-md 1xl:text-xl text-secondaryText font-medium">
                  {percentage}%
                </span>
              </CircularProgress>
              <div className="flex flex-col">
                {/* Index 1 is the revenue circle — prefix/suffix with "$" and "k" to format as currency. */}
                <div className="font-medium text-xl sm:text-md md:text-xl 3xl:text-2xl text-primaryText">
                  {index === 1 && "$"}
                  {firstValue}
                  {index === 1 && "k"} / {index === 1 && "$"}
                  {secondValue}
                  {index === 1 && "k"}
                </div>
                <div className="text-sm text-secondaryText">
                  {titles[index]}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
