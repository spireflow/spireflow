import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Skeleton } from "../skeleton";

const meta: Meta<typeof Skeleton> = {
  title: "UI Elements/Skeleton",
  component: Skeleton,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
Skeleton loader component for displaying placeholder content while data is loading.
Uses pulse animation to indicate loading state.

**Props:**
- \`className\` - CSS classes for dimensions and shape (e.g. \`h-4 w-full\`, \`rounded-full\`)
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    className: {
      control: "text",
      description: "CSS classes for dimensions and shape (e.g. h-4 w-full, rounded-full)",
    },
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
type Story = StoryObj<typeof Skeleton>;

export const Text: Story = {
  render: () => (
    <div className="space-y-2 w-64">
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-2/3" />
    </div>
  ),
};

export const Avatar: Story = {
  render: () => <Skeleton className="h-12 w-12 rounded-full" />,
};

export const Card: Story = {
  render: () => (
    <div className="space-y-4 w-72">
      <div className="flex items-center space-x-4">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="space-y-2 flex-1">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-4/5" />
        </div>
      </div>
      <Skeleton className="h-32 w-full rounded-lg" />
    </div>
  ),
};

export const Image: Story = {
  render: () => <Skeleton className="h-48 w-72 rounded-lg" />,
};
