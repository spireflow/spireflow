import packageJson from "../package.json";

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

const getNodeVersion = () => {
  const g = globalThis as unknown as Record<string, Record<string, string>>;
  return g.process?.version ?? "unknown";
};

const buildModeSection = (status: Awaited<ReturnType<typeof checkBackendHealth>>): string => {
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
  const status = await checkBackendHealth();
  const port = process.env.PORT || 3000;
  const nodeEnv = process.env.NODE_ENV || "development";
  const separator = "-----";

  const banner = [
    "",
    separator,
    "",
    `SPIREFLOW v${packageJson.version}`,
    "",
    `📊 Environment: ${nodeEnv}`,
    `📦 Node: ${getNodeVersion()}`,
    "",
    buildModeSection(status),
    "",
    `🌐 Dashboard: http://localhost:${port}`,
    "",
    separator,
    "",
  ].join("\n");

  console.log(banner);
};

export const register = async () => {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    const { acquireBannerLock } = await import("./instrumentation-node");
    if (acquireBannerLock()) {
      await printStartupBanner();
    }
  }
};
