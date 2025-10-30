import { DocumentNode } from "graphql";
import fs from "fs";
import path from "path";

import { client } from "./apolloClient";
import { ORDERS_QUERY } from "../queries/OrdersQuery";
import { ANALYTICS_QUERY } from "../queries/AnalyticsQuery";
import { EVENTS_QUERY } from "../queries/EventsQuery";
import { CUSTOMERS_QUERY } from "../queries/CustomersQuery";
import { PRODUCTS_QUERY } from "../queries/ProductsQuery";
import { HOMEPAGE_QUERY } from "../queries/HomepageQuery";
import { OLD_HOMEPAGE_QUERY } from "../queries/OldHomepageQuery";

import type { OrderType } from "../components/views/orders/types";
import type { Customer } from "../components/views/customers/types";
import type { ProductCategory } from "../components/views/products/types";
import type { CalendarEvent } from "../components/views/calendar/types";
import type { AnalyticsViewProps } from "../components/views/analytics/types";
import type { HomepageViewProps } from "../components/views/homepage/types";
import type { OldHomepageViewProps } from "../components/views/oldHomepage/types";

interface QueryMap {
  [key: string]: DocumentNode;
}

const QUERY_MAP: QueryMap = {
  analytics: ANALYTICS_QUERY,
  events: EVENTS_QUERY,
  customers: CUSTOMERS_QUERY,
  homepage: HOMEPAGE_QUERY,
  oldHomepage: OLD_HOMEPAGE_QUERY,
  orders: ORDERS_QUERY,
  products: PRODUCTS_QUERY,
};

// Map page names to their return types
interface PageDataMap {
  orders: OrderType[];
  customers: Customer[];
  products: ProductCategory[];
  events: CalendarEvent[];
  analytics: AnalyticsViewProps["analyticsData"];
  homepage: HomepageViewProps["homepageData"];
  oldHomepage: OldHomepageViewProps["oldHomepageData"];
}

type PageName = keyof PageDataMap;

// Set to true to use backup JSON file instead of an actual backend
export const switchToBackupData = false;

export const getData = async <T extends PageName>(
  pageName: T
): Promise<PageDataMap[T]> => {
  // Use this if you don't want to setup NodeJS/GraphQL backend
  // Application will read data from public/backendBackup.json instead of fetching it from backend
  if (switchToBackupData) {
    const backupFilePath = path.join(
      process.cwd(),
      "public",
      "backendBackup.json"
    );
    try {
      const raw = fs.readFileSync(backupFilePath, "utf-8");
      const allData: unknown = JSON.parse(raw);

      // Type guard to ensure data structure
      if (!allData || typeof allData !== "object") {
        throw new Error("Invalid backup data structure");
      }

      const typedData = allData as Record<string, unknown>;
      if (!typedData[pageName]) {
        throw new Error(`No backup data for page ${pageName}`);
      }

      return typedData[pageName] as PageDataMap[T];
    } catch (error) {
      throw new Error(`Error reading backup: ${error}`);
    }
  }

  // Use this if you have working backend
  const query = QUERY_MAP[pageName];
  if (!query) {
    throw new Error(`Query not found for page: ${pageName}`);
  }
  try {
    const { data } = await client.query({ query });

    switch (pageName) {
      case "homepage":
      case "oldHomepage":
      case "analytics":
        return data as PageDataMap[T];
      default:
        return data[pageName] as PageDataMap[T];
    }
  } catch {
    throw new Error(`Error fetching data for page ${pageName}`);
  }
};
