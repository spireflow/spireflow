import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface RadarChartDemoProps {
  data: Array<Record<string, string | number>>;
  dataKeys: string[];
  nameKey?: string;
  colors?: string[];
  showLegend?: boolean;
  fillOpacity?: number;
  showGrid?: boolean;
}

const defaultData = [
  { skill: "JavaScript", current: 90, target: 95 },
  { skill: "TypeScript", current: 85, target: 90 },
  { skill: "React", current: 88, target: 92 },
  { skill: "Node.js", current: 75, target: 85 },
  { skill: "CSS", current: 80, target: 85 },
  { skill: "Testing", current: 70, target: 80 },
];

const RadarChartDemo = ({
  data = defaultData,
  dataKeys = ["current", "target"],
  nameKey = "skill",
  colors,
  showLegend = true,
  fillOpacity = 0.3,
  showGrid = true,
}: RadarChartDemoProps) => {
  const chartColors = colors ?? [
    "var(--color-chartPrimaryBg)",
    "var(--color-chartSecondaryBg)",
    "rgb(168, 162, 255)",
  ];

  return (
    <div className="w-full h-full text-primaryText">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
          {showGrid && <PolarGrid className="stroke-mainBorder" opacity={0.5} />}
          <PolarAngleAxis
            dataKey={nameKey}
            tick={{ fill: "var(--color-secondaryText)", fontSize: 11 }}
          />
          <PolarRadiusAxis
            angle={90}
            tick={{ fill: "var(--color-secondaryText)", fontSize: 10 }}
            axisLine={false}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "var(--color-tooltipBg)",
              border: "1px solid var(--color-mainBorder)",
              borderRadius: "6px",
              color: "var(--color-primaryText)",
            }}
          />
          {showLegend && (
            <Legend wrapperStyle={{ color: "var(--color-primaryText)" }} />
          )}
          {dataKeys.map((key, index) => (
            <Radar
              key={key}
              name={key}
              dataKey={key}
              stroke={chartColors[index % chartColors.length]}
              fill={chartColors[index % chartColors.length]}
              fillOpacity={fillOpacity}
            />
          ))}
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

const meta: Meta<typeof RadarChartDemo> = {
  title: "Charts/RadarChart",
  component: RadarChartDemo,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
A radar (spider) chart for comparing multiple variables.

**Features:**
- Multiple data series overlay
- Configurable fill opacity
- Great for skill assessments, comparisons
- Theme-aware colors

**Usage:**
\`\`\`tsx
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer } from "recharts";

<ResponsiveContainer width="100%" height={300}>
  <RadarChart data={data}>
    <PolarGrid />
    <PolarAngleAxis dataKey="skill" />
    <Radar
      dataKey="value"
      stroke="var(--color-chartPrimaryBg)"
      fill="var(--color-chartPrimaryBg)"
      fillOpacity={0.3}
    />
  </RadarChart>
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
      description: "Array of data keys to plot",
    },
    nameKey: {
      control: "text",
      description: "Data key for axis labels",
    },
    colors: {
      control: "object",
      description: "Custom colors for each radar",
    },
    showLegend: {
      control: "boolean",
      description: "Show legend",
    },
    fillOpacity: {
      control: { type: "range", min: 0, max: 1, step: 0.1 },
      description: "Fill opacity of radar areas",
    },
    showGrid: {
      control: "boolean",
      description: "Show polar grid",
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
type Story = StoryObj<typeof RadarChartDemo>;

export const Default: Story = {
  args: {
    data: defaultData,
    dataKeys: ["current", "target"],
    nameKey: "skill",
    showLegend: true,
    fillOpacity: 0.3,
    showGrid: true,
  },
};

export const SingleRadar: Story = {
  args: {
    ...Default.args,
    dataKeys: ["current"],
    showLegend: false,
    fillOpacity: 0.5,
  },
};

export const HighOpacity: Story = {
  args: {
    ...Default.args,
    fillOpacity: 0.6,
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
    colors: ["#8b5cf6", "#ec4899"],
  },
};

const productData = [
  { attribute: "Price", productA: 80, productB: 65 },
  { attribute: "Quality", productA: 90, productB: 85 },
  { attribute: "Features", productA: 75, productB: 90 },
  { attribute: "Support", productA: 85, productB: 70 },
  { attribute: "Design", productA: 88, productB: 82 },
];

export const ProductComparison: Story = {
  args: {
    data: productData,
    dataKeys: ["productA", "productB"],
    nameKey: "attribute",
    showLegend: true,
    fillOpacity: 0.4,
  },
};

const performanceData = [
  { metric: "Speed", score: 92 },
  { metric: "Reliability", score: 88 },
  { metric: "Scalability", score: 75 },
  { metric: "Security", score: 95 },
  { metric: "Usability", score: 82 },
  { metric: "Cost", score: 68 },
];

export const PerformanceMetrics: Story = {
  args: {
    data: performanceData,
    dataKeys: ["score"],
    nameKey: "metric",
    showLegend: false,
    fillOpacity: 0.5,
  },
};
