import React, { Suspense, lazy } from "react";
import { Geographies, Geography } from "react-simple-maps";
import Tooltip from "rc-tooltip";
import "rc-tooltip/assets/bootstrap.css";
import "react-tooltip/dist/react-tooltip.css";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";

import { EnglishIcon } from "../../../assets/icons/EnglishIcon";
import { PolishIcon } from "../../../assets/icons/PolishIcon";
import { UnitedStatesIcon } from "../../../assets/icons/UnitedStatesIcon";
import { FranceIcon } from "../../../assets/icons/FranceIcon";
import { NorwayIcon } from "../../../assets/icons/NorwayIcon";
import { AustraliaIcon } from "../../../assets/icons/AustraliaIcon";
import { useBackendTranslations } from "../../../hooks/useBackendTranslations";
import { useTranslateData } from "../../../hooks/useTranslateData";
import { Card } from "../../common/Card";
import { SpinnerIcon } from "../../../assets/icons/SpinnerIcon";
import { RevenuePerCountryProps } from "./types";
import { useChartColors } from "../../../hooks/useChartColors";
import { useWindowDimensions } from "../../../hooks/useWindowDimensions";

const ComposableMapLazy = lazy(() =>
  import("react-simple-maps").then((module) => ({
    default: module.ComposableMap,
  }))
);

export const RevenuePerCountry = ({
  revenuePerCountryData,
}: RevenuePerCountryProps) => {
  const t = useTranslations("homepage.revenuePerCountry");
  const backendTranslations = useBackendTranslations(
    "homepage.revenuePerCountry"
  );
  const translatedData = useTranslateData(
    revenuePerCountryData,
    backendTranslations
  );

  const countryIconMap: {
    [key: string]: React.FC<React.SVGProps<SVGSVGElement>> | undefined;
  } = {
    [t("unitedStates")]: UnitedStatesIcon,
    [t("france")]: FranceIcon,
    [t("unitedKingdom")]: EnglishIcon,
    [t("norway")]: NorwayIcon,
    [t("australia")]: AustraliaIcon,
    [t("poland")]: PolishIcon,
  };

  const dataWithIcons = translatedData
    .filter((country) => countryIconMap[country.name])
    .map((country) => ({
      ...country,
      FlagIcon: countryIconMap[country.name],
    }));

  const { theme } = useTheme();
  const { width: windowWidth } = useWindowDimensions();

  const chartColors = useChartColors(
    theme as "dark" | "light"
  );

  const isCompact = windowWidth >= 768 && windowWidth < 1024;
  const mapScale = isCompact ? 165 : 200;
  const mapMarginLeft = isCompact ? "-2rem" : "-4rem";

  const HIGHLIGHT_COLOR = chartColors.primary.fill;
  const BORDER_COLOR = theme === "light" ? "rgb(0,0,0,0.18)" : "rgb(255,255,255,0.1)";

  return (
    <Card
      className="h-full relative overflow-hidden flex flex-col"
      id="revenuePerCountry"
      title={t("title")}
    >
      <div className="flex justify-between">
        <div className={`${isCompact ? "w-[70%]" : "w-[65%]"} worldMap flex items-center justify-center md:h-[19rem] lg:h-[23rem] xl:h-[23rem] 1xl:h-[24.5rem] 2xl:h-[27rem] 3xl:h-[33rem] -mb-6`}>
          <Suspense
            fallback={
              <div className="w-full flex items-center justify-center pb-10">
                <SpinnerIcon width={100} height={100} />
              </div>
            }
          >
            <ComposableMapLazy
              style={{
                width: "100%",
                height: "100%",
                marginLeft: mapMarginLeft,
                marginTop: isCompact ? "1.5rem" : "3rem",
              }}
              stroke={BORDER_COLOR}
              projectionConfig={{
                scale: mapScale,
              }}
              tabIndex={-1}
            >
              <Geographies geography="/geographies.json">
                {({ geographies }) =>
                  geographies.map((geo) => {
                    const countryName = geo.properties.name;
                    if (countryName === "Antarctica") {
                      return null;
                    }
                    const countryData = revenuePerCountryData.find(
                      (s) => s.name === countryName
                    );
                    const tooltipContent = countryData
                      ? `${countryName} - ${countryData.price}$`
                      : `${countryName}`;

                    return (
                      <Tooltip
                        placement="top"
                        overlay={<span>{tooltipContent}</span>}
                        key={geo.rsmKey}
                      >
                        <Geography
                          geography={geo}
                          fill={
                            countryData
                              ? HIGHLIGHT_COLOR
                              : theme === "light"
                                ? "rgb(0,0,0,0.13)"
                                : "rgba(255, 255, 255, 0.1)"
                          }
                          tabIndex={-1}
                          style={{
                            default: { outline: "none" },
                            hover: { fill: HIGHLIGHT_COLOR, outline: "none" },
                            pressed: { outline: "none" },
                          }}
                        />
                      </Tooltip>
                    );
                  })
                }
              </Geographies>
            </ComposableMapLazy>
          </Suspense>
        </div>
        <div className={`${isCompact ? "w-[30%]" : "w-[35%]"} flex overflow-auto md:pt-[0.75rem] lg:pt-[2rem] xl:pt-[2.5rem] 1xl:pt-[2.5rem] 2xl:pt-[3rem] 3xl:pt-[5rem] items-start justify-start`}>
          <div className={`flex flex-col w-full ${isCompact ? "pl-[5%] pr-[5%]" : "pl-[10%] md:pr-[10%] lg:pr-[20%]"}`}>
            <div className="w-full flex justify-between mb-[0.5rem] text-[12px] lg:text-[14px] 3xl:text-[16px]">
              <h3 className="font-semibold text-primaryText">{t("country")}</h3>
              <h3 className="font-semibold text-primaryText">{t("sales")}</h3>
            </div>
            {dataWithIcons.map((data, index) => (
              <div
                key={index}
                className={`flex justify-between items-center border-t border-mainBorder 2xl:pt-3 2xl:pb-3 ${isCompact ? "pt-1 pb-1" : "pt-2 pb-2"}`}
              >
                <div className={`flex items-center ${isCompact ? "space-x-1.5" : "space-x-3"}`}>
                  <div className={`flex ${isCompact ? "scale-75" : ""}`}>
                    {data.FlagIcon && <data.FlagIcon />}
                  </div>
                  <span className={`text-primaryText ${isCompact ? "text-[10px]" : "text-xs"} 3xl:text-sm`}>
                    {data.name}
                  </span>
                </div>
                <span className={`font-semibold text-primaryText ${isCompact ? "text-[10px]" : "text-sm"} 3xl:text-sm`}>
                  ${data.price}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
};
