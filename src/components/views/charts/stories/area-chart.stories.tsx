import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import { ChartTooltip } from "./ChartTooltip";

interface AreaChartDemoProps {
  data: Array<Record<string, string | number>>;
  dataKeys: string[];
  colors?: string[];
  xAxisKey?: string;
  showGrid?: boolean;
  showLegend?: boolean;
  fillOpacity?: number;
  stacked?: boolean;
  curveType?: "linear" | "monotone" | "step";
  height?: number;
}

const defaultData = [
  { month: "Jan", desktop: 4000, mobile: 2400 },
  { month: "Feb", desktop: 3000, mobile: 1398 },
  { month: "Mar", desktop: 2000, mobile: 9800 },
  { month: "Apr", desktop: 2780, mobile: 3908 },
  { month: "May", desktop: 1890, mobile: 4800 },
  { month: "Jun", desktop: 2390, mobile: 3800 },
];

const AreaChartDemo = ({
  data = defaultData,
  dataKeys = ["desktop", "mobile"],
  colors,
  xAxisKey = "month",
  showGrid = true,
  showLegend = true,
  fillOpacity = 0.3,
  stacked = false,
  curveType = "monotone",
  height = 300,
}: AreaChartDemoProps) => {
  const chartColors = colors ?? [
    "var(--color-chartPrimaryBg)",
    "var(--color-chartSecondaryBg)",
    "rgb(168, 162, 255)",
    "rgb(255, 150, 150)",
  ];

  return (
    <div style={{ width: "100%", height }} className="text-primaryText">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
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
            tickFormatter={(value: number) => Intl.NumberFormat("en").format(value)}
          />
          <Tooltip
            content={<ChartTooltip />}
            isAnimationActive={false}
          />
          {showLegend && (
            <Legend wrapperStyle={{ color: "var(--color-primaryText)" }} />
          )}
          {dataKeys.map((key, index) => (
            <Area
              key={key}
              type={curveType}
              dataKey={key}
              stackId={stacked ? "stack" : undefined}
              stroke={chartColors[index % chartColors.length]}
              fill={chartColors[index % chartColors.length]}
              fillOpacity={fillOpacity}
            />
          ))}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

const meta: Meta<typeof AreaChartDemo> = {
  title: "Charts/AreaChart",
  component: AreaChartDemo,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
A customizable area chart built with Recharts. Great for showing volume and trends.

**Features:**
- Single or stacked areas
- Configurable fill opacity
- Multiple curve types
- Theme-aware colors

**Usage:**
\`\`\`tsx
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer } from "recharts";

<ResponsiveContainer width="100%" height={300}>
  <AreaChart data={data}>
    <XAxis dataKey="month" />
    <YAxis />
    <Area
      type="monotone"
      dataKey="value"
      stroke="var(--color-chartPrimaryBg)"
      fill="var(--color-chartPrimaryBg)"
      fillOpacity={0.3}
    />
  </AreaChart>
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
      description: "Array of data keys to plot as areas",
    },
    colors: {
      control: "object",
      description: "Custom colors for each area",
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
    fillOpacity: {
      control: { type: "range", min: 0.1, max: 1, step: 0.1 },
      description: "Area fill opacity",
    },
    stacked: {
      control: "boolean",
      description: "Stack areas on top of each other",
    },
    curveType: {
      control: "select",
      options: ["linear", "monotone", "step"],
      description: "Area curve type",
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
type Story = StoryObj<typeof AreaChartDemo>;

export const Default: Story = {
  args: {
    data: defaultData,
    dataKeys: ["desktop", "mobile"],
    xAxisKey: "month",
    showGrid: true,
    showLegend: true,
    fillOpacity: 0.3,
    stacked: false,
    curveType: "monotone",
    height: 300,
  },
};

export const Stacked: Story = {
  args: {
    ...Default.args,
    stacked: true,
    fillOpacity: 0.6,
  },
};

export const SingleArea: Story = {
  args: {
    ...Default.args,
    dataKeys: ["desktop"],
    showLegend: false,
    fillOpacity: 0.5,
  },
};

export const HighOpacity: Story = {
  args: {
    ...Default.args,
    fillOpacity: 0.8,
  },
};

export const LinearCurve: Story = {
  args: {
    ...Default.args,
    curveType: "linear",
  },
};

export const CustomColors: Story = {
  args: {
    ...Default.args,
    colors: ["#8b5cf6", "#ec4899"],
    fillOpacity: 0.4,
  },
};
