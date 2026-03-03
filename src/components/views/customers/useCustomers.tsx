import {
  createColumnHelper,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { SpinnerIcon } from "../../../assets/icons/SpinnerIcon";
import { useTable } from "../../../hooks/useTable";
import { exportToXLSX } from "../../../utils/exportToXLSX";
import { Customer, CustomerColumns, CustomerFilters } from "./types";

const columnHelper = createColumnHelper<CustomerColumns>();

const ImageCell = ({ src }: { src: string }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <>
      {!imageLoaded && <SpinnerIcon className="contentSpinner" />}
      <img
        src={src}
        alt="User Profile"
        onLoad={() => setImageLoaded(true)}
        style={{ display: imageLoaded ? "block" : "none" }}
        className="h-10 3xl:h-[3.1rem] w-10 3xl:w-[3.1rem]"
      />
    </>
  );
};

export const useCustomers = (customers: Customer[]) => {
  const {
    sorting,
    setSorting,
    searchQuery,
    setSearchQuery,
    currentPage,
    setCurrentPage,
    itemsPerPage,
    setItemsPerPage,
    nextPage,
    prevPage,
    goToPage,
    filters,
    clearFilter,
    setFilter,
  } = useTable<CustomerFilters>({});
  const [customersData, setCustomersData] = useState<Customer[]>();
  const t = useTranslations("customers");
  const tooltipRef = useRef<HTMLDivElement | null>(null);

  const customerColumns = useMemo(
    () => [
      columnHelper.accessor("col0", {
        header: () => t("tableHeader.photo"),
        enableSorting: false,
        cell: ({ row }: { row: { original: CustomerColumns } }) => (
          <ImageCell src={row.original.col0} />
        ),
      }),
      columnHelper.accessor("col1", {
        header: () => t("tableHeader.firstName"),
      }),
      columnHelper.accessor("col2", {
        header: () => t("tableHeader.lastName"),
      }),
      columnHelper.accessor("col3", {
        header: () => t("tableHeader.city"),
      }),
      columnHelper.accessor("col4", {
        header: () => t("tableHeader.country"),
      }),
      columnHelper.accessor("col5", {
        header: () => t("tableHeader.phone"),
      }),
      columnHelper.accessor("col6", {
        header: () => t("tableHeader.totalBuys"),
        cell: ({ row }: { row: { original: CustomerColumns } }) =>
          `$${row.original.col6.toString()}`,
      }),
    ],
    [t],
  );

  useEffect(() => {
    if (customers) {
      const mappedData = customers.map((customer) => ({
        photo: customer.photo,
        firstName: customer.firstName,
        lastName: customer.lastName,
        city: customer.city,
        country: customer.country,
        phone: customer.phone,
        totalBuys: customer.totalBuys,
      }));
      setCustomersData(mappedData);
    }
  }, [customers]);

  useEffect(() => {
    setCurrentPage(0);
  }, [searchQuery, filters, setCurrentPage]);

  const filteredData = useMemo(() => {
    let data = customersData;
    if (searchQuery) {
      data = data?.filter((customer) =>
        Object.values(customer).some(
          (value) =>
            value &&
            value.toString().toLowerCase().includes(searchQuery.toLowerCase()),
        ),
      );
    }

    if (filters.country) {
      data = data?.filter((customer) => customer.country === filters.country);
    }

    return data;
  }, [searchQuery, filters, customersData]);

  const sortedAndFilteredData = useMemo(() => {
    const data = (filteredData ?? []).map((customer) => ({
      col0: customer.photo,
      col1: customer.firstName,
      col2: customer.lastName,
      col3: customer.city,
      col4: customer.country,
      col5: customer.phone,
      col6: customer.totalBuys,
    }));

    sorting.forEach(({ id, desc }) => {
      data.sort((a, b) => {
        const aValue = a[id as keyof CustomerColumns];
        const bValue = b[id as keyof CustomerColumns];

        if (typeof aValue === "number" && typeof bValue === "number") {
          return desc ? bValue - aValue : aValue - bValue;
        }
        return desc
          ? String(bValue).localeCompare(String(aValue))
          : String(aValue).localeCompare(String(bValue));
      });
    });

    return data;
  }, [filteredData, sorting]);

  const paginatedData = useMemo(() => {
    const startIdx = currentPage * itemsPerPage;
    const endIdx = startIdx + itemsPerPage;
    return sortedAndFilteredData.slice(startIdx, endIdx);
  }, [sortedAndFilteredData, currentPage, itemsPerPage]);

  const totalPages = Math.ceil((filteredData?.length ?? 0) / itemsPerPage);

  const clearFilters = () => {
    setSorting([]);
    setSearchQuery("");
    setCurrentPage(0);
    clearFilter("country");
    setFilter("country", undefined);
  };

  const table = useReactTable({
    columns: customerColumns,
    data: paginatedData,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: { sorting },
    onSortingChange: setSorting,
  });

  const sortOptions = [
    { value: "col1", label: t("tableHeader.firstName") },
    { value: "col2", label: t("tableHeader.lastName") },
    { value: "col3", label: t("tableHeader.city") },
    { value: "col4", label: t("tableHeader.country") },
    { value: "col5", label: t("tableHeader.phone") },
    { value: "col6", label: t("tableHeader.totalBuys") },
  ];

  const countryOptions = useMemo(() => {
    return Array.from(
      new Set(customersData?.map((customer) => customer.country)),
    );
  }, [customersData]);

  const handleExportToCSV = useCallback((data: Customer[]) => {
    const withShortPhoto = data.map((customer) => ({
      ...customer,
      photo: customer.photo.split("/").pop() ?? customer.photo,
    }));
    exportToXLSX(withShortPhoto, "customers");
  }, []);

  const handleMouseEnter = useCallback(() => {
    if (tooltipRef.current) {
      tooltipRef.current.style.visibility = "visible";
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (tooltipRef.current) {
      tooltipRef.current.style.visibility = "hidden";
    }
  }, []);

  return {
    table,
    searchQuery,
    setSearchQuery,
    currentPage,
    setCurrentPage,
    itemsPerPage,
    setItemsPerPage,
    nextPage,
    prevPage,
    goToPage,
    setSorting,
    totalPages,
    setFilter,
    clearFilter,
    sorting,
    filters,
    customersData,
    clearFilters,
    sortOptions,
    countryOptions,
    handleExportToCSV,
    handleMouseEnter,
    handleMouseLeave,
    tooltipRef,
  };
};
