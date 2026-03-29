"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import { Columns, Edit, Eye } from "lucide-react";
import { useTranslations } from "next-intl";
import * as React from "react";

import { ArrowDownIcon } from "@/assets/icons/ArrowDownIcon";
import { ArrowUpIcon } from "@/assets/icons/ArrowUpIcon";
import { FilterIcon } from "@/assets/icons/FilterIcon";
import { SortIcon } from "@/assets/icons/SortIcon";
import { Badge } from "@/components/common/shadcn/badge";
import { Button } from "@/components/common/shadcn/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/common/shadcn/card";
import { Checkbox } from "@/components/common/shadcn/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/common/shadcn/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/common/shadcn/popover";

type User = {
  id: number;
  name: string;
  email: string;
  role: string;
  status: "active" | "inactive";
  joinDate: string;
};

const userTableData: User[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    role: "Admin",
    status: "active",
    joinDate: "2023-01-15",
  },
  {
    id: 2,
    name: "Michael Brown",
    email: "m.brown@example.com",
    role: "Editor",
    status: "active",
    joinDate: "2023-03-22",
  },
  {
    id: 3,
    name: "Emily Davis",
    email: "emily.d@example.com",
    role: "Viewer",
    status: "active",
    joinDate: "2023-06-10",
  },
  {
    id: 4,
    name: "David Wilson",
    email: "d.wilson@example.com",
    role: "Editor",
    status: "inactive",
    joinDate: "2023-08-05",
  },
  {
    id: 5,
    name: "Lisa Anderson",
    email: "lisa.a@example.com",
    role: "Admin",
    status: "active",
    joinDate: "2023-09-18",
  },
  {
    id: 6,
    name: "James Taylor",
    email: "j.taylor@example.com",
    role: "Viewer",
    status: "active",
    joinDate: "2023-11-30",
  },
  {
    id: 7,
    name: "Robert Martinez",
    email: "r.martinez@example.com",
    role: "Editor",
    status: "active",
    joinDate: "2024-02-12",
  },
  {
    id: 8,
    name: "Jessica White",
    email: "j.white@example.com",
    role: "Viewer",
    status: "active",
    joinDate: "2024-03-08",
  },
];

/**
 * Displays a colored badge based on status value.
 * Supports active and inactive user states.
 *
 * @component
 * @param {string} status - Status text to display and determine color
 */
