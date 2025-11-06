import { PageWrapper } from "../../../../components/common/PageWrapper";
import { getData } from "../../../../services/getData";
import { AnalyticsView } from "../../../../components/views/analytics/AnalyticsView";

const Analytics = async () => {
  const analyticsData = await getData("analytics");

  return (
    <PageWrapper
      className="px-4 pt-28 pb-4 xl:p-0"
      hidePaper
      pageName="Analytics"
      dataForExport={analyticsData}
    >
      <AnalyticsView analyticsData={analyticsData} />
    </PageWrapper>
  );
};

export default Analytics;
