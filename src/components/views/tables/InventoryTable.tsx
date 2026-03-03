"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  PaginationState,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { Edit, Search } from "lucide-react";
import { useTranslations } from "next-intl";
import * as React from "react";

import { ArrowDownIcon } from "../../../assets/icons/ArrowDownIcon";
import { ArrowUpIcon } from "../../../assets/icons/ArrowUpIcon";
import { Card } from "../../common/Card";
import { Button } from "../../common/shadcn/button";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../../common/shadcn/pagination";

type InventoryItem = {
  id: string;
  sku: string;
  name: string;
  quantity: number;
  reorderPoint: number;
  supplier: string;
};

const inventoryTableData: InventoryItem[] = [
  {
    id: "INV001",
    sku: "WM-2024-001",
    name: "Wireless Mouse Pro",
    quantity: 145,
    reorderPoint: 50,
    supplier: "TechSupply Co",
  },
  {
    id: "INV002",
    sku: "KB-2024-002",
    name: "Mechanical Keyboard RGB",
    quantity: 23,
    reorderPoint: 30,
    supplier: "KeyMaster Inc",
  },
  {
    id: "INV003",
    sku: "MON-2024-003",
    name: '27" 4K Monitor',
    quantity: 8,
    reorderPoint: 15,
    supplier: "DisplayPro Ltd",
  },
  {
    id: "INV004",
    sku: "CAB-2024-004",
    name: "USB-C Cable 2m",
    quantity: 320,
    reorderPoint: 100,
    supplier: "CableWorks",
  },
  {
    id: "INV005",
    sku: "WEB-2024-005",
    name: "HD Webcam",
    quantity: 12,
    reorderPoint: 20,
    supplier: "VisionTech",
  },
  {
    id: "INV006",
    sku: "LAP-2024-006",
    name: "Laptop Stand Aluminum",
    quantity: 67,
    reorderPoint: 25,
    supplier: "ErgoSupplies",
  },
  {
    id: "INV007",
    sku: "HEA-2024-007",
    name: "Wireless Headphones",
    quantity: 54,
    reorderPoint: 40,
    supplier: "AudioTech",
  },
  {
    id: "INV008",
    sku: "MIC-2024-008",
    name: "USB Microphone",
    quantity: 18,
    reorderPoint: 25,
    supplier: "SoundPro",
  },
  {
    id: "INV009",
    sku: "DOC-2024-009",
    name: "Docking Station",
    quantity: 31,
    reorderPoint: 20,
    supplier: "ConnectHub",
  },
  {
    id: "INV010",
    sku: "SSD-2024-010",
    name: "External SSD 1TB",
    quantity: 89,
    reorderPoint: 35,
    supplier: "StorageMax",
  },
  {
    id: "INV011",
    sku: "CHR-2024-011",
    name: "Wireless Charger",
    quantity: 156,
    reorderPoint: 60,
    supplier: "ChargeTech",
  },
  {
    id: "INV012",
    sku: "HUB-2024-012",
    name: "USB-C Hub 7-Port",
    quantity: 14,
    reorderPoint: 30,
    supplier: "PortExpand",
  },
  {
    id: "INV013",
    sku: "SPK-2024-013",
    name: "Bluetooth Speaker",
    quantity: 92,
    reorderPoint: 45,
    supplier: "SoundWave",
  },
  {
    id: "INV014",
    sku: "CAM-2024-014",
    name: "Security Camera",
    quantity: 37,
    reorderPoint: 20,
    supplier: "SecureTech",
  },
  {
    id: "INV015",
    sku: "TAB-2024-015",
    name: "Graphics Tablet",
    quantity: 15,
    reorderPoint: 25,
    supplier: "ArtSupply",
  },
  {
    id: "INV016",
    sku: "PRT-2024-016",
    name: "Wireless Printer",
    quantity: 28,
    reorderPoint: 15,
    supplier: "PrintMaster",
  },
  {
    id: "INV017",
    sku: "RTR-2024-017",
    name: "WiFi Router Mesh",
    quantity: 63,
    reorderPoint: 30,
    supplier: "NetGear Pro",
  },
  {
    id: "INV018",
    sku: "BAT-2024-018",
    name: "Power Bank 20000mAh",
    quantity: 184,
    reorderPoint: 80,
    supplier: "PowerCell",
  },
  {
    id: "INV019",
    sku: "MNT-2024-019",
    name: "Monitor Arm Dual",
    quantity: 41,
    reorderPoint: 20,
    supplier: "ErgoStand",
  },
  {
    id: "INV020",
    sku: "KEY-2024-020",
    name: "Numeric Keypad",
    quantity: 112,
    reorderPoint: 50,
    supplier: "KeyMaster Inc",
  },
  {
    id: "INV021",
    sku: "PAD-2024-021",
    name: "Mouse Pad XL",
    quantity: 267,
    reorderPoint: 100,
    supplier: "DeskMate",
  },
  {
    id: "INV022",
    sku: "LGT-2024-022",
    name: "LED Desk Light",
    quantity: 58,
    reorderPoint: 35,
    supplier: "BrightLux",
  },
  {
    id: "INV023",
    sku: "FAN-2024-023",
    name: "USB Desk Fan",
    quantity: 19,
    reorderPoint: 30,
    supplier: "CoolBreeze",
  },
  {
    id: "INV024",
    sku: "CLN-2024-024",
    name: "Screen Cleaning Kit",
    quantity: 143,
    reorderPoint: 60,
    supplier: "CleanTech",
  },
];

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
 * Inventory table with pagination and low stock highlighting.
 * Uses TanStack Table with shadcn Pagination component.
 *
 * @component
 */
