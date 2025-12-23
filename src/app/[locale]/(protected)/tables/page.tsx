"use client";

import * as React from "react";
import { PageWrapper } from "../../../../components/common/PageWrapper";
import { Card } from "../../../../components/common/Card";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
  ColumnDef,
  SortingState,
  ColumnFiltersState,
  PaginationState,
  VisibilityState,
} from "@tanstack/react-table";
import { Input } from "../../../../components/shadcn/input";
import { Button } from "../../../../components/shadcn/button";
import { Checkbox } from "../../../../components/shadcn/checkbox";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../../../components/shadcn/popover";
import { ArrowUpIcon } from "../../../../assets/icons/ArrowUpIcon";
import { ArrowDownIcon } from "../../../../assets/icons/ArrowDownIcon";
import { FilterIcon } from "../../../../assets/icons/FilterIcon";
import { SortIcon } from "../../../../assets/icons/SortIcon";
import { CheckIcon } from "../../../../assets/icons/CheckIcon";
import {
  Edit,
  Trash2,
  Eye,
  Search,
  Columns,
  Filter,
  ArrowUpDown,
} from "lucide-react";
import { Badge } from "../../../../components/shadcn/badge";
import { Dropdown } from "../../../../components/common/Dropdown";
import { useDropdown } from "../../../../hooks/useDropdown";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from "../../../../components/shadcn/pagination";

// Types for Basic Table
type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: string;
};

// Types for Search Table
type Transaction = {
  id: string;
  customer: string;
  email: string;
  product: string;
  amount: number;
  status: "completed" | "pending" | "failed";
  date: string;
};

// Types for User Table
type User = {
  id: number;
  name: string;
  email: string;
  role: string;
  status: "active" | "inactive";
  joinDate: string;
};

// Types for Inventory Table
type InventoryItem = {
  id: string;
  sku: string;
  name: string;
  quantity: number;
  reorderPoint: number;
  supplier: string;
};

// Mock Data for Basic Table
const basicTableData: Product[] = [
  {
    id: 1,
    name: "Wireless Mouse",
    category: "Electronics",
    price: 29.99,
    stock: 150,
    status: "In Stock",
  },
  {
    id: 2,
    name: "Mechanical Keyboard",
    category: "Electronics",
    price: 89.99,
    stock: 75,
    status: "In Stock",
  },
  {
    id: 3,
    name: "USB-C Cable",
    category: "Accessories",
    price: 12.99,
    stock: 0,
    status: "Out of Stock",
  },
  {
    id: 4,
    name: "Laptop Stand",
    category: "Accessories",
    price: 45.99,
    stock: 32,
    status: "In Stock",
  },
  {
    id: 5,
    name: "Webcam HD",
    category: "Electronics",
    price: 69.99,
    stock: 18,
    status: "Low Stock",
  },
  {
    id: 6,
    name: "Desk Lamp",
    category: "Office",
    price: 34.99,
    stock: 90,
    status: "In Stock",
  },
  {
    id: 7,
    name: 'Monitor 27"',
    category: "Electronics",
    price: 299.99,
    stock: 12,
    status: "Low Stock",
  },
  {
    id: 8,
    name: "Ergonomic Chair",
    category: "Furniture",
    price: 199.99,
    stock: 8,
    status: "Low Stock",
  },
];

