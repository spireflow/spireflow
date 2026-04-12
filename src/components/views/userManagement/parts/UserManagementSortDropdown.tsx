"use client";

import { useTranslations } from "next-intl";

import { SortIcon } from "@/assets/icons/SortIcon";
import { Button } from "@/components/common/shadcn/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/common/shadcn/dropdown-menu";

interface SortOption {
  value: string;
  label: string;
}

interface UserManagementSortDropdownProps {
  options: SortOption[];
  currentSort: string | null;
  currentDirection: boolean;
  onSortChange: (sort: { id: string; desc: boolean } | null) => void;
}

export const UserManagementSortDropdown = ({
  options,
  currentSort,
  currentDirection,
  onSortChange,
}: UserManagementSortDropdownProps) => {
  const t = useTranslations("userManagement");

  const handleSortChange = (value: string) => {
    onSortChange({ id: value, desc: currentDirection });
  };

  const handleDirectionChange = (value: string) => {
    if (currentSort) {
      onSortChange({ id: currentSort, desc: value === "desc" });
    }
  };

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="text-sm pr-4 whitespace-nowrap w-full md:w-auto h-full gap-2"
        >
          <SortIcon />
          {t("button.sortBy")}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-44" align="end">
        <DropdownMenuRadioGroup
          value={currentSort ?? ""}
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
        <DropdownMenuItem onClick={() => onSortChange(null)}>
          {t("button.clearSorting")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
