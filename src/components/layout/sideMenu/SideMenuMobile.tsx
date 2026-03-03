import { useTranslations } from "next-intl";

import { UserIcon } from "../../../assets/icons/UserIcon";
import { useIsFirstRender } from "../../../hooks/useIsFirstRender";
import { useSession } from "../../../services/auth/auth-client";
import { useAppStore } from "../../../store/appStore";
import { MenuCategory } from "./parts/MenuCategory";
import { MenuItem } from "./parts/MenuItem";
import { MenuItemWithSubmenu } from "./parts/MenuItemWithSubmenu";
import { menuConfig } from "./SideMenu";
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

  /** First render check needed to prevent hydration mismatch errors */
  const isFirstRender = useIsFirstRender();
  if (isFirstRender) return null;

  return (
    <nav
      aria-label="Mobile navigation"
      aria-hidden={!isMobileMenuOpen}
      className={`z-50 overflow-auto overflow-x-hidden flex fixed xl:hidden flex-col justify-between bg-primaryBg border-r-[1px] border-mainBorder bg-primaryBg white top-18 xl:top-16 2xl:top-18 mb-10 left-0 items-center transform transition-transform ease-in-out ${
        isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
      }`}
      style={{ height: "calc(100dvh - 4.5rem)" }}
    >
      <div className="px-4 xl:px-6 pt-0 pr-6 transition w-64 pb-2">
        {menuConfig.map((entry) => {
          switch (entry.type) {
            case "category":
              return (
                <MenuCategory key={entry.titleKey} title={t(entry.titleKey)} />
              );
            case "item":
              return (
                <MenuItem
                  key={entry.path}
                  title={t(entry.titleKey)}
                  icon={<entry.Icon />}
                  path={entry.path}
                />
              );
            case "submenu":
              return (
                <MenuItemWithSubmenu
                  key={entry.titleKey}
                  title={t(entry.titleKey)}
                  icon={<entry.Icon />}
                  submenuItems={entry.submenuItems.map((si) => ({
                    title: t(si.titleKey),
                    path: si.path,
                    newTab: si.newTab,
                  }))}
                />
              );
          }
        })}
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
              className="block xl:hidden mt-auto mb-8 rounded-xl w-full h-10 flex justify-center items-center font-medium border border-mainColor text-primaryText bg-sideMenuButtonBg hover:bg-sideMenuButtonBgHover mt-12"
            >
              {t("signIn")}
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};
