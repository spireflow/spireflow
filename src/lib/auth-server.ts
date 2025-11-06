import { headers } from "next/headers";

/**
 * Get session on the server side
 * Reference: https://www.better-auth.com/docs/integrations/next#middleware
 */
export async function getSession() {
  try {
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
  } catch (error) {
    console.error("Failed to get session:", error);
    return null;
  }
}
