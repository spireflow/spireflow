import { gql } from "@apollo/client";

export const OLD_HOMEPAGE_QUERY = gql`
  query GetOldHomepageData {
    bestSellingProducts {
      name
      profit
      revenue
    }
    customerSatisfaction {
      brandName
      customerSatisfaction
      totalSales
      numberOfOrders
    }
    oldHomeSmallCards {
      title
      metric
      metricPrev
      delta
      deltaType
      color
      increased
      changeValue
      changeText
      chartData
    }
    regions {
      name
      region
      sales
      delta
      deltaType
    }
    revenueOverTime {
      date
      websiteSales
      inStoreSales
    }
    revenuePerCountry {
      name
      price
    }
  }
`;
