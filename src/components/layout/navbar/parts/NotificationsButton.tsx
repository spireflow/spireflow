import { BellIcon } from "@/assets/icons/BellIcon";
import { CheckIcon } from "@/assets/icons/CheckIcon";
import { DocumentIcon } from "@/assets/icons/DocumentIcon";
import { UpdateIcon } from "@/assets/icons/UpdateIcon";
import { UsersIcon } from "@/assets/icons/UsersIcon";
import { Badge } from "@/components/common/shadcn/badge";
import { Button } from "@/components/common/shadcn/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/common/shadcn/tooltip";
import { BREAKPOINTS } from "@/styles/breakpoints";

import { useNotifications } from "../hooks/useNotifications";
import { NAVBAR_TOOLTIPS_ENABLED, NotificationsButtonProps } from "../types";
import { AllNotificationsModal } from "./AllNotificationsModal";

export const NotificationsButton = ({
  notificationsDropdown,
  navbarDropdowns,
  closeMobileMenu,
  t,
}: Omit<NotificationsButtonProps, "notificationsTooltip">) => {
  const {
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
  } = useNotifications({
    notificationsDropdown,
    isAnyOtherDropdownOpen: navbarDropdowns.isAnyDropdownOpen,
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
              tabIndex={0}
              onClick={(e) => {
                setTooltipOpen(false);
                /** On mobile (<xl), open modal directly */
                if (window.innerWidth < BREAKPOINTS.xl) {
                  if (e.detail > 0) suppressTooltipRef.current = true;
                  closeMobileMenu();
                  setIsAllNotificationsModalOpen(true);
                } else {
                  notificationsDropdown.toggle();
                  setHighlightedIndex(-1);
                }
                navbarDropdowns.closeAllExcept("notifications");
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
        {NAVBAR_TOOLTIPS_ENABLED && !isAnyDropdownOpen && (
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
          className="hidden xl:block absolute right-0 top-10 xl:top-11 mt-2 w-88 border border-inputBorder bg-dropdownBg text-primaryText rounded-md shadow-lg overflow-hidden animate-navbar-dropdown"
        >
          {/* Header */}
          <div className="px-5 py-3 border-b border-mainBorder flex justify-between items-center bg-notificationHeaderBg">
            <h3 className="font-semibold text-base">
              {tNotifications("title")}
            </h3>
            {newNotificationsCount > 0 && (
              <Badge>
                {newNotificationsCount} {tNotifications("new")}
              </Badge>
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
                  /** Mark as read */
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
            <Button
              className="w-full"
              onPointerDown={() => {
                suppressTooltipRef.current = true;
              }}
              onClick={() => {
                setIsAllNotificationsModalOpen(true);
                notificationsDropdown.close();
              }}
            >
              {tNotifications("readAll")}
            </Button>
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
