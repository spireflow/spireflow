import { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

import { PageWrapper } from "../../../../components/common/PageWrapper";
import { ProductsView } from "../../../../components/views/products/ProductsView";
import { getData } from "../../../../services/getData";

const Products = async ({
  params,
}: {
  params: Promise<{ locale: string }>;
}) => {
  const { locale } = await params;
  setRequestLocale(locale);

  const productsData = await getData("products");

  return (
    <PageWrapper pageName="Products" dataForExport={productsData}>
      <ProductsView products={productsData} />
    </PageWrapper>
  );
};

export const metadata: Metadata = { title: "Products" };

export default Products;
