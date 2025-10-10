import React, { useState, useEffect } from "react";

import { ThemeButtonProps } from "./types";
import { MoonIcon } from "../../assets/icons/MoonIcon";
import { SunIcon } from "../../assets/icons/SunIcon";

export const ThemeButton = ({ theme, selectTheme }: ThemeButtonProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const currentTheme = theme || "light";

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const toggleTheme = () => {
    selectTheme(currentTheme === "dark" ? "light" : "dark");
  };

  return (
    <div
      className="relative flex items-center bg-secondaryBg border border-mainBorder hover:bg-white/7 rounded-full p-0.5 cursor-pointer"
      onClick={toggleTheme}
      role="button"
      aria-label={`Przełącz na motyw ${
        currentTheme === "dark" ? "jasny" : "ciemny"
      }`}
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
              currentTheme === "dark" ? "translateX(42px)" : "translateX(0px)",
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
  );
};
