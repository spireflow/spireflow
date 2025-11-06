"use client";

import { useTranslations } from "next-intl";

import { useOrders } from "./useOrders";
import { OrdersDateRange } from "./OrdersDateRange";
import { OrderSelects } from "./OrdersSelects";
import { OrdersTable } from "./OrdersTable";
import { OrdersPagination } from "./OrdersPagination";
import { SearchIcon } from "../../../assets/icons/SearchIcon";
import { OutlinedButton } from "../../common/OutlinedButton";
import { Input } from "../../forms/Input";
import { DownloadIcon } from "../../../assets/icons/DownloadIcon";
import { useTooltip } from "../../../hooks/useTooltip";
import { Tooltip } from "../../common/Tooltip";
import { exportToCSV } from "../../../utils/exportToCSV";
import { OrdersViewProps } from "./types";

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

  const csvTooltip = useTooltip();

  const handleExportToCSV = () => {
    exportToCSV(ordersData, "orders");
  };

  return (
    <div className="flex flex-col w-full h-full">
      <div className="w-full flex justify-between flex-wrap md:flex-nowrap">
        <div className="w-full md:w-1/4 mb-4 relative min-w-[15rem] h-[2.3rem] 3xl:h-[2.6rem]">
          <Input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(0);
            }}
            placeholder={t("searchField.searchOrders")}
            icon={<SearchIcon />}
          />
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
      <div className="flex justify-between flex-wrap pb-4">
        <div className="w-[14rem] mt-8 sm:mb-0 flex gap-4 h-10 3xl:h-11">
          <OutlinedButton
            handleClick={resetFilters}
            text={t("button.clearFilters")}
          />
          <div
            className="h-10 3xl:h-11 w-12 relative"
            onMouseEnter={csvTooltip.showTooltip}
            onMouseLeave={csvTooltip.hideTooltip}
          >
            <OutlinedButton
              handleClick={handleExportToCSV}
              className="!px-[0.8rem]"
            >
              <DownloadIcon />
            </OutlinedButton>
            {csvTooltip.isTooltipVisible && (
              <div className="absolute bottom-2 left-14 pointer-events-none">
                <Tooltip
                  text={t("button.csv")}
                  className="h-8 px-2 min-w-[7rem] pointer-events-none"
                />
              </div>
            )}
          </div>
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
