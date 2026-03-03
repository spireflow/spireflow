import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { DollarSign, Eye, EyeOff, Mail, Search } from "lucide-react";
import React from "react";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
} from "../input-group";

const meta: Meta<typeof InputGroup> = {
  title: "Forms/InputGroup",
  component: InputGroup,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
Container component for inputs with addons like icons, buttons, or text.
Automatically detects addon positions and adjusts input padding accordingly.

**Props:**
- \`className\` - Additional CSS classes to apply
- \`children\` - InputGroupInput and InputGroupAddon components

**Subcomponents:**
- \`InputGroupInput\` - Input element with automatic padding adjustment
- \`InputGroupAddon\` - Container for icons/buttons (supports \`inline-start\`, \`inline-end\`)
- \`InputGroupButton\` - Interactive button within addon
- \`InputGroupText\` - Non-interactive text display
        `,
      },
    },
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="p-6 bg-primaryBg rounded-lg w-80">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof InputGroup>;

export const WithLeftIcon: Story = {
  render: () => (
    <InputGroup>
      <InputGroupAddon align="inline-start">
        <Search className="h-4 w-4" />
      </InputGroupAddon>
      <InputGroupInput placeholder="Search..." />
    </InputGroup>
  ),
};

export const WithRightIcon: Story = {
  render: () => (
    <InputGroup>
      <InputGroupInput type="email" placeholder="Enter email" />
      <InputGroupAddon align="inline-end">
        <Mail className="h-4 w-4" />
      </InputGroupAddon>
    </InputGroup>
  ),
};

export const WithBothIcons: Story = {
  render: () => (
    <InputGroup>
      <InputGroupAddon align="inline-start">
        <Search className="h-4 w-4" />
      </InputGroupAddon>
      <InputGroupInput placeholder="Search products..." />
      <InputGroupAddon align="inline-end">
        <Mail className="h-4 w-4" />
      </InputGroupAddon>
    </InputGroup>
  ),
};

export const WithButton: Story = {
  render: function PasswordInput() {
    const [showPassword, setShowPassword] = React.useState(false);

    return (
      <InputGroup>
        <InputGroupInput
          type={showPassword ? "text" : "password"}
          placeholder="Enter password"
        />
        <InputGroupAddon align="inline-end">
          <InputGroupButton onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    );
  },
};

export const WithText: Story = {
  render: () => (
    <InputGroup>
      <InputGroupAddon align="inline-start">
        <DollarSign className="h-4 w-4" />
      </InputGroupAddon>
      <InputGroupInput type="number" placeholder="0.00" />
      <InputGroupAddon align="inline-end">
        <InputGroupText>USD</InputGroupText>
      </InputGroupAddon>
    </InputGroup>
  ),
};

export const NavbarSearchVariant: Story = {
  render: () => (
    <InputGroup>
      <InputGroupAddon align="inline-start">
        <Search className="h-4 w-4" />
      </InputGroupAddon>
      <InputGroupInput variant="navbarSearch" placeholder="Search..." />
    </InputGroup>
  ),
};
