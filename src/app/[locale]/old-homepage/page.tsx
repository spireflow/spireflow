import { PageWrapper } from "../../../components/common/PageWrapper";
import { getData } from "../../../services/getData";
import { OldHomepageView } from "../../../components/views/oldHomepage/OldHomepageView";

const OldHomepage = async () => {
  const oldHomepageData = await getData("oldHomepage");

  return (
    <PageWrapper
      hidePaper
      hideTopBar
      className="pt-32"
      pageName="Dashboard (Old Version)"
      dataForExport={oldHomepageData}
    >
      <OldHomepageView oldHomepageData={oldHomepageData} />
    </PageWrapper>
  );
};

// All API requests are resolved during build time on default for demo purposes
// Uncomment those exports to enable dynamic rendering on this page
// export const dynamic = 'force-dynamic'
// export const revalidate = 0

export default OldHomepage;
