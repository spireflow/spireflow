import { headers } from "next/headers";

/**
 * Retrieves current user session on the server side.
 * Forwards cookies to Better Auth backend for authentication.
 *
 * Returns session data if authenticated, null otherwise.
 * Use only in Server Components and API routes (not client components).
 *
 * @async
 * @returns {Promise<{user: object, session: object} | null>}
 */
export async function getSession() {
  try {
    // Check if auth URL is configured
    if (!process.env.NEXT_PUBLIC_AUTH_URL) {
      return null;
    }

    const headersList = await headers();

    // Call Better Auth backend
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_AUTH_URL}/get-session`,
      {
        headers: {
          // Forward cookies from the request (Better Auth official pattern)
          cookie: headersList.get("cookie") || "",
        },
        cache: "no-store",
      }
    );

    if (!response.ok) {
      return null;
    }

    const data = await response.json();

    // Better Auth returns { user, session }
    return data?.user ? data : null;
  } catch (error: unknown) {
    console.error("Failed to get session:", error);
    return null;
  }
}
