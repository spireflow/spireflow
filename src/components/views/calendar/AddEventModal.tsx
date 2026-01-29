import React, { useEffect } from "react";
import { useTranslations } from "next-intl";

import { DeleteIcon } from "../../../assets/icons/DeleteIcon";
import { Button } from "../../common/shadcn/button";
import { ContainedButton } from "../../common/ContainedButton";
import { SpinnerIcon } from "../../../assets/icons/SpinnerIcon";
import { Input } from "../../common/shadcn/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../common/shadcn/select";
import { OrderModalIcon } from "../../../assets/icons/OrderModalIcon";
import { AddEventModalProps } from "./types";
import {
  Dialog,
  DialogContent,
  DialogFooter,
} from "../../common/shadcn/dialog";

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
          className="max-w-[90vw] sm:max-w-[28rem] px-[6vw] xsm:px-[18vw] sm:px-12 pt-24 sm:pt-[3rem]"
          onCloseAutoFocus={(e) => {
            if (returnFocusRef?.current) {
              e.preventDefault();
              returnFocusRef.current.focus();
            }
          }}
        >
          <div className="flex items-center justify-center w-full flex-col gap-2 -mt-2">
            <div className="text-grayIcon rounded-full border border-mainBorder p-4 pl-4 w-16 h-16 flex justify-center items-center mr-[0rem]">
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
              value={title}
              onChange={(e) => onTitleChange(e.target.value)}
              className="text-input"
            />
            <div className="flex gap-4 w-full justify-between mt-1">
              <div className="w-1/2">
                <Select value={startTime} onValueChange={onStartTimeChange}>
                  <SelectTrigger className="w-full">
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
                  <SelectTrigger className="w-full">
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
            {error && <div className="text-red-500 text-base">{error}</div>}
            <DialogFooter footerVariant="centered" className="mt-5 !flex-row">
              <Button
                variant="outline"
                onClick={closeModal}
                className="h-[2.5rem]"
              >
                {t("cancel")}
              </Button>
              <ContainedButton
                handleClick={handleConfirmClick}
                disabled={loading}
                fullWidth={false}
              >
                {loading ? (
                  <div className="pt-[0.3rem]">
                    <SpinnerIcon width={45} height={45} />
                  </div>
                ) : (
                  t("addEventConfirmButton")
                )}
              </ContainedButton>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
