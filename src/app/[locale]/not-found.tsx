"use client";

import { useTranslations } from "next-intl";

import { Button } from "@/components/common/shadcn/button";
import { SearchXIcon } from "@/components/views/errorPages/icons/SearchXIcon";
import { Link } from "@/i18n/navigation";

const NotFound = () => {
  const t = useTranslations("errorPages");

  return (
    <main className="flex flex-col items-center justify-center w-full min-h-dvh -mt-8 px-6">
      <div
        className="w-16 h-16 mb-6 text-mainColor opacity-80"
        aria-hidden="true"
      >
        <SearchXIcon />
      </div>
      <h1 className="text-[5.5rem] xsm:text-[7.5rem] font-bold text-primaryText tracking-tight leading-none mb-6">
        404
      </h1>
      <h2 className="text-2xl sm:text-3xl font-semibold text-primaryText mb-3 text-center">
        {t("error404.title")}
      </h2>
      <p className="text-base text-secondaryText text-center leading-relaxed mb-10 max-w-72 xsm:max-w-sm">
        {t("error404.description")}
      </p>
      <Button asChild className="rounded-xl px-6 py-3 h-auto">
        <Link href="/">{t("backToHomepage")}</Link>
      </Button>
    </main>
  );
};

export default NotFound;
