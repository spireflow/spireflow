import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import { useTranslations } from "next-intl";
import { useAppStore } from "../../../store/appStore";
import { useDropdown } from "../../../hooks/useDropdown";
import { useUser } from "@clerk/nextjs";

export const useNavbar = () => {
  const { theme, setTheme } = useTheme();
  const [currentLanguage, setCurrentLanguage] = useState("en");
  const { isMobileMenuOpen, toggleMobileMenu, isSideMenuOpen } = useAppStore();
  const t = useTranslations("navbar");
  const { user, isLoaded } = useUser();

  const session = isLoaded
    ? {
        username: user?.primaryEmailAddress?.emailAddress || null,
        isLoggedIn: !!user,
      }
    : null;

  const closeMobileMenu = () => {
    if (isMobileMenuOpen) {
      toggleMobileMenu();
    }
  };

  const themes = ["light", "dark"];
  const themesDisplayNames = ["light", "dark"];

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (window.innerWidth < 1280 && isMobileMenuOpen) {
        toggleMobileMenu();
      }
    }
  }, []);

  const userIconBtnRef = useRef<HTMLButtonElement | null>(null);
  const themeDropdown = useDropdown();
  const userDropdown = useDropdown();
  const languageDropdown = useDropdown();
  const searchDropdown = useDropdown();
  const notificationsDropdown = useDropdown();

  useEffect(() => {
    const getCurrentLanguage = () => {
      if (typeof window !== "undefined") {
        const pathname = window.location.pathname;
        return pathname.startsWith("/pl") ? "pl" : "en";
      }
      return "en";
    };
    setCurrentLanguage(getCurrentLanguage());
  }, []);

  const selectTheme = (themeName: string) => {
    setTheme(themeName);
  };

  const cycleThemeUp = () => {
    if (typeof theme === "string") {
      const currentThemeIndex = themes.indexOf(theme);
      const previousThemeIndex =
        (currentThemeIndex - 1 + themes.length) % themes.length;
      setTheme(themes[previousThemeIndex]);
    }
  };

  const cycleThemeDown = () => {
    if (typeof theme === "string") {
      const currentThemeIndex = themes.indexOf(theme);
      const nextThemeIndex = (currentThemeIndex + 1) % themes.length;
      setTheme(themes[nextThemeIndex]);
    }
  };

  return {
    theme,
    setTheme,
    currentLanguage,
    setCurrentLanguage,
    isMobileMenuOpen,
    toggleMobileMenu,
    isSideMenuOpen,
    t,
    closeMobileMenu,
    session,
    themes,
    themesDisplayNames,
    userIconBtnRef,
    themeDropdown,
    userDropdown,
    languageDropdown,
    selectTheme,
    cycleThemeUp,
    cycleThemeDown,
    searchDropdown,
    notificationsDropdown,
  };
};
