import React from "react";
import { useTheme } from "next-themes";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
import { useTranslations } from "next-intl";

import { Card } from "../../common/Card";
import { BaseTooltip } from "../../common/BaseTooltip";
import { MarketMetricsProps, MarketMetricsTooltipProps } from "./types";
import { useChartColors } from "../../../hooks/useChartColors";
import { useChartAnimation } from "../../../hooks/useChartAnimation";

const MarketMetricsTooltip = ({
  active,
  payload,
  label,
}: MarketMetricsTooltipProps) => {
  const tMetrics = useTranslations("analytics.marketMetrics.metrics");

  const translateMetric = (key: string): string => {
    const cleanKey = key.replace("analytics.marketMetrics.metrics.", "");
    return tMetrics(cleanKey);
  };

  if (!active || !payload || !payload.length || !label) return null;

  const tooltipTitle = translateMetric(label);

  return (
    <BaseTooltip title={tooltipTitle}>
      {payload.map((entry, index) => {
        const entryName = entry.name ? translateMetric(entry.name) : "";
        const formattedValue = `${entry.value}%`;
        return (
          <p
            key={`marketmetrics-tooltip-${index}`}
            className="px-3 pb-1 text-primaryText flex items-center justify-between"
          >
            <span>
              <span
                className="w-2 h-2 mr-2 rounded inline-block"
                style={{ backgroundColor: entry.color }}
              />
              {`${entryName}:   `}
            </span>
            <span className="pl-[0.7rem]">{formattedValue}</span>
          </p>
        );
      })}
    </BaseTooltip>
  );
};

interface LegendProps {
  payload?: Array<{
    color: string;
    value: string;
  }>;
}

const CustomLegend = (props: LegendProps) => {
  const { payload } = props;
  const tMetrics = useTranslations("analytics.marketMetrics.metrics");

  const translateMetric = (key: string) => {
    const cleanKey = key.replace("analytics.marketMetrics.metrics.", "");
    return tMetrics(cleanKey);
  };

  return (
    <div className="flex flex-row justify-end gap-8 text-white w-full mt-[0rem] lg:mt-0 mb-12 3xl:mb-6">
      {payload?.map((entry, index: number) => (
        <div key={index} className="flex items-center">
          <div
            className="w-3 h-3 mr-2"
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-sm text-primaryText">
            {translateMetric(entry.value)}
          </span>
        </div>
      ))}
    </div>
  );
};

export const MarketMetrics = ({ marketMetricsData }: MarketMetricsProps) => {
  const t = useTranslations("analytics.marketMetrics");
  const tMetrics = useTranslations("analytics.marketMetrics.metrics");

  const translateMetric = (key: string) => {
    const cleanKey = key.replace("analytics.marketMetrics.metrics.", "");
    return tMetrics(cleanKey);
  };

  const { theme } = useTheme();

  const chartColors = useChartColors(theme as "dark" | "light");

  const { shouldAnimate, animationBegin } = useChartAnimation("analytics");

  return (
    <Card
      className="hidden lg:block h-full"
      id="marketMetrics"
      title={t("title")}
    >
      <div className="w-full h-[19rem] lg:h-[21rem] 3x:h-[24rem] mt-6">
        <ResponsiveContainer
          width="100%"
          height="100%"
          initialDimension={{ width: 320, height: 200 }}
        >
          <RadarChart
            cx="50%"
            cy="50%"
            outerRadius="80%"
            data={marketMetricsData}
            className="pt-4 mt-[1rem] lg:mt-0"
            tabIndex={-1}
          >
            <PolarGrid stroke={chartColors.primary.grid} />
            <PolarAngleAxis
              dataKey="metric"
              tick={{ fill: "rgba(255,255,255,0.65)", fontSize: 12 }}
              tickFormatter={translateMetric}
            />
            <Tooltip
              content={<MarketMetricsTooltip />}
              isAnimationActive={false}
            />
            <Radar
              name="profitMargin"
              dataKey="phones"
              stroke={chartColors.secondary.inverted}
              fill={chartColors.secondary.inverted}
              fillOpacity={0.3}
              isAnimationActive={shouldAnimate}
              animationBegin={animationBegin}
              animationDuration={800}
              animationEasing="ease-out"
            />
            <Radar
              name="salesVolume"
              dataKey="laptops"
              stroke={chartColors.primary.inverted}
              fill={chartColors.primary.inverted}
              fillOpacity={0.3}
              isAnimationActive={shouldAnimate}
              animationBegin={animationBegin}
              animationDuration={800}
              animationEasing="ease-out"
            />
            <Legend
              verticalAlign="top"
              align="center"
              content={<CustomLegend />}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};
