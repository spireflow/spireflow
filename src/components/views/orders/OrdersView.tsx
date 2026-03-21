"use client";

import { useTranslations } from "next-intl";

import { DownloadIcon } from "../../../assets/icons/DownloadIcon";
import { SearchIcon } from "../../../assets/icons/SearchIcon";
import { exportToXLSX } from "../../../utils/exportToXLSX";
import { Button } from "../../common/shadcn/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "../../common/shadcn/input-group";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "../../common/shadcn/tooltip";
import { OrdersDateRange } from "./parts/OrdersDateRange";
import { OrdersPagination } from "./parts/OrdersPagination";
import { OrderSelects } from "./parts/OrdersSelects";
import { OrdersTable } from "./parts/OrdersTable";
import { OrdersViewProps } from "./types";
import { useOrders } from "./useOrders";

export const OrdersView = ({ ordersData }: OrdersViewProps) => {
  const t = useTranslations("orders");

  const {
    table,
    searchQuery,
    setSearchQuery,
    getFilter,
    setFilter,
    filtersForSelectFields,
    nextPage,
    prevPage,
    goToPage,
    totalPage,
    currentPage,
    setItemsPerPage,
    itemsPerPage,
    setCurrentPage,
    resetFilters,
  } = useOrders({ orders: ordersData });

  const handleExportToCSV = () => {
    exportToXLSX(ordersData, "orders");
  };

  return (
    <div className="flex flex-col w-full h-full">
      <h1 className="sr-only">Orders</h1>
      <div className="w-full flex justify-between flex-wrap md:flex-nowrap">
        <div className="w-full md:w-1/4 mb-4 min-w-60 h-[2.6rem]">
          <InputGroup className="h-full">
            <InputGroupInput
              type="text"
              value={searchQuery}
              className="!h-[2.6rem]"
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(0);
              }}
              placeholder={t("searchField.searchOrders")}
            />
            <InputGroupAddon>
              <SearchIcon />
            </InputGroupAddon>
          </InputGroup>
        </div>
        <OrdersDateRange
          startDate={getFilter("startDate") as string | null}
          setStartDate={(value) => setFilter("startDate", value)}
          endDate={getFilter("endDate") as string | null}
          setEndDate={(value) => setFilter("endDate", value)}
        />
      </div>
      <div className="flex w-full gap-4 mt-2">
        <OrderSelects
          filters={filtersForSelectFields}
          setFilter={setFilter}
          ordersData={ordersData}
        />
      </div>
      <div className="w-full overflow-auto">
        <OrdersTable
          table={table}
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
        />
      </div>
      <div className="flex flex-col sm:flex-row justify-between items-center flex-wrap pb-4">
        <div className="w-56 mt-8 sm:mb-0 flex gap-4 h-10 3xl:h-11">
          <Button
            variant="outline"
            onClick={resetFilters}
            className="flex-1 !h-full"
          >
            {t("button.clearFilters")}
          </Button>
          <Tooltip delayDuration={200}>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                onClick={handleExportToCSV}
                className="!px-[0.8rem] !h-full w-12"
                aria-label="Export orders to CSV"
              >
                <DownloadIcon />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right" align="center">
              {t("button.xlsx")}
            </TooltipContent>
          </Tooltip>
        </div>
        <OrdersPagination
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          totalPage={totalPage}
          setItemsPerPage={setItemsPerPage}
          goToPage={goToPage}
          prevPage={prevPage}
          nextPage={nextPage}
        />
      </div>
    </div>
  );
};
