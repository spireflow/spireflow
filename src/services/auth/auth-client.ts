import { createAuthClient } from "better-auth/react";

const authUrl = process.env.NEXT_PUBLIC_AUTH_URL;
const isAuthConfigured =
  !!authUrl &&
  (authUrl.startsWith("http://") || authUrl.startsWith("https://"));

/**
 * Better Auth client instance for client-side authentication.
 * Returns null in presentation mode (NEXT_PUBLIC_AUTH_URL not set)
 * to avoid 404 requests and hydration mismatches.
 *
 * Admin plugin (adminClient) should be added here when connecting
 * to a real backend with RBAC enabled. See config/access.ts for
 * role definitions compatible with Better Auth's admin plugin.
 */
const authClient = isAuthConfigured
  ? createAuthClient({ baseURL: authUrl })
  : null;

/**
 * Authentication methods from Better Auth client.
 *
 * @property {Function} signIn - Sign in with email/password (signIn.email())
 * @property {Function} signUp - Register new user account (signUp.email())
 * @property {Function} signOut - End current session
 * @property {Function} useSession - React hook for session data ({ data, isPending }).
 *   In presentation mode returns a static empty result without fetching.
 */
export const signIn = authClient?.signIn;
export const signUp = authClient?.signUp;
export const signOut = authClient?.signOut;

const emptySession = { data: null, isPending: false, error: null };
export const useSession = authClient?.useSession ?? (() => emptySession);
