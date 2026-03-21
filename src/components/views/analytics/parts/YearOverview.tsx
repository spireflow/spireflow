import { useTranslations } from "next-intl";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { useChartAnimation } from "../../../../hooks/useChartAnimation";
import { useWindowDimensions } from "../../../../hooks/useWindowDimensions";
import { useChartAnimationStore } from "../../../../store/chartAnimationStore";
import { BREAKPOINTS } from "../../../../styles/breakpoints";
import { BaseTooltip } from "../../../common/BaseTooltip";
import { Card } from "../../../common/Card";
import {
  OverviewMonthData,
  YearOverviewCustomLegendProps,
  YearOverviewCustomTooltipProps,
  YearOverviewProps,
} from "../types";

const YearOverviewTooltip = ({
  active,
  payload,
  label,
}: YearOverviewCustomTooltipProps) => {
  if (!active || !payload || !payload.length || !label) return null;

  return (
    <BaseTooltip title={label}>
      {payload.map((entry, index) => (
        <p
          key={`yearoverview-tooltip-${index}`}
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

const CustomLegend = ({ payload }: YearOverviewCustomLegendProps) => {
  return (
    <div className="flex flex-row justify-end gap-8 text-white w-full mb-6">
      {payload?.map((entry, index) => (
        <div key={index} className="flex items-center">
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

const DataTable = ({ data }: { data: OverviewMonthData[] }) => {
  const lastSixMonths = data.slice(-8);

  return (
    <div className="overflow-hidden h-72 lg:h-80 1xl:h-[22rem] 3xl:h-96 mr-8 mt-1">
      <table className="w-full">
        <caption className="sr-only">Yearly revenue overview</caption>
        <thead>
          <tr>
            <th
              scope="col"
              className="text-secondaryText text-xs text-left text-base pl-4 py-2 1xl:py-3 3xl:py-3 border-b border-inputBorder"
            >
              Month
            </th>
            <th
              scope="col"
              className="text-secondaryText text-xs text-left text-base pl-4  py-2 1xl:py-3 3xl:py-3 border-b border-inputBorder"
            >
              Phones
            </th>
            <th
              scope="col"
              className="text-secondaryText text-xs text-left text-base pl-4  py-2 1xl:py-3 3xl:py-3 border-b border-inputBorder"
            >
              Laptops
            </th>
          </tr>
        </thead>
        <tbody>
          {lastSixMonths.map((row) => (
            <tr key={row.name} className="hover:bg-[rgb(255,255,255,0.03)]">
              <td className="text-tableCellText  font-medium text-xs 1xl:text-sm p-[0.4rem] 1xl:p-2 pl-4 border-b border-inputBorder">
                {row.name}
              </td>
              <td className="text-tableCellText  font-medium text-xs 1xl:text-sm pl-4 border-b border-inputBorder text-left">
                ${Intl.NumberFormat("us").format(row.phones)}
              </td>
              <td className="text-tableCellText  font-medium text-xs 1xl:text-sm pl-4 border-b border-inputBorder text-left">
                ${Intl.NumberFormat("us").format(row.laptops)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export const YearOverview = ({ yearOverviewData }: YearOverviewProps) => {
  const t = useTranslations("analytics.yearOverview");

  const { width: windowWidth } = useWindowDimensions();

  const { shouldAnimate, animationBegin } = useChartAnimation("analytics");
  const shouldStartChartAnimations = useChartAnimationStore(
    (state) => state.shouldStartChartAnimations,
  );

  return (
    <Card className="h-full" id="yearOverview" title={t("title")}>
      <div className="flex gap-8 3xl:pt-4">
        <div
          role="img"
          aria-label="Year overview area chart"
          className="w-full lg:w-3/4 h-72 lg:h-80 1xl:h-[22rem] 3xl:h-96"
        >
          <ResponsiveContainer
            width="100%"
            height="100%"
            initialDimension={{ width: 320, height: 200 }}
          >
            <AreaChart
              data={shouldStartChartAnimations ? yearOverviewData : []}
              margin={{
                top: 20,
                right: windowWidth > BREAKPOINTS.xsm ? 30 : 15,
                left: windowWidth > BREAKPOINTS.xsm ? 20 : 7,
                bottom: 5,
              }}
              tabIndex={-1}
            >
              <defs>
                <linearGradient id="colorPhones" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor={"var(--color-chartSecondaryInverted)"}
                    stopOpacity={0.3}
                  />
                  <stop
                    offset="95%"
                    stopColor={"var(--color-chartSecondaryInverted)"}
                    stopOpacity={0}
                  />
                </linearGradient>
                <linearGradient id="colorLaptops" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor={"var(--color-chartPrimaryInverted)"}
                    stopOpacity={0.3}
                  />
                  <stop
                    offset="95%"
                    stopColor={"var(--color-chartPrimaryInverted)"}
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke={"var(--color-chartPrimaryGrid)"}
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
                  `${Intl.NumberFormat("us").format(value)}`
                }
                domain={[
                  0,
                  (dataMax: number) => Math.ceil(dataMax / 1000) * 1000,
                ]}
              />
              <Tooltip
                content={<YearOverviewTooltip />}
                cursor={{
                  fill: "rgba(255,255,255,0.05)",
                  stroke: "var(--color-chartVerticalLine)",
                }}
                isAnimationActive={false}
              />
              <Legend
                verticalAlign="top"
                align="center"
                content={<CustomLegend />}
              />
              <Area
                name="Phones"
                type="monotone"
                dataKey="phones"
                stroke={"var(--color-chartSecondaryInverted)"}
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorPhones)"
                isAnimationActive={shouldAnimate}
                animationBegin={animationBegin}
                animationDuration={800}
                animationEasing="ease-out"
              />
              <Area
                name="Laptops"
                type="monotone"
                dataKey="laptops"
                stroke={"var(--color-chartPrimaryInverted)"}
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorLaptops)"
                isAnimationActive={shouldAnimate}
                animationBegin={animationBegin}
                animationDuration={800}
                animationEasing="ease-out"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="hidden lg:inline lg:w-1/4">
          <DataTable data={yearOverviewData} />
        </div>
      </div>
    </Card>
  );
};
