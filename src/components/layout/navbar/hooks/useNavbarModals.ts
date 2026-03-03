import { useState } from "react";

/**
 * Centralized open/close state for all navbar-triggered modals
 * (login, sign-up, logout, about, changelog).
 * Provides switch helpers that close one auth modal before opening the other.
 */
export const useNavbarModals = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);
  const [isChangelogModalOpen, setIsChangelogModalOpen] = useState(false);

  const closeLoginModal = () => setIsLoginModalOpen(false);
  const closeSignUpModal = () => setIsSignUpModalOpen(false);
  const closeLogoutModal = () => setIsLogoutModalOpen(false);
  const closeAboutModal = () => setIsAboutModalOpen(false);
  const closeChangelogModal = () => setIsChangelogModalOpen(false);

  const showLogoutModal = () => {
    setIsLogoutModalOpen(true);
  };

  const showAboutModal = () => {
    setIsAboutModalOpen(true);
  };

  const showChangelogModal = () => {
    setIsChangelogModalOpen(true);
  };

  const showSignUpModal = () => {
    setIsSignUpModalOpen(true);
  };

  /** Closes the login modal and immediately opens sign-up (seamless auth form swap). */
  const switchToSignUp = () => {
    setIsLoginModalOpen(false);
    setIsSignUpModalOpen(true);
  };

  /** Closes the sign-up modal and immediately opens login (seamless auth form swap). */
  const switchToSignIn = () => {
    setIsSignUpModalOpen(false);
    setIsLoginModalOpen(true);
  };

  const handleLoginButton = () => {
    setIsLoginModalOpen(true);
  };

  return {
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
    showSignUpModal,
    switchToSignUp,
    switchToSignIn,
    handleLoginButton,
  };
};
