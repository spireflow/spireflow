"use client";

import { useTranslations } from "next-intl";
import { useEffect } from "react";

import { CenteredPageWrapper } from "../../components/common/CenteredPageWrapper";
import { Button } from "../../components/common/shadcn/button";

const Error = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  const t = useTranslations("navbar");

  useEffect(() => {
    console.error("Error caught by boundary:", error);
  }, [error]);

  return (
    <CenteredPageWrapper>
      <div className="flex pr-4 mx-auto items-center justify-center w-3/5 h-full flex-col border-mainBorder pt-8 pb-12 rounded-xl">
        <p className="text-2xl mb-8 text-primaryText">
          {t("error")}: {error.message}
        </p>
        <Button
          variant="outline"
          onClick={() => reset()}
          className="w-32 h-12 border border-mainColor rounded-lg py-3 px-5 text-primaryText"
        >
          {t("tryAgain")}
        </Button>
      </div>
    </CenteredPageWrapper>
  );
};
export default Error;
