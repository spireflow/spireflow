import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

import { useTranslateData } from "../../../hooks/useTranslateData";
import { RegionData, RegionsProps } from "./types";
import { Card } from "../../common/Card";
import { Badge } from "../../common/Badge";
import { useChartColors } from "../../../hooks/useChartColors";
import { BaseTooltip } from "../../common/BaseTooltip";

const CustomRegionsLegend = ({ data }: { data: RegionData[] }) => {
  const { theme } = useTheme();
  const chartColors = useChartColors(
    theme as "dark" | "light"
  );

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const getColorForRegion = (regionKey: string) => {
    if (regionKey === "northamerica") {
      return chartColors.primary.fill;
    } else if (regionKey === "europe") {
      return chartColors.secondary.fill;
    }
    return "#A0AEC0";
  };

  return (
    <div className="flex flex-row justify-start gap-8 text-white w-full text-xs" style={{ marginTop: '1.6rem', marginBottom: '1.5rem' }}>
      {data.map((item, index) => (
        <div key={index} className="flex items-center">
          {isMounted ? (
            <div
              className="w-3 h-3 mr-2 rounded"
              style={{
                backgroundColor: getColorForRegion(
                  item.regionKey.toLowerCase()
                ),
              }}
            />
          ) : (
            <div className="w-3 h-3 mr-2 rounded bg-transparent"></div>
          )}
          <span className="text-xs 1xl:text-sm text-primaryText">
            {item.name}
          </span>
        </div>
      ))}
    </div>
  );
};

interface RegionsTooltipProps {
  active?: boolean;
  payload?: Array<{
    name: string;
    value: number;
    payload: {
      regionKey: string;
    };
  }>;
}

const RegionsTooltip = ({ active, payload }: RegionsTooltipProps) => {
  const { theme } = useTheme();
  const chartColors = useChartColors(theme as "dark" | "light");

  if (!active || !payload || !payload.length) return null;

  const getColorForRegion = (regionKey: string) => {
    if (regionKey === "northamerica") {
      return chartColors.primary.fill;
    } else if (regionKey === "europe") {
      return chartColors.secondary.fill;
    }
    return "#A0AEC0";
  };

  const entry = payload[0];

  return (
    <BaseTooltip title={entry.name}>
      <p className="px-3 pb-1 text-primaryText flex items-center justify-between">
        <span className="flex items-center">
          <span
            className="w-2 h-2 mr-2 rounded inline-block"
            style={{ backgroundColor: getColorForRegion(entry.payload.regionKey) }}
          />
          Sales:
        </span>
        <span className="pl-4">${Intl.NumberFormat("us").format(entry.value)}</span>
      </p>
    </BaseTooltip>
  );
};

export const Regions = ({ regionsData }: RegionsProps) => {
  const t = useTranslations("homepage.regions");
  const { theme } = useTheme();
  const chartColors = useChartColors(theme as "dark" | "light");

  const processedData = regionsData.map((item) => ({
    ...item,
    regionKey: item.name.replace(/\s+/g, "").toLowerCase(),
  }));

  const translations = {
    "North America": t("northAmerica"),
    Europe: t("europe"),
  };

  const translatedData = useTranslateData(processedData, translations);

  const getColorForRegion = (regionKey: string) => {
    if (regionKey === "northamerica") {
      return chartColors.primary.fill;
    } else if (regionKey === "europe") {
      return chartColors.secondary.fill;
    }
    return "#A0AEC0";
  };

  // Format data for PieChart
  const chartData = translatedData.map((item) => ({
    name: item.name,
    value: item.sales,
    regionKey: item.regionKey,
  }));

  return (
    <Card className="regionsCard flex flex-col" id="regions" title={t("title")}>
      <div>
        <CustomRegionsLegend data={translatedData} />
        <div style={{ height: '12.36rem' }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius="65%"
                outerRadius="85%"
                paddingAngle={2}
                dataKey="value"
                isAnimationActive={false}
                stroke="none"
                startAngle={210}
                endAngle={570}
              >
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={getColorForRegion(entry.regionKey)}
                    stroke="none"
                  />
                ))}
              </Pie>
              <Tooltip content={<RegionsTooltip />} />
              <text
                x="50%"
                y="50%"
                textAnchor="middle"
                dominantBaseline="middle"
                className="text-xs 1xl:text-sm 3xl:text-base font-medium fill-primaryText"
              >
                {Intl.NumberFormat("us").format(
                  chartData.reduce((sum, item) => sum + item.value, 0)
                )} $
              </text>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="mt-2 3xl:mt-2">
        {translatedData.map((city) => (
          <div 
            key={city.name}
            className="flex items-center justify-between py-2 border-b border-mainBorder last:border-b-0"
          >
            <span className="text-sm text-primaryText">{city.name}</span>
            <Badge
              value={city.delta}
              type={city.deltaType === "increase" ? "increase" : "decrease"}
              accented
            />
          </div>
        ))}
      </div>
    </Card>
  );
};
