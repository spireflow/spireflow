import React, { useEffect, useRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { OrdersDateRangeProps } from "./types";
import { CalendarIcon } from "../../../assets/icons/CalendarIcon";
import { useWindowDimensions } from "../../../hooks/useWindowDimensions";

export const OrdersDateRange = ({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
}: OrdersDateRangeProps) => {
  const startDatePickerRef = useRef(null);
  const endDatePickerRef = useRef(null);

  useEffect(() => {
    if (!startDate) {
      const oneYearAgo = new Date();
      oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
      setStartDate(oneYearAgo.toISOString().split("T")[0]);
    }

    if (!endDate) {
      const today = new Date();
      setEndDate(today.toISOString().split("T")[0]);
    }
  }, [startDate, endDate, setStartDate, setEndDate]);

  // Convert string to Date object for DatePicker `selected` prop
  const startDateObj = startDate ? new Date(startDate) : null;
  const endDateObj = endDate ? new Date(endDate) : null;

  // Handle Date change and convert back to ISO string format
  const handleStartDateChange = (date: Date | null) => {
    setStartDate(date ? date.toISOString().split("T")[0] : null);
  };

  const handleEndDateChange = (date: Date | null) => {
    setEndDate(date ? date.toISOString().split("T")[0] : null);
  };

  const { width: windowWidth } = useWindowDimensions();

  return (
    <div className="mb-4 flex space-x-4 w-full md:w-[21rem] ">
      <div className="flex relative  h-[2.3rem] 3xl:h-[2.6rem]">
        <DatePicker
          ref={startDatePickerRef}
          selected={startDateObj}
          onChange={handleStartDateChange}
          popperPlacement={windowWidth < 640 ? "bottom-start" : undefined}
          className="pl-3 md:max-w-[10rem] md:min-w-[10rem] p-2 text-sm 3xl:text-base bg-inputBg hover:bg-inputBgHover hover:bg-InputBgHover w-full  h-[2.3rem] 3xl:h-[2.6rem]  border rounded-md border-inputBorder text-primaryText placeholder-secondaryText hover:border-inputBorderHover transition"
        />
        <div
          // @ts-ignore
          onClick={() => startDatePickerRef.current.setOpen(true)}
          className="absolute right-2 top-[0.5rem] 3xl:top-[0.6rem] stroke-gray-400 fill-gray-400 text-gray-400 hover:stroke-calendarIconHover hover:fill-calendarIconHover cursor-pointer transition"
        >
          <CalendarIcon />
        </div>
      </div>
      <div className="flex relative">
        <DatePicker
          ref={endDatePickerRef}
          selected={endDateObj}
          onChange={handleEndDateChange}
          popperPlacement={windowWidth < 640 ? "bottom-start" : undefined}
          className="pl-3 md:max-w-[10rem] md:min-w-[10rem] p-2 text-sm 3xl:text-base bg-inputBg hover:bg-inputBgHover w-full  h-[2.3rem] 3xl:h-[2.6rem] border rounded-md border-inputBorder text-primaryText placeholder-secondaryText hover:border-inputBorderHover transition"
        />
        <div
          // @ts-ignore
          onClick={() => endDatePickerRef.current.setOpen(true)}
          className="absolute right-2 top-[0.5rem] 3xl:top-[0.6rem] stroke-gray-400 fill-gray-400 text-gray-400 hover:stroke-calendarIconHover hover:fill-calendarIconHover cursor-pointer transition"
        >
          <CalendarIcon />
        </div>
      </div>
    </div>
  );
};
