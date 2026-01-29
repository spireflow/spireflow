import { RefObject } from "react";
import { useTranslations } from "next-intl";

import { ContainedButton } from "../common/ContainedButton";
import { Button } from "../common/shadcn/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "../common/shadcn/dialog";
import { useHandleLogout } from "../../hooks/auth/useHandleLogout";
import { LogoutIcon } from "../../assets/icons/LogoutIcon";
import { SpinnerIcon } from "../../assets/icons/SpinnerIcon";

interface LogoutModalProps {
  closeModal: () => void;
  returnFocusRef?: RefObject<HTMLButtonElement | null>;
}

export const LogoutModal = ({ closeModal, returnFocusRef }: LogoutModalProps) => {
  const { handleLogout, loading } = useHandleLogout();
  const t = useTranslations("navbar");

  const handleLogoutClick = () => {
    handleLogout();
  };

  return (
    <Dialog open={true} onOpenChange={(open) => !open && closeModal()}>
      <DialogContent
        className="flex flex-col items-center justify-start"
        onCloseAutoFocus={(e) => {
          if (returnFocusRef?.current) {
            e.preventDefault();
            returnFocusRef.current.focus();
          }
        }}
      >
        <DialogHeader>
          <div className="flex items-center justify-center w-full flex-col gap-2 -mt-2">
            <div className="rounded-full border border-mainBorder p-3 pl-4 w-16 h-16 flex justify-center items-center mr-[0rem] stroke-grayIcon fill-grayIcon">
              <LogoutIcon width="45" height="45" />
            </div>
            <DialogTitle className="text-primaryText text-3xl w-full text-center mt-2">
              {t("logoutModalTitle")}
            </DialogTitle>
          </div>
          <DialogDescription className="text-primaryText text-base w-full text-secondaryText text-center mt-4">
            {t("logoutModalDesc")}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter footerVariant="centered" className="!flex-row">
          <Button
            variant="outline"
            onClick={closeModal}
            className="h-[2.5rem]"
          >
            {t("logoutModalCancelButton")}
          </Button>
          <ContainedButton
            handleClick={handleLogoutClick}
            disabled={loading}
            fullWidth={false}
            className="min-w-[4.5rem] h-[2.5rem]"
          >
            {loading ? (
              <SpinnerIcon width={20} height={20} />
            ) : (
              t("logoutModalConfirmButton")
            )}
          </ContainedButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
