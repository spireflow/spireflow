import { EventApi } from "@fullcalendar/core";
import { RefObject } from "react";

export type CalendarEvent = {
  id: string;
  title: string;
  start: string | undefined;
  end?: string | undefined;
};

export interface FullCalendarEvent extends CalendarEvent {
  remove: () => void;
}

export interface CalendarViewProps {
  calendarEvents: CalendarEvent[];
}

export type CalendarAction = "delete" | "move" | null;

export interface EventChange {
  oldEvent: EventApi;
  newStart: Date;
  newEnd: Date | undefined;
}

export interface AddEventModalProps {
  closeModal: () => void;
  loading: boolean;
  title?: string;
  startTime?: string;
  endTime?: string;
  error?: string;
  onTitleChange: (title: string) => void;
  onStartTimeChange: (start: string) => void;
  onEndTimeChange: (end: string) => void;
  handleConfirmClick: () => void;
  IconComponent?: React.ElementType;
  type?: "delete" | "default";
  returnFocusRef?: RefObject<HTMLElement | null>;
}
