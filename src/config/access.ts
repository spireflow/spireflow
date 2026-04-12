/**
 * RBAC Role & Permission Definitions
 *
 * Pure TypeScript - no better-auth imports, safe for client bundles.
 * The demo page (user-management) uses these types via rbacStore.
 *
 * To connect a real backend:
 * 1. Import { createAccessControl } from "better-auth/plugins/access"
 * 2. Import { adminAc, defaultStatements } from "better-auth/plugins/admin/access"
 * 3. Create ac + roles matching backend src/access.ts
 * 4. Pass them to adminClient() in services/auth/auth-client.ts
 */

export const ROLES = ["admin", "editor", "viewer"] as const;
export type Role = (typeof ROLES)[number];
