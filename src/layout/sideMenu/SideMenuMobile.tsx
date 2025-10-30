import { useLocale, useTranslations } from "next-intl";

import { useSession } from "../../lib/auth-client";

import { AnalyticsIcon } from "../../assets/icons/AnalyticsIcon";
import { AreaIcon } from "../../assets/icons/AreaIcon";
import { BarsIcon } from "../../assets/icons/BarsIcon";
import { CalendarIcon } from "../../assets/icons/CalendarIcon";
import { CustomersIcon } from "../../assets/icons/CustomersIcon";
import { DashboardIcon } from "../../assets/icons/DashboardIcon";
import { GithubIcon } from "../../assets/icons/GithubIcon";
import { LineIcon } from "../../assets/icons/LineIcon";
import { OrdersIcon } from "../../assets/icons/OrdersIcon";
import { ScatterIcon } from "../../assets/icons/ScatterIcon";
import { useAppStore } from "../../store/appStore";
import { MenuCategory } from "./MenuCategory";
import { MenuItem } from "./MenuItem";
import { ProductsIcon } from "../../assets/icons/ProductsIcon";
import { Link } from "../../i18n/navigation";
import { useIsFirstRender } from "../../hooks/useIsFirstRender";
import { SideMenuMobileProps } from "./types";

export const SideMenuMobile = ({
  isMobileMenuOpen,
  onLoginButtonClick,
}: SideMenuMobileProps) => {
  const toggleMobileMenu = useAppStore((state) => state.toggleMobileMenu);
  const { data: sessionData, isPending } = useSession();
  const isSignedIn = !!sessionData;
  const isLoaded = !isPending;
  const t = useTranslations("sideMenu");
  const locale = useLocale();

  // First render check needed to prevent hydration mismatch errors
  const isFirstRender = useIsFirstRender();
  if (isFirstRender) return null;

  return (
    <div
      className={`z-50 overflow-auto overflow-x-hidden flex fixed xl:hidden flex-col justify-between bg-primaryBg  border-r-[1px] border-mainBorder bg-primaryBg white top-[4.5rem] xl:top-[4rem] 2xl:top-[4.5rem] mb-[2.5rem] left-0 items-center transform transition-transform ease-in-out  ${
        isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
      } `}
      style={{ height: "calc(100% - 4.5rem)" }}
    >
      <div className="px-4 xl:px-6 pt-0 pr-6 transition w-[16rem] pb-2">
        <MenuCategory title={t("pages")} />
        <MenuItem title={t("dashboard")} icon={<DashboardIcon />} path="/" />
        <MenuItem title={t("orders")} icon={<OrdersIcon />} path="/orders" />
        <MenuItem
          title={t("customers")}
          icon={<CustomersIcon />}
          path="/customers"
        />
        <MenuItem
          title={t("products")}
          icon={<ProductsIcon />}
          path="/products"
        />
        <MenuItem
          title={t("analytics")}
          icon={<AnalyticsIcon />}
          path="/analytics"
        />
        <MenuItem
          title={t("calendar")}
          icon={<CalendarIcon />}
          path="/calendar"
        />
        <MenuCategory title={t("singleCharts")} />
        <MenuItem title={t("area")} icon={<AreaIcon />} path="/area" />
        <MenuItem title={t("bars")} icon={<BarsIcon />} path="/bars" />
        <MenuItem title={t("scatter")} icon={<ScatterIcon />} path="/scatter" />
        <MenuItem title={t("line")} icon={<LineIcon />} path="/line" />
      </div>
      <div className="w-full">
        <div className="w-full border-t-0 border-mainBorder px-4 pt-8 mb-6">
          {isLoaded && !isSignedIn && (
            <button
              onClick={() => {
                onLoginButtonClick();
                toggleMobileMenu();
              }}
              className="block hover:bg-navbarButtonBgHover xl:hidden mt-auto mb-8 rounded-xl w-full h-10 flex justify-center items-center font-medium border border-mainColor text-primaryText bg-[rgb(255,255,255,0.02)] hover:bg-[rgb(255,255,255,0.06)] mt-12"
            >
              {t("signIn")}
            </button>
          )}
          <div className="flex xl:hidden justify-center gap-2 items-center mx-2">
            <label className="mr-2 text-primaryText">{t("language")}:</label>
            <div className="flex border border-mainBorder rounded-md">
              <Link
                href="/"
                locale="en"
                className={`${
                  locale === "en"
                    ? "border border-mainBorder bg-dropdownBgHover"
                    : "border border-[rgb(0,0,0,0)] "
                }  text-primaryText h-10 cursor-pointer px-4 hover:bg-dropdownBgHover py-2 flex justify-between`}
              >
                EN
              </Link>
              <Link
                href="/"
                locale="pl"
                className={`${
                  locale === "pl"
                    ? "border border-mainBorder bg-dropdownBgHover"
                    : "border border-[rgb(0,0,0,0)]"
                } text-primaryText h-10 cursor-pointer px-4 hover:bg-dropdownBgHover py-2 flex justify-between`}
              >
                PL
              </Link>
            </div>
          </div>
        </div>
        <a
          href="https://github.com/matt765/spireflow"
          target="_blank"
          rel="noreferrer"
          className="cursor-pointer hover:bg-navbarButtonBgHover min-h-[3.6rem] max-h-[3.6rem] w-full border-t-2 border-mainBorder text-center flex justify-center items-center gap-2 stroke-grayIcon fill-grayIcon"
        >
          <GithubIcon />
          <div className="text-primaryText">{t("githubRepository")}</div>
        </a>
      </div>
    </div>
  );
};
