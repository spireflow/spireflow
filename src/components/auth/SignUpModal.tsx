import { RefObject } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "../common/shadcn/dialog";
import { SignUpForm } from "./SignUpForm";

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
        onOpenAutoFocus={(e) => e.preventDefault()}
        onCloseAutoFocus={(e) => {
          if (returnFocusRef?.current) {
            e.preventDefault();
            returnFocusRef.current.focus();
          }
        }}
      >
        <DialogTitle className="sr-only">Sign Up</DialogTitle>
        <DialogDescription className="sr-only">Sign Up</DialogDescription>
        <SignUpForm switchToSignIn={switchToSignIn} />
      </DialogContent>
    </Dialog>
  );
};
