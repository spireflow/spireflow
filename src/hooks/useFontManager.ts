"use client";

import { useEffect } from "react";

import { useAppStore } from "../store/appStore";

/**
 * Handles font switching via class toggle on document.body.
 * Preloads both fonts on mount to prevent flash when switching.
 */
export const useFontManager = () => {
  const fontType = useAppStore((state) => state.fontType);

  /** Preloads both fonts on mount to prevent flash on Firefox. */
  useEffect(() => {
    document.fonts.load("1rem 'Outfit'");
    document.fonts.load("1rem 'Open Sans'");
  }, []);

  /** Toggles the alternative font class on body based on fontType. */
  useEffect(() => {
    if (fontType === "alternative") {
      document.body.classList.add("font-alternative");
    } else {
      document.body.classList.remove("font-alternative");
    }
  }, [fontType]);
};
