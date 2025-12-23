import * as React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export type CalendarProps = {
  mode?: "single";
  selected?: Date;
  onSelect?: (date: Date | undefined) => void;
  initialFocus?: boolean;
  className?: string;
};

function Calendar({
  selected,
  onSelect,
  className,
  ...props
}: CalendarProps) {
  const handleDateChange = (date: Date | null) => {
    onSelect?.(date || undefined);
  };

  return (
    <DatePicker
      selected={selected}
      onChange={handleDateChange}
      inline
      className={className}
      {...props}
    />
  );
}

Calendar.displayName = "Calendar";

export { Calendar };
