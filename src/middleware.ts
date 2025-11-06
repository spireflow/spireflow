import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { getSessionCookie } from "better-auth/cookies";

import { locales, localePrefix, defaultLocale } from "./i18n/navigation";

const handleI18nRouting = createMiddleware({
  locales,
  defaultLocale,
  localePrefix,
  localeDetection: false,
});

// Public routes that don't require authentication
const publicPaths = ["/login", "/register"];

const isPublicPath = (pathname: string): boolean => {
  // Remove locale prefix if present (e.g., /en/login -> /login)
  const pathWithoutLocale = pathname.replace(/^\/[a-z]{2}(\/|$)/, "/");
  return publicPaths.some((path) => pathWithoutLocale.startsWith(path));
};

const middleware = (request: NextRequest) => {
  // Check if Better Auth environment variables are present
  const hasBetterAuthEnvs =
    process.env.NEXT_PUBLIC_AUTH_URL && process.env.BETTER_AUTH_SECRET;

  // If Better Auth envs are missing, skip auth checks and just handle i18n
  if (!hasBetterAuthEnvs) {
    return handleI18nRouting(request);
  }

  // 🔐 Route protection enabled
  const sessionCookie = getSessionCookie(request);
  const pathname = request.nextUrl.pathname;

  // Redirect to login if not authenticated and trying to access protected route
  if (!sessionCookie && !isPublicPath(pathname)) {
    const locale = pathname.match(/^\/([a-z]{2})\//)?.at(1) || "";
    const loginUrl = new URL(`/${locale ? locale + "/" : ""}login`, request.url);
    return NextResponse.redirect(loginUrl);
  }

  return handleI18nRouting(request);
};

export default middleware;

export const config = {
  matcher: "/((?!_next|_vercel|api|trpc|.*\\..*).*)",
};