export const InventoryTable = () => {
  const t = useTranslations("pagination");
  const tTables = useTranslations("tables.cardTitles");

  /** Sorting and pagination state for the inventory table. */
  const [inventorySorting, setInventorySorting] = React.useState<SortingState>(
    [],
  );
  const [inventoryPagination, setInventoryPagination] =
    React.useState<PaginationState>({
      pageIndex: 0,
      pageSize: 8,
    });

  /** Column definitions with stock-level coloring and action buttons. */
  const inventoryColumns: ColumnDef<InventoryItem>[] = [
    {
      accessorKey: "id",
      header: "Inventory ID",
      cell: ({ row }) => (
        <span className="font-mono text-sm">{row.getValue("id")}</span>
      ),
    },
    {
      accessorKey: "sku",
      header: "SKU",
      cell: ({ row }) => (
        <span className="font-mono text-xs">{row.getValue("sku")}</span>
      ),
    },
    {
      accessorKey: "name",
      header: "Product Name",
    },
    {
      accessorKey: "quantity",
      header: "Quantity",
      cell: ({ row }) => {
        const quantity = row.getValue("quantity") as number;
        const reorderPoint = row.original.reorderPoint;
        const isLow = quantity < reorderPoint;
        return (
          <span
            className={`font-medium ${isLow ? "text-red-500" : "text-green-500"}`}
          >
            {quantity}
          </span>
        );
      },
    },
    {
      accessorKey: "reorderPoint",
      header: "Reorder Point",
      cell: ({ row }) => (
        <span className="text-sm text-secondaryText">
          {row.getValue("reorderPoint")}
        </span>
      ),
    },
    {
      accessorKey: "supplier",
      header: "Supplier",
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
            aria-label="Search product"
          >
            <Search className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            aria-label="Edit product"
          >
            <Edit className="h-4 w-4" />
          </Button>
        </div>
      ),
      enableSorting: false,
    },
  ];

  /** TanStack Table instance with sorting and client-side pagination. */
  const inventoryTable = useReactTable({
    data: inventoryTableData,
    columns: inventoryColumns,
    state: {
      sorting: inventorySorting,
      pagination: inventoryPagination,
    },
    onSortingChange: setInventorySorting,
    onPaginationChange: setInventoryPagination,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <Card isHeaderDividerVisible addTitleMargin title={tTables("pagination")}>
      <div className="py-2">
        <div className="overflow-x-auto">
          <table className="w-full min-w-200" style={{ tableLayout: "fixed" }}>
            <caption className="sr-only">Inventory stock table</caption>
            <thead>
              {inventoryTable.getHeaderGroups().map((headerGroup) => (
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
              {inventoryTable.getRowModel().rows.map((row) => (
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

        {/* Pagination Controls */}
        <div
          className="flex items-center justify-between max-sm:flex-col max-sm:items-center max-sm:gap-6"
          style={{ marginTop: "2rem" }}
        >
          <div className="text-sm text-secondaryText whitespace-nowrap max-sm:text-center">
            {t("showing")}{" "}
            {inventoryTable.getState().pagination.pageIndex *
              inventoryTable.getState().pagination.pageSize +
              1}{" "}
            {t("to")}{" "}
            {Math.min(
              (inventoryTable.getState().pagination.pageIndex + 1) *
                inventoryTable.getState().pagination.pageSize,
              inventoryTableData.length,
            )}{" "}
            {t("of")} {inventoryTableData.length} {t("results")}
          </div>
          <Pagination className="m-0 justify-end max-sm:justify-center">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => inventoryTable.previousPage()}
                  disabled={!inventoryTable.getCanPreviousPage()}
                  label={t("previous")}
                />
              </PaginationItem>
              {Array.from(
                { length: inventoryTable.getPageCount() },
                (_, i) => i,
              ).map((pageIndex) => {
                const currentPage =
                  inventoryTable.getState().pagination.pageIndex;
                const totalPages = inventoryTable.getPageCount();

                // Show first page, last page, current page, and pages around current
                if (
                  pageIndex === 0 ||
                  pageIndex === totalPages - 1 ||
                  (pageIndex >= currentPage - 1 && pageIndex <= currentPage + 1)
                ) {
                  return (
                    <PaginationItem key={pageIndex}>
                      <PaginationLink
                        onClick={() => inventoryTable.setPageIndex(pageIndex)}
                        isActive={pageIndex === currentPage}
                      >
                        {pageIndex + 1}
                      </PaginationLink>
                    </PaginationItem>
                  );
                } else if (
                  pageIndex === currentPage - 2 ||
                  pageIndex === currentPage + 2
                ) {
                  return (
                    <PaginationItem key={pageIndex}>
                      <PaginationEllipsis />
                    </PaginationItem>
                  );
                }
                return null;
              })}
              <PaginationItem>
                <PaginationNext
                  onClick={() => inventoryTable.nextPage()}
                  disabled={!inventoryTable.getCanNextPage()}
                  label={t("next")}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </Card>
  );
};
