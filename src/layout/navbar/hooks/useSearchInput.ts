import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useState } from "react";

import { useAppStore } from "../../../store/appStore";
import { useNavbar } from "./useNavbar";

interface Section {
  section: string;
  page: string;
  id: string;
  translatedSection: string;
  translatedPage: string;
}
interface UseSearchInputOptions {
  closeOthers?: () => void;
  open: () => void;
  close: () => void;
  isOpen: boolean;
}

export const useSearchInput = ({
  closeOthers,
  open,
  close,
  isOpen,
}: UseSearchInputOptions) => {
  const t = useTranslations("navbar");
  const [searchText, setSearchText] = useState("");
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const { currentLanguage } = useNavbar();
  const router = useRouter();
  const homepageLayout = useAppStore((state) => state.homepageLayout);

  const allSections = [
    // Analytics
    { section: "Asset performance", page: "Analytics", id: "assetPerformance" },
    { section: "Today's sales", page: "Analytics", id: "todaysSales" },
    { section: "Total profit", page: "Analytics", id: "totalProfit" },
    { section: "Revenue trends", page: "Analytics", id: "revenueTrends" },
    { section: "Year overview", page: "Analytics", id: "yearOverview" },
    { section: "Market metrics", page: "Analytics", id: "marketMetrics" },
    {
      section: "Revenue distribution",
      page: "Analytics",
      id: "revenueDistribution",
    },

    // Homepage
    { section: "Revenue over time", page: "Homepage", id: "revenueOverTime" },
    {
      section: "Bestselling products",
      page: "Homepage",
      id: "bestsellingProducts",
    },
    {
      section: "Customer satisfaction",
      page: "Homepage",
      id: "customerSatisfaction",
    },
    {
      section: "Revenue per country",
      page: "Homepage",
      id: "revenuePerCountry",
    },
    { section: "Sales", page: "Homepage", id: "salesCard" },
    { section: "Profit", page: "Homepage", id: "profitCard" },
    { section: "Traffic", page: "Homepage", id: "trafficCard" },
    { section: "Customers", page: "Homepage", id: "customersCard" },

    // Other pages
    { section: "Customers", page: "Customers", id: "customers" },
    { section: "Calendar", page: "Calendar", id: "calendar" },
    { section: "Orders", page: "Orders", id: "orders" },
    { section: "Products", page: "Products", id: "products" },
  ];

  // Filter sections based on homepage layout
  const sections = allSections.filter((section) => {
    // If it's the "Customers" card on Homepage and layout is "three-cards", exclude it
    if (
      section.page === "Homepage" &&
      section.id === "customersCard" &&
      homepageLayout === "three-cards"
    ) {
      return false;
    }
    return true;
  });

  // Transform sections with translations
  const translatedSections = sections.map((item) => {
    // Try to get translated section name from search.sections
    let translatedSection;
    try {
      translatedSection = t(`search.sections.${item.id}`);
    } catch {
      translatedSection = item.section;
    }

    // Try to get translated page name from search.pages
    let translatedPage;
    try {
      translatedPage = t(`search.pages.${item.page}`);
    } catch {
      translatedPage = item.page;
    }

    return {
      ...item,
      translatedSection,
      translatedPage,
    };
  });

  const filteredSections = translatedSections.filter(
    (item) =>
      item.translatedSection.toLowerCase().includes(searchText.toLowerCase()) ||
      item.translatedPage.toLowerCase().includes(searchText.toLowerCase()) ||
      item.section.toLowerCase().includes(searchText.toLowerCase()) ||
      item.page.toLowerCase().includes(searchText.toLowerCase()),
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
    setHighlightedIndex(-1);
    if (closeOthers) closeOthers();
    open();
  };

  const handleInputFocus = () => {
    if (closeOthers) closeOthers();
  };

  const handleClick = () => {
    if (closeOthers) closeOthers();
    open();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Tab" && isOpen && !searchText) {
      close();
      setHighlightedIndex(-1);
      return;
    }

    if (e.key === "Escape") {
      e.preventDefault();
      close();
      setHighlightedIndex(-1);
      return;
    }

    if (filteredSections.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (!isOpen) {
        open();
        return;
      }
      setHighlightedIndex((prev) =>
        prev < filteredSections.length - 1 ? prev + 1 : prev,
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : prev));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (!isOpen) {
        open();
        return;
      }
      if (highlightedIndex >= 0) {
        handleSectionClick(filteredSections[highlightedIndex]);
      }
    }
  };

  const handleSectionClick = (section: Section) => {
    close();

    const baseUrl = currentLanguage === "en" ? "" : `/${currentLanguage}`;
    const normalizedPath = window.location.pathname.replace(/\/$/, "");

    if (section.page === "Homepage") {
      if (normalizedPath === baseUrl) {
        document
          .getElementById(section.id)
          ?.scrollIntoView({ behavior: "smooth" });
        history.replaceState(null, "", `${baseUrl}/#${section.id}`);
      } else {
        router.push(`${baseUrl}/#${section.id}`);
      }
    } else if (section.page === "Analytics") {
      if (normalizedPath === `${baseUrl}/analytics`) {
        document
          .getElementById(section.id)
          ?.scrollIntoView({ behavior: "smooth" });
        history.replaceState(null, "", `${baseUrl}/analytics#${section.id}`);
      } else {
        router.push(`${baseUrl}/analytics#${section.id}`);
      }
    } else {
      router.push(`${baseUrl}/${section.page.toLowerCase()}`);
    }
  };

  let searchPlaceholder;
  try {
    searchPlaceholder = t("search.placeholder");
  } catch {
    searchPlaceholder = "Search...";
  }

  let noResultsText;
  try {
    noResultsText = t("search.noResults");
  } catch {
    noResultsText = "No results found";
  }

  return {
    searchText,
    sections,
    translatedSections,
    filteredSections,
    searchPlaceholder,
    noResultsText,
    highlightedIndex,
    handleSearchChange,
    handleInputFocus,
    handleClick,
    handleSectionClick,
    handleKeyDown,
  };
};
