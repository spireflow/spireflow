"use client";

import { useTranslations } from "next-intl";

import type { UserRole } from "@/store/rbacStore";

const ROLE_STYLES: Record<UserRole, string> = {
  admin:
    "bg-roleAdminBadgeBg text-roleAdminBadgeText border-roleAdminBadgeBorder",
  editor:
    "bg-roleEditorBadgeBg text-roleEditorBadgeText border-roleEditorBadgeBorder",
  viewer:
    "bg-roleViewerBadgeBg text-roleViewerBadgeText border-roleViewerBadgeBorder",
};

interface UserRoleBadgeProps {
  role: UserRole;
}

export const UserRoleBadge = ({ role }: UserRoleBadgeProps) => {
  const t = useTranslations("userManagement.role");

  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${ROLE_STYLES[role]}`}
    >
      {t(role)}
    </span>
  );
};
