"use client";

import { useAppStore } from "../../../store/appStore";
import { BestSellingProducts } from "./BestSellingProducts";
import { CustomerSatisfaction } from "./CustomerSatisfaction";
import { FourSmallCards } from "./FourSmallCards";
import { RevenueOverTime } from "./RevenueOverTime";
import { RevenuePerCountry } from "./RevenuePerCountry";
import { ThreeSmallCards } from "./ThreeSmallCards";
import { HomepageViewProps } from "./types";
import { WeeklyPerformance } from "./WeeklyPerformance";

export const HomepageView = ({ homepageData }: HomepageViewProps) => {
  const homepageLayout = useAppStore((state) => state.homepageLayout);

  return (
    <>
      <h1 className="sr-only">Dashboard</h1>
      {/* Four Cards Layout Only */}
      {homepageLayout === "four-cards" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {homepageData?.fourSmallCards && (
            <FourSmallCards fourSmallCardsData={homepageData.fourSmallCards} />
          )}
        </div>
      )}

      {/* First and Second row combined */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-4 1xl:gap-x-6 gap-y-4 1xl:gap-y-6">
        <div className="lg:col-span-2 flex flex-col gap-4 1xl:gap-6">
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
              weeklyActivities={homepageData.weeklyActivities}
              isFourCardsMode={homepageLayout === "four-cards"}
            />
          )}
        </div>
      </div>
      {/* Third row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 1xl:gap-x-6 gap-y-4 1xl:gap-y-6">
        <div className="hidden lg:block">
          {homepageData?.bestSellingProducts && (
            <BestSellingProducts
              bestSellingProductsData={homepageData.bestSellingProducts}
            />
          )}
        </div>
        <div className="col-span-full lg:col-span-2">
          {homepageData?.customerSatisfaction && (
            <CustomerSatisfaction
              customerSatisfactionData={homepageData.customerSatisfaction}
            />
          )}
        </div>
      </div>
      {/* Fourth row */}
      <div className="hidden md:flex w-full 1xl:w-full">
        <RevenuePerCountry
          revenuePerCountryData={homepageData.revenuePerCountry}
        />
      </div>
    </>
  );
};
