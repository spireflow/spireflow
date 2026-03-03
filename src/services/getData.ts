import fs from "fs";
import { DocumentNode } from "graphql";
import path from "path";

import type { AnalyticsViewProps } from "../components/views/analytics/types";
import type { CalendarEvent } from "../components/views/calendar/types";
import type { Customer } from "../components/views/customers/types";
import type { HomepageViewProps } from "../components/views/homepage/types";
import type { OrderType } from "../components/views/orders/types";
import type { Product } from "../components/views/products/types";
import { ANALYTICS_QUERY } from "../queries/AnalyticsQuery";
import { CUSTOMERS_QUERY } from "../queries/CustomersQuery";
import { EVENTS_QUERY } from "../queries/EventsQuery";
import { HOMEPAGE_QUERY } from "../queries/HomepageQuery";
import { ORDERS_QUERY } from "../queries/OrdersQuery";
import { PRODUCTS_QUERY } from "../queries/ProductsQuery";
import { hasValidBackendUrl } from "../utils/presentationMode";
import { client } from "./apolloClient";

const QUERY_MAP: Record<string, DocumentNode> = {
  analytics: ANALYTICS_QUERY,
  events: EVENTS_QUERY,
  customers: CUSTOMERS_QUERY,
  homepage: HOMEPAGE_QUERY,
  orders: ORDERS_QUERY,
  products: PRODUCTS_QUERY,
};

interface PageDataMap {
  orders: OrderType[];
  customers: Customer[];
  products: Product[];
  events: CalendarEvent[];
  analytics: AnalyticsViewProps["analyticsData"];
  homepage: HomepageViewProps["homepageData"];
}

type PageName = keyof PageDataMap;

/**
 * Retrieves mock data from backendBackup.json for standalone mode.
 *
 * @template T - Page name type
 * @param {T} pageName - Page identifier
 * @returns {PageDataMap[T]} Mock data for the page
 * @private
 */
const getBackupData = <T extends PageName>(pageName: T): PageDataMap[T] => {
  const backupFilePath = path.join(
    process.cwd(),
    "public",
    "backendBackup.json",
  );

  const raw = fs.readFileSync(backupFilePath, "utf-8");
  const allData = JSON.parse(raw) as PageDataMap;

  return allData[pageName];
};

/**
 * Fetches dashboard data with automatic fallback to mock data.
 * Works in standalone mode (no backend) or connected mode (GraphQL backend).
 *
 * @template T - Page name type
 * @param {T} pageName - Page identifier ('orders' | 'customers' | 'products' | 'events' | 'analytics' | 'homepage')
 * @returns {Promise<PageDataMap[T]>} Strongly-typed page data
 * @throws {Error} If query not found or data invalid
 *
 * @see {@link https://github.com/matt765/spireflow-backend Backend setup}
 */
export const getData = async <T extends PageName>(
  pageName: T,
): Promise<PageDataMap[T]> => {
  if (!hasValidBackendUrl()) {
    return getBackupData(pageName);
  }

  const query = QUERY_MAP[pageName];
  if (!query) {
    throw new Error(`Query not found for page: ${pageName}`);
  }

  const { data } = await client.query<PageDataMap>({ query });

  if (!data) {
    throw new Error(`No data returned for page: ${pageName}`);
  }

  return data[pageName];
};
