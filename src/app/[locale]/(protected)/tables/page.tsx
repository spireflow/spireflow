import { Metadata } from "next";

import { PageWrapper } from "../../../../components/common/PageWrapper";
import { TablesView } from "../../../../components/views/tables/TablesView";

const TablesPage = () => {
  return (
    <PageWrapper pageName="Tables">
      <TablesView />
    </PageWrapper>
  );
};

export const metadata: Metadata = { title: "Tables" };

export default TablesPage;
