"use client";

import { useCallback, useEffect, useState } from "react";

import { useSession } from "@/services/auth/auth-client";
import type { MockUser, UserRole } from "@/store/rbacStore";
import { useRbacStore } from "@/store/rbacStore";
import { isPresentationModeClient } from "@/utils/presentationMode";

interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: string;
  banned: boolean;
  banReason: string | null;
  banExpires: string | null;
  createdAt: string | Date;
}

const toMockUser = (u: AdminUser): MockUser => {
  let dateStr = "";
  if (u.createdAt) {
    const d =
      typeof u.createdAt === "string"
        ? u.createdAt
        : new Date(u.createdAt).toISOString();
    dateStr = d.slice(0, 10);
  }

  return {
    id: u.id,
    name: u.name,
    email: u.email,
    role: (u.role ?? "viewer") as UserRole,
    banned: u.banned ?? false,
    createdAt: dateStr,
  };
};

/**
 * Direct fetch wrapper for Better Auth admin endpoints.
 * Avoids dynamic import issues with adminClient in the browser bundle.
 * Cookies are sent automatically (credentials: include).
 */
const authUrl = process.env.NEXT_PUBLIC_AUTH_URL;

const adminFetch = async <T>(
  path: string,
  method: "GET" | "POST" = "GET",
  body?: Record<string, unknown>,
): Promise<{ data: T | null; error: string | null; status: number }> => {
  if (!authUrl) return { data: null, error: "No auth URL", status: 0 };

  try {
    const res = await fetch(`${authUrl}${path}`, {
      method,
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      ...(body ? { body: JSON.stringify(body) } : {}),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      return {
        data: null,
        error: (err as Record<string, string>).message ?? `HTTP ${res.status}`,
        status: res.status,
      };
    }

    const data = await res.json();
    return { data: data as T, error: null, status: res.status };
  } catch (error) {
    console.error(`Admin API ${path} failed:`, error);
    return { data: null, error: "Network error", status: 0 };
  }
};

interface UseUserManagementReturn {
  users: MockUser[];
  currentUserId: string | null;
  currentUserRole: UserRole;
  isDemo: boolean;
  isLoading: boolean;
  isAuthorized: boolean;
  setUserRole: (userId: string, role: UserRole) => Promise<boolean>;
  setUserName: (userId: string, name: string) => Promise<boolean>;
}

export const useUserManagement = (): UseUserManagementReturn => {
  const store = useRbacStore();
  const session = useSession();

  /**
   * isPresentationModeClient() uses typeof window check which
   * differs between server (false) and client (true/false).
   * We start as mounted=false on both sides to avoid hydration
   * mismatch, then resolve actual mode after mount.
   */
  const [isMounted, setIsMounted] = useState(false);
  const [realUsers, setRealUsers] = useState<MockUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [rejected, setRejected] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const isDemo = isMounted ? isPresentationModeClient() : true;
  const sessionPending = !isDemo && (session.isPending ?? false);
  const sessionUser = session.data?.user as Record<string, unknown> | undefined;
  const currentUserId = (sessionUser?.id as string) ?? null;
  const sessionRole = (sessionUser?.role ?? "viewer") as UserRole;

  const currentUserRole: UserRole = isDemo
    ? store.currentUserRole
    : sessionRole;

  /**
   * Before mount: loading (hydration-safe).
   * Demo mode: always authorized.
   * Real mode: wait for session, then check admin role.
   */
  const isAuthorized =
    !rejected &&
    (!isMounted || isDemo || sessionPending || currentUserRole === "admin");

  const fetchUsers = useCallback(async () => {
    try {
      setIsLoading(true);
      const { data, error, status } = await adminFetch<{
        users: AdminUser[];
        total: number;
      }>("/admin/list-users?limit=100");

      if (error) {
        console.error("Failed to fetch users:", error);
        if (status === 401 || status === 403) {
          setRejected(true);
        }
        return;
      }
      if (data?.users) {
        setRealUsers(data.users.map(toMockUser));
      }
    } catch (error) {
      console.error("Failed to fetch users:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isDemo) {
      setIsLoading(false);
    }
  }, [isDemo]);

  useEffect(() => {
    if (isDemo || sessionPending || currentUserRole !== "admin") return;
    fetchUsers();
  }, [isDemo, sessionPending, currentUserRole, fetchUsers]);

  const setUserRole = useCallback(
    async (userId: string, role: UserRole): Promise<boolean> => {
      if (isDemo) {
        store.setUserRole(userId, role);
        return true;
      }

      const { error } = await adminFetch("/admin/set-role", "POST", {
        userId,
        role,
      });
      if (error) {
        console.error("Failed to set role:", error);
        return false;
      }
      setRealUsers((prev) =>
        prev.map((u) => (u.id === userId ? { ...u, role } : u)),
      );
      return true;
    },
    [isDemo, store],
  );

  const setUserName = useCallback(
    async (userId: string, name: string): Promise<boolean> => {
      if (isDemo) {
        store.setUserName(userId, name);
        return true;
      }

      const { error } = await adminFetch("/admin/update-user", "POST", {
        userId,
        data: { name },
      });
      if (error) {
        console.error("Failed to update user name:", error);
        return false;
      }
      setRealUsers((prev) =>
        prev.map((u) => (u.id === userId ? { ...u, name } : u)),
      );
      return true;
    },
    [isDemo, store],
  );

  return {
    users: isDemo ? store.users : realUsers,
    currentUserId,
    currentUserRole,
    isDemo,
    isLoading: !isMounted || isLoading || sessionPending,
    isAuthorized,
    setUserRole,
    setUserName,
  };
};
