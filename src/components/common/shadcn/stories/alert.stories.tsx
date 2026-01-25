import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Info, AlertCircle, CheckCircle } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "../alert";

const meta: Meta<typeof Alert> = {
  title: "UI Elements/Alert",
  component: Alert,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
Alert notification container for displaying important messages and notifications.
Supports optional icons and multiple visual variants for different message types.

**Props:**
- \`className\` - Additional CSS classes to apply
- \`variant\` - Visual style variant: \`default\`, \`destructive\`
- \`children\` - Alert content including title and description

**Subcomponents:**
- \`AlertTitle\` - Title heading for the alert notification
- \`AlertDescription\` - Description text content for the alert
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "destructive"],
      description: "Visual style variant",
    },
  },
  args: {
    variant: "default",
  },
  decorators: [
    (Story) => (
      <div className="p-6 bg-primaryBg rounded-lg w-96">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Alert>;

export const Default: Story = {
  render: (args) => (
    <Alert {...args}>
      <Info className="h-4 w-4" />
      <AlertTitle>Information</AlertTitle>
      <AlertDescription>This is an informational alert.</AlertDescription>
    </Alert>
  ),
  args: { variant: "default" },
};

export const Destructive: Story = {
  render: (args) => (
    <Alert {...args}>
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>Something went wrong.</AlertDescription>
    </Alert>
  ),
  args: { variant: "destructive" },
};

export const Success: Story = {
  render: (args) => (
    <Alert {...args}>
      <CheckCircle className="h-4 w-4 text-green-500" />
      <AlertTitle>Success</AlertTitle>
      <AlertDescription>Your changes have been saved.</AlertDescription>
    </Alert>
  ),
  args: { variant: "default" },
};
