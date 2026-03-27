"use client";

import { useTranslations } from "next-intl";
import * as React from "react";
import { HexColorPicker } from "react-colorful";

import { Button } from "../../common/shadcn/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../common/shadcn/card";
import { Input } from "../../common/shadcn/input";
import { Label } from "../../common/shadcn/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../common/shadcn/popover";

/**
 * Showcase of a color picker using react-colorful
 * with a popover panel and hex input.
 *
 * @component
 */
export const ColorPickerForm = () => {
  const t = useTranslations("forms");
  const [color, setColor] = React.useState("#4bbf7d");
  const [openColorPicker, setOpenColorPicker] = React.useState(false);

  return (
    <Card id="colorPicker">
      <CardHeader variant="divider">
        <CardTitle>{t("colorPicker")}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-6">
          <div className="grid w-full max-w-sm items-center gap-[0.8rem]">
            <Label>Pick a Color</Label>
            <Popover open={openColorPicker} onOpenChange={setOpenColorPicker}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-[11.34rem] justify-start text-left font-normal pl-2"
                >
                  <div className="flex items-center gap-2">
                    <div
                      className="h-6 w-6 rounded-md border border-inputBorder"
                      style={{ backgroundColor: color }}
                    />
                    <div className="text-sm">{color}</div>
                  </div>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-3" align="start">
                <div className="flex flex-col gap-3">
                  <HexColorPicker color={color} onChange={setColor} />
                  <Input
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    className="font-mono px-2 [width:12.5rem]"
                  />
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
