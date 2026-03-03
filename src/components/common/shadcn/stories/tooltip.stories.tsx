import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { HelpCircle } from "lucide-react";

import { Button } from "../button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../tooltip";

const meta: Meta<typeof Tooltip> = {
  title: "UI Elements/Tooltip",
  component: Tooltip,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
Tooltip component for displaying contextual information on hover or focus.
Built on Radix UI Tooltip primitive with smooth animations.

**Props:**
- \`delayDuration\` - Delay before showing tooltip (ms)

**Subcomponents:**
- \`TooltipProvider\` - Required wrapper that enables tooltips
- \`TooltipTrigger\` - Element that shows tooltip on hover/focus
- \`TooltipContent\` - Content container with styling and animations
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    delayDuration: {
      control: "number",
      description: "Delay before showing tooltip (ms)",
    },
  },
  decorators: [
    (Story) => (
      <div className="p-12 bg-primaryBg rounded-lg">
        <TooltipProvider delayDuration={100}>
          <Story />
        </TooltipProvider>
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline">Hover me</Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>Tooltip content</p>
      </TooltipContent>
    </Tooltip>
  ),
};

export const WithIcon: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline" size="icon">
          <HelpCircle className="h-4 w-4" />
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>Help information</p>
      </TooltipContent>
    </Tooltip>
  ),
};

export const Positions: Story = {
  render: () => (
    <div className="flex gap-4">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline" size="sm">
            Top
          </Button>
        </TooltipTrigger>
        <TooltipContent side="top">Top tooltip</TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline" size="sm">
            Right
          </Button>
        </TooltipTrigger>
        <TooltipContent side="right">Right tooltip</TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline" size="sm">
            Bottom
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">Bottom tooltip</TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline" size="sm">
            Left
          </Button>
        </TooltipTrigger>
        <TooltipContent side="left">Left tooltip</TooltipContent>
      </Tooltip>
    </div>
  ),
};
