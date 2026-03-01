import "dotenv/config";
import { Metadata, Viewport } from "next";
import { setRequestLocale } from "next-intl/server";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";

import "../../styles/globals.css";
import { outfit, openSans } from "../../styles/fonts";
import { Providers } from "../../services/providers";
import { routing } from "../../i18n/routing";

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
      suppressHydrationWarning={true}
    >
      <body
        className={`${outfit.variable} ${openSans.variable}`}
        suppressHydrationWarning={true}
      >
        <NextIntlClientProvider>
          <Providers>{children}</Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

export const metadata: Metadata = {
  title: "Spireflow",
  description:
    "Open source and free dashboard template, written in NextJS and Tailwind",
};

export const viewport: Viewport = {
  viewportFit: "cover",
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}
