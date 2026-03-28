"use client";

import { useTranslations } from "next-intl";
import { useEffect } from "react";

import { Button } from "@/components/common/shadcn/button";
import { ServerCrashIcon } from "@/components/views/errorPages/icons/ServerCrashIcon";
import { Link } from "@/i18n/navigation";

const Error = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  const t = useTranslations("errorPages");

  useEffect(() => {
    console.error("Error caught by boundary:", error);
  }, [error]);

  return (
    <main className="flex flex-col items-center justify-center w-full min-h-dvh -mt-8 px-6">
      <div
        className="w-16 h-16 mb-6 text-mainColor opacity-80"
        aria-hidden="true"
      >
        <ServerCrashIcon />
      </div>
      <h1 className="text-[5.5rem] xsm:text-[7.5rem] font-bold text-primaryText tracking-tight leading-none mb-6">
        500
      </h1>
      <h2 className="text-2xl sm:text-3xl font-semibold text-primaryText mb-3 text-center">
        {t("unexpectedError.title")}
      </h2>
      <p className="text-base text-secondaryText text-center leading-relaxed mb-10 max-w-72 xsm:max-w-sm">
        {t("unexpectedError.description")}
      </p>
      <div className="flex gap-3">
        <Button
          variant="outline"
          onClick={() => reset()}
          className="rounded-xl px-6 py-3 h-auto border-mainBorder text-primaryText"
        >
          {t("tryAgain")}
        </Button>
        <Button asChild className="rounded-xl px-6 py-3 h-auto">
          <Link href="/">{t("backToHomepage")}</Link>
        </Button>
      </div>
    </main>
  );
};

export default Error;
