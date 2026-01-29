import { RefObject } from "react";

import { LoginForm } from "./LoginForm";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "../common/shadcn/dialog";

interface LoginModalProps {
  closeModal: () => void;
  switchToSignUp: () => void;
  returnFocusRef?: RefObject<HTMLButtonElement | null>;
}

export const LoginModal = ({ closeModal, switchToSignUp, returnFocusRef }: LoginModalProps) => {
  return (
    <Dialog open={true} onOpenChange={(open) => !open && closeModal()}>
      <DialogContent
        className="flex flex-col items-center"
        onCloseAutoFocus={(e) => {
          if (returnFocusRef?.current) {
            e.preventDefault();
            returnFocusRef.current.focus();
          }
        }}
      >
        <DialogTitle className="sr-only">Login</DialogTitle>
        <LoginForm switchToSignUp={switchToSignUp} />
      </DialogContent>
    </Dialog>
  );
};
