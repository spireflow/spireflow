"use client";

import { useTranslations } from "next-intl";

import { Card } from "../../common/Card";
import { Label } from "../../common/shadcn/label";
import { Slider } from "../../common/shadcn/slider";

/**
 * Showcase of slider variants: single-thumb default
 * and dual-thumb range slider.
 *
 * @component
 */
export const SlidersForm = () => {
  const t = useTranslations("forms");

  return (
    <Card
      id="sliders"
      isHeaderDividerVisible
      addTitleMargin
      title={t("sliders")}
    >
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-[0.8rem]">
          <Label>Default Slider</Label>
          <Slider defaultValue={[50]} max={100} step={1} />
        </div>
        <div
          className="flex flex-col gap-[0.8rem]"
          style={{ marginTop: "1rem" }}
        >
          <Label>Range Slider</Label>
          <Slider defaultValue={[25, 75]} max={100} step={1} />
        </div>
      </div>
    </Card>
  );
};
