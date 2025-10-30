import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

import { client } from "../../../services/apolloClient";
import { NOTIFICATIONS_QUERY } from "../../../queries/NotificationsQuery";
import { switchToBackupData } from "../../../services/getData";

export async function GET() {
  try {
    if (switchToBackupData) {
      // Read from backup JSON file (server-side, fs works here)
      const filePath = path.join(process.cwd(), "public", "backendBackup.json");
      const fileContent = fs.readFileSync(filePath, "utf-8");
      const allData = JSON.parse(fileContent);

      if (!allData.notifications) {
        throw new Error("No notifications found in backup data");
      }

      return NextResponse.json(allData.notifications);
    } else {
      // Fetch from GraphQL backend
      const { data } = await client.query({
        query: NOTIFICATIONS_QUERY,
        fetchPolicy: "network-only",
      });

      return NextResponse.json(data.notifications);
    }
  } catch (error) {
    console.error("Error in notifications API route:", error);
    return NextResponse.json(
      { error: "Failed to fetch notifications" },
      { status: 500 }
    );
  }
}

// Optional: Make this route static for production builds
// export const dynamic = 'force-static';
// export const revalidate = 3600; // Revalidate every hour
