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

const printStartupBanner = async () => {
  const status = await checkBackendHealth();
  const port = process.env.PORT || 3000;
  const nodeEnv = process.env.NODE_ENV || "development";

  console.log("");
  console.log(
    "╔══════════════════════════════════════════════════════════════╗"
  );
  console.log(`║   SPIREFLOW v${packageJson.version.padEnd(47)}║ `);

  console.log(
    "║                                                              ║"
  );
  console.log(`║   📊 Environment: ${nodeEnv.padEnd(43)}║`);
  console.log(`║   📦 Node: ${process.version.padEnd(51)}║`);

  // Backend status
  console.log(
    "║                                                              ║"
  );
  if (status.isOnline) {
    console.log(
      "║   🔌 Mode: Connected to backend                              ║"
    );
    console.log(`║      ├─ GraphQL: ${(status.graphqlUrl || "").padEnd(43)}║`);
    if (status.hasAuth) {
      console.log(`║      └─ Auth: ${(status.authUrl || "").padEnd(47)}║`);
    } else {
      console.log(
        "║      ├─ Auth: Not configured                                ║"
      );
      console.log(
        "║      └─ 🔓 Route protection: disabled                        ║"
      );
    }
  } else if (status.graphqlUrl) {
    console.log(
      "║   🔌 Mode: Backend configured but offline                    ║"
    );
    console.log(`║      ├─ GraphQL: ${status.graphqlUrl.padEnd(43)}  ║`);
    console.log(
      "║      ├─ ⚠️  Backend not responding, using mock data           ║"
    );
    console.log(
      "║      └─ 🔓 Route protection: disabled                        ║"
    );
  } else if (status.hasAuth) {
    console.log(
      "║   🔌 Mode: Misconfigured                                     ║"
    );
    console.log(`║      ├─ Auth: ${(status.authUrl || "").padEnd(47)}║`);
    console.log(
      "║      ├─ ⚠️  GRAPHQL_URL required for auth to work             ║"
    );
    console.log(
      "║      └─ 🔓 Route protection: disabled                        ║"
    );
  } else {
    console.log(
      "║   🔌 Mode: Standalone (using mock data)                      ║"
    );
    console.log(
      "║      ├─ ⚠️  Set GRAPHQL_URL to connect to backend             ║"
    );
    console.log(
      "║      └─ 🔓 Route protection: disabled                        ║"
    );
  }

  // Frontend URL
  console.log(
    "║                                                              ║"
  );
  console.log(
    `║   🌐 Dashboard: http://localhost:${String(port).padEnd(27)} ║`
  );

  // Links

  console.log(
    "╚══════════════════════════════════════════════════════════════╝"
  );
  console.log("");
};

export const register = async () => {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    await printStartupBanner();
  }
};
