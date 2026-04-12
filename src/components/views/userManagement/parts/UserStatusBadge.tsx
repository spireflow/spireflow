"use client";

import { useTranslations } from "next-intl";

interface UserStatusBadgeProps {
  banned: boolean;
}

export const UserStatusBadge = ({ banned }: UserStatusBadgeProps) => {
  const t = useTranslations("userManagement.status");

  if (banned) {
    return (
      <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-roleBannedBadgeBg text-roleBannedBadgeText border-roleBannedBadgeBorder">
        {t("banned")}
      </span>
    );
  }

  return (
    <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-roleViewerBadgeBg text-roleViewerBadgeText border-roleViewerBadgeBorder">
      {t("active")}
    </span>
  );
};
