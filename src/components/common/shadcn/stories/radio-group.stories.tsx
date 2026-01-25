import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { RadioGroup, RadioGroupItem } from "../radio-group";
import { Label } from "../label";

const meta: Meta<typeof RadioGroup> = {
  title: "Forms/RadioGroup",
  component: RadioGroup,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
Container for a group of radio button options.
Built on Radix UI RadioGroup primitive with accessibility and keyboard navigation.

**Props:**
- \`className\` - Additional CSS classes to apply
- \`value\` - Controlled selected value
- \`defaultValue\` - Default selected value
- \`onValueChange\` - Callback when selection changes
- \`disabled\` - Disabled state

**Subcomponents:**
- \`RadioGroupItem\` - Individual radio button item
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    defaultValue: {
      control: "text",
      description: "Default selected value",
    },
    disabled: {
      control: "boolean",
      description: "Disabled state",
    },
  },
  args: { onValueChange: () => {} },
  decorators: [
    (Story) => (
      <div className="p-6 bg-primaryBg rounded-lg">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof RadioGroup>;

export const Default: Story = {
  render: (args) => (
    <RadioGroup {...args} defaultValue="option-1">
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-1" id="r1" />
        <Label htmlFor="r1">Option 1</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-2" id="r2" />
        <Label htmlFor="r2">Option 2</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-3" id="r3" />
        <Label htmlFor="r3">Option 3</Label>
      </div>
    </RadioGroup>
  ),
};

export const WithDisabled: Story = {
  render: (args) => (
    <RadioGroup {...args} defaultValue="option-1">
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-1" id="d1" />
        <Label htmlFor="d1">Default</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-2" id="d2" />
        <Label htmlFor="d2">Selected</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-3" id="d3" disabled />
        <Label htmlFor="d3">Disabled</Label>
      </div>
    </RadioGroup>
  ),
};
