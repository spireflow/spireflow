import { useTranslations } from "next-intl";
import React, {
  RefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import { usePathname } from "../../../../i18n/navigation";
import { DropdownProps } from "../types";

interface UseUserMenuParams {
  userIconBtnRef: RefObject<HTMLButtonElement | null>;
  userDropdown: DropdownProps;
  themeDropdown: DropdownProps;
  languageDropdown: DropdownProps;
  notificationsDropdown: DropdownProps;
  searchClose: () => void;
  session: {
    username?: string | null;
    isLoggedIn?: boolean;
  } | null;
  theme: string | undefined;
}

/**
 * Manages the user menu dropdown — sub-menu visibility (language, auth, theme, settings),
 * tooltip suppression on tab-switch, and full roving-focus keyboard navigation
 * following WAI-ARIA `role="menu"` patterns.
 */
export const useUserMenu = ({
  userIconBtnRef,
  userDropdown,
  themeDropdown,
  languageDropdown,
  notificationsDropdown,
  searchClose,
  session,
  theme,
}: UseUserMenuParams) => {
  const tAuth = useTranslations("auth");
  const isLoggedIn = session?.isLoggedIn || false;
  const pathname = usePathname();
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const [isAuthMenuOpen, setIsAuthMenuOpen] = useState(false);
  const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false);
  const [isSettingsDrawerOpen, setIsSettingsDrawerOpen] = useState(false);
  const currentTheme = theme || "light";
  /** Blocks tooltip open until next pointer move or keyboard focus */
  const suppressTooltipRef = useRef(false);
  const [tooltipOpen, setTooltipOpen] = useState(false);

  const isAnyDropdownOpen =
    userDropdown.isOpen ||
    themeDropdown.isOpen ||
    languageDropdown.isOpen ||
    notificationsDropdown.isOpen;

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

  const menuRef = useRef<HTMLDivElement>(null);

  /**
   * Queries all visible `[role="menuitem"]` elements inside the dropdown.
   * Filters out hidden items (`offsetParent === null`) so keyboard
   * navigation skips conditionally rendered entries.
   */
  const getMenuItems = useCallback((): HTMLElement[] => {
    if (!menuRef.current) return [];
    return Array.from(
      menuRef.current.querySelectorAll<HTMLElement>('[role="menuitem"]'),
    ).filter((el) => el.offsetParent !== null);
  }, []);

  /**
   * Focuses a menu item by index with wrapping via modular arithmetic.
   * Passing -1 wraps to the last item; passing `length` wraps to the first.
   */
  const focusItem = useCallback(
    (index: number) => {
      const items = getMenuItems();
      if (items.length === 0) return;
      const newIndex = ((index % items.length) + items.length) % items.length;
      items[newIndex]?.focus();
    },
    [getMenuItems],
  );

  /**
   * Keyboard handler for the user button trigger. Escape closes & restores focus,
   * Enter/Space/ArrowDown opens & focuses first item (setTimeout defers until mount).
   */
  const handleTriggerKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Escape" && userDropdown.isOpen) {
        e.preventDefault();
        userDropdown.close();
        userIconBtnRef?.current?.focus();
      }
      if (
        (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") &&
        !userDropdown.isOpen
      ) {
        e.preventDefault();
        userDropdown.toggle();
        themeDropdown.close();
        languageDropdown.close();
        notificationsDropdown.close();
        searchClose();
        setTimeout(() => focusItem(0), 0);
      }
    },
    [
      userDropdown,
      themeDropdown,
      languageDropdown,
      notificationsDropdown,
      searchClose,
      focusItem,
      userIconBtnRef,
    ],
  );

  /**
   * Roving keyboard navigation within the open dropdown. Arrows cycle items,
   * Home/End jump to edges, Escape/Tab close and restore trigger focus.
   */
  const handleMenuKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      const items = getMenuItems();
      const currentIndex = items.findIndex(
        (item) => item === document.activeElement,
      );
      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          focusItem(currentIndex + 1);
          break;
        case "ArrowUp":
          e.preventDefault();
          focusItem(currentIndex - 1);
          break;
        case "Home":
          e.preventDefault();
          focusItem(0);
          break;
        case "End":
          e.preventDefault();
          focusItem(items.length - 1);
          break;
        case "Escape":
          e.preventDefault();
          userDropdown.close();
          userIconBtnRef?.current?.focus();
          break;
        case "Tab":
          userDropdown.close();
          break;
      }
    },
    [focusItem, getMenuItems, userDropdown, userIconBtnRef],
  );

  return {
    tAuth,
    isLoggedIn,
    pathname,
    isLanguageMenuOpen,
    setIsLanguageMenuOpen,
    isAuthMenuOpen,
    setIsAuthMenuOpen,
    isThemeMenuOpen,
    setIsThemeMenuOpen,
    isSettingsDrawerOpen,
    setIsSettingsDrawerOpen,
    currentTheme,
    suppressTooltipRef,
    tooltipOpen,
    setTooltipOpen,
    isAnyDropdownOpen,
    menuRef,
    handleTriggerKeyDown,
    handleMenuKeyDown,
  };
};
