import { createAuthClient } from "better-auth/react";

/**
 * Better Auth client instance for client-side authentication.
 */
export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_AUTH_URL,
});

/**
 * Authentication methods from Better Auth client.
 *
 * @property {Function} signIn - Sign in with email/password (signIn.email())
 * @property {Function} signUp - Register new user account (signUp.email())
 * @property {Function} signOut - End current session
 * @property {Function} useSession - React hook for session data ({ data, isPending })
 */
export const { signIn, signUp, signOut, useSession } = authClient;
