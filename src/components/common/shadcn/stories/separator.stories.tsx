import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Separator } from "../separator";

const meta: Meta<typeof Separator> = {
  title: "UI Elements/Separator",
  component: Separator,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
Separator component for visually dividing content sections.
Built on Radix UI Separator primitive with proper semantic HTML and ARIA attributes.

**Props:**
- \`className\` - Additional CSS classes to apply
- \`orientation\` - Direction: \`horizontal\`, \`vertical\`
- \`decorative\` - Whether the separator is purely decorative (affects ARIA)
- \`ref\` - Forwarded ref to the separator element
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    orientation: {
      control: "select",
      options: ["horizontal", "vertical"],
      description: "Separator orientation",
    },
  },
  args: {
    orientation: "horizontal",
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
type Story = StoryObj<typeof Separator>;

export const Horizontal: Story = {
  render: (args) => (
    <div className="space-y-3 w-64">
      <p className="text-sm text-primaryText">Content above</p>
      <Separator {...args} />
      <p className="text-sm text-primaryText">Content below</p>
    </div>
  ),
  args: { orientation: "horizontal" },
};

export const Vertical: Story = {
  render: (args) => (
    <div className="flex h-5 items-center space-x-4 text-sm text-primaryText">
      <div>Item 1</div>
      <Separator {...args} />
      <div>Item 2</div>
      <Separator {...args} />
      <div>Item 3</div>
    </div>
  ),
  args: { orientation: "vertical" },
};
