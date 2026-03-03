import { useEffect, useState } from "react";

export interface Notification {
  id: string;
  title: string;
  description: string;
  time: string;
  icon: string;
  isNew: boolean;
}

export const useNotificationsData = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        // Fetch from our Next.js API route (server-side)
        // I created this route to be able to fetch data serverside like in getData
        const response = await fetch("/api/notifications");

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setNotifications(data as Notification[]);
      } catch (err: unknown) {
        const errorMessage =
          err instanceof Error ? err.message : "Unknown error";
        setError(errorMessage);
        console.error("Error fetching notifications:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  return { notifications, isLoading, error };
};
