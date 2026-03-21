"use client";

import { AlertCircle, CheckCircle, Info } from "lucide-react";
import { useTranslations } from "next-intl";

import { Card } from "../../common/Card";
import { Alert, AlertDescription, AlertTitle } from "../../common/shadcn/alert";

/**
 * Showcase of alert variants: informational (default),
 * destructive, and success with icon, title, and description.
 *
 * @component
 */
export const AlertsUI = () => {
  const t = useTranslations("uiElements");

  return (
    <Card id="alerts" isHeaderDividerVisible addTitleMargin title={t("alerts")}>
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
        <Alert variant="success">
          <CheckCircle className="h-4 w-4" />
          <AlertTitle>Success</AlertTitle>
          <AlertDescription>
            Your changes have been saved successfully.
          </AlertDescription>
        </Alert>
      </div>
    </Card>
  );
};
