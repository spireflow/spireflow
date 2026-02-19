"use client";

import { useState } from "react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useTranslations } from "next-intl";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../components/common/shadcn/drawer";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/common/shadcn/select";
import { Label } from "../components/common/shadcn/label";
import { Switch } from "../components/common/shadcn/switch";
import { GithubIcon } from "../assets/icons/GithubIcon";
import { useAppStore } from "../store/appStore";

interface SettingsDrawerProps {
  children?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const LayoutPreview = ({ type }: { type: "three-cards" | "four-cards" }) => {
  if (type === "three-cards") {
    return (
      <svg
        width="100%"
        height="60"
        viewBox="0 0 120 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="mx-auto"
      >
        {/* Three cards at top - narrower to match left column */}
        <rect
          x="4"
          y="4"
          width="20"
          height="16"
          rx="2"
          className="fill-settingsLayoutPreviewBg"
        />
        <rect
          x="27"
          y="4"
          width="20"
          height="16"
          rx="2"
          className="fill-settingsLayoutPreviewBg"
        />
        <rect
          x="50"
          y="4"
          width="20"
          height="16"
          rx="2"
          className="fill-settingsLayoutPreviewBg"
        />

        {/* Large chart - left side */}
        <rect
          x="4"
          y="24"
          width="66"
          height="52"
          rx="3"
          className="fill-settingsLayoutPreviewBg"
        />

        {/* Sidebar - full height on right (same width as four-cards) */}
        <rect
          x="74"
          y="4"
          width="35"
          height="72"
          rx="3"
          className="fill-settingsLayoutPreviewBg"
        />
      </svg>
    );
  }

  return (
    <svg
      width="100%"
      height="60"
      viewBox="0 0 120 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="mx-auto"
    >
      {/* Four cards at top */}
      <rect
        x="4"
        y="4"
        width="25"
        height="18"
        rx="2"
        className="fill-settingsLayoutPreviewBg"
      />
      <rect
        x="32"
        y="4"
        width="25"
        height="18"
        rx="2"
        className="fill-settingsLayoutPreviewBg"
      />
      <rect
        x="60"
        y="4"
        width="25"
        height="18"
        rx="2"
        className="fill-settingsLayoutPreviewBg"
      />
      <rect
        x="88"
        y="4"
        width="25"
        height="18"
        rx="2"
        className="fill-settingsLayoutPreviewBg"
      />

      {/* Large chart */}
      <rect
        x="4"
        y="26"
        width="72"
        height="50"
        rx="3"
        className="fill-settingsLayoutPreviewBg"
      />

      {/* Sidebar */}
      <rect
        x="80"
        y="26"
        width="35"
        height="50"
        rx="3"
        className="fill-settingsLayoutPreviewBg"
      />
    </svg>
  );
};

const SidebarPreview = ({ type }: { type: "expanded" | "collapsed" }) => {
  if (type === "expanded") {
    return (
      <svg
        width="100%"
        height="60"
        viewBox="0 0 120 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="mx-auto"
      >
        {/* Expanded sidebar */}
        <rect
          x="4"
          y="4"
          width="28"
          height="72"
          rx="3"
          className="fill-settingsLayoutPreviewBg"
        />
        {/* Menu items in sidebar */}
        <rect
          x="8"
          y="12"
          width="20"
          height="4"
          rx="1"
          className="fill-mainColor opacity-60"
        />
        <rect
          x="8"
          y="20"
          width="20"
          height="4"
          rx="1"
          className="fill-settingsLayoutPreviewBg"
        />
        <rect
          x="8"
          y="28"
          width="20"
          height="4"
          rx="1"
          className="fill-settingsLayoutPreviewBg"
        />
        <rect
          x="8"
          y="36"
          width="20"
          height="4"
          rx="1"
          className="fill-settingsLayoutPreviewBg"
        />
        {/* Main content area */}
        <rect
          x="36"
          y="4"
          width="80"
          height="72"
          rx="3"
          className="fill-settingsLayoutPreviewBg"
        />
      </svg>
    );
  }

  return (
    <svg
      width="100%"
      height="60"
      viewBox="0 0 120 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="mx-auto"
    >
      {/* Collapsed sidebar */}
      <rect
        x="4"
        y="4"
        width="12"
        height="72"
        rx="3"
        className="fill-settingsLayoutPreviewBg"
      />
      {/* Icon placeholders in collapsed sidebar */}
      <rect
        x="6"
        y="12"
        width="8"
        height="8"
        rx="2"
        className="fill-mainColor opacity-60"
      />
      <rect
        x="6"
        y="24"
        width="8"
        height="8"
        rx="2"
        className="fill-settingsLayoutPreviewBg"
      />
      <rect
        x="6"
        y="36"
        width="8"
        height="8"
        rx="2"
        className="fill-settingsLayoutPreviewBg"
      />
      <rect
        x="6"
        y="48"
        width="8"
        height="8"
        rx="2"
        className="fill-settingsLayoutPreviewBg"
      />
      {/* Main content area - larger */}
      <rect
        x="20"
        y="4"
        width="96"
        height="72"
        rx="3"
        className="fill-settingsLayoutPreviewBg"
      />
    </svg>
  );
};

export const SettingsDrawer = ({ children, open: externalOpen, onOpenChange: externalOnOpenChange }: SettingsDrawerProps) => {
  const t = useTranslations("settings");
  const { theme, setTheme } = useTheme();
  const homepageLayout = useAppStore((state) => state.homepageLayout);
  const setHomepageLayout = useAppStore((state) => state.setHomepageLayout);
  const fontType = useAppStore((state) => state.fontType);
  const setFontType = useAppStore((state) => state.setFontType);
  const sidebarDefaultState = useAppStore((state) => state.sidebarDefaultState);
  const setSidebarDefaultState = useAppStore(
    (state) => state.setSidebarDefaultState
  );
  const chartAnimationsEnabled = useAppStore(
    (state) => state.chartAnimationsEnabled
  );
  const setChartAnimationsEnabled = useAppStore(
    (state) => state.setChartAnimationsEnabled
  );
  const fixedNavbar = useAppStore((state) => state.fixedNavbar);
  const setFixedNavbar = useAppStore((state) => state.setFixedNavbar);
  const [internalOpen, setInternalOpen] = useState(false);

  const isControlled = externalOpen !== undefined;
  const open = isControlled ? externalOpen : internalOpen;
  const setOpen = isControlled ? (externalOnOpenChange ?? (() => {})) : setInternalOpen;

  return (
    <Drawer direction="right" open={open} onOpenChange={setOpen}>
      {children && <DrawerTrigger asChild>{children}</DrawerTrigger>}
      <DrawerContent className="!bg-primaryBg max-xsm:!w-full">
        <DrawerHeader className="bg-settingsDrawerHeaderBg border-b border-settingsDrawerDivider relative">
          <DrawerTitle className="text-primaryText text-2xl font-semibold">
            {t("title")}
          </DrawerTitle>
          <DrawerClose autoFocus className="absolute right-4 top-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 disabled:pointer-events-none">
            <svg
              width="20"
              height="20"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-primaryText"
            >
              <path
                d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z"
                fill="currentColor"
                fillRule="evenodd"
                clipRule="evenodd"
              />
            </svg>
            <span className="sr-only">Close</span>
          </DrawerClose>
        </DrawerHeader>

        <div className="flex-1 min-h-0 overflow-y-auto">
          <div className="flex flex-col min-h-full">
            {/* Theme Section */}
            <div className="px-6 py-5 border-b border-settingsDrawerDivider">
              <div className="mb-1">
                <Label className="text-xs font-medium tracking-wide uppercase text-settingsDrawerSectionTitle">
                  {t("theme")}
                </Label>
              </div>
              <Select value={theme} onValueChange={setTheme}>
                <SelectTrigger id="theme-select" className="mt-3">
                  <SelectValue placeholder={t("selectTheme")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">{t("light")}</SelectItem>
                  <SelectItem value="dark">{t("dark")}</SelectItem>
                  <SelectItem value="system">{t("system")}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Homepage Layout Section */}
            <div className="px-6 py-5 border-b border-settingsDrawerDivider">
              <div className="mb-1">
                <Label className="text-xs font-medium tracking-wide uppercase text-settingsDrawerSectionTitle">
                  {t("homepageLayout")}
                </Label>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4">
                {/* Three Cards Option */}
                <button
                  onClick={() => setHomepageLayout("three-cards")}
                  className={`relative flex flex-col items-center gap-2 p-3 rounded-lg border-2 transition-all ${
                    homepageLayout === "three-cards"
                      ? "border-mainColor bg-primaryBg"
                      : "border-settingsButtonBorder bg-primaryBg hover:border-mainBorderHover"
                  }`}
                >
                  <div className="w-full flex justify-center">
                    <LayoutPreview type="three-cards" />
                  </div>
                  <span className="text-sm font-medium text-settingsDrawerLabelText">
                    {t("threeCards")}
                  </span>
                  {homepageLayout === "three-cards" && (
                    <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-mainColor flex items-center justify-center">
                      <svg
                        width="12"
                        height="9"
                        viewBox="0 0 12 9"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1 4.5L4.5 8L11 1"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  )}
                </button>

                {/* Four Cards Option */}
                <button
                  onClick={() => setHomepageLayout("four-cards")}
                  className={`relative flex flex-col items-center gap-2 p-3 rounded-lg border-2 transition-all ${
                    homepageLayout === "four-cards"
                      ? "border-mainColor bg-primaryBg"
                      : "border-settingsButtonBorder bg-primaryBg hover:border-mainBorderHover"
                  }`}
                >
                  <div className="w-full flex justify-center">
                    <LayoutPreview type="four-cards" />
                  </div>
                  <span className="text-sm font-medium text-settingsDrawerLabelText">
                    {t("fourCards")}
                  </span>
                  {homepageLayout === "four-cards" && (
                    <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-mainColor flex items-center justify-center">
                      <svg
                        width="12"
                        height="9"
                        viewBox="0 0 12 9"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1 4.5L4.5 8L11 1"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  )}
                </button>
              </div>
            </div>

            {/* Sidebar Mode Section - desktop only */}
            <div className="hidden xl:block px-6 py-5 border-b border-settingsDrawerDivider">
              <div className="mb-1">
                <Label className="text-xs font-medium tracking-wide uppercase text-settingsDrawerSectionTitle">
                  {t("sidebarMode")}
                </Label>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4">
                {/* Expanded Option */}
                <button
                  onClick={() => setSidebarDefaultState("expanded")}
                  className={`relative flex flex-col items-center gap-2 p-3 rounded-lg border-2 transition-all ${
                    sidebarDefaultState === "expanded"
                      ? "border-mainColor bg-primaryBg"
                      : "border-settingsButtonBorder bg-primaryBg hover:border-mainBorderHover"
                  }`}
                >
                  <div className="w-full flex justify-center">
                    <SidebarPreview type="expanded" />
                  </div>
                  <span className="text-sm font-medium text-settingsDrawerLabelText">
                    {t("expanded")}
                  </span>
                  {sidebarDefaultState === "expanded" && (
                    <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-mainColor flex items-center justify-center">
                      <svg
                        width="12"
                        height="9"
                        viewBox="0 0 12 9"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1 4.5L4.5 8L11 1"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  )}
                </button>

                {/* Collapsed Option */}
                <button
                  onClick={() => setSidebarDefaultState("collapsed")}
                  className={`relative flex flex-col items-center gap-2 p-3 rounded-lg border-2 transition-all ${
                    sidebarDefaultState === "collapsed"
                      ? "border-mainColor bg-primaryBg"
                      : "border-settingsButtonBorder bg-primaryBg hover:border-mainBorderHover"
                  }`}
                >
                  <div className="w-full flex justify-center">
                    <SidebarPreview type="collapsed" />
                  </div>
                  <span className="text-sm font-medium text-settingsDrawerLabelText">
                    {t("collapsed")}
                  </span>
                  {sidebarDefaultState === "collapsed" && (
                    <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-mainColor flex items-center justify-center">
                      <svg
                        width="12"
                        height="9"
                        viewBox="0 0 12 9"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1 4.5L4.5 8L11 1"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  )}
                </button>
              </div>
            </div>

            {/* Alternative Font Section */}
            <div className="px-6 py-5 border-b border-settingsDrawerDivider">
              <div className="flex items-center justify-between">
                <Label className="text-[0.9rem] font-medium tracking-wide text-primaryText">
                  {t("alternativeFont")}
                </Label>
                <Switch
                  checked={fontType === "alternative"}
                  onCheckedChange={(checked) =>
                    setFontType(checked ? "alternative" : "default")
                  }
                />
              </div>
            </div>

            {/* Chart Animations Section */}
            <div className="px-6 py-5 border-b border-settingsDrawerDivider">
              <div className="flex items-center justify-between">
                <Label className="text-[0.9rem] font-medium tracking-wide text-primaryText">
                  {t("chartAnimations")}
                </Label>
                <Switch
                  checked={chartAnimationsEnabled}
                  onCheckedChange={setChartAnimationsEnabled}
                />
              </div>
            </div>

            {/* Fixed Navbar Section - desktop only */}
            <div className="hidden xl:block px-6 py-5">
              <div className="flex items-center justify-between">
                <Label className="text-[0.9rem] font-medium tracking-wide text-primaryText">
                  {t("fixedNavbar")}
                </Label>
                <Switch
                  checked={fixedNavbar}
                  onCheckedChange={setFixedNavbar}
                />
              </div>
            </div>

            {/* GitHub Section */}
            <div className="mt-auto border-t border-settingsDrawerDivider bg-settingsDrawerHeaderBg">
              <Link
                href="https://github.com/matt765/spireflow"
                target="_blank"
                className="flex items-center justify-center gap-2 py-4 hover:bg-selectBgHover transition-colors"
              >
                <div className="w-5 h-5 text-grayIcon">
                  <GithubIcon />
                </div>
                <span className="text-lg font-medium text-settingsDrawerLabelText">
                  {t("githubRepository")}
                </span>
              </Link>
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
