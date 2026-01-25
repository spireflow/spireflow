"use client";

import React, { ReactNode, useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";

import { Navbar } from "./navbar/Navbar";
import { SideMenu } from "./sideMenu/SideMenu";
import { useAppStore } from "../store/appStore";
import {
  FullScreenLoader,
  LOADER_DURATION_MS,
} from "./FullScreenLoader";
import { SettingsDrawer } from "./SettingsDrawer";
import { SettingsIcon } from "../assets/icons/SettingsIcon";
import { FontManager } from "../hooks/useFontManager";

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const {
    isMobileMenuOpen,
    toggleMobileMenu,
    setIsInitialLoad,
    setShouldStartChartAnimations,
  } = useAppStore();
  const [showLoader, setShowLoader] = useState(true);
  const loaderTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const animationTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
    null
  );
  const loaderInitializedRef = useRef(false);

  const currentPathname = usePathname();

  const pathsWithNoLayout = [
    "/login",
    "/pl/login",
    "/register",
    "/pl/register",
  ];

  const { setTheme, themes } = useTheme();

  // Set Obsidian as theme if theme is not recognized
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");

    if (storedTheme && !themes.includes(storedTheme)) {
      setTheme("dark");
    }
  }, [setTheme, themes]);

  // Show loader screen for 1 second on first render
  // Start chart animations at 80% of loader duration
  useEffect(() => {
    if (!loaderInitializedRef.current) {
      loaderInitializedRef.current = true;

      // Start chart animations at 80% of loader duration
      animationTimeoutRef.current = setTimeout(() => {
        setShouldStartChartAnimations(true);
      }, LOADER_DURATION_MS * 0.8);

      loaderTimeoutRef.current = setTimeout(() => {
        setShowLoader(false);
        setIsInitialLoad(false);
      }, LOADER_DURATION_MS);
    }

    return () => {
      if (loaderTimeoutRef.current) {
        clearTimeout(loaderTimeoutRef.current);
      }
      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current);
      }
    };
  }, []);

  return (
    <>
      <FontManager />
      {/* Fixed Settings Button - Desktop Only */}
      {!pathsWithNoLayout.includes(currentPathname) && (
        <div className="hidden xl:block fixed bottom-6 right-6 z-50">
          <SettingsDrawer>
            <button
              className="w-16 h-16 rounded-full border border-mainBorder bg-floatingMenuButtonBg hover:bg-floatingMenuButtonBgHover text-settingsIcon stroke-settingsIcon fill-settingsIcon shadow-lg flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Open settings"
            >
              <div className="w-7 h-7 flex items-center justify-center">
                <SettingsIcon />
              </div>
            </button>
          </SettingsDrawer>
        </div>
      )}

      <div className="flex min-h-screen w-full bg-secondaryBg overflow-x-hidden">
        {showLoader && <FullScreenLoader key="static-loader-key" />}
        {!pathsWithNoLayout.includes(currentPathname) && (
          <>
            <SideMenu />
            <Navbar />
          </>
        )}
        <div className="flex flex-col w-full xl:max-w-[82%] 1xl:max-w-[82%] 2xl:max-w-[83vw] 3xl:max-w-[82vw] 5xl:max-w-[102rem] mx-auto relative">
          <div className="w-full flex justify-center max-w-full px-0 md:px-0 xl:pl-3 xl:pr-2 2xl:px-4">
            {children}
          </div>
        </div>
        {isMobileMenuOpen && (
          <div
            className="block xl:hidden h-screen w-screen fixed top-0 left-0 bg-[rgb(0,0,0,0.4)] z-[1]"
            onClick={toggleMobileMenu}
          />
        )}
      </div>
      <div className="w-screen fixed top-0 left-0 h-screen z-[-1]"></div>
    </>
  );
};
