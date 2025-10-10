import React from "react";

import { Tooltip } from "../../components/common/Tooltip";
import { Dropdown } from "../../components/common/Dropdown";
import { LanguageButtonProps } from "./types";
import { Link as NavigationLink } from "../../i18n/navigation";
import { LanguageIcon } from "../../assets/icons/LanguageIcon";
import { CheckIcon } from "../../assets/icons/CheckIcon";

export const LanguageButton = ({
  currentLanguage,
  languageTooltip,
  languageDropdown,
  themeDropdown,
  userDropdown,
  notificationsDropdown,
  t,
}: LanguageButtonProps) => (
  <div
    className="relative"
    ref={languageDropdown.ref}
    onMouseEnter={languageTooltip.showTooltip}
    onMouseLeave={languageTooltip.hideTooltip}
  >
    <button
      onClick={() => {
        themeDropdown.close();
        languageDropdown.toggle();
        userDropdown.close();
        notificationsDropdown.close();
      }}
      aria-label={t("changeLanguage")}
      className="flex justify-center items-center text-secondaryText hover:text-primaryText"
    >
      <LanguageIcon />
    </button>
    {languageTooltip.isTooltipVisible &&
      !themeDropdown.isOpen &&
      !userDropdown.isOpen &&
      !languageDropdown.isOpen &&
      !notificationsDropdown.isOpen && (
        <div className="absolute top-10 right-3 hidden xl:flex">
          <Tooltip text={t("changeLanguage")} className="h-8 px-3" />
        </div>
      )}
    {languageDropdown.isOpen && (
      <Dropdown className="flex flex-col right-0 top-11 w-36">
        <NavigationLink
          href="/"
          locale="en"
          className="text-sm 1xl:text-sm 2xl:text-base h-10 cursor-pointer px-4 hover:bg-dropdownBgHover py-2 flex justify-between"
        >
          {t("english")}
          {currentLanguage === "en" && (
            <div className="text-secondaryText">
              <CheckIcon />
            </div>
          )}
        </NavigationLink>
        <NavigationLink
          href="/"
          locale="pl"
          className="text-sm 1xl:text-sm 2xl:text-base h-10 cursor-pointer px-4 hover:bg-dropdownBgHover py-2 flex justify-between"
        >
          {t("polish")}
          {currentLanguage === "pl" && (
            <div className="text-secondaryText">
              <CheckIcon />
            </div>
          )}
        </NavigationLink>
      </Dropdown>
    )}
  </div>
);
