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
    <Card
      id="radioButtons"
      isHeaderDividerVisible
      addTitleMargin
      title={t("radioButtons")}
    >
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-[0.8rem]">
          <Label>Default</Label>
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
        </div>

        <div className="flex flex-col gap-[0.8rem]">
          <Label>Horizontal</Label>
          <RadioGroup defaultValue="yes" className="flex flex-row gap-4">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="hor1" />
              <Label htmlFor="hor1">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="hor2" />
              <Label htmlFor="hor2">No</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="maybe" id="hor3" />
              <Label htmlFor="hor3">Maybe</Label>
            </div>
          </RadioGroup>
        </div>
      </div>
    </Card>
  );
};
