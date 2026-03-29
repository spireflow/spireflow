import { useTranslations } from "next-intl";
import React, { useCallback, useEffect, useRef, useState } from "react";

import { DropdownProps } from "../types";
import type { Notification } from "./useNotificationsData";
import { useNotificationsData } from "./useNotificationsData";

type FilterType = "all" | "new" | "read";

/**
 * Manages the notifications dropdown - fetches initial data, tracks read/unread state,
 * persists changes to localStorage, and provides keyboard navigation within the list.
 */
export const useNotifications = ({
  notificationsDropdown,
  isAnyOtherDropdownOpen,
}: {
  notificationsDropdown: DropdownProps;
  isAnyOtherDropdownOpen: boolean;
}) => {
  const tNotifications = useTranslations("notificationsUI");
  const { notifications: initialNotifications } = useNotificationsData();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isAllNotificationsModalOpen, setIsAllNotificationsModalOpen] =
    useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const notificationsBtnRef = useRef<HTMLButtonElement>(null);
  /** Blocks tooltip open until next pointer move or keyboard focus */
  const suppressTooltipRef = useRef(false);
  const [tooltipOpen, setTooltipOpen] = useState(false);

  /** Prevents tooltip from showing when Firefox re-fires hover events on tab switch */
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        suppressTooltipRef.current = true;
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  /**
   * Always uses fresh server data on page load - clears any stale
   * localStorage so notifications reset between sessions.
   */
  useEffect(() => {
    if (initialNotifications.length > 0) {
      setNotifications(initialNotifications);
      localStorage.removeItem("notificationsState");
    }
  }, [initialNotifications]);

  /** Persists updated notifications to both React state and localStorage. */
  const handleNotificationsUpdate = (updatedNotifications: Notification[]) => {
    setNotifications(updatedNotifications);
    localStorage.setItem(
      "notificationsState",
      JSON.stringify(updatedNotifications),
    );
  };

  const newNotificationsCount = notifications.filter((n) => n.isNew).length;

  const isAnyDropdownOpen =
    isAnyOtherDropdownOpen || isAllNotificationsModalOpen;

  /**
   * Arrow keys move the highlight through the notification list,
   * Enter marks the highlighted notification as read,
   * Escape closes the dropdown and returns focus to the trigger button.
   */
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (!notificationsDropdown.isOpen) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setHighlightedIndex((prev) =>
          prev < notifications.length - 1 ? prev + 1 : prev,
        );
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : prev));
      } else if (e.key === "Enter" && highlightedIndex >= 0) {
        e.preventDefault();
        const notification = notifications[highlightedIndex];
        const updatedNotifications = notifications.map((n) =>
          n.id === notification.id ? { ...n, isNew: false } : n,
        );
        handleNotificationsUpdate(updatedNotifications);
      } else if (e.key === "Escape") {
        e.preventDefault();
        notificationsDropdown.close();
        setHighlightedIndex(-1);
        notificationsBtnRef.current?.focus();
      }
    },
    [notificationsDropdown, notifications, highlightedIndex],
  );

  const handleCloseModal = useCallback(() => {
    setIsAllNotificationsModalOpen(false);
  }, []);

  return {
    tNotifications,
    notifications,
    isAllNotificationsModalOpen,
    setIsAllNotificationsModalOpen,
    highlightedIndex,
    setHighlightedIndex,
    notificationsBtnRef,
    suppressTooltipRef,
    tooltipOpen,
    setTooltipOpen,
    newNotificationsCount,
    isAnyDropdownOpen,
    handleKeyDown,
    handleCloseModal,
    handleNotificationsUpdate,
  };
};

/**
 * State for the full-screen "all notifications" modal.
 * Keeps a local copy of notifications so filter/mark-as-read actions
 * are instant, then propagates changes upward via `onNotificationsUpdate`.
 */
export const useNotificationsModal = ({
  notifications,
  onNotificationsUpdate,
}: {
  notifications: Notification[];
  onNotificationsUpdate?: (notifications: Notification[]) => void;
}) => {
  const t = useTranslations("notificationsUI");
  const [filter, setFilter] = useState<FilterType>("all");
  const [localNotifications, setLocalNotifications] =
    useState<Notification[]>(notifications);

  const filteredNotifications = localNotifications.filter((n) => {
    if (filter === "new") return n.isNew;
    if (filter === "read") return !n.isNew;
    return true;
  });

  const handleMarkAsRead = (id: string) => {
    const updated = localNotifications.map((n) =>
      n.id === id ? { ...n, isNew: false } : n,
    );
    setLocalNotifications(updated);
    onNotificationsUpdate?.(updated);
  };

  const handleMarkAllAsRead = () => {
    const updated = localNotifications.map((n) => ({ ...n, isNew: false }));
    setLocalNotifications(updated);
    onNotificationsUpdate?.(updated);
  };

  const newCount = localNotifications.filter((n) => n.isNew).length;

  return {
    t,
    filter,
    setFilter,
    filteredNotifications,
    handleMarkAsRead,
    handleMarkAllAsRead,
    newCount,
  };
};
