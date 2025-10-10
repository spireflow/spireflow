import React, { useState, useEffect } from "react";

import { ThemeButtonProps } from "./types";
import { MoonIcon } from "../../assets/icons/MoonIcon";
import { SunIcon } from "../../assets/icons/SunIcon";
import { Tooltip } from "../../components/common/Tooltip";

export const ThemeButton = ({
  theme,
  selectTheme,
  themeTooltip,
  userDropdown,
  languageDropdown,
  notificationsDropdown,
  t,
}: ThemeButtonProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const currentTheme = theme || "light";

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const toggleTheme = () => {
    selectTheme(currentTheme === "dark" ? "light" : "dark");
    userDropdown.close();
    languageDropdown.close();
    notificationsDropdown.close();
  };

  return (
    <div
      className="relative"
      onMouseEnter={themeTooltip.showTooltip}
      onMouseLeave={themeTooltip.hideTooltip}
    >
      <div
        className="relative flex items-center bg-secondaryBg border border-mainBorder hover:bg-white/7 rounded-full p-0.5 cursor-pointer"
        onClick={toggleTheme}
        role="button"
        aria-label={t("changeTheme")}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            toggleTheme();
          }
        }}
      >
        {isMounted && (
          <div
            className="absolute left-0.5 top-0.5 w-[42px] h-[2.425rem] bg-themeToggleActiveBg border border-themeToggleActiveBorder rounded-full shadow-sm transition-transform duration-300 ease-out"
            style={{
              transform:
                currentTheme === "dark"
                  ? "translateX(42px)"
                  : "translateX(0px)",
            }}
          />
        )}
        <div
          className={`relative z-10 w-[42px] h-[2.425rem] rounded-full flex items-center justify-center transition-colors duration-200 ${
            isMounted && currentTheme === "light"
              ? "text-primaryText"
              : "text-grayIcon"
          }`}
        >
          <SunIcon />
        </div>
        <div
          className={`relative z-10 w-[42px] h-[2.425rem] rounded-full flex items-center justify-center transition-colors duration-200 ${
            isMounted && currentTheme === "dark"
              ? "text-primaryText"
              : "text-grayIcon"
          }`}
        >
          <MoonIcon />
        </div>
      </div>
      {themeTooltip.isTooltipVisible &&
        !userDropdown.isOpen &&
        !languageDropdown.isOpen &&
        !notificationsDropdown.isOpen && (
          <div className="absolute top-12 left-0 pointer-events-none hidden xl:flex">
            <Tooltip
              text={t("changeTheme")}
              className="h-8 px-3 pointer-events-none"
            />
          </div>
        )}
    </div>
  );
};
