import { PageWrapper } from "../../../../components/common/PageWrapper";
import { OrdersView } from "../../../../components/views/orders/OrdersView";
import { getData } from "../../../../services/getData";

const Orders = async () => {
  const ordersData = await getData("orders");

  return (
    <PageWrapper pageName="Orders" dataForExport={ordersData}>
      <OrdersView ordersData={ordersData} />
    </PageWrapper>
  );
};

export default Orders;
