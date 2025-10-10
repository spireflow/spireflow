import React from "react";

import { Tooltip } from "../../components/common/Tooltip";
import { NotificationsButtonProps } from "./types";
import { BellIcon } from "../../assets/icons/BellIcon";
import { UpdateIcon } from "../../assets/icons/UpdateIcon";
import { UsersIcon } from "../../assets/icons/UsersIcon";
import { DocumentIcon } from "../../assets/icons/DocumentIcon";
import { CheckIcon } from "../../assets/icons/CheckIcon";

export const NotificationsButton = ({
  notificationsDropdown,
  notificationsTooltip,
  themeDropdown,
  languageDropdown,
  userDropdown,
  searchClose,
  t,
}: NotificationsButtonProps) => {
  const mockNotifications = [
    {
      id: 1,
      titleKey: "notificationUpdateTitle",
      descriptionKey: "notificationUpdateDesc",
      timeKey: "notificationTimeToday",
      icon: "update",
      isNew: true,
    },
    {
      id: 2,
      titleKey: "notificationConnectionTitle",
      descriptionKey: "notificationConnectionDesc",
      timeKey: "notificationTimeYesterday",
      icon: "users",
      isNew: true,
    },
    {
      id: 3,
      titleKey: "notificationTaskTitle",
      descriptionKey: "notificationTaskDesc",
      timeKey: "notificationTime2Days",
      icon: "check",
      isNew: false,
    },
    {
      id: 4,
      titleKey: "notificationReportTitle",
      descriptionKey: "notificationReportDesc",
      time: "11 Aug",
      icon: "document",
      isNew: false,
    },
  ];

  const newNotificationsCount = mockNotifications.filter(n => n.isNew).length;

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
            notificationsDropdown.toggle();
            themeDropdown.close();
            languageDropdown.close();
            userDropdown.close();
            searchClose();
          }}
          className="relative text-base flex rounded-full justify-center items-center gap-2 w-full h-full !outline-0 border border-mainBorder bg-outlinedButtonBg hover:bg-outlinedButtonBgHover text-primaryText stroke-grayIcon fill-grayIcon"
          type="button"
          aria-label={t("notifications") || "Notifications"}
        >
          <BellIcon />
          {newNotificationsCount > 0 && (
            <span className="absolute top-0 right-0 flex h-4 w-4 items-center justify-center rounded-full bg-notificationBadgeBg text-[10px] font-semibold text-white">
              {newNotificationsCount}
            </span>
          )}
        </button>
      </div>
      {notificationsTooltip.isTooltipVisible &&
        !notificationsDropdown.isOpen &&
        !themeDropdown.isOpen &&
        !languageDropdown.isOpen &&
        !userDropdown.isOpen && (
          <div className="absolute top-12 right-0 pointer-events-none hidden xl:flex">
            <Tooltip
              text={t("notifications") || "Notifications"}
              className="h-8 px-3 pointer-events-none"
            />
          </div>
        )}
      {notificationsDropdown.isOpen && (
        <div className="absolute right-0 top-10 xl:top-11 mt-2 w-[22rem] border border-inputBorder bg-dropdownBg text-primaryText rounded-md shadow-lg overflow-hidden">
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
            {mockNotifications.map((notification) => (
              <div
                key={notification.id}
                className="px-5 py-3 hover:bg-notificationItemBgHover cursor-pointer border-b border-mainBorder transition-colors bg-notificationItemBg"
                onClick={() => {
                  // Mock action - do nothing
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
                      <h4 className="font-medium text-sm text-primaryText">
                        {t(notification.titleKey)}
                      </h4>
                      <span className="text-xs text-secondaryText whitespace-nowrap">
                        {notification.timeKey ? t(notification.timeKey) : notification.time}
                      </span>
                    </div>
                    <p className="text-sm text-secondaryText line-clamp-2">
                      {t(notification.descriptionKey)}
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
                // Mock action - do nothing
                notificationsDropdown.close();
              }}
              className="w-full py-2.5 px-4 rounded-lg bg-notificationBadgeBg hover:bg-green-700 text-white font-medium text-sm transition-colors"
            >
              READ ALL NOTIFICATIONS
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
