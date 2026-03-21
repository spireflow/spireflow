import { LogoIcon } from "../../assets/icons/LogoIcon";

export const AuthLogoMobile = () => {
  return (
    <div className="w-24 h-24">
      <div className="w-full h-full rounded-full bg-authPageLogoCircleBg border border-mainBorder flex items-center justify-center text-logoBg">
        <div className="w-16 h-16 [&>svg]:w-full [&>svg]:h-full">
          <LogoIcon />
        </div>
      </div>
    </div>
  );
};
