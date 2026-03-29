"use client";

import { useTranslations } from "next-intl";

import { Label } from "@/components/common/shadcn/label";
import { useLayoutStore } from "@/store/layoutStore";

import { SelectedCheckBadge } from "./SelectedCheckBadge";

const LayoutPreview = ({ type }: { type: "three-cards" | "four-cards" }) => {
  if (type === "three-cards") {
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
      aria-hidden="true"
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

export const HomepageLayoutSection = () => {
  const t = useTranslations("settings");
  const homepageLayout = useLayoutStore((state) => state.homepageLayout);
  const setHomepageLayout = useLayoutStore((state) => state.setHomepageLayout);

  return (
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
          tabIndex={0}
          aria-pressed={homepageLayout === "three-cards"}
          className={`relative flex flex-col items-center gap-2 p-3 rounded-lg border-2 transition ${
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
          {homepageLayout === "three-cards" && <SelectedCheckBadge />}
        </button>

        {/* Four Cards Option */}
        <button
          onClick={() => setHomepageLayout("four-cards")}
          tabIndex={0}
          aria-pressed={homepageLayout === "four-cards"}
          className={`relative flex flex-col items-center gap-2 p-3 rounded-lg border-2 transition ${
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
          {homepageLayout === "four-cards" && <SelectedCheckBadge />}
        </button>
      </div>
    </div>
  );
};
