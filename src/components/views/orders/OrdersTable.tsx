import { flexRender } from "@tanstack/react-table";
import React, { useRef, useState } from "react";

import { ArrowDownIcon } from "../../../assets/icons/ArrowDownIcon";
import { ArrowUpIcon } from "../../../assets/icons/ArrowUpIcon";
import { OrderModal } from "./OrderModal";
import { OrdersTableProps, OrderType } from "./types";

const columnWidths = {
  col1: "100px",
  col2: "150px",
  col3: "150px",
  col4: "100px",
  col5: "150px",
  col6: "150px",
  col7: "150px",
};

const SortingArrow = ({ isSortedDesc }: { isSortedDesc: boolean }) => {
  return (
    <div className="inline-flex text-mainColor">
      {!isSortedDesc ? (
        <ArrowDownIcon width={18} height={18} />
      ) : (
        <ArrowUpIcon width={18} height={18} />
      )}
    </div>
  );
};

export const OrdersTable = ({
  table,
  currentPage,
  itemsPerPage,
}: OrdersTableProps) => {
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<OrderType | null>(null);

  const triggerRef = useRef<HTMLTableRowElement | null>(null);

  const closeOrderModal = () => {
    setIsOrderModalOpen(false);
    requestAnimationFrame(() => {
      triggerRef.current?.focus();
    });
  };

  return (
    <>
      <table className="w-full mt-6 overflow-scroll min-w-220">
        <caption className="sr-only">Orders list</caption>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header, index) => (
                <th
                  key={header.id}
                  colSpan={header.colSpan}
                  scope="col"
                  tabIndex={header.column.getCanSort() ? 0 : undefined}
                  aria-sort={
                    header.column.getIsSorted() === "asc"
                      ? "ascending"
                      : header.column.getIsSorted() === "desc"
                        ? "descending"
                        : undefined
                  }
                  className={
                    header.column.getCanSort()
                      ? `text-secondaryText font-normal text-left text-sm 3xl:text-base pl-4 py-2 3xl:py-3 border-t border-b border-inputBorder cursor-pointer select-none bg-tableHeaderBg hover:bg-tableHeaderBgHover focus-visible:outline-offset-[-2px] ${index === 0 ? "border-l" : ""} ${index === headerGroup.headers.length - 1 ? "border-r" : ""}`
                      : `text-secondaryText font-medium text-left text-sm 3xl:text-base pl-4 py-2 3xl:py-3 border-t border-b border-inputBorder bg-tableHeaderBg ${index === 0 ? "border-l" : ""} ${index === headerGroup.headers.length - 1 ? "border-r" : ""}`
                  }
                  onClick={header.column.getToggleSortingHandler()}
                  onKeyDown={
                    header.column.getCanSort()
                      ? (e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            header.column.getToggleSortingHandler()?.(e);
                          }
                        }
                      : undefined
                  }
                  style={{
                    width: columnWidths[header.id as keyof typeof columnWidths],
                    maxWidth:
                      columnWidths[header.id as keyof typeof columnWidths],
                    minWidth:
                      columnWidths[header.id as keyof typeof columnWidths],
                  }}
                >
                  <div className="flex items-center gap-1">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                    {header.column.getIsSorted() ? (
                      <SortingArrow
                        isSortedDesc={header.column.getIsSorted() === "desc"}
                      />
                    ) : null}
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table
            .getRowModel()
            .rows.slice(
              currentPage * itemsPerPage,
              (currentPage + 1) * itemsPerPage,
            )
            .map((row) => (
              <tr
                key={row.id}
                role="button"
                tabIndex={0}
                aria-label={`View order ${(row.original as OrderType).orderId} details`}
                onClick={(e) => {
                  triggerRef.current = e.currentTarget;
                  setSelectedOrder(row.original as OrderType);
                  setIsOrderModalOpen(true);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    triggerRef.current = e.currentTarget;
                    setSelectedOrder(row.original as OrderType);
                    setIsOrderModalOpen(true);
                  }
                }}
                className="hover:bg-tableRowBgHover cursor-pointer focus-visible:outline-offset-[-2px]"
              >
                {row.getVisibleCells().map((cell, cellIndex) => (
                  <td
                    key={cell.id}
                    className={`text-tableCellText font-medium text-sm 3xl:text-base p-4 py-3 3xl:py-4 border-b border-mainBorder ${cellIndex === 0 ? "border-l" : ""} ${cellIndex === row.getVisibleCells().length - 1 ? "border-r" : ""}`}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
        </tbody>
      </table>
      {isOrderModalOpen && (
        <OrderModal
          closeModal={closeOrderModal}
          orderData={selectedOrder as OrderType}
        />
      )}
    </>
  );
};
