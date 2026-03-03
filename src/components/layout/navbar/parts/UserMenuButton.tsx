import { ArrowDownSimpleIcon } from "../../../../assets/icons/ArrowDownSimpleIcon";
import { UserIcon } from "../../../../assets/icons/UserIcon";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "../../../common/shadcn/tooltip";
import { SettingsDrawer } from "../../settings/SettingsDrawer";
import { useUserMenu } from "../hooks/useUserMenu";
import { UserButtonProps } from "../types";
import { UserMenuDropdown } from "./UserMenuDropdown";

export const UserMenuButton = ({
  userIconBtnRef,
  closeMobileMenu,
  userDropdown,
  themeDropdown,
  languageDropdown,
  notificationsDropdown,
  showLogoutModal,
  showAboutModal,
  showChangelogModal,
  handleLoginButton,
  showSignUpModal,
  session,
  t,
  searchClose,
  currentLanguage,
  theme,
  selectTheme,
}: Omit<UserButtonProps, "userTooltip">) => {
  const {
    tAuth,
    isLoggedIn,
    pathname,
    isLanguageMenuOpen,
    setIsLanguageMenuOpen,
    isAuthMenuOpen,
    setIsAuthMenuOpen,
    isThemeMenuOpen,
    setIsThemeMenuOpen,
    isSettingsDrawerOpen,
    setIsSettingsDrawerOpen,
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
    themeDropdown,
    languageDropdown,
    notificationsDropdown,
    searchClose,
    session,
    theme,
  });

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
              onClick={() => {
                setTooltipOpen(false);
                closeMobileMenu();
                userDropdown.toggle();
                themeDropdown.close();
                languageDropdown.close();
                notificationsDropdown.close();
                searchClose();
              }}
              onKeyDown={handleTriggerKeyDown}
              className={`text-base flex justify-center items-center h-full border border-mainBorder bg-outlinedButtonBg hover:bg-navbarIconButtonBgHover text-primaryText stroke-grayIcon fill-grayIcon ${
                isLoggedIn && session?.username
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
              {isLoggedIn && session?.username && (
                <>
                  <span className="hidden sm:inline text-sm font-medium text-primaryText whitespace-nowrap ml-2 mr-2">
                    {session.username}
                  </span>
                  <div className="hidden sm:block text-secondaryText w-5 h-5 ml-2">
                    <ArrowDownSimpleIcon />
                  </div>
                </>
              )}
            </button>
          </div>
        </TooltipTrigger>
        {!isAnyDropdownOpen && (
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
          tAuth={tAuth}
          t={t}
          pathname={pathname}
          currentLanguage={currentLanguage}
          currentTheme={currentTheme}
          isAuthMenuOpen={isAuthMenuOpen}
          setIsAuthMenuOpen={setIsAuthMenuOpen}
          isLanguageMenuOpen={isLanguageMenuOpen}
          setIsLanguageMenuOpen={setIsLanguageMenuOpen}
          isThemeMenuOpen={isThemeMenuOpen}
          setIsThemeMenuOpen={setIsThemeMenuOpen}
          userDropdown={userDropdown}
          handleLoginButton={handleLoginButton}
          showSignUpModal={showSignUpModal}
          showLogoutModal={showLogoutModal}
          showChangelogModal={showChangelogModal}
          showAboutModal={showAboutModal}
          selectTheme={selectTheme}
          setIsSettingsDrawerOpen={setIsSettingsDrawerOpen}
        />
      )}
      <SettingsDrawer
        open={isSettingsDrawerOpen}
        onOpenChange={setIsSettingsDrawerOpen}
      />
    </div>
  );
};
