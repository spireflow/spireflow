"use client";

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { Edit, Trash2 } from "lucide-react";
import { useTranslations } from "next-intl";
import * as React from "react";

import { ArrowDownIcon } from "../../../assets/icons/ArrowDownIcon";
import { ArrowUpIcon } from "../../../assets/icons/ArrowUpIcon";
import { Card } from "../../common/Card";
import { Button } from "../../common/shadcn/button";
import { Checkbox } from "../../common/shadcn/checkbox";
import { Input } from "../../common/shadcn/input";

type Transaction = {
  id: string;
  customer: string;
  email: string;
  product: string;
  amount: number;
  status: "completed" | "pending" | "failed";
  date: string;
};

const advancedTableData: Transaction[] = [
  {
    id: "TXN001",
    customer: "John Doe",
    email: "john@example.com",
    product: "Laptop Pro",
    amount: 1299.99,
    status: "completed",
    date: "2024-01-15",
  },
  {
    id: "TXN002",
    customer: "Jane Smith",
    email: "jane@example.com",
    product: "Wireless Mouse",
    amount: 29.99,
    status: "completed",
    date: "2024-01-16",
  },
  {
    id: "TXN003",
    customer: "Bob Johnson",
    email: "bob@example.com",
    product: "Mechanical Keyboard",
    amount: 89.99,
    status: "pending",
    date: "2024-01-17",
  },
  {
    id: "TXN004",
    customer: "Alice Brown",
    email: "alice@example.com",
    product: "Monitor 4K",
    amount: 499.99,
    status: "completed",
    date: "2024-01-18",
  },
  {
    id: "TXN005",
    customer: "Charlie Wilson",
    email: "charlie@example.com",
    product: "USB-C Hub",
    amount: 45.99,
    status: "failed",
    date: "2024-01-19",
  },
  {
    id: "TXN006",
    customer: "Diana Martinez",
    email: "diana@example.com",
    product: "Webcam HD",
    amount: 69.99,
    status: "completed",
    date: "2024-01-20",
  },
  {
    id: "TXN007",
    customer: "Eva Garcia",
    email: "eva@example.com",
    product: "Desk Lamp",
    amount: 34.99,
    status: "pending",
    date: "2024-01-21",
  },
  {
    id: "TXN008",
    customer: "Frank Lee",
    email: "frank@example.com",
    product: "Ergonomic Chair",
    amount: 199.99,
    status: "completed",
    date: "2024-01-22",
  },
  {
    id: "TXN009",
    customer: "Grace Kim",
    email: "grace@example.com",
    product: "Laptop Stand",
    amount: 45.99,
    status: "completed",
    date: "2024-01-23",
  },
  {
    id: "TXN010",
    customer: "Henry Chen",
    email: "henry@example.com",
    product: "Portable SSD",
    amount: 129.99,
    status: "pending",
    date: "2024-01-24",
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
 * Advanced table with search, row selection, sorting, and filtering.
 * Uses TanStack Table for advanced table functionality.
 *
 * @component
 */
export const AdvancedTable = () => {
  const t = useTranslations("tables.cardTitles");

  /** Sorting, filtering, selection, and search state for the advanced table. */
  const [advancedSorting, setAdvancedSorting] = React.useState<SortingState>(
    [],
  );
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [rowSelection, setRowSelection] = React.useState({});
  const [globalFilter, setGlobalFilter] = React.useState("");

  /** Column definitions with row selection, status badges, and action buttons. */
  const advancedColumns: ColumnDef<Transaction>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
    },
    {
      accessorKey: "id",
      header: "Transaction ID",
      cell: ({ row }) => (
        <span className="font-mono text-sm">{row.getValue("id")}</span>
      ),
    },
    {
      accessorKey: "customer",
      header: "Customer",
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => (
        <span className="text-sm text-secondaryText">
          {row.getValue("email")}
        </span>
      ),
    },
    {
      accessorKey: "product",
      header: "Product",
    },
    {
      accessorKey: "amount",
      header: "Amount",
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue("amount"));
        return <span className="font-medium">${amount.toFixed(2)}</span>;
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => <StatusBadge status={row.getValue("status")} />,
    },
    {
      accessorKey: "date",
      header: "Date",
      cell: ({ row }) => {
        const date = new Date(row.getValue("date"));
        return <span className="text-sm">{date.toLocaleDateString()}</span>;
      },
    },
    {
      id: "actions",
      header: "Actions",
      cell: () => (
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            aria-label="Edit row"
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-red-500 hover:text-red-600"
            aria-label="Delete row"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ),
      enableSorting: false,
    },
  ];

  /** TanStack Table instance with sorting, filtering, and row selection. */
  const advancedTable = useReactTable({
    data: advancedTableData,
    columns: advancedColumns,
    state: {
      sorting: advancedSorting,
      columnFilters,
      rowSelection,
      globalFilter,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setAdvancedSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <Card isHeaderDividerVisible addTitleMargin title={t("searchAndSelection")}>
      <div className="py-2">
        {/* Search and Info */}
        <div
          className="flex items-center justify-between"
          style={{ marginBottom: "1.3rem" }}
        >
          <div className="flex items-center gap-2 max-xsm:w-full">
            <Input
              placeholder="Search..."
              value={globalFilter ?? ""}
              onChange={(event) => setGlobalFilter(event.target.value)}
              className="w-64 max-xsm:w-[80%] flex-shrink-0"
            />
            {Object.keys(rowSelection).length > 0 && (
              <span className="text-sm text-secondaryText whitespace-nowrap">
                {Object.keys(rowSelection).length} of{" "}
                {advancedTable.getFilteredRowModel().rows.length} row(s)
                selected
              </span>
            )}
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-200">
            <caption className="sr-only">
              Advanced data table with selection
            </caption>
            <thead>
              {advancedTable.getHeaderGroups().map((headerGroup) => (
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
                      className={`text-secondaryText font-medium text-left text-sm px-4 py-3 whitespace-nowrap bg-tableHeaderBg border-t border-b border-inputBorder ${
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
              {advancedTable.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className={
                    row.getIsSelected()
                      ? "bg-tableRowBgHover"
                      : "hover:bg-tableRowBgHover"
                  }
                >
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
