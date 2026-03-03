import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { ChartTooltip } from "./ChartTooltip";

interface LineChartDemoProps {
  data: Array<Record<string, string | number>>;
  dataKeys: string[];
  colors?: string[];
  xAxisKey?: string;
  showGrid?: boolean;
  showLegend?: boolean;
  showDots?: boolean;
  strokeWidth?: number;
  curveType?: "linear" | "monotone" | "step";
  height?: number;
}

const defaultData = [
  { month: "Jan", sales: 4000, orders: 2400 },
  { month: "Feb", sales: 3000, orders: 1398 },
  { month: "Mar", sales: 2000, orders: 9800 },
  { month: "Apr", sales: 2780, orders: 3908 },
  { month: "May", sales: 1890, orders: 4800 },
  { month: "Jun", sales: 2390, orders: 3800 },
];

const LineChartDemo = ({
  data = defaultData,
  dataKeys = ["sales", "orders"],
  colors,
  xAxisKey = "month",
  showGrid = true,
  showLegend = true,
  showDots = true,
  strokeWidth = 2,
  curveType = "monotone",
  height = 300,
}: LineChartDemoProps) => {
  const chartColors = colors ?? [
    "var(--color-chartPrimaryBg)",
    "var(--color-chartSecondaryBg)",
    "rgb(168, 162, 255)",
    "rgb(255, 150, 150)",
  ];

  return (
    <div style={{ width: "100%", height }} className="text-primaryText">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
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
          <Tooltip content={<ChartTooltip />} isAnimationActive={false} />
          {showLegend && (
            <Legend wrapperStyle={{ color: "var(--color-primaryText)" }} />
          )}
          {dataKeys.map((key, index) => (
            <Line
              key={key}
              type={curveType}
              dataKey={key}
              stroke={chartColors[index % chartColors.length]}
              strokeWidth={strokeWidth}
              dot={showDots}
              activeDot={{ r: 6 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

const meta: Meta<typeof LineChartDemo> = {
  title: "Charts/LineChart",
  component: LineChartDemo,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
A customizable line chart built with Recharts. Perfect for displaying trends over time.

**Features:**
- Multiple data series support
- Configurable curve types (linear, monotone, step)
- Optional grid, legend, and dots
- Theme-aware colors (supports dark/light mode)
- Responsive container

**Usage:**
\`\`\`tsx
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from "recharts";

<ResponsiveContainer width="100%" height={300}>
  <LineChart data={data}>
    <XAxis dataKey="month" />
    <YAxis />
    <Line type="monotone" dataKey="value" stroke="var(--color-chartPrimaryBg)" />
  </LineChart>
</ResponsiveContainer>
\`\`\`
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    dataKeys: {
      control: "object",
      description: "Array of data keys to plot as lines",
    },
    colors: {
      control: "object",
      description: "Custom colors for each line (uses theme colors by default)",
    },
    xAxisKey: {
      control: "text",
      description: "Data key for X axis labels",
    },
    showGrid: {
      control: "boolean",
      description: "Show background grid",
    },
    showLegend: {
      control: "boolean",
      description: "Show legend below chart",
    },
    showDots: {
      control: "boolean",
      description: "Show dots on data points",
    },
    strokeWidth: {
      control: { type: "range", min: 1, max: 5, step: 1 },
      description: "Line stroke width",
    },
    curveType: {
      control: "select",
      options: ["linear", "monotone", "step"],
      description: "Line interpolation type",
    },
    height: {
      control: { type: "range", min: 200, max: 500, step: 50 },
      description: "Chart height in pixels",
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
type Story = StoryObj<typeof LineChartDemo>;

export const Default: Story = {
  args: {
    data: defaultData,
    dataKeys: ["sales", "orders"],
    xAxisKey: "month",
    showGrid: true,
    showLegend: true,
    showDots: true,
    strokeWidth: 2,
    curveType: "monotone",
    height: 300,
  },
};

export const SingleLine: Story = {
  args: {
    ...Default.args,
    dataKeys: ["sales"],
    showLegend: false,
  },
};

export const NoDots: Story = {
  args: {
    ...Default.args,
    showDots: false,
    strokeWidth: 3,
  },
};

export const StepCurve: Story = {
  args: {
    ...Default.args,
    curveType: "step",
  },
};

export const LinearCurve: Story = {
  args: {
    ...Default.args,
    curveType: "linear",
  },
};

export const NoGrid: Story = {
  args: {
    ...Default.args,
    showGrid: false,
  },
};

export const CustomColors: Story = {
  args: {
    ...Default.args,
    colors: ["#f43f5e", "#8b5cf6"],
  },
};

const multiSeriesData = [
  { quarter: "Q1", revenue: 12000, costs: 8000, profit: 4000 },
  { quarter: "Q2", revenue: 15000, costs: 9000, profit: 6000 },
  { quarter: "Q3", revenue: 18000, costs: 10000, profit: 8000 },
  { quarter: "Q4", revenue: 22000, costs: 11000, profit: 11000 },
];

export const MultiSeries: Story = {
  args: {
    data: multiSeriesData,
    dataKeys: ["revenue", "costs", "profit"],
    xAxisKey: "quarter",
    showGrid: true,
    showLegend: true,
    height: 350,
  },
};
