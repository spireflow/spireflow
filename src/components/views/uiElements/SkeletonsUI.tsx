"use client";

import { useTranslations } from "next-intl";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../common/shadcn/card";
import { Skeleton } from "../../common/shadcn/skeleton";

/**
 * Showcase of skeleton loading placeholders: avatar with text lines,
 * paragraph block, and a large content area.
 *
 * @component
 */
export const SkeletonsUI = () => {
  const t = useTranslations("uiElements");

  return (
    <Card id="skeletons">
      <CardHeader variant="divider">
        <CardTitle>{t("skeletons")}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2 flex-1">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-4/5" />
            </div>
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
          <Skeleton className="h-32 w-full rounded-lg" />
        </div>
      </CardContent>
    </Card>
  );
};
