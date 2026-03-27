"use client";

import { useTranslations } from "next-intl";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../common/shadcn/card";
import { Checkbox } from "../../common/shadcn/checkbox";
import { Label } from "../../common/shadcn/label";

/**
 * Showcase of checkbox states: default, checked,
 * disabled, and disabled-checked.
 *
 * @component
 */
export const CheckboxesForm = () => {
  const t = useTranslations("forms");

  return (
    <Card id="checkboxes">
      <CardHeader variant="divider">
        <CardTitle>{t("checkboxes")}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-5">
          <div className="flex items-center space-x-3">
            <Checkbox id="terms" />
            <Label htmlFor="terms" withPointer>
              Default Checkbox
            </Label>
          </div>
          <div className="flex items-center space-x-3">
            <Checkbox id="checked" defaultChecked />
            <Label htmlFor="checked" withPointer>
              Checked Checkbox
            </Label>
          </div>
          <div className="flex items-center space-x-3">
            <Checkbox id="disabled-check" disabled />
            <Label htmlFor="disabled-check">Disabled Checkbox</Label>
          </div>
          <div className="flex items-center space-x-3">
            <Checkbox id="disabled-checked" disabled defaultChecked />
            <Label htmlFor="disabled-checked">Disabled Checked Checkbox</Label>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
