import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { useChartAnimation } from "../../../hooks/useChartAnimation";
import { useWindowDimensions } from "../../../hooks/useWindowDimensions";
import { BaseTooltip } from "../../common/BaseTooltip";
import { Card } from "../../common/Card";
import {
  RevenueDistributionProps,
  RevenueDistributionTooltipProps,
} from "./types";

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
        className="w-full h-72 3xl:h-96 mt-4 1xl:mt-4 -ml-4"
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
              strokeDasharray="3 3"
              stroke={"var(--color-chartPrimaryGrid)"}
            />
            <XAxis
              type="number"
              axisLine={{ stroke: "var(--color-chartAxisLine)" }}
              tickLine={false}
              tick={{ fill: "var(--color-chartAxisText)", fontSize: 12 }}
              tickFormatter={(value) =>
                `$${Intl.NumberFormat("us").format(value)}`
              }
            />
            <YAxis
              type="category"
              dataKey="category"
              axisLine={{ stroke: "var(--color-chartAxisLine)" }}
              tickLine={false}
              tick={{ fill: "var(--color-chartAxisText)", fontSize: 12 }}
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
