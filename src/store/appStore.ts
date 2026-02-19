import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { FontType } from "../styles/fonts";

export type SidebarDefaultState = "expanded" | "collapsed";

export type ChartPageId = "homepage" | "analytics" | "charts";

interface AppStore {
  isMobileMenuOpen: boolean;
  isSideMenuOpen: boolean;
  setIsSideMenuOpen: (isOpen: boolean) => void;
  toggleMobileMenu: () => void;
  toggleSideMenu: () => void;
  isLoggingOut: boolean;
  setIsLoggingOut: (isLoggingOut: boolean) => void;
  isLoggingIn: boolean;
  setIsLoggingIn: (isLoggingIn: boolean) => void;
  homepageLayout: "three-cards" | "four-cards";
  setHomepageLayout: (layout: "three-cards" | "four-cards") => void;
  fontType: FontType;
  setFontType: (fontType: FontType) => void;
  sidebarDefaultState: SidebarDefaultState;
  setSidebarDefaultState: (state: SidebarDefaultState) => void;
  chartAnimationsEnabled: boolean;
  setChartAnimationsEnabled: (enabled: boolean) => void;
  fixedNavbar: boolean;
  setFixedNavbar: (fixed: boolean) => void;
  isInitialLoad: boolean;
  setIsInitialLoad: (isInitialLoad: boolean) => void;
  shouldStartChartAnimations: boolean;
  setShouldStartChartAnimations: (shouldStart: boolean) => void;
  visitedChartPages: Set<ChartPageId>;
  markChartPageAsVisited: (pageId: ChartPageId) => void;
}

const determineInitialState = () => {
  if (typeof window !== "undefined") {
    return {
      isMobileMenuOpen: window.innerWidth < 1280,
      isSideMenuOpen: window.innerWidth >= 1280,
    };
  }
  return {
    isMobileMenuOpen: false,
    isSideMenuOpen: true,
  };
};

export const useAppStore = create<AppStore>()(
  persist(
    (set) => ({
      isMobileMenuOpen: false,
      isSideMenuOpen: true,
      setIsSideMenuOpen: (isOpen) => set(() => ({ isSideMenuOpen: isOpen })),
      toggleMobileMenu: () => {
        set((state: AppStore) => ({
          ...state,
          isMobileMenuOpen: state.isMobileMenuOpen
            ? false
            : determineInitialState().isMobileMenuOpen,
        }));
      },
      toggleSideMenu: () => {
        set((state: AppStore) => {
          const newIsOpen = state.isSideMenuOpen
            ? false
            : determineInitialState().isSideMenuOpen;
          return {
            ...state,
            isSideMenuOpen: newIsOpen,
            sidebarDefaultState: newIsOpen ? "expanded" : "collapsed",
          };
        });
      },
      isLoggingOut: false,
      setIsLoggingOut: (isLoggingOut) => set(() => ({ isLoggingOut })),
      isLoggingIn: false,
      setIsLoggingIn: (isLoggingIn) => set(() => ({ isLoggingIn })),
      homepageLayout: "three-cards",
      setHomepageLayout: (layout) => set(() => ({ homepageLayout: layout })),
      fontType: "default",
      setFontType: (fontType) => set(() => ({ fontType })),
      sidebarDefaultState: "expanded",
      setSidebarDefaultState: (sidebarDefaultState) =>
        set(() => ({
          sidebarDefaultState,
          isSideMenuOpen: sidebarDefaultState === "expanded",
        })),
      chartAnimationsEnabled: false,
      setChartAnimationsEnabled: (chartAnimationsEnabled) =>
        set(() => ({ chartAnimationsEnabled })),
      fixedNavbar: true,
      setFixedNavbar: (fixedNavbar) => set(() => ({ fixedNavbar })),
      isInitialLoad: true,
      setIsInitialLoad: (isInitialLoad) => set(() => ({ isInitialLoad })),
      shouldStartChartAnimations: false,
      setShouldStartChartAnimations: (shouldStartChartAnimations) =>
        set(() => ({ shouldStartChartAnimations })),
      visitedChartPages: new Set<ChartPageId>(),
      markChartPageAsVisited: (pageId: ChartPageId) =>
        set((state) => ({
          visitedChartPages: new Set(state.visitedChartPages).add(pageId),
        })),
    }),
    {
      name: "app-settings",
      partialize: (state) => ({
        homepageLayout: state.homepageLayout,
        fontType: state.fontType,
        sidebarDefaultState: state.sidebarDefaultState,
        chartAnimationsEnabled: state.chartAnimationsEnabled,
        fixedNavbar: state.fixedNavbar,
      }),
      onRehydrateStorage: () => (state) => {
        if (!state) return;
        const isDesktop = typeof window !== "undefined" && window.innerWidth >= 1280;
        state.setIsSideMenuOpen(
          isDesktop && state.sidebarDefaultState === "expanded"
        );
      },
    }
  )
);
