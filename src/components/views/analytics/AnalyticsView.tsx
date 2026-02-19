"use client";

import { AssetPerformance } from "./AssetPerformance";
import { TodaySales } from "./TodaySales";
import { TotalProfit } from "./TotalProfit";
import { RevenueTrends } from "./RevenueTrends";
import { YearOverview } from "./YearOverview";
import { AnalyticsViewProps } from "./types";
import { MarketMetrics } from "./MarketMetrics";
import { RevenueDistribution } from "./RevenueDistribution";

export const AnalyticsView = ({ analyticsData }: AnalyticsViewProps) => {
  return (
    <>
      {/* First row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 3xl:grid-cols-3 gap-x-4 1xl:gap-x-6 gap-y-6">
        <div className="lg:col-span-3 3xl:col-span-2">
          {analyticsData?.assets && (
            <AssetPerformance assetPerformanceData={analyticsData.assets} />
          )}
        </div>
        <div className="lg:col-span-2 3xl:col-span-1">
          {analyticsData?.todaySales && (
            <TodaySales todaySalesData={analyticsData.todaySales} />
          )}
        </div>
      </div>
      {/* Second row */}
      <div className="w-full flex flex-col lg:flex-row justify-between gap-4 1xl:gap-6">
        <div className="w-full lg:w-1/3">
          {analyticsData?.totalProfitProducts &&
            analyticsData?.totalProfitMonths && (
              <TotalProfit
                totalProfitProducts={analyticsData.totalProfitProducts}
                totalProfitSales={analyticsData.totalProfitMonths}
              />
            )}
        </div>
        <div className="w-full lg:w-2/3">
          {analyticsData?.revenueTrends && (
            <RevenueTrends revenueTrendsData={analyticsData.revenueTrends} />
          )}
        </div>
      </div>
      {/* Third row */}
      {analyticsData?.yearOverview && (
        <YearOverview yearOverviewData={analyticsData.yearOverview} />
      )}
      {/* Fourth row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-0 gap-x-4 1xl:gap-x-6 lg:gap-y-6">
        <div>
          {analyticsData?.marketMetrics && (
            <MarketMetrics marketMetricsData={analyticsData.marketMetrics} />
          )}
        </div>
        <div>
          {analyticsData?.revenueDistribution && (
            <RevenueDistribution
              revenueDistributionData={analyticsData.revenueDistribution}
            />
          )}
        </div>
      </div>
    </>
  );
};
