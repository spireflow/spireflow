import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { resolve } from "node:path";

const require = createRequire(import.meta.url);
const packageJson = require("../../package.json");

/**
 * Manually parses .env without dotenv — only sets vars not already
 * present in process.env to avoid overriding system-level config.
 */
const loadEnvFile = () => {
  try {
    const content = readFileSync(resolve(process.cwd(), ".env"), "utf-8");
    for (const line of content.split("\n")) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const eqIndex = trimmed.indexOf("=");
      if (eqIndex === -1) continue;
      const key = trimmed.slice(0, eqIndex);
      const value = trimmed.slice(eqIndex + 1);
      if (!process.env[key]) {
        process.env[key] = value;
      }
    }
  } catch {
    // .env not found, skip
  }
};

/**
 * Pings the backend /health endpoint with a 2s abort timeout
 * to determine connection mode shown in the startup banner.
 */
const checkBackendHealth = async (): Promise<{
  isOnline: boolean;
  graphqlUrl: string | null;
  authUrl: string | null;
  hasAuth: boolean;
}> => {
  const graphqlUrl = process.env.GRAPHQL_URL;
  const authUrl = process.env.NEXT_PUBLIC_AUTH_URL;

  if (!graphqlUrl) {
    return {
      isOnline: false,
      graphqlUrl: null,
      authUrl: authUrl || null,
      hasAuth: Boolean(authUrl),
    };
  }

  const healthUrl = graphqlUrl.replace("/graphql", "/health");

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 2000);

    const response = await fetch(healthUrl, { signal: controller.signal });
    clearTimeout(timeout);

    return {
      isOnline: response.ok,
      graphqlUrl,
      authUrl: authUrl || null,
      hasAuth: Boolean(authUrl),
    };
  } catch {
    return {
      isOnline: false,
      graphqlUrl,
      authUrl: authUrl || null,
      hasAuth: Boolean(authUrl),
    };
  }
};

/**
 * Renders the "Mode" block of the banner — connected, offline,
 * or standalone — based on backend reachability and auth config.
 */
const buildModeSection = (
  status: Awaited<ReturnType<typeof checkBackendHealth>>,
): string => {
  const authConfigured = status.graphqlUrl && status.hasAuth;

  if (status.isOnline && authConfigured) {
    return [
      "🔌 Mode: Connected to backend",
      "   ├─ Backend: online",
      "   └─ Route protection: enabled",
    ].join("\n");
  }

  if (authConfigured) {
    return [
      "🔌 Mode: Backend offline",
      "   ├─ Using mock data",
      "   └─ Route protection: enabled",
    ].join("\n");
  }

  return [
    "🔌 Mode: Standalone",
    "   ├─ Using mock data",
    "   └─ Route protection: disabled",
  ].join("\n");
};

const printStartupBanner = async () => {
  loadEnvFile();

  const status = await checkBackendHealth();
  const nodeEnv = process.env.NODE_ENV || "development";
  const separator = "-----";

  const banner = [
    separator,
    "",
    `SPIREFLOW v${packageJson.version}`,
    "",
    `📊 Environment: ${nodeEnv}`,
    `📦 Node: ${process.version}`,
    "",
    buildModeSection(status),
    "",
    separator,
  ].join("\n");

  console.log(banner);
};

printStartupBanner();