// Mock Data for Advanced Table
const advancedTableData: Transaction[] = [
  {
    id: "TXN001",
    customer: "John Doe",
    email: "john@example.com",
    product: "Laptop Pro",
    amount: 1299.99,
    status: "completed",
    date: "2024-01-15",
  },
  {
    id: "TXN002",
    customer: "Jane Smith",
    email: "jane@example.com",
    product: "Wireless Mouse",
    amount: 29.99,
    status: "completed",
    date: "2024-01-16",
  },
  {
    id: "TXN003",
    customer: "Bob Johnson",
    email: "bob@example.com",
    product: "Mechanical Keyboard",
    amount: 89.99,
    status: "pending",
    date: "2024-01-17",
  },
  {
    id: "TXN004",
    customer: "Alice Brown",
    email: "alice@example.com",
    product: "Monitor 4K",
    amount: 499.99,
    status: "completed",
    date: "2024-01-18",
  },
  {
    id: "TXN005",
    customer: "Charlie Wilson",
    email: "charlie@example.com",
    product: "USB-C Hub",
    amount: 45.99,
    status: "failed",
    date: "2024-01-19",
  },
  {
    id: "TXN006",
    customer: "Diana Martinez",
    email: "diana@example.com",
    product: "Webcam HD",
    amount: 69.99,
    status: "completed",
    date: "2024-01-20",
  },
  {
    id: "TXN007",
    customer: "Eva Garcia",
    email: "eva@example.com",
    product: "Desk Lamp",
    amount: 34.99,
    status: "pending",
    date: "2024-01-21",
  },
  {
    id: "TXN008",
    customer: "Frank Lee",
    email: "frank@example.com",
    product: "Ergonomic Chair",
    amount: 199.99,
    status: "completed",
    date: "2024-01-22",
  },
  {
    id: "TXN009",
    customer: "Grace Kim",
    email: "grace@example.com",
    product: "Laptop Stand",
    amount: 45.99,
    status: "completed",
    date: "2024-01-23",
  },
  {
    id: "TXN010",
    customer: "Henry Chen",
    email: "henry@example.com",
    product: "Portable SSD",
    amount: 129.99,
    status: "pending",
    date: "2024-01-24",
  },
];

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

// Mock Data for Inventory Table
const inventoryTableData: InventoryItem[] = [
  {
    id: "INV001",
    sku: "WM-2024-001",
    name: "Wireless Mouse Pro",
    quantity: 145,
    reorderPoint: 50,
    supplier: "TechSupply Co",
  },
  {
    id: "INV002",
    sku: "KB-2024-002",
    name: "Mechanical Keyboard RGB",
    quantity: 23,
    reorderPoint: 30,
    supplier: "KeyMaster Inc",
  },
  {
    id: "INV003",
    sku: "MON-2024-003",
    name: '27" 4K Monitor',
    quantity: 8,
    reorderPoint: 15,
    supplier: "DisplayPro Ltd",
  },
  {
    id: "INV004",
    sku: "CAB-2024-004",
    name: "USB-C Cable 2m",
    quantity: 320,
    reorderPoint: 100,
    supplier: "CableWorks",
  },
  {
    id: "INV005",
    sku: "WEB-2024-005",
    name: "HD Webcam",
    quantity: 12,
    reorderPoint: 20,
    supplier: "VisionTech",
  },
  {
    id: "INV006",
    sku: "LAP-2024-006",
    name: "Laptop Stand Aluminum",
    quantity: 67,
    reorderPoint: 25,
    supplier: "ErgoSupplies",
  },
  {
    id: "INV007",
    sku: "HEA-2024-007",
    name: "Wireless Headphones",
    quantity: 54,
    reorderPoint: 40,
    supplier: "AudioTech",
  },
  {
    id: "INV008",
    sku: "MIC-2024-008",
    name: "USB Microphone",
    quantity: 18,
    reorderPoint: 25,
    supplier: "SoundPro",
  },
  {
    id: "INV009",
    sku: "DOC-2024-009",
    name: "Docking Station",
    quantity: 31,
    reorderPoint: 20,
    supplier: "ConnectHub",
  },
  {
    id: "INV010",
    sku: "SSD-2024-010",
    name: "External SSD 1TB",
    quantity: 89,
    reorderPoint: 35,
    supplier: "StorageMax",
  },
  {
    id: "INV011",
    sku: "CHR-2024-011",
    name: "Wireless Charger",
    quantity: 156,
    reorderPoint: 60,
    supplier: "ChargeTech",
  },
  {
    id: "INV012",
    sku: "HUB-2024-012",
    name: "USB-C Hub 7-Port",
    quantity: 14,
    reorderPoint: 30,
    supplier: "PortExpand",
  },
  {
    id: "INV013",
    sku: "SPK-2024-013",
    name: "Bluetooth Speaker",
    quantity: 92,
    reorderPoint: 45,
    supplier: "SoundWave",
  },
  {
    id: "INV014",
    sku: "CAM-2024-014",
    name: "Security Camera",
    quantity: 37,
    reorderPoint: 20,
    supplier: "SecureTech",
  },
  {
    id: "INV015",
    sku: "TAB-2024-015",
    name: "Graphics Tablet",
    quantity: 15,
    reorderPoint: 25,
    supplier: "ArtSupply",
  },
  {
    id: "INV016",
    sku: "PRT-2024-016",
    name: "Wireless Printer",
    quantity: 28,
    reorderPoint: 15,
    supplier: "PrintMaster",
  },
  {
    id: "INV017",
    sku: "RTR-2024-017",
    name: "WiFi Router Mesh",
    quantity: 63,
    reorderPoint: 30,
    supplier: "NetGear Pro",
  },
  {
    id: "INV018",
    sku: "BAT-2024-018",
    name: "Power Bank 20000mAh",
    quantity: 184,
    reorderPoint: 80,
    supplier: "PowerCell",
  },
  {
    id: "INV019",
    sku: "MNT-2024-019",
    name: "Monitor Arm Dual",
    quantity: 41,
    reorderPoint: 20,
    supplier: "ErgoStand",
  },
  {
    id: "INV020",
    sku: "KEY-2024-020",
    name: "Numeric Keypad",
    quantity: 112,
    reorderPoint: 50,
    supplier: "KeyMaster Inc",
  },
  {
    id: "INV021",
    sku: "PAD-2024-021",
    name: "Mouse Pad XL",
    quantity: 267,
    reorderPoint: 100,
    supplier: "DeskMate",
  },
  {
    id: "INV022",
    sku: "LGT-2024-022",
    name: "LED Desk Light",
    quantity: 58,
    reorderPoint: 35,
    supplier: "BrightLux",
  },
  {
    id: "INV023",
    sku: "FAN-2024-023",
    name: "USB Desk Fan",
    quantity: 19,
    reorderPoint: 30,
    supplier: "CoolBreeze",
  },
  {
    id: "INV024",
    sku: "CLN-2024-024",
    name: "Screen Cleaning Kit",
    quantity: 143,
    reorderPoint: 60,
    supplier: "CleanTech",
  },
];

