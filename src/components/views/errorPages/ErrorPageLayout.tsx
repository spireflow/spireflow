"use client";

import { useTranslations } from "next-intl";

import { Button } from "@/components/common/shadcn/button";
import { ThemeButtonAuth } from "@/components/layout/ThemeButtonAuth";
import { Link } from "@/i18n/navigation";

interface ErrorPageLayoutProps {
  code: string;
  titleKey: string;
  descriptionKey: string;
  icon: React.ReactNode;
}

export const ErrorPageLayout = ({
  code,
  titleKey,
  descriptionKey,
  icon,
}: ErrorPageLayoutProps) => {
  const t = useTranslations("errorPages");

  return (
    <>
      <div
        className="fixed w-dvw h-dvh top-0 left-0 z-0 bg-errorPageBg"
        style={{ backgroundImage: "var(--authPagePattern)" }}
        aria-hidden="true"
      />
      <ThemeButtonAuth />
      <main className="fixed w-dvw h-dvh flex flex-col justify-center items-center top-0 left-0 z-20 -mt-8">
        <div
          className="w-16 h-16 mb-6 text-mainColor opacity-80"
          aria-hidden="true"
        >
          {icon}
        </div>
        <h1 className="text-[5.5rem] xsm:text-[7.5rem] font-bold text-primaryText tracking-tight leading-none mb-6">
          {code}
        </h1>
        <h2 className="text-2xl sm:text-3xl font-semibold text-primaryText mb-3">
          {t(titleKey)}
        </h2>
        <p className="text-base text-secondaryText text-center leading-relaxed mb-10 max-w-72 xsm:max-w-sm">
          {t(descriptionKey)}
        </p>
        <Button asChild className="rounded-xl px-6 py-3 h-auto">
          <Link href="/">{t("backToHomepage")}</Link>
        </Button>
      </main>
    </>
  );
};
