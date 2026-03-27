"use client";

import { useTranslations } from "next-intl";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../common/shadcn/card";
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
    <Card id="radioButtons">
      <CardHeader variant="divider">
        <CardTitle>{t("radioButtons")}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-[0.8rem]">
            <Label>Default</Label>
            <RadioGroup defaultValue="option-one">
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="option-one" id="option-one" />
                <Label htmlFor="option-one" withPointer>
                  Default Radio
                </Label>
              </div>
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="option-two" id="option-two" />
                <Label htmlFor="option-two" withPointer>
                  Secondary Radio
                </Label>
              </div>
              <div className="flex items-center space-x-3">
                <RadioGroupItem
                  value="option-three"
                  id="option-three"
                  disabled
                />
                <Label htmlFor="option-three">Disabled Radio</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="flex flex-col gap-[0.8rem]">
            <Label>Horizontal</Label>
            <RadioGroup defaultValue="yes" className="flex flex-row gap-7.5">
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="yes" id="hor1" />
                <Label htmlFor="hor1" withPointer>
                  Yes
                </Label>
              </div>
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="no" id="hor2" />
                <Label htmlFor="hor2" withPointer>
                  No
                </Label>
              </div>
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="maybe" id="hor3" />
                <Label htmlFor="hor3" withPointer>
                  Maybe
                </Label>
              </div>
            </RadioGroup>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
