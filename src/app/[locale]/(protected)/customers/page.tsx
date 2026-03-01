import { setRequestLocale } from "next-intl/server";

import { PageWrapper } from "../../../../components/common/PageWrapper";
import { CustomersView } from "../../../../components/views/customers/CustomersView";
import { getData } from "../../../../services/getData";

const Customers = async ({
  params,
}: {
  params: Promise<{ locale: string }>;
}) => {
  const { locale } = await params;
  setRequestLocale(locale);

  const customersData = await getData("customers");

  return (
    <PageWrapper pageName="Customers" dataForExport={customersData}>
      <CustomersView customers={customersData} />
    </PageWrapper>
  );
};

export default Customers;
