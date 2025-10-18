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

interface Activity {
  id: number;
  user: string;
  action: string;
  time: string;
  icon: "update" | "users" | "check" | "document";
  color: "green" | "blue";
}

const activities: Activity[] = [
  {
    id: 1,
    user: "Henry",
    action: "uploaded smartfirm file",
    time: "1 day ago",
    icon: "document",
    color: "green",
  },
  {
    id: 2,
    user: "You",
    action: "assigned @Renee to do illustration of process",
    time: "2 days ago",
    icon: "users",
    color: "blue",
  },
];

// Data for bestselling products chart
const bestsellingData = [
  { name: "Product 1", value1: 4000, value2: 2400 },
  { name: "Product 2", value1: 3200, value2: 1198 },
  { name: "Product 3", value1: 2000, value2: 1000 },
  { name: "Product 4", value1: 5000, value2: 3000 },
  { name: "Product 5", value1: 3500, value2: 2700 },
  { name: "Product 6", value1: 2500, value2: 6200 },
  { name: "Product 7", value1: 4200, value2: 2800 },
];

interface TooltipPayload {
  dataKey: string;
  name?: string;
  value?: number;
  color?: string;
}

interface BestsellingTooltipProps {
  active?: boolean;
  payload?: TooltipPayload[];
  label?: string;
}

const BestsellingProductsTooltip = ({
  active,
  payload,
  label,
}: BestsellingTooltipProps) => {
  if (!active || !payload || payload.length === 0 || !label) return null;

  const value1Entry = payload.find((p) => p.dataKey === "value1");
  const value2Entry = payload.find((p) => p.dataKey === "value2");

  return (
    <BaseTooltip title={label}>
      {value1Entry && (
        <p className="px-3 pb-1 text-primaryText flex items-center justify-between">
          <span>
            <span
              className="w-2 h-2 mr-2 rounded inline-block"
              style={{ backgroundColor: value1Entry.color }}
            />
            {`Sales:   `}
          </span>
          <span className="pl-[0.7rem]">
            ${Intl.NumberFormat("us").format(value1Entry.value ?? 0)}
          </span>
        </p>
      )}
      {value2Entry && (
        <p className="px-3 pb-1 text-primaryText flex items-center justify-between">
          <span>
            <span
              className="w-2 h-2 mr-2 rounded inline-block"
              style={{ backgroundColor: value2Entry.color }}
            />
            {`Revenue:   `}
          </span>
          <span className="pl-[0.7rem]">
            ${Intl.NumberFormat("us").format(value2Entry.value ?? 0)}
          </span>
        </p>
      )}
    </BaseTooltip>
  );
};

const BestsellingProducts = () => {
  const { width: windowWidth } = useWindowDimensions();
  const { theme, systemTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;

  return (
    <div className="px-4 pt-8 pb-4">
      <div className="w-full h-[17rem]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={bestsellingData}
            margin={{
              top: 20,
              right: windowWidth > 400 ? 20 : 5,
              left: windowWidth > 400 ? 0 : -10,
              bottom: 5,
            }}
          >
            <CartesianGrid
              strokeDasharray="0"
              stroke={currentTheme === "light" ? "rgb(240, 240, 240)" : "rgb(45, 50, 55)"}
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
              content={<BestsellingProductsTooltip />}
              cursor={{ fill: "rgba(255,255,255,0.05)" }}
            />
            <Bar
              dataKey="value1"
              stackId="a"
              fill={currentTheme === "light" ? "rgb(125, 214, 230)" : "rgb(61, 185, 133)"}
              radius={[0, 0, 0, 0]}
              barSize={25}
              isAnimationActive={false}
            />
            <Bar
              dataKey="value2"
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

const ActivityItem = ({ activity }: { activity: Activity }) => {
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
      return currentTheme === "light" ? "rgb(125, 214, 230)" : "rgb(61, 185, 133)";
    }
    if (color === "blue") {
      return "rgb(83, 133, 198)";
    }
    return currentTheme === "light" ? "rgb(125, 214, 230)" : "rgb(61, 185, 133)";
  };

  const getIcon = (iconType: string) => {
    const iconProps = {
      style: { 
        width: '20px', 
        height: '20px', 
        stroke: 'white', 
        fill: 'white',
        color: 'white'
      }
    };
    
    switch (iconType) {
      case "update":
        return <div style={iconProps.style}><UpdateIcon /></div>;
      case "users":
        return <div style={iconProps.style}><UsersIcon /></div>;
      case "check":
        return <div style={iconProps.style}><CheckIcon /></div>;
      case "document":
        return <div style={iconProps.style}><DocumentIcon /></div>;
      default:
        return <div style={iconProps.style}><DocumentIcon /></div>;
    }
  };

  return (
    <div className="flex items-start gap-3 py-5 border-b border-mainBorder last:border-b-0 hover:bg-navItemBgHover transition-colors px-4 cursor-pointer">
      <div
        className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
        style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          backgroundColor: getAvatarBgColor(activity.color)
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

export const CalendarActivity = () => {
  return (
    <Card
      className="calendarActivityCard flex flex-col h-full"
      id="audience-satisfaction"
      title="Audience satisfaction"
    >
      <div className="flex-1 flex flex-col">
        {/* Bestselling Products Section */}
        <BestsellingProducts />

        {/* Activity Section */}
        <div className="mt-4">
          <div className="px-4 mb-2">
            <h3 className="text-sm font-semibold text-primaryText">Activity</h3>
          </div>
          <div className="flex flex-col">
            {activities.map((activity) => (
              <ActivityItem key={activity.id} activity={activity} />
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
};
