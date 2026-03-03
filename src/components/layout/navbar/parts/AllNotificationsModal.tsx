"use client";

import { RefObject } from "react";

import { BellIcon } from "../../../../assets/icons/BellIcon";
import { CheckIcon } from "../../../../assets/icons/CheckIcon";
import { DocumentIcon } from "../../../../assets/icons/DocumentIcon";
import { UpdateIcon } from "../../../../assets/icons/UpdateIcon";
import { UsersIcon } from "../../../../assets/icons/UsersIcon";
import { Button } from "../../../common/shadcn/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../../../common/shadcn/dialog";
import { useNotificationsModal } from "../hooks/useNotifications";
import type { Notification } from "../hooks/useNotificationsData";

interface AllNotificationsModalProps {
  closeModal: () => void;
  notifications: Notification[];
  onNotificationsUpdate?: (notifications: Notification[]) => void;
  returnFocusRef?: RefObject<HTMLButtonElement | null>;
}

export const AllNotificationsModal = ({
  closeModal,
  notifications,
  onNotificationsUpdate,
  returnFocusRef,
}: AllNotificationsModalProps) => {
  const {
    t,
    filter,
    setFilter,
    filteredNotifications,
    handleMarkAsRead,
    handleMarkAllAsRead,
    newCount,
  } = useNotificationsModal({
    notifications,
    onNotificationsUpdate,
  });

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
    <Dialog open={true} onOpenChange={(open) => !open && closeModal()}>
      <DialogContent
        className="w-full max-w-full h-full md:h-auto md:w-150 md:max-w-150 bg-modalBg shadow-xl px-6 md:px-8 pt-16 md:pt-12 pb-6 flex flex-col md:rounded-2xl border-none"
        onCloseAutoFocus={(e) => {
          if (returnFocusRef?.current) {
            e.preventDefault();
            returnFocusRef.current.focus();
          }
        }}
      >
        <DialogHeader className="sr-only">
          <DialogTitle>{t("title")}</DialogTitle>
          <DialogDescription>{t("title")}</DialogDescription>
        </DialogHeader>

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl md:text-3xl font-semibold text-primaryText">
              {t("title")}
            </h2>
            {newCount > 0 && (
              <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-notificationBadgeBg text-white">
                {newCount} {t("new")}
              </span>
            )}
          </div>

          {/* Filter buttons */}
          <div className="flex gap-3">
            <button
              onClick={() => setFilter("all")}
              aria-current={filter === "all" ? "true" : undefined}
              className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                filter === "all"
                  ? "bg-containedButtonBg text-white"
                  : "bg-outlinedButtonBg text-secondaryText hover:bg-outlinedButtonBgHover border border-outlinedButtonBorder"
              }`}
            >
              {t("all")}
            </button>
            <button
              onClick={() => setFilter("new")}
              aria-current={filter === "new" ? "true" : undefined}
              className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                filter === "new"
                  ? "bg-containedButtonBg text-white"
                  : "bg-outlinedButtonBg text-secondaryText hover:bg-outlinedButtonBgHover border border-outlinedButtonBorder"
              }`}
            >
              {t("new")}
            </button>
          </div>
        </div>

        {/* Notifications list */}
        <div className="overflow-y-auto -mx-6 md:-mx-8 px-6 md:px-8 mb-4 flex-1 md:flex-none md:h-100">
          <div className="space-y-2 pt-0.5">
            {filteredNotifications.length === 0 ? (
              <div className="text-center py-12 text-secondaryText">
                <div className="flex justify-center mb-4">
                  <BellIcon />
                </div>
                <p className="text-lg">{t("noNotifications")}</p>
              </div>
            ) : (
              filteredNotifications.map((notification) => (
                <div
                  key={notification.id}
                  tabIndex={0}
                  role="button"
                  className={`p-3 rounded-lg border transition-colors cursor-pointer focus-visible:-outline-offset-2 ${
                    notification.isNew
                      ? "bg-outlinedButtonBg border-mainBorder hover:bg-notificationItemBgHover"
                      : "bg-primaryBg border-mainBorder hover:bg-notificationItemBgHover opacity-75"
                  }`}
                  onClick={() => handleMarkAsRead(notification.id)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      handleMarkAsRead(notification.id);
                    }
                  }}
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
        <div className="flex justify-end gap-3 pt-4 border-t border-mainBorder mt-auto md:mt-0">
          <Button variant="outline" onClick={closeModal}>
            {t("close")}
          </Button>
          {newCount > 0 && (
            <Button onClick={handleMarkAllAsRead} className="px-6">
              {`${t("markRead")} (${newCount})`}
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
