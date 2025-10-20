import { gql } from "@apollo/client";

export const ANALYTICS_QUERY = gql`
  query GetAnalyticsData {
    assets {
      name
      industry
      sales
      delta
      deltaType
      status
    }
    monthPerformance {
      month
      sales
      profit
    }
    todaySales {
      hour
      today
      average
      yesterday
    }
    totalProfitProducts {
      title
      value
      metric
    }
    totalProfitMonths {
      month
      sales
    }
    yearOverview {
      name
      phones
      tablets
      laptops
    }
    marketMetrics {
      metric
      phones
      laptops
      maxValue
    }
    revenueDistribution {
      category
      inStore
      online
    }
  }
`;
