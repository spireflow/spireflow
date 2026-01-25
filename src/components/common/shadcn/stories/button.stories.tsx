import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Plus, Loader2 } from "lucide-react";

import { Button } from "../button";

const meta: Meta<typeof Button> = {
  title: "UI Elements/Button",
  component: Button,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
Versatile button component with multiple style variants and sizes.
Supports composition pattern via asChild prop for custom elements.

**Props:**
- \`className\` - Additional CSS classes to apply
- \`variant\` - Style variant: \`default\`, \`destructive\`, \`outline\`, \`secondary\`, \`ghost\`, \`link\`
- \`size\` - Size variant: \`default\`, \`sm\`, \`lg\`, \`icon\`
- \`asChild\` - Render as Radix Slot for composition
- \`ref\` - Forwarded ref to the button element
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "destructive", "outline", "secondary", "ghost", "link"],
      description: "Visual style variant",
    },
    size: {
      control: "select",
      options: ["default", "sm", "lg", "icon"],
      description: "Size variant",
    },
    disabled: {
      control: "boolean",
      description: "Disabled state",
    },
    children: {
      control: "text",
      description: "Button content",
    },
  },
  args: {
    onClick: () => {},
    children: "Button",
  },
  decorators: [
    (Story) => (
      <div className="p-6 bg-primaryBg rounded-lg">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: { variant: "default", children: "Default" },
};

export const Destructive: Story = {
  args: { variant: "destructive", children: "Delete" },
};

export const Outline: Story = {
  args: { variant: "outline", children: "Outline" },
};

export const Secondary: Story = {
  args: { variant: "secondary", children: "Secondary" },
};

export const Ghost: Story = {
  args: { variant: "ghost", children: "Ghost" },
};

export const Link: Story = {
  args: { variant: "link", children: "Link" },
};

export const Small: Story = {
  args: { size: "sm", children: "Small" },
};

export const Large: Story = {
  args: { size: "lg", children: "Large" },
};

export const Icon: Story = {
  args: { size: "icon", children: <Plus className="h-4 w-4" /> },
};

export const Loading: Story = {
  args: {
    disabled: true,
    children: (
      <>
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        Loading
      </>
    ),
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <Button variant="default">Default</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
    </div>
  ),
};
