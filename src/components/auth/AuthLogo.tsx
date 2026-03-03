import { LogoIcon } from "../../assets/icons/LogoIcon";

/* Circle with logo for auth pages */
export const AuthLogo = () => {
  return (
    <div className="absolute left-1/2 -translate-x-1/2 -top-12 1xl:-top-[3.5625rem] z-30 w-24 h-24 1xl:w-28.5 1xl:h-28.5">
      <div className="relative w-full h-full rounded-full bg-loginModalBg border border-mainBorder flex items-center justify-center text-logoBg">
        <div className="w-17.5 h-17.5 1xl:w-21.5 1xl:h-21.5 [&>svg]:w-full [&>svg]:h-full">
          <LogoIcon />
        </div>
      </div>
    </div>
  );
};
