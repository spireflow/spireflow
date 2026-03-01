import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useTranslations } from "next-intl";

import { Card } from "../../common/Card";
import { BaseTooltip } from "../../common/BaseTooltip";
import {
  RevenueDistributionProps,
  RevenueDistributionTooltipProps,
} from "./types";
import { useWindowDimensions } from "../../../hooks/useWindowDimensions";
import { useTheme } from "next-themes";
import { useChartAnimation } from "../../../hooks/useChartAnimation";

const RevenueDistributionTooltip = ({
  active,
  payload,
  label,
}: RevenueDistributionTooltipProps) => {
  if (!active || !payload || payload.length === 0 || !label) return null;

  const inStoreEntry = payload.find((p) => p.dataKey === "inStore");
  const onlineEntry = payload.find((p) => p.dataKey === "online");

  return (
    <BaseTooltip title={label}>
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
            ${Intl.NumberFormat("us").format(inStoreEntry.value ?? 0)}
          </span>
        </p>
      )}
      {onlineEntry && (
        <p className="px-3 pb-1 text-primaryText flex items-center justify-between">
          <span>
            <span
              className="w-2 h-2 mr-2 rounded inline-block"
              style={{ backgroundColor: onlineEntry.color }}
            />
            {`${onlineEntry.name}:   `}
          </span>
          <span className="pl-[0.7rem]">
            ${Intl.NumberFormat("us").format(onlineEntry.value ?? 0)}
          </span>
        </p>
      )}
    </BaseTooltip>
  );
};

export const RevenueDistribution = ({
  revenueDistributionData,
}: RevenueDistributionProps) => {
  const t = useTranslations("analytics.revenueDistribution");

  const { width: windowWidth } = useWindowDimensions();

  const { theme } = useTheme();

  const { shouldAnimate, animationBegin } = useChartAnimation("analytics");

  // RevenueDistribution has unique color scheme:
  // Dark mode: inStore=blue, online=gray
  // Light mode: inStore=blue, online=teal
  const inStoreColor = "var(--color-chartSecondaryInverted)";
  const onlineColor =
    theme === "dark" ? "rgb(86,92,101)" : "var(--color-chartPrimaryInverted)";

  return (
    <Card className="h-full" id="revenueDistribution" title={t("title")}>
      <div
        role="img"
        aria-label="Revenue distribution bar chart"
        className="w-full h-[18rem] 3xl:h-[24rem] mt-4 1xl:mt-4 -ml-4"
      >
        <ResponsiveContainer
          width="100%"
          height="100%"
          initialDimension={{ width: 320, height: 200 }}
        >
          <BarChart
            data={revenueDistributionData}
            layout="vertical"
            margin={{
              top: 20,
              right: windowWidth > 400 ? 30 : 5,
              left: windowWidth > 400 ? 40 : 30,
              bottom: 5,
            }}
            tabIndex={-1}
          >
            <CartesianGrid
              strokeDasharray="0"
              stroke={"var(--color-chartPrimaryGrid)"}
              horizontal={false}
            />
            <XAxis
              type="number"
              tick={{ fill: "rgba(255,255,255,0.65)", fontSize: 12 }}
              tickFormatter={(value) =>
                `$${Intl.NumberFormat("us").format(value)}`
              }
            />
            <YAxis
              type="category"
              dataKey="category"
              tick={{ fill: "rgba(255,255,255,0.65)", fontSize: 12 }}
            />
            <Tooltip
              content={<RevenueDistributionTooltip />}
              cursor={{
                fill: "rgba(255,255,255,0.05)",
                stroke: "var(--color-chartVerticalLine)",
              }}
              isAnimationActive={false}
            />
            <Bar
              dataKey="inStore"
              name="In-store"
              stackId="a"
              fill={inStoreColor}
              radius={[0, 4, 4, 0]}
              barSize={30}
              isAnimationActive={shouldAnimate}
              animationBegin={animationBegin}
              animationDuration={800}
              animationEasing="ease-out"
            />
            <Bar
              dataKey="online"
              name="Online"
              stackId="a"
              fill={onlineColor}
              radius={[0, 4, 4, 0]}
              barSize={30}
              isAnimationActive={shouldAnimate}
              animationBegin={animationBegin}
              animationDuration={800}
              animationEasing="ease-out"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};
