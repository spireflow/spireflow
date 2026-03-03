import { useTranslations } from "next-intl";
import React, { useEffect } from "react";

import { DeleteIcon } from "../../../assets/icons/DeleteIcon";
import { OrderModalIcon } from "../../../assets/icons/OrderModalIcon";
import { Button } from "../../common/shadcn/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "../../common/shadcn/dialog";
import { Input } from "../../common/shadcn/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../common/shadcn/select";
import { AddEventModalProps } from "./types";

export const AddEventModal = ({
  closeModal,
  loading,
  title,
  startTime,
  endTime,
  error,
  onTitleChange,
  onStartTimeChange,
  onEndTimeChange,
  handleConfirmClick,
  type = "default",
  returnFocusRef,
}: AddEventModalProps) => {
  const t = useTranslations("calendar");
  const hours = Array.from({ length: 9 }, (_, i) => `${i + 8}:00`);

  /**
   * Global Enter key listener — lets users confirm the modal
   * without reaching for the button. Cleaned up on unmount.
   */
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        handleConfirmClick();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleConfirmClick]);

  return (
    <div>
      <Dialog open={true} onOpenChange={(open) => !open && closeModal()}>
        <DialogContent
          className="flex flex-col sm:w-112 sm:h-auto md:w-112 sm:max-w-112 border-0 sm:border sm:border-inputBorder sm:rounded-2xl"
          onCloseAutoFocus={(e) => {
            if (returnFocusRef?.current) {
              e.preventDefault();
              returnFocusRef.current.focus();
            }
          }}
        >
          <DialogTitle className="sr-only">
            {t("addEventModalTitle")}
          </DialogTitle>
          <DialogDescription className="sr-only">
            {t("addEventModalSubtitle")}
          </DialogDescription>
          <div className="flex items-center justify-center w-full flex-col gap-2 -mt-2">
            <div className="text-grayIcon rounded-full border border-mainBorder p-4 pl-4 w-16 h-16 flex justify-center items-center mr-0">
              {type === "delete" ? (
                <DeleteIcon />
              ) : (
                <OrderModalIcon width={25} height={25} />
              )}
            </div>
            <h2 className="text-primaryText text-3xl w-full text-center mt-2">
              {t("addEventModalTitle")}
            </h2>
          </div>
          <h2 className="text-primaryText text-base w-full text-center text-secondaryText mt-4">
            {t("addEventModalSubtitle")}
          </h2>
          <div className="flex w-full justify-center mt-8 flex-col gap-4">
            <Input
              type="text"
              placeholder={t("addEventModalPlaceholder")}
              aria-label="Event title"
              value={title}
              onChange={(e) => onTitleChange(e.target.value)}
              className="text-input"
            />
            <div className="flex gap-4 w-full justify-between mt-1">
              <div className="w-1/2">
                <Select value={startTime} onValueChange={onStartTimeChange}>
                  <SelectTrigger className="w-full" aria-label="Start time">
                    <SelectValue placeholder="Start time" />
                  </SelectTrigger>
                  <SelectContent>
                    {hours.map((hour) => (
                      <SelectItem key={hour} value={hour}>
                        {hour}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="w-1/2">
                <Select value={endTime} onValueChange={onEndTimeChange}>
                  <SelectTrigger className="w-full" aria-label="End time">
                    <SelectValue placeholder="End time" />
                  </SelectTrigger>
                  <SelectContent>
                    {hours.map((hour) => (
                      <SelectItem key={hour} value={hour}>
                        {hour}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            {error && (
              <div role="alert" className="text-red-500 text-base">
                {error}
              </div>
            )}
            <DialogFooter
              footerVariant="centered"
              className="mt-5 !flex-row gap-3 sm:gap-0 justify-center"
            >
              <Button variant="outline" onClick={closeModal} className="h-10">
                {t("cancel")}
              </Button>
              <Button onClick={handleConfirmClick} loading={loading}>
                {t("addEventConfirmButton")}
              </Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
