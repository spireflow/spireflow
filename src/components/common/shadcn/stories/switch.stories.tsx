import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Label } from "../label";
import { Switch } from "../switch";

const meta: Meta<typeof Switch> = {
  title: "Forms/Switch",
  component: Switch,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
Toggle switch component for binary on/off states.
Built on Radix UI Switch primitive with smooth transitions and accessibility support.

**Props:**
- \`className\` - Additional CSS classes to apply
- \`checked\` - Controlled checked state
- \`onCheckedChange\` - Callback when checked state changes
- \`disabled\` - Disabled state
- \`ref\` - Forwarded ref to the switch element
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
type Story = StoryObj<typeof Switch>;

export const Default: Story = {
  render: (args) => (
    <div className="flex items-center space-x-2">
      <Switch {...args} id="default" />
      <Label htmlFor="default">Airplane mode</Label>
    </div>
  ),
};

export const Checked: Story = {
  render: (args) => (
    <div className="flex items-center space-x-2">
      <Switch {...args} id="checked" defaultChecked />
      <Label htmlFor="checked">Enabled</Label>
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className="flex items-center space-x-2">
      <Switch id="disabled" disabled />
      <Label htmlFor="disabled">Disabled</Label>
    </div>
  ),
};

export const AllStates: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center space-x-2">
        <Switch id="s1" />
        <Label htmlFor="s1">Default</Label>
      </div>
      <div className="flex items-center space-x-2">
        <Switch id="s2" defaultChecked />
        <Label htmlFor="s2">Checked</Label>
      </div>
      <div className="flex items-center space-x-2">
        <Switch id="s3" disabled />
        <Label htmlFor="s3">Disabled</Label>
      </div>
      <div className="flex items-center space-x-2">
        <Switch id="s4" disabled defaultChecked />
        <Label htmlFor="s4">Disabled checked</Label>
      </div>
    </div>
  ),
};
