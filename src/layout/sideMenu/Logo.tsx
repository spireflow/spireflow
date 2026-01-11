import { LogoIcon } from "../../assets/icons/LogoIcon";
import { useAppStore } from "../../store/appStore";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { nunito } from "../../styles/fonts";
import { Link } from "../../i18n/navigation";

export const Logo = () => {
  const { isSideMenuOpen } = useAppStore();
  const isDesktop = useMediaQuery("(min-width: 1280px)");

  return (
    <Link
      href="/"
      className={`h-[4.2rem] 1xl:h-20 3xl:h-20 text-center flex justify-center items-center text-[1.3rem] xl:text-[1.1rem] 3xl:text-[1.4rem] font-medium ${
        isSideMenuOpen || !isDesktop ? "-ml-4" : "xl:ml-0"
      }`}
    >
      <div className="menuItemLogo text-logoBg">
        <LogoIcon />
      </div>

      {(isSideMenuOpen || !isDesktop) && (
        <>
          <div className="ml-[0.7rem] text-logoBasicText mr-[1px] tracking-wider">
            Spire
          </div>
          <div className="text-mainColor tracking-wider">flow</div>
        </>
      )}
    </Link>
  );
};
