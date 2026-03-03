"use client";

import { useTranslations } from "next-intl";

import { DownloadIcon } from "../../../assets/icons/DownloadIcon";
import { SearchIcon } from "../../../assets/icons/SearchIcon";
import { Chip } from "../../common/Chip";
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
import { CustomersCountryDropdown } from "./CustomersCountryDropdown";
import { CustomersPagination } from "./CustomersPagination";
import { CustomersSortDropdown } from "./CustomersSortDropdown";
import { CustomersTable } from "./CustomersTable";
import { Customer } from "./types";
import { useCustomers } from "./useCustomers";

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
  } = useCustomers(customers);

  return (
    <div className="flex flex-col w-full h-full">
      <h1 className="sr-only">Customers</h1>
      <div className="flex justify-between flex-wrap md:flex-wrap w-full">
        <div className="w-full md:w-1/3 lg:w-1/4 h-[2.3rem] 3xl:h-[2.6rem]">
          <InputGroup className="h-full">
            <InputGroupInput
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t("searchField.searchCustomers")}
            />
            <InputGroupAddon>
              <SearchIcon />
            </InputGroupAddon>
          </InputGroup>
        </div>
        <div className="flex gap-6 flex-wrap w-full md:w-auto mt-6 md:mt-0">
          <div className="flex w-full md:w-auto justify-between gap-4 md:gap-4 h-9 3xl:h-10 max-xsm:gap-2">
            <div className="max-xsm:w-[calc(50%-0.25rem)]">
              <CustomersCountryDropdown
                options={countryOptions}
                filterKey="country"
                setFilter={setFilter}
                filters={filters}
              />
            </div>
            <div className="max-xsm:w-[calc(50%-0.25rem)]">
              <CustomersSortDropdown
                options={sortOptions}
                setSorting={setSorting}
                currentSort={sorting[0]?.id || null}
                currentDirection={sorting[0]?.desc || false}
              />
            </div>
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
        <div className="w-56 mt-8 sm:mb-0 flex gap-4 h-10 3xl:h-11">
          <Button
            variant="outline"
            onClick={clearFilters}
            className="flex-1 !h-full"
          >
            {t("button.clearFilters")}
          </Button>
          <Tooltip delayDuration={200}>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                onClick={() => handleExportToCSV(customers)}
                className="!px-[0.8rem] !h-full w-12"
                aria-label="Export customers to CSV"
              >
                <DownloadIcon />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right" align="center">
              {t("button.xlsx")}
            </TooltipContent>
          </Tooltip>
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
