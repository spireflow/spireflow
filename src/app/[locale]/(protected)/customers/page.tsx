import { PageWrapper } from "../../../../components/common/PageWrapper";
import { CustomersView } from "../../../../components/views/customers/CustomersView";
import { getData } from "../../../../services/getData";

const Customers = async () => {
  const customersData = await getData("customers");

  return (
    <PageWrapper
      className="flex-col"
      pageName="Customers"
      dataForExport={customersData}
    >
      <CustomersView customers={customersData} />
    </PageWrapper>
  );
};

export default Customers;
