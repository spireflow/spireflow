import { ArrowDownSimpleIcon } from "@/assets/icons/ArrowDownSimpleIcon";
import { UserIcon } from "@/assets/icons/UserIcon";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/common/shadcn/tooltip";
import { SettingsDrawer } from "@/components/layout/settings/SettingsDrawer";
import { useIsFirstRender } from "@/hooks/useIsFirstRender";

import { useUserMenu } from "../hooks/useUserMenu";
import { NAVBAR_TOOLTIPS_ENABLED, UserButtonProps } from "../types";
import { UserMenuDropdown } from "./UserMenuDropdown";

export const UserMenuButton = ({
  userIconBtnRef,
  closeMobileMenu,
  userDropdown,
  navbarDropdowns,
  modalActions,
  session,
  t,
  currentLanguage,
  theme,
  selectTheme,
}: Omit<UserButtonProps, "userTooltip">) => {
  const isFirstRender = useIsFirstRender();

  const {
    isLoggedIn: rawIsLoggedIn,
    pathname,
    subMenuState,
    currentTheme,
    suppressTooltipRef,
    tooltipOpen,
    setTooltipOpen,
    isAnyDropdownOpen,
    menuRef,
    handleTriggerKeyDown,
    handleMenuKeyDown,
  } = useUserMenu({
    userIconBtnRef,
    userDropdown,
    navbarDropdowns,
    session,
    theme,
  });

  const isLoggedIn = isFirstRender ? false : rawIsLoggedIn;
  const safeSession = isFirstRender ? null : session;

  return (
    <div className="relative ml-3 xl:ml-0" ref={userDropdown.ref}>
      <Tooltip
        delayDuration={200}
        open={tooltipOpen}
        onOpenChange={(open) => {
          if (open && suppressTooltipRef.current) return;
          if (open && isAnyDropdownOpen) return;
          setTooltipOpen(open);
        }}
      >
        <TooltipTrigger asChild>
          <div
            className={isLoggedIn ? "h-10 w-auto sm:w-auto" : "h-10 w-10"}
            /** Real mouse movement clears the suppress flag */
            onPointerMove={() => {
              suppressTooltipRef.current = false;
            }}
            /** Keyboard focus (Tab/Escape return) bypasses suppress and opens tooltip after state settles */
            onFocus={(e) => {
              if (
                e.target instanceof HTMLElement &&
                e.target.matches(":focus-visible")
              ) {
                suppressTooltipRef.current = false;
                const wrapper = e.currentTarget;
                setTimeout(() => {
                  if (wrapper.contains(document.activeElement)) {
                    setTooltipOpen(true);
                  }
                }, 0);
              }
            }}
          >
            <button
              ref={userIconBtnRef}
              tabIndex={0}
              onClick={() => {
                setTooltipOpen(false);
                closeMobileMenu();
                userDropdown.toggle();
                navbarDropdowns.closeAllExcept("user");
              }}
              onKeyDown={handleTriggerKeyDown}
              className={`text-base flex justify-center items-center h-full border border-mainBorder bg-outlinedButtonBg hover:bg-navbarIconButtonBgHover text-primaryText stroke-grayIcon fill-grayIcon ${
                isLoggedIn && safeSession?.username
                  ? "w-10 sm:w-auto sm:px-3 rounded-full sm:rounded-xl"
                  : "w-full rounded-full"
              }`}
              type="button"
              aria-label={t("openUserMenu")}
              aria-haspopup="menu"
              aria-expanded={userDropdown.isOpen}
              aria-controls="user-dropdown-menu"
            >
              <UserIcon />
              {isLoggedIn && safeSession?.username && (
                <>
                  <span className="hidden sm:inline text-sm font-medium text-primaryText whitespace-nowrap ml-2 mr-2">
                    {safeSession.username}
                  </span>
                  <div className="hidden sm:block text-secondaryText w-5 h-5 ml-2">
                    <ArrowDownSimpleIcon />
                  </div>
                </>
              )}
            </button>
          </div>
        </TooltipTrigger>
        {NAVBAR_TOOLTIPS_ENABLED && !isAnyDropdownOpen && (
          <TooltipContent
            side="bottom"
            align="start"
            alignOffset={-85}
            className="hidden xl:block"
          >
            {t("openUserMenu")}
          </TooltipContent>
        )}
      </Tooltip>
      {userDropdown.isOpen && (
        <UserMenuDropdown
          menuRef={menuRef}
          handleMenuKeyDown={handleMenuKeyDown}
          suppressTooltipRef={suppressTooltipRef}
          t={t}
          pathname={pathname}
          currentLanguage={currentLanguage}
          currentTheme={currentTheme}
          subMenuState={subMenuState}
          userDropdown={userDropdown}
          modalActions={modalActions}
          selectTheme={selectTheme}
        />
      )}
      <SettingsDrawer
        open={subMenuState.isSettingsDrawerOpen}
        onOpenChange={subMenuState.setIsSettingsDrawerOpen}
        returnFocusRef={userIconBtnRef}
      />
    </div>
  );
};
