import { redirect } from "next/navigation";

import { getSession } from "../../../lib/auth-server";

/**
 * Protected Layout
 * All pages under (protected) folder require authentication
 * This layout checks session once and applies to all child pages
 */
export default async function ProtectedLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Check authentication - this runs once for all protected pages
  const session = await getSession();

  // Redirect to login if not authenticated
  if (!session) {
    redirect(`/${locale}/login`);
  }

  // User is authenticated - render children
  return <>{children}</>;
}
