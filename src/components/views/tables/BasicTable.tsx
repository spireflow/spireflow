"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { useTranslations } from "next-intl";
import * as React from "react";

import { ArrowDownIcon } from "../../../assets/icons/ArrowDownIcon";
import { ArrowUpIcon } from "../../../assets/icons/ArrowUpIcon";
import { Card } from "../../common/Card";

/** Product data structure for the basic table. */
type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: string;
};

// Mock Data for Basic Table
const basicTableData: Product[] = [
  {
    id: 1,
    name: "Wireless Mouse",
    category: "Electronics",
    price: 29.99,
    stock: 150,
    status: "In Stock",
  },
  {
    id: 2,
    name: "Mechanical Keyboard",
    category: "Electronics",
    price: 89.99,
    stock: 75,
    status: "In Stock",
  },
  {
    id: 3,
    name: "USB-C Cable",
    category: "Accessories",
    price: 12.99,
    stock: 0,
    status: "Out of Stock",
  },
  {
    id: 4,
    name: "Laptop Stand",
    category: "Accessories",
    price: 45.99,
    stock: 32,
    status: "In Stock",
  },
  {
    id: 5,
    name: "Webcam HD",
    category: "Electronics",
    price: 69.99,
    stock: 18,
    status: "Low Stock",
  },
  {
    id: 6,
    name: "Desk Lamp",
    category: "Office",
    price: 34.99,
    stock: 90,
    status: "In Stock",
  },
  {
    id: 7,
    name: 'Monitor 27"',
    category: "Electronics",
    price: 299.99,
    stock: 12,
    status: "Low Stock",
  },
  {
    id: 8,
    name: "Ergonomic Chair",
    category: "Furniture",
    price: 199.99,
    stock: 8,
    status: "Low Stock",
  },
];

/**
 * Displays a colored badge based on status value.
 * Supports completed/in stock, pending/low stock, and failed/out of stock states.
 *
 * @component
 * @param {string} status - Status text to display and determine color
 */
const StatusBadge = ({ status }: { status: string }) => {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
      case "in stock":
        return "bg-green-500/10 text-green-500 border-green-500/20";
      case "pending":
      case "low stock":
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20";
      case "failed":
      case "out of stock":
        return "bg-red-500/10 text-red-500 border-red-500/20";
      default:
        return "bg-gray-500/10 text-gray-400 border-gray-500/20";
    }
  };

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium border ${getStatusColor(
        status,
      )}`}
    >
      {status}
    </span>
  );
};

/**
 * Displays sort direction indicator arrow.
 *
 * @component
 * @param {false | 'asc' | 'desc'} isSorted - Current sort state
 */
const SortingArrow = ({ isSorted }: { isSorted: false | "asc" | "desc" }) => {
  if (!isSorted)
    return <div className="inline-flex w-4 h-4 ml-1 flex-shrink-0" />;
  return (
    <div className="inline-flex w-4 h-4 text-mainColor ml-1 flex-shrink-0">
      {isSorted === "desc" ? (
        <ArrowDownIcon width={16} height={16} />
      ) : (
        <ArrowUpIcon width={16} height={16} />
      )}
    </div>
  );
};

/**
 * Basic sortable table displaying product inventory.
 * Uses TanStack Table for sorting functionality.
 *
 * @component
 */
export const BasicTable = () => {
  const t = useTranslations("tables.cardTitles");

  // Basic Table State
  const [basicSorting, setBasicSorting] = React.useState<SortingState>([]);

  // Basic Table Columns
  const basicColumns: ColumnDef<Product>[] = [
    {
      accessorKey: "id",
      header: "ID",
      cell: ({ row }) => (
        <span className="font-mono">#{row.getValue("id")}</span>
      ),
    },
    {
      accessorKey: "name",
      header: "Product Name",
    },
    {
      accessorKey: "category",
      header: "Category",
    },
    {
      accessorKey: "price",
      header: "Price",
      cell: ({ row }) => {
        const price = parseFloat(row.getValue("price"));
        return <span>${price.toFixed(2)}</span>;
      },
    },
    {
      accessorKey: "stock",
      header: "Stock",
      cell: ({ row }) => (
        <span className="font-medium">{row.getValue("stock")}</span>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => <StatusBadge status={row.getValue("status")} />,
    },
  ];

  // Basic Table Instance
  const basicTable = useReactTable({
    data: basicTableData,
    columns: basicColumns,
    state: {
      sorting: basicSorting,
    },
    onSortingChange: setBasicSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <Card isHeaderDividerVisible addTitleMargin title={t("basicTable")}>
      <div className="py-2">
        <div className="overflow-x-auto">
          <table className="w-full min-w-200">
            <caption className="sr-only">Basic data table</caption>
            <thead>
              {basicTable.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header, index) => (
                    <th
                      key={header.id}
                      scope="col"
                      aria-sort={
                        header.column.getIsSorted() === "asc"
                          ? "ascending"
                          : header.column.getIsSorted() === "desc"
                            ? "descending"
                            : undefined
                      }
                      className={`text-secondaryText font-medium text-left text-sm px-4 py-3 whitespace-nowrap border-t border-b border-inputBorder bg-tableHeaderBg ${
                        index === 0 ? "border-l" : ""
                      } ${
                        index === headerGroup.headers.length - 1
                          ? "border-r"
                          : ""
                      } ${header.column.getCanSort() ? "cursor-pointer select-none hover:bg-tableHeaderBgHover" : ""}`}
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      <div className="flex items-center">
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                        <SortingArrow isSorted={header.column.getIsSorted()} />
                      </div>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {basicTable.getRowModel().rows.map((row) => (
                <tr key={row.id} className="hover:bg-tableRowBgHover">
                  {row.getVisibleCells().map((cell, cellIndex) => (
                    <td
                      key={cell.id}
                      className={`px-4 py-3 text-primaryText text-sm border-b border-mainBorder ${cellIndex === 0 ? "border-l" : ""} ${cellIndex === row.getVisibleCells().length - 1 ? "border-r" : ""}`}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Card>
  );
};
