import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Badge } from "../badge";

const meta: Meta<typeof Badge> = {
  title: "UI Elements/Badge",
  component: Badge,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
Small badge component for labels, status indicators, and counts.
Displays inline with rounded pill shape in multiple color variants.

**Props:**
- \`className\` - Additional CSS classes to apply
- \`variant\` - Style variant: \`default\`, \`secondary\`, \`destructive\`, \`outline\`
- \`children\` - Badge content
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "secondary", "destructive", "outline"],
      description: "Visual style variant",
    },
    children: {
      control: "text",
      description: "Badge content",
    },
  },
  args: { children: "Badge" },
  decorators: [
    (Story) => (
      <div className="p-6 bg-primaryBg rounded-lg">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  args: { variant: "default", children: "Default" },
};

export const Secondary: Story = {
  args: { variant: "secondary", children: "Secondary" },
};

export const Destructive: Story = {
  args: { variant: "destructive", children: "Destructive" },
};

export const Outline: Story = {
  args: { variant: "outline", children: "Outline" },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <Badge variant="default">Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge variant="outline">Outline</Badge>
    </div>
  ),
};
