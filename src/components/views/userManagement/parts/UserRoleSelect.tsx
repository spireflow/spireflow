"use client";

import { useTranslations } from "next-intl";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/common/shadcn/select";
import type { UserRole } from "@/store/rbacStore";

interface UserRoleSelectProps {
  currentRole: UserRole;
  onRoleChange: (role: UserRole) => void;
  disabled?: boolean;
}

const ROLE_VALUES: UserRole[] = ["admin", "editor", "viewer"];

export const UserRoleSelect = ({
  currentRole,
  onRoleChange,
  disabled = false,
}: UserRoleSelectProps) => {
  const t = useTranslations("userManagement.role");

  return (
    <Select
      value={currentRole}
      onValueChange={(value) => onRoleChange(value as UserRole)}
      disabled={disabled}
    >
      <SelectTrigger className="w-28 h-8 text-xs">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {ROLE_VALUES.map((role) => (
          <SelectItem key={role} value={role}>
            {t(role)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
