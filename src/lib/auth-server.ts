import { headers } from "next/headers";

/**
 * Server-side session retrieval via Better Auth.
 * Forwards request cookies and returns { user, session } or null.
 */
export const getSession = async () => {
  try {
    if (!process.env.NEXT_PUBLIC_AUTH_URL) {
      return null;
    }

    const headersList = await headers();

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_AUTH_URL}/get-session`,
      {
        headers: {
          cookie: headersList.get("cookie") || "",
        },
        cache: "no-store",
      },
    );

    if (!response.ok) {
      return null;
    }

    const data = await response.json();

    return data?.user ? data : null;
  } catch (error: unknown) {
    console.error("Failed to get session:", error);
    return null;
  }
};
