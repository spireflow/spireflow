import "dotenv/config";
import "../../styles/globals.css";

import { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";

import { routing } from "../../i18n/routing";
import { Providers } from "../../services/providers";
import { openSans, outfit } from "../../styles/fonts";

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <html
      lang={locale}
      data-scroll-behavior="smooth"
      /**
       * Required by next-themes - theme attributes are injected before
       * hydration to prevent flash.
       * @see https://github.com/pacocoursey/next-themes?tab=readme-ov-file#with-app
       */
      suppressHydrationWarning={true}
    >
      <body className={`${outfit.variable} ${openSans.variable}`}>
        <NextIntlClientProvider>
          <Providers>{children}</Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

export const metadata: Metadata = {
  metadataBase: new URL("https://spireflow.app"),
  title: {
    default: "Spireflow",
    template: "%s | Spireflow",
  },
  description:
    "Open source dashboard starter with auth, i18n, dark/light mode, 26 charts and 80+ reusable UI components",
  keywords: [
    "nextjs dashboard",
    "react dashboard",
    "admin template",
    "shadcn dashboard",
    "open source dashboard",
    "nextjs 15",
    "typescript dashboard",
    "tailwind dashboard",
    "recharts",
    "better auth",
    "dashboard starter",
  ],
  authors: [{ name: "matt765", url: "https://github.com/matt765" }],
  creator: "matt765",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://spireflow.app",
    siteName: "Spireflow",
    title: "Spireflow | Open Source Next.js Dashboard Starter",
    description:
      "Open source dashboard starter with auth, i18n, dark/light mode, 26 charts and 80+ reusable UI components",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Spireflow Dashboard Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Spireflow | Open Source Next.js Dashboard Starter",
    description:
      "Open source dashboard starter with auth, i18n, dark/light mode, 26 charts and 80+ reusable UI components",
    images: ["/og-image.png"],
  },
};

export const viewport: Viewport = {
  viewportFit: "cover",
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}
