"use client";

import { Grid, Col } from "@tremor/react";

import { Regions } from "./Regions";
// Import unchanged components from main homepage
import { BestSellingProducts } from "../homepage/BestSellingProducts";
import { CustomerSatisfaction } from "../homepage/CustomerSatisfaction";
import { RevenuePerCountry } from "../homepage/RevenuePerCountry";
import { OldHomepageViewProps } from "./types";
import { HomeSmallCards2 } from "./HomeSmallCards2";
import { RevenueOverTime2 } from "./RevenueOverTime2";

export const OldHomepageView = ({ oldHomepageData }: OldHomepageViewProps) => {
  return (
    <>
      {/* First row */}
      <Grid numItems={2} numItemsLg={4} className="gap-x-4 gap-y-4">
        {oldHomepageData?.oldHomeSmallCards && (
          <HomeSmallCards2
            homeSmallCardsData={oldHomepageData.oldHomeSmallCards}
          />
        )}
      </Grid>
      {/* Second row */}
      <Grid
        numItems={1}
        numItemsSm={2}
        numItemsMd={2}
        numItemsLg={3}
        className="gap-x-4 1xl:gap-x-6 gap-y-6"
      >
        <Col numColSpan={1} numColSpanLg={2}>
          {oldHomepageData?.revenueOverTime && (
            <RevenueOverTime2
              revenueOverTimeData={oldHomepageData.revenueOverTime}
            />
          )}
        </Col>
        <Col numColSpan={1} numColSpanLg={1}>
          {oldHomepageData?.regions && (
            <Regions regionsData={oldHomepageData.regions} />
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
          {oldHomepageData?.bestSellingProducts && (
            <BestSellingProducts
              bestSellingProductsData={oldHomepageData.bestSellingProducts}
            />
          )}
        </Col>
        <Col numColSpan={1} numColSpanLg={2}>
          {oldHomepageData?.customerSatisfaction && (
            <CustomerSatisfaction
              customerSatisfactionData={oldHomepageData.customerSatisfaction}
            />
          )}
        </Col>
      </Grid>
      {/* Fourth row */}
      <div className="hidden lg:flex w-full 1xl:w-full">
        <RevenuePerCountry
          revenuePerCountryData={oldHomepageData.revenuePerCountry}
        />
      </div>
    </>
  );
};
