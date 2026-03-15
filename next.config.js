/** @type {import('next').NextConfig} */
// eslint-disable-next-line
const createNextIntlPlugin = require("next-intl/plugin");

const withNextIntl = createNextIntlPlugin("./src/i18n/i18n.ts");

const isDev = process.env.NODE_ENV === "development";

const originOf = (envVar) => {
  const val = process.env[envVar];
  return val ? new URL(val).origin : null;
};

const connectSrcDomains = [
  ...new Set(
    [
      "'self'",
      "https://raw.githubusercontent.com",
      originOf("GRAPHQL_URL"),
      originOf("NEXT_PUBLIC_AUTH_URL"),
      isDev && "http://localhost:4000",
    ].filter(Boolean),
  ),
].join(" ");

const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@react-pdf/renderer"],
  typescript: {
    ignoreBuildErrors: false,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        pathname: "**",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

const securityHeaders = [
  {
    // Content-Security-Policy defines where resources can be loaded from,
    // limiting potential vectors for cross-site scripting (XSS) attacks
    // by explicitly whitelisting trusted sources for various content types
    key: "Content-Security-Policy",
    value: `default-src 'self'; worker-src blob: 'self'; script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}; style-src 'self' 'unsafe-inline'; img-src 'self' data: https://res.cloudinary.com https://avatars.githubusercontent.com; font-src 'self' data:; connect-src ${connectSrcDomains}; frame-ancestors 'none'; frame-src 'none'`,
  },
  {
    // X-Frame-Options prevents our application from being embedded within iframes
    // on other domains, protecting users from clickjacking attacks where malicious
    // sites could trick users into clicking hidden elements overlaid on legitimate content
    key: "X-Frame-Options",
    value: "DENY",
  },
  {
    // X-Content-Type-Options prevents browsers from interpreting files as a different
    // MIME type than what is specified in the Content-Type header, blocking attacks
    // that rely on MIME type confusion, such as serving executable content disguised as images
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    // Permissions-Policy restricts which browser features and APIs the application
    // can use, reducing the attack surface by explicitly disabling unnecessary
    // access to sensitive capabilities like camera, microphone, and geolocation
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
  {
    // Strict-Transport-Security ensures the browser always uses HTTPS to connect
    // to our application, preventing downgrade attacks, SSL stripping, and
    // protecting authentication cookies from being sent over insecure connections
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    // X-XSS-Protection is set to 0 as recommended by OWASP since 2023.
    // The browser XSS auditor was removed from Chrome (v78), never shipped
    // in Firefox/Edge, and the "1; mode=block" value could itself introduce
    // vulnerabilities via selective content injection in legacy browsers
    key: "X-XSS-Protection",
    value: "0",
  },
  {
    // Referrer-Policy controls how much referrer information is sent with requests.
    // "strict-origin-when-cross-origin" sends full URL for same-origin, only origin
    // for cross-origin, and nothing for downgrade (HTTPS->HTTP)
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
];

module.exports = withNextIntl(nextConfig);
