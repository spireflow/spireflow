import { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

import { PageWrapper } from "../../../../components/common/PageWrapper";
import { CalendarView } from "../../../../components/views/calendar/CalendarView";
import { getData } from "../../../../services/getData";

export const Calendar = async ({
  params,
}: {
  params: Promise<{ locale: string }>;
}) => {
  const { locale } = await params;
  setRequestLocale(locale);

  const eventsData = await getData("events");

  return (
    <PageWrapper pageName="Calendar" dataForExport={eventsData}>
      <CalendarView calendarEvents={eventsData} />
    </PageWrapper>
  );
};

export const metadata: Metadata = { title: "Calendar" };

export default Calendar;
