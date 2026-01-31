import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ZAxis,
  TooltipProps,
} from "recharts";

interface TooltipPayloadItem {
  name: string;
  value: number;
  dataKey: string;
}

const ScatterTooltipContent = ({
  active,
  payload,
}: TooltipProps<number, string>) => {
  if (!active || !payload || payload.length === 0) return null;

  return (
    <div className="bg-primaryBg border border-mainBorder rounded px-3 py-2 shadow-lg">
      {payload.map((entry, index) => {
        const item = entry as unknown as TooltipPayloadItem;
        return (
          <p key={index} className="text-primaryText text-sm">
            {item.name}: {item.value}
          </p>
        );
      })}
    </div>
  );
};

interface ScatterChartDemoProps {
  data: Array<Array<{ x: number; y: number; z?: number }>>;
  seriesNames?: string[];
  colors?: string[];
  showGrid?: boolean;
  showLegend?: boolean;
  xAxisLabel?: string;
  yAxisLabel?: string;
  showBubbles?: boolean;
}

const defaultData = [
  [
    { x: 100, y: 200 },
    { x: 120, y: 100 },
    { x: 170, y: 300 },
    { x: 140, y: 250 },
    { x: 150, y: 400 },
    { x: 110, y: 280 },
  ],
  [
    { x: 200, y: 260 },
    { x: 240, y: 290 },
    { x: 190, y: 320 },
    { x: 220, y: 150 },
    { x: 250, y: 380 },
    { x: 210, y: 220 },
  ],
];

const ScatterChartDemo = ({
  data = defaultData,
  seriesNames = ["Series A", "Series B"],
  colors,
  showGrid = true,
  showLegend = true,
  xAxisLabel = "X Value",
  yAxisLabel = "Y Value",
  showBubbles = false,
}: ScatterChartDemoProps) => {
  const chartColors = colors ?? [
    "var(--color-chartPrimaryBg)",
    "var(--color-chartSecondaryBg)",
    "rgb(168, 162, 255)",
    "rgb(255, 150, 150)",
  ];

  return (
    <div className="w-full h-full text-primaryText">
      <ResponsiveContainer width="100%" height="100%">
        <ScatterChart margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
          {showGrid && (
            <CartesianGrid
              strokeDasharray="3 3"
              className="stroke-mainBorder"
              opacity={0.5}
            />
          )}
          <XAxis
            type="number"
            dataKey="x"
            name={xAxisLabel}
            className="text-secondaryText"
            tick={{ fill: "currentColor", fontSize: 12 }}
            stroke="currentColor"
            opacity={0.5}
          />
          <YAxis
            type="number"
            dataKey="y"
            name={yAxisLabel}
            className="text-secondaryText"
            tick={{ fill: "currentColor", fontSize: 12 }}
            stroke="currentColor"
            opacity={0.5}
          />
          {showBubbles && <ZAxis type="number" dataKey="z" range={[60, 400]} />}
          <Tooltip
            content={<ScatterTooltipContent />}
            cursor={{ strokeDasharray: "3 3" }}
            isAnimationActive={false}
          />
          {showLegend && (
            <Legend wrapperStyle={{ color: "var(--color-primaryText)" }} />
          )}
          {data.map((series, index) => (
            <Scatter
              key={seriesNames[index] || `series-${index}`}
              name={seriesNames[index] || `Series ${index + 1}`}
              data={series}
              fill={chartColors[index % chartColors.length]}
            />
          ))}
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
};

const meta: Meta<typeof ScatterChartDemo> = {
  title: "Charts/ScatterChart",
  component: ScatterChartDemo,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
A scatter plot for showing correlation between two variables.

**Features:**
- Multiple data series
- Optional bubble size (Z axis)
- Great for showing distributions and correlations
- Theme-aware colors

**Usage:**
\`\`\`tsx
import { ScatterChart, Scatter, XAxis, YAxis, ResponsiveContainer } from "recharts";

<ResponsiveContainer width="100%" height={300}>
  <ScatterChart>
    <XAxis type="number" dataKey="x" />
    <YAxis type="number" dataKey="y" />
    <Scatter data={data} fill="var(--color-chartPrimaryBg)" />
  </ScatterChart>
</ResponsiveContainer>
\`\`\`
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    seriesNames: {
      control: "object",
      description: "Names for each data series",
    },
    colors: {
      control: "object",
      description: "Custom colors for each series",
    },
    showGrid: {
      control: "boolean",
      description: "Show background grid",
    },
    showLegend: {
      control: "boolean",
      description: "Show legend",
    },
    xAxisLabel: {
      control: "text",
      description: "Label for X axis",
    },
    yAxisLabel: {
      control: "text",
      description: "Label for Y axis",
    },
    showBubbles: {
      control: "boolean",
      description: "Enable bubble size based on Z value",
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
type Story = StoryObj<typeof ScatterChartDemo>;

export const Default: Story = {
  args: {
    data: defaultData,
    seriesNames: ["Series A", "Series B"],
    showGrid: true,
    showLegend: true,
    xAxisLabel: "X Value",
    yAxisLabel: "Y Value",
    showBubbles: false,
  },
};

export const SingleSeries: Story = {
  args: {
    ...Default.args,
    data: [defaultData[0]],
    seriesNames: ["Data Points"],
    showLegend: false,
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

const bubbleData = [
  [
    { x: 100, y: 200, z: 200 },
    { x: 120, y: 100, z: 260 },
    { x: 170, y: 300, z: 400 },
    { x: 140, y: 250, z: 280 },
    { x: 150, y: 400, z: 500 },
  ],
  [
    { x: 200, y: 260, z: 240 },
    { x: 240, y: 290, z: 300 },
    { x: 190, y: 320, z: 200 },
    { x: 220, y: 150, z: 350 },
  ],
];

export const BubbleChart: Story = {
  args: {
    data: bubbleData,
    seriesNames: ["Group A", "Group B"],
    showBubbles: true,
    showLegend: true,
  },
};

const salesData = [
  [
    { x: 1000, y: 45 },
    { x: 2500, y: 52 },
    { x: 1800, y: 48 },
    { x: 3200, y: 61 },
    { x: 4500, y: 58 },
    { x: 2800, y: 55 },
  ],
];

export const SalesCorrelation: Story = {
  args: {
    data: salesData,
    seriesNames: ["Customers"],
    xAxisLabel: "Spending ($)",
    yAxisLabel: "Satisfaction (%)",
    showLegend: false,
  },
};
