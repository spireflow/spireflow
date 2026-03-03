import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import {
  Area,
  Bar,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { ChartTooltip } from "./ChartTooltip";

interface ComposedChartDemoProps {
  data: Array<Record<string, string | number>>;
  xAxisKey?: string;
  barKey?: string;
  lineKey?: string;
  areaKey?: string;
  colors?: {
    bar?: string;
    line?: string;
    area?: string;
  };
  showGrid?: boolean;
  showLegend?: boolean;
  barRadius?: number;
  areaOpacity?: number;
}

const defaultData = [
  { month: "Jan", revenue: 4000, profit: 2400, growth: 1200 },
  { month: "Feb", revenue: 3000, profit: 1398, growth: 900 },
  { month: "Mar", revenue: 2000, profit: 9800, growth: 1500 },
  { month: "Apr", revenue: 2780, profit: 3908, growth: 1100 },
  { month: "May", revenue: 1890, profit: 4800, growth: 800 },
  { month: "Jun", revenue: 2390, profit: 3800, growth: 1000 },
];

const ComposedChartDemo = ({
  data = defaultData,
  xAxisKey = "month",
  barKey = "revenue",
  lineKey = "profit",
  areaKey = "growth",
  colors,
  showGrid = true,
  showLegend = true,
  barRadius = 4,
  areaOpacity = 0.3,
}: ComposedChartDemoProps) => {
  const chartColors = {
    bar: colors?.bar ?? "var(--color-chartPrimaryBg)",
    line: colors?.line ?? "var(--color-chartSecondaryBg)",
    area: colors?.area ?? "rgb(168, 162, 255)",
  };

  return (
    <div className="w-full h-full text-primaryText">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          {showGrid && (
            <CartesianGrid
              strokeDasharray="3 3"
              className="stroke-mainBorder"
              opacity={0.5}
            />
          )}
          <XAxis
            dataKey={xAxisKey}
            className="text-secondaryText"
            tick={{ fill: "currentColor", fontSize: 12 }}
            stroke="currentColor"
            opacity={0.5}
          />
          <YAxis
            className="text-secondaryText"
            tick={{ fill: "currentColor", fontSize: 12 }}
            stroke="currentColor"
            opacity={0.5}
            tickFormatter={(value: number) =>
              Intl.NumberFormat("en").format(value)
            }
          />
          <Tooltip
            content={<ChartTooltip />}
            cursor={{
              fill: "var(--color-chartCursorBg)",
              stroke: "var(--color-chartVerticalLine)",
            }}
            isAnimationActive={false}
          />
          {showLegend && (
            <Legend wrapperStyle={{ color: "var(--color-primaryText)" }} />
          )}
          {areaKey && (
            <Area
              type="monotone"
              dataKey={areaKey}
              fill={chartColors.area}
              stroke={chartColors.area}
              fillOpacity={areaOpacity}
            />
          )}
          {barKey && (
            <Bar
              dataKey={barKey}
              fill={chartColors.bar}
              radius={[barRadius, barRadius, 0, 0]}
            />
          )}
          {lineKey && (
            <Line
              type="monotone"
              dataKey={lineKey}
              stroke={chartColors.line}
              strokeWidth={2}
              dot={{ fill: chartColors.line }}
            />
          )}
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

const meta: Meta<typeof ComposedChartDemo> = {
  title: "Charts/ComposedChart",
  component: ComposedChartDemo,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
A composed chart combining bars, lines, and areas in one visualization.

**Features:**
- Mix of bar, line, and area charts
- Great for showing related metrics together
- Independent colors for each chart type
- Theme-aware colors

**Usage:**
\`\`\`tsx
import { ComposedChart, Bar, Line, Area, XAxis, YAxis, ResponsiveContainer } from "recharts";

<ResponsiveContainer width="100%" height={300}>
  <ComposedChart data={data}>
    <XAxis dataKey="month" />
    <YAxis />
    <Bar dataKey="revenue" fill="var(--color-chartPrimaryBg)" />
    <Line type="monotone" dataKey="profit" stroke="var(--color-chartSecondaryBg)" />
    <Area type="monotone" dataKey="growth" fill="rgb(168, 162, 255)" fillOpacity={0.3} />
  </ComposedChart>
</ResponsiveContainer>
\`\`\`
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    xAxisKey: {
      control: "text",
      description: "Data key for X axis",
    },
    barKey: {
      control: "text",
      description: "Data key for bar series (empty to hide)",
    },
    lineKey: {
      control: "text",
      description: "Data key for line series (empty to hide)",
    },
    areaKey: {
      control: "text",
      description: "Data key for area series (empty to hide)",
    },
    colors: {
      control: "object",
      description: "Custom colors { bar, line, area }",
    },
    showGrid: {
      control: "boolean",
      description: "Show background grid",
    },
    showLegend: {
      control: "boolean",
      description: "Show legend",
    },
    barRadius: {
      control: { type: "range", min: 0, max: 20, step: 2 },
      description: "Border radius for bar tops",
    },
    areaOpacity: {
      control: { type: "range", min: 0.1, max: 1, step: 0.1 },
      description: "Area fill opacity",
    },
  },
  decorators: [
    (Story) => (
      <div className="p-6 bg-primaryBg rounded-lg max-w-md mx-auto aspect-[4/3]">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ComposedChartDemo>;

export const Default: Story = {
  args: {
    data: defaultData,
    xAxisKey: "month",
    barKey: "revenue",
    lineKey: "profit",
    areaKey: "growth",
    showGrid: true,
    showLegend: true,
    barRadius: 4,
    areaOpacity: 0.3,
  },
};

export const BarAndLine: Story = {
  args: {
    ...Default.args,
    areaKey: "",
  },
};

export const LineAndArea: Story = {
  args: {
    ...Default.args,
    barKey: "",
  },
};

export const BarAndArea: Story = {
  args: {
    ...Default.args,
    lineKey: "",
    areaOpacity: 0.5,
  },
};

export const CustomColors: Story = {
  args: {
    ...Default.args,
    colors: {
      bar: "#f59e0b",
      line: "#ef4444",
      area: "#8b5cf6",
    },
  },
};

export const HighAreaOpacity: Story = {
  args: {
    ...Default.args,
    areaOpacity: 0.7,
  },
};

const salesAnalysisData = [
  { quarter: "Q1", sales: 15000, target: 12000, trend: 8000 },
  { quarter: "Q2", sales: 18000, target: 15000, trend: 10000 },
  { quarter: "Q3", sales: 22000, target: 18000, trend: 13000 },
  { quarter: "Q4", sales: 28000, target: 22000, trend: 16000 },
];

export const SalesAnalysis: Story = {
  args: {
    data: salesAnalysisData,
    xAxisKey: "quarter",
    barKey: "sales",
    lineKey: "target",
    areaKey: "trend",
    showLegend: true,
    barRadius: 6,
  },
};
