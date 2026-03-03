import { useTranslations } from "next-intl";

import { SortIcon } from "../../../assets/icons/SortIcon";
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
import { SortDropdownProps } from "./types";

export const CustomersSortDropdown = ({
  options,
  setSorting,
  currentSort,
  currentDirection,
}: SortDropdownProps) => {
  const t = useTranslations("customers");

  const handleSortChange = (value: string) => {
    setSorting([{ id: value, desc: currentDirection }]);
  };

  const handleDirectionChange = (value: string) => {
    const isDesc = value === "desc";
    if (currentSort) {
      setSorting([{ id: currentSort, desc: isDesc }]);
    }
  };

  const clearSorting = () => {
    setSorting([]);
  };

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="text-sm pr-4 whitespace-nowrap max-xsm:w-full h-full gap-2"
        >
          <SortIcon />
          {t("button.sortBy")}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-44" align="end">
        <DropdownMenuRadioGroup
          value={currentSort || ""}
          onValueChange={handleSortChange}
        >
          {options.map((option) => (
            <DropdownMenuRadioItem key={option.value} value={option.value}>
              {option.label}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={currentDirection ? "desc" : "asc"}
          onValueChange={handleDirectionChange}
        >
          <DropdownMenuRadioItem value="asc">
            {t("button.ascending")}
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="desc">
            {t("button.descending")}
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={clearSorting}>
          {t("button.clearSorting")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
