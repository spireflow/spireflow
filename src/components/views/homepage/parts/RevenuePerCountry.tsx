import { useTranslations } from "next-intl";
import React, { lazy, Suspense } from "react";
import { Geographies, Geography } from "react-simple-maps";

import { AustraliaIcon } from "../../../../assets/icons/AustraliaIcon";
import { EnglishIcon } from "../../../../assets/icons/EnglishIcon";
import { FranceIcon } from "../../../../assets/icons/FranceIcon";
import { NorwayIcon } from "../../../../assets/icons/NorwayIcon";
import { PolishIcon } from "../../../../assets/icons/PolishIcon";
import { SpinnerIcon } from "../../../../assets/icons/SpinnerIcon";
import { UnitedStatesIcon } from "../../../../assets/icons/UnitedStatesIcon";
import { useIsFirstRender } from "../../../../hooks/useIsFirstRender";
import { useWindowDimensions } from "../../../../hooks/useWindowDimensions";
import { BREAKPOINTS } from "../../../../styles/breakpoints";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../common/shadcn/card";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "../../../common/shadcn/tooltip";
import { RevenuePerCountryProps } from "../types";

const ComposableMapLazy = lazy(() =>
  import("react-simple-maps").then((module) => ({
    default: module.ComposableMap,
  })),
);

export const RevenuePerCountry = ({
  revenuePerCountryData,
}: RevenuePerCountryProps) => {
  const t = useTranslations("homepage.revenuePerCountry");

  const countryIconMap: {
    [key: string]: React.FC<React.SVGProps<SVGSVGElement>> | undefined;
  } = {
    "United States of America": UnitedStatesIcon,
    France: FranceIcon,
    "United Kingdom": EnglishIcon,
    Norway: NorwayIcon,
    Australia: AustraliaIcon,
    Poland: PolishIcon,
  };

  const dataWithIcons = revenuePerCountryData
    .filter((country) => countryIconMap[country.name])
    .map((country) => ({
      ...country,
      FlagIcon: countryIconMap[country.name],
    }));

  const isFirstRender = useIsFirstRender();
  const { width: windowWidth } = useWindowDimensions();

  const isCompact =
    !isFirstRender &&
    windowWidth >= BREAKPOINTS.md &&
    windowWidth < BREAKPOINTS.lg;
  const mapScale = isCompact ? 165 : 200;
  const mapMarginLeft = isCompact ? "-2rem" : "-4rem";

  const HIGHLIGHT_COLOR = "var(--color-chartPrimaryFill)";
  const BORDER_COLOR = "var(--color-mapCountryBorder)";

  return (
    <Card
      className="h-full relative overflow-hidden flex flex-col"
      id="revenuePerCountry"
    >
      <CardHeader>
        <CardTitle>{t("title")}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between">
          <div
            role="img"
            aria-label="Revenue distribution by country map"
            className={`${isCompact ? "w-[70%]" : "w-[65%]"} worldMap flex items-center justify-center md:h-76 lg:h-92 xl:h-92 1xl:h-98 2xl:h-108 3xl:h-132 -mb-6`}
          >
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
                        (s) => s.name === countryName,
                      );
                      const tooltipContent = countryData
                        ? `${countryName} - ${countryData.price}$`
                        : `${countryName}`;

                      return (
                        <Tooltip key={geo.rsmKey}>
                          <TooltipTrigger asChild>
                            <Geography
                              geography={geo}
                              fill={
                                countryData
                                  ? HIGHLIGHT_COLOR
                                  : "var(--color-mapCountryFill)"
                              }
                              tabIndex={-1}
                              style={{
                                default: { outline: "none" },
                                hover: {
                                  fill: HIGHLIGHT_COLOR,
                                  outline: "none",
                                },
                                pressed: { outline: "none" },
                              }}
                            />
                          </TooltipTrigger>
                          <TooltipContent side="top" align="center">
                            {tooltipContent}
                          </TooltipContent>
                        </Tooltip>
                      );
                    })
                  }
                </Geographies>
              </ComposableMapLazy>
            </Suspense>
          </div>
          <div
            className={`${isCompact ? "w-[30%]" : "w-[35%]"} flex overflow-auto md:pt-3 lg:pt-8 xl:pt-10 1xl:pt-10 2xl:pt-12 3xl:pt-20 items-start justify-start`}
          >
            <div
              className={`flex flex-col w-full ${isCompact ? "pl-[5%] pr-[5%]" : "pl-[10%] md:pr-[10%] lg:pr-[20%]"}`}
            >
              <div className="w-full flex justify-between mb-2 text-xs lg:text-sm 3xl:text-base">
                <p className="font-semibold text-primaryText">Country</p>
                <p className="font-semibold text-primaryText">Sales</p>
              </div>
              {dataWithIcons.map((data, index) => (
                <div
                  key={index}
                  className={`flex justify-between items-center border-t border-mainBorder 2xl:pt-3 2xl:pb-3 ${isCompact ? "pt-1 pb-1" : "pt-2 pb-2"}`}
                >
                  <div
                    className={`flex items-center ${isCompact ? "space-x-1.5" : "space-x-3"}`}
                  >
                    <div className={`flex ${isCompact ? "scale-75" : ""}`}>
                      {data.FlagIcon && <data.FlagIcon />}
                    </div>
                    <span
                      className={`text-primaryText ${isCompact ? "text-[0.625rem]" : "text-xs"} 3xl:text-sm`}
                    >
                      {data.name}
                    </span>
                  </div>
                  <span
                    className={`font-semibold text-primaryText ${isCompact ? "text-[0.625rem]" : "text-sm"} 3xl:text-sm`}
                  >
                    ${data.price}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
