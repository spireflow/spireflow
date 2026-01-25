import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "../tabs";

const meta: Meta<typeof Tabs> = {
  title: "UI Elements/Tabs",
  component: Tabs,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
Root tabs component that manages tab state and navigation.
Uses Radix UI for accessibility and keyboard navigation.

**Props:**
- \`defaultValue\` - Default active tab value
- \`className\` - Additional CSS classes to apply

**Subcomponents:**
- \`TabsList\` - Container for tab triggers (supports \`default\` and \`line\` variants)
- \`TabsTrigger\` - Individual tab button that activates its content panel
- \`TabsContent\` - Content panel displayed when tab is active
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    defaultValue: {
      control: "text",
      description: "Default active tab value",
    },
    className: {
      control: "text",
      description: "Additional CSS classes",
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
type Story = StoryObj<typeof Tabs>;

export const Default: Story = {
  render: () => (
    <Tabs defaultValue="account" className="w-80">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account" className="mt-4">
        <p className="text-sm text-primaryText">
          Manage your account settings here.
        </p>
      </TabsContent>
      <TabsContent value="password" className="mt-4">
        <p className="text-sm text-primaryText">
          Change your password here.
        </p>
      </TabsContent>
    </Tabs>
  ),
};

export const ThreeTabs: Story = {
  render: () => (
    <Tabs defaultValue="tab1" className="w-96">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="tab1">Overview</TabsTrigger>
        <TabsTrigger value="tab2">Analytics</TabsTrigger>
        <TabsTrigger value="tab3">Reports</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1" className="mt-4">
        <p className="text-sm text-primaryText">Overview content</p>
      </TabsContent>
      <TabsContent value="tab2" className="mt-4">
        <p className="text-sm text-primaryText">Analytics content</p>
      </TabsContent>
      <TabsContent value="tab3" className="mt-4">
        <p className="text-sm text-primaryText">Reports content</p>
      </TabsContent>
    </Tabs>
  ),
};
