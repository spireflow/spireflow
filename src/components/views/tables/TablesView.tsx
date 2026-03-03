"use client";

import { AdvancedTable } from "./AdvancedTable";
import { BasicTable } from "./BasicTable";
import { InventoryTable } from "./InventoryTable";
import { UserTable } from "./UserTable";

/**
 * Layout container for the tables demo page.
 * Displays all table variants in a vertical stack.
 *
 * @component
 */
export const TablesView = () => {
  return (
    <div className="flex flex-col gap-6" style={{ rowGap: "1.8rem" }}>
      <h1 className="sr-only">Tables</h1>
      <BasicTable />
      <AdvancedTable />
      <UserTable />
      <InventoryTable />
    </div>
  );
};
