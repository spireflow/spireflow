import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Progress } from "../progress";

const meta: Meta<typeof Progress> = {
  title: "UI Elements/Progress",
  component: Progress,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
Progress bar component for visualizing task completion or loading states.
Built on Radix UI Progress primitive with smooth transitions and customizable colors.

**Props:**
- \`className\` - Additional CSS classes to apply
- \`value\` - Current progress value (0-100)
- \`indicatorColor\` - Custom CSS color for the indicator
- \`ref\` - Forwarded ref to the progress root element
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    value: {
      control: { type: "range", min: 0, max: 100 },
      description: "Progress value (0-100)",
    },
  },
  args: { value: 50 },
  decorators: [
    (Story) => (
      <div className="p-6 bg-primaryBg rounded-lg w-72">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Progress>;

export const Default: Story = {
  args: { value: 50 },
};

export const Empty: Story = {
  args: { value: 0 },
};

export const Complete: Story = {
  args: { value: 100 },
};

export const WithLabel: Story = {
  render: (args) => (
    <div>
      <div className="flex justify-between mb-2 text-sm text-primaryText">
        <span>Progress</span>
        <span>{args.value}%</span>
      </div>
      <Progress {...args} />
    </div>
  ),
  args: { value: 66 },
};
