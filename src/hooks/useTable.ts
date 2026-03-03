import { useCallback, useState } from "react";
import { SortingState } from "@tanstack/react-table";

type Filters<T> = {
  [P in keyof T]: T[P];
};

/**
 * Comprehensive table state management for TanStack Table.
 * Handles sorting, filtering, search, and pagination.
 *
 * @template T - Filter keys type
 * @param {T} initialFilters - Initial filter values
 * @returns {Object} Table state and control functions
 */
export const useTable = <T extends Record<string, unknown>>(
  initialFilters: T,
) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [filters, setFilters] = useState<Filters<T>>(
    initialFilters as Filters<T>,
  );

  const setFilter = useCallback((filterKey: keyof T, value: T[keyof T]) => {
    setFilters((prev) => ({
      ...prev,
      [filterKey]: value,
    }));
    setCurrentPage(0);
  }, []);

  const clearFilter = useCallback((filterKey: keyof T) => {
    setFilters((prev) => {
      const newFilters = { ...prev };
      delete newFilters[filterKey];
      return newFilters;
    });
  }, []);

  const getFilter = useCallback(
    (filterType: keyof T): T[keyof T] | undefined => {
      return filters[filterType as string];
    },
    [filters],
  );

  const resetFilters = () => {
    setFilters(initialFilters);
    setSearchQuery("");
    setCurrentPage(0);
    setSorting([]);
  };

  const nextPage = () => setCurrentPage((prev) => prev + 1);
  const prevPage = () => setCurrentPage((prev) => prev - 1);
  const goToPage = (page: number) => setCurrentPage(page);

  return {
    sorting,
    setSorting,
    searchQuery,
    setSearchQuery,
    currentPage,
    setCurrentPage,
    itemsPerPage,
    setItemsPerPage,
    filters,
    setFilters,
    setFilter,
    getFilter,
    resetFilters,
    nextPage,
    prevPage,
    goToPage,
    clearFilter,
  };
};
