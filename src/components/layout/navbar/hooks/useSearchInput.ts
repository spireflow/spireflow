import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useState } from "react";

import { menuConfig } from "../../../../config/navigationConfig";
import type { MenuConfigEntry } from "../../sideMenu/types";
import { useNavbar } from "./useNavbar";

interface SearchItem {
  id: string;
  sectionTitleKey: string;
  pageTitleKey: string;
  path: string;
}

interface TranslatedSearchItem extends SearchItem {
  translatedSection: string;
  translatedPage: string;
}

interface UseSearchInputOptions {
  closeOthers?: () => void;
  open: () => void;
  close: () => void;
  isOpen: boolean;
}

/**
 * Builds a flat list of searchable items from navigationConfig.
 * Each item with `allSearchItems` produces one search entry per section.
 * Items/submenuItems without allSearchItems are skipped.
 */
const buildSearchItems = (config: MenuConfigEntry[]): SearchItem[] => {
  const items: SearchItem[] = [];

  for (const entry of config) {
    if (entry.type === "item" && entry.sections) {
      for (const section of entry.sections) {
        items.push({
          id: section.id,
          sectionTitleKey: section.titleKey,
          pageTitleKey: entry.titleKey,
          path: entry.path,
        });
      }
    }

    if (entry.type === "submenu") {
      for (const sub of entry.submenuItems) {
        if (sub.sections) {
          for (const section of sub.sections) {
            items.push({
              id: section.id,
              sectionTitleKey: section.titleKey,
              pageTitleKey: sub.titleKey,
              path: sub.path,
            });
          }
        }
      }
    }
  }

  return items;
};

const allSearchItems = buildSearchItems(menuConfig);

/**
 * Powers the navbar search input - derives searchable allSearchItems from
 * navigationConfig, translates them for i18n, filters by query, and
 * handles keyboard navigation (arrows, Enter, Escape) plus client-side
 * routing with hash-based scrolling.
 */
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

  /**
   * Enriches each section with translated names. Uses try/catch because
   * next-intl throws when a translation key is missing - in that case
   * the titleKey is kept as fallback.
   */
  const translatedSections: TranslatedSearchItem[] = allSearchItems.map(
    (item) => {
      let translatedSection;
      try {
        translatedSection = t(`search.sections.${item.sectionTitleKey}`);
      } catch {
        translatedSection = item.sectionTitleKey;
      }

      let translatedPage;
      try {
        translatedPage = t(`search.pages.${item.pageTitleKey}`);
      } catch {
        translatedPage = item.pageTitleKey;
      }

      return {
        ...item,
        translatedSection,
        translatedPage,
      };
    },
  );

  /**
   * Matches the search query against both translated and original key names
   * so the user can find allSearchItems regardless of the active locale.
   */
  const filteredSections = translatedSections.filter(
    (item) =>
      item.translatedSection.toLowerCase().includes(searchText.toLowerCase()) ||
      item.translatedPage.toLowerCase().includes(searchText.toLowerCase()) ||
      item.sectionTitleKey.toLowerCase().includes(searchText.toLowerCase()) ||
      item.pageTitleKey.toLowerCase().includes(searchText.toLowerCase()),
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

  /**
   * Keyboard navigation for the search dropdown. Tab/Escape close it,
   * arrows move the highlight, Enter navigates to the highlighted section.
   */
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

  /**
   * Navigates to the selected section. If already on the target page,
   * scrolls smoothly to the element by ID. Otherwise uses router.push
   * with a hash so the target page can scroll on load.
   */
  const handleSectionClick = (item: TranslatedSearchItem) => {
    close();

    const baseUrl = currentLanguage === "en" ? "" : `/${currentLanguage}`;
    const normalizedPath = window.location.pathname.replace(/\/$/, "");
    const targetPath =
      item.path === "/" ? baseUrl || "/" : `${baseUrl}${item.path}`;
    const normalizedTarget = targetPath.replace(/\/$/, "");

    if (normalizedPath === normalizedTarget) {
      document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth" });
      history.replaceState(null, "", `${targetPath}#${item.id}`);
    } else {
      router.push(`${targetPath}#${item.id}`);
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
    allSearchItems,
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
