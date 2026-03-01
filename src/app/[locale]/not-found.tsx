"use client";

import { useTranslations } from "next-intl";

import { CenteredPageWrapper } from "../../components/common/CenteredPageWrapper";
import { Link } from "../../i18n/navigation";

const NotFound = () => {
  const t = useTranslations("navbar");

  return (
    <CenteredPageWrapper>
      <div className="flex pr-4 mx-auto items-center justify-center w-2/5 h-full flex-col border-mainBorder pt-8 pb-12 rounded-xl">
        <h1 className="text-[5rem] text-primaryText">404</h1>
        <p className="text-xl mb-8 text-primaryText">{t("pageNotFound")}</p>
        <Link
          href="/"
          className="border border-mainColor rounded-xl p-4 text-primaryText"
        >
          {t("goToHomepage")}
        </Link>
      </div>
    </CenteredPageWrapper>
  );
};

export default NotFound;
