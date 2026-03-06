"use client";

import { useTranslations } from "next-intl";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { CheckIcon } from "../../../../assets/icons/CheckIcon";
import { DocumentIcon } from "../../../../assets/icons/DocumentIcon";
import { UpdateIcon } from "../../../../assets/icons/UpdateIcon";
import { UsersIcon } from "../../../../assets/icons/UsersIcon";
import { useChartAnimation } from "../../../../hooks/useChartAnimation";
import { useWindowDimensions } from "../../../../hooks/useWindowDimensions";
import { BREAKPOINTS } from "../../../../styles/breakpoints";
import { BaseTooltip } from "../../../common/BaseTooltip";
import { Card } from "../../../common/Card";
import { WeeklyActivity, WeeklyPerformanceProps } from "../types";

interface TooltipPayload {
  dataKey: string;
  name?: string;
  value?: number;
  color?: string;
}

interface WeeklyPerformanceTooltipProps {
  active?: boolean;
  payload?: TooltipPayload[];
  label?: string;
}

const WeeklyPerformanceTooltip = ({
  active,
  payload,
  label,
}: WeeklyPerformanceTooltipProps) => {
  if (!active || !payload || payload.length === 0 || !label) return null;

  const revenueEntry = payload.find((p) => p.dataKey === "revenue");
  const profitEntry = payload.find((p) => p.dataKey === "profit");

  return (
    <BaseTooltip title={label}>
      {revenueEntry && (
        <p className="px-3 pb-1 text-primaryText flex items-center justify-between">
          <span>
            <span
              className="w-2 h-2 mr-2 rounded inline-block"
              style={{ backgroundColor: revenueEntry.color }}
            />
            {`Revenue:   `}
          </span>
          <span className="pl-[0.7rem]">
            ${Intl.NumberFormat("us").format(revenueEntry.value ?? 0)}
          </span>
        </p>
      )}
      {profitEntry && (
        <p className="px-3 pb-1 text-primaryText flex items-center justify-between">
          <span>
            <span
              className="w-2 h-2 mr-2 rounded inline-block"
              style={{ backgroundColor: profitEntry.color }}
            />
            {`Profit:   `}
          </span>
          <span className="pl-[0.7rem]">
            ${Intl.NumberFormat("us").format(profitEntry.value ?? 0)}
          </span>
        </p>
      )}
    </BaseTooltip>
  );
};

const WeeklyPerformanceLegend = ({
  payload,
}: {
  payload?: Array<{ value: string; color?: string }>;
}) => {
  return (
    <div className="flex flex-row justify-end gap-8 w-full mb-6 mt-2">
      {payload?.map((entry, index) => (
        <div key={`legend-${index}`} className="flex items-center">
          <div
            className="w-3 h-3 rounded-sm mr-2"
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-xs 1xl:text-sm text-primaryText">
            {entry.value}
          </span>
        </div>
      ))}
    </div>
  );
};

