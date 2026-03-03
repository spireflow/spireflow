import { useTranslations } from "next-intl";
import React from "react";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../../../common/shadcn/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../common/shadcn/select";
import { OrdersPaginationProps } from "../types";

export const OrdersPagination = ({
  itemsPerPage,
  currentPage,
  totalPage,
  setItemsPerPage,
  goToPage,
  prevPage,
  nextPage,
}: OrdersPaginationProps) => {
  const t = useTranslations("pagination");

  return (
    <div className="flex items-center mt-8 gap-4 w-full sm:w-auto sm:gap-8 justify-between sm:justify-end text-primaryText">
      <div className="min-w-18">
        <Select
          value={String(itemsPerPage)}
          onValueChange={(value) => {
            setItemsPerPage(Number(value));
            goToPage(0);
          }}
        >
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent side="top">
            <SelectItem value="10">10</SelectItem>
            <SelectItem value="50">50</SelectItem>
            <SelectItem value="100">100</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Pagination className="m-0 justify-end">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => prevPage()}
              disabled={currentPage === 0}
              label={t("previous")}
            />
          </PaginationItem>
          {Array.from({ length: totalPage }, (_, i) => i).map((pageIndex) => {
            /** Show first page, last page, current page, and pages around current */
            if (
              pageIndex === 0 ||
              pageIndex === totalPage - 1 ||
              (pageIndex >= currentPage - 1 && pageIndex <= currentPage + 1)
            ) {
              return (
                <PaginationItem key={pageIndex}>
                  <PaginationLink
                    onClick={() => goToPage(pageIndex)}
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
              onClick={() => nextPage()}
              disabled={currentPage === totalPage - 1}
              label={t("next")}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};
