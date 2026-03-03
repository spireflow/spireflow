"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import { useState } from "react";

import { GithubIcon } from "../../assets/icons/GithubIcon";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../../components/common/shadcn/drawer";
import { Label } from "../../components/common/shadcn/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/common/shadcn/select";
import { Switch } from "../../components/common/shadcn/switch";
import { useAppStore } from "../../store/appStore";
import { HomepageLayoutSection } from "./HomepageLayoutSection";
import { SidebarModeSection } from "./SidebarModeSection";

interface SettingsDrawerProps {
  children?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export const SettingsDrawer = ({
  children,
  open: externalOpen,
  onOpenChange: externalOnOpenChange,
}: SettingsDrawerProps) => {
  const t = useTranslations("settings");
  const { theme, setTheme } = useTheme();
  const fontType = useAppStore((state) => state.fontType);
  const setFontType = useAppStore((state) => state.setFontType);
  const chartAnimationsEnabled = useAppStore(
    (state) => state.chartAnimationsEnabled,
  );
  const setChartAnimationsEnabled = useAppStore(
    (state) => state.setChartAnimationsEnabled,
  );
  const fixedNavbar = useAppStore((state) => state.fixedNavbar);
  const setFixedNavbar = useAppStore((state) => state.setFixedNavbar);
  const [internalOpen, setInternalOpen] = useState(false);

  const isControlled = externalOpen !== undefined;
  const open = isControlled ? externalOpen : internalOpen;
  const setOpen = isControlled
    ? (externalOnOpenChange ?? (() => {}))
    : setInternalOpen;

  return (
    <Drawer direction="right" open={open} onOpenChange={setOpen}>
      {children && <DrawerTrigger asChild>{children}</DrawerTrigger>}
      <DrawerContent className="!bg-primaryBg max-xsm:!w-full">
        <DrawerHeader className="bg-settingsDrawerHeaderBg border-b border-settingsDrawerDivider relative">
          <DrawerTitle className="text-primaryText text-2xl font-semibold">
            {t("title")}
          </DrawerTitle>
          <DrawerDescription className="sr-only">
            Customize dashboard appearance settings
          </DrawerDescription>
          <DrawerClose
            autoFocus
            className="absolute right-4 top-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 disabled:pointer-events-none"
          >
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

            <HomepageLayoutSection />
            <SidebarModeSection />

            {/* Alternative Font Section */}
            <div className="px-6 py-5 border-b border-settingsDrawerDivider">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium tracking-wide text-primaryText">
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
                <Label className="text-sm font-medium tracking-wide text-primaryText">
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
                <Label className="text-sm font-medium tracking-wide text-primaryText">
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
                className="flex items-center justify-center gap-2 py-4 hover:bg-selectBgHover transition-colors focus-visible:outline-offset-[-2px]"
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
