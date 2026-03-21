"use client";

import { useTranslations } from "next-intl";

import { useToastStore } from "../../../store/toastStore";
import { Card } from "../../common/Card";
import { Button } from "../../common/shadcn/button";

/**
 * Showcase of toast notifications triggered by buttons.
 * Each button fires a toast with a different variant.
 *
 * @component
 */
export const ToastsUI = () => {
  const t = useTranslations("uiElements");
  const showToast = useToastStore((s) => s.showToast);

  return (
    <Card id="toasts" isHeaderDividerVisible addTitleMargin title={t("toasts")}>
      <div className="flex flex-wrap gap-4">
        <Button
          variant="outline"
          onClick={() =>
            showToast("default", t("toastInfoTitle"), t("toastInfoDesc"))
          }
        >
          {t("toastInfoTitle")}
        </Button>
        <Button
          variant="outline"
          onClick={() =>
            showToast("destructive", t("toastErrorTitle"), t("toastErrorDesc"))
          }
        >
          {t("toastErrorTitle")}
        </Button>
        <Button
          variant="outline"
          onClick={() =>
            showToast("success", t("toastSuccessTitle"), t("toastSuccessDesc"))
          }
        >
          {t("toastSuccessTitle")}
        </Button>
      </div>
    </Card>
  );
};
