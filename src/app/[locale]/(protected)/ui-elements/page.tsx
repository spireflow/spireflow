import { Metadata } from "next";

import { PageWrapper } from "../../../../components/common/PageWrapper";
import { UIElementsView } from "../../../../components/views/uiElements/UIElementsView";

const UIElementsPage = () => {
  return (
    <PageWrapper pageName="UI Elements">
      <UIElementsView />
    </PageWrapper>
  );
};

export const metadata: Metadata = { title: "UI Elements" };

export default UIElementsPage;
