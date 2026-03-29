"use client";

import { useTranslations } from "next-intl";

import { Label } from "@/components/common/shadcn/label";
import { useLayoutStore } from "@/store/layoutStore";

import { SelectedCheckBadge } from "./SelectedCheckBadge";

const SidebarPreview = ({ type }: { type: "expanded" | "collapsed" }) => {
  if (type === "expanded") {
    return (
      <svg
        aria-hidden="true"
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
      aria-hidden="true"
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

export const SidebarModeSection = () => {
  const t = useTranslations("settings");
  const sidebarDefaultState = useLayoutStore(
    (state) => state.sidebarDefaultState,
  );
  const setSidebarDefaultState = useLayoutStore(
    (state) => state.setSidebarDefaultState,
  );

  return (
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
          tabIndex={0}
          aria-pressed={sidebarDefaultState === "expanded"}
          className={`relative flex flex-col items-center gap-2 p-3 rounded-lg border-2 transition ${
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
          {sidebarDefaultState === "expanded" && <SelectedCheckBadge />}
        </button>

        {/* Collapsed Option */}
        <button
          onClick={() => setSidebarDefaultState("collapsed")}
          tabIndex={0}
          aria-pressed={sidebarDefaultState === "collapsed"}
          className={`relative flex flex-col items-center gap-2 p-3 rounded-lg border-2 transition ${
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
          {sidebarDefaultState === "collapsed" && <SelectedCheckBadge />}
        </button>
      </div>
    </div>
  );
};
