import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Slider } from "../slider";
import { Label } from "../label";

const meta: Meta<typeof Slider> = {
  title: "Forms/Slider",
  component: Slider,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
Range slider component for selecting numeric values.
Built on Radix UI Slider primitive with support for single or multiple thumbs.

**Props:**
- \`className\` - Additional CSS classes to apply
- \`defaultValue\` - Initial value(s) as array
- \`min\` - Minimum value
- \`max\` - Maximum value
- \`step\` - Step increment
- \`onValueChange\` - Callback when value changes
- \`disabled\` - Disabled state
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    defaultValue: {
      control: "object",
      description: "Default value(s)",
    },
    max: {
      control: "number",
      description: "Maximum value",
    },
    min: {
      control: "number",
      description: "Minimum value",
    },
    step: {
      control: "number",
      description: "Step increment",
    },
    disabled: {
      control: "boolean",
      description: "Disabled state",
    },
  },
  args: { onValueChange: () => {}, max: 100, step: 1 },
  decorators: [
    (Story) => (
      <div className="p-6 bg-primaryBg rounded-lg w-72">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Slider>;

export const Default: Story = {
  args: { defaultValue: [50] },
};

export const Range: Story = {
  args: { defaultValue: [25, 75] },
};

export const WithLabel: Story = {
  render: (args) => (
    <div className="grid gap-3">
      <Label>Volume</Label>
      <Slider {...args} />
    </div>
  ),
  args: { defaultValue: [50] },
};

export const Disabled: Story = {
  args: { defaultValue: [50], disabled: true },
};
