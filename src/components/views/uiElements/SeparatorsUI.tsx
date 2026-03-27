"use client";

import { useTranslations } from "next-intl";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../common/shadcn/card";
import { Separator } from "../../common/shadcn/separator";

/**
 * Showcase of separator orientations:
 * horizontal (between text) and vertical (between inline items).
 *
 * @component
 */
export const SeparatorsUI = () => {
  const t = useTranslations("uiElements");

  return (
    <Card id="separators">
      <CardHeader variant="divider">
        <CardTitle>{t("separators")}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          <div>
            <h4 className="text-sm font-medium mb-4">Horizontal Separator</h4>
            <div className="space-y-3">
              <p className="text-sm">Content above separator</p>
              <Separator />
              <p className="text-sm">Content below separator</p>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-medium mb-4">Vertical Separator</h4>
            <div className="flex h-5 items-center space-x-4 text-sm">
              <div>Item 1</div>
              <Separator orientation="vertical" />
              <div>Item 2</div>
              <Separator orientation="vertical" />
              <div>Item 3</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
