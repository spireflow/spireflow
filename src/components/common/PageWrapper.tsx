"use client";

import { ReactNode } from "react";
import { useTranslations } from "next-intl";

import { Breadcrumbs } from "./Breadcrumbs";
import { DownloadIcon } from "../../assets/icons/DownloadIcon";
import { exportToCSV } from "../../utils/exportToCSV";
import { useTooltip } from "../../hooks/useTooltip";

interface PageWrapperProps {
  children: ReactNode;
  className?: string;
  hidePaper?: boolean;
  pageName?: string;
  dataForExport?: unknown;
  hideTopBar?: boolean;
}

export const PageWrapper = ({
  children,
  hidePaper = false,
  pageName,
  dataForExport,
  hideTopBar = false,
}: PageWrapperProps) => {
  const handleExportToCSV = () => {
    if (dataForExport) {
      const exportName = pageName?.toLowerCase() || "export";
      exportToCSV(dataForExport, exportName, pageName);
    }
  };

  const csvButton = (
    <div className="w-[6rem] h-[2.4rem] relative">
      <button
        className="-mt-[0.1rem] text-xs xsm:text-sm 3xl:text-base cursor-pointer flex rounded-md justify-center items-center gap-2 w-full h-full p-2 px-4 !outline-0 border border-mainBorder hover:border-mainBorderHover text-primaryText stroke-grayIcon fill-grayIcon"
        onClick={handleExportToCSV}
        disabled={!dataForExport}
      >
        <DownloadIcon /> CSV
      </button>
    </div>
  );

  return (
    <main
      className={`flex pb-0 flex-col min-h-screen max-w-full h-full w-full  pb-0 md:pb-0 xl:pb-8 items-center      
      ${
        !hidePaper &&
        // Spacing for Orders, Customers, Products and Calendar pages
        "pt-[5.5rem] md:pt-[5.5rem] xl:pt-[5.5rem] 1xl:pt-[5.5rem] 3xl:pt-[6rem]"
      }
      ${
        hidePaper && hideTopBar &&
        // Spacing for Homepage only (no breadcrumb bar)
        "pt-[3.8rem] md:!pt-[5.3rem] xl:!pt-[5.3rem] 3xl:!pt-[5.8rem] md:px-8 xl:px-0 pb-0 md:!pb-8 xl:pb-8"
      }
      ${
        hidePaper && !hideTopBar &&
        // Spacing for Analytics page (with breadcrumb bar)
        "pt-[4rem] md:!pt-[5.5rem] xl:!pt-[5.5rem] 3xl:!pt-[6rem] md:px-8 xl:px-0 pb-0 md:!pb-8 xl:pb-8"
      }
      `}
      role="main"
    >
      <div className="flex flex-col max-w-full w-full min-h-full lg:h-unset">
        {!hidePaper && !hideTopBar && (
          // Breadcrumbs for Orders, Customers, Products and Calendar pages
          <div className="px-6 xsm:px-8 xl:px-0 w-full flex justify-between items-center">
            <Breadcrumbs pageName={pageName} />
            {csvButton}
          </div>
        )}
        {hidePaper ? (
          <div
            className="flex flex-col w-full max-w-full h-full py-4 px-6 pt-6 sm:py-6 xsm:px-8 md:p-0"
            aria-hidden="true"
          >
            {!hideTopBar && (
              <div className="w-full flex justify-between items-center">
                {/* Breadcrumbs for Home and Analytics pages */}
                <Breadcrumbs pageName={pageName} />
                {csvButton}
              </div>
            )}
            <div className="flex flex-col w-full gap-y-4 1xl:gap-y-6 max-w-full h-full pt-3">
              {/* Content for Home and Analytics pages */}
              {children}
            </div>
          </div>
        ) : (
          <div className="mt-3 flex w-full max-w-full px-6 py-8 xsm:p-8 1xl:p-10 bg-primaryBg xl:rounded-[10px] shadow-lg border-t xl:border border-mainBorder min-h-[100vh] xl:min-h-unset xl:rounded-[12px] xl:border">
            {/* Content for Orders, Customers, Products and Calendar pages */}
            {children}
          </div>
        )}
      </div>
    </main>
  );
};
