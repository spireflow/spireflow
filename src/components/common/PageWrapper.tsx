"use client";

import { ReactNode } from "react";
import { useTranslations } from "next-intl";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./shadcn/breadcrumb";
import { DateRangeSelector } from "../../layout/dateRangeSelect/DateRangeSelector";

type LayoutType = "dashboard" | "content" | "table";
type BreadcrumbCategory = "ecommerce" | "components" | "default";

interface PageConfig {
  layoutType: LayoutType;
  breadcrumbCategory: BreadcrumbCategory;
}

const PAGE_CONFIG: Record<string, PageConfig> = {
  Dashboard: { layoutType: "dashboard", breadcrumbCategory: "default" },
  Analytics: { layoutType: "content", breadcrumbCategory: "default" },
  Profile: { layoutType: "content", breadcrumbCategory: "default" },
  Orders: { layoutType: "table", breadcrumbCategory: "ecommerce" },
  Customers: { layoutType: "table", breadcrumbCategory: "ecommerce" },
  Products: { layoutType: "table", breadcrumbCategory: "ecommerce" },
  Calendar: { layoutType: "table", breadcrumbCategory: "default" },
  Charts: { layoutType: "content", breadcrumbCategory: "components" },
  "UI Elements": { layoutType: "content", breadcrumbCategory: "components" },
  Forms: { layoutType: "content", breadcrumbCategory: "components" },
  Tables: { layoutType: "content", breadcrumbCategory: "components" },
};

const DEFAULT_PAGE_CONFIG: PageConfig = {
  layoutType: "table",
  breadcrumbCategory: "default",
};

const LAYOUT_STYLES = {
  dashboard: {
    showTopBar: false,
    showPaper: false,
    mainClasses:
      "pt-[3.8rem] md:!pt-[5.3rem] xl:!pt-[5.3rem] 3xl:!pt-[5.8rem] md:px-8 xl:px-0 pb-0 md:!pb-8 xl:pb-8",
    contentGapClass: "pt-5",
  },
  content: {
    showTopBar: true,
    showPaper: false,
    mainClasses:
      "pt-[4rem] md:!pt-[5.5rem] xl:!pt-[5.5rem] 3xl:!pt-[6rem] md:px-8 xl:px-0 pb-0 md:!pb-8 xl:pb-8",
    contentGapClass: "pt-3",
  },
  table: {
    showTopBar: true,
    showPaper: true,
    mainClasses:
      "pt-[5.5rem] md:pt-[5.5rem] xl:pt-[5.5rem] 1xl:pt-[5.5rem] 3xl:pt-[6rem]",
    contentGapClass: "",
  },
} as const;

interface PageWrapperProps {
  children: ReactNode;
  pageName?: string;
  dataForExport?: unknown;
  enableBreadcrumbLink?: boolean;
}

/**
 * Main page layout wrapper with breadcrumbs and global date range selector.
 * Layout and breadcrumb category are auto-resolved from pageName via PAGE_CONFIG.
 *
 * @param props.children - Main page content
 * @param props.pageName - Page identifier (must match PAGE_CONFIG key)
 * @param props.enableBreadcrumbLink - Enable clickable breadcrumb link
 *
 * @example
 * <PageWrapper pageName="Orders">
 *   <OrdersTable />
 * </PageWrapper>
 */
export const PageWrapper = ({
  children,
  pageName,
  enableBreadcrumbLink = false,
}: PageWrapperProps) => {
  const t = useTranslations("breadcrumbs");

  const pageConfig = pageName
    ? (PAGE_CONFIG[pageName] ?? DEFAULT_PAGE_CONFIG)
    : DEFAULT_PAGE_CONFIG;
  const styles = LAYOUT_STYLES[pageConfig.layoutType];

  const getBreadcrumbFirstPart = (): string => {
    const { breadcrumbCategory } = pageConfig;
    if (breadcrumbCategory === "ecommerce") return t("ecommerce");
    if (breadcrumbCategory === "components") return t("components");
    return t("firstPart");
  };

  const topBar = (
    <div className="w-full flex justify-between items-center">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/" disabledLink={!enableBreadcrumbLink}>
              {getBreadcrumbFirstPart()}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>
              {t(pageName?.toLowerCase() ?? "dashboard")}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <DateRangeSelector />
    </div>
  );

  return (
    <main
      className={`flex pb-0 flex-col max-w-full w-full md:pb-0 xl:pb-8 items-center ${styles.mainClasses}`}
      role="main"
    >
      <div className="flex flex-col max-w-full w-full">
        {styles.showPaper && (
          <div className="px-6 xsm:px-8 xl:px-0">{topBar}</div>
        )}
        {styles.showPaper ? (
          <div className="mt-3 flex w-full max-w-full py-8 bg-primaryBg xl:rounded-[10px] shadow-lg border-t xl:border border-mainBorder xl:rounded-[12px] px-6 xsm:p-8 1xl:p-10">
            {children}
          </div>
        ) : (
          <div className="flex flex-col w-full max-w-full h-full py-4 px-6 pt-6 sm:py-6 xsm:px-8 md:p-0">
            {styles.showTopBar && topBar}
            <div
              className={`flex flex-col w-full gap-y-4 1xl:gap-y-6 max-w-full h-full ${styles.contentGapClass}`}
            >
              {children}
            </div>
          </div>
        )}
      </div>
    </main>
  );
};
