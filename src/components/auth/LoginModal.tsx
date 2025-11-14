import React from "react";

import { LoginForm } from "./LoginForm";
import { Modal } from "../common/Modal";

interface LoginModalProps {
  closeModal: () => void;
  switchToSignUp: () => void;
}

export const LoginModal = ({ closeModal, switchToSignUp }: LoginModalProps) => {
  return (
    <>
      <Modal onClose={closeModal} hasBlur={true}>
        <LoginForm switchToSignUp={switchToSignUp} />
      </Modal>
    </>
  );
};
