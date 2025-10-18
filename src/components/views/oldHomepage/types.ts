import { DeltaType, Color } from "@tremor/react";

export interface BestSellingProduct {
  name: string;
  profit: number;
  revenue: number;
}

export interface BestSellingProductsProps {
  bestSellingProductsData: BestSellingProduct[];
}

export interface ProductSatisfaction {
  brandName: string;
  customerSatisfaction: number;
  totalSales: number;
  numberOfOrders: number;
}

export interface CustomerSatisfactionProps {
  customerSatisfactionData: ProductSatisfaction[];
}

export interface HomeSmallCardChartData {
  date: string;
  metric: number;
}

export interface HomeSmallCard {
  title: string;
  metric: string;
  metricPrev: string;
  delta: string;
  deltaType: DeltaType;
  color: Color;
  increased: boolean;
  changeValue: number;
  changeText: string;
  chartData: HomeSmallCardChartData[];
}

export interface HomeSmallCardsProps {
  homeSmallCardsData: HomeSmallCard[];
}

export interface Region {
  name: string;
  region: string;
  sales: number;
  delta: string;
  deltaType: string;
}

export interface RegionsProps {
  regionsData: Region[];
}

export interface Revenue {
  date: string;
  websiteSales: number;
  inStoreSales: number;
}

export interface RevenueOverTimeProps {
  revenueOverTimeData: Revenue[];
}

interface OldHomepageData {
  bestSellingProducts: BestSellingProductsProps["bestSellingProductsData"];
  customerSatisfaction: CustomerSatisfactionProps["customerSatisfactionData"];
  homeSmallCards: HomeSmallCardsProps["homeSmallCardsData"];
  regions: RegionsProps["regionsData"];
  revenueOverTime: RevenueOverTimeProps["revenueOverTimeData"];
  revenuePerCountry: RevenuePerCountryProps["revenuePerCountryData"];
}

export interface OldHomepageViewProps {
  oldHomepageData: OldHomepageData;
}

export interface Country {
  name: string;
  price: number;
}

export interface RevenuePerCountryProps {
  revenuePerCountryData: Country[];
}

export interface BestSellingCustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    name?: string;
    value?: number;
    color?: string;
    dataKey?: string;
  }>;
  label?: string;
}

export interface RegionData {
  name: string;
  regionKey: string;
  sales: number;
  delta?: string;
  deltaType?: string;
}

export interface RevenueOverTimeTooltipPayloadItem {
  name: string;
  value: number;
  color: string;
  dataKey?: string;
}

export interface RevenueOverTimeTooltipProps {
  active?: boolean;
  payload?: RevenueOverTimeTooltipPayloadItem[];
  label?: string;
}

export interface RevenueOverTimeCustomLegendProps {
  payload?: Array<{
    value: string;
    color?: string;
  }>;
}

export type TranslatedProduct = {
  name: string;
  profit: number;
  revenue: number;
};
