import { useEffect, useRef, useState } from "react";

import { DropdownProps } from "../types";

/**
 * Manages the theme toggle slider state and its tooltip suppression logic.
 * Closes other dropdowns on theme switch to keep the UI clean.
 */
export const useThemeChange = ({
  theme,
  selectTheme,
  userDropdown,
  languageDropdown,
  notificationsDropdown,
}: {
  theme: string | undefined;
  selectTheme: (theme: string) => void;
  userDropdown: DropdownProps;
  languageDropdown: DropdownProps;
  notificationsDropdown: DropdownProps;
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const currentTheme = theme || "light";
  const [sliderDark, setSliderDark] = useState(currentTheme === "dark");

  /** Blocks tooltip open until next pointer move or keyboard focus */
  const suppressTooltipRef = useRef(false);
  const [tooltipOpen, setTooltipOpen] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  /** Prevents tooltip from showing when Firefox re-fires hover events on tab switch */
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        suppressTooltipRef.current = true;
        setTooltipOpen(false);
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  /**
   * Syncs the slider visual position with the current theme after a brief delay.
   * The 10ms timeout ensures the CSS transition plays smoothly instead of snapping.
   */
  useEffect(() => {
    const timeout = setTimeout(() => {
      setSliderDark(currentTheme === "dark");
    }, 10);
    return () => clearTimeout(timeout);
  }, [currentTheme]);

  const themeChangeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );

  /** Clean up pending theme-change timeout on unmount */
  useEffect(() => {
    return () => {
      if (themeChangeTimeoutRef.current) {
        clearTimeout(themeChangeTimeoutRef.current);
      }
    };
  }, []);

  /**
   * Switches between light and dark with a short delay so the slider animation
   * is visible before the page theme actually flips.
   * Closes all open dropdowns to avoid stale overlays.
   */
  const toggleTheme = () => {
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    setSliderDark(newTheme === "dark");
    userDropdown.close();
    languageDropdown.close();
    notificationsDropdown.close();

    if (themeChangeTimeoutRef.current) {
      clearTimeout(themeChangeTimeoutRef.current);
    }
    themeChangeTimeoutRef.current = setTimeout(() => {
      selectTheme(newTheme);
    }, 200);
  };

  const isAnyDropdownOpen =
    userDropdown.isOpen ||
    languageDropdown.isOpen ||
    notificationsDropdown.isOpen;

  return {
    isMounted,
    currentTheme,
    sliderDark,
    suppressTooltipRef,
    tooltipOpen,
    setTooltipOpen,
    toggleTheme,
    isAnyDropdownOpen,
  };
};
