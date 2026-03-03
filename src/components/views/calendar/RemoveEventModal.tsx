import { useTranslations } from "next-intl";
import { RefObject } from "react";

import { DeleteIcon } from "../../../assets/icons/DeleteIcon";
import { Button } from "../../common/shadcn/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../common/shadcn/dialog";

interface RemoveEventModalProps {
  closeModal: () => void;
  onConfirm: () => void;
  loading: boolean;
  subtitle: string;
  returnFocusRef?: RefObject<HTMLElement | null>;
}

export const RemoveEventModal = ({
  closeModal,
  onConfirm,
  loading,
  subtitle,
  returnFocusRef,
}: RemoveEventModalProps) => {
  const t = useTranslations("calendar");

  return (
    <Dialog open={true} onOpenChange={(open) => !open && closeModal()}>
      <DialogContent
        className="flex flex-col items-center justify-start md:max-w-112"
        onCloseAutoFocus={(e) => {
          if (returnFocusRef?.current) {
            e.preventDefault();
            returnFocusRef.current.focus();
          }
        }}
      >
        <DialogHeader>
          <div className="flex items-center justify-center w-full flex-col gap-2 -mt-2">
            <div className="rounded-full border border-mainBorder p-3 w-16 h-16 flex justify-center items-center text-grayIcon">
              <DeleteIcon />
            </div>
            <DialogTitle className="text-primaryText text-3xl w-full text-center mt-2">
              {t("deleteEventModalTitle")}
            </DialogTitle>
          </div>
          <DialogDescription className="text-primaryText text-base w-full text-secondaryText text-center mt-4">
            {subtitle}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter
          footerVariant="centered"
          className="!flex-row gap-4 sm:gap-0"
        >
          <Button variant="outline" onClick={closeModal} className="h-10">
            {t("cancel")}
          </Button>
          <Button onClick={onConfirm} loading={loading} className="h-10">
            {t("yes")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
