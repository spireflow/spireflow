"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";

import { ArrowDownIcon } from "@/assets/icons/ArrowDownIcon";
import { ArrowUpIcon } from "@/assets/icons/ArrowUpIcon";
import { MailIcon } from "@/assets/icons/MailIcon";
import { PencilIcon } from "@/assets/icons/PencilIcon";
import type { MockUser, UserRole } from "@/store/rbacStore";

import { InlineNameEdit } from "./InlineNameEdit";
import { UserRoleBadge } from "./UserRoleBadge";
import { UserRoleSelect } from "./UserRoleSelect";
import { UserStatusBadge } from "./UserStatusBadge";

interface SortState {
  id: string;
  desc: boolean;
}

interface UserManagementTableProps {
  users: MockUser[];
  isAdmin: boolean;
  sorting: SortState | null;
  onSort: (sort: SortState | null) => void;
  onRoleChange: (userId: string, role: UserRole) => void;
  onNameChange: (userId: string, name: string) => void;
}

const SORTABLE_COLUMNS = ["name", "email", "role", "createdAt"] as const;
type SortableColumn = (typeof SORTABLE_COLUMNS)[number];

const isSortable = (col: string): col is SortableColumn =>
  (SORTABLE_COLUMNS as readonly string[]).includes(col);

const SortingArrow = ({ isSortedDesc }: { isSortedDesc: boolean }) => (
  <span className="inline-flex text-mainColor ml-1">
    {isSortedDesc ? (
      <ArrowUpIcon width={14} height={14} />
    ) : (
      <ArrowDownIcon width={14} height={14} />
    )}
  </span>
);

export const UserManagementTable = ({
  users,
  isAdmin,
  sorting,
  onSort,
  onRoleChange,
  onNameChange,
}: UserManagementTableProps) => {
  const t = useTranslations("userManagement");
  const [editingUserId, setEditingUserId] = useState<string | null>(null);

  const handleSaveName = (userId: string, newName: string) => {
    onNameChange(userId, newName);
    setEditingUserId(null);
  };

  const handleToggleEdit = (userId: string) => {
    setEditingUserId((prev) => (prev === userId ? null : userId));
  };

  const handleHeaderClick = (columnId: string) => {
    if (!isSortable(columnId)) return;

    if (!sorting || sorting.id !== columnId) {
      onSort({ id: columnId, desc: false });
    } else if (!sorting.desc) {
      onSort({ id: columnId, desc: true });
    } else {
      onSort(null);
    }
  };

  const headerDefs: { id: string; label: string }[] = [
    { id: "name", label: t("tableHeader.name") },
    { id: "email", label: t("tableHeader.email") },
    { id: "role", label: t("tableHeader.role") },
    { id: "status", label: t("tableHeader.status") },
    { id: "createdAt", label: t("tableHeader.joined") },
    { id: "actions", label: t("tableHeader.actions") },
  ];

  return (
    <table className="w-full min-w-[1024px] table-fixed">
      <colgroup>
        <col className="w-[22%]" />
        <col className="w-[26%]" />
        <col className="w-[14%]" />
        <col className="w-[12%]" />
        <col className="w-[14%]" />
        <col className="w-[12%]" />
      </colgroup>
      <thead>
        <tr className="border-b border-mainBorder text-left">
          {headerDefs.map((col) => {
            const sortable = isSortable(col.id);
            const isActive = sorting?.id === col.id;

            return (
              <th
                key={col.id}
                className={`py-3 px-4 text-xs font-semibold text-secondaryText uppercase tracking-wider ${
                  sortable
                    ? "cursor-pointer select-none hover:text-primaryText transition-colors"
                    : ""
                } ${col.id === "actions" ? "text-right" : ""}`}
                onClick={sortable ? () => handleHeaderClick(col.id) : undefined}
              >
                {col.label}
                {isActive && <SortingArrow isSortedDesc={sorting.desc} />}
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr
            key={user.id}
            className="border-b border-mainBorder last:border-b-0 hover:bg-tableRowBgHover transition-colors"
          >
            <td className="py-3.5 px-4">
              {isAdmin && editingUserId === user.id ? (
                <InlineNameEdit
                  name={user.name}
                  isEditing
                  onSave={(value) => handleSaveName(user.id, value)}
                  onCancel={() => setEditingUserId(null)}
                />
              ) : (
                <span className="text-sm font-medium text-primaryText block truncate">
                  {user.name}
                </span>
              )}
            </td>
            <td className="py-3.5 px-4">
              <span className="text-sm text-tableCellText block truncate">
                {user.email}
              </span>
            </td>
            <td className="py-3.5 px-4">
              {isAdmin ? (
                <UserRoleSelect
                  currentRole={user.role}
                  onRoleChange={(role) => onRoleChange(user.id, role)}
                />
              ) : (
                <UserRoleBadge role={user.role} />
              )}
            </td>
            <td className="py-3.5 px-4">
              <UserStatusBadge banned={user.banned} />
            </td>
            <td className="py-3.5 px-4">
              <span className="text-sm text-tableCellText">
                {user.createdAt}
              </span>
            </td>
            <td className="py-3.5 px-4 text-right">
              <div className="flex items-center justify-end gap-2">
                <a
                  href={`mailto:${user.email}`}
                  className="inline-flex items-center justify-center w-8 h-8 rounded-md text-grayIcon hover:text-grayIconHover hover:bg-outlinedButtonBgHover transition-colors"
                  aria-label={`Send email to ${user.name}`}
                >
                  <MailIcon />
                </a>
                {isAdmin && (
                  <button
                    onClick={() => handleToggleEdit(user.id)}
                    className={`inline-flex items-center justify-center w-8 h-8 rounded-md transition-colors cursor-pointer ${
                      editingUserId === user.id
                        ? "text-coloredText bg-outlinedButtonBgHover"
                        : "text-grayIcon hover:text-grayIconHover hover:bg-outlinedButtonBgHover"
                    }`}
                    aria-label={
                      editingUserId === user.id
                        ? `Cancel editing ${user.name}`
                        : `Edit ${user.name}`
                    }
                  >
                    <PencilIcon />
                  </button>
                )}
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
