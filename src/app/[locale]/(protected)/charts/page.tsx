import { Metadata } from "next";

import { PageWrapper } from "../../../../components/common/PageWrapper";
import { ChartsView } from "../../../../components/views/charts/ChartsView";

const ChartsPage = () => {
  return (
    <PageWrapper pageName="Charts">
      <ChartsView />
    </PageWrapper>
  );
};

export const metadata: Metadata = { title: "Charts" };

export default ChartsPage;
