import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import { ChartTooltip } from "./ChartTooltip";

interface BarChartDemoProps {
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
  { name: "Jan", sales: 4000, returns: 400 },
  { name: "Feb", sales: 3000, returns: 300 },
  { name: "Mar", sales: 2000, returns: 500 },
  { name: "Apr", sales: 2780, returns: 390 },
  { name: "May", sales: 1890, returns: 480 },
  { name: "Jun", sales: 2390, returns: 380 },
];

const BarChartDemo = ({
  data = defaultData,
  dataKeys = ["sales", "returns"],
  colors,
  xAxisKey = "name",
  showGrid = true,
  showLegend = true,
  barRadius = 4,
  layout = "horizontal",
}: BarChartDemoProps) => {
  const chartColors = colors ?? [
    "var(--color-chartPrimaryBg)",
    "var(--color-chartSecondaryBg)",
    "rgb(168, 162, 255)",
    "rgb(255, 150, 150)",
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
                tickFormatter={(value: number) => Intl.NumberFormat("en").format(value)}
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
                width={40}
              />
            </>
          )}
          <Tooltip
            content={<ChartTooltip />}
            cursor={{ fill: "var(--color-chartCursorBg)", stroke: "var(--color-chartVerticalLine)" }}
            isAnimationActive={false}
          />
          {showLegend && (
            <Legend wrapperStyle={{ color: "var(--color-primaryText)" }} />
          )}
          {dataKeys.map((key, index) => (
            <Bar
              key={key}
              dataKey={key}
              fill={chartColors[index % chartColors.length]}
              radius={[barRadius, barRadius, 0, 0]}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

const meta: Meta<typeof BarChartDemo> = {
  title: "Charts/BarChart",
  component: BarChartDemo,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
A customizable bar chart built with Recharts. Ideal for comparing categories.

**Features:**
- Horizontal or vertical layout
- Multiple data series
- Configurable bar radius
- Theme-aware colors

**Usage:**
\`\`\`tsx
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts";

<ResponsiveContainer width="100%" height={300}>
  <BarChart data={data}>
    <XAxis dataKey="name" />
    <YAxis />
    <Bar dataKey="value" fill="var(--color-chartPrimaryBg)" radius={[4, 4, 0, 0]} />
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
      description: "Array of data keys to plot as bars",
    },
    colors: {
      control: "object",
      description: "Custom colors for each bar series",
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
      description: "Border radius for bar tops",
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
type Story = StoryObj<typeof BarChartDemo>;

export const Default: Story = {
  args: {
    data: defaultData,
    dataKeys: ["sales", "returns"],
    xAxisKey: "name",
    showGrid: true,
    showLegend: true,
    barRadius: 4,
    layout: "horizontal",
  },
};

export const SingleBar: Story = {
  args: {
    ...Default.args,
    dataKeys: ["sales"],
    showLegend: false,
  },
};

export const Vertical: Story = {
  args: {
    ...Default.args,
    layout: "vertical",
  },
};

export const RoundedBars: Story = {
  args: {
    ...Default.args,
    barRadius: 12,
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
    colors: ["#f59e0b", "#ef4444"],
  },
};

const categoryData = [
  { category: "Electronics", value: 12500 },
  { category: "Clothing", value: 8200 },
  { category: "Home", value: 6800 },
  { category: "Sports", value: 4500 },
  { category: "Books", value: 2100 },
];

export const Categories: Story = {
  args: {
    data: categoryData,
    dataKeys: ["value"],
    xAxisKey: "category",
    showLegend: false,
    barRadius: 6,
  },
};
