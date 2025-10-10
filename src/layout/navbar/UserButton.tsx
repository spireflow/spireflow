import React from "react";
import Link from "next/link";

import { Tooltip } from "../../components/common/Tooltip";
import { UserButtonProps } from "./types";
import { UserIcon } from "../../assets/icons/UserIcon";
import { MailIcon } from "../../assets/icons/MailIcon";
import { HistoryIcon } from "../../assets/icons/HistoryIcon";
import { InfoIcon } from "../../assets/icons/InfoIcon";
import { LogoutIcon } from "../../assets/icons/LogoutIcon";
import { GithubIcon } from "../../assets/icons/GithubIcon";

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
  session,
  t,
  searchClose,
}: UserButtonProps) => {
  const isLoggedIn = session?.isLoggedIn || false;

  return (
    <div
      className="relative ml-3 xl:ml-0"
      ref={userDropdown.ref}
      onMouseEnter={userTooltip.showTooltip}
      onMouseLeave={userTooltip.hideTooltip}
    >
      <div className="h-10 w-10">
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
          className="text-base flex rounded-full justify-center items-center gap-2 w-full h-full !outline-0 border border-mainBorder bg-outlinedButtonBg hover:bg-outlinedButtonBgHover text-primaryText stroke-grayIcon fill-grayIcon"
          type="button"
          aria-label={t("openUserMenu")}
        >
          <UserIcon />
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
              <div className="px-4 pr-5 py-2 text-sm 1xl:text-sm  2xl:text-base pl-[0.9rem] border-b border-mainBorder flex hover:bg-dropdownBgHover bg-rgb(0,0,0,0.05)">
                <div className="w-6 flex justify-center items-center mr-3 stroke-grayIcon fill-grayIcon">
                  <MailIcon />
                </div>
                {session?.username || "Email"}
              </div>
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
              <div
                className="px-4 py-2 pr-5 pl-[1rem] flex hover:bg-dropdownBgHover cursor-pointer"
                onClick={() => {
                  userDropdown.close();
                  showLogoutModal();
                }}
              >
                <div className="w-6 flex justify-center items-center mr-[0.6rem] stroke-grayIcon fill-grayIcon">
                  <LogoutIcon />
                </div>
                <button aria-label={t("signOut")}>{t("signOut")}</button>
              </div>
            </>
          ) : (
            <>
              <div
                className="px-4 py-2 pr-5 pl-[1rem] flex hover:bg-dropdownBgHover cursor-pointer border-b border-mainBorder"
                onClick={() => {
                  userDropdown.close();
                  handleLoginButton();
                }}
              >
                <div className="w-6 flex justify-center items-center mr-[0.6rem] stroke-grayIcon fill-grayIcon">
                  <UserIcon />
                </div>
                <button>{t("signIn")}</button>
              </div>
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
            </>
          )}
        </div>
      )}
    </div>
  );
};
