import { RefObject } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "../common/shadcn/dialog";
import { LoginForm } from "./LoginForm";

interface LoginModalProps {
  closeModal: () => void;
  switchToSignUp: () => void;
  returnFocusRef?: RefObject<HTMLButtonElement | null>;
}

export const LoginModal = ({
  closeModal,
  switchToSignUp,
  returnFocusRef,
}: LoginModalProps) => {
  return (
    <Dialog open={true} onOpenChange={(open) => !open && closeModal()}>
      <DialogContent
        className="flex flex-col items-center"
        onOpenAutoFocus={(e) => e.preventDefault()}
        onCloseAutoFocus={(e) => {
          if (returnFocusRef?.current) {
            e.preventDefault();
            returnFocusRef.current.focus();
          }
        }}
      >
        <DialogTitle className="sr-only">Login</DialogTitle>
        <DialogDescription className="sr-only">Login</DialogDescription>
        <LoginForm switchToSignUp={switchToSignUp} />
      </DialogContent>
    </Dialog>
  );
};
