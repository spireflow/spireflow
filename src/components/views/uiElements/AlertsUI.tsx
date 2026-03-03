"use client";

import { AlertCircle, Info } from "lucide-react";
import { useTranslations } from "next-intl";

import { Card } from "../../common/Card";
import { Alert, AlertDescription, AlertTitle } from "../../common/shadcn/alert";

/**
 * Showcase of alert variants: informational (default)
 * and destructive with icon, title, and description.
 *
 * @component
 */
export const AlertsUI = () => {
  const t = useTranslations("uiElements");

  return (
    <Card isHeaderDividerVisible addTitleMargin title={t("alerts")}>
      <div className="flex flex-col gap-6">
        <Alert>
          <Info className="h-4 w-4" />
          <AlertTitle>Information</AlertTitle>
          <AlertDescription>
            This is an informational alert using the default variant from
            Shadcn.
          </AlertDescription>
        </Alert>
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            This is a destructive alert indicating an error or warning.
          </AlertDescription>
        </Alert>
      </div>
    </Card>
  );
};