const WeeklyPerformanceChart = ({
  data,
  isExpanded,
  isFourCardsMode = false,
}: {
  data: WeeklyPerformanceProps["weeklyPerformanceData"];
  isExpanded?: boolean;
  isFourCardsMode?: boolean;
}) => {
  const chartHeightWhenNoActivities = isFourCardsMode
    ? "h-60 lg:h-72 xl:h-72 2xl:h-76 3xl:h-92"
    : "h-60 3xl:h-76";
  const { width: windowWidth } = useWindowDimensions();
  const { shouldAnimate, animationBegin } = useChartAnimation("homepage");

  const getDisplayData = () => {
    if (
      windowWidth < BREAKPOINTS.xsm ||
      (windowWidth >= BREAKPOINTS.lg && windowWidth <= BREAKPOINTS["2xl"])
    ) {
      return data.slice(0, 5);
    }
    return data;
  };

  const displayData = getDisplayData();

  const getBarSize = () => {
    if (windowWidth < BREAKPOINTS.xsm) return 20;
    if (windowWidth >= BREAKPOINTS.lg && windowWidth <= BREAKPOINTS.xl)
      return 18;
    return 25;
  };

  const getChartMargins = () => {
    if (windowWidth < BREAKPOINTS.xsm) {
      return { top: 10, right: 5, left: -10, bottom: 5 };
    }
    if (windowWidth >= BREAKPOINTS.lg && windowWidth < BREAKPOINTS["3xl"]) {
      return { top: 10, right: 10, left: -5, bottom: 5 };
    }
    return {
      top: 10,
      right: windowWidth > BREAKPOINTS.xsm ? 20 : 5,
      left: windowWidth > BREAKPOINTS.xsm ? 0 : -10,
      bottom: 5,
    };
  };

  return (
    <div
      className={`px-4 pt-3 xsm:pt-0 pb-1 ${isFourCardsMode ? "lg:pt-1" : ""}`}
    >
      <div
        role="img"
        aria-label="Weekly performance bar chart"
        className={`w-full ${isExpanded ? chartHeightWhenNoActivities : "h-60 xsm:h-72 3xl:h-84"}`}
      >
        <ResponsiveContainer
          width="100%"
          height="100%"
          initialDimension={{ width: 320, height: 200 }}
        >
          <BarChart data={displayData} margin={getChartMargins()} tabIndex={-1}>
            <Legend
              verticalAlign="top"
              align="center"
              content={<WeeklyPerformanceLegend />}
            />
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="var(--color-chartPrimaryGrid)"
            />
            <XAxis
              dataKey="name"
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
              content={<WeeklyPerformanceTooltip />}
              isAnimationActive={false}
              cursor={{
                fill: "var(--color-chartCursorBg)",
                stroke: "var(--color-chartVerticalLine)",
              }}
            />
            <Bar
              dataKey="revenue"
              name="Revenue"
              stackId="a"
              fill="var(--color-chartPrimaryInverted)"
              radius={[0, 0, 0, 0]}
              barSize={getBarSize()}
              isAnimationActive={shouldAnimate}
              animationBegin={animationBegin}
              animationDuration={800}
              animationEasing="ease-out"
            />
            <Bar
              dataKey="profit"
              name="Profit"
              stackId="a"
              fill="var(--color-chartSecondaryAccent)"
              radius={[4, 4, 0, 0]}
              barSize={getBarSize()}
              isAnimationActive={shouldAnimate}
              animationBegin={animationBegin}
              animationDuration={800}
              animationEasing="ease-out"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

const ActivityItem = ({ activity }: { activity: WeeklyActivity }) => {
  const getAvatarBgColor = (color: "green" | "blue") => {
    if (color === "blue") {
      return "var(--color-chartSecondaryAccent)";
    }
    return "var(--color-chartPrimaryInverted)";
  };

  const getIcon = (iconType: string) => {
    const iconProps = {
      style: {
        width: "20px",
        height: "20px",
        stroke: "white",
        fill: "white",
        color: "white",
      },
    };

    switch (iconType) {
      case "update":
        return (
          <div style={iconProps.style}>
            <UpdateIcon />
          </div>
        );
      case "users":
        return (
          <div style={iconProps.style}>
            <UsersIcon />
          </div>
        );
      case "check":
        return (
          <div style={iconProps.style}>
            <CheckIcon />
          </div>
        );
      case "document":
        return (
          <div style={iconProps.style}>
            <DocumentIcon />
          </div>
        );
      default:
        return (
          <div style={iconProps.style}>
            <DocumentIcon />
          </div>
        );
    }
  };

  return (
    <div className="flex items-start gap-3 py-2.5 lg:py-2 1xl:py-2.5 3xl:py-5 border-b border-mainBorder last:border-b-0 hover:bg-navItemBgHover transition-colors px-3 1xl:px-4 rounded-lg">
      <div
        className="w-8 h-8 1xl:w-10 1xl:h-10 rounded-full flex items-center justify-center flex-shrink-0"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: getAvatarBgColor(activity.color),
        }}
      >
        {getIcon(activity.icon)}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs 2xl:text-sm text-primaryText leading-relaxed whitespace-nowrap overflow-hidden text-ellipsis">
          {activity.user && (
            <span className="font-semibold">{activity.user} </span>
          )}
          {activity.action}
        </p>
        <p className="text-xs text-subtitleText mt-1.5">{activity.time}</p>
      </div>
    </div>
  );
};

export const WeeklyPerformance = ({
  weeklyPerformanceData,
  weeklyActivities,
  isFourCardsMode = false,
}: WeeklyPerformanceProps & {
  weeklyActivities: WeeklyActivity[];
  isFourCardsMode?: boolean;
}) => {
  const t = useTranslations("homepage.weeklyPerformance");
  const { width: windowWidth } = useWindowDimensions();

  const hasActivities = weeklyActivities && weeklyActivities.length > 0;
  const showActivities =
    hasActivities && (!isFourCardsMode || windowWidth < BREAKPOINTS.lg);

  return (
    <Card
      className="flex flex-col h-full"
      id="weekly-performance"
      title={t("title")}
    >
      <div className="flex-1 flex flex-col sm:flex-row lg:flex-col">
        {/* Weekly Performance Chart Section */}
        <div className="sm:w-2/3 lg:w-full">
          <WeeklyPerformanceChart
            data={weeklyPerformanceData}
            isExpanded={!showActivities}
            isFourCardsMode={isFourCardsMode}
          />
        </div>

        {/* Activity Section */}
        {showActivities && (
          <div className="sm:w-1/3 lg:w-full mt-1 sm:mt-0 lg:mt-1 2xl:mt-1 3xl:mt-3 sm:overflow-y-auto lg:overflow-y-visible">
            <div className="px-3 1xl:px-4 mb-2 3xl:mb-1">
              <h3 className="text-sm font-semibold text-primaryText">
                Activity
              </h3>
            </div>
            <div className="flex flex-col">
              {weeklyActivities.map((activity) => (
                <ActivityItem key={activity.id} activity={activity} />
              ))}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};
