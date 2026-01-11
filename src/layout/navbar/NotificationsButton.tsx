import React, { useState, useEffect } from "react";

import { Tooltip } from "../../components/common/Tooltip";
import { NotificationsButtonProps } from "./types";
import { BellIcon } from "../../assets/icons/BellIcon";
import { UpdateIcon } from "../../assets/icons/UpdateIcon";
import { UsersIcon } from "../../assets/icons/UsersIcon";
import { DocumentIcon } from "../../assets/icons/DocumentIcon";
import { CheckIcon } from "../../assets/icons/CheckIcon";
import { useNotificationsData } from "./hooks/useNotificationsData";
import { AllNotificationsModal } from "../../components/views/notifications/AllNotificationsModal";
import type { Notification } from "./hooks/useNotificationsData";

export const NotificationsButton = ({
  notificationsDropdown,
  notificationsTooltip,
  themeDropdown,
  languageDropdown,
  userDropdown,
  searchClose,
  t,
}: NotificationsButtonProps) => {
  const { notifications: initialNotifications } = useNotificationsData();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isAllNotificationsModalOpen, setIsAllNotificationsModalOpen] =
    useState(false);

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
      JSON.stringify(updatedNotifications)
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

  return (
    <div
      className="relative"
      ref={notificationsDropdown.ref}
      onMouseEnter={notificationsTooltip.showTooltip}
      onMouseLeave={notificationsTooltip.hideTooltip}
    >
      <div className="h-10 w-10">
        <button
          onClick={() => {
            // On mobile (<xl), open modal directly
            if (window.innerWidth < 1280) {
              setIsAllNotificationsModalOpen(true);
            } else {
              notificationsDropdown.toggle();
            }
            themeDropdown.close();
            languageDropdown.close();
            userDropdown.close();
            searchClose();
          }}
          className="relative text-base flex rounded-full justify-center items-center gap-2 w-full h-full !outline-0 border border-mainBorder bg-outlinedButtonBg hover:bg-navbarIconButtonBgHover text-primaryText stroke-grayIcon fill-grayIcon"
          type="button"
          aria-label={t("notifications") || "Notifications"}
        >
          <BellIcon />
          {newNotificationsCount > 0 && (
            <span className="absolute -top-[0.2rem] -right-[0.2rem] flex h-4 w-4 items-center justify-center rounded-full bg-notificationBadgeBg text-[10px] font-semibold text-white">
              {newNotificationsCount}
            </span>
          )}
        </button>
      </div>
      {notificationsTooltip.isTooltipVisible &&
        !notificationsDropdown.isOpen &&
        !themeDropdown.isOpen &&
        !languageDropdown.isOpen &&
        !userDropdown.isOpen &&
        !isAllNotificationsModalOpen && (
          <div className="absolute top-12 right-0 pointer-events-none hidden xl:flex">
            <Tooltip
              text={t("notifications") || "Notifications"}
              className="h-8 px-3 pointer-events-none"
            />
          </div>
        )}
      {notificationsDropdown.isOpen && (
        <div className="hidden xl:block absolute right-0 top-10 xl:top-11 mt-2 w-[22rem] border border-inputBorder bg-dropdownBg text-primaryText rounded-md shadow-lg overflow-hidden">
          {/* Header */}
          <div className="px-5 py-3 border-b border-mainBorder flex justify-between items-center bg-notificationHeaderBg">
            <h3 className="font-semibold text-base">Notifications</h3>
            {newNotificationsCount > 0 && (
              <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-notificationBadgeBg text-white">
                {newNotificationsCount} New
              </span>
            )}
          </div>

          {/* Notifications list */}
          <div className="max-h-[400px] overflow-y-auto">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className="px-5 py-3 hover:bg-notificationItemBgHover cursor-pointer border-b border-mainBorder transition-colors"
                onClick={() => {
                  // Mark as read
                  const updatedNotifications = notifications.map((n) =>
                    n.id === notification.id ? { ...n, isNew: false } : n
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
              onClick={() => {
                setIsAllNotificationsModalOpen(true);
                notificationsDropdown.close();
              }}
              className="w-full py-2.5 px-4 rounded-lg bg-notificationBadgeBg hover:bg-notificationBadgeBgHover text-white font-medium text-sm transition-colors"
            >
              READ ALL NOTIFICATIONS
            </button>
          </div>
        </div>
      )}
      {isAllNotificationsModalOpen && (
        <AllNotificationsModal
          closeModal={() => setIsAllNotificationsModalOpen(false)}
          notifications={notifications}
          onNotificationsUpdate={handleNotificationsUpdate}
        />
      )}
    </div>
  );
};
