import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Label } from "../label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../select";

const meta: Meta<typeof Select> = {
  title: "Forms/Select",
  component: Select,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
Select dropdown component for choosing from a list of options.
Built on Radix UI Select primitive with keyboard navigation.

**Props:**
- \`value\` - Controlled selected value
- \`defaultValue\` - Default selected value
- \`onValueChange\` - Callback when selection changes
- \`disabled\` - Disabled state

**Subcomponents:**
- \`SelectTrigger\` - Button that opens the dropdown
- \`SelectValue\` - Displays the selected value
- \`SelectContent\` - Dropdown content container
- \`SelectItem\` - Individual selectable option
- \`SelectGroup\` - Groups related options
- \`SelectLabel\` - Label for option groups
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    disabled: {
      control: "boolean",
      description: "Disabled state",
    },
  },
  args: { onValueChange: () => {} },
  decorators: [
    (Story) => (
      <div className="p-6 bg-primaryBg rounded-lg w-64">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Select>;

export const Default: Story = {
  render: (args) => (
    <Select {...args}>
      <SelectTrigger>
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Fruits</SelectLabel>
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
          <SelectItem value="orange">Orange</SelectItem>
          <SelectItem value="grape">Grape</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  ),
};

export const WithLabel: Story = {
  render: (args) => (
    <div className="grid gap-2">
      <Label>Fruit</Label>
      <Select {...args}>
        <SelectTrigger>
          <SelectValue placeholder="Select..." />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
          <SelectItem value="orange">Orange</SelectItem>
        </SelectContent>
      </Select>
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <Select disabled>
      <SelectTrigger>
        <SelectValue placeholder="Disabled" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="apple">Apple</SelectItem>
      </SelectContent>
    </Select>
  ),
};
