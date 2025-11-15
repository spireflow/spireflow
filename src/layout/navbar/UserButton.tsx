import React, { useState } from "react";
import Link from "next/link";

import { Tooltip } from "../../components/common/Tooltip";
import { UserButtonProps } from "./types";
import { UserIcon } from "../../assets/icons/UserIcon";
import { HistoryIcon } from "../../assets/icons/HistoryIcon";
import { InfoIcon } from "../../assets/icons/InfoIcon";
import { GithubIcon } from "../../assets/icons/GithubIcon";
import { LanguageIcon } from "../../assets/icons/LanguageIcon";
import { CheckIcon } from "../../assets/icons/CheckIcon";
import { MoonIcon } from "../../assets/icons/MoonIcon";
import { SunIcon } from "../../assets/icons/SunIcon";
import { PaletteIcon } from "../../assets/icons/PaletteIcon";
import { Link as NavigationLink } from "../../i18n/navigation";
import { ArrowDownSimpleIcon } from "../../assets/icons/ArrowDownSimpleIcon";
import { DropdownMenuItem } from "./DropdownMenuItem";

export const UserButton = ({
  userIconBtnRef,
  closeMobileMenu,
  userDropdown,
  themeDropdown,
  languageDropdown,
  notificationsDropdown,
  userTooltip,
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
}: UserButtonProps) => {
  const isLoggedIn = session?.isLoggedIn || false;
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const [isAuthMenuOpen, setIsAuthMenuOpen] = useState(false);
  const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false);
  const currentTheme = theme || "light";

  return (
    <div
      className="relative ml-3 xl:ml-0"
      ref={userDropdown.ref}
      onMouseEnter={userTooltip.showTooltip}
      onMouseLeave={userTooltip.hideTooltip}
    >
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
          className={`text-base flex justify-center items-center h-full !outline-0 border border-mainBorder bg-outlinedButtonBg hover:bg-outlinedButtonBgHover text-primaryText stroke-grayIcon fill-grayIcon ${
            isLoggedIn && session?.username
              ? "w-10 sm:w-auto sm:px-3 rounded-full sm:rounded-xl"
              : "w-full rounded-full"
          }`}
          type="button"
          aria-label={t("openUserMenu")}
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
      {userTooltip.isTooltipVisible &&
        !userDropdown.isOpen &&
        !themeDropdown.isOpen &&
        !languageDropdown.isOpen &&
        !notificationsDropdown.isOpen && (
          <div className="absolute top-12 right-4 pointer-events-none hidden xl:flex">
            <Tooltip
              text={t("openUserMenu")}
              className="h-8 px-3 pointer-events-none"
            />
          </div>
        )}
      {userDropdown.isOpen && (
        <div className="absolute right-[0.5rem] text-sm 1xl:text-sm 2xl:text-base xl:right-0 top-10 xl:top-11 mt-2 w-[13.5rem] border border-inputBorder bg-dropdownBg text-primaryText placeholder-secondaryText rounded-md shadow">
          {isLoggedIn ? (
            <>
              {/* Auth Section - Expandable */}
              <DropdownMenuItem
                icon={<UserIcon />}
                label={t("auth")}
                isOpen={isAuthMenuOpen}
                onToggle={() => setIsAuthMenuOpen(!isAuthMenuOpen)}
              >
                <div
                  className="py-2 pr-5 flex hover:bg-dropdownBgHover cursor-pointer text-sm"
                  onClick={() => {
                    userDropdown.close();
                    handleLoginButton();
                  }}
                >
                  <span>{t("signIn")}</span>
                </div>
                <div
                  className="py-2 pr-5 flex hover:bg-dropdownBgHover cursor-pointer text-sm"
                  onClick={() => {
                    userDropdown.close();
                    showSignUpModal();
                  }}
                >
                  <span>{t("register")}</span>
                </div>
                <div
                  className="py-2 pr-5 flex hover:bg-dropdownBgHover cursor-pointer text-sm"
                  onClick={() => {
                    userDropdown.close();
                    showLogoutModal();
                  }}
                >
                  <span>{t("signOut")}</span>
                </div>
                <NavigationLink
                  href="/profile"
                  className="py-2 pr-5 flex hover:bg-dropdownBgHover cursor-pointer text-sm"
                  onClick={() => userDropdown.close()}
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
                  className="py-2 pr-5 flex hover:bg-dropdownBgHover cursor-pointer justify-between items-center text-sm"
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
                  className="py-2 pr-5 flex hover:bg-dropdownBgHover cursor-pointer justify-between items-center text-sm"
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
                    className="py-2 pr-5 flex hover:bg-dropdownBgHover cursor-pointer justify-between items-center text-sm"
                    onClick={() => {
                      selectTheme("light");
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
                    className="py-2 pr-5 flex hover:bg-dropdownBgHover cursor-pointer justify-between items-center text-sm"
                    onClick={() => {
                      selectTheme("dark");
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
                className="px-4 py-2 pr-5 pl-[1rem] flex hover:bg-dropdownBgHover cursor-pointer"
                onClick={() => {
                  userDropdown.close();
                  showChangelogModal();
                }}
              >
                <div className="w-5 flex justify-center items-center text-grayIcon mr-[0.8rem]">
                  <HistoryIcon />
                </div>
                <button>{t("changelog")}</button>
              </div>

              {/* About */}
              <div
                className="px-4 py-2 pr-5 pl-[1rem] flex hover:bg-dropdownBgHover cursor-pointer"
                onClick={() => {
                  userDropdown.close();
                  showAboutModal();
                }}
              >
                <div className="w-5 flex justify-center items-center text-grayIcon mr-[0.8rem]">
                  <InfoIcon />
                </div>
                <button aria-label={t("about")}>{t("about")}</button>
              </div>

              {/* Divider */}
              <div className="border-t border-mainBorder"></div>

              {/* GitHub */}
              <Link
                href="https://github.com/matt765/spireflow"
                target="_blank"
                className="px-4 py-2 pr-5 pl-[1rem] flex hover:bg-dropdownBgHover cursor-pointer"
              >
                <div className="w-5 flex justify-center items-center text-grayIcon mr-[0.8rem] stroke-grayIcon fill-grayIcon">
                  <GithubIcon />
                </div>
                <button>GitHub</button>
              </Link>
            </>
          ) : (
            <>
              {/* Auth Section - Expandable */}
              <DropdownMenuItem
                icon={<UserIcon />}
                label={t("auth")}
                isOpen={isAuthMenuOpen}
                onToggle={() => setIsAuthMenuOpen(!isAuthMenuOpen)}
              >
                <div
                  className="py-2 pr-5 flex hover:bg-dropdownBgHover cursor-pointer text-sm"
                  onClick={() => {
                    userDropdown.close();
                    handleLoginButton();
                  }}
                >
                  <span>{t("signIn")}</span>
                </div>
                <div
                  className="py-2 pr-5 flex hover:bg-dropdownBgHover cursor-pointer text-sm"
                  onClick={() => {
                    userDropdown.close();
                    showSignUpModal();
                  }}
                >
                  <span>{t("register")}</span>
                </div>
                <div
                  className="py-2 pr-5 flex hover:bg-dropdownBgHover cursor-pointer text-sm"
                  onClick={() => {
                    userDropdown.close();
                    showLogoutModal();
                  }}
                >
                  <span>{t("signOut")}</span>
                </div>
                <NavigationLink
                  href="/profile"
                  className="py-2 pr-5 flex hover:bg-dropdownBgHover cursor-pointer text-sm"
                  onClick={() => userDropdown.close()}
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
                  className="py-2 pr-5 flex hover:bg-dropdownBgHover cursor-pointer justify-between items-center text-sm"
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
                  className="py-2 pr-5 flex hover:bg-dropdownBgHover cursor-pointer justify-between items-center text-sm"
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
                    className="py-2 pr-5 flex hover:bg-dropdownBgHover cursor-pointer justify-between items-center text-sm"
                    onClick={() => {
                      selectTheme("light");
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
                    className="py-2 pr-5 flex hover:bg-dropdownBgHover cursor-pointer justify-between items-center text-sm"
                    onClick={() => {
                      selectTheme("dark");
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
                className="px-4 py-2 pr-5 pl-[1rem] flex hover:bg-dropdownBgHover cursor-pointer"
                onClick={() => {
                  userDropdown.close();
                  showChangelogModal();
                }}
              >
                <div className="w-5 flex justify-center items-center text-grayIcon mr-[0.8rem]">
                  <HistoryIcon />
                </div>
                <button>{t("changelog")}</button>
              </div>

              {/* About */}
              <div
                className="px-4 py-2 pr-5 pl-[1rem] flex hover:bg-dropdownBgHover cursor-pointer"
                onClick={() => {
                  userDropdown.close();
                  showAboutModal();
                }}
              >
                <div className="w-5 flex justify-center items-center text-grayIcon mr-[0.8rem]">
                  <InfoIcon />
                </div>
                <button aria-label={t("about")}>{t("about")}</button>
              </div>

              {/* Divider */}
              <div className="border-t border-mainBorder"></div>

              {/* GitHub */}
              <Link
                href="https://github.com/matt765/spireflow"
                target="_blank"
                className="px-4 py-2 pr-5 pl-[1rem] flex hover:bg-dropdownBgHover cursor-pointer"
              >
                <div className="w-5 flex justify-center items-center text-grayIcon mr-[0.8rem] stroke-grayIcon fill-grayIcon">
                  <GithubIcon />
                </div>
                <button>GitHub</button>
              </Link>
            </>
          )}
        </div>
      )}
    </div>
  );
};
