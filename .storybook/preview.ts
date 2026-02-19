import type { Preview } from "@storybook/nextjs-vite";
import { createElement } from "react";

import "./fonts.css";
import "../src/styles/globals.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: "light",
      values: [
        { name: "light", value: "white" },
        { name: "dark", value: "rgb(31, 34, 38)" },
      ],
    },
    options: {
      storySort: {
        order: ["Introduction", "Theme", "UI Elements", "Forms", "Charts", "*"],
      },
    },
  },
  decorators: [
    (Story, context) => {
      const theme = context.globals.theme || "light";
      document.documentElement.classList.remove("dark", "light");
      document.documentElement.classList.add("light");
      return createElement("div", { className: theme }, createElement(Story));
    },
  ],
  globalTypes: {
    theme: {
      description: "Theme",
      defaultValue: "light",
      toolbar: {
        title: "Theme",
        icon: "paintbrush",
        items: [
          { value: "light", title: "Light" },
          { value: "dark", title: "Dark" },
        ],
        dynamicTitle: true,
      },
    },
  },
};

export default preview;
