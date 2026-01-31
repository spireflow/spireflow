import { BaseTooltip } from "../../../common/BaseTooltip";

interface TooltipPayloadItem {
  name?: string;
  value?: number;
  color?: string;
  dataKey?: string;
  payload?: Record<string, unknown>;
}

interface ChartTooltipProps {
  active?: boolean;
  payload?: TooltipPayloadItem[];
  label?: string;
  valueFormatter?: (value: number) => string;
}

/**
 * Shared tooltip component for chart stories.
 * Renders colored dots and formatted values using BaseTooltip styling.
 */
export const ChartTooltip = ({
  active,
  payload,
  label,
  valueFormatter = (value) => `$${Intl.NumberFormat("en").format(value)}`,
}: ChartTooltipProps) => {
  if (!active || !payload || payload.length === 0) return null;

  const title = label || (payload[0]?.payload as Record<string, unknown>)?.name as string || "";

  return (
    <BaseTooltip title={title}>
      {payload.map((entry, index) => (
        <p
          key={index}
          className="px-3 pb-1 text-primaryText flex items-center justify-between"
        >
          <span>
            <span
              className="w-2 h-2 mr-2 rounded inline-block"
              style={{ backgroundColor: entry.color }}
            />
            {entry.name || entry.dataKey}:
          </span>
          <span className="pl-3">
            {valueFormatter(entry.value ?? 0)}
          </span>
        </p>
      ))}
    </BaseTooltip>
  );
};

interface PieTooltipPayloadItem {
  payload: {
    name: string;
    value: number;
    color?: string;
    fill?: string;
  };
}

interface PieChartTooltipProps {
  active?: boolean;
  payload?: PieTooltipPayloadItem[];
  valueFormatter?: (value: number) => string;
}

/**
 * Tooltip component specifically for Pie/Donut charts.
 * Handles the nested payload structure of pie charts.
 */
export const PieChartTooltip = ({
  active,
  payload,
  valueFormatter = (value) => `$${Intl.NumberFormat("en").format(value)}`,
}: PieChartTooltipProps) => {
  if (!active || !payload || payload.length === 0) return null;

  const data = payload[0].payload;
  const color = data.color || data.fill;

  return (
    <BaseTooltip title={data.name}>
      <p className="px-3 pb-1 text-primaryText flex items-center justify-between">
        <span>
          <span
            className="w-2 h-2 mr-2 rounded inline-block"
            style={{ backgroundColor: color }}
          />
          Value:
        </span>
        <span className="pl-3">
          {valueFormatter(data.value)}
        </span>
      </p>
    </BaseTooltip>
  );
};
