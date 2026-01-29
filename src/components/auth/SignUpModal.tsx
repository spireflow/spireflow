import { RefObject } from "react";

import { SignUpForm } from "./SignUpForm";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "../common/shadcn/dialog";

interface SignUpModalProps {
  closeModal: () => void;
  switchToSignIn: () => void;
  returnFocusRef?: RefObject<HTMLButtonElement | null>;
}

export const SignUpModal = ({
  closeModal,
  switchToSignIn,
  returnFocusRef,
}: SignUpModalProps) => {
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
        <DialogTitle className="sr-only">Sign Up</DialogTitle>
        <SignUpForm switchToSignIn={switchToSignIn} />
      </DialogContent>
    </Dialog>
  );
};
