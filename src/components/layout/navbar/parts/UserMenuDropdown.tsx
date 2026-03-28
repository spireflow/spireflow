import Link from "next/link";

import { CheckIcon } from "@/assets/icons/CheckIcon";
import { GithubIcon } from "@/assets/icons/GithubIcon";
import { HistoryIcon } from "@/assets/icons/HistoryIcon";
import { InfoIcon } from "@/assets/icons/InfoIcon";
import { LanguageIcon } from "@/assets/icons/LanguageIcon";
import { LogoutIcon } from "@/assets/icons/LogoutIcon";
import { PaletteIcon } from "@/assets/icons/PaletteIcon";
import { SettingsIcon } from "@/assets/icons/SettingsIcon";
import { UsersIcon } from "@/assets/icons/UsersIcon";
import { Link as NavigationLink } from "@/i18n/navigation";

import { UserMenuDropdownProps } from "../types";
import { DropdownMenuItem } from "./DropdownMenuItem";

export const UserMenuDropdown = ({
  menuRef,
  handleMenuKeyDown,
  suppressTooltipRef,
  t,
  pathname,
  currentLanguage,
  currentTheme,
  subMenuState,
  userDropdown,
  modalActions,
  selectTheme,
}: UserMenuDropdownProps) => {
  return (
    <div
      ref={menuRef}
      id="user-dropdown-menu"
      role="menu"
      aria-label="User menu"
      onKeyDown={handleMenuKeyDown}
      className="absolute right-2 text-sm xl:right-0 top-10 xl:top-11 mt-2 w-54 border border-inputBorder bg-dropdownBg text-primaryText placeholder-secondaryText rounded-md shadow animate-navbar-dropdown"
    >
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
          modalActions.showAbout();
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            userDropdown.close();
            modalActions.showAbout();
          }
        }}
      >
        <div className="w-5 flex justify-center items-center text-grayIcon mr-[0.8rem]">
          <InfoIcon />
        </div>
        <span>{t("about")}</span>
      </div>

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
          modalActions.showChangelog();
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            userDropdown.close();
            modalActions.showChangelog();
          }
        }}
      >
        <div className="w-5 flex justify-center items-center text-grayIcon mr-[0.8rem]">
          <HistoryIcon />
        </div>
        <span>{t("changelog")}</span>
      </div>

      {/* Contributing */}
      <div
        tabIndex={-1}
        role="menuitem"
        className="px-4 py-2 pr-5 pl-4 flex hover:bg-dropdownBgHover cursor-pointer focus-visible:bg-dropdownBgHover"
        onPointerDown={() => {
          suppressTooltipRef.current = true;
        }}
        onClick={() => {
          userDropdown.close();
          modalActions.showContributing();
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            userDropdown.close();
            modalActions.showContributing();
          }
        }}
      >
        <div className="w-5 flex justify-center items-center text-grayIcon mr-[0.8rem] stroke-grayIcon fill-grayIcon">
          <UsersIcon />
        </div>
        <span>{t("contributing")}</span>
      </div>

      {/* GitHub */}
      <Link
        href="https://github.com/nellavio/nellavio"
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

      {/* Divider */}
      <div className="border-t border-mainBorder"></div>

      {/* Language Section - Expandable */}
      <DropdownMenuItem
        icon={<LanguageIcon />}
        label={t("language")}
        isOpen={subMenuState.isLanguageMenuOpen}
        onToggle={() =>
          subMenuState.setIsLanguageMenuOpen(!subMenuState.isLanguageMenuOpen)
        }
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
          isOpen={subMenuState.isThemeMenuOpen}
          onToggle={() =>
            subMenuState.setIsThemeMenuOpen(!subMenuState.isThemeMenuOpen)
          }
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

      {/* Settings */}
      <div
        tabIndex={-1}
        role="menuitem"
        className="px-4 py-2 pr-5 pl-4 flex hover:bg-dropdownBgHover cursor-pointer focus-visible:bg-dropdownBgHover"
        onClick={() => {
          userDropdown.close();
          subMenuState.setIsSettingsDrawerOpen(true);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            userDropdown.close();
            subMenuState.setIsSettingsDrawerOpen(true);
          }
        }}
      >
        <div className="w-5 flex justify-center items-center text-grayIcon mr-[0.8rem]">
          <SettingsIcon />
        </div>
        <span>{t("settings")}</span>
      </div>

      {/* Divider */}
      <div className="border-t border-mainBorder"></div>

      {/* Sign Out */}
      <div
        tabIndex={-1}
        role="menuitem"
        className="px-4 py-2 pr-5 pl-4 flex hover:bg-dropdownBgHover cursor-pointer focus-visible:bg-dropdownBgHover"
        onPointerDown={() => {
          suppressTooltipRef.current = true;
        }}
        onClick={() => {
          userDropdown.close();
          modalActions.showLogout();
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            userDropdown.close();
            modalActions.showLogout();
          }
        }}
      >
        <div className="w-5 flex justify-center items-center text-grayIcon mr-[0.8rem] stroke-grayIcon">
          <LogoutIcon />
        </div>
        <span>{t("signOut")}</span>
      </div>
    </div>
  );
};
