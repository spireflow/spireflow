"use client";

import "react-datepicker/dist/react-datepicker.css";

import { useTranslations } from "next-intl";
import * as React from "react";
import DatePicker from "react-datepicker";

import { CalendarIcon } from "../../../assets/icons/CalendarIcon";
import { Card } from "../../common/Card";
import { Label } from "../../common/shadcn/label";

export const DatePickerForm = () => {
  const t = useTranslations("forms");
  const [date, setDate] = React.useState<Date>(new Date(2025, 3, 23)); // 23.04.2025
  const datePickerRef = React.useRef<DatePicker>(null);

  return (
    <Card isHeaderDividerVisible addTitleMargin title={t("datePicker")}>
      <div className="flex flex-col gap-[0.8rem]">
        <Label>Select Date</Label>
        <div className="flex relative h-[2.3rem] w-40">
          <DatePicker
            ref={datePickerRef}
            selected={date}
            onChange={(date: Date | null) => date && setDate(date)}
            className="pl-3 p-2 text-sm bg-inputBg hover:bg-inputBgHover w-full h-[2.3rem] border rounded-md border-inputBorder text-primaryText placeholder-secondaryText hover:border-inputBorderHover transition"
            placeholderText="Pick a date"
          />
          <div
            onClick={() => datePickerRef.current?.setOpen(true)}
            className="absolute right-2 top-2 stroke-gray-400 fill-gray-400 text-gray-400 hover:stroke-calendarIconHover hover:fill-calendarIconHover cursor-pointer transition"
          >
            <CalendarIcon />
          </div>
        </div>
      </div>
    </Card>
  );
};
