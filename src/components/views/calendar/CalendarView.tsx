"use client";

import plLocale from "@fullcalendar/core/locales/pl";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useRef } from "react";

import { AddEventModal } from "./parts/AddEventModal";
import { RemoveEventModal } from "./parts/RemoveEventModal";
import { CalendarViewProps } from "./types";
import { useCalendar } from "./useCalendar";

export const CalendarView = ({ calendarEvents }: CalendarViewProps) => {
  const t = useTranslations("calendar");

  const {
    currentEvents,
    handleEventClick,
    handleDateSelect,
    handleEventDrop,
    handleEventResize,
    modalOpen,
    handleConfirmAction,
    handleModalClose,
    currentAction,
    selectedEvent,
    addEventModalOpen,
    handleAddEventModalClose,
    handleAddEventModalConfirm,
    eventTitle,
    setEventTitle,
    eventStart,
    setEventStart,
    eventEnd,
    setEventEnd,
    addEventError,
    lastFocusedElementRef,
  } = useCalendar({ calendarEvents });

  const locale = useLocale();
  const calendarContainerRef = useRef<HTMLDivElement>(null);

  /** FullCalendar renders its own <button> elements in the DOM.
   *  Safari skips native buttons without explicit tabIndex, so we patch them after mount. */
  useEffect(() => {
    const container = calendarContainerRef.current;
    if (!container) return;
    const buttons = container.querySelectorAll<HTMLButtonElement>(
      ".fc-header-toolbar button",
    );
    buttons.forEach((btn) => {
      if (!btn.hasAttribute("tabindex")) {
        btn.setAttribute("tabindex", "0");
      }
    });
  });

  return (
    <div
      ref={calendarContainerRef}
      className="w-full h-full alternativeScrollbar"
    >
      <h1 className="sr-only">Calendar</h1>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin, listPlugin, timeGridPlugin]}
        initialView="dayGridMonth"
        events={currentEvents}
        eventClick={handleEventClick}
        selectable={true}
        weekends={false}
        showNonCurrentDates={false}
        select={handleDateSelect}
        editable={true}
        eventDrop={handleEventDrop}
        eventResize={handleEventResize}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
        }}
        locale={locale === "pl" ? plLocale : "en"}
      />
      {modalOpen && (
        <RemoveEventModal
          closeModal={handleModalClose}
          onConfirm={handleConfirmAction}
          loading={false}
          subtitle={`${t("deleteEventModalSubtitle")} ${
            currentAction === "delete" ? t("delete") : t("move")
          } ${t("theEvent")} '${selectedEvent ? selectedEvent.title : ""}'`}
          returnFocusRef={lastFocusedElementRef}
        />
      )}
      {addEventModalOpen && (
        <AddEventModal
          closeModal={handleAddEventModalClose}
          loading={false}
          title={eventTitle}
          startTime={eventStart}
          endTime={eventEnd}
          error={addEventError}
          onTitleChange={setEventTitle}
          onStartTimeChange={setEventStart}
          onEndTimeChange={setEventEnd}
          handleConfirmClick={handleAddEventModalConfirm}
          returnFocusRef={lastFocusedElementRef}
        />
      )}
    </div>
  );
};
