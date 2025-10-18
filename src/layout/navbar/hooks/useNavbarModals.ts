import { useState } from "react";

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

  const switchToSignUp = () => {
    setIsLoginModalOpen(false);
    setIsSignUpModalOpen(true);
  };

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
