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

import { Card } from "../../common/Card";
import { UpdateIcon } from "../../../assets/icons/UpdateIcon";
import { UsersIcon } from "../../../assets/icons/UsersIcon";
import { CheckIcon } from "../../../assets/icons/CheckIcon";
import { DocumentIcon } from "../../../assets/icons/DocumentIcon";
import { BaseTooltip } from "../../common/BaseTooltip";
import { useWindowDimensions } from "../../../hooks/useWindowDimensions";
import { WeeklyPerformanceProps, WeeklyActivity } from "./types";

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

const WeeklyPerformanceChart = ({
  data,
}: {
  data: WeeklyPerformanceProps["weeklyPerformanceData"];
}) => {
  const { width: windowWidth } = useWindowDimensions();
  const { theme, systemTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;

  return (
    <div className="px-4 pt-8 pb-4">
      <div className="w-full h-[17rem]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{
              top: 20,
              right: windowWidth > 400 ? 20 : 5,
              left: windowWidth > 400 ? 0 : -10,
              bottom: 5,
            }}
          >
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
              cursor={{ fill: "rgba(255,255,255,0.05)" }}
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
              isAnimationActive={false}
            />
            <Bar
              dataKey="profit"
              stackId="a"
              fill="rgb(83, 133, 198)"
              radius={[4, 4, 0, 0]}
              barSize={25}
              isAnimationActive={false}
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

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentTheme = theme === "system" ? systemTheme : theme;

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
    <div className="flex items-start gap-3 py-5 border-b border-mainBorder last:border-b-0 hover:bg-navItemBgHover transition-colors px-4 cursor-pointer">
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
          <span className="font-semibold">{activity.user}</span>{" "}
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
}: WeeklyPerformanceProps & { weeklyActivities: WeeklyActivity[] }) => {
  return (
    <Card
      className="flex flex-col h-full"
      id="weekly-performance"
      title="Weekly Performance"
    >
      <div className="flex-1 flex flex-col">
        {/* Weekly Performance Chart Section */}
        <WeeklyPerformanceChart data={weeklyPerformanceData} />

        {/* Activity Section */}
        <div className="mt-4">
          <div className="px-4 mb-2">
            <h3 className="text-sm font-semibold text-primaryText">Activity</h3>
          </div>
          <div className="flex flex-col">
            {weeklyActivities.map((activity) => (
              <ActivityItem key={activity.id} activity={activity} />
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
};
