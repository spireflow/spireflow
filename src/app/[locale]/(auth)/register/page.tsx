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
      {/* <div
        className="fixed w-screen h-screen top-0 left-0 opacity-[0.07] pointer-events-none z-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 800 800'%3E%3Cg fill='none' stroke='%23ffffff' stroke-width='1'%3E%3Cpath d='M769 229L1037 260.9M927 880L731 737 520 660 309 538 40 599 295 764 126.5 879.5 40 599-197 493 102 382-31 229 126.5 79.5-69-63'/%3E%3Cpath d='M-31 229L237 261 390 382 603 493 308.5 537.5 101.5 381.5M370 905L295 764'/%3E%3Cpath d='M520 660L578 842 731 737 840 599 603 493 520 660 295 764 309 538 390 382 539 269 769 229 577.5 41.5 370 105 295 -36 126.5 79.5 237 261 102 382 40 599 -69 737 127 880'/%3E%3Cpath d='M520-140L578.5 42.5 731-63M603 493L539 269 237 261 370 105M902 382L539 269M390 382L102 382'/%3E%3Cpath d='M-222 42L126.5 79.5 370 105 539 269 577.5 41.5 927 80 769 229 902 382 603 493 731 737M295-36L577.5 41.5M578 842L295 764M40-201L127 80M102 382L-261 269'/%3E%3C/g%3E%3Cg fill='%23ffffff'%3E%3Ccircle cx='769' cy='229' r='5'/%3E%3Ccircle cx='539' cy='269' r='5'/%3E%3Ccircle cx='603' cy='493' r='5'/%3E%3Ccircle cx='731' cy='737' r='5'/%3E%3Ccircle cx='520' cy='660' r='5'/%3E%3Ccircle cx='309' cy='538' r='5'/%3E%3Ccircle cx='295' cy='764' r='5'/%3E%3Ccircle cx='40' cy='599' r='5'/%3E%3Ccircle cx='102' cy='382' r='5'/%3E%3Ccircle cx='127' cy='80' r='5'/%3E%3Ccircle cx='370' cy='105' r='5'/%3E%3Ccircle cx='578' cy='42' r='5'/%3E%3Ccircle cx='237' cy='261' r='5'/%3E%3Ccircle cx='390' cy='382' r='5'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
      /> */}
      <div className="fixed w-screen h-screen flex justify-center items-center top-0 left-0 z-20">
        <div className="shadow-lg border border-mainBorder w-screen h-screen sm:w-auto sm:h-auto bg-loginModalBg shadow-xl  px-[6vw] xsm:px-[18vw] sm:px-12 pt-24 sm:pt-[3rem] pb-12 flex flex-col items-center justify-start sm:rounded-2xl relative">
          <SignUpForm switchToSignIn={switchToSignIn} />
        </div>
      </div>
    </>
  );
};

export default Register;
