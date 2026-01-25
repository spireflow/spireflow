"use client";

import { ThreeSmallCards } from "./ThreeSmallCards";
import { FourSmallCards } from "./FourSmallCards";
import { RevenueOverTime } from "./RevenueOverTime";
import { WeeklyPerformance } from "./WeeklyPerformance";
import { BestSellingProducts } from "./BestSellingProducts";
import { CustomerSatisfaction } from "./CustomerSatisfaction";
import { HomepageViewProps } from "./types";
import { RevenuePerCountry } from "./RevenuePerCountry";
import { useAppStore } from "../../../store/appStore";

export const HomepageView = ({ homepageData }: HomepageViewProps) => {
  const homepageLayout = useAppStore((state) => state.homepageLayout);

  return (
    <>
      {/* Four Cards Layout Only */}
      {homepageLayout === "four-cards" && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {homepageData?.fourSmallCards && (
            <FourSmallCards fourSmallCardsData={homepageData.fourSmallCards} />
          )}
        </div>
      )}

      {/* First and Second row combined */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-4 1xl:gap-x-6 gap-y-6">
        <div className="lg:col-span-2 flex flex-col gap-6">
          {/* Top Metrics Cards - Three Cards Layout Only */}
          {homepageLayout === "three-cards" &&
            homepageData?.threeSmallCards && (
              <ThreeSmallCards
                threeSmallCardsData={homepageData.threeSmallCards}
              />
            )}
          {/* Revenue Over Time */}
          {homepageData?.revenueOverTime && (
            <RevenueOverTime
              revenueOverTimeData={homepageData.revenueOverTime}
            />
          )}
        </div>
        {/* Calendar & Activity */}
        <div className="flex">
          {homepageData?.weeklyPerformance && (
            <WeeklyPerformance
              weeklyPerformanceData={homepageData.weeklyPerformance}
              weeklyActivities={
                homepageLayout === "three-cards"
                  ? homepageData.weeklyActivities
                  : []
              }
            />
          )}
        </div>
      </div>
      {/* Third row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 1xl:gap-x-6 gap-y-6">
        <div>
          {homepageData?.bestSellingProducts && (
            <BestSellingProducts
              bestSellingProductsData={homepageData.bestSellingProducts}
            />
          )}
        </div>
        <div className="lg:col-span-2">
          {homepageData?.customerSatisfaction && (
            <CustomerSatisfaction
              customerSatisfactionData={homepageData.customerSatisfaction}
            />
          )}
        </div>
      </div>
      {/* Fourth row */}
      <div className="hidden lg:flex w-full 1xl:w-full">
        <RevenuePerCountry
          revenuePerCountryData={homepageData.revenuePerCountry}
        />
      </div>
    </>
  );
};
