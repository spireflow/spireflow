import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Checkbox } from "../checkbox";
import { Label } from "../label";

const meta: Meta<typeof Checkbox> = {
  title: "Forms/Checkbox",
  component: Checkbox,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
Checkbox component for boolean selection states.
Built on Radix UI Checkbox primitive with accessibility and keyboard support.

**Props:**
- \`className\` - Additional CSS classes to apply
- \`checked\` - Controlled checked state
- \`onCheckedChange\` - Callback when checked state changes
- \`disabled\` - Disabled state
- \`ref\` - Forwarded ref to the checkbox element
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    checked: {
      control: "boolean",
      description: "Checked state",
    },
    disabled: {
      control: "boolean",
      description: "Disabled state",
    },
  },
  args: { onCheckedChange: () => {} },
  decorators: [
    (Story) => (
      <div className="p-6 bg-primaryBg rounded-lg">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  render: (args) => (
    <div className="flex items-center space-x-2">
      <Checkbox {...args} id="default" />
      <Label htmlFor="default">Accept terms</Label>
    </div>
  ),
};

export const Checked: Story = {
  render: (args) => (
    <div className="flex items-center space-x-2">
      <Checkbox {...args} id="checked" defaultChecked />
      <Label htmlFor="checked">Checked</Label>
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className="flex items-center space-x-2">
      <Checkbox id="disabled" disabled />
      <Label htmlFor="disabled">Disabled</Label>
    </div>
  ),
};

export const AllStates: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center space-x-2">
        <Checkbox id="s1" />
        <Label htmlFor="s1">Default</Label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox id="s2" defaultChecked />
        <Label htmlFor="s2">Checked</Label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox id="s3" disabled />
        <Label htmlFor="s3">Disabled</Label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox id="s4" disabled defaultChecked />
        <Label htmlFor="s4">Disabled checked</Label>
      </div>
    </div>
  ),
};
