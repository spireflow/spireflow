import { useMemo } from "react";
import { useTranslations } from "next-intl";

type TranslationsConfig = {
  [namespace: string]: {
    [key: string]: string;
  };
};

const translationsConfig: TranslationsConfig = {
  // Common months used across multiple charts
  "common.months": {
    Jan: "jan",
    Feb: "feb",
    Mar: "mar",
    Apr: "apr",
    May: "may",
    Jun: "jun",
    Jul: "jul",
    Aug: "aug",
    Sep: "sep",
    Oct: "oct",
    Nov: "nov",
    Dec: "dec",
  },
  // Countries for maps and geography
  "common.countries": {
    "United States of America": "unitedStates",
    France: "france",
    "United Kingdom": "unitedKingdom",
    Norway: "norway",
    Australia: "australia",
    Poland: "poland",
  },
  // Product categories for charts
  "common.categories": {
    Laptops: "laptops",
    Phones: "phones",
    Tablets: "tablets",
    Chargers: "chargers",
    Headphones: "headphones",
    Accessories: "accessories",
  },
  // Legacy namespaces for existing charts - will be gradually migrated
  "homepage.revenuePerCountry": {
    "United States of America": "unitedStates",
    France: "france",
    "United Kingdom": "unitedKingdom",
    Norway: "norway",
    Australia: "australia",
    Poland: "poland",
  },
  "homepage.revenueOverTime": {
    Jan: "jan",
    Feb: "feb",
    Mar: "mar",
    Apr: "apr",
    May: "may",
    Jun: "jun",
    Jul: "jul",
    Aug: "aug",
    Sep: "sep",
    Oct: "oct",
    Nov: "nov",
    Dec: "dec",
  },
  "analytics.todaySales": {
    today: "today",
    yesterday: "yesterday",
    average: "average",
  },
  "analytics.totalProfit": {
    sales: "sales",
    Jan: "jan",
    Feb: "feb",
    Mar: "mar",
    Apr: "apr",
    May: "may",
    Jun: "jun",
    Jul: "jul",
    Aug: "aug",
    Sep: "sep",
    Oct: "oct",
    Nov: "nov",
    Dec: "dec",
  },
  "analytics.performance": {
    sales: "sales",
    profit: "profit",
    Jan: "jan",
    Feb: "feb",
    Mar: "mar",
    Apr: "apr",
    May: "may",
    Jun: "jun",
    Jul: "jul",
    Aug: "aug",
    Sep: "sep",
    Oct: "oct",
    Nov: "nov",
    Dec: "dec",
  },
  "analytics.revenueDistribution": {
    Laptops: "laptops",
    Phones: "phones",
    Chargers: "chargers",
    Headphones: "headphones",
    Tablets: "tablets",
    Accessories: "accessories",
  },
  "analytics.yearOverview": {
    phones: "phones",
    tablets: "tablets",
    laptops: "laptops",
    Jan: "jan",
    Feb: "feb",
    Mar: "mar",
    Apr: "apr",
    May: "may",
    Jun: "jun",
    Jul: "jul",
    Aug: "aug",
    Sep: "sep",
    Oct: "oct",
    Nov: "nov",
    Dec: "dec",
  },
  "singleCharts.line": {
    Phones: "phones",
    Tablets: "tablets",
    Laptops: "laptops",
  },
};

// This hook provides translations that are later used in useTranslateData hook

export const useBackendTranslations = (
  namespace: string
): { [key: string]: string } => {
  const t = useTranslations(namespace);

  const backendTranslations = useMemo(() => {
    const namespaceTranslations = translationsConfig[namespace] || {};
    const mappedTranslations: { [key: string]: string } = {};
    Object.entries(namespaceTranslations).forEach(([key, translationKey]) => {
      mappedTranslations[key] = t(translationKey);
    });
    return mappedTranslations;
  }, [namespace, t]);

  return backendTranslations;
};
