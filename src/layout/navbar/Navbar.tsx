"use client";

import { useTranslations } from "next-intl";
import { useEffect } from "react";

import { LoginModal } from "../../components/auth/LoginModal";
import { SignUpModal } from "../../components/auth/SignUpModal";
import { SideMenuMobile } from "../sideMenu/SideMenuMobile";
import { LogoutModal } from "../../components/auth/LogoutModal";
import { AboutModal } from "./AboutModal";
import { ChangelogModal } from "./ChangelogModal";
import { ThemeButton } from "./ThemeButton";
import { NotificationsButton } from "./NotificationsButton";
import { LanguageButton } from "./LanguageButton";
import { UserButton } from "./UserButton";
import { HamburgerButton } from "./HamburgerButton";
import { useNavbar } from "./hooks/useNavbar";
import { useNavbarModals } from "./hooks/useNavbarModals";
import { useNavbarTooltips } from "./hooks/useNavbarTooltips";
import { SearchInput } from "./SearchInput";
import { Logo } from "../sideMenu/Logo";
import { useAppStore } from "../../store/appStore";

export const Navbar = () => {
  const t = useTranslations("navbar");
  const setIsLoggingOut = useAppStore((state) => state.setIsLoggingOut);
  const setIsLoggingIn = useAppStore((state) => state.setIsLoggingIn);

  useEffect(() => {
    setIsLoggingOut(false);
    setIsLoggingIn(false);
  }, [setIsLoggingOut, setIsLoggingIn]);

  const {
    theme,
    currentLanguage,
    isMobileMenuOpen,
    toggleMobileMenu,
    isSideMenuOpen,
    closeMobileMenu,
    session,
    userIconBtnRef,
    themeDropdown,
    userDropdown,
    languageDropdown,
    selectTheme,
    searchDropdown,
    notificationsDropdown,
  } = useNavbar();

  const {
    isLoginModalOpen,
    isSignUpModalOpen,
    isLogoutModalOpen,
    isAboutModalOpen,
    isChangelogModalOpen,
    closeLoginModal,
    closeSignUpModal,
    closeLogoutModal,
    closeAboutModal,
    closeChangelogModal,
    showLogoutModal,
    showAboutModal,
    showChangelogModal,
    switchToSignUp,
    switchToSignIn,
    handleLoginButton,
  } = useNavbarModals();

  const { languageTooltip, userTooltip, notificationsTooltip, themeTooltip } =
    useNavbarTooltips();

  return (
    <>
      <div
        className={`w-screen flex items-center z-30  fixed h-[4.5rem] bg-secondaryBg 3xl:h-20  w-full border-b border-solid border-mainBorder `}
      >
        {/* Placeholder for maintaining consistent spacing with page wrapper  */}
        <div
          className={`hidden xl:block xl:w-[210px] 1xl:min-w-[220px] 3xl:min-w-[270px] h-[3rem]  ${
            !isSideMenuOpen && "xl:!max-w-[3rem] !w-[3rem] xl:!min-w-[4.5rem] "
          }   
          `}
        ></div>
        <div
          className={`px-6 pr-4 md:px-6  xl:pl-3 xl:pr-2 2xl:px-4 z-40 w-full flex justify-between xl:mx-auto items-center gap-4 xl:gap-7 
         xl:max-w-[82%] 1xl:max-w-[82%] 2xl:max-w-[83vw] 3xl:max-w-[82vw] 5xl:max-w-[102rem]
          `}
        >
          <div className="flex items-center gap-10">
            <div className="flex xsm:pl-2  xl:hidden">
              <Logo />
            </div>
            <SearchInput
              isOpen={searchDropdown.isOpen}
              ref={searchDropdown.ref}
              open={searchDropdown.open}
              close={searchDropdown.close}
              closeOthers={() => {
                themeDropdown.close();
                languageDropdown.close();
                userDropdown.close();
                closeMobileMenu();
              }}
            />
          </div>
          <div className="flex items-center gap-[0.5rem] md:gap-2 xl:gap-7 z-[99]">
            <ThemeButton
              theme={theme}
              selectTheme={selectTheme}
              themeTooltip={themeTooltip}
              userDropdown={userDropdown}
              languageDropdown={languageDropdown}
              notificationsDropdown={notificationsDropdown}
              t={t}
            />
            <div className="hidden xl:flex">
              <NotificationsButton
                notificationsDropdown={notificationsDropdown}
                notificationsTooltip={notificationsTooltip}
                themeDropdown={themeDropdown}
                languageDropdown={languageDropdown}
                userDropdown={userDropdown}
                searchClose={searchDropdown.close}
                t={t}
              />
            </div>
            <div className="hidden xl:flex">
              <LanguageButton
                currentLanguage={currentLanguage}
                languageTooltip={languageTooltip}
                languageDropdown={languageDropdown}
                themeDropdown={themeDropdown}
                userDropdown={userDropdown}
                notificationsDropdown={notificationsDropdown}
                t={t}
              />
            </div>
            <div className="mr-1 2xl:-mr-unset">
              <UserButton
                userIconBtnRef={userIconBtnRef}
                closeMobileMenu={closeMobileMenu}
                userDropdown={userDropdown}
                themeDropdown={themeDropdown}
                languageDropdown={languageDropdown}
                notificationsDropdown={notificationsDropdown}
                userTooltip={userTooltip}
                showLogoutModal={showLogoutModal}
                showAboutModal={showAboutModal}
                showChangelogModal={showChangelogModal}
                handleLoginButton={handleLoginButton}
                session={session}
                theme={theme}
                searchClose={searchDropdown.close}
                t={t}
              />
            </div>
            <HamburgerButton
              isMobileMenuOpen={isMobileMenuOpen}
              toggleMobileMenu={() => {
                searchDropdown.close();
                toggleMobileMenu();
              }}
            />
          </div>
        </div>
        <SideMenuMobile
          isMobileMenuOpen={isMobileMenuOpen}
          onLoginButtonClick={handleLoginButton}
        />
        {isMobileMenuOpen && (
          <div
            className="fixed top-[4.5rem] w-full h-full backdrop-blur-md z-10"
            onClick={toggleMobileMenu}
          />
        )}
      </div>
      {isLogoutModalOpen && <LogoutModal closeModal={closeLogoutModal} />}
      {isAboutModalOpen && <AboutModal closeModal={closeAboutModal} />}
      {isChangelogModalOpen && (
        <ChangelogModal closeModal={closeChangelogModal} />
      )}
      {isLoginModalOpen && (
        <LoginModal
          closeModal={closeLoginModal}
          switchToSignUp={switchToSignUp}
        />
      )}
      {isSignUpModalOpen && (
        <SignUpModal
          closeModal={closeSignUpModal}
          switchToSignIn={switchToSignIn}
        />
      )}
    </>
  );
};
