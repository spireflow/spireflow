import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Popover, PopoverContent, PopoverTrigger } from "../popover";
import { Button } from "../button";
import { Input } from "../input";
import { Label } from "../label";

const meta: Meta<typeof Popover> = {
  title: "UI Elements/Popover",
  component: Popover,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
Popover component for displaying floating content triggered by user interaction.
Built on Radix UI Popover primitive with smooth animations.

**Props:**
- \`open\` - Controlled open state
- \`onOpenChange\` - Callback when open state changes
- \`modal\` - Whether popover is modal

**Subcomponents:**
- \`PopoverTrigger\` - Element that opens the popover when clicked
- \`PopoverContent\` - Content container with positioning and animations
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    open: {
      control: "boolean",
      description: "Controlled open state",
    },
    modal: {
      control: "boolean",
      description: "Whether popover is modal",
    },
  },
  decorators: [
    (Story) => (
      <div className="p-12 bg-primaryBg rounded-lg">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Popover>;

export const Default: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Open Popover</Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium text-primaryText">Dimensions</h4>
            <p className="text-sm text-secondaryText">
              Set the dimensions for the layer.
            </p>
          </div>
          <div className="grid gap-2">
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="width">Width</Label>
              <Input id="width" defaultValue="100%" className="col-span-2" />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="height">Height</Label>
              <Input id="height" defaultValue="25px" className="col-span-2" />
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  ),
};
