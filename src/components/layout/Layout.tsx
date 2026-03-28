"use client";

import { useTheme } from "next-themes";
import { ReactNode, useEffect, useRef, useState } from "react";

import { SettingsIcon } from "@/assets/icons/SettingsIcon";
import { useFontManager } from "@/hooks/useFontManager";
import { useGlobalHotkeys } from "@/hooks/useGlobalHotkeys";
import { usePathname } from "@/i18n/navigation";
import { useChartAnimationStore } from "@/store/chartAnimationStore";
import { useLayoutStore } from "@/store/layoutStore";

import { FullScreenLoader, LOADER_DURATION_MS } from "./FullScreenLoader";
import { Navbar } from "./navbar/Navbar";
import { SettingsDrawer } from "./settings/SettingsDrawer";
import { SideMenu } from "./sideMenu/SideMenu";
import { ToastContainer } from "./ToastContainer";

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  useFontManager();

  const isMobileMenuOpen = useLayoutStore((s) => s.isMobileMenuOpen);
  const toggleMobileMenu = useLayoutStore((s) => s.toggleMobileMenu);
  const setShouldStartChartAnimations = useChartAnimationStore(
    (s) => s.setShouldStartChartAnimations,
  );

  const [showLoader, setShowLoader] = useState(true);

  const loaderTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const animationTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );

  const currentPathname = usePathname();

  const authPaths = [
    "/login",
    "/register",
    "/forgot-password",
    "/error-401",
    "/error-404",
    "/error-500",
  ];

  const isAuthPage = authPaths.includes(currentPathname);

  useGlobalHotkeys({ isAuthPage });

  const { setTheme, themes } = useTheme();

  /** Set dark as default theme if stored theme is not recognized */
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");

    if (storedTheme && !themes.includes(storedTheme)) {
      setTheme("dark");
    }
  }, [setTheme, themes]);

  /**
   * Show loader screen for 1 second on first render.
   * Start chart animations at 85% of loader duration so they begin
   * just before the loader disappears (with animationBegin=100ms in the hook,
   * the visual animation starts right as the loader fades out).
   */
  useEffect(() => {
    /** Skip loader entirely on auth pages */
    if (isAuthPage) {
      setShowLoader(false);
      setShouldStartChartAnimations(true);
      return;
    }

    /** Start chart animations at 85% of loader duration */
    animationTimeoutRef.current = setTimeout(() => {
      setShouldStartChartAnimations(true);
    }, LOADER_DURATION_MS * 0.85);

    loaderTimeoutRef.current = setTimeout(() => {
      setShowLoader(false);
    }, LOADER_DURATION_MS);

    return () => {
      if (loaderTimeoutRef.current) {
        clearTimeout(loaderTimeoutRef.current);
      }
      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current);
      }
    };
  }, [isAuthPage, setShouldStartChartAnimations]);

  return (
    <>
      {/* Fixed Settings Button - Desktop Only */}
      {!isAuthPage && (
        <div className="hidden xl:block fixed bottom-6 right-4 z-50">
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
        {showLoader && !isAuthPage && (
          <FullScreenLoader key="static-loader-key" />
        )}
        {!isAuthPage && (
          <>
            <SideMenu />
            <Navbar />
          </>
        )}
        <div
          className={`flex flex-col w-full ${CONTENT_MAX_WIDTH} mx-auto relative`}
        >
          <div className="w-full flex justify-center max-w-full px-0 md:px-0 xl:pl-3 xl:pr-2 2xl:px-4">
            {children}
          </div>
        </div>
        {isMobileMenuOpen && (
          <div
            className="block xl:hidden fixed inset-0 bg-mobileOverlayBg z-[1] cursor-pointer overflow-hidden overscroll-contain"
            onClick={toggleMobileMenu}
            aria-hidden="true"
          />
        )}
      </div>
      <ToastContainer />
    </>
  );
};

export const CONTENT_MAX_WIDTH =
  "xl:max-w-[80%] 1xl:max-w-[80%] 2xl:max-w-[81vw] 3xl:max-w-[82vw] 5xl:max-w-408";
