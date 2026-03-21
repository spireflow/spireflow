"use client";

import { useTranslations } from "next-intl";

import { Card } from "../../common/Card";
import { Label } from "../../common/shadcn/label";
import { Switch } from "../../common/shadcn/switch";

/**
 * Showcase of toggle switch states: default, checked,
 * disabled, and disabled-checked.
 *
 * @component
 */
export const ToggleSwitchForm = () => {
  const t = useTranslations("forms");

  return (
    <Card
      id="toggleSwitch"
      isHeaderDividerVisible
      addTitleMargin
      title={t("toggleSwitch")}
    >
      <div className="flex flex-col gap-6">
        <div className="flex items-center space-x-2">
          <Switch id="airplane-mode" />
          <Label htmlFor="airplane-mode">Default Switch</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Switch id="checked-switch" defaultChecked />
          <Label htmlFor="checked-switch">Checked Switch</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Switch id="disabled-switch" disabled />
          <Label htmlFor="disabled-switch">Disabled Switch</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Switch id="disabled-checked-switch" disabled defaultChecked />
          <Label htmlFor="disabled-checked-switch">
            Disabled Checked Switch
          </Label>
        </div>
      </div>
    </Card>
  );
};
