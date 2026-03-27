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

import { useChartAnimation } from "../../../../hooks/useChartAnimation";
import { useWindowDimensions } from "../../../../hooks/useWindowDimensions";
import { BREAKPOINTS } from "../../../../styles/breakpoints";
import { BaseTooltip } from "../../../common/BaseTooltip";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../common/shadcn/card";
import {
  RevenueTrendsCustomLegendProps,
  RevenueTrendsCustomXAxisTickProps,
  RevenueTrendsProps,
  RevenueTrendsTooltipProps,
} from "../types";

const RevenueTrendsTooltip = ({
  active,
  payload,
  label,
}: RevenueTrendsTooltipProps) => {
  if (!active || !payload || !payload.length || !label) return null;

  return (
    <BaseTooltip title={label}>
      {payload.map((entry, index) => (
        <p
          key={`revenue-trends-tooltip-${index}`}
          className="px-3 pb-1 text-primaryText flex items-center justify-between"
        >
          <span>
            <span
              className="w-2 h-2 mr-2 rounded inline-block"
              style={{ backgroundColor: entry.color }}
            />
            {`${entry.name}:   `}
          </span>
          <span className="pl-[0.7rem]">
            ${Intl.NumberFormat("us").format(entry.value)}
          </span>
        </p>
      ))}
    </BaseTooltip>
  );
};

const CustomLegend = ({ payload }: RevenueTrendsCustomLegendProps) => {
  return (
    <div className="flex flex-row justify-end gap-8 text-white w-full mb-6">
      {payload?.map((entry, index) => (
        <div key={`legend-${index}`} className="flex items-center">
          <div
            className="w-3 h-3 rounded-sm mr-2"
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-sm text-primaryText">{entry.value}</span>
        </div>
      ))}
    </div>
  );
};

const CustomXAxisTick = ({
  x,
  y,
  payload,
}: RevenueTrendsCustomXAxisTickProps) => {
  return (
    <text
      x={x}
      y={y}
      dy={16}
      textAnchor="middle"
      fill="var(--color-chartAxisText)"
      fontSize="0.8rem"
    >
      {payload?.value || ""}
    </text>
  );
};

export const RevenueTrends = ({ revenueTrendsData }: RevenueTrendsProps) => {
  const t = useTranslations("analytics.revenueTrends");

  const { width: windowWidth } = useWindowDimensions();

  const { shouldAnimate, animationBegin } = useChartAnimation("analytics");

  const getBarSize = () => {
    if (windowWidth > BREAKPOINTS["1xl"]) return 24;
    if (windowWidth > BREAKPOINTS.md) return 18;
    if (windowWidth > BREAKPOINTS.sm) return 15;
    return 10;
  };

  const chartData =
    windowWidth > BREAKPOINTS.xsm
      ? revenueTrendsData.slice(-9)
      : revenueTrendsData.slice(-4);

  return (
    <Card className="revenueTrendsCard" id="revenueTrends">
      <CardHeader>
        <CardTitle>{t("title")}</CardTitle>
      </CardHeader>
      <CardContent>
        <div
          role="img"
          aria-label="Revenue trends bar chart"
          className="h-64 1xl:h-84 3xl:h-96"
        >
          <ResponsiveContainer
            width="100%"
            height="100%"
            initialDimension={{ width: 320, height: 200 }}
          >
            <BarChart
              data={chartData}
              margin={{
                top: 20,
                right: windowWidth > BREAKPOINTS.xsm ? 30 : 15,
                left: windowWidth > BREAKPOINTS.xsm ? 20 : 7,
                bottom: 5,
              }}
              tabIndex={-1}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="var(--color-chartPrimaryGrid)"
              />
              <XAxis
                dataKey="month"
                axisLine={{ stroke: "var(--color-chartAxisLine)" }}
                tickLine={false}
                tick={<CustomXAxisTick />}
              />
              <YAxis
                axisLine={{ stroke: "var(--color-chartAxisLine)" }}
                tickLine={false}
                tick={{ fill: "var(--color-chartAxisText)", fontSize: 12 }}
                tickFormatter={(value: number) =>
                  `$${Intl.NumberFormat("us").format(value)}`
                }
                domain={[
                  0,
                  (dataMax: number) => Math.ceil(dataMax / 1000) * 1000,
                ]}
              />
              <Tooltip
                content={<RevenueTrendsTooltip />}
                isAnimationActive={false}
                cursor={{
                  fill: "rgba(255,255,255,0.05)",
                  stroke: "var(--color-chartVerticalLine)",
                }}
              />
              <Legend
                verticalAlign="top"
                align="center"
                content={<CustomLegend />}
              />
              <Bar
                dataKey="sales"
                name="Sales"
                fill="var(--color-chartSecondaryInverted)"
                radius={[4, 4, 0, 0]}
                barSize={getBarSize()}
                minPointSize={5}
                isAnimationActive={shouldAnimate}
                animationBegin={animationBegin}
                animationDuration={800}
                animationEasing="ease-out"
              />
              <Bar
                dataKey="profit"
                name="Profit"
                fill="var(--color-chartPrimaryInverted)"
                radius={[4, 4, 0, 0]}
                barSize={getBarSize()}
                minPointSize={5}
                isAnimationActive={shouldAnimate}
                animationBegin={animationBegin}
                animationDuration={800}
                animationEasing="ease-out"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
