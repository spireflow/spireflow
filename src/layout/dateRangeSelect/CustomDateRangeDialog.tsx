"use client";

import { useState, useRef } from "react";
import { useTranslations } from "next-intl";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "../../components/common/shadcn/dialog";
import { Button } from "../../components/common/shadcn/button";
import { CalendarIcon } from "../../assets/icons/CalendarIcon";
import type { CustomDateRange } from "../../store/dateRangeStore";

const toISODate = (date: Date): string => date.toISOString().split("T")[0];

const parseDate = (str: string): Date => new Date(str + "T00:00:00");

interface CustomDateRangeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onApply: (range: CustomDateRange) => void;
  initialRange: CustomDateRange | null;
}

export const CustomDateRangeDialog = ({
  open,
  onOpenChange,
  onApply,
  initialRange,
}: CustomDateRangeDialogProps) => {
  const t = useTranslations("dateRange");
  const startPickerRef = useRef<DatePicker>(null);
  const endPickerRef = useRef<DatePicker>(null);

  const today = new Date();
  const todayStr = toISODate(today);
  const fiveYearsAgo = new Date(
    today.getFullYear() - 5,
    today.getMonth(),
    today.getDate()
  );

  const [fromDate, setFromDate] = useState<Date>(
    parseDate(initialRange?.from ?? todayStr)
  );
  const [toDate, setToDate] = useState<Date>(
    parseDate(initialRange?.to ?? todayStr)
  );

  const handleOpenChange = (nextOpen: boolean) => {
    if (nextOpen) {
      setFromDate(parseDate(initialRange?.from ?? todayStr));
      setToDate(parseDate(initialRange?.to ?? todayStr));
    }
    onOpenChange(nextOpen);
  };

  const handleApply = () => {
    const fromStr = toISODate(fromDate);
    const toStr = toISODate(toDate);

    const normalizedFrom = fromStr <= toStr ? fromStr : toStr;
    const normalizedTo = fromStr <= toStr ? toStr : fromStr;

    onApply({ from: normalizedFrom, to: normalizedTo });
    onOpenChange(false);
  };

  const dateInputClasses =
    "pl-3 p-2 text-sm 3xl:text-base bg-inputBg hover:bg-inputBgHover w-full h-[2.3rem] 3xl:h-[2.6rem] border rounded-md border-inputBorder text-primaryText placeholder-secondaryText hover:border-inputBorderHover transition";

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        className="flex flex-col sm:w-[26rem] sm:h-auto md:w-[26rem] sm:max-w-[26rem] border-0 sm:border sm:border-inputBorder sm:rounded-2xl"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle className="text-center text-xl">{t("dialogTitle")}</DialogTitle>
          <DialogDescription className="sr-only">
            {t("dialogTitle")}
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-row gap-4 mt-2">
          <div className="flex flex-col gap-1.5 flex-1">
            <label className="text-sm text-secondaryText">{t("from")}</label>
            <div className="datepicker-full-width relative h-[2.3rem] 3xl:h-[2.6rem]">
              <DatePicker
                ref={startPickerRef}
                selected={fromDate}
                onChange={(date: Date | null) => date && setFromDate(date)}
                minDate={fiveYearsAgo}
                maxDate={today}
                className={dateInputClasses}
                popperPlacement="bottom-start"
              />
              <div
                onClick={() => startPickerRef.current?.setOpen(true)}
                className="absolute right-2 top-[0.5rem] 3xl:top-[0.6rem] stroke-gray-400 fill-gray-400 text-gray-400 hover:stroke-calendarIconHover hover:fill-calendarIconHover cursor-pointer transition"
              >
                <CalendarIcon />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-1.5 flex-1">
            <label className="text-sm text-secondaryText">{t("to")}</label>
            <div className="datepicker-full-width relative h-[2.3rem] 3xl:h-[2.6rem]">
              <DatePicker
                ref={endPickerRef}
                selected={toDate}
                onChange={(date: Date | null) => date && setToDate(date)}
                minDate={fiveYearsAgo}
                maxDate={today}
                className={dateInputClasses}
                popperPlacement="bottom-start"
              />
              <div
                onClick={() => endPickerRef.current?.setOpen(true)}
                className="absolute right-2 top-[0.5rem] 3xl:top-[0.6rem] stroke-gray-400 fill-gray-400 text-gray-400 hover:stroke-calendarIconHover hover:fill-calendarIconHover cursor-pointer transition"
              >
                <CalendarIcon />
              </div>
            </div>
          </div>
        </div>
        <DialogFooter footerVariant="centered" className="mt-[2.7rem] !flex-row gap-3 sm:gap-0 justify-center">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            {t("cancel")}
          </Button>
          <Button onClick={handleApply}>{t("apply")}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
