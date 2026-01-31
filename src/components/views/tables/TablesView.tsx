"use client";

import { BasicTable } from "./BasicTable";
import { AdvancedTable } from "./AdvancedTable";
import { UserTable } from "./UserTable";
import { InventoryTable } from "./InventoryTable";

/**
 * Layout container for the tables demo page.
 * Displays all table variants in a vertical stack.
 *
 * @component
 */
export const TablesView = () => {
  return (
    <div className="flex flex-col gap-6" style={{ rowGap: "1.8rem" }}>
      <BasicTable />
      <AdvancedTable />
      <UserTable />
      <InventoryTable />
    </div>
  );
};
