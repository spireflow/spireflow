"use client";

import { useTranslations } from "next-intl";

import { Card } from "../../common/Card";
import { Label } from "../../common/shadcn/label";
import { RadioGroup, RadioGroupItem } from "../../common/shadcn/radio-group";

/**
 * Showcase of radio button states: default,
 * selected, and disabled within a radio group.
 *
 * @component
 */
export const RadioButtonsForm = () => {
  const t = useTranslations("forms");

  return (
    <Card isHeaderDividerVisible addTitleMargin title={t("radioButtons")}>
      <RadioGroup defaultValue="option-one">
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="option-one" id="option-one" />
          <Label htmlFor="option-one">Default Radio</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="option-two" id="option-two" />
          <Label htmlFor="option-two">Secondary Radio</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="option-three" id="option-three" disabled />
          <Label htmlFor="option-three">Disabled Radio</Label>
        </div>
      </RadioGroup>
    </Card>
  );
};
