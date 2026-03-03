import { useTranslations } from "next-intl";
import { RefObject } from "react";

import { LogoutIcon } from "../../assets/icons/LogoutIcon";
import { useHandleLogout } from "../../hooks/auth/useHandleLogout";
import { Button } from "../common/shadcn/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../common/shadcn/dialog";

interface LogoutModalProps {
  closeModal: () => void;
  returnFocusRef?: RefObject<HTMLButtonElement | null>;
}

export const LogoutModal = ({
  closeModal,
  returnFocusRef,
}: LogoutModalProps) => {
  const { handleLogout, loading } = useHandleLogout();
  const t = useTranslations("auth");

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
            <div className="rounded-full border border-mainBorder p-3 pl-4 w-16 h-16 flex justify-center items-center mr-0 stroke-grayIcon fill-grayIcon">
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
        <DialogFooter
          footerVariant="centered"
          className="!flex-row gap-4 sm:gap-0"
        >
          <Button variant="outline" onClick={closeModal} className="h-10">
            {t("logoutModalCancelButton")}
          </Button>
          <Button
            onClick={handleLogoutClick}
            loading={loading}
            className="min-w-18 h-10"
          >
            {t("logoutModalConfirmButton")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
