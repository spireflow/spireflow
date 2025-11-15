"use client";

import { useRef, useEffect, useState } from "react";

import { CloseIcon } from "../../../assets/icons/CloseIcon";
import { useCloseModal } from "../../../hooks/useCloseModal";
import { UpdateIcon } from "../../../assets/icons/UpdateIcon";
import { UsersIcon } from "../../../assets/icons/UsersIcon";
import { DocumentIcon } from "../../../assets/icons/DocumentIcon";
import { CheckIcon } from "../../../assets/icons/CheckIcon";
import { BellIcon } from "../../../assets/icons/BellIcon";
import { OutlinedButton } from "../../common/OutlinedButton";
import { ContainedButton } from "../../common/ContainedButton";
import { ModalPortal } from "../../common/ModalPortal";
import type { Notification } from "../../../layout/navbar/hooks/useNotificationsData";

interface AllNotificationsModalProps {
  closeModal: () => void;
  notifications: Notification[];
  onNotificationsUpdate?: (notifications: Notification[]) => void;
}

type FilterType = "all" | "new" | "read";

export const AllNotificationsModal = ({
  closeModal,
  notifications,
  onNotificationsUpdate,
}: AllNotificationsModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [filter, setFilter] = useState<FilterType>("all");
  const [localNotifications, setLocalNotifications] =
    useState<Notification[]>(notifications);

  useCloseModal(modalRef, closeModal);

  // Block body scroll when modal is open
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    const originalPaddingRight = document.body.style.paddingRight;
    const originalBackground = document.body.style.background;

    // Calculate scrollbar width
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    // Get the scrollbar placeholder color from CSS variable
    const scrollbarPlaceholderBg = getComputedStyle(document.documentElement)
      .getPropertyValue("--scrollbarPlaceholderBg")
      .trim();

    // Add padding to compensate for scrollbar removal and set background
    document.body.style.paddingRight = `${scrollbarWidth}px`;
    document.body.style.overflow = "hidden";
    if (scrollbarWidth > 0) {
      document.body.style.background = `linear-gradient(to right, transparent calc(100% - ${scrollbarWidth}px), ${scrollbarPlaceholderBg} calc(100% - ${scrollbarWidth}px))`;
    }

    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.paddingRight = originalPaddingRight;
      document.body.style.background = originalBackground;
    };
  }, []);

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

  const filteredNotifications = localNotifications.filter((n) => {
    if (filter === "new") return n.isNew;
    if (filter === "read") return !n.isNew;
    return true;
  });

  const handleMarkAsRead = (id: string) => {
    setLocalNotifications((prev) => {
      const updated = prev.map((n) =>
        n.id === id ? { ...n, isNew: false } : n
      );
      onNotificationsUpdate?.(updated);
      return updated;
    });
  };

  const handleMarkAllAsRead = () => {
    setLocalNotifications((prev) => {
      const updated = prev.map((n) => ({ ...n, isNew: false }));
      onNotificationsUpdate?.(updated);
      return updated;
    });
  };

  const newCount = localNotifications.filter((n) => n.isNew).length;

  return (
    <ModalPortal>
      <div className="alternativeScrollbar">
        <div className="fixed w-screen h-screen bg-[rgb(0,0,0,0.35)] top-0 left-0 z-[9997]" />
        <div className="fixed w-screen h-full flex justify-center items-center top-0 left-0 z-[9999]">
          <div
            ref={modalRef}
            className="w-full h-full md:w-[37.5rem] md:h-auto bg-modalBg shadow-xl px-6 md:px-8 pt-16 md:pt-12 pb-6 flex flex-col md:rounded-2xl relative"
          >
            {/* Close button */}
            <button
              onClick={closeModal}
              aria-label="Close modal"
              className="absolute top-4 right-2 text-xl fill-secondaryText stroke-secondaryText hover:stroke-secondaryTextHover hover:fill-secondaryTextHover transition-colors"
            >
              <CloseIcon />
            </button>

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-4">
                <h2 className="text-2xl md:text-3xl font-semibold text-primaryText">
                  Notifications
                </h2>
                {newCount > 0 && (
                  <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-notificationBadgeBg text-white">
                    {newCount} New
                  </span>
                )}
              </div>

              {/* Filter buttons */}
              <div className="flex gap-3">
                <button
                  onClick={() => setFilter("all")}
                  className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                    filter === "all"
                      ? "bg-containedButtonBg text-white"
                      : "bg-outlinedButtonBg text-secondaryText hover:bg-outlinedButtonBgHover border border-outlinedButtonBorder"
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setFilter("new")}
                  className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                    filter === "new"
                      ? "bg-containedButtonBg text-white"
                      : "bg-outlinedButtonBg text-secondaryText hover:bg-outlinedButtonBgHover border border-outlinedButtonBorder"
                  }`}
                >
                  New
                </button>
              </div>
            </div>

            {/* Notifications list */}
            <div className="overflow-y-auto -mx-6 md:-mx-8 px-6 md:px-8 mb-4 h-[calc(100vh-20rem)] md:h-[400px]">
              <div className="space-y-2">
                {filteredNotifications.length === 0 ? (
                  <div className="text-center py-12 text-secondaryText">
                    <div className="flex justify-center mb-4">
                      <BellIcon />
                    </div>
                    <p className="text-lg">No notifications to display</p>
                  </div>
                ) : (
                  filteredNotifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-3 rounded-lg border transition-all cursor-pointer ${
                        notification.isNew
                          ? "bg-outlinedButtonBg border-mainBorder hover:bg-notificationItemBgHover"
                          : "bg-primaryBg border-mainBorder hover:bg-notificationItemBgHover opacity-75"
                      }`}
                      onClick={() => handleMarkAsRead(notification.id)}
                    >
                      <div className="flex gap-3">
                        {/* Icon */}
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
                          <p className="text-sm text-secondaryText leading-snug">
                            {notification.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Footer actions */}
            <div className="flex justify-end gap-3 pt-4 border-t border-mainBorder">
              <div className="w-auto">
                <OutlinedButton text="Close" handleClick={closeModal} />
              </div>
              {newCount > 0 && (
                <div className="w-auto">
                  <ContainedButton
                    text={`Mark Read (${newCount})`}
                    handleClick={handleMarkAllAsRead}
                    className="px-6"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </ModalPortal>
  );
};
