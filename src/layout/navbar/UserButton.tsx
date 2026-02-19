import React, { useState, useCallback, useRef } from "react";
import Link from "next/link";

import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "../../components/common/shadcn/tooltip";
import { UserButtonProps } from "./types";
import { UserIcon } from "../../assets/icons/UserIcon";
import { HistoryIcon } from "../../assets/icons/HistoryIcon";
import { InfoIcon } from "../../assets/icons/InfoIcon";
import { GithubIcon } from "../../assets/icons/GithubIcon";
import { LanguageIcon } from "../../assets/icons/LanguageIcon";
import { CheckIcon } from "../../assets/icons/CheckIcon";
import { PaletteIcon } from "../../assets/icons/PaletteIcon";
import { SettingsIcon } from "../../assets/icons/SettingsIcon";
import { Link as NavigationLink } from "../../i18n/navigation";
import { ArrowDownSimpleIcon } from "../../assets/icons/ArrowDownSimpleIcon";
import { DropdownMenuItem } from "./DropdownMenuItem";
import { SettingsDrawer } from "../SettingsDrawer";

export const UserButton = ({
  userIconBtnRef,
  closeMobileMenu,
  userDropdown,
  themeDropdown,
  languageDropdown,
  notificationsDropdown,
  showLogoutModal,
  showAboutModal,
  showChangelogModal,
  handleLoginButton,
  showSignUpModal,
  session,
  t,
  searchClose,
  currentLanguage,
  theme,
  selectTheme,
}: Omit<UserButtonProps, "userTooltip">) => {
  const isLoggedIn = session?.isLoggedIn || false;
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const [isAuthMenuOpen, setIsAuthMenuOpen] = useState(false);
  const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false);
  const [isSettingsDrawerOpen, setIsSettingsDrawerOpen] = useState(false);
  const currentTheme = theme || "light";

  const isAnyDropdownOpen =
    userDropdown.isOpen ||
    themeDropdown.isOpen ||
    languageDropdown.isOpen ||
    notificationsDropdown.isOpen;

  const menuRef = useRef<HTMLDivElement>(null);

  const getMenuItems = useCallback((): HTMLElement[] => {
    if (!menuRef.current) return [];
    return Array.from(
      menuRef.current.querySelectorAll<HTMLElement>('[role="menuitem"]')
    ).filter((el) => el.offsetParent !== null);
  }, []);

  const focusItem = useCallback((index: number) => {
    const items = getMenuItems();
    if (items.length === 0) return;
    const newIndex = ((index % items.length) + items.length) % items.length;
    items[newIndex]?.focus();
  }, [getMenuItems]);

  const handleTriggerKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Escape" && userDropdown.isOpen) {
        e.preventDefault();
        userDropdown.close();
        userIconBtnRef?.current?.focus();
      }
      if ((e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") && !userDropdown.isOpen) {
        e.preventDefault();
        userDropdown.toggle();
        themeDropdown.close();
        languageDropdown.close();
        notificationsDropdown.close();
        searchClose();
        setTimeout(() => focusItem(0), 0);
      }
    },
    [userDropdown, themeDropdown, languageDropdown, notificationsDropdown, searchClose, focusItem, userIconBtnRef]
  );

  const handleMenuKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      const items = getMenuItems();
      const currentIndex = items.findIndex(
        (item) => item === document.activeElement
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
    [focusItem, getMenuItems, userDropdown, userIconBtnRef]
  );

  return (
    <div className="relative ml-3 xl:ml-0" ref={userDropdown.ref}>
      <Tooltip delayDuration={200}>
        <TooltipTrigger asChild>
          <div className={isLoggedIn ? "h-10 w-auto sm:w-auto" : "h-10 w-10"}>
            <button
              ref={userIconBtnRef}
              onClick={() => {
                closeMobileMenu();
                userDropdown.toggle();
                themeDropdown.close();
                languageDropdown.close();
                notificationsDropdown.close();
                searchClose();
              }}
              onKeyDown={handleTriggerKeyDown}
              className={`text-base flex justify-center items-center h-full border border-mainBorder bg-outlinedButtonBg hover:bg-navbarIconButtonBgHover text-primaryText stroke-grayIcon fill-grayIcon ${
                isLoggedIn && session?.username
                  ? "w-10 sm:w-auto sm:px-3 rounded-full sm:rounded-xl"
                  : "w-full rounded-full"
              }`}
              type="button"
              aria-label={t("openUserMenu")}
              aria-haspopup="menu"
              aria-expanded={userDropdown.isOpen}
              aria-controls="user-dropdown-menu"
            >
              <UserIcon />
              {isLoggedIn && session?.username && (
                <>
                  <span className="hidden sm:inline text-sm font-medium text-primaryText whitespace-nowrap ml-2 mr-2">
                    {session.username}
                  </span>
                  <div className="hidden sm:block text-secondaryText w-5 h-5 ml-2">
                    <ArrowDownSimpleIcon />
                  </div>
                </>
              )}
            </button>
          </div>
        </TooltipTrigger>
        {!isAnyDropdownOpen && (
          <TooltipContent
            side="bottom"
            align="start"
            alignOffset={0}
            className="hidden xl:block"
          >
            {t("openUserMenu")}
          </TooltipContent>
        )}
      </Tooltip>
      {userDropdown.isOpen && (
        <div
          ref={menuRef}
          id="user-dropdown-menu"
          role="menu"
          aria-label={t("openUserMenu")}
          onKeyDown={handleMenuKeyDown}
          className="absolute right-[0.5rem] text-sm 1xl:text-sm 3xl:text-base xl:right-0 top-10 xl:top-11 mt-2 w-[13.5rem] border border-inputBorder bg-dropdownBg text-primaryText placeholder-secondaryText rounded-md shadow"
        >
          {/* Auth Section - Expandable */}
          <DropdownMenuItem
            icon={<UserIcon />}
            label={t("auth")}
            isOpen={isAuthMenuOpen}
            onToggle={() => setIsAuthMenuOpen(!isAuthMenuOpen)}
          >
            <div
              tabIndex={-1}
              role="menuitem"
              className="py-2 pr-5 -ml-[3.2rem] pl-[3.2rem] flex hover:bg-dropdownBgHover cursor-pointer text-sm focus-visible:bg-dropdownBgHover"
              onClick={() => {
                userDropdown.close();
                handleLoginButton();
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  userDropdown.close();
                  handleLoginButton();
                }
              }}
            >
              <span>{t("signIn")}</span>
            </div>
            <div
              tabIndex={-1}
              role="menuitem"
              className="py-2 pr-5 -ml-[3.2rem] pl-[3.2rem] flex hover:bg-dropdownBgHover cursor-pointer text-sm focus-visible:bg-dropdownBgHover"
              onClick={() => {
                userDropdown.close();
                showSignUpModal();
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  userDropdown.close();
                  showSignUpModal();
                }
              }}
            >
              <span>{t("register")}</span>
            </div>
            <div
              tabIndex={-1}
              role="menuitem"
              className="py-2 pr-5 -ml-[3.2rem] pl-[3.2rem] flex hover:bg-dropdownBgHover cursor-pointer text-sm focus-visible:bg-dropdownBgHover"
              onClick={() => {
                userDropdown.close();
                showLogoutModal();
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  userDropdown.close();
                  showLogoutModal();
                }
              }}
            >
              <span>{t("signOut")}</span>
            </div>
            <NavigationLink
              href="/profile"
              className="py-2 pr-5 -ml-[3.2rem] pl-[3.2rem] flex hover:bg-dropdownBgHover cursor-pointer text-sm focus-visible:bg-dropdownBgHover"
              onClick={() => userDropdown.close()}
              role="menuitem"
              tabIndex={-1}
            >
              <span>{t("userProfile")}</span>
            </NavigationLink>
          </DropdownMenuItem>

          {/* Language Section - Expandable */}
          <DropdownMenuItem
            icon={<LanguageIcon />}
            label={t("language")}
            isOpen={isLanguageMenuOpen}
            onToggle={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
          >
            <NavigationLink
              href="/"
              locale="en"
              className="py-2 pr-5 -ml-[3.2rem] pl-[3.2rem] flex hover:bg-dropdownBgHover cursor-pointer justify-between items-center text-sm focus-visible:bg-dropdownBgHover"
              role="menuitem"
              tabIndex={-1}
            >
              <span>{t("english")}</span>
              {currentLanguage === "en" && (
                <div className="text-secondaryText">
                  <CheckIcon />
                </div>
              )}
            </NavigationLink>
            <NavigationLink
              href="/"
              locale="pl"
              className="py-2 pr-5 -ml-[3.2rem] pl-[3.2rem] flex hover:bg-dropdownBgHover cursor-pointer justify-between items-center text-sm focus-visible:bg-dropdownBgHover"
              role="menuitem"
              tabIndex={-1}
            >
              <span>{t("polish")}</span>
              {currentLanguage === "pl" && (
                <div className="text-secondaryText">
                  <CheckIcon />
                </div>
              )}
            </NavigationLink>
          </DropdownMenuItem>

          {/* Theme Section - Expandable (visible only below xl) */}
          <div className="xl:hidden">
            <DropdownMenuItem
              icon={<PaletteIcon />}
              label={t("theme")}
              isOpen={isThemeMenuOpen}
              onToggle={() => setIsThemeMenuOpen(!isThemeMenuOpen)}
            >
              <div
                tabIndex={-1}
                role="menuitem"
                className="py-2 pr-5 -ml-[3.2rem] pl-[3.2rem] flex hover:bg-dropdownBgHover cursor-pointer justify-between items-center text-sm focus-visible:bg-dropdownBgHover"
                onClick={() => selectTheme("light")}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    selectTheme("light");
                  }
                }}
              >
                <span>{t("light")}</span>
                {currentTheme === "light" && (
                  <div className="text-secondaryText">
                    <CheckIcon />
                  </div>
                )}
              </div>
              <div
                tabIndex={-1}
                role="menuitem"
                className="py-2 pr-5 -ml-[3.2rem] pl-[3.2rem] flex hover:bg-dropdownBgHover cursor-pointer justify-between items-center text-sm focus-visible:bg-dropdownBgHover"
                onClick={() => selectTheme("dark")}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    selectTheme("dark");
                  }
                }}
              >
                <span>{t("dark")}</span>
                {currentTheme === "dark" && (
                  <div className="text-secondaryText">
                    <CheckIcon />
                  </div>
                )}
              </div>
            </DropdownMenuItem>
          </div>

          {/* Divider */}
          <div className="border-t border-mainBorder"></div>

          {/* Changelog */}
          <div
            tabIndex={-1}
            role="menuitem"
            className="px-4 py-2 pr-5 pl-[1rem] flex hover:bg-dropdownBgHover cursor-pointer focus-visible:bg-dropdownBgHover"
            onClick={() => {
              userDropdown.close();
              showChangelogModal();
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                userDropdown.close();
                showChangelogModal();
              }
            }}
          >
            <div className="w-5 flex justify-center items-center text-grayIcon mr-[0.8rem]">
              <HistoryIcon />
            </div>
            <span>{t("changelog")}</span>
          </div>

          {/* About */}
          <div
            tabIndex={-1}
            role="menuitem"
            className="px-4 py-2 pr-5 pl-[1rem] flex hover:bg-dropdownBgHover cursor-pointer focus-visible:bg-dropdownBgHover"
            onClick={() => {
              userDropdown.close();
              showAboutModal();
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                userDropdown.close();
                showAboutModal();
              }
            }}
          >
            <div className="w-5 flex justify-center items-center text-grayIcon mr-[0.8rem]">
              <InfoIcon />
            </div>
            <span>{t("about")}</span>
          </div>

          {/* Settings - Mobile Only */}
          <div className="xl:hidden">
            <div
              tabIndex={-1}
              role="menuitem"
              className="px-4 py-2 pr-5 pl-[1rem] flex hover:bg-dropdownBgHover cursor-pointer focus-visible:bg-dropdownBgHover"
              onClick={() => {
                userDropdown.close();
                setIsSettingsDrawerOpen(true);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  userDropdown.close();
                  setIsSettingsDrawerOpen(true);
                }
              }}
            >
              <div className="w-5 flex justify-center items-center text-grayIcon mr-[0.8rem]">
                <SettingsIcon />
              </div>
              <span>Settings</span>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-mainBorder"></div>

          {/* GitHub */}
          <Link
            href="https://github.com/matt765/spireflow"
            target="_blank"
            className="px-4 py-2 pr-5 pl-[1rem] flex hover:bg-dropdownBgHover cursor-pointer focus-visible:bg-dropdownBgHover"
            role="menuitem"
            tabIndex={-1}
          >
            <div className="w-5 flex justify-center items-center text-grayIcon mr-[0.8rem] stroke-grayIcon fill-grayIcon">
              <GithubIcon />
            </div>
            <span>GitHub</span>
          </Link>
        </div>
      )}
      <SettingsDrawer open={isSettingsDrawerOpen} onOpenChange={setIsSettingsDrawerOpen} />
    </div>
  );
};
