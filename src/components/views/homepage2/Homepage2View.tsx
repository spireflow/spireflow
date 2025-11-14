"use client";

import { Grid, Col } from "@tremor/react";

import { Regions } from "./Regions";
// Import unchanged components from main homepage
import { BestSellingProducts } from "../homepage/BestSellingProducts";
import { CustomerSatisfaction } from "../homepage/CustomerSatisfaction";
import { RevenuePerCountry } from "../homepage/RevenuePerCountry";
import { Homepage2ViewProps } from "./types";
import { HomeSmallCards2 } from "./HomeSmallCards2";
import { RevenueOverTime2 } from "./RevenueOverTime2";

export const Homepage2View = ({ homepage2Data }: Homepage2ViewProps) => {
  return (
    <>
      {/* First row */}
      <Grid numItems={2} numItemsLg={4} className="gap-x-4 gap-y-4">
        {homepage2Data?.homeSmallCards && (
          <HomeSmallCards2 homeSmallCardsData={homepage2Data.homeSmallCards} />
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
          {homepage2Data?.revenueOverTime && (
            <RevenueOverTime2
              revenueOverTimeData={homepage2Data.revenueOverTime}
            />
          )}
        </Col>
        <Col numColSpan={1} numColSpanLg={1}>
          {homepage2Data?.regions && (
            <Regions regionsData={homepage2Data.regions} />
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
          {homepage2Data?.bestSellingProducts && (
            <BestSellingProducts
              bestSellingProductsData={homepage2Data.bestSellingProducts}
            />
          )}
        </Col>
        <Col numColSpan={1} numColSpanLg={2}>
          {homepage2Data?.customerSatisfaction && (
            <CustomerSatisfaction
              customerSatisfactionData={homepage2Data.customerSatisfaction}
            />
          )}
        </Col>
      </Grid>
      {/* Fourth row */}
      <div className="hidden lg:flex w-full 1xl:w-full">
        <RevenuePerCountry
          revenuePerCountryData={homepage2Data.revenuePerCountry}
        />
      </div>
    </>
  );
};
