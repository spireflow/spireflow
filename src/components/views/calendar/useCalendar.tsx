import { useEffect, useState, useCallback, useRef } from "react";
import { DateSelectArg, EventClickArg } from "@fullcalendar/core";
import { EventResizeDoneArg } from "@fullcalendar/interaction";
import { EventImpl } from "@fullcalendar/core/internal";
import { useTranslations } from "next-intl";

import { CalendarAction, CalendarEvent, CalendarViewProps } from "./types";

let eventGuid = 0;
const createEventId = () => String(eventGuid++);

const currentYear = new Date().getFullYear();
const currentMonth = new Date().getMonth();

export const mockDatesForEvents = [
  {
    start: new Date(currentYear, currentMonth, 3, 10).toISOString(),
  },
  {
    start: new Date(currentYear, currentMonth, 3, 15, 0).toISOString(),
  },
  {
    start: new Date(currentYear, currentMonth, 6, 12).toISOString(),
  },
  {
    start: new Date(currentYear, currentMonth, 17, 12, 30).toISOString(),
  },
  {
    start: new Date(currentYear, currentMonth, 14, 10, 0).toISOString(),
  },
  {
    start: new Date(currentYear, currentMonth, 14, 16, 0).toISOString(),
  },
  {
    start: new Date(currentYear, currentMonth, 25, 14, 0).toISOString(),
  },
  {
    start: new Date(currentYear, currentMonth, 25, 16, 0).toISOString(),
  },
  {
    start: new Date(currentYear, currentMonth, 27, 11, 0).toISOString(),
    end: new Date(currentYear, currentMonth, 27, 13, 0).toISOString(),
  },
  {
    start: new Date(currentYear, currentMonth, 30, 15, 0).toISOString(),
  },
  {
    start: new Date(currentYear, currentMonth, 30, 10, 0).toISOString(),
  },
  {
    start: new Date(currentYear, currentMonth, 9, 14).toISOString(),
    end: new Date(currentYear, currentMonth, 12, 14).toISOString(),
  },
  {
    start: new Date(currentYear, currentMonth, 21, 12).toISOString(),
    end: new Date(currentYear, currentMonth, 24, 10).toISOString(),
  },
];

export const useCalendar = ({ calendarEvents }: CalendarViewProps) => {
  const t = useTranslations("calendar");
  const [currentEvents, setCurrentEvents] = useState<CalendarEvent[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<EventImpl | null>(null);
  const [currentAction, setCurrentAction] = useState<CalendarAction>(null);
  const [eventTitle, setEventTitle] = useState("");
  const hours = Array.from({ length: 9 }, (_, i) => `${i + 8}:00`);
  const [eventStart, setEventStart] = useState(hours[0]);
  const [eventEnd, setEventEnd] = useState(hours[0]);
  const [addEventError, setAddEventError] = useState("");
  const [addEventModalOpen, setAddEventModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const lastFocusedElementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    // Here we assign dates to each event from the backend based on index
    // Normally dates would come from backend, but I wanted to keep events always in current month for demo purposes
    const mergedEvents = calendarEvents.map((event, index) => {
      const mockDate = mockDatesForEvents[index];
      return { ...event, ...mockDate };
    });
    setCurrentEvents(mergedEvents);
  }, [calendarEvents]);

  const handleConfirmDelete = () => {
    if (selectedEvent) {
      selectedEvent.remove();
      setSelectedEvent(null);
      setModalOpen(false);
    }
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setSelectedEvent(null);
  };

  const handleAddEventModalOpen = (startStr: string) => {
    lastFocusedElementRef.current = document.activeElement as HTMLElement;
    setSelectedDate(startStr);
    setAddEventModalOpen(true);
    setEventTitle("");
    setEventStart(hours[0]);
    setEventEnd(hours[0]);
    setAddEventError("");
  };

  const handleAddEventModalClose = useCallback(() => {
    setAddEventModalOpen(false);
  }, []);

  const handleAddEventModalConfirm = useCallback(() => {
    let validationError = "";
    if (eventTitle === "") {
      validationError = t("addEventTitleRequiredError");
    } else if (eventTitle.length > 20) {
      validationError = t("addEventLengthError");
    } else {
      const startDate = new Date(selectedDate);
      const endDate = new Date(selectedDate);
      const [startHour, startMinute] = eventStart.split(":").map(Number);
      const [endHour, endMinute] = eventEnd.split(":").map(Number);
      startDate.setHours(startHour, startMinute);
      endDate.setHours(endHour, endMinute);
      if (startDate >= endDate) {
        validationError = t("addEventIncorrectTime");
      }
    }
    setAddEventError(validationError);
    if (!validationError) {
      const startDate = new Date(selectedDate);
      const [startHour, startMinute] = eventStart.split(":").map(Number);
      startDate.setHours(startHour, startMinute);
      const endDate = new Date(selectedDate);
      const [endHour, endMinute] = eventEnd.split(":").map(Number);
      endDate.setHours(endHour, endMinute);

      setCurrentEvents([
        ...currentEvents,
        {
          id: createEventId(),
          title: eventTitle,
          start: startDate.toISOString(),
          end: endDate.toISOString(),
        },
      ]);
      handleAddEventModalClose();
      setEventTitle("");
      setSelectedDate("");
    }
  }, [eventTitle, eventStart, eventEnd, selectedDate, currentEvents, t]);

  const handleDateSelect = (selectInfo: DateSelectArg) => {
    handleAddEventModalOpen(selectInfo.startStr);
    const calendarApi = selectInfo.view.calendar;
    calendarApi.unselect();
  };

  const handleConfirmAction = () => {
    if (!selectedEvent) return;
    switch (currentAction) {
      case "delete":
        selectedEvent.remove();
        break;
      case "move":
        break;
    }
    resetModalState();
  };

  const resetModalState = () => {
    setSelectedEvent(null);
    setCurrentAction(null);
    setModalOpen(false);
  };

  const handleEventClick = (clickInfo: EventClickArg) => {
    setSelectedEvent(clickInfo.event);
    setModalOpen(true);
    setCurrentAction("delete");
  };

  const handleEventDrop = () => {
    return true;
  };

  const handleEventResize = (resizeInfo: EventResizeDoneArg) => {
    window.confirm(
      `Change '${resizeInfo.event.title}' to end at ${resizeInfo.event.end}?`
    );
  };

  return {
    currentEvents,
    handleEventClick,
    handleDateSelect,
    handleEventDrop,
    handleEventResize,
    modalOpen,
    handleConfirmDelete,
    handleConfirmAction,
    handleModalClose,
    currentAction,
    selectedEvent,
    addEventModalOpen,
    handleAddEventModalOpen,
    handleAddEventModalClose,
    handleAddEventModalConfirm,
    eventTitle,
    setEventTitle,
    eventStart,
    setEventStart,
    eventEnd,
    setEventEnd,
    addEventError,
    hours,
    lastFocusedElementRef,
  };
};
