import React from "react";

import { SignUpForm } from "./SignUpForm";
import { Modal } from "../common/Modal";

interface SignUpModalProps {
  closeModal: () => void;
  switchToSignIn: () => void;
}

export const SignUpModal = ({
  closeModal,
  switchToSignIn,
}: SignUpModalProps) => {
  return (
    <Modal onClose={closeModal} hasBlur={true}>
      <SignUpForm switchToSignIn={switchToSignIn} />
    </Modal>
  );
};
