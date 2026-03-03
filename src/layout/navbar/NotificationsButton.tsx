import { useTranslations } from "next-intl";
import React, { useCallback, useEffect, useRef, useState } from "react";

import { BellIcon } from "../../assets/icons/BellIcon";
import { CheckIcon } from "../../assets/icons/CheckIcon";
import { DocumentIcon } from "../../assets/icons/DocumentIcon";
import { UpdateIcon } from "../../assets/icons/UpdateIcon";
import { UsersIcon } from "../../assets/icons/UsersIcon";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "../../components/common/shadcn/tooltip";
import { AllNotificationsModal } from "../../components/views/notifications/AllNotificationsModal";
import { BREAKPOINTS } from "../../styles/breakpoints";
import type { Notification } from "./hooks/useNotificationsData";
import { useNotificationsData } from "./hooks/useNotificationsData";
import { NotificationsButtonProps } from "./types";

export const NotificationsButton = ({
  notificationsDropdown,
  themeDropdown,
  languageDropdown,
  userDropdown,
  searchClose,
  closeMobileMenu,
  t,
}: Omit<NotificationsButtonProps, "notificationsTooltip">) => {
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

  // Load notifications - always use fresh data on page load, ignore localStorage
  useEffect(() => {
    if (initialNotifications.length > 0) {
      setNotifications(initialNotifications);
      // Clear localStorage on fresh page load to reset notifications
      localStorage.removeItem("notificationsState");
    }
  }, [initialNotifications]);

  // Update notifications callback
  const handleNotificationsUpdate = (updatedNotifications: Notification[]) => {
    setNotifications(updatedNotifications);
    localStorage.setItem(
      "notificationsState",
      JSON.stringify(updatedNotifications),
    );
  };

  const newNotificationsCount = notifications.filter((n) => n.isNew).length;

  const getIcon = (iconType: string) => {
    switch (iconType) {
      case "update":
        return <UpdateIcon />;
      case "users":
        return <UsersIcon />;
      case "check":
        return <CheckIcon />;
      case "document":
        return <DocumentIcon />;
      default:
        return <BellIcon />;
    }
  };

  const isAnyDropdownOpen =
    notificationsDropdown.isOpen ||
    themeDropdown.isOpen ||
    languageDropdown.isOpen ||
    userDropdown.isOpen ||
    isAllNotificationsModalOpen;

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

  return (
    <div className="relative" ref={notificationsDropdown.ref}>
      <Tooltip
        delayDuration={200}
        open={tooltipOpen}
        onOpenChange={(open) => {
          if (open && suppressTooltipRef.current) return;
          if (open && isAnyDropdownOpen) return;
          setTooltipOpen(open);
        }}
      >
        <TooltipTrigger asChild>
          <div
            className="h-10 w-10"
            /** Real mouse movement clears the suppress flag */
            onPointerMove={() => {
              suppressTooltipRef.current = false;
            }}
            /** Keyboard focus (Tab/Escape return) bypasses suppress and opens tooltip after state settles */
            onFocus={(e) => {
              if (
                e.target instanceof HTMLElement &&
                e.target.matches(":focus-visible")
              ) {
                suppressTooltipRef.current = false;
                const wrapper = e.currentTarget;
                setTimeout(() => {
                  if (wrapper.contains(document.activeElement)) {
                    setTooltipOpen(true);
                  }
                }, 0);
              }
            }}
          >
            <button
              ref={notificationsBtnRef}
              onClick={(e) => {
                setTooltipOpen(false);
                // On mobile (<xl), open modal directly
                if (window.innerWidth < BREAKPOINTS.xl) {
                  if (e.detail > 0) suppressTooltipRef.current = true;
                  closeMobileMenu();
                  setIsAllNotificationsModalOpen(true);
                } else {
                  notificationsDropdown.toggle();
                  setHighlightedIndex(-1);
                }
                themeDropdown.close();
                languageDropdown.close();
                userDropdown.close();
                searchClose();
              }}
              onKeyDown={handleKeyDown}
              className="relative text-base flex rounded-full justify-center items-center gap-2 w-full h-full border border-mainBorder bg-outlinedButtonBg hover:bg-navbarIconButtonBgHover text-primaryText stroke-grayIcon fill-grayIcon"
              type="button"
              aria-label={t("notifications") || "Notifications"}
              aria-expanded={notificationsDropdown.isOpen}
            >
              <BellIcon />
              {newNotificationsCount > 0 && (
                <span className="absolute -top-[0.2rem] -right-[0.2rem] flex h-4 w-4 items-center justify-center rounded-full bg-notificationBadgeBg text-[0.625rem] font-semibold text-white">
                  {newNotificationsCount}
                </span>
              )}
            </button>
          </div>
        </TooltipTrigger>
        {!isAnyDropdownOpen && (
          <TooltipContent
            side="bottom"
            align="start"
            alignOffset={-70}
            className="hidden xl:block"
          >
            {t("notifications") || "Notifications"}
          </TooltipContent>
        )}
      </Tooltip>
      {notificationsDropdown.isOpen && (
        <div
          role="region"
          aria-label="Notifications"
          className="hidden xl:block absolute right-0 top-10 xl:top-11 mt-2 w-88 border border-inputBorder bg-dropdownBg text-primaryText rounded-md shadow-lg overflow-hidden"
        >
          {/* Header */}
          <div className="px-5 py-3 border-b border-mainBorder flex justify-between items-center bg-notificationHeaderBg">
            <h3 className="font-semibold text-base">
              {tNotifications("title")}
            </h3>
            {newNotificationsCount > 0 && (
              <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-notificationBadgeBg text-white">
                {newNotificationsCount} {tNotifications("new")}
              </span>
            )}
          </div>

          {/* Notifications list */}
          <div className="max-h-100 overflow-y-auto">
            {notifications.map((notification, index) => (
              <div
                key={notification.id}
                role="article"
                className={`px-5 py-3 cursor-pointer border-b border-mainBorder transition-colors ${
                  index === highlightedIndex
                    ? "bg-notificationItemBgHover"
                    : "hover:bg-notificationItemBgHover"
                }`}
                onClick={() => {
                  // Mark as read
                  const updatedNotifications = notifications.map((n) =>
                    n.id === notification.id ? { ...n, isNew: false } : n,
                  );
                  handleNotificationsUpdate(updatedNotifications);
                }}
              >
                <div className="flex gap-3">
                  {/* Icon circle */}
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-outlinedButtonBg border border-mainBorder flex items-center justify-center stroke-grayIcon fill-grayIcon">
                    {getIcon(notification.icon)}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start gap-2 mb-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium text-sm text-primaryText">
                          {notification.title}
                        </h4>
                        {notification.isNew && (
                          <span className="w-2 h-2 rounded-full bg-notificationBadgeBg"></span>
                        )}
                      </div>
                      <span className="text-xs text-secondaryText whitespace-nowrap">
                        {notification.time}
                      </span>
                    </div>
                    <p className="text-sm text-secondaryText line-clamp-2">
                      {notification.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Footer button */}
          <div className="p-3 border-t border-mainBorder bg-notificationHeaderBg">
            <button
              onPointerDown={() => {
                suppressTooltipRef.current = true;
              }}
              onClick={() => {
                setIsAllNotificationsModalOpen(true);
                notificationsDropdown.close();
              }}
              className="w-full py-2.5 px-4 rounded-lg bg-notificationBadgeBg hover:bg-notificationBadgeBgHover text-white font-medium text-sm transition-colors"
            >
              {tNotifications("readAll")}
            </button>
          </div>
        </div>
      )}
      {isAllNotificationsModalOpen && (
        <AllNotificationsModal
          closeModal={handleCloseModal}
          notifications={notifications}
          onNotificationsUpdate={handleNotificationsUpdate}
          returnFocusRef={notificationsBtnRef}
        />
      )}
    </div>
  );
};