const TablesPage = () => {
  // Basic Table State
  const [basicSorting, setBasicSorting] = React.useState<SortingState>([]);

  // Advanced Table State
  const [advancedSorting, setAdvancedSorting] = React.useState<SortingState>(
    []
  );
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [rowSelection, setRowSelection] = React.useState({});
  const [globalFilter, setGlobalFilter] = React.useState("");

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

  // Inventory Table State (with Pagination)
  const [inventorySorting, setInventorySorting] = React.useState<SortingState>(
    []
  );
  const [inventoryPagination, setInventoryPagination] =
    React.useState<PaginationState>({
      pageIndex: 0,
      pageSize: 8,
    });

  // Status Badge Component
  const StatusBadge = ({ status }: { status: string }) => {
    const getStatusColor = (status: string) => {
      switch (status.toLowerCase()) {
        case "completed":
        case "in stock":
          return "bg-green-500/10 text-green-500 border-green-500/20";
        case "pending":
        case "low stock":
          return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20";
        case "failed":
        case "out of stock":
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

  // Basic Table Columns
  const basicColumns: ColumnDef<Product>[] = [
    {
      accessorKey: "id",
      header: "ID",
      cell: ({ row }) => (
        <span className="font-mono">#{row.getValue("id")}</span>
      ),
    },
    {
      accessorKey: "name",
      header: "Product Name",
    },
    {
      accessorKey: "category",
      header: "Category",
    },
    {
      accessorKey: "price",
      header: "Price",
      cell: ({ row }) => {
        const price = parseFloat(row.getValue("price"));
        return <span>${price.toFixed(2)}</span>;
      },
    },
    {
      accessorKey: "stock",
      header: "Stock",
      cell: ({ row }) => (
        <span className="font-medium">{row.getValue("stock")}</span>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => <StatusBadge status={row.getValue("status")} />,
    },
  ];

  // Advanced Table Columns
  const advancedColumns: ColumnDef<Transaction>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
    },
    {
      accessorKey: "id",
      header: "Transaction ID",
      cell: ({ row }) => (
        <span className="font-mono text-sm">{row.getValue("id")}</span>
      ),
    },
    {
      accessorKey: "customer",
      header: "Customer",
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
      accessorKey: "product",
      header: "Product",
    },
    {
      accessorKey: "amount",
      header: "Amount",
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue("amount"));
        return <span className="font-medium">${amount.toFixed(2)}</span>;
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => <StatusBadge status={row.getValue("status")} />,
    },
    {
      accessorKey: "date",
      header: "Date",
      cell: ({ row }) => {
        const date = new Date(row.getValue("date"));
        return <span className="text-sm">{date.toLocaleDateString()}</span>;
      },
    },
    {
      id: "actions",
      header: "Actions",
      cell: () => (
        <div className="flex gap-2">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-red-500 hover:text-red-600"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ),
      enableSorting: false,
    },
  ];

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

  // Inventory Table Columns
  const inventoryColumns: ColumnDef<InventoryItem>[] = [
    {
      accessorKey: "id",
      header: "Inventory ID",
      cell: ({ row }) => (
        <span className="font-mono text-sm">{row.getValue("id")}</span>
      ),
    },
    {
      accessorKey: "sku",
      header: "SKU",
      cell: ({ row }) => (
        <span className="font-mono text-xs">{row.getValue("sku")}</span>
      ),
    },
    {
      accessorKey: "name",
      header: "Product Name",
    },
    {
      accessorKey: "quantity",
      header: "Quantity",
      cell: ({ row }) => {
        const quantity = row.getValue("quantity") as number;
        const reorderPoint = row.original.reorderPoint;
        const isLow = quantity < reorderPoint;
        return (
          <span
            className={`font-medium ${isLow ? "text-red-500" : "text-green-500"}`}
          >
            {quantity}
          </span>
        );
      },
    },
    {
      accessorKey: "reorderPoint",
      header: "Reorder Point",
      cell: ({ row }) => (
        <span className="text-sm text-secondaryText">
          {row.getValue("reorderPoint")}
        </span>
      ),
    },
    {
      accessorKey: "supplier",
      header: "Supplier",
    },
    {
      id: "actions",
      header: "Actions",
      cell: () => (
        <div className="flex gap-2">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Search className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Edit className="h-4 w-4" />
          </Button>
        </div>
      ),
      enableSorting: false,
    },
  ];

  // Basic Table Instance
  const basicTable = useReactTable({
    data: basicTableData,
    columns: basicColumns,
    state: {
      sorting: basicSorting,
    },
    onSortingChange: setBasicSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  // Advanced Table Instance
  const advancedTable = useReactTable({
    data: advancedTableData,
    columns: advancedColumns,
    state: {
      sorting: advancedSorting,
      columnFilters,
      rowSelection,
      globalFilter,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setAdvancedSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

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

  // Inventory Table Instance (with Pagination)
  const inventoryTable = useReactTable({
    data: inventoryTableData,
    columns: inventoryColumns,
    state: {
      sorting: inventorySorting,
      pagination: inventoryPagination,
    },
    onSortingChange: setInventorySorting,
    onPaginationChange: setInventoryPagination,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const SortingArrow = ({ isSorted }: { isSorted: false | "asc" | "desc" }) => {
    if (!isSorted) return <div className="inline-flex w-4 h-4 ml-1 flex-shrink-0" />;
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

  return (
    <PageWrapper pageName="Tables" hidePaper>
      <div className="flex flex-col gap-6" style={{ rowGap: "1.8rem" }}>
        {/* Basic Table */}
        <Card isHeaderDividerVisible addTitleMargin title="Basic Table">
          <div className="overflow-x-auto px-[0.8rem] py-2">
            <table className="w-full">
              <thead>
                {basicTable.getHeaderGroups().map((headerGroup) => (
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
                {basicTable.getRowModel().rows.map((row) => (
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
        </Card>

        {/* Advanced Table */}
        <Card
          isHeaderDividerVisible
          addTitleMargin
          title="Table with search & selection"
        >
          <div className="px-[0.8rem] py-2">
            {/* Search and Info */}
            <div
              className="flex items-center justify-between"
              style={{ marginBottom: "1.3rem" }}
            >
              <div className="flex items-center gap-2">
                <Input
                  placeholder="Search..."
                  value={globalFilter ?? ""}
                  onChange={(event) => setGlobalFilter(event.target.value)}
                  className="w-64 flex-shrink-0"
                />
                {Object.keys(rowSelection).length > 0 && (
                  <span className="text-sm text-secondaryText whitespace-nowrap">
                    {Object.keys(rowSelection).length} of{" "}
                    {advancedTable.getFilteredRowModel().rows.length} row(s)
                    selected
                  </span>
                )}
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  {advancedTable.getHeaderGroups().map((headerGroup) => (
                    <tr key={headerGroup.id}>
                      {headerGroup.headers.map((header, index) => (
                        <th
                          key={header.id}
                          className={`text-secondaryText font-medium text-left text-sm px-4 py-3 bg-tableHeaderBg border-t border-b border-inputBorder ${
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
                  {advancedTable.getRowModel().rows.map((row) => (
                    <tr
                      key={row.id}
                      className={
                        row.getIsSelected()
                          ? "bg-tableRowBgHover"
                          : "hover:bg-tableRowBgHover"
                      }
                    >
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

        {/* User Table */}
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
                    <Button
                      variant="outline"
                      className="h-full py-2 px-4 text-sm"
                    >
                      <Columns className="h-4 w-4 mr-2" />
                      Columns
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent align="start" className="w-[200px] p-3">
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
              <div className="flex gap-4">
                {/* Role Filter */}
                <div
                  className="relative inline-block"
                  ref={roleFilterDropdown.ref}
                >
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
                            setUserSorting([
                              { ...userSorting[0], desc: false },
                            ]);
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
                  <Badge
                    variant="outline"
                    className="cursor-pointer py-1.5 px-3"
                  >
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
                  <Badge
                    variant="outline"
                    className="cursor-pointer py-1.5 px-3"
                  >
                    Sorted by: {userSorting[0].id.charAt(0).toUpperCase() + userSorting[0].id.slice(1)}
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

        {/* Inventory Table */}
        <Card
          isHeaderDividerVisible
          addTitleMargin
          title="Table with pagination"
        >
          <div className="px-[0.8rem] py-2">
            <div className="overflow-x-auto">
              <table className="w-full" style={{ tableLayout: "fixed" }}>
                <thead>
                  {inventoryTable.getHeaderGroups().map((headerGroup) => (
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
                  {inventoryTable.getRowModel().rows.map((row) => (
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

            {/* Pagination Controls */}
            <div className="flex items-center justify-between" style={{ marginTop: "2rem" }}>
              <div className="text-sm text-secondaryText whitespace-nowrap">
                Showing{" "}
                {inventoryTable.getState().pagination.pageIndex *
                  inventoryTable.getState().pagination.pageSize +
                  1}{" "}
                to{" "}
                {Math.min(
                  (inventoryTable.getState().pagination.pageIndex + 1) *
                    inventoryTable.getState().pagination.pageSize,
                  inventoryTableData.length
                )}{" "}
                of {inventoryTableData.length} results
              </div>
              <Pagination className="m-0 justify-end">
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => inventoryTable.previousPage()}
                      disabled={!inventoryTable.getCanPreviousPage()}
                    />
                  </PaginationItem>
                  {Array.from({ length: inventoryTable.getPageCount() }, (_, i) => i).map((pageIndex) => {
                    const currentPage = inventoryTable.getState().pagination.pageIndex;
                    const totalPages = inventoryTable.getPageCount();

                    // Show first page, last page, current page, and pages around current
                    if (
                      pageIndex === 0 ||
                      pageIndex === totalPages - 1 ||
                      (pageIndex >= currentPage - 1 && pageIndex <= currentPage + 1)
                    ) {
                      return (
                        <PaginationItem key={pageIndex}>
                          <PaginationLink
                            onClick={() => inventoryTable.setPageIndex(pageIndex)}
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
                      onClick={() => inventoryTable.nextPage()}
                      disabled={!inventoryTable.getCanNextPage()}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </div>
        </Card>
      </div>
    </PageWrapper>
  );
};

export default TablesPage;
