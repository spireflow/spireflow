import { PageWrapper } from "../../../../components/common/PageWrapper";
import { CalendarView } from "../../../../components/views/calendar/CalendarView";
import { getData } from "../../../../services/getData";

export const Calendar = async () => {
  const eventsData = await getData("events");

  return (
    <PageWrapper pageName="Calendar" dataForExport={eventsData}>
      <CalendarView calendarEvents={eventsData} />
    </PageWrapper>
  );
};

export default Calendar;
