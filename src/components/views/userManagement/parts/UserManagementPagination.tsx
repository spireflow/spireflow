"use client";

import { useTranslations } from "next-intl";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/common/shadcn/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/common/shadcn/select";

interface UserManagementPaginationProps {
  itemsPerPage: number;
  currentPage: number;
  totalPage: number;
  setItemsPerPage: (count: number) => void;
  goToPage: (page: number) => void;
  prevPage: () => void;
  nextPage: () => void;
}

export const UserManagementPagination = ({
  itemsPerPage,
  currentPage,
  totalPage,
  setItemsPerPage,
  goToPage,
  prevPage,
  nextPage,
}: UserManagementPaginationProps) => {
  const t = useTranslations("pagination");

  return (
    <div className="flex items-center mt-8 gap-4 w-full sm:w-auto justify-center xsm:justify-between sm:justify-end self-start sm:self-unset">
      <div className="min-w-18 lg:mr-8 hidden xsm:block">
        <Select
          value={String(itemsPerPage)}
          onValueChange={(value) => {
            setItemsPerPage(Number(value));
            goToPage(0);
          }}
        >
          <SelectTrigger className="w-full" aria-label={t("itemsPerPage")}>
            <SelectValue />
          </SelectTrigger>
          <SelectContent side="top">
            <SelectItem value="10">10</SelectItem>
            <SelectItem value="50">50</SelectItem>
            <SelectItem value="100">100</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Pagination className="m-0 xsm:justify-end">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => prevPage()}
              disabled={currentPage === 0}
              label={t("previous")}
            />
          </PaginationItem>
          {Array.from({ length: totalPage }, (_, i) => i).map((pageIndex) => {
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
