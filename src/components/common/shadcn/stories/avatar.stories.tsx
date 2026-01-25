import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Avatar, AvatarFallback, AvatarImage } from "../avatar";

const meta: Meta<typeof Avatar> = {
  title: "UI Elements/Avatar",
  component: Avatar,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
Root avatar container component for displaying user profile images.
Built on Radix UI Avatar primitive with automatic fallback handling when images fail to load.

**Props:**
- \`className\` - Additional CSS classes for custom sizing (e.g. \`h-8 w-8\`, \`h-16 w-16\`)
- \`children\` - Avatar content (typically AvatarImage and AvatarFallback)
- \`ref\` - Forwarded ref to the avatar container

**Subcomponents:**
- \`AvatarImage\` - Displays the user's profile picture
- \`AvatarFallback\` - Fallback content when image fails to load (typically initials)
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    className: {
      control: "text",
      description: "Additional CSS classes for sizing (e.g. h-8 w-8, h-16 w-16)",
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
type Story = StoryObj<typeof Avatar>;

export const WithImage: Story = {
  render: (args) => (
    <Avatar {...args}>
      <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  ),
};

export const Fallback: Story = {
  render: (args) => (
    <Avatar {...args}>
      <AvatarFallback>JD</AvatarFallback>
    </Avatar>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex gap-4 items-center">
      <Avatar className="h-8 w-8">
        <AvatarFallback className="text-xs">SM</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback>MD</AvatarFallback>
      </Avatar>
      <Avatar className="h-16 w-16">
        <AvatarFallback>LG</AvatarFallback>
      </Avatar>
    </div>
  ),
};

export const Group: Story = {
  render: () => (
    <div className="flex -space-x-2">
      <Avatar className="border-2 border-primaryBg">
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
      <Avatar className="border-2 border-primaryBg">
        <AvatarFallback>AS</AvatarFallback>
      </Avatar>
      <Avatar className="border-2 border-primaryBg">
        <AvatarFallback>MK</AvatarFallback>
      </Avatar>
      <Avatar className="border-2 border-primaryBg">
        <AvatarFallback className="text-xs">+5</AvatarFallback>
      </Avatar>
    </div>
  ),
};
