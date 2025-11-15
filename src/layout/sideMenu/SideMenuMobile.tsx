import { useTranslations } from "next-intl";

import { useSession } from "../../lib/auth-client";

import { AnalyticsIcon } from "../../assets/icons/AnalyticsIcon";
import { AreaIcon } from "../../assets/icons/AreaIcon";
import { BarsIcon } from "../../assets/icons/BarsIcon";
import { CalendarIcon } from "../../assets/icons/CalendarIcon";
import { CustomersIcon } from "../../assets/icons/CustomersIcon";
import { DashboardIcon } from "../../assets/icons/DashboardIcon";
import { LineIcon } from "../../assets/icons/LineIcon";
import { OrdersIcon } from "../../assets/icons/OrdersIcon";
import { ScatterIcon } from "../../assets/icons/ScatterIcon";
import { UserIcon } from "../../assets/icons/UserIcon";
import { useAppStore } from "../../store/appStore";
import { MenuCategory } from "./MenuCategory";
import { MenuItem } from "./MenuItem";
import { MenuItemWithSubmenu } from "./MenuItemWithSubmenu";
import { ProductsIcon } from "../../assets/icons/ProductsIcon";
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

  // First render check needed to prevent hydration mismatch errors
  const isFirstRender = useIsFirstRender();
  if (isFirstRender) return null;

  return (
    <div
      className={`z-50 overflow-auto overflow-x-hidden flex fixed xl:hidden flex-col justify-between bg-primaryBg border-r-[1px] border-mainBorder bg-primaryBg white top-[4.5rem] xl:top-[4rem] 2xl:top-[4.5rem] mb-[2.5rem] left-0 items-center transform transition-transform ease-in-out ${
        isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
      }`}
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
        {isLoaded && isSignedIn && sessionData?.user && (
          <div className="w-full border-t-2 border-mainBorder">
            <div className="flex items-center gap-3 px-6 py-4">
              <div className="w-10 h-10 rounded-full bg-outlinedButtonBg border border-mainBorder flex items-center justify-center stroke-grayIcon fill-grayIcon">
                <UserIcon />
              </div>
              <div className="flex flex-col">
                <span className="text-primaryText font-medium text-sm">
                  {sessionData.user.email}
                </span>
              </div>
            </div>
          </div>
        )}
        {isLoaded && !isSignedIn && (
          <div className="w-full border-t-0 border-mainBorder px-4 pt-8 mb-6">
            <button
              onClick={() => {
                onLoginButtonClick();
                toggleMobileMenu();
              }}
              className="block hover:bg-navbarButtonBgHover xl:hidden mt-auto mb-8 rounded-xl w-full h-10 flex justify-center items-center font-medium border border-mainColor text-primaryText bg-[rgb(255,255,255,0.02)] hover:bg-[rgb(255,255,255,0.06)] mt-12"
            >
              {t("signIn")}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
