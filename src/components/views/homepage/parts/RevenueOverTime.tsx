import { useTranslations } from "next-intl";
import { useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { BaseTooltip } from "@/components/common/BaseTooltip";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/common/shadcn/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/common/shadcn/tabs";
import { useChartAnimation } from "@/hooks/useChartAnimation";
import { useIsFirstRender } from "@/hooks/useIsFirstRender";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useWindowDimensions } from "@/hooks/useWindowDimensions";
import { BREAKPOINTS } from "@/styles/breakpoints";

import { RevenueOverTimeProps, RevenueOverTimeTooltipProps } from "../types";

const RevenueOverTimeTooltip = ({
  active,
  payload,
  label,
}: RevenueOverTimeTooltipProps) => {
  if (!active || !payload || payload.length === 0 || !label) return null;

  const websiteEntry =
    payload.find((p) => p.dataKey === "websiteSales") || payload[0];
  const inStoreEntry =
    payload.find((p) => p.dataKey === "inStoreSales") || payload[1];

  return (
    <BaseTooltip title={label}>
      {websiteEntry && (
        <p className="px-3 pb-1 text-primaryText flex items-center justify-between">
          <span>
            <span
              className="w-2 h-2 mr-2 rounded inline-block"
              style={{ backgroundColor: websiteEntry.color }}
            />
            {`${websiteEntry.name}:   `}
          </span>
          <span className="pl-[0.7rem]">
            ${Intl.NumberFormat("us").format(websiteEntry.value)}
          </span>
        </p>
      )}
      {inStoreEntry && (
        <p className="px-3 pb-1 text-primaryText flex items-center justify-between">
          <span>
            <span
              className="w-2 h-2 mr-2 rounded inline-block"
              style={{ backgroundColor: inStoreEntry.color }}
            />
            {`${inStoreEntry.name}:   `}
          </span>
          <span className="pl-[0.7rem]">
            ${Intl.NumberFormat("us").format(inStoreEntry.value)}
          </span>
        </p>
      )}
    </BaseTooltip>
  );
};

