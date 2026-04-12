"use client";

import { useTranslations } from "next-intl";
import { useCallback, useMemo, useState } from "react";

import { InfoIcon } from "@/assets/icons/InfoIcon";
import { SearchIcon } from "@/assets/icons/SearchIcon";
import { ShieldIcon } from "@/assets/icons/ShieldIcon";
import { Chip } from "@/components/common/Chip";
import { Button } from "@/components/common/shadcn/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/common/shadcn/input-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/common/shadcn/select";
import { signOut } from "@/services/auth/auth-client";
import type { UserRole } from "@/store/rbacStore";
import { useToastStore } from "@/store/toastStore";

import { SelfDemotionModal } from "./parts/SelfDemotionModal";
import { UserManagementPagination } from "./parts/UserManagementPagination";
import { UserManagementSortDropdown } from "./parts/UserManagementSortDropdown";
import { UserManagementTable } from "./parts/UserManagementTable";
import { useUserManagement } from "./useUserManagement";

type RoleFilter = "all" | UserRole;

interface SortState {
  id: string;
  desc: boolean;
}

export const UserManagementView = () => {
  const t = useTranslations("userManagement");
  const {
    users,
    currentUserId,
    currentUserRole,
    isDemo,
    isLoading,
    isAuthorized,
    setUserRole,
    setUserName,
  } = useUserManagement();
  const showToast = useToastStore((s) => s.showToast);
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState<RoleFilter>("all");
  const [sorting, setSorting] = useState<SortState | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [pendingSelfDemotion, setPendingSelfDemotion] = useState<{
    userId: string;
    role: UserRole;
  } | null>(null);

  const isAdmin = currentUserRole === "admin";

  const sortOptions = useMemo(
    () => [
      { value: "name", label: t("tableHeader.name") },
      { value: "email", label: t("tableHeader.email") },
      { value: "role", label: t("tableHeader.role") },
      { value: "createdAt", label: t("tableHeader.joined") },
    ],
    [t],
  );

  const filteredAndSortedUsers = useMemo(() => {
    let result = users.filter((user) => {
      const matchesSearch =
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesRole = roleFilter === "all" || user.role === roleFilter;

      return matchesSearch && matchesRole;
    });

    if (sorting) {
      const { id, desc } = sorting;
      result = [...result].sort((a, b) => {
        const aVal = a[id as keyof typeof a];
        const bVal = b[id as keyof typeof b];
        const cmp = String(aVal).localeCompare(String(bVal));
        return desc ? -cmp : cmp;
      });
    }

    return result;
  }, [users, searchQuery, roleFilter, sorting]);

  const totalPages = Math.ceil(filteredAndSortedUsers.length / itemsPerPage);

  const paginatedUsers = useMemo(() => {
    const start = currentPage * itemsPerPage;
    return filteredAndSortedUsers.slice(start, start + itemsPerPage);
  }, [filteredAndSortedUsers, currentPage, itemsPerPage]);

  const nextPage = () => setCurrentPage((prev) => prev + 1);
  const prevPage = () => setCurrentPage((prev) => prev - 1);
  const goToPage = (page: number) => setCurrentPage(page);

  const hasActiveFilters =
    searchQuery !== "" || roleFilter !== "all" || sorting !== null;

  const clearFilters = () => {
    setSearchQuery("");
    setRoleFilter("all");
    setSorting(null);
    setCurrentPage(0);
  };

  const executeRoleChange = useCallback(
    async (userId: string, role: UserRole) => {
      const user = users.find((u) => u.id === userId);
      if (!user) return;

      const ok = await setUserRole(userId, role);
      showToast(
        ok ? "success" : "destructive",
        ok ? t("toast.roleUpdated") : t("toast.error"),
        ok
          ? t("toast.roleUpdatedDesc", { name: user.name, role })
          : t("toast.permissionDenied"),
      );
      return ok;
    },
    [users, setUserRole, showToast, t],
  );

  const handleRoleChange = async (userId: string, role: UserRole) => {
    const isSelf = !isDemo && currentUserId === userId;
    const isDemotion = isSelf && role !== "admin";

    if (isDemotion) {
      setPendingSelfDemotion({ userId, role });
      return;
    }

    await executeRoleChange(userId, role);
  };

  const handleConfirmSelfDemotion = async () => {
    if (!pendingSelfDemotion) return;
    const ok = await executeRoleChange(
      pendingSelfDemotion.userId,
      pendingSelfDemotion.role,
    );
    setPendingSelfDemotion(null);
    if (ok) {
      await signOut?.();
      window.location.href = "/login";
    }
  };

  const handleNameChange = async (userId: string, name: string) => {
    const ok = await setUserName(userId, name);
    showToast(
      ok ? "success" : "destructive",
      ok ? t("toast.nameUpdated") : t("toast.error"),
      ok ? t("toast.nameUpdatedDesc", { name }) : t("toast.permissionDenied"),
    );
  };

  if (!isAuthorized) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] -mt-8 gap-4 text-center w-full">
        <div className="text-secondaryText opacity-25 [&_svg]:w-11 [&_svg]:h-11">
          <ShieldIcon />
        </div>
        <h2 className="text-3xl font-bold text-primaryText">
          {t("accessDenied")}
        </h2>
        <p className="text-base text-secondaryText max-w-sm">
          {t("accessDeniedHint")}
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full h-full">
      <h1 className="sr-only">{t("title")}</h1>

      <div className="flex justify-between flex-wrap md:flex-nowrap gap-4 mb-2">
        <div className="w-full md:w-1/4 h-[2.6rem]">
          <InputGroup className="h-full">
            <InputGroupInput
              type="text"
              className="!h-[2.6rem]"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(0);
              }}
              placeholder={t("searchPlaceholder")}
            />
            <InputGroupAddon>
              <SearchIcon />
            </InputGroupAddon>
          </InputGroup>
        </div>
        <div className="flex gap-3 items-center h-[2.6rem] w-full md:w-auto">
          <Select
            value={roleFilter}
            onValueChange={(v) => {
              setRoleFilter(v as RoleFilter);
              setCurrentPage(0);
            }}
          >
            <SelectTrigger className="w-[calc(50%-0.375rem)] md:w-36 h-[2.6rem]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t("filter.allRoles")}</SelectItem>
              <SelectItem value="admin">{t("role.admin")}</SelectItem>
              <SelectItem value="editor">{t("role.editor")}</SelectItem>
              <SelectItem value="viewer">{t("role.viewer")}</SelectItem>
            </SelectContent>
          </Select>
          <div className="w-[calc(50%-0.375rem)] md:w-auto h-full">
            <UserManagementSortDropdown
              options={sortOptions}
              currentSort={sorting?.id ?? null}
              currentDirection={sorting?.desc ?? false}
              onSortChange={(sort) => {
                setSorting(sort);
                setCurrentPage(0);
              }}
            />
          </div>
        </div>
      </div>

      <div
        className={`flex flex-wrap items-start gap-2 ${
          (roleFilter !== "all" || sorting) && "mt-4"
        }`}
      >
        {roleFilter !== "all" && (
          <Chip
            label={`${t("chip.role")}: ${t(`role.${roleFilter}`)}`}
            onDelete={() => {
              setRoleFilter("all");
              setCurrentPage(0);
            }}
          />
        )}
        {sorting && (
          <Chip
            label={`${t("chip.sortedBy")}: ${
              sortOptions.find((o) => o.value === sorting.id)?.label ??
              sorting.id
            } ${sorting.desc ? t("button.descending") : t("button.ascending")}`}
            onDelete={() => {
              setSorting(null);
              setCurrentPage(0);
            }}
          />
        )}
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <p className="text-sm text-secondaryText">{t("loading")}</p>
        </div>
      ) : filteredAndSortedUsers.length === 0 ? (
        <div className="flex items-center justify-center py-20">
          <p className="text-sm text-secondaryText">{t("emptyState")}</p>
        </div>
      ) : (
        <>
          <div className="w-full overflow-auto mt-5">
            <UserManagementTable
              users={paginatedUsers}
              isAdmin={isAdmin}
              sorting={sorting}
              onSort={(sort) => {
                setSorting(sort);
                setCurrentPage(0);
              }}
              onRoleChange={handleRoleChange}
              onNameChange={handleNameChange}
            />
          </div>
          <div className="flex flex-col sm:flex-row justify-between items-center flex-wrap pb-4">
            <div className="mt-8 sm:mb-0 flex h-10 3xl:h-11">
              <Button
                variant="outline"
                onClick={clearFilters}
                disabled={!hasActiveFilters}
                className="!h-full px-6"
              >
                {t("button.clearFilters")}
              </Button>
            </div>
            <UserManagementPagination
              itemsPerPage={itemsPerPage}
              currentPage={currentPage}
              totalPage={totalPages}
              setItemsPerPage={setItemsPerPage}
              goToPage={goToPage}
              prevPage={prevPage}
              nextPage={nextPage}
            />
          </div>
        </>
      )}

      {isDemo && (
        <div className="flex items-center gap-3 px-5 py-3.5 mt-8 rounded-lg border border-roleDemoBannerBorder bg-mutedBg">
          <InfoIcon />
          <p className="text-xs text-roleDemoBannerText">{t("demoBanner")}</p>
        </div>
      )}

      <SelfDemotionModal
        open={pendingSelfDemotion !== null}
        onConfirm={handleConfirmSelfDemotion}
        onCancel={() => setPendingSelfDemotion(null)}
      />
    </div>
  );
};
