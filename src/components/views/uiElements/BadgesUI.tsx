"use client";

import { useTranslations } from "next-intl";

import { Badge } from "../../common/shadcn/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../common/shadcn/card";

/**
 * Showcase of badge variants: default, secondary,
 * destructive, and outline.
 *
 * @component
 */
export const BadgesUI = () => {
  const t = useTranslations("uiElements");

  return (
    <Card id="badges">
      <CardHeader variant="divider">
        <CardTitle>{t("badges")}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-3">
          <Badge>Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="destructive">Destructive</Badge>
          <Badge variant="outline">Outline</Badge>
        </div>
      </CardContent>
    </Card>
  );
};
