"use client";

import "react-datepicker/dist/react-datepicker.css";

import { useTranslations } from "next-intl";
import * as React from "react";
import DatePicker from "react-datepicker";

import { CalendarIcon } from "../../../assets/icons/CalendarIcon";
import { useIsFirstRender } from "../../../hooks/useIsFirstRender";
import { useMediaQuery } from "../../../hooks/useMediaQuery";
import { BREAKPOINTS } from "../../../styles/breakpoints";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../common/shadcn/card";
import { Label } from "../../common/shadcn/label";

/**
 * Showcase of a date picker using react-datepicker
 * with a clickable calendar icon trigger.
 *
 * @component
 */
export const DatePickerForm = () => {
  const t = useTranslations("forms");
  const [date, setDate] = React.useState<Date>(new Date(2025, 3, 23)); // 23.04.2025
  const datePickerRef = React.useRef<DatePicker>(null);
  const isDesktop = useMediaQuery(`(min-width: ${BREAKPOINTS.md}px)`);
  const isFirstRender = useIsFirstRender();
  const shouldHideMobileKeyboard = !isFirstRender && !isDesktop;

  const handleMobileFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    if (shouldHideMobileKeyboard) {
      e.target.readOnly = true;
    }
  };

  return (
    <Card id="datePicker">
      <CardHeader variant="divider">
        <CardTitle>{t("datePicker")}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-[0.8rem]">
          <Label>Select Date</Label>
          <div className="flex relative h-[2.3rem] w-40">
            <DatePicker
              ref={datePickerRef}
              selected={date}
              onChange={(date: Date | null) => date && setDate(date)}
              className="pl-3 p-2 text-sm bg-inputBg hover:bg-inputBgHover w-full h-[2.3rem] border rounded-md border-inputBorder text-primaryText placeholder-secondaryText hover:border-inputBorderHover transition"
              placeholderText="Pick a date"
              onFocus={handleMobileFocus}
            />
            <div
              onClick={() => datePickerRef.current?.setOpen(true)}
              className="absolute right-2 top-2 stroke-gray-400 fill-gray-400 text-gray-400 hover:stroke-calendarIconHover hover:fill-calendarIconHover cursor-pointer transition"
            >
              <CalendarIcon />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
