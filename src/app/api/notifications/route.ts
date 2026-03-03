import fs from "fs";
import { NextResponse } from "next/server";
import path from "path";

import type { Notification } from "../../../layout/navbar/hooks/useNotificationsData";
import { NOTIFICATIONS_QUERY } from "../../../queries/NotificationsQuery";
import { client } from "../../../services/apolloClient";
import { hasValidBackendUrl } from "../../../utils/presentationMode";

export async function GET() {
  try {
    // Auto-detect: Use backup if no valid backend
    if (!hasValidBackendUrl()) {
      // Read from backup JSON file (server-side, fs works here)
      const filePath = path.join(process.cwd(), "public", "backendBackup.json");
      const fileContent = fs.readFileSync(filePath, "utf-8");
      const allData = JSON.parse(fileContent);

      if (!allData.notifications) {
        throw new Error("No notifications found in backup data");
      }

      return NextResponse.json(allData.notifications);
    }

    // Try to fetch from GraphQL backend
    try {
      const { data } = await client.query<{ notifications: Notification[] }>({
        query: NOTIFICATIONS_QUERY,
        fetchPolicy: "network-only",
      });

      return NextResponse.json(data?.notifications ?? []);
    } catch (backendError: unknown) {
      // Fallback to backup if backend fails
      console.warn(
        "[Backend Failed] Using backup data for notifications:",
        backendError,
      );
      const filePath = path.join(process.cwd(), "public", "backendBackup.json");
      const fileContent = fs.readFileSync(filePath, "utf-8");
      const allData = JSON.parse(fileContent);

      if (!allData.notifications) {
        throw new Error("No notifications found in backup data");
      }

      return NextResponse.json(allData.notifications);
    }
  } catch (error: unknown) {
    console.error("Error in notifications API route:", error);
    return NextResponse.json(
      { error: "Failed to fetch notifications" },
      { status: 500 },
    );
  }
}

// Optional: Make this route static for production builds
// export const dynamic = 'force-static';
// export const revalidate = 3600; // Revalidate every hour
