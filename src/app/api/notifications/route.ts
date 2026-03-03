import fs from "fs";
import { NextResponse } from "next/server";
import path from "path";

import type { Notification } from "../../../layout/navbar/hooks/useNotificationsData";
import { NOTIFICATIONS_QUERY } from "../../../queries/NotificationsQuery";
import { client } from "../../../services/apolloClient";
import { hasValidBackendUrl } from "../../../utils/presentationMode";

/**
 * Notifications API route. Reads from backendBackup.json when no valid
 * backend URL is configured, otherwise queries GraphQL with fs fallback.
 */
export async function GET() {
  try {
    if (!hasValidBackendUrl()) {
      const filePath = path.join(process.cwd(), "public", "backendBackup.json");
      const fileContent = fs.readFileSync(filePath, "utf-8");
      const allData = JSON.parse(fileContent);

      if (!allData.notifications) {
        throw new Error("No notifications found in backup data");
      }

      return NextResponse.json(allData.notifications);
    }

    try {
      const { data } = await client.query<{ notifications: Notification[] }>({
        query: NOTIFICATIONS_QUERY,
        fetchPolicy: "network-only",
      });

      return NextResponse.json(data?.notifications ?? []);
    } catch (backendError: unknown) {
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

/**
 * Dynamic by default. Uncomment below for static builds with hourly revalidation:
 * export const dynamic = 'force-static';
 * export const revalidate = 3600;
 */
