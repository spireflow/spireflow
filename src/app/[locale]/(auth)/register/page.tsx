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
      <div
        className="fixed w-screen h-screen top-0 left-0 z-0"
        style={{
          backgroundColor: "rgb(20, 23, 26)",
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Crect x='0' y='0' width='100' height='100' fill='none' stroke='rgb(35,40,45)' stroke-width='0.5'/%3E%3Cline x1='50' y1='0' x2='50' y2='100' stroke='rgb(32,36,42)' stroke-width='0.3'/%3E%3Cline x1='0' y1='50' x2='100' y2='50' stroke='rgb(32,36,42)' stroke-width='0.3'/%3E%3Ccircle cx='0' cy='0' r='2' fill='rgb(45,50,56)'/%3E%3Ccircle cx='100' cy='0' r='2' fill='rgb(45,50,56)'/%3E%3Ccircle cx='0' cy='100' r='2' fill='rgb(45,50,56)'/%3E%3Ccircle cx='100' cy='100' r='2' fill='rgb(45,50,56)'/%3E%3Ccircle cx='50' cy='50' r='1.5' fill='rgb(40,45,52)'/%3E%3C/svg%3E")`,
        }}
      />
      <div className="fixed w-screen h-screen flex justify-center items-center top-0 left-0 z-20">
        <div
          className="border border-mainBorder w-screen h-screen sm:w-auto sm:h-auto bg-loginModalBg px-[6vw] xsm:px-[18vw] sm:px-12 pt-24 sm:pt-[3rem] pb-12 flex flex-col items-center justify-start sm:rounded-2xl relative"
          style={{ boxShadow: "var(--authModalShadow)" }}
        >
          <SignUpForm switchToSignIn={switchToSignIn} />
        </div>
      </div>
    </>
  );
};

export default Register;
