"use client";

import * as React from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
  ColumnDef,
  SortingState,
  VisibilityState,
} from "@tanstack/react-table";
import { Edit, Eye, Columns } from "lucide-react";

import { Card } from "../../common/Card";
import { Button } from "../../shadcn/button";
import { Checkbox } from "../../shadcn/checkbox";
import { Popover, PopoverContent, PopoverTrigger } from "../../shadcn/popover";
import { ArrowUpIcon } from "../../../assets/icons/ArrowUpIcon";
import { ArrowDownIcon } from "../../../assets/icons/ArrowDownIcon";
import { FilterIcon } from "../../../assets/icons/FilterIcon";
import { SortIcon } from "../../../assets/icons/SortIcon";
import { CheckIcon } from "../../../assets/icons/CheckIcon";
import { Badge } from "../../shadcn/badge";
import { Dropdown } from "../../common/Dropdown";
import { useDropdown } from "../../../hooks/useDropdown";

// Types for User Table
type User = {
  id: number;
  name: string;
  email: string;
  role: string;
  status: "active" | "inactive";
  joinDate: string;
};

// Mock Data for User Table
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

// Status Badge Component
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
        status
      )}`}
    >
      {status}
    </span>
  );
};

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

export const UserTable = () => {
  // User Table State (with Column Visibility)
  const [userSorting, setUserSorting] = React.useState<SortingState>([]);
  const [userColumnVisibility, setUserColumnVisibility] =
    React.useState<VisibilityState>({});
  const [userRoleFilter, setUserRoleFilter] = React.useState<
    string | undefined
  >(undefined);

  // Dropdown hooks for User Table
  const sortDropdown = useDropdown();
  const roleFilterDropdown = useDropdown();

  // User Table Columns
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
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Eye className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Edit className="h-4 w-4" />
          </Button>
        </div>
      ),
      enableSorting: false,
    },
  ];

  // Filter user table data based on role filter
  const filteredUserTableData = React.useMemo(() => {
    let filtered = [...userTableData];

    if (userRoleFilter) {
      filtered = filtered.filter((user) => user.role === userRoleFilter);
    }

    return filtered;
  }, [userRoleFilter]);

  // User Table Instance (with Column Visibility)
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
    <Card
      isHeaderDividerVisible
      addTitleMargin
      title="Table with filtering, chips and columns toggle"
    >
      <div className="px-[0.8rem] py-2">
        {/* Controls Row */}
        <div className="flex justify-between items-center mb-4">
          {/* Column Visibility Button - Left */}
          <div>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="h-full py-2 px-4 text-sm">
                  <Columns className="h-4 w-4 mr-2" />
                  Columns
                </Button>
              </PopoverTrigger>
              <PopoverContent align="start" className="w-[200px] p-3">
                <div className="space-y-2">
                  <div className="text-sm font-medium mb-3">Toggle columns</div>
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
          <div className="flex gap-4">
            {/* Role Filter */}
            <div className="relative inline-block" ref={roleFilterDropdown.ref}>
              <Button
                variant="outline"
                className="h-[38px] py-2 px-4 text-sm"
                onClick={roleFilterDropdown.toggle}
              >
                <div className="mr-2">
                  <FilterIcon />
                </div>
                Filter by role
              </Button>
              {roleFilterDropdown.isOpen && (
                <Dropdown className="right-0 w-[12rem] top-[3.3rem]">
                  {["Admin", "Editor", "Viewer"].map((role) => (
                    <div
                      key={role}
                      className={`flex text-sm justify-between items-center cursor-pointer px-4 hover:bg-dropdownBgHover py-2 h-9 ${
                        userRoleFilter === role && "bg-dropdownBgHover"
                      }`}
                      onClick={() => {
                        setUserRoleFilter(role);
                        roleFilterDropdown.close();
                      }}
                    >
                      {role}
                      {userRoleFilter === role && (
                        <div className="text-secondaryText flex items-center">
                          <CheckIcon />
                        </div>
                      )}
                    </div>
                  ))}
                  <div
                    className="px-4 py-2 text-sm cursor-pointer hover:bg-dropdownBgHover border-t border-mainBorder"
                    onClick={() => {
                      setUserRoleFilter(undefined);
                      roleFilterDropdown.close();
                    }}
                  >
                    Clear Filter
                  </div>
                </Dropdown>
              )}
            </div>

            {/* Sort Dropdown */}
            <div className="relative inline-block" ref={sortDropdown.ref}>
              <Button
                variant="outline"
                className="h-[38px] py-2 px-4 text-sm"
                onClick={sortDropdown.toggle}
              >
                <div className="mr-2">
                  <SortIcon />
                </div>
                Sort by
              </Button>
              {sortDropdown.isOpen && (
                <Dropdown className="right-0 top-[3.3rem] min-w-[12.5rem]">
                  {[
                    { value: "name", label: "Name" },
                    { value: "email", label: "Email" },
                    { value: "role", label: "Role" },
                    { value: "joinDate", label: "Join Date" },
                  ].map((option) => (
                    <div
                      key={option.value}
                      className={`flex text-sm justify-between items-center cursor-pointer px-4 hover:bg-dropdownBgHover py-2 h-9 ${
                        userSorting[0]?.id === option.value &&
                        "bg-dropdownBgHover"
                      }`}
                      onClick={() => {
                        setUserSorting([
                          {
                            id: option.value,
                            desc: userSorting[0]?.desc || false,
                          },
                        ]);
                        sortDropdown.close();
                      }}
                    >
                      {option.label}
                      {userSorting[0]?.id === option.value && (
                        <div className="text-secondaryText flex items-center">
                          <CheckIcon />
                        </div>
                      )}
                    </div>
                  ))}
                  <div
                    className="flex text-sm justify-between items-center px-4 py-2 h-9 hover:bg-dropdownBgHover cursor-pointer border-t border-mainBorder"
                    onClick={() => {
                      if (userSorting[0]) {
                        setUserSorting([{ ...userSorting[0], desc: false }]);
                      }
                      sortDropdown.close();
                    }}
                  >
                    Ascending
                    {userSorting[0] && !userSorting[0].desc && (
                      <div className="text-secondaryText flex items-center">
                        <CheckIcon />
                      </div>
                    )}
                  </div>
                  <div
                    className="flex text-sm justify-between items-center px-4 py-2 h-9 hover:bg-dropdownBgHover cursor-pointer"
                    onClick={() => {
                      if (userSorting[0]) {
                        setUserSorting([{ ...userSorting[0], desc: true }]);
                      }
                      sortDropdown.close();
                    }}
                  >
                    Descending
                    {userSorting[0] && userSorting[0].desc && (
                      <div className="text-secondaryText flex items-center">
                        <CheckIcon />
                      </div>
                    )}
                  </div>
                  <div
                    className="text-sm px-4 py-2 hover:bg-dropdownBgHover cursor-pointer"
                    onClick={() => {
                      setUserSorting([]);
                      sortDropdown.close();
                    }}
                  >
                    Clear Sorting
                  </div>
                </Dropdown>
              )}
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
          <table className="w-full">
            <thead>
              {userTable.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header, index) => (
                    <th
                      key={header.id}
                      className={`text-secondaryText font-medium text-left text-sm px-4 py-3 border-t border-b border-inputBorder bg-tableHeaderBg ${
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
                          header.getContext()
                        )}
                        <SortingArrow isSorted={header.column.getIsSorted()} />
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
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Card>
  );
};
