"use client";

import { Grid, Col } from "@tremor/react";

import { HomeSmallCards } from "./HomeSmallCards";
import { RevenueOverTime } from "./RevenueOverTime";
import { WeeklyPerformance } from "./WeeklyPerformance";
import { BestSellingProducts } from "./BestSellingProducts";
import { CustomerSatisfaction } from "./CustomerSatisfaction";
import { HomepageViewProps } from "./types";
import { RevenuePerCountry } from "./RevenuePerCountry";

export const HomepageView = ({ homepageData }: HomepageViewProps) => {
  return (
    <>
      {/* First and Second row combined */}
      <Grid
        numItems={1}
        numItemsSm={1}
        numItemsMd={1}
        numItemsLg={3}
        className="gap-x-4 1xl:gap-x-6 gap-y-6"
      >
        <Col numColSpan={1} numColSpanLg={2} className="flex flex-col gap-6">
          {/* Top Metrics Cards */}
          {homepageData?.homeSmallCards && (
            <HomeSmallCards homeSmallCardsData={homepageData.homeSmallCards} />
          )}

          {/* Revenue Over Time */}
          {homepageData?.revenueOverTime && (
            <RevenueOverTime
              revenueOverTimeData={homepageData.revenueOverTime}
            />
          )}
        </Col>

        {/* Calendar & Activity - Extended height */}
        <Col numColSpan={1} numColSpanLg={1} className="flex">
          {homepageData?.weeklyPerformance && homepageData?.weeklyActivities && (
            <WeeklyPerformance
              weeklyPerformanceData={homepageData.weeklyPerformance}
              weeklyActivities={homepageData.weeklyActivities}
            />
          )}
        </Col>
      </Grid>

      {/* Third row */}
      <Grid
        numItems={1}
        numItemsSm={2}
        numItemsMd={2}
        numItemsLg={3}
        className="gap-x-4 1xl:gap-x-6 gap-y-6"
      >
        <Col numColSpan={1} numColSpanLg={1}>
          {homepageData?.bestSellingProducts && (
            <BestSellingProducts
              bestSellingProductsData={homepageData.bestSellingProducts}
            />
          )}
        </Col>
        <Col numColSpan={1} numColSpanLg={2}>
          {homepageData?.customerSatisfaction && (
            <CustomerSatisfaction
              customerSatisfactionData={homepageData.customerSatisfaction}
            />
          )}
        </Col>
      </Grid>
      {/* Fourth row */}
      <div className="hidden lg:flex w-full 1xl:w-full">
        <RevenuePerCountry
          revenuePerCountryData={homepageData.revenuePerCountry}
        />
      </div>
    </>
  );
};
