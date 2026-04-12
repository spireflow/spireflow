"use client";

import { useTranslations } from "next-intl";

import { ShieldIcon } from "@/assets/icons/ShieldIcon";
import { Button } from "@/components/common/shadcn/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/common/shadcn/dialog";

interface SelfDemotionModalProps {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export const SelfDemotionModal = ({
  open,
  onConfirm,
  onCancel,
}: SelfDemotionModalProps) => {
  const t = useTranslations("userManagement.selfDemotion");

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onCancel()}>
      <DialogContent className="flex flex-col items-center justify-start md:max-w-112">
        <DialogHeader>
          <div className="flex items-center justify-center w-full flex-col gap-2 -mt-2">
            <div className="rounded-full border border-mainBorder p-3 w-16 h-16 flex justify-center items-center text-grayIcon">
              <ShieldIcon />
            </div>
            <DialogTitle className="text-primaryText text-3xl w-full text-center mt-2">
              {t("title")}
            </DialogTitle>
          </div>
          <DialogDescription className="text-base text-secondaryText text-center mt-4">
            {t("description")}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter
          footerVariant="centered"
          className="!flex-row gap-4 sm:gap-0"
        >
          <Button variant="outline" onClick={onCancel} className="h-10">
            {t("cancel")}
          </Button>
          <Button onClick={onConfirm} className="h-10">
            {t("confirm")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
