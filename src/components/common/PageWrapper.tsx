"use client";

import { useTranslations } from "next-intl";
import { ReactNode } from "react";

import { DateRangeSelector } from "../layout/dateRangeSelect/DateRangeSelector";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./shadcn/breadcrumb";

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
  "User Management": { layoutType: "table", breadcrumbCategory: "default" },
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
      "pt-[3.8rem] md:!pt-[5.3rem] xl:!pt-[5.3rem] 3xl:!pt-[5.8rem] md:px-8 xl:px-0 pb-10 md:pb-10 xl:pb-8",
    contentGapClass: "pt-5",
  },
  content: {
    showTopBar: true,
    showPaper: false,
    mainClasses:
      "pt-16 md:!pt-22 xl:!pt-22 3xl:!pt-24 md:px-8 xl:px-0 pb-10 md:pb-10 xl:pb-8",
    contentGapClass: "pt-3",
  },
  table: {
    showTopBar: true,
    showPaper: true,
    mainClasses: "pt-22 md:pt-22 xl:pt-22 1xl:pt-22 3xl:pt-24 xl:pb-8",
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

  const isEcommerce = pageConfig.breadcrumbCategory === "ecommerce";

  const getBreadcrumbFirstPart = (): string => {
    const { breadcrumbCategory } = pageConfig;
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
          {isEcommerce && (
            <span className="hidden xsm:contents">
              <BreadcrumbItem>
                <BreadcrumbLink disabledLink>{t("ecommerce")}</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
            </span>
          )}
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
      className={`flex flex-col max-w-full w-full items-center ${styles.mainClasses}`}
      role="main"
    >
      <div className="flex flex-col max-w-full w-full">
        {styles.showPaper && (
          <div className="px-6 xsm:px-8 xl:px-0">{topBar}</div>
        )}
        {styles.showPaper ? (
          <div className="mt-3 flex w-full max-w-full pt-8 pb-18 xl:pb-8 1xl:pb-10 bg-primaryBg shadow-lg border-t xl:border border-mainBorder xl:rounded-xl px-6 xsm:px-8 xsm:pt-8 1xl:px-10 1xl:pt-10">
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
