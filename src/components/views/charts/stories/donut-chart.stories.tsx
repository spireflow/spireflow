import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

import { PieChartTooltip } from "./ChartTooltip";

interface DonutChartDemoProps {
  data: Array<{ name: string; value: number }>;
  colors?: string[];
  showLegend?: boolean;
  innerRadius?: number;
  outerRadius?: number;
  paddingAngle?: number;
  centerLabel?: string;
  centerValue?: string;
}

const defaultData = [
  { name: "Completed", value: 68 },
  { name: "In Progress", value: 22 },
  { name: "Pending", value: 10 },
];

const DonutChartDemo = ({
  data = defaultData,
  colors,
  showLegend = true,
  innerRadius = 60,
  outerRadius = 90,
  paddingAngle = 2,
  centerLabel,
  centerValue,
}: DonutChartDemoProps) => {
  const chartColors = colors ?? [
    "var(--color-chartPrimaryBg)",
    "var(--color-chartSecondaryBg)",
    "rgb(168, 162, 255)",
    "rgb(100, 200, 180)",
    "rgb(255, 150, 150)",
  ];

  return (
    <div className="w-full h-full text-primaryText relative">
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
            content={
              <PieChartTooltip valueFormatter={(value) => `${value}%`} />
            }
            isAnimationActive={false}
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
      {(centerLabel || centerValue) && (
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          {centerValue && (
            <span className="text-2xl font-bold text-primaryText">
              {centerValue}
            </span>
          )}
          {centerLabel && (
            <span className="text-sm text-secondaryText">{centerLabel}</span>
          )}
        </div>
      )}
    </div>
  );
};

const meta: Meta<typeof DonutChartDemo> = {
  title: "Charts/DonutChart",
  component: DonutChartDemo,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
A donut chart (pie with inner radius) with optional center label.

**Features:**
- Configurable inner/outer radius
- Center text for key metrics
- Padding between segments
- Theme-aware colors

**Usage:**
\`\`\`tsx
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

<ResponsiveContainer width="100%" height={300}>
  <PieChart>
    <Pie
      data={data}
      dataKey="value"
      cx="50%"
      cy="50%"
      innerRadius={60}
      outerRadius={90}
    >
      {data.map((_, index) => (
        <Cell key={index} fill={COLORS[index]} />
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
    innerRadius: {
      control: { type: "range", min: 30, max: 80, step: 5 },
      description: "Inner radius of the donut",
    },
    outerRadius: {
      control: { type: "range", min: 60, max: 120, step: 5 },
      description: "Outer radius of the donut",
    },
    paddingAngle: {
      control: { type: "range", min: 0, max: 10, step: 1 },
      description: "Gap between segments",
    },
    centerLabel: {
      control: "text",
      description: "Small label text in center",
    },
    centerValue: {
      control: "text",
      description: "Large value text in center",
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
type Story = StoryObj<typeof DonutChartDemo>;

export const Default: Story = {
  args: {
    data: defaultData,
    showLegend: true,
    innerRadius: 60,
    outerRadius: 90,
    paddingAngle: 2,
  },
};

export const WithCenterLabel: Story = {
  args: {
    ...Default.args,
    centerValue: "68%",
    centerLabel: "Completed",
  },
};

export const ThinDonut: Story = {
  args: {
    ...Default.args,
    innerRadius: 70,
    outerRadius: 90,
    centerValue: "100",
    centerLabel: "Tasks",
  },
};

export const ThickDonut: Story = {
  args: {
    ...Default.args,
    innerRadius: 40,
    outerRadius: 90,
  },
};

export const NoGaps: Story = {
  args: {
    ...Default.args,
    paddingAngle: 0,
  },
};

export const CustomColors: Story = {
  args: {
    ...Default.args,
    colors: ["#22c55e", "#eab308", "#ef4444"],
    centerValue: "68%",
    centerLabel: "Success Rate",
  },
};

const storageData = [
  { name: "Used", value: 75 },
  { name: "Available", value: 25 },
];

export const StorageUsage: Story = {
  args: {
    data: storageData,
    colors: ["var(--color-chartPrimaryBg)", "rgb(100, 100, 100)"],
    innerRadius: 65,
    outerRadius: 85,
    paddingAngle: 0,
    centerValue: "75%",
    centerLabel: "Storage Used",
    showLegend: false,
  },
};

const budgetData = [
  { name: "Marketing", value: 35 },
  { name: "Development", value: 30 },
  { name: "Operations", value: 20 },
  { name: "Sales", value: 15 },
];

export const BudgetAllocation: Story = {
  args: {
    data: budgetData,
    innerRadius: 55,
    outerRadius: 85,
    paddingAngle: 3,
    showLegend: true,
  },
};
