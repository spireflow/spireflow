"use client";

import "react-datepicker/dist/react-datepicker.css";

import DatePicker from "react-datepicker";

import { CalendarIcon } from "../../../assets/icons/CalendarIcon";
import { Button } from "../../common/shadcn/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../common/shadcn/dialog";
import type { CustomDateRangeDialogProps } from "./types";
import { useCustomDateRangeDialog } from "./useRangeSelect";

export const CustomDateRangeDialog = ({
  open,
  onOpenChange,
  onApply,
  initialRange,
}: CustomDateRangeDialogProps) => {
  const {
    t,
    startPickerRef,
    endPickerRef,
    fromDate,
    setFromDate,
    toDate,
    setToDate,
    today,
    fiveYearsAgo,
    handleOpenChange,
    handleApply,
    dateInputClasses,
  } = useCustomDateRangeDialog({ initialRange, onApply, onOpenChange });

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        className="flex flex-col sm:w-104 sm:h-auto md:w-104 sm:max-w-104 border-0 sm:border sm:border-inputBorder sm:rounded-2xl"
        onOpenAutoFocus={(e) => {
          e.preventDefault();
          (e.target as HTMLElement).focus();
        }}
      >
        <DialogHeader>
          <DialogTitle className="text-center text-xl">
            {t("dialogTitle")}
          </DialogTitle>
          <DialogDescription className="sr-only">
            {t("dialogTitle")}
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-row gap-4 mt-2">
          <div className="flex flex-col gap-1.5 flex-1">
            <label htmlFor="date-from" className="text-sm text-secondaryText">
              {t("from")}
            </label>
            <div className="datepicker-full-width relative h-[2.3rem] 3xl:h-[2.6rem]">
              <DatePicker
                ref={startPickerRef}
                id="date-from"
                selected={fromDate}
                onChange={(date: Date | null) => date && setFromDate(date)}
                minDate={fiveYearsAgo}
                maxDate={today}
                className={dateInputClasses}
                popperPlacement="bottom-start"
              />
              <div
                onClick={() => startPickerRef.current?.setOpen(true)}
                className="absolute right-2 top-2 3xl:top-[0.6rem] stroke-gray-400 fill-gray-400 text-gray-400 hover:stroke-calendarIconHover hover:fill-calendarIconHover cursor-pointer transition"
              >
                <CalendarIcon />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-1.5 flex-1">
            <label htmlFor="date-to" className="text-sm text-secondaryText">
              {t("to")}
            </label>
            <div className="datepicker-full-width relative h-[2.3rem] 3xl:h-[2.6rem]">
              <DatePicker
                ref={endPickerRef}
                id="date-to"
                selected={toDate}
                onChange={(date: Date | null) => date && setToDate(date)}
                minDate={fiveYearsAgo}
                maxDate={today}
                className={dateInputClasses}
                popperPlacement="bottom-start"
              />
              <div
                onClick={() => endPickerRef.current?.setOpen(true)}
                className="absolute right-2 top-2 3xl:top-[0.6rem] stroke-gray-400 fill-gray-400 text-gray-400 hover:stroke-calendarIconHover hover:fill-calendarIconHover cursor-pointer transition"
              >
                <CalendarIcon />
              </div>
            </div>
          </div>
        </div>
        <DialogFooter
          footerVariant="centered"
          className="mt-[2.7rem] !flex-row gap-3 sm:gap-0 justify-center"
        >
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            {t("cancel")}
          </Button>
          <Button onClick={handleApply}>{t("apply")}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
