import {
  createColumnHelper,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useMemo, useState } from "react";

import { useTable } from "../../../hooks/useTable";
import {
  Filters,
  FilterValues,
  Order,
  OrderColumns,
  OrderType,
  PriceRange,
  SelectFilters,
  useOrdersProps,
} from "./types";

/**
 * Orders table logic — column definitions, multi-criteria filtering
 * (search, date range, selects, price range), sorting, and pagination.
 */
export const useOrders = ({ orders }: useOrdersProps) => {
  const t = useTranslations("orders");

  const columnHelper = createColumnHelper<Order>();

  const columns = [
    columnHelper.accessor("col1", {
      header: () => "ID",
    }),
    columnHelper.accessor("col2", {
      header: () => t("tableHeader.productName"),
    }),
    columnHelper.accessor("col3", {
      header: () => t("tableHeader.user"),
    }),
    columnHelper.accessor("col4", {
      header: () => t("tableHeader.price"),
      cell: ({ row }) => `$${row.original.col4.toFixed(2)}`,
    }),
    columnHelper.accessor("col5", {
      header: () => t("tableHeader.deliveryType"),
    }),
    columnHelper.accessor("col6", {
      header: () => t("tableHeader.date"),
    }),
    columnHelper.accessor("col7", {
      header: () => t("tableHeader.status"),
    }),
  ];

  const initialFilters = {
    startDate: "2023-02-04",
    endDate: null,
    productName: "",
    user: "",
    priceRange: { min: 0, max: 5000 },
    deliveryType: "",
    status: "",
  };
  const [ordersData, setOrdersData] = useState<OrderColumns[]>(orders);

  useEffect(() => {
    if (orders) {
      const mappedData = orders.map((order: OrderType) => ({
        col1: order.orderId,
        col2: order.productName,
        col3: order.user,
        col4: order.price,
        col5: order.deliveryType,
        col6: order.date,
        col7: order.status,
      }));
      setOrdersData(mappedData);
    }
  }, [orders]);

  const {
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
    resetFilters,
    nextPage,
    prevPage,
    goToPage,
  } = useTable(initialFilters);

  const setFilter = (filterType: keyof Filters, value: FilterValues) => {
    setFilters((prevFilters) => ({ ...prevFilters, [filterType]: value }));
    setCurrentPage(0);
  };
  /**
   * Type-safe filter getter. Date fields are narrowed to string | null
   * because the union type FilterValues includes PriceRange.
   */
  const getFilter = useCallback(
    (filterType: keyof Filters): FilterValues => {
      const value = filters[filterType];

      if (filterType === "startDate" || filterType === "endDate") {
        return typeof value === "string" || value === null ? value : null;
      }

      return value;
    },
    [filters],
  );

  /** Narrows the generic Filters shape to only select-compatible fields. */
  const toSelectFilters = (filters: Filters): SelectFilters => {
    return {
      productName:
        typeof filters.productName === "string" ? filters.productName : "",
      user: typeof filters.user === "string" ? filters.user : "",
      priceRange: filters.priceRange as PriceRange,
      deliveryType:
        typeof filters.deliveryType === "string" ? filters.deliveryType : "",
      status: typeof filters.status === "string" ? filters.status : "",
    };
  };

  /**
   * Applies all active filters sequentially: text search, date range,
   * product/user/delivery/status selects, and price range.
   */
  const filteredData = useMemo(() => {
    let result = ordersData;
    if (searchQuery) {
      const lowercasedQuery = searchQuery.toLowerCase();
      result = result.filter((order) =>
        Object.values(order).some((value) =>
          String(value).toLowerCase().includes(lowercasedQuery),
        ),
      );
    }

    const startDate = getFilter("startDate");
    if (startDate) {
      result = result.filter((order) => order.col6 >= startDate);
    }

    const endDate = getFilter("endDate");
    if (endDate) {
      result = result.filter((order) => order.col6 <= endDate);
    }

    if (getFilter("productName")) {
      result = result.filter(
        (order) => order.col2 === getFilter("productName"),
      );
    }

    if (getFilter("user")) {
      result = result.filter((order) => order.col3 === getFilter("user"));
    }

    const priceRange = getFilter("priceRange");
    if (
      typeof priceRange === "object" &&
      priceRange !== null &&
      (priceRange.min || priceRange.max)
    ) {
      result = result.filter(
        (order) => order.col4 >= priceRange.min && order.col4 <= priceRange.max,
      );
    }

    if (getFilter("deliveryType")) {
      result = result.filter(
        (order) => order.col5 === getFilter("deliveryType"),
      );
    }

    if (getFilter("status")) {
      result = result.filter((order) => order.col7 === getFilter("status"));
    }

    return result;
  }, [searchQuery, ordersData, getFilter]);

  const table = useReactTable({
    data: filteredData,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: false,
  });

  return {
    table,
    searchQuery,
    setSearchQuery,
    getFilter,
    setFilter,
    filtersForSelectFields: toSelectFilters(filters),
    toSelectFilters,
    nextPage,
    prevPage,
    goToPage,
    totalPage: Math.ceil(filteredData.length / itemsPerPage),
    currentPage,
    setItemsPerPage,
    itemsPerPage,
    setCurrentPage,
    resetFilters,
  };
};
