import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Label } from "../label";
import { Textarea } from "../textarea";

const meta: Meta<typeof Textarea> = {
  title: "Forms/Textarea",
  component: Textarea,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
Multi-line text input component with consistent theming.
Supports all standard HTML textarea attributes.

**Props:**
- \`className\` - Additional CSS classes to apply
- \`placeholder\` - Placeholder text
- \`rows\` - Number of visible rows
- \`disabled\` - Disabled state
- \`ref\` - Forwarded ref to the textarea element
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    placeholder: {
      control: "text",
      description: "Placeholder text",
    },
    rows: {
      control: "number",
      description: "Number of visible rows",
    },
    disabled: {
      control: "boolean",
      description: "Disabled state",
    },
  },
  args: {
    onChange: () => {},
    placeholder: "Type your message...",
    rows: 4,
  },
  decorators: [
    (Story) => (
      <div className="p-6 bg-primaryBg rounded-lg w-80">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Textarea>;

export const Default: Story = {
  args: { placeholder: "Type your message here." },
};

export const WithLabel: Story = {
  render: (args) => (
    <div className="grid gap-2">
      <Label htmlFor="message">Message</Label>
      <Textarea {...args} id="message" />
    </div>
  ),
};

export const Disabled: Story = {
  args: { disabled: true, placeholder: "Disabled textarea" },
};

export const LargeRows: Story = {
  args: { rows: 8, placeholder: "Large textarea..." },
};
