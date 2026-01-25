import { useTranslations } from "next-intl";

import { useTranslateData } from "../../../hooks/useTranslateData";
import { FourSmallCardsProps } from "./types";
import { Card } from "../../common/Card";
import { DollarIcon } from "../../../assets/icons/DollarIcon";
import { AnalyticsIcon } from "../../../assets/icons/AnalyticsIcon";
import { CustomersIcon } from "../../../assets/icons/CustomersIcon";
import { EcommerceIcon } from "../../../assets/icons/EcommerceIcon";

const iconConfig = [
  { Icon: EcommerceIcon, iconClass: "text-fourCardIconGreen" },
  { Icon: DollarIcon, iconClass: "text-fourCardIconBlue" },
  { Icon: AnalyticsIcon, iconClass: "text-fourCardIconGreen" },
  { Icon: CustomersIcon, iconClass: "text-fourCardIconBlue" },
];

export const FourSmallCards = ({ fourSmallCardsData }: FourSmallCardsProps) => {
  const t = useTranslations("homepage.fourSmallCards");

  const translations = {
    Sales: t("sales"),
    Profit: t("profit"),
    Traffic: t("traffic"),
    Customers: t("customers"),
    "Last 3 weeks": t("Last 3 weeks"),
    "Last month": t("Last month"),
    Yesterday: t("Yesterday"),
    "Last week": t("Last week"),
  };

  const translatedData = useTranslateData(fourSmallCardsData, translations);
  const cardIds = ["salesCard", "profitCard", "trafficCard", "customersCard"];

  return (
    <>
      {translatedData.map((item, index) => {
        const { Icon, iconClass } = iconConfig[index];
        return (
          <Card
            key={`${item.title}-${index}`}
            id={cardIds[index]}
            className="lg:h-28 1xl:h-28 3xl:h-32 px-5 py-4 2xl:px-6"
          >
            <div className="flex items-center gap-6 h-full">
              <div
                className="flex items-center justify-center w-14 h-14 lg:w-12 lg:h-12 1xl:w-14 1xl:h-14 3xl:w-16 3xl:h-16 rounded-full border border-mainBorder transition-colors hover:bg-fourCardIconBgHover"
              >
                <div className={`${iconClass} stroke-current [&_svg]:w-6 [&_svg]:h-6 lg:[&_svg]:w-5 lg:[&_svg]:h-5 1xl:[&_svg]:w-6 1xl:[&_svg]:h-6 3xl:[&_svg]:w-7 3xl:[&_svg]:h-7`}>
                  <Icon />
                </div>
              </div>
              <div className="flex flex-col justify-center">
                <div className="text-secondaryText text-sm lg:text-xs 1xl:text-sm tracking-tight">
                  {item.title}
                </div>
                <div className="text-[1.75rem] lg:text-[1.4rem] 1xl:text-[1.6rem] 3xl:text-[1.85rem] font-semibold text-primaryText">
                  {item.metric}
                </div>
                <div className="flex items-center gap-1.5 text-xs text-secondaryText mt-0.5">
                  <span>{item.changeText}</span>
                  <span
                    className={
                      item.increased ? "text-green-500/70" : "text-red-500/70"
                    }
                  >
                    {item.increased ? "+" : "-"}
                    {item.changeValue}%
                  </span>
                </div>
              </div>
            </div>
          </Card>
        );
      })}
    </>
  );
};
