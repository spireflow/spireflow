"use client";

import { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useTheme } from "next-themes";
import { useTranslations } from "next-intl";

import { Card } from "../../common/Card";
import { UpdateIcon } from "../../../assets/icons/UpdateIcon";
import { UsersIcon } from "../../../assets/icons/UsersIcon";
import { CheckIcon } from "../../../assets/icons/CheckIcon";
import { DocumentIcon } from "../../../assets/icons/DocumentIcon";
import { BaseTooltip } from "../../common/BaseTooltip";
import { useWindowDimensions } from "../../../hooks/useWindowDimensions";
import { WeeklyPerformanceProps, WeeklyActivity } from "./types";
import { useChartAnimation } from "../../../hooks/useChartAnimation";

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
  const t = useTranslations("homepage.weeklyPerformance");

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
            {`${t("revenue")}:   `}
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
            {`${t("profit")}:   `}
          </span>
          <span className="pl-[0.7rem]">
            ${Intl.NumberFormat("us").format(profitEntry.value ?? 0)}
          </span>
        </p>
      )}
    </BaseTooltip>
  );
};

const WeeklyPerformanceChart = ({
  data,
  isExpanded,
}: {
  data: WeeklyPerformanceProps["weeklyPerformanceData"];
  isExpanded?: boolean;
}) => {
  const { width: windowWidth } = useWindowDimensions();
  const { theme, systemTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;
  const { shouldAnimate, animationBegin } = useChartAnimation("homepage");

  // Limit data to 5 bars in specific ranges
  const getDisplayData = () => {
    if (windowWidth < 500 || (windowWidth >= 1000 && windowWidth <= 1500)) {
      return data.slice(0, 5);
    }
    return data;
  };

  const displayData = getDisplayData();

  // Adjust margins based on screen size
  const getChartMargins = () => {
    if (windowWidth < 450) {
      return { top: 20, right: 5, left: -10, bottom: 5 };
    }
    if (windowWidth >= 1024 && windowWidth < 1750) {
      return { top: 20, right: 10, left: -5, bottom: 5 };
    }
    return {
      top: 20,
      right: windowWidth > 400 ? 20 : 5,
      left: windowWidth > 400 ? 0 : -10,
      bottom: 5,
    };
  };

  return (
    <div className="px-4 pt-8 pb-4">
      <div className={`w-full ${isExpanded ? "h-[21rem]" : "h-[17rem]"}`}>
        <ResponsiveContainer
          width="100%"
          height="100%"
          initialDimension={{ width: 320, height: 200 }}
        >
          <BarChart data={displayData} margin={getChartMargins()} tabIndex={-1}>
            <CartesianGrid
              strokeDasharray="0"
              stroke={
                currentTheme === "light"
                  ? "rgb(240, 240, 240)"
                  : "rgb(45, 50, 55)"
              }
              vertical={false}
            />
            <XAxis
              dataKey="name"
              tick={{ fill: "rgba(255,255,255,0.65)", fontSize: 12 }}
            />
            <YAxis
              tick={{ fill: "rgba(255,255,255,0.65)", fontSize: 12 }}
              tickFormatter={(value) =>
                `$${Intl.NumberFormat("us").format(value)}`
              }
            />
            <Tooltip
              content={<WeeklyPerformanceTooltip />}
              cursor={{ fill: "rgba(255,255,255,0.05)", stroke: "var(--color-chartVerticalLine)" }}
            />
            <Bar
              dataKey="revenue"
              stackId="a"
              fill={
                currentTheme === "light"
                  ? "rgb(125, 214, 230)"
                  : "rgb(61, 185, 133)"
              }
              radius={[0, 0, 0, 0]}
              barSize={25}
              isAnimationActive={shouldAnimate}
              animationBegin={animationBegin}
              animationDuration={800}
              animationEasing="ease-out"
            />
            <Bar
              dataKey="profit"
              stackId="a"
              fill="rgb(83, 133, 198)"
              radius={[4, 4, 0, 0]}
              barSize={25}
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
  const { theme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const t = useTranslations("homepage.weeklyPerformance");

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentTheme = theme === "system" ? systemTheme : theme;

  const getTranslatedAction = (action: string): string => {
    if (action.includes("uploaded quarterly report")) {
      return t("activities.henryUploadedReport");
    }
    if (action.includes("completed first purchase")) {
      return t("activities.newTradersFirstPurchase");
    }
    return action;
  };

  const getTranslatedTime = (time: string): string => {
    if (time === "1 day ago") {
      return t("time.dayAgo");
    }
    const daysMatch = time.match(/^(\d+) days? ago$/);
    if (daysMatch) {
      return t("time.daysAgo", { count: daysMatch[1] });
    }
    return time;
  };

  const getAvatarBgColor = (color: "green" | "blue") => {
    // If not mounted yet, return transparent to avoid flash
    if (!mounted) {
      return "transparent";
    }

    if (color === "green") {
      // Light mode = teal, dark mode = green
      return currentTheme === "light"
        ? "rgb(125, 214, 230)"
        : "rgb(61, 185, 133)";
    }
    if (color === "blue") {
      return "rgb(83, 133, 198)";
    }
    return currentTheme === "light"
      ? "rgb(125, 214, 230)"
      : "rgb(61, 185, 133)";
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
    <div className="flex items-start gap-3 py-2.5 lg:py-2 1xl:py-5 border-b border-mainBorder last:border-b-0 hover:bg-navItemBgHover transition-colors px-3 1xl:px-4 rounded-lg">
      <div
        className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
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
        <p className="text-sm text-primaryText leading-relaxed">
          {activity.user && (
            <span className="font-semibold">{activity.user} </span>
          )}
          {getTranslatedAction(activity.action)}
        </p>
        <p className="text-xs text-subtitleText mt-1.5">
          {getTranslatedTime(activity.time)}
        </p>
      </div>
    </div>
  );
};

export const WeeklyPerformance = ({
  weeklyPerformanceData,
  weeklyActivities,
}: WeeklyPerformanceProps & { weeklyActivities: WeeklyActivity[] }) => {
  const t = useTranslations("homepage.weeklyPerformance");

  return (
    <Card
      className="flex flex-col h-full"
      id="weekly-performance"
      title={t("title")}
    >
      <div className="flex-1 flex flex-col">
        {/* Weekly Performance Chart Section */}
        <WeeklyPerformanceChart
          data={weeklyPerformanceData}
          isExpanded={!weeklyActivities || weeklyActivities.length === 0}
        />

        {/* Activity Section */}
        {weeklyActivities && weeklyActivities.length > 0 && (
          <div className="mt-1 2xl:mt-3">
            <div className="px-4 mb-2 1xl:mb-0 2xl:mb-1">
              <h3 className="text-sm font-semibold text-primaryText">
                {t("activity")}
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
