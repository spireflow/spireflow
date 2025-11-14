import React from "react";
import { useTranslations } from "next-intl";

import { ContainedButton } from "../common/ContainedButton";
import { OutlinedButton } from "../common/OutlinedButton";
import { Modal } from "../common/Modal";
import { useHandleLogout } from "../../hooks/auth/useHandleLogout";
import { LogoutIcon } from "../../assets/icons/LogoutIcon";
import { SpinnerIcon } from "../../assets/icons/SpinnerIcon";

interface LogoutModalProps {
  closeModal: () => void;
}

export const LogoutModal = ({ closeModal }: LogoutModalProps) => {
  const { handleLogout, loading } = useHandleLogout();
  const t = useTranslations("navbar");

  const handleLogoutClick = () => {
    handleLogout();
  };

  return (
    <div>
      <Modal onClose={closeModal} hasBlur={true}>
        <div className="flex items-center justify-center w-full flex-col gap-2 -mt-2">
          <div className="rounded-full border border-mainBorder p-3 pl-4 w-16 h-16 flex justify-center items-center mr-[0rem] stroke-grayIcon fill-grayIcon">
            <LogoutIcon width="45" height="45" />
          </div>
          <h2 className="text-primaryText text-3xl w-full text-center mt-2">
            {t("logoutModalTitle")}
          </h2>
        </div>
        <h2 className="text-primaryText text-base w-full text-secondaryText text-center mt-4">
          {t("logoutModalDesc")}
        </h2>
        <div className="flex w-full justify-center mt-12 gap-4">
          <div className="w-[6rem] h-[2.5rem]">
            <OutlinedButton
              text={t("logoutModalCancelButton")}
              handleClick={closeModal}
            />
          </div>
          <div className="w-[6.5rem] h-[2.5rem] pb-0">
            <ContainedButton handleClick={handleLogoutClick} disabled={loading}>
              {loading ? (
                <div className="pt-[0.3rem]">
                  <SpinnerIcon width={45} height={45} />
                </div>
              ) : (
                t("logoutModalConfirmButton")
              )}
            </ContainedButton>
          </div>
        </div>
      </Modal>
    </div>
  );
};