export const RevenueOverTime = ({
  revenueOverTimeData,
}: RevenueOverTimeProps) => {
  const t = useTranslations("homepage.revenueOverTime");

  const { width: windowWidth } = useWindowDimensions();

  const getChartMargins = () => {
    if (windowWidth > BREAKPOINTS.md) return { right: 30, left: 20 };
    if (windowWidth > BREAKPOINTS.xsm) return { right: 10, left: 5 };
    return { right: 5, left: -10 };
  };

  const { shouldAnimate, animationBegin, isReady } =
    useChartAnimation("homepage");

  const isFirstRender = useIsFirstRender();

  const [timeRange, setTimeRange] = useState<"monthly" | "quarterly">(
    "monthly",
  );

  const monthMap: { [key: string]: number } = {
    Jan: 0,
    Feb: 1,
    Mar: 2,
    Apr: 3,
    May: 4,
    Jun: 5,
    Jul: 6,
    Aug: 7,
    Sep: 8,
    Oct: 9,
    Nov: 10,
    Dec: 11,
  };

  /**
   * Aggregates monthly data into quarterly averages when timeRange is "quarterly".
   * Returns monthly data as-is otherwise.
   */
  const processDataByTimeRange = (data: typeof revenueOverTimeData) => {
    if (timeRange === "monthly") {
      return data;
    }

    const quarters: {
      [key: string]: {
        websiteSales: number;
        inStoreSales: number;
        count: number;
      };
    } = {};

    data.forEach((item) => {
      const [monthStr, yearStr] = item.date.split(" ");
      const month = monthMap[monthStr];
      const quarter = Math.floor(month / 3) + 1;
      const quarterKey = `Q${quarter} ${yearStr}`;

      if (!quarters[quarterKey]) {
        quarters[quarterKey] = { websiteSales: 0, inStoreSales: 0, count: 0 };
      }

      quarters[quarterKey].websiteSales += item.websiteSales;
      quarters[quarterKey].inStoreSales += item.inStoreSales;
      quarters[quarterKey].count += 1;
    });

    return data.map((item) => {
      const [monthStr, yearStr] = item.date.split(" ");
      const month = monthMap[monthStr];
      const quarter = Math.floor(month / 3) + 1;
      const quarterKey = `Q${quarter} ${yearStr}`;
      const quarterData = quarters[quarterKey];

      return {
        date: `Q${quarter} ${yearStr}`,
        websiteSales: Math.round(quarterData.websiteSales / quarterData.count),
        inStoreSales: Math.round(quarterData.inStoreSales / quarterData.count),
      };
    });
  };

  const displayData = processDataByTimeRange(revenueOverTimeData);

  const isAboveXsm = useMediaQuery(`(min-width: ${BREAKPOINTS.xsm}px)`);

  const showExpandedHeader = isFirstRender || isAboveXsm;

  return (
    <Card className="h-full" id="revenueOverTime">
      <CardHeader>
        {showExpandedHeader ? (
          <div className="flex items-center justify-between mb-8 md:mb-6 1xl:mb-8">
            <div className="flex flex-col gap-0.5">
              <p className="text-sm 1xl:text-base 3xl:text-lg font-semibold text-primaryText">
                {t("title")}
              </p>
              <span className="text-[0.85rem] text-subtitleText">
                Historical performance
              </span>
            </div>
            {!isFirstRender && (
              <Tabs
                value={timeRange}
                onValueChange={(v) =>
                  setTimeRange(v as "monthly" | "quarterly")
                }
                className="hidden xsm:block"
              >
                <TabsList className="bg-tabsBg">
                  <TabsTrigger
                    value="monthly"
                    className="text-xs data-[state=active]:bg-revenueTabActiveBg data-[state=active]:hover:bg-revenueTabActiveBgHover"
                  >
                    Monthly
                  </TabsTrigger>
                  <TabsTrigger
                    value="quarterly"
                    className="text-xs data-[state=active]:bg-revenueTabActiveBg data-[state=active]:hover:bg-revenueTabActiveBgHover"
                  >
                    Quarterly
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="monthly" tabIndex={-1} className="hidden" />
                <TabsContent
                  value="quarterly"
                  tabIndex={-1}
                  className="hidden"
                />
              </Tabs>
            )}
          </div>
        ) : (
          <CardTitle>{t("title")}</CardTitle>
        )}
      </CardHeader>
      <CardContent>
        <div className="flex flex-row justify-end gap-5 w-full mb-4 mt-6 xsm:hidden">
          <div className="flex items-center">
            <div
              className="w-3 h-3 rounded-sm mr-2"
              style={{ backgroundColor: "var(--color-chartPrimaryDisabled)" }}
            />
            <span className="text-xs 1xl:text-sm text-primaryText">
              Website sales
            </span>
          </div>
          <div className="flex items-center">
            <div
              className="w-3 h-3 rounded-sm mr-2"
              style={{ backgroundColor: "var(--color-chartPrimaryFill)" }}
            />
            <span className="text-xs 1xl:text-sm text-primaryText">
              In store sales
            </span>
          </div>
        </div>
        <div
          role="img"
          aria-label="Revenue over time area chart"
          className="w-full overflow-hidden h-58 lg:h-62 1xl:h-60 2xl:h-62 3xl:h-80"
        >
          <ResponsiveContainer
            width="100%"
            height="100%"
            minWidth={0}
            minHeight={200}
            initialDimension={{ width: 320, height: 200 }}
          >
            <AreaChart
              accessibilityLayer={false}
              data={isReady ? displayData : []}
              margin={{
                top: 10,
                ...getChartMargins(),
                bottom: 5,
              }}
              tabIndex={-1}
            >
              <defs>
                <linearGradient id="colorWebsite" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--color-chartPrimaryDisabled)"
                    stopOpacity={0.3}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--color-chartPrimaryDisabled)"
                    stopOpacity={0}
                  />
                </linearGradient>
                <linearGradient id="colorInStore" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--color-chartPrimaryFill)"
                    stopOpacity={0.3}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--color-chartPrimaryFill)"
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="var(--color-chartPrimaryGrid)"
              />
              <XAxis
                dataKey="date"
                axisLine={{ stroke: "var(--color-chartAxisLine)" }}
                tickLine={false}
                tick={{ fill: "var(--color-chartAxisText)", fontSize: 12 }}
              />
              <YAxis
                axisLine={{ stroke: "var(--color-chartAxisLine)" }}
                tickLine={false}
                tick={{ fill: "var(--color-chartAxisText)", fontSize: 12 }}
                tickFormatter={(value) =>
                  `$${Intl.NumberFormat("us").format(value)}`
                }
              />
              <Tooltip
                content={<RevenueOverTimeTooltip />}
                isAnimationActive={false}
                cursor={{
                  fill: "rgba(255,255,255,0.05)",
                  stroke: "var(--color-chartVerticalLine)",
                }}
              />
              <Area
                type="linear"
                dataKey="websiteSales"
                name="Website sales"
                stroke="var(--color-chartPrimaryDisabled)"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorWebsite)"
                isAnimationActive={shouldAnimate}
                animationBegin={animationBegin}
                animationDuration={500}
                animationEasing="ease-out"
              />
              <Area
                type="linear"
                dataKey="inStoreSales"
                name="In store sales"
                stroke="var(--color-chartPrimaryFill)"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorInStore)"
                isAnimationActive={shouldAnimate}
                animationBegin={animationBegin}
                animationDuration={500}
                animationEasing="ease-out"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
