"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import { MoonIcon } from "@/assets/icons/MoonIcon";
import { SunIcon } from "@/assets/icons/SunIcon";

export const ThemeButtonAuth = () => {
  const { theme, setTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  if (!isMounted) return null;

  return (
    <button
      onClick={toggleTheme}
      tabIndex={0}
      className="fixed top-3 right-3 sm:top-5 sm:right-6 z-50 flex items-center justify-center p-2 rounded-[10px] cursor-pointer bg-authThemeButtonBg border border-authThemeButtonBorder text-grayIcon transition-all duration-200 hover:bg-authThemeButtonBgHover hover:border-authThemeButtonBorderHover hover:text-primaryText focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focusVisibleBorder"
      aria-label="Toggle color theme"
      type="button"
    >
      {theme === "dark" ? <MoonIcon /> : <SunIcon />}
    </button>
  );
};
