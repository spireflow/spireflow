import { useState } from "react";

/**
 * Centralized open/close state for all navbar-triggered modals
 * (logout, about, contributing, changelog).
 */
export const useNavbarModals = () => {
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);
  const [isContributingModalOpen, setIsContributingModalOpen] = useState(false);
  const [isChangelogModalOpen, setIsChangelogModalOpen] = useState(false);

  const closeLogoutModal = () => setIsLogoutModalOpen(false);
  const closeAboutModal = () => setIsAboutModalOpen(false);
  const closeContributingModal = () => setIsContributingModalOpen(false);
  const closeChangelogModal = () => setIsChangelogModalOpen(false);

  const showLogoutModal = () => {
    setIsLogoutModalOpen(true);
  };

  const showAboutModal = () => {
    setIsAboutModalOpen(true);
  };

  const showContributingModal = () => {
    setIsAboutModalOpen(false);
    setIsContributingModalOpen(true);
  };

  const showChangelogModal = () => {
    setIsChangelogModalOpen(true);
  };

  return {
    isLogoutModalOpen,
    isAboutModalOpen,
    isContributingModalOpen,
    isChangelogModalOpen,
    closeLogoutModal,
    closeAboutModal,
    closeContributingModal,
    closeChangelogModal,
    showLogoutModal,
    showAboutModal,
    showContributingModal,
    showChangelogModal,
  };
};
