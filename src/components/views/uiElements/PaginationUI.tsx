"use client";

import { useTranslations } from "next-intl";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../common/shadcn/card";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../../common/shadcn/pagination";

/**
 * Showcase of pagination variants: standard multi-page pagination
 * with ellipsis and a simple previous/next pagination.
 *
 * @component
 */
export const PaginationUI = () => {
  const t = useTranslations("uiElements");

  return (
    <Card id="pagination">
      <CardHeader variant="divider">
        <CardTitle>{t("pagination")}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-3">
            <span className="text-sm font-medium">With Page Numbers</span>
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink>1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink isActive>2</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink>3</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink>10</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>

          <div className="flex flex-col gap-3">
            <span className="text-sm font-medium">Simple</span>
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious />
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
