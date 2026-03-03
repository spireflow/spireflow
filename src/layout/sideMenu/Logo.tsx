import { LogoIcon } from "../../assets/icons/LogoIcon";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { Link } from "../../i18n/navigation";
import { useAppStore } from "../../store/appStore";

export const Logo = () => {
  const { isSideMenuOpen } = useAppStore();
  const isDesktop = useMediaQuery("(min-width: 1280px)");

  const isCollapsed = !isSideMenuOpen && isDesktop;

  return (
    <Link
      href="/"
      aria-label="Spireflow - home"
      className="flex items-center text-xl xl:text-lg 1xl:text-xl 3xl:text-[1.35rem] font-medium"
    >
      <div className="menuItemLogo text-logoBg flex-shrink-0 transition-all duration-200">
        <LogoIcon />
      </div>

      <div
        className={`flex whitespace-nowrap overflow-hidden transition-all duration-200 ease-in-out ${
          isCollapsed ? "w-0 opacity-0" : "w-auto opacity-100"
        }`}
        style={{ fontFamily: "var(--font-outfit)" }}
      >
        <div className="ml-[0.7rem] xl:ml-[0.55rem] text-logoBasicText mr-px tracking-wider">
          Spire
        </div>
        <div className="text-mainColor tracking-wider">flow</div>
      </div>
    </Link>
  );
};
