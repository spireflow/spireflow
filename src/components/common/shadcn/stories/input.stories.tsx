import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Input } from "../input";
import { Label } from "../label";

const meta: Meta<typeof Input> = {
  title: "Forms/Input",
  component: Input,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
Styled text input component with consistent theming.
Supports all standard HTML input types and attributes.

**Props:**
- \`className\` - Additional CSS classes to apply
- \`type\` - HTML input type: \`text\`, \`email\`, \`password\`, \`number\`, etc.
- \`placeholder\` - Placeholder text
- \`disabled\` - Disabled state
- \`ref\` - Forwarded ref to the input element
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: "select",
      options: ["text", "email", "password", "number", "search", "tel", "url"],
      description: "Input type",
    },
    placeholder: {
      control: "text",
      description: "Placeholder text",
    },
    disabled: {
      control: "boolean",
      description: "Disabled state",
    },
  },
  args: {
    onChange: () => {},
    placeholder: "Enter text...",
  },
  decorators: [
    (Story) => (
      <div className="p-6 bg-primaryBg rounded-lg w-72">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: { type: "text", placeholder: "Default input" },
};

export const Email: Story = {
  args: { type: "email", placeholder: "email@example.com" },
};

export const Password: Story = {
  args: { type: "password", placeholder: "Enter password" },
};

export const Disabled: Story = {
  args: { disabled: true, placeholder: "Disabled input" },
};

export const WithLabel: Story = {
  render: (args) => (
    <div className="grid gap-2">
      <Label htmlFor="email">Email</Label>
      <Input {...args} id="email" />
    </div>
  ),
  args: { type: "email", placeholder: "email@example.com" },
};

export const Error: Story = {
  args: {
    className: "border-red-500 focus-visible:outline-red-500",
    placeholder: "Error state",
  },
};
