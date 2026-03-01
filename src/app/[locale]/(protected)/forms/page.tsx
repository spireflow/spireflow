import { Metadata } from "next";

import { PageWrapper } from "../../../../components/common/PageWrapper";
import { FormsView } from "../../../../components/views/forms/FormsView";

const FormsPage = () => {
  return (
    <PageWrapper pageName="Forms">
      <FormsView />
    </PageWrapper>
  );
};

export const metadata: Metadata = { title: "Forms" };

export default FormsPage;
