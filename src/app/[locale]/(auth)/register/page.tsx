import { Metadata } from "next";

import { AuthLogo } from "../../../../components/auth/AuthLogo";
import { SignUpForm } from "../../../../components/auth/SignUpForm";

const Register = () => {
  return (
    <>
      <div
        className="fixed w-dvw h-dvh top-0 left-0 z-0 bg-authPageBg"
        style={{ backgroundImage: "var(--authPagePattern)" }}
      />
      <div className="fixed w-dvw h-dvh flex justify-center items-center top-0 left-0 z-20">
        <div
          className="border border-mainBorder w-dvw h-dvh sm:w-auto sm:h-auto bg-loginModalBg px-[6vw] xsm:px-[18vw] sm:px-12 pt-24 sm:pt-18 pb-12 flex flex-col items-center justify-start sm:rounded-2xl relative overflow-visible"
          style={{ boxShadow: "var(--authModalShadow)" }}
        >
          <div className="hidden sm:block">
            <AuthLogo />
          </div>
          <SignUpForm />
        </div>
      </div>
    </>
  );
};

export const metadata: Metadata = { title: "Register" };

export default Register;
