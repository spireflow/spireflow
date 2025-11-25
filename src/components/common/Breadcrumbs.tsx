import { useTranslations } from "next-intl";

interface BreadcrumbsProps {
  pageName?: string;
}

export const Breadcrumbs = ({ pageName }: BreadcrumbsProps) => {
  const t = useTranslations("breadcrumbs");

  const ecommercePages = ["Orders", "Customers", "Products"];
  const isEcommercePage = pageName && ecommercePages.includes(pageName);

  const componentsPages = ["Charts", "UI Elements", "Forms", "Tables"];
  const isComponentsPage = pageName && componentsPages.includes(pageName);

  let firstPart = t("firstPart");
  if (isEcommercePage) {
    firstPart = t("ecommerce");
  } else if (isComponentsPage) {
    firstPart = t("components");
  }

  return (
    <div className="text-secondaryText text-sm 1xl:text-base font-semibold flex items-center gap-1.5">
      <span>{firstPart}</span>
      <span className="opacity-50">&gt;</span>
      <span>{t(pageName?.toLowerCase() as string)}</span>
    </div>
  );
};
