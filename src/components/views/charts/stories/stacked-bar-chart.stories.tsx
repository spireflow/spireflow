import type { Meta, StoryObj } from "@storybook/nextjs-vite";
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

import { ChartTooltip } from "./ChartTooltip";

interface StackedBarChartDemoProps {
  data: Array<Record<string, string | number>>;
  dataKeys: string[];
  colors?: string[];
  xAxisKey?: string;
  showGrid?: boolean;
  showLegend?: boolean;
  barRadius?: number;
  layout?: "horizontal" | "vertical";
}

const defaultData = [
  { month: "Jan", organic: 4000, paid: 2400, referral: 1200 },
  { month: "Feb", organic: 3000, paid: 1398, referral: 900 },
  { month: "Mar", organic: 2000, paid: 9800, referral: 1500 },
  { month: "Apr", organic: 2780, paid: 3908, referral: 1100 },
  { month: "May", organic: 1890, paid: 4800, referral: 800 },
  { month: "Jun", organic: 2390, paid: 3800, referral: 1300 },
];

const StackedBarChartDemo = ({
  data = defaultData,
  dataKeys = ["organic", "paid", "referral"],
  colors,
  xAxisKey = "month",
  showGrid = true,
  showLegend = true,
  barRadius = 0,
  layout = "horizontal",
}: StackedBarChartDemoProps) => {
  const chartColors = colors ?? [
    "var(--color-chartPrimaryBg)",
    "var(--color-chartSecondaryBg)",
    "rgb(168, 162, 255)",
    "rgb(255, 150, 150)",
    "rgb(100, 200, 180)",
  ];

  return (
    <div className="w-full h-full text-primaryText">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          layout={layout}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          {showGrid && (
            <CartesianGrid
              strokeDasharray="3 3"
              className="stroke-mainBorder"
              opacity={0.5}
            />
          )}
          {layout === "horizontal" ? (
            <>
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
            </>
          ) : (
            <>
              <XAxis
                type="number"
                className="text-secondaryText"
                tick={{ fill: "currentColor", fontSize: 12 }}
                stroke="currentColor"
                opacity={0.5}
              />
              <YAxis
                dataKey={xAxisKey}
                type="category"
                className="text-secondaryText"
                tick={{ fill: "currentColor", fontSize: 12 }}
                stroke="currentColor"
                opacity={0.5}
                width={50}
              />
            </>
          )}
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
          {dataKeys.map((key, index) => {
            const isLast = index === dataKeys.length - 1;
            return (
              <Bar
                key={key}
                dataKey={key}
                stackId="stack"
                fill={chartColors[index % chartColors.length]}
                radius={isLast ? [barRadius, barRadius, 0, 0] : 0}
              />
            );
          })}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

const meta: Meta<typeof StackedBarChartDemo> = {
  title: "Charts/StackedBarChart",
  component: StackedBarChartDemo,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
A stacked bar chart for showing composition of totals across categories.

**Features:**
- Multiple stacked series
- Horizontal or vertical layout
- Shows part-to-whole relationships
- Theme-aware colors

**Usage:**
\`\`\`tsx
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts";

<ResponsiveContainer width="100%" height={300}>
  <BarChart data={data}>
    <XAxis dataKey="month" />
    <YAxis />
    <Bar dataKey="organic" stackId="stack" fill="var(--color-chartPrimaryBg)" />
    <Bar dataKey="paid" stackId="stack" fill="var(--color-chartSecondaryBg)" />
  </BarChart>
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
      description: "Array of data keys to stack",
    },
    colors: {
      control: "object",
      description: "Custom colors for each stack segment",
    },
    xAxisKey: {
      control: "text",
      description: "Data key for category axis",
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
      description: "Border radius for top bar",
    },
    layout: {
      control: "select",
      options: ["horizontal", "vertical"],
      description: "Chart orientation",
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
type Story = StoryObj<typeof StackedBarChartDemo>;

export const Default: Story = {
  args: {
    data: defaultData,
    dataKeys: ["organic", "paid", "referral"],
    xAxisKey: "month",
    showGrid: true,
    showLegend: true,
    barRadius: 0,
    layout: "horizontal",
  },
};

export const Vertical: Story = {
  args: {
    ...Default.args,
    layout: "vertical",
  },
};

export const RoundedTop: Story = {
  args: {
    ...Default.args,
    barRadius: 8,
  },
};

export const TwoSeries: Story = {
  args: {
    ...Default.args,
    dataKeys: ["organic", "paid"],
  },
};

export const CustomColors: Story = {
  args: {
    ...Default.args,
    colors: ["#22c55e", "#3b82f6", "#f59e0b"],
  },
};

const quarterData = [
  { quarter: "Q1", product: 15000, services: 8000, support: 3000 },
  { quarter: "Q2", product: 18000, services: 9500, support: 3500 },
  { quarter: "Q3", product: 22000, services: 11000, support: 4000 },
  { quarter: "Q4", product: 28000, services: 14000, support: 5000 },
];

export const QuarterlyRevenue: Story = {
  args: {
    data: quarterData,
    dataKeys: ["product", "services", "support"],
    xAxisKey: "quarter",
    showLegend: true,
    barRadius: 4,
  },
};
