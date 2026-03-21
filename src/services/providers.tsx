"use client";

import { ApolloProvider } from "@apollo/client/react";
import { ThemeProvider } from "next-themes";

import { TooltipProvider } from "../components/common/shadcn/tooltip";
import { Layout } from "../components/layout/Layout";
import { APP_DEFAULTS } from "../config/appDefaults";
import { client } from "./apolloClient";

export const THEMES_ARRAY = ["light", "dark"];

/**
 * Root provider wrapping ApolloClient, ThemeProvider, and Layout.
 * Must be used in client component context.
 *
 * @component
 * @param {React.ReactNode} props.children - App content
 *
 * @see {@link https://www.apollographql.com/docs/react/api/react/hooks Apollo Client}
 * @see {@link https://github.com/pacocoursey/next-themes next-themes}
 */
export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider
        enableSystem={false}
        attribute="class"
        themes={THEMES_ARRAY}
        defaultTheme={APP_DEFAULTS.defaultTheme}
        disableTransitionOnChange
      >
        <TooltipProvider delayDuration={APP_DEFAULTS.tooltipDelayMs}>
          <Layout>{children}</Layout>
        </TooltipProvider>
      </ThemeProvider>
    </ApolloProvider>
  );
};
