"use client";

import { useTranslations } from "next-intl";

import { Card } from "../../common/Card";
import { Badge } from "../../common/shadcn/badge";

/**
 * Showcase of badge variants: default, secondary,
 * destructive, and outline.
 *
 * @component
 */
export const BadgesUI = () => {
  const t = useTranslations("uiElements");

  return (
    <Card isHeaderDividerVisible addTitleMargin title={t("badges")}>
      <div className="flex flex-wrap gap-3">
        <Badge>Default</Badge>
        <Badge variant="secondary">Secondary</Badge>
        <Badge variant="destructive">Destructive</Badge>
        <Badge variant="outline">Outline</Badge>
      </div>
    </Card>
  );
};
