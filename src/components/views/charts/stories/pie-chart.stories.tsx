import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface PieChartDemoProps {
  data: Array<{ name: string; value: number }>;
  colors?: string[];
  showLegend?: boolean;
  showLabels?: boolean;
  innerRadius?: number;
  outerRadius?: number;
  paddingAngle?: number;
}

const defaultData = [
  { name: "Electronics", value: 4500 },
  { name: "Clothing", value: 3200 },
  { name: "Home & Garden", value: 2800 },
  { name: "Sports", value: 1800 },
  { name: "Books", value: 1200 },
];

const PieChartDemo = ({
  data = defaultData,
  colors,
  showLegend = true,
  showLabels = true,
  innerRadius = 0,
  outerRadius = 80,
  paddingAngle = 0,
}: PieChartDemoProps) => {
  const chartColors = colors ?? [
    "var(--color-chartPrimaryBg)",
    "var(--color-chartSecondaryBg)",
    "rgb(168, 162, 255)",
    "rgb(100, 200, 180)",
    "rgb(255, 150, 150)",
    "rgb(255, 200, 100)",
  ];

  const renderLabel = ({
    name,
    percent,
  }: {
    name: string;
    percent: number;
  }) => {
    return `${name} ${(percent * 100).toFixed(0)}%`;
  };

  return (
    <div className="w-full h-full text-primaryText">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={innerRadius}
            outerRadius={outerRadius}
            paddingAngle={paddingAngle}
            dataKey="value"
            label={showLabels ? renderLabel : false}
            labelLine={showLabels}
          >
            {data.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={chartColors[index % chartColors.length]}
                stroke="none"
              />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: "var(--color-tooltipBg)",
              border: "1px solid var(--color-mainBorder)",
              borderRadius: "6px",
              color: "var(--color-primaryText)",
            }}
            formatter={(value: number) => [
              `$${Intl.NumberFormat("en").format(value)}`,
              "Value",
            ]}
          />
          {showLegend && (
            <Legend
              wrapperStyle={{ color: "var(--color-primaryText)" }}
              layout="horizontal"
              verticalAlign="bottom"
            />
          )}
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

const meta: Meta<typeof PieChartDemo> = {
  title: "Charts/PieChart",
  component: PieChartDemo,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
A customizable pie chart for showing proportions and distributions.

**Features:**
- Configurable inner/outer radius (for donut variant)
- Optional labels with percentages
- Padding angle for separated segments
- Theme-aware colors

**Usage:**
\`\`\`tsx
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const COLORS = ["#3db985", "#5385c6", "#a8a2ff"];

<ResponsiveContainer width="100%" height={300}>
  <PieChart>
    <Pie data={data} dataKey="value" cx="50%" cy="50%" outerRadius={80}>
      {data.map((_, index) => (
        <Cell key={index} fill={COLORS[index % COLORS.length]} />
      ))}
    </Pie>
  </PieChart>
</ResponsiveContainer>
\`\`\`
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    data: {
      control: "object",
      description: "Array of { name, value } objects",
    },
    colors: {
      control: "object",
      description: "Custom colors for each segment",
    },
    showLegend: {
      control: "boolean",
      description: "Show legend below chart",
    },
    showLabels: {
      control: "boolean",
      description: "Show percentage labels on segments",
    },
    innerRadius: {
      control: { type: "range", min: 0, max: 70, step: 5 },
      description: "Inner radius (0 for pie, >0 for donut)",
    },
    outerRadius: {
      control: { type: "range", min: 50, max: 120, step: 5 },
      description: "Outer radius of the chart",
    },
    paddingAngle: {
      control: { type: "range", min: 0, max: 10, step: 1 },
      description: "Gap between segments in degrees",
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
type Story = StoryObj<typeof PieChartDemo>;

export const Default: Story = {
  args: {
    data: defaultData,
    showLegend: true,
    showLabels: true,
    innerRadius: 0,
    outerRadius: 80,
    paddingAngle: 0,
  },
};

export const NoLabels: Story = {
  args: {
    ...Default.args,
    showLabels: false,
  },
};

export const WithGaps: Story = {
  args: {
    ...Default.args,
    paddingAngle: 3,
    showLabels: false,
  },
};

export const LargerRadius: Story = {
  args: {
    ...Default.args,
    outerRadius: 100,
    showLabels: false,
  },
};

export const CustomColors: Story = {
  args: {
    ...Default.args,
    colors: ["#f43f5e", "#8b5cf6", "#06b6d4", "#84cc16", "#f59e0b"],
    showLabels: false,
  },
};

const marketShareData = [
  { name: "Chrome", value: 65 },
  { name: "Safari", value: 19 },
  { name: "Firefox", value: 8 },
  { name: "Edge", value: 5 },
  { name: "Other", value: 3 },
];

export const MarketShare: Story = {
  args: {
    data: marketShareData,
    showLegend: true,
    showLabels: false,
    outerRadius: 90,
  },
};
