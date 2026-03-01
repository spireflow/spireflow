import { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

import { PageWrapper } from "../../../components/common/PageWrapper";
import { getData } from "../../../services/getData";
import { HomepageView } from "../../../components/views/homepage/HomepageView";

const Home = async ({ params }: { params: Promise<{ locale: string }> }) => {
  const { locale } = await params;
  setRequestLocale(locale);

  const homepageData = await getData("homepage");

  return (
    <PageWrapper pageName="Dashboard" dataForExport={homepageData}>
      <HomepageView homepageData={homepageData} />
    </PageWrapper>
  );
};

// All API requests are resolved during build time on default for demo purposes
// Uncomment those exports to enable dynamic rendering on this page
// export const dynamic = 'force-dynamic'
// export const revalidate = 0

export const metadata: Metadata = {
  title: { absolute: "Spireflow" },
};

export default Home;
