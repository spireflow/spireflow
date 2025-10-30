/** @type {import('next').NextConfig} */
// eslint-disable-next-line
const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin("./src/i18n/i18n.ts");

const nextConfig = {
    reactStrictMode: false,
    transpilePackages: ["@react-pdf/renderer"],
    typescript: {
        ignoreBuildErrors: true,
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
                pathname: '**',
            },
        ],
    },
    async headers() {
        return [
            {
                source: '/:path*',
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
        key: 'Content-Security-Policy',
        value: "default-src 'self'; worker-src blob: 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.jsdelivr.net; style-src 'self' 'unsafe-inline'; img-src 'self' data: https://res.cloudinary.com; font-src 'self' data:; connect-src 'self' http://localhost:4000 https://* data:; frame-ancestors 'none'; frame-src 'none'"
    },
    {
        // X-Frame-Options prevents our application from being embedded within iframes
        // on other domains, protecting users from clickjacking attacks where malicious
        // sites could trick users into clicking hidden elements overlaid on legitimate content
        key: 'X-Frame-Options',
        value: 'DENY'
    },
    {
        // X-Content-Type-Options prevents browsers from interpreting files as a different
        // MIME type than what is specified in the Content-Type header, blocking attacks
        // that rely on MIME type confusion, such as serving executable content disguised as images
        key: 'X-Content-Type-Options',
        value: 'nosniff'
    },   
    {
        // Permissions-Policy restricts which browser features and APIs the application
        // can use, reducing the attack surface by explicitly disabling unnecessary
        // access to sensitive capabilities like camera, microphone, and geolocation
        key: 'Permissions-Policy',
        value: 'camera=(), microphone=(), geolocation=()'
    },
    {
        // Strict-Transport-Security ensures the browser always uses HTTPS to connect
        // to our application, preventing downgrade attacks, SSL stripping, and
        // protecting authentication cookies from being sent over insecure connections
        key: 'Strict-Transport-Security',
        value: 'max-age=63072000; includeSubDomains; preload'
    },
    {
        // X-XSS-Protection activates browser built-in XSS filtering capabilities,
        // providing an additional layer of protection against cross-site scripting
        // attacks in older browsers that might not fully support Content-Security-Policy
        key: 'X-XSS-Protection',
        value: '1; mode=block'
    }
];

module.exports = withNextIntl(nextConfig);