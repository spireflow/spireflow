/**
 * RBAC Demo Store
 *
 * In-memory mock data for the User Management page.
 * State resets on page refresh (no persist middleware).
 *
 * To connect a real backend, replace setUserRole/setUserName calls
 * with authClient.admin.setRole() / API calls and fetch the user
 * list from authClient.admin.listUsers(). See Better Auth admin
 * plugin docs: https://better-auth.com/docs/plugins/admin
 */

import { create } from "zustand";
import { devtools } from "zustand/middleware";

export type UserRole = "admin" | "editor" | "viewer";

export interface MockUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  banned: boolean;
  createdAt: string;
}

interface RbacStore {
  users: MockUser[];
  currentUserRole: UserRole;
  setUserRole: (userId: string, role: UserRole) => void;
  setUserName: (userId: string, name: string) => void;
}

const MOCK_USERS: MockUser[] = [
  {
    id: "usr_1",
    name: "Jane Cooper",
    email: "jane.cooper@nellavio.com",
    role: "admin",
    banned: false,
    createdAt: "2024-11-02",
  },
  {
    id: "usr_2",
    name: "John Doe",
    email: "john.doe@nellavio.com",
    role: "editor",
    banned: false,
    createdAt: "2025-01-15",
  },
  {
    id: "usr_3",
    name: "Alice Smith",
    email: "alice.smith@nellavio.com",
    role: "viewer",
    banned: false,
    createdAt: "2025-02-20",
  },
  {
    id: "usr_4",
    name: "Bob Wilson",
    email: "bob.wilson@nellavio.com",
    role: "viewer",
    banned: true,
    createdAt: "2025-03-05",
  },
  {
    id: "usr_5",
    name: "Emma Davis",
    email: "emma.davis@nellavio.com",
    role: "editor",
    banned: false,
    createdAt: "2025-03-18",
  },
  {
    id: "usr_6",
    name: "Marcus Chen",
    email: "marcus.chen@nellavio.com",
    role: "viewer",
    banned: false,
    createdAt: "2025-04-01",
  },
  {
    id: "usr_7",
    name: "Olivia Brown",
    email: "olivia.brown@nellavio.com",
    role: "editor",
    banned: false,
    createdAt: "2025-04-10",
  },
  {
    id: "usr_8",
    name: "Liam Johnson",
    email: "liam.johnson@nellavio.com",
    role: "viewer",
    banned: false,
    createdAt: "2025-04-15",
  },
  {
    id: "usr_9",
    name: "Sophia Martinez",
    email: "sophia.martinez@nellavio.com",
    role: "admin",
    banned: false,
    createdAt: "2025-04-20",
  },
  {
    id: "usr_10",
    name: "Noah Taylor",
    email: "noah.taylor@nellavio.com",
    role: "viewer",
    banned: true,
    createdAt: "2025-05-01",
  },
  {
    id: "usr_11",
    name: "Isabella Garcia",
    email: "isabella.garcia@nellavio.com",
    role: "editor",
    banned: false,
    createdAt: "2025-05-10",
  },
  {
    id: "usr_12",
    name: "Ethan Lee",
    email: "ethan.lee@nellavio.com",
    role: "viewer",
    banned: false,
    createdAt: "2025-05-18",
  },
  {
    id: "usr_13",
    name: "Mia Anderson",
    email: "mia.anderson@nellavio.com",
    role: "viewer",
    banned: false,
    createdAt: "2025-06-02",
  },
  {
    id: "usr_14",
    name: "James Thomas",
    email: "james.thomas@nellavio.com",
    role: "editor",
    banned: false,
    createdAt: "2025-06-14",
  },
  {
    id: "usr_15",
    name: "Charlotte White",
    email: "charlotte.white@nellavio.com",
    role: "viewer",
    banned: true,
    createdAt: "2025-06-25",
  },
  {
    id: "usr_16",
    name: "Benjamin Harris",
    email: "benjamin.harris@nellavio.com",
    role: "admin",
    banned: false,
    createdAt: "2025-07-05",
  },
  {
    id: "usr_17",
    name: "Amelia Clark",
    email: "amelia.clark@nellavio.com",
    role: "editor",
    banned: false,
    createdAt: "2025-07-20",
  },
  {
    id: "usr_18",
    name: "Lucas Robinson",
    email: "lucas.robinson@nellavio.com",
    role: "viewer",
    banned: false,
    createdAt: "2025-08-03",
  },
];

export const useRbacStore = create<RbacStore>()(
  devtools(
    (set) => ({
      users: MOCK_USERS,
      currentUserRole: "admin",
      setUserRole: (userId, role) =>
        set((state) => ({
          users: state.users.map((u) => (u.id === userId ? { ...u, role } : u)),
        })),
      setUserName: (userId, name) =>
        set((state) => ({
          users: state.users.map((u) => (u.id === userId ? { ...u, name } : u)),
        })),
    }),
    { name: "RbacStore" },
  ),
);
