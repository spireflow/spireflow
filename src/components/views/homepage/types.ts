export interface BestSellingProduct {
  name: string;
  sales: number;
  profit: number;
}

export interface BestSellingProductsProps {
  bestSellingProductsData: BestSellingProduct[];
  isFourCardsMode: boolean;
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

export interface SmallCardChartData {
  date: string;
  metric: number;
}

export interface SmallCard {
  title: string;
  metric: string;
  metricPrev: string;
  delta: string;
  deltaType: string;
  color: string;
  increased: boolean;
  changeValue: number;
  changeText: string;
  chartData: SmallCardChartData[];
}

export interface ThreeSmallCardsProps {
  threeSmallCardsData: SmallCard[];
}

export interface FourSmallCardsProps {
  fourSmallCardsData: SmallCard[];
}

export interface Revenue {
  date: string;
  websiteSales: number;
  inStoreSales: number;
}

export interface RevenueOverTimeProps {
  revenueOverTimeData: Revenue[];
}

interface HomepageData {
  bestSellingProducts: BestSellingProductsProps["bestSellingProductsData"];
  customerSatisfaction: CustomerSatisfactionProps["customerSatisfactionData"];
  threeSmallCards: ThreeSmallCardsProps["threeSmallCardsData"];
  fourSmallCards: FourSmallCardsProps["fourSmallCardsData"];
  revenueOverTime: RevenueOverTimeProps["revenueOverTimeData"];
  revenuePerCountry: RevenuePerCountryProps["revenuePerCountryData"];
  weeklyPerformance: WeeklyPerformanceProps["weeklyPerformanceData"];
  weeklyActivities: WeeklyActivity[];
}

export interface HomepageViewProps {
  homepageData: HomepageData;
}

export interface Country {
  name: string;
  price: number;
}

export interface RevenuePerCountryProps {
  revenuePerCountryData: Country[];
}

export interface WeeklyPerformanceData {
  name: string;
  revenue: number;
  profit: number;
}

export interface WeeklyActivity {
  id: number;
  user?: string;
  action: string;
  time: string;
  icon: "update" | "users" | "check" | "document";
  color: "green" | "blue";
}

export interface WeeklyPerformanceProps {
  weeklyPerformanceData: WeeklyPerformanceData[];
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
  sales: number;
  profit: number;
};
