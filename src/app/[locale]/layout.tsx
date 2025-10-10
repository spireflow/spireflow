import "dotenv/config";
import { Metadata } from "next";
import { setRequestLocale, getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";

import "../../styles/globals.css";
import { outfit } from "../../styles/fonts";
import { Providers } from "../../services/providers";
import { Locale, locales } from "../../i18n/navigation";

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning={true}>
      <body className={`${outfit.className}`} suppressHydrationWarning={true}>
        <NextIntlClientProvider locale={locale} messages={messages}>
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

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}
