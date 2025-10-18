import { DocumentNode } from "graphql";
import fs from "fs";
import path from "path";

import { client } from "./apolloClient";
import { ORDERS_QUERY } from "../queries/OrdersQuery";
import { ANALYTICS_QUERY } from "../queries/analytics/AnalyticsQuery";
import { EVENTS_QUERY } from "../queries/EventsQuery";
import { CUSTOMERS_QUERY } from "../queries/CustomersQuery";
import { PRODUCTS_QUERY } from "../queries/ProductsQuery";
import { HOMEPAGE_QUERY } from "../queries/homepage/HomepageQuery";
import { OLD_HOMEPAGE_QUERY } from "../queries/oldHomepage/OldHomepageQuery";

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

const switchToBackupData = true;

export const getData = async (pageName: string) => {
  // Use this if you don't want to setup NodeJS/GraphQL backend
  // Application will read data from public/backendBackup.json instead of fetching it from backend
  // I created this solution with a thought that if this is open source project, not "real" production application,
  // perhaps the time will come when I will shut down backend server
  if (switchToBackupData) {
    const backupFilePath = path.join(
      process.cwd(),
      "public",
      "backendBackup.json"
    );
    try {
      const raw = fs.readFileSync(backupFilePath, "utf-8");
      const allData = JSON.parse(raw);
      if (!allData[pageName]) {
        throw new Error(`No backup data for page ${pageName}`);
      }
      return allData[pageName];
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
        return data;
      default:
        return data[pageName];
    }
  } catch {
    throw new Error(`Error fetching data for page ${pageName}`);
  }
};
