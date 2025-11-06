"use client";

import { useRouter } from "next/navigation";

import { SignUpForm } from "../../../../components/auth/SignUpForm";

const Register = () => {
  const router = useRouter();

  const switchToSignIn = () => {
    router.push("/login");
  };

  return (
    <>
      <div className="fixed w-screen h-screen top-0 left-0 bg-secondaryBg" />
      <div className="fixed w-screen h-screen flex justify-center items-center top-0 left-0">
        <div className="shadow-lg w-screen h-screen sm:w-auto sm:h-auto bg-loginModalBg shadow-xl  px-[6vw] xsm:px-[18vw] sm:px-12 pt-24 sm:pt-[3rem] pb-12 flex flex-col items-center justify-start sm:rounded-2xl relative">
          <SignUpForm switchToSignIn={switchToSignIn} />
        </div>
      </div>
    </>
  );
};

export default Register;
