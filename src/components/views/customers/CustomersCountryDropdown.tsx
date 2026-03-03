import { useTranslations } from "next-intl";

import { FilterIcon } from "../../../assets/icons/FilterIcon";
import { Button } from "../../common/shadcn/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../common/shadcn/dropdown-menu";
import { CustomersDropdownProps } from "./types";

export const CustomersCountryDropdown = ({
  options,
  filterKey,
  setFilter,
  filters,
}: CustomersDropdownProps) => {
  const t = useTranslations("customers");

  const activeFilter = filters[filterKey] as string | undefined;

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="text-sm max-xsm:w-full h-full w-auto justify-start gap-2"
        >
          <FilterIcon />
          {t("button.filterByCountry")}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-44" align="start">
        <DropdownMenuRadioGroup
          value={activeFilter || ""}
          onValueChange={(value) => setFilter(filterKey, value)}
        >
          {options.map((option) => (
            <DropdownMenuRadioItem key={option} value={option}>
              {option}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => setFilter(filterKey, undefined)}>
          {t("button.clearFilter")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
