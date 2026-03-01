import { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

import { PageWrapper } from "../../../../components/common/PageWrapper";
import { OrdersView } from "../../../../components/views/orders/OrdersView";
import { getData } from "../../../../services/getData";

const Orders = async ({ params }: { params: Promise<{ locale: string }> }) => {
  const { locale } = await params;
  setRequestLocale(locale);

  const ordersData = await getData("orders");

  return (
    <PageWrapper pageName="Orders" dataForExport={ordersData}>
      <OrdersView ordersData={ordersData} />
    </PageWrapper>
  );
};

export default Orders;
export const metadata: Metadata = { title: "Orders" };