const StatusBadge = ({ status }: { status: string }) => {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
      case "in stock":
      case "active":
        return "bg-green-500/10 text-green-500 border-green-500/20";
      case "pending":
      case "low stock":
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20";
      case "failed":
      case "out of stock":
      case "inactive":
        return "bg-red-500/10 text-red-500 border-red-500/20";
      default:
        return "bg-gray-500/10 text-gray-400 border-gray-500/20";
    }
  };

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium border ${getStatusColor(
        status,
      )}`}
    >
      {status}
    </span>
  );
};

/**
 * Displays sort direction indicator arrow.
 *
 * @component
 * @param {false | 'asc' | 'desc'} isSorted - Current sort state
 */
const SortingArrow = ({ isSorted }: { isSorted: false | "asc" | "desc" }) => {
  if (!isSorted)
    return <div className="inline-flex w-4 h-4 ml-1 flex-shrink-0" />;
  return (
    <div className="inline-flex w-4 h-4 text-mainColor ml-1 flex-shrink-0">
      {isSorted === "desc" ? (
        <ArrowDownIcon width={16} height={16} />
      ) : (
        <ArrowUpIcon width={16} height={16} />
      )}
    </div>
  );
};

/**
 * User management table with column visibility, role filtering, and sorting.
 * Uses TanStack Table with dropdown controls for filtering and sorting.
 *
 * @component
 */
export const UserTable = () => {
  const t = useTranslations("tables.cardTitles");

  const [userSorting, setUserSorting] = React.useState<SortingState>([]);
  const [userColumnVisibility, setUserColumnVisibility] =
    React.useState<VisibilityState>({});
  const [userRoleFilter, setUserRoleFilter] = React.useState<
    string | undefined
  >(undefined);

  const userColumns: ColumnDef<User>[] = [
    {
      accessorKey: "id",
      header: "ID",
      cell: ({ row }) => (
        <span className="font-mono">#{row.getValue("id")}</span>
      ),
    },
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => (
        <span className="text-sm text-secondaryText">
          {row.getValue("email")}
        </span>
      ),
    },
    {
      accessorKey: "role",
      header: "Role",
      cell: ({ row }) => {
        const role = row.getValue("role") as string;
        const getRoleColor = (role: string) => {
          switch (role) {
            case "Admin":
              return "bg-purple-500/10 text-purple-500 border-purple-500/20";
            case "Editor":
              return "bg-blue-500/10 text-blue-500 border-blue-500/20";
            case "Viewer":
              return "bg-gray-500/10 text-gray-400 border-gray-500/20";
            default:
              return "bg-gray-500/10 text-gray-400 border-gray-500/20";
          }
        };
        return (
          <span
            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium border ${getRoleColor(role)}`}
          >
            {role}
          </span>
        );
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => <StatusBadge status={row.getValue("status")} />,
    },
    {
      accessorKey: "joinDate",
      header: "Join Date",
      cell: ({ row }) => {
        const date = new Date(row.getValue("joinDate"));
        return <span className="text-sm">{date.toLocaleDateString()}</span>;
      },
    },
    {
      id: "actions",
      header: "Actions",
      cell: () => (
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            aria-label="View user details"
          >
            <Eye className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            aria-label="Edit user"
          >
            <Edit className="h-4 w-4" />
          </Button>
        </div>
      ),
      enableSorting: false,
    },
  ];

  /** Filters user data by the selected role dropdown value. */
  const filteredUserTableData = React.useMemo(() => {
    let filtered = [...userTableData];

    if (userRoleFilter) {
      filtered = filtered.filter((user) => user.role === userRoleFilter);
    }

    return filtered;
  }, [userRoleFilter]);

  /** TanStack Table instance with sorting and column visibility. */
  const userTable = useReactTable({
    data: filteredUserTableData,
    columns: userColumns,
    state: {
      sorting: userSorting,
      columnVisibility: userColumnVisibility,
    },
    onSortingChange: setUserSorting,
    onColumnVisibilityChange: setUserColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <Card id="userTable">
      <CardHeader variant="divider">
        <CardTitle>{t("filters")}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="py-2">
          {/* Controls Row */}
          <div className="flex justify-between items-center mb-4 max-xsm:gap-4">
            {/* Column Visibility Button - Left */}
            <div className="max-xsm:flex-1">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="h-full py-2 px-4 text-sm max-xsm:w-full"
                  >
                    <Columns className="h-4 w-4 mr-2" />
                    Columns
                  </Button>
                </PopoverTrigger>
                <PopoverContent align="start" className="w-50 p-3">
                  <div className="space-y-2">
                    <div className="text-sm font-medium mb-3">
                      Toggle columns
                    </div>
                    {userTable
                      .getAllLeafColumns()
                      .filter((column) => column.id !== "actions")
                      .map((column) => (
                        <div
                          key={column.id}
                          className="flex items-center space-x-2"
                        >
                          <Checkbox
                            checked={column.getIsVisible()}
                            onCheckedChange={(value) =>
                              column.toggleVisibility(!!value)
                            }
                            id={`user-${column.id}`}
                          />
                          <label
                            htmlFor={`user-${column.id}`}
                            className="text-sm font-normal cursor-pointer flex-1"
                          >
                            {typeof column.columnDef.header === "string"
                              ? column.columnDef.header
                              : column.id}
                          </label>
                        </div>
                      ))}
                  </div>
                </PopoverContent>
              </Popover>
            </div>

            {/* Sort and Filter Controls - Right */}
            <div className="flex gap-4 max-xsm:flex-1">
              {/* Role Filter */}
              <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="h-9.5 py-2 px-4 text-sm gap-2 max-xsm:w-full"
                  >
                    <FilterIcon />
                    Filter by role
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-44" align="end">
                  <DropdownMenuRadioGroup
                    value={userRoleFilter || ""}
                    onValueChange={(value) => setUserRoleFilter(value)}
                  >
                    {["Admin", "Editor", "Viewer"].map((role) => (
                      <DropdownMenuRadioItem key={role} value={role}>
                        {role}
                      </DropdownMenuRadioItem>
                    ))}
                  </DropdownMenuRadioGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => setUserRoleFilter(undefined)}
                  >
                    Clear Filter
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Sort Dropdown */}
              <div className="max-sm:hidden">
                <DropdownMenu modal={false}>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className="h-9.5 py-2 px-4 text-sm gap-2"
                    >
                      <SortIcon />
                      Sort by
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-44" align="end">
                    <DropdownMenuRadioGroup
                      value={userSorting[0]?.id || ""}
                      onValueChange={(value) => {
                        setUserSorting([
                          { id: value, desc: userSorting[0]?.desc || false },
                        ]);
                      }}
                    >
                      {[
                        { value: "name", label: "Name" },
                        { value: "email", label: "Email" },
                        { value: "role", label: "Role" },
                        { value: "joinDate", label: "Join Date" },
                      ].map((option) => (
                        <DropdownMenuRadioItem
                          key={option.value}
                          value={option.value}
                        >
                          {option.label}
                        </DropdownMenuRadioItem>
                      ))}
                    </DropdownMenuRadioGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuRadioGroup
                      value={userSorting[0]?.desc ? "desc" : "asc"}
                      onValueChange={(value) => {
                        if (userSorting[0]) {
                          setUserSorting([
                            { ...userSorting[0], desc: value === "desc" },
                          ]);
                        }
                      }}
                    >
                      <DropdownMenuRadioItem value="asc">
                        Ascending
                      </DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="desc">
                        Descending
                      </DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => setUserSorting([])}>
                      Clear Sorting
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>

          {/* Chips/Badges for active filters and sorting */}
          {(userRoleFilter || userSorting[0]) && (
            <div
              className="flex flex-wrap gap-2"
              style={{ marginBottom: "1.3rem" }}
            >
              {userRoleFilter && (
                <Badge variant="outline" className="cursor-pointer py-1.5 px-3">
                  Role: {userRoleFilter}
                  <button
                    onClick={() => setUserRoleFilter(undefined)}
                    tabIndex={0}
                    className="ml-2"
                    aria-label={`Remove role filter`}
                  >
                    <svg
                      className="w-3 h-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </Badge>
              )}
              {userSorting[0] && (
                <Badge variant="outline" className="cursor-pointer py-1.5 px-3">
                  Sorted by:{" "}
                  {userSorting[0].id === "joinDate"
                    ? "Join Date"
                    : userSorting[0].id.charAt(0).toUpperCase() +
                      userSorting[0].id.slice(1)}
                  <button
                    onClick={() => setUserSorting([])}
                    tabIndex={0}
                    className="ml-2"
                    aria-label={`Remove sorting`}
                  >
                    <svg
                      className="w-3 h-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </Badge>
              )}
            </div>
          )}

          <div
            className="overflow-x-auto"
            style={{
              marginTop: userRoleFilter || userSorting[0] ? "0" : "1.3rem",
            }}
          >
            <table className="w-full min-w-200">
              <caption className="sr-only">Users table</caption>
              <thead>
                {userTable.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header, index) => (
                      <th
                        key={header.id}
                        scope="col"
                        aria-sort={
                          header.column.getIsSorted() === "asc"
                            ? "ascending"
                            : header.column.getIsSorted() === "desc"
                              ? "descending"
                              : undefined
                        }
                        className={`text-secondaryText font-medium text-left text-sm px-4 py-3 whitespace-nowrap border-t border-b border-inputBorder bg-tableHeaderBg ${
                          index === 0 ? "border-l" : ""
                        } ${
                          index === headerGroup.headers.length - 1
                            ? "border-r"
                            : ""
                        } ${header.column.getCanSort() ? "cursor-pointer select-none hover:bg-tableHeaderBgHover" : ""}`}
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        <div className="flex items-center">
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                          <SortingArrow
                            isSorted={header.column.getIsSorted()}
                          />
                        </div>
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody>
                {userTable.getRowModel().rows.map((row) => (
                  <tr key={row.id} className="hover:bg-tableRowBgHover">
                    {row.getVisibleCells().map((cell, cellIndex) => (
                      <td
                        key={cell.id}
                        className={`px-4 py-3 text-primaryText text-sm border-b border-mainBorder ${cellIndex === 0 ? "border-l" : ""} ${cellIndex === row.getVisibleCells().length - 1 ? "border-r" : ""}`}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
