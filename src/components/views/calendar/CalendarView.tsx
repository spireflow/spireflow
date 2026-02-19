"use client";

import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import plLocale from "@fullcalendar/core/locales/pl";
import timeGridPlugin from "@fullcalendar/timegrid";
import { useLocale, useTranslations } from "next-intl";

import { useCalendar } from "./useCalendar";
import { CalendarViewProps } from "./types";
import { useBackendTranslations } from "../../../hooks/useBackendTranslations";
import { useTranslateData } from "../../../hooks/useTranslateData";
import { AddEventModal } from "./AddEventModal";
import { RemoveEventModal } from "./RemoveEventModal";

export const CalendarView = ({ calendarEvents }: CalendarViewProps) => {
  const t = useTranslations("calendar");
  const backendTranslations = useBackendTranslations("calendar");
  const translatedData = useTranslateData(calendarEvents, backendTranslations);

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
  } = useCalendar({ calendarEvents: translatedData });

  const locale = useLocale();

  return (
    <div className="w-full h-full alternativeScrollbar">
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
