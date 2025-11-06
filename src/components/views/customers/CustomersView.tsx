"use client";

import { useTranslations } from "next-intl";

import { SearchIcon } from "../../../assets/icons/SearchIcon";
import { OutlinedButton } from "../../common/OutlinedButton";
import { Chip } from "../../forms/Chip";
import { Input } from "../../forms/Input";
import { CustomersCountryDropdown } from "./CustomersCountryDropdown";
import { CustomersPagination } from "./CustomersPagination";
import { CustomersSortDropdown } from "./CustomersSortDropdown";
import { CustomersTable } from "./CustomersTable";
import { useCustomers } from "./useCustomers";
import { DownloadIcon } from "../../../assets/icons/DownloadIcon";
import { Tooltip } from "../../common/Tooltip";
import { Customer } from "./types";

interface CustomersViewProps {
  customers: Customer[];
}

export const CustomersView = ({ customers }: CustomersViewProps) => {
  const t = useTranslations("customers");

  const {
    table,
    searchQuery,
    setSearchQuery,
    setFilter,
    clearFilter,
    currentPage,
    itemsPerPage,
    setItemsPerPage,
    nextPage,
    prevPage,
    goToPage,
    totalPages,
    setSorting,
    sorting,
    filters,
    clearFilters,
    sortOptions,
    countryOptions,
    handleExportToCSV,
    handleMouseEnter,
    handleMouseLeave,
    tooltipRef,
  } = useCustomers(customers);

  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex justify-between flex-wrap md:flex-wrap w-full">
        <div className="w-full md:w-1/3 lg:w-1/4 relative flex h-[2.3rem] 3xl:h-[2.6rem]">
          <Input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t("searchField.searchCustomers")}
            icon={<SearchIcon />}
          />
        </div>
        <div className="flex gap-6 flex-wrap w-full md:w-auto mt-6 md:mt-0">
          <div className="flex w-full md:w-auto justify-between gap-4 md:gap-4 h-9 3xl:h-10">
            <CustomersCountryDropdown
              options={countryOptions}
              filterKey="country"
              setFilter={setFilter}
              filters={filters}
            />
            <CustomersSortDropdown
              options={sortOptions}
              setSorting={setSorting}
              currentSort={sorting[0]?.id || null}
              currentDirection={sorting[0]?.desc || false}
            />
          </div>
        </div>
      </div>
      <div
        className={`flex md:items-start flex-wrap md:flex-nowrap justify-start md:justify-start items-start  flex-col sm:flex-row gap-2 md:gap-0 mt-0 ${
          (filters.country || sorting[0]) && "!mt-6"
        }`}
      >
        {filters.country && (
          <Chip
            label={`${t("chip.country")}: ${filters.country}`}
            onDelete={() => clearFilter("country")}
          />
        )}
        {sorting[0] && (
          <Chip
            label={`${t("chip.sortedBy")}: ${
              sortOptions.find((option) => option.value === sorting[0].id)
                ?.label || sorting[0].id
            } ${
              sorting[0].desc ? t("button.descending") : t("button.ascending")
            }`}
            onDelete={() => setSorting([])}
          />
        )}
      </div>
      <div className="w-full overflow-auto">
        <CustomersTable table={table} />
      </div>
      <div className="flex flex-col sm:flex-row justify-between items-center flex-wrap pb-4">
        <div className="w-[14rem] mt-8 sm:mb-0 flex gap-4 h-10 3xl:h-11">
          <OutlinedButton
            handleClick={clearFilters}
            text={t("button.clearFilters")}
          />
          <div
            className="h-10 3xl:h-11 w-12 relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <OutlinedButton
              handleClick={() => handleExportToCSV(customers)}
              className="!px-[0.8rem]"
            >
              <DownloadIcon />
            </OutlinedButton>
            <div
              ref={tooltipRef}
              style={{ visibility: "hidden" }}
              className="absolute bottom-2 left-14 pointer-events-none"
            >
              <Tooltip
                text={t("button.csv")}
                className="h-8 px-2 min-w-[7rem] pointer-events-none"
              />
            </div>
          </div>
        </div>
        <CustomersPagination
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          totalPage={totalPages}
          setItemsPerPage={setItemsPerPage}
          goToPage={goToPage}
          prevPage={prevPage}
          nextPage={nextPage}
        />
      </div>
    </div>
  );
};
