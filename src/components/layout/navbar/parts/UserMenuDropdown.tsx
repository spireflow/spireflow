import Link from "next/link";
import React from "react";

import { CheckIcon } from "../../../../assets/icons/CheckIcon";
import { GithubIcon } from "../../../../assets/icons/GithubIcon";
import { HistoryIcon } from "../../../../assets/icons/HistoryIcon";
import { InfoIcon } from "../../../../assets/icons/InfoIcon";
import { LanguageIcon } from "../../../../assets/icons/LanguageIcon";
import { PaletteIcon } from "../../../../assets/icons/PaletteIcon";
import { SettingsIcon } from "../../../../assets/icons/SettingsIcon";
import { UserIcon } from "../../../../assets/icons/UserIcon";
import { Link as NavigationLink } from "../../../../i18n/navigation";
import { DropdownProps } from "../types";
import { DropdownMenuItem } from "./DropdownMenuItem";

interface UserMenuDropdownProps {
  menuRef: React.RefObject<HTMLDivElement | null>;
  handleMenuKeyDown: (e: React.KeyboardEvent) => void;
  suppressTooltipRef: React.MutableRefObject<boolean>;
  tAuth: (key: string) => string;
  t: (key: string) => string;
  pathname: string;
  currentLanguage: string;
  currentTheme: string;
  isAuthMenuOpen: boolean;
  setIsAuthMenuOpen: (value: boolean) => void;
  isLanguageMenuOpen: boolean;
  setIsLanguageMenuOpen: (value: boolean) => void;
  isThemeMenuOpen: boolean;
  setIsThemeMenuOpen: (value: boolean) => void;
  userDropdown: DropdownProps;
  handleLoginButton: () => void;
  showSignUpModal: () => void;
  showLogoutModal: () => void;
  showChangelogModal: () => void;
  showAboutModal: () => void;
  selectTheme: (theme: string) => void;
  setIsSettingsDrawerOpen: (value: boolean) => void;
}

export const UserMenuDropdown = ({
  menuRef,
  handleMenuKeyDown,
  suppressTooltipRef,
  tAuth,
  t,
  pathname,
  currentLanguage,
  currentTheme,
  isAuthMenuOpen,
  setIsAuthMenuOpen,
  isLanguageMenuOpen,
  setIsLanguageMenuOpen,
  isThemeMenuOpen,
  setIsThemeMenuOpen,
  userDropdown,
  handleLoginButton,
  showSignUpModal,
  showLogoutModal,
  showChangelogModal,
  showAboutModal,
  selectTheme,
  setIsSettingsDrawerOpen,
}: UserMenuDropdownProps) => {
  return (
    <div
      ref={menuRef}
      id="user-dropdown-menu"
      role="menu"
      aria-label="User menu"
      onKeyDown={handleMenuKeyDown}
      className="absolute right-2 text-sm 1xl:text-sm 3xl:text-base xl:right-0 top-10 xl:top-11 mt-2 w-54 border border-inputBorder bg-dropdownBg text-primaryText placeholder-secondaryText rounded-md shadow"
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
          onPointerDown={() => {
            suppressTooltipRef.current = true;
          }}
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
          <span>{tAuth("signIn")}</span>
        </div>
        <div
          tabIndex={-1}
          role="menuitem"
          className="py-2 pr-5 -ml-[3.2rem] pl-[3.2rem] flex hover:bg-dropdownBgHover cursor-pointer text-sm focus-visible:bg-dropdownBgHover"
          onPointerDown={() => {
            suppressTooltipRef.current = true;
          }}
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
          <span>{tAuth("register")}</span>
        </div>
        <div
          tabIndex={-1}
          role="menuitem"
          className="py-2 pr-5 -ml-[3.2rem] pl-[3.2rem] flex hover:bg-dropdownBgHover cursor-pointer text-sm focus-visible:bg-dropdownBgHover"
          onPointerDown={() => {
            suppressTooltipRef.current = true;
          }}
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
          <span>{tAuth("signOut")}</span>
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
          href={pathname}
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
          href={pathname}
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
        className="px-4 py-2 pr-5 pl-4 flex hover:bg-dropdownBgHover cursor-pointer focus-visible:bg-dropdownBgHover"
        onPointerDown={() => {
          suppressTooltipRef.current = true;
        }}
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
        className="px-4 py-2 pr-5 pl-4 flex hover:bg-dropdownBgHover cursor-pointer focus-visible:bg-dropdownBgHover"
        onPointerDown={() => {
          suppressTooltipRef.current = true;
        }}
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
          className="px-4 py-2 pr-5 pl-4 flex hover:bg-dropdownBgHover cursor-pointer focus-visible:bg-dropdownBgHover"
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
          <span>{t("settings")}</span>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-mainBorder"></div>

      {/* GitHub */}
      <Link
        href="https://github.com/matt765/spireflow"
        target="_blank"
        className="px-4 py-2 pr-5 pl-4 flex hover:bg-dropdownBgHover cursor-pointer focus-visible:bg-dropdownBgHover"
        role="menuitem"
        tabIndex={-1}
      >
        <div className="w-5 flex justify-center items-center text-grayIcon mr-[0.8rem] stroke-grayIcon fill-grayIcon">
          <GithubIcon />
        </div>
        <span>{t("githubRepository")}</span>
      </Link>
    </div>
  );
};
